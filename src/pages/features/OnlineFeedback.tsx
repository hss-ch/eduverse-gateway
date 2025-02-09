
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { MessageSquare, Star, BarChart } from "lucide-react";
import { motion } from "framer-motion";

const OnlineFeedback = () => {
  console.log("Rendering OnlineFeedback page");
  
  return (
    <div className="min-h-screen bg-accent">
      <MainNav />
      
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
          alt="Online Feedback"
          className="w-full h-[300px] object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20" />
      </div>

      <section className="relative -mt-20 px-6">
        <div className="container">
          <PageHeader 
            title="Online Feedback"
            description="Digital feedback system for course evaluation, teacher assessment, and institutional improvement."
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
    title: "Course Evaluation",
    description: "Comprehensive feedback system for course content and delivery assessment.",
    icon: MessageSquare,
  },
  {
    title: "Performance Rating",
    description: "Multi-parameter rating system for faculty and institutional evaluation.",
    icon: Star,
  },
  {
    title: "Analytics Dashboard",
    description: "Detailed analysis and visualization of feedback data.",
    icon: BarChart,
  },
];

export default OnlineFeedback;
