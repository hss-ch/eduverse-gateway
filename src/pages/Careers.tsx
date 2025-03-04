
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
import { EmployeeTestimonial } from "@/components/careers/EmployeeTestimonial";

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

      {/* Mission Statement Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-6">
                The future is created by people like you
              </h2>
              <p className="text-muted-foreground mb-6">
                At GuideCampus, we believe that transforming education requires exceptional talent. 
                We're building a team of passionate innovators who are committed to making education 
                more accessible, efficient, and effective through technology.
              </p>
              <p className="text-muted-foreground mb-6">
                When you join GuideCampus, you become part of a mission to empower educational 
                institutions across the globe. We offer a collaborative environment where your 
                ideas matter and your growth is prioritized.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-muted p-4 rounded-lg flex-1 min-w-[200px]">
                  <h3 className="font-bold text-lg mb-2">Innovation</h3>
                  <p className="text-sm text-muted-foreground">We encourage creative thinking and bold solutions</p>
                </div>
                <div className="bg-muted p-4 rounded-lg flex-1 min-w-[200px]">
                  <h3 className="font-bold text-lg mb-2">Growth</h3>
                  <p className="text-sm text-muted-foreground">We invest in your personal and professional development</p>
                </div>
                <div className="bg-muted p-4 rounded-lg flex-1 min-w-[200px]">
                  <h3 className="font-bold text-lg mb-2">Impact</h3>
                  <p className="text-sm text-muted-foreground">Your work directly affects educational outcomes worldwide</p>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <img 
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c" 
                alt="Team collaborating" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Employee Testimonials Section */}
      <section className="py-12 md:py-20 bg-accent">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-12">
            Employee Experience - Hear from Our Team
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <EmployeeTestimonial 
              name="Priya Sharma"
              position="Senior Product Designer"
              years="4 years at GuideCampus"
              testimonial="Working at GuideCampus has given me the opportunity to solve real problems in education while growing my design skills. The collaborative environment and focus on user impact is unmatched."
              imageSrc="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
            />
            
            <EmployeeTestimonial 
              name="Rahul Mehta"
              position="Engineering Manager"
              years="3 years at GuideCampus"
              testimonial="I joined GuideCampus because I wanted my technical skills to make a difference. Today, our solutions are helping institutions serve thousands of students better, and that's incredibly rewarding."
              imageSrc="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
            />
            
            <EmployeeTestimonial 
              name="Anjali Patel"
              position="Customer Success Lead"
              years="2 years at GuideCampus"
              testimonial="The growth opportunities at GuideCampus are exceptional. I started in support and now lead our customer success initiatives. The company truly invests in its people."
              imageSrc="https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
            />
          </div>
        </div>
      </section>

      {/* Job Openings Section */}
      <section className="container mx-auto px-4 md:px-6 py-12 md:py-20">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8">
          Openings at GuideCampus
        </h2>
        
        <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-12">
          Join our team and help shape the future of education technology. We're looking for passionate individuals
          who are excited about making a difference in the education sector.
        </p>

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
