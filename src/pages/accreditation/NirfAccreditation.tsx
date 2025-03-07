
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { CheckCircle, ArrowRight, Award, FileText, BarChart, BookOpen, Settings, Code, Building, Users, Globe, Lightbulb, Compass, GraduationCap, PercentSquare, Book, Microscope } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DemoScheduler } from "@/components/demo/DemoScheduler";
import { useState } from "react";

export default function NirfAccreditation() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [demoDialogOpen, setDemoDialogOpen] = useState(false);

  const handleDemoSuccess = () => {
    setDemoDialogOpen(false);
    toast({
      title: "Demo Requested",
      description: "Thank you for your interest in our NIRF ranking solution. Our team will contact you shortly.",
    });
  };

  const handleContactUs = () => {
    // Navigate to the contact us page
    navigate('/contact');
  };

  return (
    <div className="min-h-screen bg-accent">
      <MainNav />
      
      {/* Header with Image */}
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1544531585-9847b68c8c86"
          alt="NIRF Ranking"
          className="w-full h-[300px] object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
              NIRF Ranking
            </h1>
            <p className="text-secondary/70 max-w-2xl mx-auto">
              Comprehensive software solution for NIRF Data Management & Ranking
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
              Simplify Your NIRF Ranking Process
            </h2>
            <p className="text-secondary/70 mb-6">
              The National Institutional Ranking Framework (NIRF) is a methodology adopted by the Ministry of Education, Government of India, to rank institutions of higher education in the country. Our comprehensive software solution streamlines the entire NIRF data collection, analysis, and submission process.
            </p>
            <div className="space-y-4">
              {nirfFeatures.map((feature, index) => (
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
                  Learn how our NIRF ranking solution can help your institution
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
                    <span className="text-sm">Parameter-wise analytics</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">Year-on-year comparison</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">Improvement strategies</span>
                  </li>
                </ul>
                <Dialog open={demoDialogOpen} onOpenChange={setDemoDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full">
                      Request Demo
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DemoScheduler selectedPlan="NIRF Ranking" onSuccess={handleDemoSuccess} />
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        
        <Tabs defaultValue="parameters" className="mb-12">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="parameters">Key Parameters</TabsTrigger>
            <TabsTrigger value="process">Process</TabsTrigger>
            <TabsTrigger value="benefits">Benefits</TabsTrigger>
          </TabsList>
          <TabsContent value="parameters" className="p-4">
            <h3 className="text-xl font-semibold text-secondary mb-4">NIRF Ranking Parameters</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {nirfParameters.map((parameter, index) => (
                <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center mb-2">
                    <parameter.icon className="h-5 w-5 text-primary mr-2" />
                    <h4 className="font-semibold">{parameter.title}</h4>
                  </div>
                  <p className="text-sm text-secondary/70">{parameter.description}</p>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="process" className="p-4">
            <h3 className="text-xl font-semibold text-secondary mb-4">NIRF Ranking Process</h3>
            <div className="space-y-6">
              {nirfProcess.map((step, index) => (
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
            <h3 className="text-xl font-semibold text-secondary mb-4">Benefits of NIRF Ranking</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {nirfBenefits.map((benefit, index) => (
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
            Ready to Improve Your NIRF Ranking?
          </h2>
          <p className="text-secondary/70 max-w-2xl mx-auto mb-8">
            Get in touch with our experts to learn how our software can streamline your NIRF data management process
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

const nirfFeatures = [
  {
    title: "Comprehensive Data Management",
    description: "Collect, organize, and store all data required for NIRF submissions across different parameters."
  },
  {
    title: "Parameter-wise Analytics",
    description: "Analyze your institution's performance across all NIRF parameters with detailed metrics and visualizations."
  },
  {
    title: "Year-on-Year Tracking",
    description: "Monitor your institution's progress over the years and identify trends in performance across parameters."
  },
  {
    title: "Gap Analysis",
    description: "Identify areas for improvement through comparative analysis with top-ranked institutions."
  },
  {
    title: "Automated Report Generation",
    description: "Generate comprehensive reports and data submissions as per NIRF requirements with a single click."
  }
];

const nirfParameters = [
  {
    title: "Teaching, Learning & Resources",
    description: "Faculty quality, student-teacher ratio, financial resources, and utilization",
    icon: BookOpen
  },
  {
    title: "Research and Professional Practice",
    description: "Publications, patents, funded projects, and consultancy",
    icon: Microscope
  },
  {
    title: "Graduation Outcomes",
    description: "Graduation rates, mean salary, higher studies, and doctoral graduates",
    icon: GraduationCap
  },
  {
    title: "Outreach and Inclusivity",
    description: "Regional, gender, and socially challenged diversity among students and faculty",
    icon: Globe
  },
  {
    title: "Perception",
    description: "Perception among academic peers, employers, and the public",
    icon: Lightbulb
  }
];

const nirfProcess = [
  {
    title: "Registration",
    description: "Register your institution on the NIRF portal to participate in the ranking process."
  },
  {
    title: "Data Collection",
    description: "Collect and compile comprehensive data across all NIRF parameters and sub-parameters."
  },
  {
    title: "Data Verification",
    description: "Verify the accuracy and completeness of all data points before submission."
  },
  {
    title: "Online Submission",
    description: "Submit the compiled data through the NIRF portal before the deadline."
  },
  {
    title: "Data Validation",
    description: "NIRF validates the submitted data through random checks and verification processes."
  },
  {
    title: "Ranking Announcement",
    description: "NIRF announces the rankings based on the validated data and parameter weightages."
  }
];

const nirfBenefits = [
  "National recognition of institutional quality and performance",
  "Enhanced visibility and reputation among stakeholders",
  "Identification of strengths and areas for improvement",
  "Benchmarking against peer institutions across the country",
  "Guidance for strategic planning and resource allocation",
  "Increased attractiveness to potential students and faculty",
  "Better opportunities for industry partnerships and collaborations",
  "Motivation for continuous quality improvement"
];
