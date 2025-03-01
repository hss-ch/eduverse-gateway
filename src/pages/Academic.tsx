
import { motion } from "framer-motion";
import { BookOpen, Users, GraduationCap, Calendar, ClipboardCheck, BarChart } from "lucide-react";
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";

const Academic = () => {
  return (
    <div className="min-h-screen bg-accent">
      <MainNav />
      
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
          alt="Academic Management"
          className="w-full h-[300px] object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20" />
      </div>

      <section className="relative -mt-20 px-6">
        <div className="container">
          <PageHeader 
            title="Academic Management"
            description="Streamline your academic operations with our comprehensive management tools"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
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
    title: "Curriculum Management",
    description: "Design and manage curriculum with ease, ensuring alignment with educational standards.",
    icon: BookOpen,
  },
  {
    title: "Student Progress Tracking",
    description: "Monitor and analyze student performance with comprehensive tracking tools.",
    icon: Users,
  },
  {
    title: "Grade Management",
    description: "Streamline grading processes and generate detailed performance reports.",
    icon: GraduationCap,
  },
  {
    title: "Academic Calendar",
    description: "Plan and organize academic calendars, events and deadlines efficiently.",
    icon: Calendar,
  },
  {
    title: "Outcome-Based Education",
    description: "Implement and track outcome-based education frameworks and assessments.",
    icon: ClipboardCheck,
  },
  {
    title: "Performance Analytics",
    description: "Generate comprehensive insights with detailed academic performance analytics.",
    icon: BarChart,
  },
];

export default Academic;
