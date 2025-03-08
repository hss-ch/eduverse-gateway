
import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Instagram, Compass } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
              <Compass className="h-8 w-8" />
              GuideCampus
            </Link>
            <p className="text-secondary-foreground/80">
              Transforming education management with innovative ERP solutions.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Solutions</h3>
            <ul className="space-y-2">
              <li><Link to="/academic" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">Academic Management</Link></li>
              <li><Link to="/administrative" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">Administration</Link></li>
              <li><Link to="/planning" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">Planning & Scheduling</Link></li>
              <li><Link to="/accreditation" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">Accreditation</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">Contact</Link></li>
              <li><Link to="/blog" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">Blog</Link></li>
              <li><Link to="/careers" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">Careers</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
            <h5 className="font-semibold text-lg mb-4">Interested in working with us?</h5>
              <p className="text-secondary-foreground/80">
                Call us now: +91 85558 62483
              </p>
          </div>
        </div>
        
        <div className="border-t border-secondary-foreground/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-secondary-foreground/80 text-sm">
            © 2024 GuideCampus. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="text-secondary-foreground/80 hover:text-secondary-foreground text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-secondary-foreground/80 hover:text-secondary-foreground text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
