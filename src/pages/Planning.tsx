
import { motion } from "framer-motion";
import { Calendar, Clock, BarChart, ClipboardList, Users, Building } from "lucide-react";
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";

const Planning = () => {
  return (
    <div className="min-h-screen bg-accent">
      <MainNav />
      
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
          alt="Planning & Scheduling"
          className="w-full h-[300px] object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20" />
      </div>

      <section className="relative -mt-20 px-6">
        <div className="container">
          <PageHeader 
            title="Planning & Scheduling"
            description="Optimize your institutional planning with smart scheduling tools"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
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
    title: "Calendar Management",
    description: "Plan and organize academic calendars with our intuitive scheduling tools.",
    icon: Calendar,
  },
  {
    title: "Resource Scheduling",
    description: "Efficiently allocate and manage institutional resources for optimal utilization.",
    icon: Clock,
  },
  {
    title: "Analytics & Reports",
    description: "Generate insights with comprehensive planning analytics and customizable reports.",
    icon: BarChart,
  },
  {
    title: "Task Planning",
    description: "Create, assign and track tasks with deadlines and priority levels.",
    icon: ClipboardList,
  },
  {
    title: "Faculty Allocation",
    description: "Optimize faculty workload with smart scheduling and allocation tools.",
    icon: Users,
  },
  {
    title: "Facility Management",
    description: "Plan and schedule the use of institutional facilities and infrastructure.",
    icon: Building,
  },
];

export default Planning;
