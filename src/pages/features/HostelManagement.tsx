
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { Building2, Users, MessageSquare, Calendar, ClipboardCheck, Bell } from "lucide-react";
import { motion } from "framer-motion";

const HostelManagement = () => {
  console.log("Rendering HostelManagement page");
  
  return (
    <div className="min-h-screen bg-accent">
      <MainNav />
      
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5"
          alt="Hostel Management"
          className="w-full h-[300px] object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20" />
      </div>

      <section className="relative -mt-20 px-6">
        <div className="container">
          <PageHeader 
            title="Hostel Management"
            description="Complete hostel administration system with room allocation, mess management, and complaint handling."
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
    title: "Room Management",
    description: "Efficient room allocation and maintenance tracking system.",
    icon: Building2,
  },
  {
    title: "Student Records",
    description: "Complete resident information and attendance tracking.",
    icon: Users,
  },
  {
    title: "Complaint System",
    description: "Digital platform for raising and resolving hostel-related issues.",
    icon: MessageSquare,
  },
  {
    title: "Attendance Tracking",
    description: "Monitor student check-in/check-out and leave management.",
    icon: Calendar,
  },
  {
    title: "Mess Management",
    description: "Track meal plans, schedules, and feedback system.",
    icon: ClipboardCheck,
  },
  {
    title: "Notifications",
    description: "Instant alerts for important announcements and updates.",
    icon: Bell,
  },
];

export default HostelManagement;
