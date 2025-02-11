
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { BookOpen, Timer, Shield, Award, ClipboardCheck, BarChart } from "lucide-react";
import { motion } from "framer-motion";

const OnlineExamination = () => {
  console.log("Rendering OnlineExamination page");
  
  return (
    <div className="min-h-screen bg-accent">
      <MainNav />
      
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
          alt="Online Examination"
          className="w-full h-[300px] object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20" />
      </div>

      <section className="relative -mt-20 px-6">
        <div className="container">
          <PageHeader 
            title="Online Examination"
            description="Virtual examination platform with various question formats, anti-cheating measures, and automated evaluation."
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
    title: "Digital Assessment",
    description: "Comprehensive online testing platform with multiple question formats.",
    icon: BookOpen,
  },
  {
    title: "Smart Timer",
    description: "Automated time management with section-wise time allocation.",
    icon: Timer,
  },
  {
    title: "Secure Environment",
    description: "Advanced proctoring and anti-cheating measures.",
    icon: Shield,
  },
  {
    title: "Auto Grading",
    description: "Instant evaluation and result generation.",
    icon: Award,
  },
  {
    title: "Progress Tracking",
    description: "Real-time monitoring of exam progress and submission status.",
    icon: ClipboardCheck,
  },
  {
    title: "Performance Analytics",
    description: "Detailed analysis of exam results with statistical insights.",
    icon: BarChart,
  },
];

export default OnlineExamination;
