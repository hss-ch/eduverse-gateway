
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { GraduationCap, ClipboardList, BarChart, Calendar, Bell, Shield } from "lucide-react";
import { motion } from "framer-motion";

const ExaminationManagement = () => {
  console.log("Rendering ExaminationManagement page");
  
  return (
    <div className="min-h-screen bg-accent">
      <MainNav />
      
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
          alt="Examination Management"
          className="w-full h-[300px] object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20" />
      </div>

      <section className="relative -mt-20 px-6">
        <div className="container">
          <PageHeader 
            title="Examination Management"
            description="End-to-end exam management from scheduling to result publication with grade analysis."
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
    title: "Exam Scheduling",
    description: "Plan and organize examinations with automated scheduling system.",
    icon: Calendar,
  },
  {
    title: "Result Management",
    description: "Process and publish examination results efficiently.",
    icon: ClipboardList,
  },
  {
    title: "Performance Analytics",
    description: "Analyze student performance with detailed reports and insights.",
    icon: BarChart,
  },
  {
    title: "Question Bank",
    description: "Maintain a comprehensive digital question bank for various subjects.",
    icon: GraduationCap,
  },
  {
    title: "Result Notifications",
    description: "Automated alerts for result publication and updates.",
    icon: Bell,
  },
  {
    title: "Security Measures",
    description: "Ensure exam integrity with robust security protocols.",
    icon: Shield,
  },
];

export default ExaminationManagement;
