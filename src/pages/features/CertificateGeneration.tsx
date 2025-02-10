
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { Award, FileCheck, Lock, Download, QrCode, History } from "lucide-react";
import { motion } from "framer-motion";

const CertificateGeneration = () => {
  console.log("Rendering CertificateGeneration page");
  
  return (
    <div className="min-h-screen bg-accent">
      <MainNav />
      
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
          alt="Certificate Generation"
          className="w-full h-[300px] object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20" />
      </div>

      <section className="relative -mt-20 px-6">
        <div className="container">
          <PageHeader 
            title="Certificate Generation"
            description="Advanced certificate management system with automated generation, digital signatures, and secure verification."
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
    title: "Automated Generation",
    description: "Bulk certificate generation with customizable templates and designs.",
    icon: Award,
  },
  {
    title: "Digital Signatures",
    description: "Secure digital signing process with multiple authority support.",
    icon: FileCheck,
  },
  {
    title: "Secure Verification",
    description: "Online verification portal with encrypted certificate validation.",
    icon: Lock,
  },
  {
    title: "Batch Processing",
    description: "Process and download multiple certificates simultaneously.",
    icon: Download,
  },
  {
    title: "QR Integration",
    description: "Built-in QR codes for quick certificate verification.",
    icon: QrCode,
  },
  {
    title: "Audit Trail",
    description: "Complete history of certificate generation and verification.",
    icon: History,
  },
];

export default CertificateGeneration;
