
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { Library, BookOpen, Users, Search, Clock, Bell } from "lucide-react";
import { motion } from "framer-motion";

const LibraryManagement = () => {
  console.log("Rendering LibraryManagement page");
  
  return (
    <div className="min-h-screen bg-accent">
      <MainNav />
      
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570"
          alt="Library Management"
          className="w-full h-[300px] object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20" />
      </div>

      <section className="relative -mt-20 px-6">
        <div className="container">
          <PageHeader 
            title="Library Management"
            description="Digital library system with catalog management, issue/return tracking, and online resources."
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
    title: "Catalog Management",
    description: "Digital catalog of all library resources and materials.",
    icon: Library,
  },
  {
    title: "Issue & Return",
    description: "Track book issues, returns, and manage due dates.",
    icon: BookOpen,
  },
  {
    title: "Member Management",
    description: "Manage library memberships and access controls.",
    icon: Users,
  },
  {
    title: "Resource Search",
    description: "Advanced search capabilities for library resources.",
    icon: Search,
  },
  {
    title: "Circulation Management",
    description: "Track circulation periods and manage renewals.",
    icon: Clock,
  },
  {
    title: "Notifications",
    description: "Automated alerts for due dates and reservations.",
    icon: Bell,
  },
];

export default LibraryManagement;

