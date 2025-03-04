
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Users,
  UserCircle,
  Calendar,
  Briefcase,
  MessageSquare,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";

export function DashboardNav() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'profile';
  
  const navItems = [
    { id: 'profile', label: 'Profile', icon: UserCircle },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'demos', label: 'Demo Requests', icon: Calendar },
    { id: 'applications', label: 'Job Applications', icon: Briefcase },
    { id: 'contact', label: 'Contact', icon: MessageSquare, path: '/contact' },
  ];

  const handleTabChange = (tabId: string) => {
    if (tabId !== 'contact') {
      setSearchParams({ tab: tabId });
    }
  };

  return (
    <nav className="space-y-1">
      {navItems.map(item => {
        // For contact, we use a direct link, for others we use the tab system
        if (item.path) {
          return (
            <Button
              key={item.id}
              variant="ghost"
              className="w-full justify-start gap-2 text-sm font-medium"
              asChild
            >
              <Link to={item.path}>
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            </Button>
          );
        }
        
        return (
          <Button
            key={item.id}
            variant={activeTab === item.id ? "secondary" : "ghost"}
            className="w-full justify-start gap-2 text-sm font-medium"
            onClick={() => handleTabChange(item.id)}
          >
            <item.icon className="h-4 w-4" />
            <span>{item.label}</span>
          </Button>
        );
      })}
    </nav>
  );
}
