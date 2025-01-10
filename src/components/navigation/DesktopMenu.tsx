import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { navigationData } from "./navigationData";
import { ListItem } from "./ListItem";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export function DesktopMenu() {
  const [session, setSession] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("DesktopMenu - Initial session:", session);
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("DesktopMenu - Auth state changed:", session);
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      console.log("DesktopMenu - Starting sign out process");
      
      // First check if we have a valid session
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      console.log("DesktopMenu - Current session before logout:", currentSession);
      
      // If no session exists, just clear local state and redirect
      if (!currentSession) {
        console.log("DesktopMenu - No active session found, clearing state and redirecting");
        setSession(null);
        navigate('/auth');
        return;
      }
      
      // Clear local session state first to prevent UI flicker
      setSession(null);
      
      // Attempt to sign out from Supabase
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("DesktopMenu - Error during sign out:", error);
        // Even if there's an error, we want to clear the local session
        toast({
          title: "Notice",
          description: "You have been signed out.",
        });
      } else {
        console.log("DesktopMenu - Sign out successful");
        toast({
          title: "Success",
          description: "Signed out successfully",
        });
      }
      
      // Always navigate to auth page
      navigate('/auth');
    } catch (error: any) {
      console.error("DesktopMenu - Error in handleSignOut:", error);
      // Clear session and redirect even if there's an error
      setSession(null);
      toast({
        title: "Notice",
        description: "You have been signed out.",
      });
      navigate('/auth');
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <NavigationMenu className="relative z-[100]">
        <NavigationMenuList className="space-x-2">
          {navigationData.map((item, index) => (
            <NavigationMenuItem key={index}>
              {item.items ? (
                <>
                  <NavigationMenuTrigger className="h-10 bg-background hover:bg-accent">
                    {item.title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="absolute top-full z-[100] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-lg rounded-md border border-border">
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {item.items.map((subItem) => (
                        <ListItem
                          key={subItem.title}
                          title={subItem.title}
                          to={subItem.href}
                        >
                          {subItem.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </>
              ) : (
                <Link to={item.href || "#"}>
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                    {item.title}
                  </NavigationMenuLink>
                </Link>
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      
      <div className="flex items-center space-x-2">
        {session ? (
          <>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/dashboard')}
            >
              Dashboard
            </Button>
            <Button 
              variant="ghost"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </>
        ) : (
          <>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/auth')}
            >
              Sign In
            </Button>
            <Button 
              onClick={() => navigate('/auth')} 
              className="bg-primary text-white hover:bg-primary/90"
            >
              Sign Up
            </Button>
          </>
        )}
      </div>
    </div>
  );
}