
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

interface JobListingFormData {
  id?: string;
  title: string;
  location: string;
  department: string;
  type: string;
  description: string;
}

interface JobListingManagerProps {
  jobToEdit?: JobListingFormData | null;
  onEditComplete?: () => void;
}

export function JobListingManager({ jobToEdit, onEditComplete }: JobListingManagerProps) {
  const [formData, setFormData] = useState<JobListingFormData>({
    title: "",
    location: "",
    department: "",
    type: "",
    description: "",
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (jobToEdit) {
      setFormData(jobToEdit);
    }
  }, [jobToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting job listing:", formData);

    try {
      if (jobToEdit?.id) {
        // Update existing job listing
        const { error } = await supabase
          .from("job_listings")
          .update({
            title: formData.title,
            location: formData.location,
            department: formData.department,
            type: formData.type,
            description: formData.description,
          })
          .eq("id", jobToEdit.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Job listing updated successfully",
        });

        if (onEditComplete) {
          onEditComplete();
        }
      } else {
        // Create new job listing
        const { error } = await supabase
          .from("job_listings")
          .insert({
            title: formData.title,
            location: formData.location,
            department: formData.department,
            type: formData.type,
            description: formData.description,
          });

        if (error) throw error;

        toast({
          title: "Success",
          description: "Job listing created successfully",
        });
      }

      // Reset form
      setFormData({
        title: "",
        location: "",
        department: "",
        type: "",
        description: "",
      });

      // Refresh the jobs list
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    } catch (error: any) {
      console.error("Error saving job listing:", error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium">
          Job Title
        </label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium">
          Location
        </label>
        <input
          type="text"
          id="location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      <div>
        <label htmlFor="department" className="block text-sm font-medium">
          Department
        </label>
        <input
          type="text"
          id="department"
          value={formData.department}
          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      <div>
        <label htmlFor="type" className="block text-sm font-medium">
          Job Type
        </label>
        <input
          type="text"
          id="type"
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium">
          Description
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
          rows={4}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      <button
        type="submit"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        {jobToEdit ? "Update Job Listing" : "Create Job Listing"}
      </button>
    </form>
  );
}
