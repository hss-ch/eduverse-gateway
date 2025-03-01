
import { motion } from "framer-motion";
import { Check, School, University, BookOpen, GraduationCap } from "lucide-react";
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/PageHeader";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { DemoScheduler } from "@/components/demo/DemoScheduler";
import { useToast } from "@/components/ui/use-toast";

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showDemoDialog, setShowDemoDialog] = useState(false);
  const { toast } = useToast();

  const handleGetStarted = (planName: string) => {
    setSelectedPlan(planName);
    setShowDemoDialog(true);
  };

  return (
    <div className="min-h-screen bg-accent">
      <MainNav />
      
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
          alt="Pricing"
          className="w-full h-[300px] object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20" />
      </div>

      <section className="relative -mt-20 px-6">
        <div className="container">
          <PageHeader 
            title="Simple, Transparent Pricing"
            description="Choose the plan that best fits your institution's needs"
          />

          <div className="grid md:grid-cols-4 gap-8 mb-16">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`rounded-2xl overflow-hidden ${
                  plan.popular
                    ? "ring-4 ring-primary/20"
                    : ""
                }`}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={plan.image} 
                    alt={plan.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 flex items-end">
                    <div className="p-6 w-full">
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-bold text-white flex items-center">
                          <plan.icon className="mr-2 h-6 w-6" />
                          {plan.name}
                        </h3>
                        {plan.popular && (
                          <span className="inline-block px-4 py-1 text-sm font-medium bg-white/20 text-white rounded-full">
                            Most Popular
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className={`p-6 ${
                  plan.popular
                    ? "bg-primary text-white"
                    : "bg-white"
                }`}>
                  <div className="mb-4">
                    <div className="flex items-center">
                      <span className={`text-xl line-through opacity-70 ${plan.popular ? "text-white/80" : "text-secondary/70"}`}>
                        ₹{plan.actualPrice}
                      </span>
                      <span className="ml-2 px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                        Launch Offer
                      </span>
                    </div>
                    <div className="mt-1 flex items-baseline">
                      <span className={`text-4xl font-bold ${plan.popular ? "text-white" : "text-secondary"}`}>
                        ₹{plan.price}
                      </span>
                      <span className={`text-sm ml-2 ${plan.popular ? "text-white/80" : "text-secondary/70"}`}>
                        per student per year
                      </span>
                    </div>
                  </div>
                  
                  <ul className="space-y-4 mb-8">
                    {features.map((feature) => (
                      <li key={feature} className="flex items-start space-x-3">
                        <Check className={`h-5 w-5 mt-0.5 ${plan.popular ? "text-white" : "text-primary"}`} />
                        <span className={plan.popular ? "text-white/80" : "text-secondary/70"}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() => handleGetStarted(plan.name)}
                    className={`w-full ${
                      plan.popular
                        ? "bg-white text-primary hover:bg-white/90"
                        : "bg-primary text-white hover:bg-primary/90"
                    }`}
                  >
                    Get Started
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={showDemoDialog} onOpenChange={setShowDemoDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Schedule a Demo - {selectedPlan} Plan</DialogTitle>
            <DialogDescription>
              Fill out the form below to schedule a personalized demo of our platform.
            </DialogDescription>
          </DialogHeader>
          <DemoScheduler 
            selectedPlan={selectedPlan}
            onSuccess={() => {
              setShowDemoDialog(false);
              toast({
                title: "Demo Request Submitted",
                description: "We'll get back to you shortly to confirm your demo session.",
              });
            }}
          />
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

const features = [
  "Unlimited students",
  "Full feature access",
  "24/7 premium support",
  "Email support",
  "Custom integration",
  "Custom branding"
];

const plans = [
  {
    name: "Schools",
    price: 450,
    actualPrice: 900,
    popular: false,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    icon: School,
  },
  {
    name: "Training Institutions",
    price: 150,
    actualPrice: 500,
    popular: true,
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655",
    icon: GraduationCap,
  },
  {
    name: "Colleges",
    price: 500,
    actualPrice: 1000,
    popular: false,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    icon: BookOpen,
  },
  {
    name: "Universities",
    price: 600,
    actualPrice: 1200,
    popular: false,
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    icon: University,
  },
];

export default Pricing;
