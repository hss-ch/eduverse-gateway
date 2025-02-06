import { Link } from "react-router-dom";
import { NavigationLogo } from "./navigation/NavigationLogo";
import { DesktopMenu } from "./navigation/DesktopMenu";
import { MobileMenu } from "./navigation/MobileMenu";
import { useState } from "react";

export function MainNav() {
  console.log("MainNav rendering"); // Debug log
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    console.log("Toggling mobile menu"); // Debug log
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="container mx-auto px-4 h-16">
        <div className="flex h-full items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-2"
            onClick={(e) => {
              console.log("Logo clicked, navigating to /"); // Debug log
              if (window.location.pathname === '/') {
                e.preventDefault();
                console.log("Already on home page, preventing navigation");
              }
            }}
          >
            <NavigationLogo />
          </Link>
          
          <div className="flex items-center gap-4 -ml-38"> {/* Added -ml-38 to move menu left */}
            <div className="hidden md:block">
              <DesktopMenu />
            </div>
            <div className="block md:hidden">
              <MobileMenu isOpen={isOpen} toggleMenu={toggleMenu} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
