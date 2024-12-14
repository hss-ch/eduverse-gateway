import { motion } from "framer-motion";
import { BookOpen, Users, GraduationCap } from "lucide-react";
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";

const Academic = () => {
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
              Academic Management
            </h1>
            <p className="text-secondary/70 max-w-2xl mx-auto">
              Streamline your academic operations with our comprehensive management tools
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
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
];

export default Academic;