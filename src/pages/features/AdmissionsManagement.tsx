
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { BookOpen, Users, ClipboardList, MessageSquare, Bell, FileText } from "lucide-react";
import { motion } from "framer-motion";

const AdmissionsManagement = () => {
  console.log("Rendering AdmissionsManagement page");
  
  return (
    <div className="min-h-screen bg-accent">
      <MainNav />
      
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644"
          alt="Admissions Management"
          className="w-full h-[300px] object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20" />
      </div>

      <section className="relative -mt-20 px-6">
        <div className="container">
          <PageHeader 
            title="Admissions Management"
            description="Comprehensive admission management system with online applications, document verification, and automated workflows."
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
    description: "User-friendly application portal with document upload system.",
    icon: BookOpen,
  },
  {
    title: "Applicant Management",
    description: "Track and process applications with automated workflows.",
    icon: Users,
  },
  {
    title: "Document Verification",
    description: "Digital document verification and validation system.",
    icon: ClipboardList,
  },
  {
    title: "Communication Hub",
    description: "Integrated messaging system for applicant communication.",
    icon: MessageSquare,
  },
  {
    title: "Status Updates",
    description: "Real-time application status updates and notifications.",
    icon: Bell,
  },
  {
    title: "Report Generation",
    description: "Comprehensive admission reports and analytics.",
    icon: FileText,
  },
];

export default AdmissionsManagement;
