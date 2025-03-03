
import { motion } from "framer-motion";

interface Institution {
  name: string;
  location: string;
}

interface TrustedInstitutionsSectionProps {
  institutions: Institution[];
}

export function TrustedInstitutionsSection({ institutions }: TrustedInstitutionsSectionProps) {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-secondary mb-4">
            Trusted by Top Institutions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Leading educational institutions across the country rely on GuideCampus for their campus management needs
          </p>
        </motion.div>
        
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8 items-center justify-items-center">
          {institutions.map((institution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="w-full max-w-[160px] aspect-[3/2] bg-accent/30 rounded-md flex items-center justify-center p-4"
            >
              <div className="text-center">
                <p className="font-semibold text-secondary text-center text-xs md:text-sm mb-1">
                  {institution.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {institution.location}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
