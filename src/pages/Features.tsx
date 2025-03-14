
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import {
  BookOpen,
  Users,
  ClipboardList,
  Calendar,
  Clock,
  GraduationCap,
  CreditCard,
  Globe,
  FileCheck,
  MessageSquare,
  Award,
  Bell,
  Home,
  Bus,
  MessageCircle,
  CalendarDays,
  Wallet,
  Building2,
  Library,
  BookMarked,
  Laptop,
  FileSpreadsheet,
} from "lucide-react";

const Features = () => {
  console.log("Features page rendering");
  
  return (
    <div className="min-h-screen bg-accent">
      <MainNav />
      
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
          alt="Features"
          className="w-full h-[300px] object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
              Comprehensive ERP Features
            </h1>
            <p className="text-secondary/70 max-w-2xl mx-auto">
              Everything you need to manage your educational institution efficiently
            </p>
          </div>
        </div>
      </div>

      <section className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link to={feature.path}>
                <Card className="p-6 h-full hover:shadow-lg transition-shadow group">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-secondary mb-2 group-hover:text-primary transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-secondary/70 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

const features = [
  {
    title: "Admissions Management",
    description: "Streamline the entire admission process from application to enrollment with automated workflows and document management.",
    icon: BookOpen,
    path: "/features/admissions-management",
  },
  {
    title: "Student Management",
    description: "Comprehensive student information system with academic records, attendance tracking, and performance analytics.",
    icon: Users,
    path: "/features/student-management",
  },
  {
    title: "Staff/Faculty Management",
    description: "Complete HR management system for staff recruitment, performance evaluation, and professional development.",
    icon: ClipboardList,
    path: "/features/staff-management",
  },
  {
    title: "Class Timetables",
    description: "Smart scheduling system for classes, labs, and resources with conflict resolution and optimization.",
    icon: Calendar,
    path: "/features/timetables-management",
  },
  {
    title: "Attendance Tracking",
    description: "Digital attendance management for students and staff with real-time tracking and reporting.",
    icon: Clock,
    path: "/features/attendance-management",
  },
  {
    title: "Examination Management",
    description: "End-to-end exam management from scheduling to result publication with grade analysis.",
    icon: GraduationCap,
    path: "/features/examination-management",
  },
  {
    title: "Fee Management",
    description: "Comprehensive fee structure management with installment options and defaulter tracking.",
    icon: CreditCard,
    path: "/features/fee-management",
  },
  {
    title: "Payment Gateway",
    description: "Secure online payment processing for fees, donations, and other transactions.",
    icon: Globe,
    path: "/features/payment-gateway",
  },
  {
    title: "Online Examination",
    description: "Virtual examination platform with various question formats, anti-cheating measures, and automated evaluation.",
    icon: Laptop,
    path: "/features/online-examination",
  },
  {
    title: "Online Feedback",
    description: "Digital feedback system for course evaluation, teacher assessment, and institutional improvement.",
    icon: MessageSquare,
    path: "/features/online-feedback",
  },
  {
    title: "Certificate Generation",
    description: "Automated generation of various certificates with digital signatures and verification system.",
    icon: Award,
    path: "/features/certificate-generation",
  },
  {
    title: "Notifications",
    description: "Multi-channel notification system for announcements, alerts, and reminders.",
    icon: Bell,
    path: "/features/notifications",
  },
  {
    title: "Hostel Management",
    description: "Complete hostel administration with room allocation, mess management, and complaint handling.",
    icon: Home,
    path: "/features/hostel-management",
  },
  {
    title: "Transport Management",
    description: "Fleet management with route optimization, tracking, and fee collection for transportation services.",
    icon: Bus,
    path: "/features/transport-management",
  },
  {
    title: "Grievance Redressal",
    description: "Online platform for raising and resolving grievances with tracking and escalation mechanisms.",
    icon: MessageCircle,
    path: "/features/grievance-redressal",
  },
  {
    title: "Leave Management",
    description: "Digital leave application and approval system with balance tracking and substitution management.",
    icon: CalendarDays,
    path: "/features/leave-management",
  },
  {
    title: "Payroll Management",
    description: "Automated salary processing with tax calculations, deductions, and compliance management.",
    icon: Wallet,
    path: "/features/payroll-management",
  },
  {
    title: "Library Management",
    description: "Digital library system with catalog management, issue/return tracking, and online resources.",
    icon: Library,
    path: "/features/library-management",
  },
  {
    title: "Academic Planning",
    description: "Curriculum planning and academic calendar management with outcome-based education support.",
    icon: BookMarked,
    path: "/features/academic-planning",
  },
  {
    title: "Inventory Management",
    description: "Track and manage institutional assets, supplies, and maintenance schedules.",
    icon: Building2,
    path: "/features/inventory-management",
  },
  {
    title: "Reports & Analytics",
    description: "Comprehensive reporting system with customizable dashboards and data analytics.",
    icon: FileSpreadsheet,
    path: "/features/reports-analytics",
  },
];

export default Features;
