import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/PageHeader";

const Pricing = () => {
  return (
    <div className="min-h-screen bg-accent">
      <MainNav />
      
      <section className="pt-24 px-6">
        <div className="container">
          <PageHeader 
            title="Simple, Transparent Pricing"
            description="Choose the plan that best fits your institution's needs"
          />

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`p-8 rounded-2xl ${
                  plan.popular
                    ? "bg-primary text-white ring-4 ring-primary/20"
                    : "bg-white"
                }`}
              >
                {plan.popular && (
                  <span className="inline-block px-4 py-1 text-sm font-medium bg-white/20 rounded-full mb-4">
                    Most Popular
                  </span>
                )}
                <h3 className={`text-2xl font-bold ${plan.popular ? "text-white" : "text-secondary"}`}>
                  {plan.name}
                </h3>
                <div className="mt-4 mb-6">
                  <span className={`text-4xl font-bold ${plan.popular ? "text-white" : "text-secondary"}`}>
                    ${plan.price}
                  </span>
                  <span className={`text-sm ${plan.popular ? "text-white/80" : "text-secondary/70"}`}>
                    /month
                  </span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start space-x-3">
                      <Check className={`h-5 w-5 mt-0.5 ${plan.popular ? "text-white" : "text-primary"}`} />
                      <span className={plan.popular ? "text-white/80" : "text-secondary/70"}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-white text-primary hover:bg-white/90"
                      : "bg-primary text-white hover:bg-primary/90"
                  }`}
                >
                  Get Started
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const plans = [
  {
    name: "Starter",
    price: 99,
    popular: false,
    features: [
      "Up to 100 students",
      "Basic academic management",
      "Email support",
      "Basic reporting",
    ],
  },
  {
    name: "Professional",
    price: 199,
    popular: true,
    features: [
      "Up to 500 students",
      "Advanced academic management",
      "Priority support",
      "Advanced analytics",
      "Custom branding",
    ],
  },
  {
    name: "Enterprise",
    price: 399,
    popular: false,
    features: [
      "Unlimited students",
      "Full feature access",
      "24/7 premium support",
      "Custom integration",
      "Dedicated account manager",
    ],
  },
];

export default Pricing;
