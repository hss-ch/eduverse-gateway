import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { BookOpen, Users, ClipboardList } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

const AdmissionsManagement = () => {
  console.log("Rendering AdmissionsManagement page");
  
  return (
    <div className="min-h-screen bg-accent">
      <MainNav />
      
      <section className="pt-24 px-6">
        <div className="container">
          <PageHeader 
            title="Admissions Management"
            description="Streamline the entire admission process from application to enrollment with automated workflows and document management."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 rounded-2xl bg-white hover:shadow-lg transition-all duration-300"
              >
                <feature.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold text-secondary mb-2">
                  {feature.title}
                </h3>
                <p className="text-secondary/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const features = [
  {
    title: "Online Applications",
    description: "Enable prospective students to apply online with a user-friendly application form and document upload system.",
    icon: BookOpen,
  },
  {
    title: "Application Tracking",
    description: "Track application status, manage documents, and communicate with applicants throughout the process.",
    icon: Users,
  },
  {
    title: "Document Management",
    description: "Securely store and manage all admission-related documents with easy retrieval and verification.",
    icon: ClipboardList,
  },
];

export default AdmissionsManagement;