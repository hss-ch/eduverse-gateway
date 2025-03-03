
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { CheckCircle, ArrowRight, Award, FileText, BarChart, BookOpen, Settings, Code, Building, Users } from "lucide-react";
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

export default function NbaAccreditation() {
  return (
    <div className="min-h-screen bg-accent">
      <MainNav />
      
      {/* Header with Image */}
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1"
          alt="NBA Accreditation"
          className="w-full h-[300px] object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
              NBA Accreditation
            </h1>
            <p className="text-secondary/70 max-w-2xl mx-auto">
              Comprehensive software solution for NBA Assessment & Accreditation
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
              Simplify Your NBA Accreditation Process
            </h2>
            <p className="text-secondary/70 mb-6">
              The National Board of Accreditation (NBA) is an autonomous organization in India that accredits technical education programs. Our comprehensive software solution streamlines the entire NBA accreditation process, making it easier for your engineering and technical institutions to achieve and maintain accreditation.
            </p>
            <div className="space-y-4">
              {nbaFeatures.map((feature, index) => (
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
                  Learn how our NBA accreditation solution can help your institution
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
                <Button className="w-full">
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
            <h3 className="text-xl font-semibold text-secondary mb-4">NBA Assessment Criteria</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {nbaCriteria.map((criterion, index) => (
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
            <h3 className="text-xl font-semibold text-secondary mb-4">NBA Accreditation Process</h3>
            <div className="space-y-6">
              {nbaProcess.map((step, index) => (
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
            <h3 className="text-xl font-semibold text-secondary mb-4">Benefits of NBA Accreditation</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {nbaBenefits.map((benefit, index) => (
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
            Ready to Start Your NBA Accreditation Journey?
          </h2>
          <p className="text-secondary/70 max-w-2xl mx-auto mb-8">
            Get in touch with our experts to learn how our software can streamline your NBA accreditation process
          </p>
          <Button size="lg">
            Contact Us
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
}

const nbaFeatures = [
  {
    title: "Program-Specific Mapping",
    description: "Map curriculum, infrastructure, and faculty to NBA criteria for engineering and technical programs."
  },
  {
    title: "Outcome-Based Assessment",
    description: "Track and assess program outcomes and course outcomes in alignment with NBA requirements."
  },
  {
    title: "Faculty Portfolio Management",
    description: "Maintain comprehensive faculty profiles, including research, publications, and professional experiences."
  },
  {
    title: "Student Performance Analytics",
    description: "Analyze student performance data to demonstrate program effectiveness and continuous improvement."
  },
  {
    title: "Self-Assessment Reports",
    description: "Generate comprehensive self-assessment reports that align with NBA format and requirements."
  }
];

const nbaCriteria = [
  {
    title: "Vision, Mission & Program Educational Objectives",
    description: "Alignment of program objectives with institutional mission",
    icon: BookOpen
  },
  {
    title: "Program Outcomes",
    description: "Attainment of program outcomes and assessment processes",
    icon: Award
  },
  {
    title: "Program Curriculum",
    description: "Curriculum design, development, and implementation aligned with industry needs",
    icon: FileText
  },
  {
    title: "Students' Performance",
    description: "Academic performance, admission quality, and placement records",
    icon: Users
  },
  {
    title: "Faculty Contributions",
    description: "Faculty qualifications, research, and professional development",
    icon: Award
  },
  {
    title: "Facilities and Technical Support",
    description: "Adequacy of classrooms, laboratories, computing facilities, and technical staff",
    icon: Building
  },
  {
    title: "Continuous Improvement",
    description: "Actions taken based on results of evaluation of program outcomes",
    icon: Settings
  },
  {
    title: "Student Support Systems",
    description: "Academic and career counseling, extracurricular activities, and professional society chapters",
    icon: Users
  }
];

const nbaProcess = [
  {
    title: "Registration and Pre-Qualifier",
    description: "Register on NBA portal and submit pre-qualifier information for initial eligibility assessment."
  },
  {
    title: "Self-Assessment Report (SAR)",
    description: "Prepare and submit a comprehensive self-assessment report based on NBA criteria."
  },
  {
    title: "Document Verification",
    description: "NBA reviews the submitted SAR and supporting documents for completeness and compliance."
  },
  {
    title: "Onsite Evaluation",
    description: "Host a visit from NBA evaluation team for verification and assessment of the program."
  },
  {
    title: "Evaluation Report",
    description: "Receive a detailed evaluation report highlighting strengths and areas for improvement."
  },
  {
    title: "Decision on Accreditation",
    description: "Based on evaluation, NBA decides whether to grant accreditation and for what duration."
  }
];

const nbaBenefits = [
  "International recognition for engineering and technical programs",
  "Enhanced employability of graduates in global job markets",
  "Improved quality of technical education through continuous improvement",
  "Facilitates global mobility for students and professionals",
  "Recognition by professional bodies and employers",
  "Increased collaboration opportunities with industries and other institutions",
  "Objective assessment by third-party experts",
  "Global competitiveness of educational programs"
];
