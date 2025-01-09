import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface BlogAuthCheckProps {
  children: React.ReactNode;
  onSessionChange: (session: any) => void;
}

export function BlogAuthCheck({ children, onSessionChange }: BlogAuthCheckProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    let mounted = true;

    async function getInitialSession() {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        console.log("BlogAuthCheck - Getting initial session:", session);
        
        if (error) {
          console.error("Error getting session:", error);
          if (mounted) {
            toast({
              title: "Error",
              description: "Failed to get session",
              variant: "destructive",
            });
          }
          return;
        }

        if (!session) {
          console.log("BlogAuthCheck - No session found, redirecting to auth");
          navigate("/auth");
          return;
        }

        if (mounted) {
          onSessionChange(session);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error in getInitialSession:", error);
        if (mounted) {
          setLoading(false);
        }
      }
    }

    getInitialSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("BlogAuthCheck - Auth state changed:", _event, session);
      if (mounted) {
        if (!session) {
          navigate("/auth");
          return;
        }
        onSessionChange(session);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate, toast, onSessionChange]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}