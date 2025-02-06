import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Pencil, Trash2 } from "lucide-react";
import type { JobListing } from "@/integrations/supabase/types";

export function JobListingManager() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobListing | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: jobs, isLoading } = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("job_listings")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (newJob: Omit<JobListing, "id" | "created_at">) => {
      const { data, error } = await supabase
        .from("job_listings")
        .insert([newJob])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      setIsOpen(false);
      toast({
        title: "Success",
        description: "Job listing created successfully",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (job: JobListing) => {
      const { data, error } = await supabase
        .from("job_listings")
        .update(job)
        .eq("id", job.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      setIsOpen(false);
      setEditingJob(null);
      toast({
        title: "Success",
        description: "Job listing updated successfully",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("job_listings")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      toast({
        title: "Success",
        description: "Job listing deleted successfully",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const jobData = {
      title: formData.get("title") as string,
      location: formData.get("location") as string,
      department: formData.get("department") as string,
      type: formData.get("type") as string,
      description: formData.get("description") as string,
    };

    if (editingJob) {
      updateMutation.mutate({ ...jobData, id: editingJob.id, created_at: editingJob.created_at });
    } else {
      createMutation.mutate(jobData);
    }
  };

  return (
    <div className="space-y-4">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button onClick={() => setEditingJob(null)}>Add New Job</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingJob ? "Edit Job" : "Add New Job"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="title"
              placeholder="Job Title"
              defaultValue={editingJob?.title}
              required
            />
            <Input
              name="location"
              placeholder="Location"
              defaultValue={editingJob?.location}
              required
            />
            <Input
              name="department"
              placeholder="Department"
              defaultValue={editingJob?.department}
              required
            />
            <Input
              name="type"
              placeholder="Job Type"
              defaultValue={editingJob?.type}
              required
            />
            <Textarea
              name="description"
              placeholder="Job Description"
              defaultValue={editingJob?.description}
              required
            />
            <Button type="submit">
              {editingJob ? "Update" : "Create"} Job
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="space-y-4">
          {jobs?.map((job) => (
            <div
              key={job.id}
              className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
            >
              <div>
                <h3 className="font-semibold">{job.title}</h3>
                <p className="text-sm text-gray-600">{job.location}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setEditingJob(job);
                    setIsOpen(true);
                  }}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteMutation.mutate(job.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}