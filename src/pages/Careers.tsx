import { useState } from "react";
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { JobListing } from "@/components/careers/JobListing";
import { JobListingManager } from "@/components/careers/JobListingManager";
import { JobApplication } from "@/components/careers/JobApplication";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export default function Careers() {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

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

  return (
    <div className="min-h-screen bg-accent">
      <MainNav />
      
      <section className="pt-24 px-6">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
              Join Our Team
            </h1>
            <p className="text-secondary/70 max-w-2xl mx-auto">
              Be part of our mission to transform education management
            </p>
          </motion.div>

          {isAdmin && (
            <div className="mb-8">
              <JobListingManager />
            </div>
          )}

          <div className="grid gap-6 mb-16">
            {isLoading ? (
              <div>Loading...</div>
            ) : jobs?.map((job) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <JobListing
                  title={job.title}
                  location={job.location}
                  department={job.department}
                  type={job.type}
                  description={job.description}
                  onApply={() => setSelectedJob(job.title)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={!!selectedJob} onOpenChange={() => setSelectedJob(null)}>
        <DialogContent>
          {selectedJob && (
            <JobApplication
              jobTitle={selectedJob}
              onClose={() => setSelectedJob(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}