import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { navigationData } from "./navigationData";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";

interface MobileMenuProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

export function MobileMenu({ isOpen, toggleMenu }: MobileMenuProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("MobileMenu - Initial session:", session);
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("MobileMenu - Auth state changed:", session);
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      console.log("MobileMenu - Starting sign out process");
      
      // First clear local state and storage
      setSession(null);
      localStorage.clear(); // Clear all local storage to ensure complete cleanup
      
      // Then sign out from Supabase
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("MobileMenu - Sign out error:", error);
        // Even if there's an error, we want to clear the local state
        toast({
          title: "Notice",
          description: "You have been signed out locally.",
        });
      } else {
        console.log("MobileMenu - Sign out successful");
        toast({
          title: "Success",
          description: "Signed out successfully",
        });
      }
      
      toggleMenu();
      navigate('/auth');
    } catch (error: any) {
      console.error("MobileMenu - Error in handleSignOut:", error);
      toast({
        title: "Notice",
        description: "You have been signed out.",
      });
      toggleMenu();
      navigate('/auth');
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={toggleMenu}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon" className="relative z-50">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px] z-[100]">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={toggleMenu}
          >
            <X className="h-6 w-6" />
          </Button>
        </SheetHeader>
        <nav className="mt-8 h-[calc(100vh-8rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <Accordion type="single" collapsible className="w-full">
            {navigationData.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                {item.items ? (
                  <>
                    <AccordionTrigger className="text-lg">
                      {item.title}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col space-y-2">
                        {item.items.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            to={subItem.href}
                            className="p-2 hover:bg-accent rounded-md"
                            onClick={toggleMenu}
                          >
                            <div className="font-medium">{subItem.title}</div>
                            <p className="text-sm text-muted-foreground">
                              {subItem.description}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </>
                ) : (
                  <Link
                    to={item.href || "#"}
                    className="flex h-12 items-center justify-between py-4 px-4 text-lg hover:bg-accent rounded-md"
                    onClick={toggleMenu}
                  >
                    {item.title}
                  </Link>
                )}
              </AccordionItem>
            ))}
          </Accordion>
          <div className="mt-6 space-y-2">
            {session ? (
              <>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start" 
                  onClick={() => {
                    toggleMenu();
                    navigate('/dashboard');
                  }}
                >
                  Dashboard
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start"
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start" 
                  onClick={() => {
                    toggleMenu();
                    navigate('/auth');
                  }}
                >
                  Sign In
                </Button>
                <Button 
                  className="w-full justify-start bg-primary text-white hover:bg-primary/90"
                  onClick={() => {
                    toggleMenu();
                    navigate('/auth');
                  }}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
