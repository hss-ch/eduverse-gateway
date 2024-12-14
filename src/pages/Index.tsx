import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Users, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Index = () => {
  const slides = [
    {
      title: "Transform Your Institution",
      description: "Streamline operations and enhance learning experiences",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      fallbackImage: "/placeholder.svg"
    },
    {
      title: "Empower Your Staff",
      description: "Provide powerful tools for efficient management",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      fallbackImage: "/placeholder.svg"
    },
    {
      title: "Engage Your Students",
      description: "Create an interactive learning environment",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      fallbackImage: "/placeholder.svg"
    },
  ];

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.log("Image failed to load, using fallback");
    const target = e.target as HTMLImageElement;
    const slide = slides.find(s => s.image === target.src);
    if (slide) {
      target.src = slide.fallbackImage;
    }
  };

  return (
    <div className="min-h-screen bg-accent">
      <MainNav />
      
      {/* Hero Section with Slider */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-accent/80" />
        </div>
        
        <div className="w-full relative z-10">
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
                    <div className="relative w-full aspect-[21/9] overflow-hidden">
                      <img 
                        src={slide.image} 
                        alt={slide.title}
                        onError={handleImageError}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col items-center justify-end p-8 text-center">
                        <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium bg-primary/90 text-white rounded-full">
                          Slide {index + 1} of {slides.length}
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
                          {slide.title}
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 max-w-2xl">
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

      <section className="py-24 px-6 bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-secondary mb-4">
              Comprehensive Solutions
            </h2>
            <p className="text-secondary/70 max-w-2xl mx-auto">
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
                className="p-8 rounded-2xl bg-accent hover:shadow-lg transition-all duration-300"
              >
                <feature.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold text-secondary mb-2">
                  {feature.title}
                </h3>
                <p className="text-secondary/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-secondary">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Institution?
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">
              Join hundreds of educational institutions that have already modernized their operations with our ERP solution.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Schedule a Demo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const features = [
  {
    title: "Academic Management",
    description: "Streamline curriculum planning, grading, and student performance tracking with our intuitive academic tools.",
    icon: BookOpen,
  },
  {
    title: "Administrative Tools",
    description: "Simplify administrative tasks with automated workflows for admissions, attendance, and resource management.",
    icon: Users,
  },
  {
    title: "Planning & Scheduling",
    description: "Optimize institutional planning with smart scheduling tools for classes, events, and resource allocation.",
    icon: Calendar,
  },
];

export default Index;
