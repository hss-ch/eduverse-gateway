import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { navigationData } from "./navigationData";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import { DesktopSubmenuItem } from "./DesktopSubmenuItem";

export const DesktopMenu = () => {
  const [session, setSession] = useState<Session | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("DesktopMenu - Initial session check");
    supabase.auth.getSession().then(({ data: { session } }) => {
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
      localStorage.clear();
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Sign out error:", error);
        toast({
          variant: "destructive",
          title: "Error signing out",
          description: error.message,
        });
      } else {
        toast({
          title: "Signed out successfully",
        });
        navigate("/");
      }
    } catch (error) {
      console.error("Sign out error:", error);
      toast({
        variant: "destructive",
        title: "Error signing out",
        description: "An unexpected error occurred",
      });
    }
  };

  console.log("DesktopMenu - Rendering with session:", session);

  return (
    <div className="hidden md:block fixed top-0 left-0 right-0 bg-background z-50 border-b">
      <div className="container mx-auto px-4">
        <NavigationMenu className="relative">
          <NavigationMenuList className="gap-2">
            {navigationData.map((item) => (
              <NavigationMenuItem key={item.title}>
                {item.items ? (
                  <>
                    <NavigationMenuTrigger className="bg-background hover:bg-accent text-foreground">
                      {item.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="absolute top-0 left-0 w-[400px] bg-white rounded-md shadow-lg border p-4 grid gap-3 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {item.items.map((subItem) => (
                          <DesktopSubmenuItem
                            key={subItem.title}
                            title={subItem.title}
                            href={subItem.href}
                            description={subItem.description}
                          />
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <Link
                    to={item.href?.replace(/:\/$/, "") || "#"}
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                  >
                    {item.title}
                  </Link>
                )}
              </NavigationMenuItem>
            ))}
            {session ? (
              <NavigationMenuItem>
                <button
                  onClick={handleSignOut}
                  className="cursor-pointer group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                >
                  Sign Out
                </button>
              </NavigationMenuItem>
            ) : (
              <NavigationMenuItem>
                <Link
                  to="/auth"
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                >
                  Sign In
                </Link>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
};