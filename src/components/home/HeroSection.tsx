
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Slide {
  title: string;
  description: string;
  image: string;
  fallbackImage: string;
}

interface HeroSectionProps {
  slides: Slide[];
  onImageError: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

export function HeroSection({ slides, onImageError }: HeroSectionProps) {
  return (
    <section className="pt-16 md:pt-20">
      <div className="w-full">
        <Carousel className="w-full max-w-none">
          <CarouselContent>
            {slides.map((slide, index) => (
              <CarouselItem key={index}>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="relative"
                >
                  <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden">
                    <img 
                      src={slide.image} 
                      alt={slide.title}
                      onError={onImageError}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col items-center justify-end p-4 md:p-8 text-center">
                      <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium bg-primary/90 text-white rounded-full">
                        Slide {index + 1} of {slides.length}
                      </span>
                      <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4 text-white">
                        {slide.title}
                      </h1>
                      <p className="text-base md:text-lg text-white/90 max-w-2xl">
                        {slide.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
}
