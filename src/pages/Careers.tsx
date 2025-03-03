
import { useState } from "react";
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { JobListing } from "@/components/careers/JobListing";
import { JobListingManager } from "@/components/careers/JobListingManager";
import { JobApplication } from "@/components/careers/JobApplication";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { motion } from "framer-motion";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface JobData {
  id: string;
  title: string;
  location: string;
  department: string;
  type: string;
  description: string;
}

export default function Careers() {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [jobToEdit, setJobToEdit] = useState<JobData | null>(null);
  const [jobToDelete, setJobToDelete] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: jobs, isLoading } = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("job_listings")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data as JobData[];
    },
  });

  // Check if user is admin
  useQuery({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return false;

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();

      setIsAdmin(profile?.role === "admin");
      return profile?.role === "admin";
    },
  });

  const handleDelete = async () => {
    if (!jobToDelete) return;

    try {
      const { error } = await supabase
        .from("job_listings")
        .delete()
        .eq("id", jobToDelete);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Job listing deleted successfully",
      });

      // Refresh the jobs list
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    } catch (error: any) {
      console.error("Error deleting job listing:", error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setJobToDelete(null);
    }
  };

  return (
    <div className="min-h-screen bg-accent">
      <MainNav />
      
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40"
          alt="Careers"
          className="w-full h-[200px] md:h-[300px] object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20" />
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-4 md:mb-6">
              Join Our Team
            </h1>
            <p className="text-secondary/70 max-w-2xl mx-auto text-sm md:text-base">
              Be part of our mission to transform education management
            </p>
          </div>
        </div>
      </div>

      <section className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        {isAdmin && (
          <div className="mb-6 md:mb-8">
            <JobListingManager 
              jobToEdit={jobToEdit}
              onEditComplete={() => setJobToEdit(null)}
            />
          </div>
        )}

        <div className="grid gap-4 md:gap-6 mb-8 md:mb-16">
          {isLoading ? (
            <div className="flex justify-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : jobs && jobs.length > 0 ? (
            jobs.map((job) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <JobListing
                  id={job.id}
                  title={job.title}
                  location={job.location}
                  department={job.department}
                  type={job.type}
                  description={job.description}
                  onApply={() => setSelectedJob(job.title)}
                  onEdit={() => setJobToEdit(job)}
                  onDelete={() => setJobToDelete(job.id)}
                  isAdmin={isAdmin}
                />
              </motion.div>
            ))
          ) : (
            <div className="text-center p-8 bg-white rounded-lg shadow border">
              <p className="text-muted-foreground">No job listings available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      <Dialog open={!!selectedJob} onOpenChange={() => setSelectedJob(null)}>
        <DialogContent className="sm:max-w-[500px] max-w-[90vw] max-h-[90vh] overflow-y-auto">
          {selectedJob && (
            <JobApplication
              jobTitle={selectedJob}
              onClose={() => setSelectedJob(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!jobToDelete} onOpenChange={() => setJobToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the job listing.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Footer />
    </div>
  );
}
