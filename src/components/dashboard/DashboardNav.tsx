import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Users,
  UserCircle,
  Calendar,
  Briefcase,
  MessageSquare,
} from "lucide-react";

export function DashboardNav() {
  return (
    <nav className="space-y-2">
      <Button
        variant="ghost"
        className="w-full justify-start gap-2"
        asChild
      >
        <Link to="/dashboard?tab=profile">
          <UserCircle className="h-4 w-4" />
          Profile
        </Link>
      </Button>
      <Button
        variant="ghost"
        className="w-full justify-start gap-2"
        asChild
      >
        <Link to="/dashboard?tab=users">
          <Users className="h-4 w-4" />
          Users
        </Link>
      </Button>
      <Button
        variant="ghost"
        className="w-full justify-start gap-2"
        asChild
      >
        <Link to="/dashboard?tab=demos">
          <Calendar className="h-4 w-4" />
          Demo Requests
        </Link>
      </Button>
      <Button
        variant="ghost"
        className="w-full justify-start gap-2"
        asChild
      >
        <Link to="/dashboard?tab=applications">
          <Briefcase className="h-4 w-4" />
          Job Applications
        </Link>
      </Button>
      <Button
        variant="ghost"
        className="w-full justify-start gap-2"
        asChild
      >
        <Link to="/contact">
          <MessageSquare className="h-4 w-4" />
          Contact
        </Link>
      </Button>
    </nav>
  );
}