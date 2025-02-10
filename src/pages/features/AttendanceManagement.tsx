
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { Clock, BarChart, Bell, CalendarCheck, UserCheck, FileSpreadsheet } from "lucide-react";
import { motion } from "framer-motion";

const AttendanceManagement = () => {
  console.log("Rendering AttendanceManagement page");
  
  return (
    <div className="min-h-screen bg-accent">
      <MainNav />
      
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
          alt="Attendance Management"
          className="w-full h-[300px] object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20" />
      </div>

      <section className="relative -mt-20 px-6">
        <div className="container">
          <PageHeader 
            title="Attendance Tracking"
            description="Digital attendance management system with real-time tracking, automated reports, and instant notifications."
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
    title: "Real-time Tracking",
    description: "Monitor attendance in real-time with digital check-in/check-out system.",
    icon: Clock,
  },
  {
    title: "Analytics Dashboard",
    description: "Comprehensive attendance analytics with visual reports and insights.",
    icon: BarChart,
  },
  {
    title: "Smart Notifications",
    description: "Automated alerts for absent students and attendance updates.",
    icon: Bell,
  },
  {
    title: "Calendar Integration",
    description: "Seamless integration with academic calendar and schedules.",
    icon: CalendarCheck,
  },
  {
    title: "Biometric Support",
    description: "Support for biometric attendance and manual verification.",
    icon: UserCheck,
  },
  {
    title: "Custom Reports",
    description: "Generate customized attendance reports and statistics.",
    icon: FileSpreadsheet,
  },
];

export default AttendanceManagement;
