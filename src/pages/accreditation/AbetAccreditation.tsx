
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { CheckCircle, ArrowRight, Award, FileText, BarChart, BookOpen, Settings, Code, Building, Users, Globe, Lightbulb, Compass } from "lucide-react";
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

export default function AbetAccreditation() {
  return (
    <div className="min-h-screen bg-accent">
      <MainNav />
      
      {/* Header with Image */}
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4"
          alt="ABET Accreditation"
          className="w-full h-[300px] object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
              ABET Accreditation
            </h1>
            <p className="text-secondary/70 max-w-2xl mx-auto">
              Comprehensive software solution for ABET Assessment & Accreditation
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
              Simplify Your ABET Accreditation Process
            </h2>
            <p className="text-secondary/70 mb-6">
              ABET (Accreditation Board for Engineering and Technology) is a globally recognized accreditor of college and university programs in applied and natural sciences, computing, engineering, and engineering technology. Our comprehensive software solution streamlines the entire ABET accreditation process, helping your institution achieve international recognition.
            </p>
            <div className="space-y-4">
              {abetFeatures.map((feature, index) => (
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
                  Learn how our ABET accreditation solution can help your institution
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
            <h3 className="text-xl font-semibold text-secondary mb-4">ABET Assessment Criteria</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {abetCriteria.map((criterion, index) => (
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
            <h3 className="text-xl font-semibold text-secondary mb-4">ABET Accreditation Process</h3>
            <div className="space-y-6">
              {abetProcess.map((step, index) => (
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
            <h3 className="text-xl font-semibold text-secondary mb-4">Benefits of ABET Accreditation</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {abetBenefits.map((benefit, index) => (
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
            Ready to Start Your ABET Accreditation Journey?
          </h2>
          <p className="text-secondary/70 max-w-2xl mx-auto mb-8">
            Get in touch with our experts to learn how our software can streamline your ABET accreditation process
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

const abetFeatures = [
  {
    title: "Student Outcomes Assessment",
    description: "Track and assess student outcomes against ABET criteria with robust data collection and analysis tools."
  },
  {
    title: "Continuous Improvement Tracking",
    description: "Document and monitor program improvements based on assessment results to demonstrate the full assessment cycle."
  },
  {
    title: "Curriculum Management",
    description: "Map curriculum to program educational objectives and student outcomes to ensure comprehensive coverage."
  },
  {
    title: "Self-Study Report Generation",
    description: "Generate comprehensive self-study reports that align perfectly with ABET requirements and formatting."
  },
  {
    title: "Evidence Repository",
    description: "Maintain a centralized repository of all documentation and evidence needed for the ABET review process."
  }
];

const abetCriteria = [
  {
    title: "Students",
    description: "Student performance tracking, advising, and monitoring of program requirements",
    icon: Users
  },
  {
    title: "Program Educational Objectives",
    description: "Educational objectives that are consistent with the mission of the institution",
    icon: Compass
  },
  {
    title: "Student Outcomes",
    description: "Skills, knowledge, and behaviors students acquire by program completion",
    icon: Award
  },
  {
    title: "Continuous Improvement",
    description: "Regular assessment and evaluation processes to improve educational effectiveness",
    icon: Settings
  },
  {
    title: "Curriculum",
    description: "Appropriate curriculum that supports program objectives and outcomes",
    icon: BookOpen
  },
  {
    title: "Faculty",
    description: "Qualified faculty with appropriate expertise and experience",
    icon: Users
  },
  {
    title: "Facilities",
    description: "Classrooms, laboratories, and equipment to support program outcomes",
    icon: Building
  },
  {
    title: "Institutional Support",
    description: "Resources and leadership commitment to ensure program quality",
    icon: Globe
  }
];

const abetProcess = [
  {
    title: "Readiness Review",
    description: "Initial assessment of program's readiness for accreditation and preparation of preliminary materials."
  },
  {
    title: "Request for Evaluation",
    description: "Formal application for program evaluation and scheduling of the evaluation visit."
  },
  {
    title: "Self-Study Report",
    description: "Preparation and submission of a comprehensive self-study report addressing all ABET criteria."
  },
  {
    title: "On-Site Visit",
    description: "Site visit by ABET evaluation team to verify information in the self-study report and assess facilities."
  },
  {
    title: "Due Process Response",
    description: "Opportunity to respond to any issues identified in the draft statement by the evaluation team."
  },
  {
    title: "Accreditation Decision",
    description: "Final decision on accreditation status by the relevant ABET commission."
  }
];

const abetBenefits = [
  "Global recognition of program quality and standards",
  "Enhanced employment opportunities for graduates worldwide",
  "Eligibility for federal student loans and grants for students",
  "Facilitation of credit transfer between institutions",
  "Access to a network of peer institutions for benchmarking",
  "Structured approach to continuous improvement",
  "Alignment with industry needs and expectations",
  "Demonstration of commitment to educational excellence"
];
