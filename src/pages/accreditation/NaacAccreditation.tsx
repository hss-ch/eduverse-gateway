import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { CheckCircle, ArrowRight, Award, FileText, BarChart, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export default function NaacAccreditation() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRequestDemo = () => {
    toast({
      title: "Demo Requested",
      description: "Thank you for your interest. Our team will contact you shortly.",
    });
    // In a real app, you might navigate to a demo scheduling page
    // navigate('/request-demo');
  };

  const handleContactUs = () => {
    // Navigate to the contact us page
    navigate('/contact');
  };

  return (
    <div className="min-h-screen bg-accent">
      <MainNav />
      
      {/* Header with New Image */}
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
          alt="NAAC Accreditation"
          className="w-full h-[300px] object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
              NAAC Accreditation
            </h1>
            <p className="text-secondary/70 max-w-2xl mx-auto">
              Comprehensive software solution for NAAC Assessment & Accreditation
            </p>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <h2 className="text-3xl font-bold text-secondary mb-4">
              Simplify Your NAAC Accreditation Process
            </h2>
            <p className="text-secondary/70 mb-6">
              The National Assessment and Accreditation Council (NAAC) is an organization that assesses and accredits higher education institutions in India. Our comprehensive software solution streamlines the entire NAAC accreditation process, making it easier for your institution to achieve and maintain accreditation.
            </p>
            <div className="space-y-4">
              {naacFeatures.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-secondary">{feature.title}</h3>
                    <p className="text-sm text-secondary/70">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader className="bg-primary/5">
                <CardTitle className="text-xl">Ready to Get Started?</CardTitle>
                <CardDescription>
                  Learn how our NAAC accreditation solution can help your institution
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">Automated data collection</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">Streamlined documentation</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">Real-time progress tracking</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">Comprehensive analytics</span>
                  </li>
                </ul>
                <Button className="w-full" onClick={handleRequestDemo}>
                  Request Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        
        <Tabs defaultValue="criteria" className="mb-12">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="criteria">Key Criteria</TabsTrigger>
            <TabsTrigger value="process">Process</TabsTrigger>
            <TabsTrigger value="benefits">Benefits</TabsTrigger>
          </TabsList>
          <TabsContent value="criteria" className="p-4">
            <h3 className="text-xl font-semibold text-secondary mb-4">NAAC Assessment Criteria</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {naacCriteria.map((criterion, index) => (
                <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center mb-2">
                    <criterion.icon className="h-5 w-5 text-primary mr-2" />
                    <h4 className="font-semibold">{criterion.title}</h4>
                  </div>
                  <p className="text-sm text-secondary/70">{criterion.description}</p>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="process" className="p-4">
            <h3 className="text-xl font-semibold text-secondary mb-4">NAAC Accreditation Process</h3>
            <div className="space-y-6">
              {naacProcess.map((step, index) => (
                <div key={index} className="flex">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <span className="text-primary font-bold">{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-secondary">{step.title}</h4>
                    <p className="text-sm text-secondary/70">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="benefits" className="p-4">
            <h3 className="text-xl font-semibold text-secondary mb-4">Benefits of NAAC Accreditation</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {naacBenefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1" />
                  <p className="text-secondary/80">{benefit}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center pt-8 border-t border-border"
        >
          <h2 className="text-2xl font-bold text-secondary mb-4">
            Ready to Start Your NAAC Accreditation Journey?
          </h2>
          <p className="text-secondary/70 max-w-2xl mx-auto mb-8">
            Get in touch with our experts to learn how our software can streamline your NAAC accreditation process
          </p>
          <Button size="lg" onClick={handleContactUs}>
            Contact Us
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
}

const naacFeatures = [
  {
    title: "Automated Data Collection",
    description: "Automate the collection and organization of data required for NAAC accreditation, saving time and reducing manual effort."
  },
  {
    title: "Comprehensive Documentation",
    description: "Generate comprehensive documentation aligned with NAAC criteria, ensuring completeness and accuracy."
  },
  {
    title: "Real-time Analytics",
    description: "Track your institution's progress in real-time with detailed analytics and visualization tools."
  },
  {
    title: "Collaborative Workflow",
    description: "Facilitate collaboration among departments and stakeholders involved in the accreditation process."
  },
  {
    title: "Gap Analysis",
    description: "Identify gaps in your institution's performance against NAAC criteria and receive recommendations for improvement."
  }
];

const naacCriteria = [
  {
    title: "Curricular Aspects",
    description: "Curriculum design, development, and implementation",
    icon: BookOpen
  },
  {
    title: "Teaching-Learning and Evaluation",
    description: "Student enrollment, teaching-learning processes, and evaluation",
    icon: Award
  },
  {
    title: "Research, Innovations and Extension",
    description: "Promotion of research and innovation ecosystem",
    icon: FileText
  },
  {
    title: "Infrastructure and Learning Resources",
    description: "Physical facilities, library, IT infrastructure",
    icon: BookOpen
  },
  {
    title: "Student Support and Progression",
    description: "Student mentoring, support, and progression to higher education",
    icon: Award
  },
  {
    title: "Governance, Leadership and Management",
    description: "Institutional vision, leadership, and management strategies",
    icon: BarChart
  },
  {
    title: "Institutional Values and Best Practices",
    description: "Gender equity, environmental consciousness, and best practices",
    icon: Award
  }
];

const naacProcess = [
  {
    title: "Institutional Eligibility for Quality Assessment (IEQA)",
    description: "Submit institutional data to determine eligibility for assessment."
  },
  {
    title: "Self-Study Report (SSR)",
    description: "Prepare and submit a comprehensive self-study report based on NAAC criteria."
  },
  {
    title: "Student Satisfaction Survey",
    description: "Conduct a survey to assess student satisfaction with teaching-learning processes."
  },
  {
    title: "Peer Team Visit",
    description: "Host a visit from NAAC peer team for verification and validation of the SSR."
  },
  {
    title: "Final Evaluation and Grading",
    description: "Receive final evaluation and grading based on the assessment."
  }
];

const naacBenefits = [
  "Enhanced institutional reputation and credibility",
  "Improved quality of teaching-learning processes",
  "Access to funding opportunities from government and other agencies",
  "Improved employability of graduates",
  "Benchmarking against national standards",
  "Facilitation of global mobility of students and faculty",
  "Promotion of innovation and research culture",
  "Systematic quality enhancement processes"
];
