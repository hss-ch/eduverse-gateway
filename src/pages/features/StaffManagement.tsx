
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { Users, ClipboardCheck, Award, Calendar, FileText, Bell } from "lucide-react";
import { motion } from "framer-motion";

const StaffManagement = () => {
  console.log("Rendering StaffManagement page");
  
  return (
    <div className="min-h-screen bg-accent">
      <MainNav />
      
      <section className="pt-24 px-6">
        <div className="container">
          <PageHeader 
            title="Staff Management"
            description="Complete HR management system for staff recruitment, performance evaluation, and professional development."
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
    title: "HR Management",
    description: "Comprehensive staff information management and HR operations.",
    icon: Users,
  },
  {
    title: "Performance Evaluation",
    description: "Track and evaluate staff performance with customizable metrics.",
    icon: ClipboardCheck,
  },
  {
    title: "Professional Development",
    description: "Plan and track professional growth and training programs.",
    icon: Award,
  },
  {
    title: "Leave Management",
    description: "Efficient leave application and approval system.",
    icon: Calendar,
  },
  {
    title: "Documentation",
    description: "Digital storage and management of staff documents.",
    icon: FileText,
  },
  {
    title: "Notifications",
    description: "Automated alerts for important updates and deadlines.",
    icon: Bell,
  },
];

export default StaffManagement;
