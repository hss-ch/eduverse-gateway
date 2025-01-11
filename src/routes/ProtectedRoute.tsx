import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      console.log("ProtectedRoute - Session:", session);
      
      if (!session) {
        console.log("ProtectedRoute - No session, redirecting to auth");
        toast({
          title: "Authentication Required",
          description: "Please sign in to access this page",
          variant: "destructive",
        });
        navigate("/auth");
      }
    };

    checkSession();
  }, [navigate, toast]);

  return <>{children}</>;
}