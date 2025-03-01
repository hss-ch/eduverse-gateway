
import { motion } from "framer-motion";
import { ClipboardCheck, FileText, Settings, Users, Bell, Database } from "lucide-react";
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";

const Administrative = () => {
  return (
    <div className="min-h-screen bg-accent">
      <MainNav />
      
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
          alt="Administration"
          className="w-full h-[300px] object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20" />
      </div>

      <section className="relative -mt-20 px-6">
        <div className="container">
          <PageHeader 
            title="Administration"
            description="Simplify administrative tasks with our powerful management tools"
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
    title: "Document Management",
    description: "Organize and manage administrative documents efficiently in a secure digital system.",
    icon: FileText,
  },
  {
    title: "Task Automation",
    description: "Automate routine administrative tasks to save time and reduce errors.",
    icon: ClipboardCheck,
  },
  {
    title: "System Configuration",
    description: "Customize system settings to match your institution's needs and workflows.",
    icon: Settings,
  },
  {
    title: "Staff Management",
    description: "Efficiently manage staff information, roles, and responsibilities.",
    icon: Users,
  },
  {
    title: "Notification System",
    description: "Send automated notifications and important updates to relevant stakeholders.",
    icon: Bell,
  },
  {
    title: "Data Management",
    description: "Centralize institutional data with secure storage and easy retrieval systems.",
    icon: Database,
  },
];

export default Administrative;
