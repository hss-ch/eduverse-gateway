import { motion } from "framer-motion";
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
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
  return (
    <div className="min-h-screen bg-accent">
      <MainNav />
      
      <section className="pt-24 px-6">
        <div className="container">
          <PageHeader 
            title="Comprehensive ERP Features"
            description="Everything you need to manage your educational institution efficiently"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {features.map((category) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <category.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-secondary mb-2">
                        {category.title}
                      </h3>
                      <p className="text-secondary/70 text-sm">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </Card>
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
    title: "Admissions Management",
    description: "Streamline the entire admission process from application to enrollment with automated workflows and document management.",
    icon: BookOpen,
  },
  {
    title: "Student Management",
    description: "Comprehensive student information system with academic records, attendance tracking, and performance analytics.",
    icon: Users,
  },
  {
    title: "Staff/Faculty Management",
    description: "Complete HR management system for staff recruitment, performance evaluation, and professional development.",
    icon: ClipboardList,
  },
  {
    title: "Class Timetables",
    description: "Smart scheduling system for classes, labs, and resources with conflict resolution and optimization.",
    icon: Calendar,
  },
  {
    title: "Attendance Tracking",
    description: "Digital attendance management for students and staff with real-time tracking and reporting.",
    icon: Clock,
  },
  {
    title: "Examination Management",
    description: "End-to-end exam management from scheduling to result publication with grade analysis.",
    icon: GraduationCap,
  },
  {
    title: "Fee Management",
    description: "Comprehensive fee structure management with installment options and defaulter tracking.",
    icon: CreditCard,
  },
  {
    title: "Payment Gateway",
    description: "Secure online payment processing for fees, donations, and other transactions.",
    icon: Globe,
  },
  {
    title: "Online Examination",
    description: "Virtual examination platform with various question formats, anti-cheating measures, and automated evaluation.",
    icon: Laptop,
  },
  {
    title: "Online Feedback",
    description: "Digital feedback system for course evaluation, teacher assessment, and institutional improvement.",
    icon: MessageSquare,
  },
  {
    title: "Certificate Generation",
    description: "Automated generation of various certificates with digital signatures and verification system.",
    icon: Award,
  },
  {
    title: "Notifications",
    description: "Multi-channel notification system for announcements, alerts, and reminders.",
    icon: Bell,
  },
  {
    title: "Hostel Management",
    description: "Complete hostel administration with room allocation, mess management, and complaint handling.",
    icon: Home,
  },
  {
    title: "Transport Management",
    description: "Fleet management with route optimization, tracking, and fee collection for transportation services.",
    icon: Bus,
  },
  {
    title: "Grievance Redressal",
    description: "Online platform for raising and resolving grievances with tracking and escalation mechanisms.",
    icon: MessageCircle,
  },
  {
    title: "Leave Management",
    description: "Digital leave application and approval system with balance tracking and substitution management.",
    icon: CalendarDays,
  },
  {
    title: "Payroll Management",
    description: "Automated salary processing with tax calculations, deductions, and compliance management.",
    icon: Wallet,
  },
  {
    title: "Library Management",
    description: "Digital library system with catalog management, issue/return tracking, and online resources.",
    icon: Library,
  },
  {
    title: "Academic Planning",
    description: "Curriculum planning and academic calendar management with outcome-based education support.",
    icon: BookMarked,
  },
  {
    title: "Inventory Management",
    description: "Track and manage institutional assets, supplies, and maintenance schedules.",
    icon: Building2,
  },
  {
    title: "Reports & Analytics",
    description: "Comprehensive reporting system with customizable dashboards and data analytics.",
    icon: FileSpreadsheet,
  },
];

export default Features;