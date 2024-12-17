import { Link } from "react-router-dom";
import { Compass } from "lucide-react";

export function NavigationLogo() {
  return (
    <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary">
      <Compass className="h-6 w-6" />
      GuideCampus
    </Link>
  );
}