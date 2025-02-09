
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { Globe, CreditCard, Shield } from "lucide-react";
import { motion } from "framer-motion";

const PaymentGateway = () => {
  console.log("Rendering PaymentGateway page");
  
  return (
    <div className="min-h-screen bg-accent">
      <MainNav />
      
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
          alt="Payment Gateway"
          className="w-full h-[300px] object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20" />
      </div>

      <section className="relative -mt-20 px-6">
        <div className="container">
          <PageHeader 
            title="Payment Gateway"
            description="Secure online payment processing for fees, donations, and other transactions."
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
    title: "Secure Transactions",
    description: "Industry-standard security protocols for safe payment processing.",
    icon: Shield,
  },
  {
    title: "Multiple Payment Methods",
    description: "Support for various payment methods including cards, UPI, and net banking.",
    icon: CreditCard,
  },
  {
    title: "Global Support",
    description: "Accept payments from anywhere with multi-currency support.",
    icon: Globe,
  },
];

export default PaymentGateway;
