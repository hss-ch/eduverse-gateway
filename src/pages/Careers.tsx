import { motion } from "framer-motion";
import { Briefcase, Building, User } from "lucide-react";
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

const Careers = () => {
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {jobOpenings.map((job, index) => (
              <motion.article
                key={job.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-secondary">
                      {job.title}
                    </h3>
                    <p className="text-sm text-secondary/70">{job.location}</p>
                  </div>
                </div>
                <p className="text-secondary/70 mb-6">{job.description}</p>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center text-sm text-secondary/60">
                    <Building className="h-4 w-4 mr-2" />
                    {job.department}
                  </div>
                  <div className="flex items-center text-sm text-secondary/60">
                    <User className="h-4 w-4 mr-2" />
                    {job.type}
                  </div>
                </div>
                <Button className="w-full">Apply Now</Button>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const jobOpenings = [
  {
    title: "Senior Frontend Developer",
    location: "San Francisco, CA",
    department: "Engineering",
    type: "Full-time",
    description: "Join our engineering team to build the future of education management software.",
  },
  {
    title: "Product Manager",
    location: "Remote",
    department: "Product",
    type: "Full-time",
    description: "Lead product strategy and development for our education management platform.",
  },
  {
    title: "UX Designer",
    location: "New York, NY",
    department: "Design",
    type: "Full-time",
    description: "Create intuitive and engaging user experiences for our platform.",
  },
];

export default Careers;