import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { navigationData } from "./navigationData";
import { ListItem } from "./ListItem";
import { Button } from "@/components/ui/button";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export function DesktopMenu() {
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const supabase = useSupabaseClient();
  const navigate = useNavigate();

  const toggleMenu = (menuId: string) => {
    setOpenMenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId]
    }));
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  return (
    <div className="flex items-center space-x-4">
      <NavigationMenu>
        <NavigationMenuList className="space-x-2">
          {navigationData.map((item) => (
            <NavigationMenuItem key={item.title}>
              {item.items ? (
                <>
                  <NavigationMenuTrigger
                    onClick={() => toggleMenu(item.title)}
                    className="h-10"
                  >
                    {item.title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="absolute top-0 left-0 w-[400px] md:w-[500px] lg:w-[600px]">
                    <div className="relative">
                      <ul className="grid w-full gap-3 p-4 md:grid-cols-2 bg-white rounded-lg shadow-lg">
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
                    </div>
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
        <Button variant="ghost" onClick={() => navigate('/auth')}>
          Sign In
        </Button>
        <Button onClick={() => navigate('/auth')} className="bg-primary text-white hover:bg-primary/90">
          Sign Up
        </Button>
      </div>
    </div>
  );
}