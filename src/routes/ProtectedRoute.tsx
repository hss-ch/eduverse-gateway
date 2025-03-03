
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    let mounted = true;

    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        console.log("ProtectedRoute - Session:", session);
        
        if (!session && mounted) {
          console.log("ProtectedRoute - No session, redirecting to auth");
          toast({
            title: "Authentication Required",
            description: "Please sign in to access this page",
            variant: "destructive",
          });
          navigate("/auth");
        } else if (session && mounted) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("ProtectedRoute - Error checking session:", error);
      } finally {
        if (mounted) {
          setIsChecking(false);
        }
      }
    };

    // Check initial session
    checkSession();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session && mounted) {
        console.log("ProtectedRoute - Auth state changed: No session");
        navigate("/auth");
      } else if (session && mounted) {
        setIsAuthenticated(true);
      }
    });

    // Cleanup
    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : null;
}
