import * as React from "react";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { NavigationLogo } from "./navigation/NavigationLogo";
import { MobileMenu } from "./navigation/MobileMenu";
import { DesktopMenu } from "./navigation/DesktopMenu";

export function MainNav() {
  const [isOpen, setIsOpen] = React.useState(false);
  const isMobile = useIsMobile();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <NavigationMenu className="max-w-full w-full px-6 py-4 bg-white/80 backdrop-blur-sm fixed top-0 z-50 border-b">
      <div className="container mx-auto flex items-center justify-between">
        <NavigationLogo />
        {isMobile ? (
          <MobileMenu isOpen={isOpen} toggleMenu={toggleMenu} />
        ) : (
          <DesktopMenu />
        )}
      </div>
    </NavigationMenu>
  );
}