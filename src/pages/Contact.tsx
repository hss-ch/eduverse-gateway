
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { DemoScheduler } from "@/components/demo/DemoScheduler";

const Contact = () => {
  return (
    <div className="min-h-screen bg-accent">
      <MainNav />
      
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216"
          alt="Contact Us"
          className="w-full h-[300px] object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
              Contact Us
            </h1>
            <p className="text-secondary/70 max-w-2xl mx-auto">
              Get in touch with our team for any questions or schedule a demo
            </p>
          </div>
        </div>
      </div>
      
      <section className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-secondary">Email Us</h3>
                    <p className="text-secondary/70">support@GuideCampus.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-secondary">Call Us</h3>
                    <p className="text-secondary/70">+91 85558 62483</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-secondary">Visit Us</h3>
                    <p className="text-secondary/70">
                      Charvi Technologies Private Limited<br />
                      Nizampet<br />
                      Hyderabad, TG 500090
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-sm"
          >
            <DemoScheduler />
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Contact;
