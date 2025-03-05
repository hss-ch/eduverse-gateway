
import { motion } from "framer-motion";
import { Handshake, Globe, PieChart, BarChart4, Users, Gift } from "lucide-react";
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { PartnerRegistration } from "@/components/partners/PartnerRegistration";

const Partners = () => {
  return (
    <div className="min-h-screen bg-accent">
      <MainNav />
      
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Partnership"
          className="w-full h-[300px] object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20" />
      </div>

      <section className="relative -mt-20 px-6">
        <div className="container">
          <PageHeader 
            title="Partner With Us"
            description="Join our growing ecosystem of partners and create value together"
          />

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-secondary mb-8">How would you like to partner with us?</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {partnerTypes.map((type, index) => (
                <motion.div
                  key={type.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-8 rounded-2xl bg-white hover:shadow-lg transition-all duration-300"
                >
                  <type.icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-secondary mb-2">
                    {type.title}
                  </h3>
                  <p className="text-secondary/70 mb-4">{type.description}</p>
                  <ul className="list-disc list-inside text-secondary/70 space-y-1">
                    {type.benefits.map((benefit, i) => (
                      <li key={i}>{benefit}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold text-secondary mb-6">Why Partner With Us?</h2>
              <div className="space-y-4 text-secondary/80">
                <p>
                  At GuideCampus, we believe in the power of collaboration. Our partner ecosystem plays a crucial role in delivering exceptional value to educational institutions worldwide.
                </p>
                <p>
                  By partnering with us, you'll gain access to cutting-edge technology, comprehensive training, marketing resources, and a dedicated partner success team to help you grow your business.
                </p>
                <p>
                  Whether you're looking to expand your service offerings, reach new markets, or create innovative solutions for educational institutions, our partnership program provides the framework and support you need to succeed.
                </p>
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-secondary mb-4">Our Partnership Principles</h3>
                <ul className="space-y-3">
                  {principles.map((principle, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="h-6 w-6 mt-0.5 flex-shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
                        <principle.icon className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-secondary/80">{principle.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div>
              <PartnerRegistration />
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-secondary mb-8">Partner Success Stories</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {successStories.map((story, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center gap-4 mb-4">
                    <img 
                      src={story.logo} 
                      alt={story.company} 
                      className="h-12 w-12 object-contain"
                    />
                    <div>
                      <h3 className="font-semibold text-secondary">{story.company}</h3>
                      <p className="text-sm text-primary">{story.partnerType}</p>
                    </div>
                  </div>
                  <p className="text-secondary/70 italic">"{story.quote}"</p>
                  <p className="text-sm text-secondary mt-2">- {story.author}, {story.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const partnerTypes = [
  {
    title: "Sales Partner",
    description: "Expand your portfolio with our education management solutions",
    icon: Handshake,
    benefits: [
      "Attractive commission structure",
      "Comprehensive sales training",
      "Marketing and sales resources",
      "Dedicated partner manager"
    ]
  },
  {
    title: "Business Partner",
    description: "Strategic alliances to create joint value propositions",
    icon: Globe,
    benefits: [
      "Co-branded marketing opportunities",
      "Joint go-to-market strategies",
      "Executive sponsorship",
      "Strategic business planning"
    ]
  },
  {
    title: "Technology Partner",
    description: "Integrate your solutions with our platform",
    icon: PieChart,
    benefits: [
      "API access and technical resources",
      "Integration certification",
      "Joint product development",
      "Technical enablement and support"
    ]
  },
  {
    title: "Consulting Partner",
    description: "Deliver implementation and advisory services",
    icon: BarChart4,
    benefits: [
      "Implementation certification",
      "Professional services opportunities",
      "Technical and functional training",
      "Project methodology and resources"
    ]
  },
  {
    title: "Reseller Partner",
    description: "Expand your offerings with our full product suite",
    icon: Users,
    benefits: [
      "Competitive margins",
      "White-label options",
      "Product training and certification",
      "Marketing development funds"
    ]
  },
  {
    title: "Referral Partner",
    description: "Earn rewards for introducing potential clients",
    icon: Gift,
    benefits: [
      "Simple referral process",
      "Competitive referral fees",
      "Minimal commitment required",
      "Regular opportunity updates"
    ]
  }
];

const principles = [
  { icon: Users, text: "Mutual Growth - We succeed when our partners succeed" },
  { icon: Handshake, text: "Transparency - Clear communication and expectations" },
  { icon: Gift, text: "Enablement - Resources and support to help you thrive" },
  { icon: Globe, text: "Innovation - Continuously evolving our joint value proposition" },
];

const successStories = [
  {
    company: "EduTech Solutions",
    partnerType: "Technology Partner",
    logo: "https://images.unsplash.com/photo-1614036586480-66513cdcf9af?auto=format&fit=crop&w=80&h=80&q=80",
    quote: "Partnering with GuideCampus has been transformative for our business. The integration between our student analytics platform and their ERP system created a powerful solution that's generating significant interest in the market.",
    author: "Sarah Johnson",
    title: "Chief Technology Officer"
  },
  {
    company: "Global Education Consultants",
    partnerType: "Consulting Partner",
    logo: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=80&h=80&q=80",
    quote: "As a consulting partner, we've implemented GuideCampus solutions at over 15 institutions. Their team's support and the platform's flexibility have helped us deliver exceptional value to our clients.",
    author: "Michael Chen",
    title: "Managing Director"
  }
];

export default Partners;
