import { motion } from "framer-motion";
import { Briefcase, Building, User, Mail, Phone } from "lucide-react";
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

const Careers = () => {
  const { toast } = useToast();
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    coverLetter: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the application to your backend
    console.log("Submitting application:", { ...formData, jobTitle: selectedJob });
    
    toast({
      title: "Application Submitted",
      description: "Thank you for your interest! We'll review your application and get back to you soon.",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      coverLetter: "",
    });
    setSelectedJob(null);
  };

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
                <Button 
                  className="w-full"
                  onClick={() => setSelectedJob(job.title)}
                >
                  Apply Now
                </Button>
              </motion.article>
            ))}
          </div>

          {selectedJob && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg mb-16"
            >
              <h2 className="text-2xl font-bold text-secondary mb-6">
                Apply for {selectedJob}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-secondary mb-2">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-secondary mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-secondary mb-2">
                    Phone
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="coverLetter" className="block text-sm font-medium text-secondary mb-2">
                    Cover Letter
                  </label>
                  <Textarea
                    id="coverLetter"
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleInputChange}
                    required
                    className="min-h-[200px]"
                  />
                </div>
                <div className="flex gap-4">
                  <Button type="submit" className="flex-1">
                    Submit Application
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setSelectedJob(null)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </motion.div>
          )}
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