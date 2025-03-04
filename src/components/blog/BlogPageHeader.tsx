
import { motion } from "framer-motion";

interface BlogPageHeaderProps {
  title: string;
  description?: string;
  imageSrc?: string;
}

export function BlogPageHeader({ title, description, imageSrc = "https://images.unsplash.com/photo-1499750310107-5fef28a66643" }: BlogPageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <div className="relative h-64 md:h-80 lg:h-96 w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img 
          src={imageSrc} 
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/placeholder.svg";
          }}
        />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {title}
          </h1>
          {description && (
            <p className="text-white/90 max-w-2xl mx-auto text-lg">
              {description}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
