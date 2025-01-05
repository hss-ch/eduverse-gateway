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
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link 
          to="/" 
          className="mr-6 flex items-center space-x-2"
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
        <div className="flex flex-1 items-center space-x-2 justify-between">
          <div className="hidden md:block">
            <DesktopMenu />
          </div>
          <div className="block md:hidden">
            <MobileMenu isOpen={isOpen} toggleMenu={toggleMenu} />
          </div>
        </div>
      </div>
    </header>
  );
}