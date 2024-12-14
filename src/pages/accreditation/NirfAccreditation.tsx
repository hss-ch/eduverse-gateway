import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, ArrowLeft, BarChart, GraduationCap, Users } from "lucide-react";
import { Link } from "react-router-dom";

const NirfAccreditation = () => {
  const features = [
    "Teaching, Learning & Resources Assessment",
    "Research and Professional Practice",
    "Graduation Outcomes",
    "Outreach and Inclusivity",
    "Peer Perception",
    "Innovation and Patents"
  ];

  return (
    <div className="min-h-screen bg-accent">
      <MainNav />
      
      <div className="container mx-auto px-6 py-8">
        <Link 
          to="/accreditation"
          className="inline-flex items-center text-primary hover:text-primary/90 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Accreditation
        </Link>
      </div>

      <PageHeader 
        title="NIRF Ranking" 
        description="National Institutional Ranking Framework - India's Premier Institution Ranking System"
      />

      <main className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-secondary mb-6">
                Why Choose NIRF Ranking?
              </h2>
              <p className="text-secondary/70 mb-6">
                NIRF provides a comprehensive methodology to rank institutions across India. 
                It evaluates institutions based on multiple parameters including teaching, 
                research, employability, and social inclusion.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex items-center space-x-4 p-4 bg-blue-100 rounded-lg">
                  <BarChart className="w-8 h-8 text-blue-600" />
                  <span className="text-blue-800">Performance Metrics</span>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-green-100 rounded-lg">
                  <GraduationCap className="w-8 h-8 text-green-600" />
                  <span className="text-green-800">Academic Excellence</span>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-purple-100 rounded-lg">
                  <Users className="w-8 h-8 text-purple-600" />
                  <span className="text-purple-800">Stakeholder Perception</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-secondary mb-6">
                  Key Parameters
                </h3>
                <ul className="space-y-4">
                  {features.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-start"
                    >
                      <CheckCircle className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                      <span className="text-secondary/70">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <Link
            to="/contact"
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Get Started with NIRF Ranking
          </Link>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default NirfAccreditation;