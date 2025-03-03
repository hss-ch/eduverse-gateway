
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FeatureProps {
  title: string;
  icon: LucideIcon;
}

interface WhyChooseSectionProps {
  features: FeatureProps[];
}

export function WhyChooseSection({ features }: WhyChooseSectionProps) {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-secondary mb-4">
            Why Choose GuideCampus?
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            GuideCampus automates the entire institutional process, making campus management effortless. 
            Our powerful AI-based modules cover every aspect of academic and administrative workflows, 
            ensuring smooth functioning across departments.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex items-start p-4"
            >
              <feature.icon className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-1" />
              <span className="text-secondary/80 text-sm">{feature.title}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
