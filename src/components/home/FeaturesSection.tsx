
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface FeatureProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
}

interface FeaturesSectionProps {
  features: FeatureProps[];
}

export function FeaturesSection({ features }: FeaturesSectionProps) {
  return (
    <section className="py-24 px-6">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Comprehensive Solutions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to manage your educational institution efficiently
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-2xl bg-card hover:shadow-lg transition-all duration-300"
            >
              <feature.icon className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground mb-4">{feature.description}</p>
              <Link
                to={feature.href}
                className="inline-flex items-center text-primary hover:underline"
              >
                Learn More
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
