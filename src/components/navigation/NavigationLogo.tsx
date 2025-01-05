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
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary"
      >
        <path
          d="M8 2H24C27.3137 2 30 4.68629 30 8V24C30 27.3137 27.3137 30 24 30H8C4.68629 30 2 27.3137 2 24V8C2 4.68629 4.68629 2 8 2Z"
          fill="currentColor"
          fillOpacity="0.2"
        />
        <path
          d="M13.5 10.5H18.5M13.5 15.5H18.5M13.5 20.5H18.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="flex flex-col">
        <span className="font-bold text-xl text-primary">GuideCampus</span>
        <span className="text-xs text-muted-foreground">Education Management</span>
      </div>
    </div>
  );
}