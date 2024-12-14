import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const NbaAccreditation = () => {
  const features = [
    "Program Outcomes Assessment",
    "Curriculum Development",
    "Faculty Expertise Evaluation",
    "Industry Collaboration",
    "Laboratory Infrastructure",
    "Student Performance Tracking",
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
        title="NBA Accreditation" 
        description="National Board of Accreditation - Excellence in Technical Education"
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
                Why Choose NBA Accreditation?
              </h2>
              <p className="text-secondary/70 mb-6">
                NBA accreditation ensures that the technical education programs meet 
                the quality standards set by the industry. It focuses on outcome-based 
                education and continuous improvement.
              </p>
              <div className="aspect-video rounded-lg overflow-hidden mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
                  alt="NBA Accreditation Process"
                  className="w-full h-full object-cover"
                />
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
                  Key Features
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
            Get Started with NBA Accreditation
          </Link>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default NbaAccreditation;