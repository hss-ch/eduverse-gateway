
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { Calendar, Clock, CalendarCheck, CalendarRange, ListCheck, Table } from "lucide-react";
import { motion } from "framer-motion";

const TimetablesManagement = () => {
  console.log("Rendering TimetablesManagement page");
  
  return (
    <div className="min-h-screen bg-accent">
      <MainNav />
      
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
          alt="Timetable Management"
          className="w-full h-[300px] object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20" />
      </div>

      <section className="relative -mt-20 px-6">
        <div className="container">
          <PageHeader 
            title="Class Timetables"
            description="Smart scheduling system for classes, labs, and resources with conflict resolution and optimization."
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
    title: "Smart Scheduling",
    description: "Automatically generate optimal timetables considering all constraints and requirements.",
    icon: Calendar,
  },
  {
    title: "Time Management",
    description: "Efficient allocation of time slots for different classes and activities.",
    icon: Clock,
  },
  {
    title: "Schedule Verification",
    description: "Verify and validate schedules to avoid conflicts and overlaps.",
    icon: CalendarCheck,
  },
  {
    title: "Date Range Planning",
    description: "Plan schedules across multiple dates and academic terms.",
    icon: CalendarRange,
  },
  {
    title: "Task Management",
    description: "Track and manage academic tasks and activities within the timetable.",
    icon: ListCheck,
  },
  {
    title: "Visual Timetables",
    description: "Generate clear, visual representations of schedules for easy understanding.",
    icon: Table,
  },
];

export default TimetablesManagement;

