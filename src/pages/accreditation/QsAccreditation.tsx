
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { CheckCircle, ArrowRight, Award, FileText, BarChart, BookOpen, Settings, Code, Building, Users, Globe, Lightbulb, Compass, GraduationCap, PercentSquare, Book, Microscope, Network, Star } from "lucide-react";
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

export default function QsAccreditation() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [demoDialogOpen, setDemoDialogOpen] = useState(false);

  const handleDemoSuccess = () => {
    setDemoDialogOpen(false);
    toast({
      title: "Demo Requested",
      description: "Thank you for your interest in our QS Ranking solution. Our team will contact you shortly.",
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
          src="https://images.unsplash.com/photo-1516979187457-637abb4f9353"
          alt="QS World University Rankings"
          className="w-full h-[300px] object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
              QS World University Rankings
            </h1>
            <p className="text-secondary/70 max-w-2xl mx-auto">
              Comprehensive software solution for QS Rankings Improvement
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
              Enhance Your Global University Ranking
            </h2>
            <p className="text-secondary/70 mb-6">
              The QS World University Rankings is an annual publication of university rankings by Quacquarelli Symonds (QS). Our comprehensive software solution helps institutions strategically improve their global visibility and rankings by focusing on the key parameters evaluated by QS.
            </p>
            <div className="space-y-4">
              {qsFeatures.map((feature, index) => (
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
                  Learn how our QS rankings solution can help your institution
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">Citations tracking</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">Reputation survey management</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">International network analysis</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">Performance improvement strategies</span>
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
                    <DemoScheduler selectedPlan="QS World University Rankings" onSuccess={handleDemoSuccess} />
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        
        <Tabs defaultValue="indicators" className="mb-12">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="indicators">Key Indicators</TabsTrigger>
            <TabsTrigger value="strategy">Strategy</TabsTrigger>
            <TabsTrigger value="benefits">Benefits</TabsTrigger>
          </TabsList>
          <TabsContent value="indicators" className="p-4">
            <h3 className="text-xl font-semibold text-secondary mb-4">QS Ranking Indicators</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {qsIndicators.map((indicator, index) => (
                <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center mb-2">
                    <indicator.icon className="h-5 w-5 text-primary mr-2" />
                    <h4 className="font-semibold">{indicator.title} <span className="text-sm text-muted-foreground">({indicator.weight}%)</span></h4>
                  </div>
                  <p className="text-sm text-secondary/70">{indicator.description}</p>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="strategy" className="p-4">
            <h3 className="text-xl font-semibold text-secondary mb-4">QS Rankings Improvement Strategy</h3>
            <div className="space-y-6">
              {qsStrategies.map((strategy, index) => (
                <div key={index} className="flex">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <span className="text-primary font-bold">{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-secondary">{strategy.title}</h4>
                    <p className="text-sm text-secondary/70">{strategy.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="benefits" className="p-4">
            <h3 className="text-xl font-semibold text-secondary mb-4">Benefits of QS Ranking</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {qsBenefits.map((benefit, index) => (
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
            Ready to Improve Your Global Standing?
          </h2>
          <p className="text-secondary/70 max-w-2xl mx-auto mb-8">
            Get in touch with our experts to learn how our software can help elevate your institution in the QS World University Rankings
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

const qsFeatures = [
  {
    title: "Academic Reputation Management",
    description: "Tools to identify, target, and engage with academic peers for improved visibility and reputation scores."
  },
  {
    title: "Employer Reputation Enhancement",
    description: "Strategies to strengthen relationships with employers and track graduate employability metrics."
  },
  {
    title: "Research Impact Analysis",
    description: "Track citations per faculty and h-index metrics with detailed analytics and improvement recommendations."
  },
  {
    title: "International Diversity Monitoring",
    description: "Monitor and improve international faculty and student ratios with targeted recruitment strategies."
  },
  {
    title: "Strategic Planning Tools",
    description: "Develop and implement data-driven strategies to systematically improve your institution's ranking."
  }
];

const qsIndicators = [
  {
    title: "Academic Reputation",
    description: "Based on global survey responses from academics about the best institutions in their field",
    weight: 40,
    icon: Star
  },
  {
    title: "Employer Reputation",
    description: "Based on survey responses from employers regarding universities that produce the best graduates",
    weight: 10,
    icon: Building
  },
  {
    title: "Faculty/Student Ratio",
    description: "Measures teaching quality by assessing the number of academic staff relative to student numbers",
    weight: 20,
    icon: Users
  },
  {
    title: "Citations per Faculty",
    description: "Measures research impact by dividing total citations by the number of faculty members",
    weight: 20,
    icon: FileText
  },
  {
    title: "International Faculty Ratio",
    description: "Assesses the proportion of faculty members who are international",
    weight: 5,
    icon: Globe
  },
  {
    title: "International Student Ratio",
    description: "Assesses the proportion of students who are international",
    weight: 5,
    icon: GraduationCap
  }
];

const qsStrategies = [
  {
    title: "Academic Reputation Enhancement",
    description: "Implement targeted outreach to academic peers, increase participation in international conferences, and develop global academic partnerships."
  },
  {
    title: "Research Output Improvement",
    description: "Support faculty in publishing in high-impact journals, developing international research collaborations, and increasing citation counts."
  },
  {
    title: "Employer Engagement",
    description: "Strengthen connections with global employers, enhance career services, and track graduate employment outcomes systematically."
  },
  {
    title: "International Diversity",
    description: "Develop strategic recruitment plans for international faculty and students, and create support systems for international community members."
  },
  {
    title: "Data Quality Assurance",
    description: "Ensure accurate and comprehensive data submission to QS, with thorough verification processes."
  },
  {
    title: "Long-term Strategic Planning",
    description: "Develop a multi-year plan with clear milestones and performance indicators aligned with QS ranking criteria."
  }
];

const qsBenefits = [
  "Enhanced global visibility and brand recognition",
  "Increased attractiveness to international students and faculty",
  "Greater opportunities for international research collaborations",
  "Improved ability to attract funding and resources",
  "Competitive advantage in establishing industry partnerships",
  "Framework for strategic institutional development",
  "Benchmarking against leading global institutions",
  "Increased prestige and credibility in the academic community"
];
