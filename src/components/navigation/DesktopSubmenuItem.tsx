import { Link } from "react-router-dom";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";

interface DesktopSubmenuItemProps {
  title: string;
  href: string;
  description: string;
}

export const DesktopSubmenuItem = ({ title, href, description }: DesktopSubmenuItemProps) => {
  console.log("Rendering submenu item:", title);
  
  return (
    <NavigationMenuLink asChild>
      <Link
        to={href.replace(/:\/$/, "")}
        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
      >
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-2">
          {description}
        </p>
      </Link>
    </NavigationMenuLink>
  );
};