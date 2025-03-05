
import { motion } from "framer-motion";
import { Users, Target, Heart, Calendar, Award, Briefcase } from "lucide-react";
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";

const About = () => {
  return (
    <div className="min-h-screen bg-accent">
      <MainNav />
      
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1552664730-d307ca884978"
          alt="About Us"
          className="w-full h-[300px] object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20" />
      </div>

      <section className="relative -mt-20 px-6">
        <div className="container">
          <PageHeader 
            title="About Us"
            description="Learn about our mission and the team behind GuideCampus"
          />

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 rounded-2xl bg-white hover:shadow-lg transition-all duration-300"
              >
                <feature.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold text-secondary mb-2">
                  {feature.title}
                </h3>
                <p className="text-secondary/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
          
          {/* Management Team Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-secondary mb-8 flex items-center">
              <Briefcase className="h-8 w-8 text-primary mr-3" />
              Management Team
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {managementTeam.map((member, index) => (
                <div 
                  key={member.name}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300"
                >
                  <img 
                    src={member.photo} 
                    alt={member.name}
                    className="w-full h-64 object-cover" 
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-secondary mb-1">{member.name}</h3>
                    <p className="text-primary font-medium mb-3">{member.position}</p>
                    <p className="text-secondary/70 text-sm">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Milestones Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-secondary mb-8 flex items-center">
              <Calendar className="h-8 w-8 text-primary mr-3" />
              Our Milestones
            </h2>
            <div className="relative border-l-4 border-primary/30 pl-10 ml-6 py-4">
              {milestones.map((milestone, index) => (
                <div 
                  key={milestone.year}
                  className="mb-12 relative"
                >
                  <div className="absolute -left-14 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Award className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300">
                    <h3 className="text-xl font-semibold text-primary mb-2">{milestone.year}</h3>
                    <h4 className="text-lg font-medium text-secondary mb-3">{milestone.title}</h4>
                    <p className="text-secondary/70">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const features = [
  {
    title: "Our Team",
    description: "Meet the passionate individuals dedicated to transforming education management.",
    icon: Users,
  },
  {
    title: "Our Mission",
    description: "We aim to revolutionize educational institutions through innovative technology.",
    icon: Target,
  },
  {
    title: "Our Values",
    description: "Built on principles of excellence, innovation, and customer success.",
    icon: Heart,
  },
];

const managementTeam = [
  {
    name: "Sarah Johnson",
    position: "Chief Executive Officer",
    bio: "With over 15 years of experience in EdTech, Sarah has led initiatives that transformed educational technology across multiple institutions.",
    photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
  },
  {
    name: "Michael Chen",
    position: "Chief Technology Officer",
    bio: "Michael brings 12+ years of software development expertise with a focus on creating scalable education management solutions.",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2344&q=80"
  },
  {
    name: "Priya Patel",
    position: "Director of Academic Solutions",
    bio: "Former university administrator with a passion for improving educational outcomes through technology innovation.",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1361&q=80"
  }
];

const milestones = [
  {
    year: "2023",
    title: "Launch of GuideCampus Platform",
    description: "Successfully launched our flagship platform with comprehensive modules for academic and administrative management."
  },
  {
    year: "2022",
    title: "Seed Funding Secured",
    description: "Secured $2.5 million in seed funding to develop our innovative education management platform."
  },
  {
    year: "2021",
    title: "Company Founding",
    description: "GuideCampus was founded with the vision to transform education management using cutting-edge technology."
  },
  {
    year: "2020",
    title: "Research and Development",
    description: "Initial research and market analysis to identify key challenges in educational institution management."
  }
];

export default About;
