
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { CreditCard, FileText, BarChart, Clock, Bell, Shield } from "lucide-react";
import { motion } from "framer-motion";

const PayrollManagement = () => {
  console.log("Rendering PayrollManagement page");
  
  return (
    <div className="min-h-screen bg-accent">
      <MainNav />
      
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
          alt="Payroll Management"
          className="w-full h-[300px] object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20" />
      </div>

      <section className="relative -mt-20 px-6">
        <div className="container">
          <PageHeader 
            title="Payroll Management"
            description="Automated salary processing with tax calculations, deductions, and compliance management."
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
    title: "Salary Processing",
    description: "Automated calculation and disbursement of salaries.",
    icon: CreditCard,
  },
  {
    title: "Tax Management",
    description: "Handle tax calculations and deductions efficiently.",
    icon: FileText,
  },
  {
    title: "Reports Generation",
    description: "Comprehensive payroll reports and analytics.",
    icon: BarChart,
  },
  {
    title: "Attendance Integration",
    description: "Seamless integration with attendance records.",
    icon: Clock,
  },
  {
    title: "Notifications",
    description: "Automated alerts for salary processing and updates.",
    icon: Bell,
  },
  {
    title: "Security Controls",
    description: "Secure payroll processing and data protection.",
    icon: Shield,
  },
];

export default PayrollManagement;

