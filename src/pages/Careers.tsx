import { useState } from "react";
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { JobListing } from "@/components/careers/JobListing";
import { JobApplication } from "@/components/careers/JobApplication";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion } from "framer-motion";

const jobOpenings = [
  {
    title: "Senior Frontend Developer",
    location: "San Francisco, CA",
    department: "Engineering",
    type: "Full-time",
    description: "Join our engineering team to build the future of education management software using React, TypeScript, and modern web technologies.",
  },
  {
    title: "Product Manager",
    location: "Remote",
    department: "Product",
    type: "Full-time",
    description: "Lead product strategy and development for our education management platform, working closely with engineering and design teams.",
  },
  {
    title: "UX Designer",
    location: "New York, NY",
    department: "Design",
    type: "Full-time",
    description: "Create intuitive and engaging user experiences for our platform, focusing on user research and interface design.",
  },
];

export default function Careers() {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);

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

          <div className="grid gap-6 mb-16">
            {jobOpenings.map((job, index) => (
              <motion.div
                key={job.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <JobListing
                  {...job}
                  onApply={() => setSelectedJob(job.title)}
                />
              </motion.div>
            ))}
          </div>

          <Dialog open={!!selectedJob} onOpenChange={() => setSelectedJob(null)}>
            <DialogContent className="max-w-2xl">
              {selectedJob && (
                <JobApplication
                  jobTitle={selectedJob}
                  onClose={() => setSelectedJob(null)}
                />
              )}
            </DialogContent>
          </Dialog>
        </div>
      </section>

      <Footer />
    </div>
  );
}