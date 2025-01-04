import { useNavigate } from "react-router-dom";

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
      <span className="font-bold text-xl">GuideCampus</span>
    </div>
  );
}