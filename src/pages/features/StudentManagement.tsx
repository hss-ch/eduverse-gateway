import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { Users, GraduationCap, FileCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

const StudentManagement = () => {
  console.log("Rendering StudentManagement page");
  
  return (
    <div className="min-h-screen bg-accent">
      <MainNav />
      
      <section className="pt-24 px-6">
        <div className="container">
          <PageHeader 
            title="Student Management"
            description="Comprehensive student information system with academic records, attendance tracking, and performance analytics."
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
    title: "Student Records",
    description: "Maintain comprehensive digital records of student information, academic history, and personal details.",
    icon: Users,
  },
  {
    title: "Academic Progress",
    description: "Track and analyze student performance with detailed progress reports and grade management.",
    icon: GraduationCap,
  },
  {
    title: "Document Management",
    description: "Organize and manage student documents, certificates, and academic records securely.",
    icon: FileCheck,
  },
];

export default StudentManagement;