
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { ClipboardList, BarChart, Bell, Package, Truck, Shield } from "lucide-react";
import { motion } from "framer-motion";

const InventoryManagement = () => {
  console.log("Rendering InventoryManagement page");
  
  return (
    <div className="min-h-screen bg-accent">
      <MainNav />
      
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
          alt="Inventory Management"
          className="w-full h-[300px] object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20" />
      </div>

      <section className="relative -mt-20 px-6">
        <div className="container">
          <PageHeader 
            title="Inventory Management"
            description="Track and manage institutional assets, supplies, and maintenance schedules."
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
    title: "Asset Tracking",
    description: "Monitor and manage institutional assets efficiently.",
    icon: ClipboardList,
  },
  {
    title: "Stock Analytics",
    description: "Analyze inventory levels and usage patterns.",
    icon: BarChart,
  },
  {
    title: "Maintenance Alerts",
    description: "Automated alerts for maintenance and restocking.",
    icon: Bell,
  },
  {
    title: "Stock Management",
    description: "Manage stock levels and inventory distribution.",
    icon: Package,
  },
  {
    title: "Supplier Management",
    description: "Track suppliers and manage procurement processes.",
    icon: Truck,
  },
  {
    title: "Security Controls",
    description: "Secure access controls and audit trails.",
    icon: Shield,
  },
];

export default InventoryManagement;
