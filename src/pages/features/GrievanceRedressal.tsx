
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { MessageSquare, AlertCircle, User, Calendar, FileText, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const GrievanceRedressal = () => {
  console.log("Rendering GrievanceRedressal page");
  
  return (
    <div className="min-h-screen bg-accent">
      <MainNav />
      
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40"
          alt="Grievance Redressal"
          className="w-full h-[300px] object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20" />
      </div>

      <section className="relative -mt-20 px-6">
        <div className="container">
          <PageHeader 
            title="Grievance Redressal"
            description="Online platform for raising and resolving grievances with tracking and escalation mechanisms."
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
    title: "Complaint Filing",
    description: "Easy-to-use platform for submitting grievances and concerns.",
    icon: MessageSquare,
  },
  {
    title: "Status Tracking",
    description: "Real-time updates on grievance resolution progress.",
    icon: AlertCircle,
  },
  {
    title: "Committee Management",
    description: "Coordinate with grievance resolution committees efficiently.",
    icon: User,
  },
  {
    title: "Timeline Management",
    description: "Monitor resolution timelines and track deadlines.",
    icon: Calendar,
  },
  {
    title: "Documentation",
    description: "Maintain complete records of all grievance cases.",
    icon: FileText,
  },
  {
    title: "Resolution Updates",
    description: "Track and update grievance resolution status.",
    icon: CheckCircle,
  },
];

export default GrievanceRedressal;
