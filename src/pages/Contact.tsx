import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
  return (
    <div className="min-h-screen bg-accent">
      <MainNav />
      
      <section className="pt-24 px-6">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
              Contact Us
            </h1>
            <p className="text-secondary/70 max-w-2xl mx-auto">
              Get in touch with our team for any questions or support
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
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
                  <p className="text-secondary/70">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <MapPin className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-secondary">Visit Us</h3>
                  <p className="text-secondary/70">123 Education Street<br />Tech City, TC 12345</p>
                </div>
              </div>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6 bg-white p-8 rounded-2xl"
            >
              <div className="space-y-2">
                <label className="text-sm font-medium text-secondary">Name</label>
                <Input placeholder="Your name" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-secondary">Email</label>
                <Input type="email" placeholder="your@email.com" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-secondary">Message</label>
                <Textarea placeholder="How can we help?" className="min-h-[120px]" />
              </div>
              
              <Button className="w-full">Send Message</Button>
            </motion.form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;