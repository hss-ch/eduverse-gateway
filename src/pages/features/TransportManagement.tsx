
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { Bus, MapPin, Clock, Users, Bell, FileText } from "lucide-react";
import { motion } from "framer-motion";

const TransportManagement = () => {
  console.log("Rendering TransportManagement page");
  
  return (
    <div className="min-h-screen bg-accent">
      <MainNav />
      
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957"
          alt="Transport Management"
          className="w-full h-[300px] object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20" />
      </div>

      <section className="relative -mt-20 px-6">
        <div className="container">
          <PageHeader 
            title="Transport Management"
            description="Comprehensive fleet management system with route optimization, tracking, and fee collection."
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
    title: "Fleet Management",
    description: "Track and maintain vehicle fleet with comprehensive service records.",
    icon: Bus,
  },
  {
    title: "Route Planning",
    description: "Optimize transport routes for efficient service delivery.",
    icon: MapPin,
  },
  {
    title: "Schedule Management",
    description: "Create and manage detailed transport schedules.",
    icon: Clock,
  },
  {
    title: "Passenger Tracking",
    description: "Monitor student transportation and attendance.",
    icon: Users,
  },
  {
    title: "Notifications",
    description: "Real-time alerts for schedule changes and delays.",
    icon: Bell,
  },
  {
    title: "Documentation",
    description: "Maintain vehicle and driver documentation digitally.",
    icon: FileText,
  },
];

export default TransportManagement;
