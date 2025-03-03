
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface InstitutionType {
  title: string;
  description: string;
  icon: LucideIcon;
}

interface InstitutionTypesSectionProps {
  types: InstitutionType[];
}

export function InstitutionTypesSection({ types }: InstitutionTypesSectionProps) {
  return (
    <section className="py-24 px-6 bg-accent">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-secondary mb-4">
            Managing Institutions of Any Size
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our solutions are designed to adapt to the unique needs of different educational institutions
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {types.map((type, index) => (
            <motion.div
              key={type.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-white hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center"
            >
              <type.icon className="h-16 w-16 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-secondary mb-2">
                {type.title}
              </h3>
              <p className="text-muted-foreground text-sm">{type.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
