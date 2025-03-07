
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Users,
  Building,
  Briefcase,
  Calendar,
  FileText,
  Settings,
  User,
  PhoneCall,
  Newspaper
} from "lucide-react";

interface DashboardNavProps extends React.HTMLAttributes<HTMLElement> {
  onNavigate: (page: string) => void;
}

export function DashboardNav({
  className,
  onNavigate,
  ...props
}: DashboardNavProps) {
  const [activeItem, setActiveItem] = useState("users");

  const handleClick = (item: string) => {
    setActiveItem(item);
    onNavigate(item);
  };

  return (
    <nav
      className={cn("flex flex-col space-y-2", className)}
      {...props}
    >
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          Management
        </h2>
        <div className="space-y-1">
          <Button
            variant={activeItem === "users" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => handleClick("users")}
          >
            <Users className="mr-2 h-4 w-4" />
            Users
          </Button>
          <Button
            variant={activeItem === "partners" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => handleClick("partners")}
          >
            <Building className="mr-2 h-4 w-4" />
            Partners
          </Button>
          <Button
            variant={activeItem === "jobs" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => handleClick("jobs")}
          >
            <Briefcase className="mr-2 h-4 w-4" />
            Job Applications
          </Button>
          <Button
            variant={activeItem === "demos" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => handleClick("demos")}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Demo Requests
          </Button>
          <Button
            variant={activeItem === "news" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => handleClick("news")}
          >
            <Newspaper className="mr-2 h-4 w-4" />
            News & Events
          </Button>
        </div>
      </div>
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          Account
        </h2>
        <div className="space-y-1">
          <Button
            variant={activeItem === "profile" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => handleClick("profile")}
          >
            <User className="mr-2 h-4 w-4" />
            Profile
          </Button>
          <Button
            variant={activeItem === "settings" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => handleClick("settings")}
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button
            variant={activeItem === "support" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => handleClick("support")}
          >
            <PhoneCall className="mr-2 h-4 w-4" />
            Support
          </Button>
        </div>
      </div>
    </nav>
  );
}
