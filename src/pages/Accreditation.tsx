import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Award, CheckCircle, BarChart, BookOpen, Users } from "lucide-react";
import { Link } from "react-router-dom";

const accreditationBodies = [
  {
    name: "NAAC",
    description: "National Assessment and Accreditation Council",
    features: ["Institutional Assessment", "Quality Benchmarking", "Performance Evaluation"],
    icon: Award,
    color: "bg-purple-100",
    iconColor: "text-primary",
    route: "/accreditation/naac"
  },
  {
    name: "NBA",
    description: "National Board of Accreditation",
    features: ["Program Evaluation", "Outcome-Based Education", "Industry Alignment"],
    icon: CheckCircle,
    color: "bg-blue-100",
    iconColor: "text-blue-600",
    route: "/accreditation/nba"
  },
  {
    name: "ABET",
    description: "Accreditation Board for Engineering and Technology",
    features: ["Engineering Programs", "Computing Programs", "International Standards"],
    icon: BookOpen,
    color: "bg-green-100",
    iconColor: "text-green-600",
    route: "/accreditation/abet"
  },
  {
    name: "NIRF",
    description: "National Institutional Ranking Framework",
    features: ["Research Quality", "Graduate Outcomes", "Outreach Inclusion"],
    icon: BarChart,
    color: "bg-orange-100",
    iconColor: "text-orange-600",
    route: "/accreditation/nirf"
  },
  {
    name: "QS",
    description: "Quacquarelli Symonds World University Rankings",
    features: ["Global Rankings", "Academic Reputation", "Research Impact"],
    icon: Users,
    color: "bg-red-100",
    iconColor: "text-red-600",
    route: "/accreditation/qs"
  },
];

const Accreditation = () => {
  return (
    <div className="min-h-screen bg-accent">
      <MainNav />
      
      <PageHeader 
        title="Accreditation & Ranking Solutions" 
        description="Comprehensive software solutions for managing institutional accreditation and rankings"
      />

      <main className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {accreditationBodies.map((body, index) => (
            <motion.div
              key={body.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${body.color} flex items-center justify-center mb-4`}>
                    <body.icon className={`w-6 h-6 ${body.iconColor}`} />
                  </div>
                  <CardTitle className="text-2xl font-bold">{body.name}</CardTitle>
                  <CardDescription className="text-secondary/70">
                    {body.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {body.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-secondary/80">
                        <CheckCircle className="w-5 h-5 text-primary mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={body.route || `/accreditation/${body.name.toLowerCase()}`}
                    className="mt-6 inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Learn More
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <h2 className="text-3xl font-bold text-secondary mb-4">
            Ready to Start Your Accreditation Journey?
          </h2>
          <p className="text-secondary/70 max-w-2xl mx-auto mb-8">
            Get in touch with our experts to learn how our software can streamline your accreditation process
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Contact Us
          </Link>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Accreditation;
