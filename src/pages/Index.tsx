
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Users, Calendar, Shield, Database, Server, Smartphone, Printer, BarChart, Award, DollarSign, Check, School, GraduationCap, Building, University } from "lucide-react";
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
  console.log("Index page rendering"); // Debug log

  const slides = [
    {
      title: "Transform Your Institution",
      description: "Streamline operations and enhance efficiency and transparency",
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
    <div className="min-h-screen bg-background">
      <MainNav />
      
      {/* Hero Section with Slider */}
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
                        onError={handleImageError}
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

      {/* Why Choose GuideCampus Section */}
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
            {whyChooseFeatures.map((feature, index) => (
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

      {/* Institution Types Section */}
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
            {institutionTypes.map((type, index) => (
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

      {/* CTA Section */}
      <section className="py-24 px-6 bg-secondary">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-secondary-foreground mb-6">
              Ready to Transform Your Institution?
            </h2>
            <p className="text-secondary-foreground/80 max-w-2xl mx-auto mb-8">
              Join hundreds of educational institutions that have already modernized their operations with our ERP solution.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
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
    href: "/academic"
  },
  {
    title: "Administration",
    description: "Simplify administrative tasks with automated workflows for admissions, attendance, and resource management.",
    icon: Users,
    href: "/administrative"
  },
  {
    title: "Planning & Scheduling",
    description: "Optimize institutional planning with smart scheduling tools for classes, events, and resource allocation.",
    icon: Calendar,
    href: "/planning"
  },
];

const whyChooseFeatures = [
  { title: "Adaptable to Any Institution", icon: Check },
  { title: "Seamless Data Migration", icon: Database },
  { title: "Role-Based Access Control", icon: Users },
  { title: "Robust Data Security", icon: Shield },
  { title: "24/7 Dedicated Support", icon: Server },
  { title: "User-Friendly & Printer-Friendly", icon: Printer },
  { title: "Web-Based & Mobile App", icon: Smartphone },
  { title: "Cost-Effective & High Quality", icon: DollarSign },
  { title: "Comprehensive Reports", icon: BarChart },
  { title: "Customizable & Scalable", icon: Award },
  { title: "Secure Password Management", icon: Shield },
  { title: "Automated Workflows", icon: Server },
  { title: "Multi-User Collaboration", icon: Users },
  { title: "Customization Ready", icon: Check },
];

const institutionTypes = [
  {
    title: "Schools",
    description: "Automating admissions, attendance, timetables, and academic tracking, ensuring smooth day-to-day operations.",
    icon: School,
  },
  {
    title: "Training Institutions",
    description: "Streamlines course scheduling, trainee enrollment, performance tracking, and resource management for efficient training delivery.",
    icon: GraduationCap,
  },
  {
    title: "Colleges",
    description: "Enhances college administration with modules for student records, examinations, finance, and campus communication, improving overall efficiency.",
    icon: Building,
  },
  {
    title: "Universities",
    description: "Offers scalable solutions for complex university structures, integrating multi-department management, research tracking, and regulatory compliance.",
    icon: University,
  },
];

export default Index;
