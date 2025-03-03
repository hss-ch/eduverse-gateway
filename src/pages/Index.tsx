
import { useState } from "react";
import { BookOpen, Users, Calendar, Shield, Database, Server, Smartphone, Printer, BarChart, Award, DollarSign, Check, School, GraduationCap, Building, University, FileText, SaveAll } from "lucide-react";
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { WhyChooseSection } from "@/components/home/WhyChooseSection";
import { InstitutionTypesSection } from "@/components/home/InstitutionTypesSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { CTASection } from "@/components/home/CTASection";
import { TrustedInstitutionsSection } from "@/components/home/TrustedInstitutionsSection";

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
      
      <HeroSection slides={slides} onImageError={handleImageError} />
      <WhyChooseSection features={whyChooseFeatures} />
      <InstitutionTypesSection types={institutionTypes} />
      <FeaturesSection features={features} />
      <CTASection />
      <TrustedInstitutionsSection institutions={trustedInstitutions} />

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
  { title: "Paperless Campus", icon: FileText },
  { title: "Minimize Expenditure & Maximize Savings", icon: SaveAll },
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

const trustedInstitutions = [
  { name: "CMR College", location: "Hyderabad" },
  { name: "MREM College", location: "Hyderabad" },
  { name: "PRAGATHI College", location: "Hyderabad" },
  { name: "SANFORD School", location: "Hyderabad" },
  { name: "ESWAR College", location: "Narasaraopet" },
  { name: "", location: "and many more..." },

];

export default Index;
