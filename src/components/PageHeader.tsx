import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  description?: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative py-24 bg-gradient-to-b from-accent to-white"
    >
      <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:20px_20px]" />
      <div className="container mx-auto px-6 text-center relative">
        <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-6 bg-clip-text">
          {title}
        </h1>
        {description && (
          <p className="text-secondary/70 max-w-2xl mx-auto text-lg">
            {description}
          </p>
        )}
      </div>
    </motion.div>
  );
}