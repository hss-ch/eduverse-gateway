import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { solutions, resources } from "./navigationData";

interface MobileMenuProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

export function MobileMenu({ isOpen, toggleMenu }: MobileMenuProps) {
  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="p-2 text-secondary hover:bg-accent rounded-lg transition-colors"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-60 bg-white rounded-lg shadow-lg border animate-fade-in">
          <div className="max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent p-4">
            <div className="flex flex-col space-y-4">
              <div className="space-y-2">
                <div className="font-medium text-sm text-secondary">Solutions</div>
                {solutions.map((item) => (
                  <Link
                    key={item.title}
                    to={item.href}
                    className="block px-3 py-2 text-sm text-secondary/70 hover:bg-accent rounded-md"
                    onClick={() => toggleMenu()}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>

              <div className="space-y-2">
                <div className="font-medium text-sm text-secondary">Resources</div>
                {resources.map((item) => (
                  <Link
                    key={item.title}
                    to={item.href}
                    className="block px-3 py-2 text-sm text-secondary/70 hover:bg-accent rounded-md"
                    onClick={() => toggleMenu()}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>

              <Link
                to="/pricing"
                className="block px-3 py-2 text-sm text-secondary/70 hover:bg-accent rounded-md"
                onClick={() => toggleMenu()}
              >
                Pricing
              </Link>

              <div className="pt-2 flex flex-col gap-2">
                <Link
                  to="/auth"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-center"
                  onClick={() => toggleMenu()}
                >
                  Sign In
                </Link>
                <Link
                  to="/contact"
                  className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors text-center"
                  onClick={() => toggleMenu()}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}