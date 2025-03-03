
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Users,
  UserCircle,
  Calendar,
  Briefcase,
  MessageSquare,
} from "lucide-react";

export function DashboardNav() {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'profile';
  
  const navItems = [
    { id: 'profile', label: 'Profile', icon: UserCircle, path: '/dashboard?tab=profile' },
    { id: 'users', label: 'Users', icon: Users, path: '/dashboard?tab=users' },
    { id: 'demos', label: 'Demo Requests', icon: Calendar, path: '/dashboard?tab=demos' },
    { id: 'applications', label: 'Job Applications', icon: Briefcase, path: '/dashboard?tab=applications' },
    { id: 'contact', label: 'Contact', icon: MessageSquare, path: '/contact' },
  ];

  return (
    <nav className="space-y-1">
      {navItems.map(item => (
        <Button
          key={item.id}
          variant={activeTab === item.id ? "secondary" : "ghost"}
          className="w-full justify-start gap-2 text-sm"
          asChild
        >
          <Link to={item.path}>
            <item.icon className="h-4 w-4" />
            <span>{item.label}</span>
          </Link>
        </Button>
      ))}
    </nav>
  );
}
