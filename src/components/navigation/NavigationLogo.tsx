import { useNavigate } from "react-router-dom";
import { Compass } from "lucide-react";

export function NavigationLogo() {
  const navigate = useNavigate();
  
  console.log("NavigationLogo rendering"); // Debug log
  
  return (
    <div 
      className="flex items-center space-x-2 cursor-pointer"
      onClick={() => {
        console.log("Logo clicked, navigating to /"); // Debug log
        if (window.location.pathname !== '/') {
          navigate('/');
        }
      }}
    >
      <Compass className="h-6 w-6 text-primary" />
      <div className="flex flex-col">
        <span className="font-bold text-xl text-primary">GuideCampus</span>
        <span className="text-xs text-muted-foreground">Education Management</span>
      </div>
    </div>
  );
}