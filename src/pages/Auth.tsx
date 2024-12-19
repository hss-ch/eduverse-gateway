import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { useToast } from "@/components/ui/use-toast";

export default function Auth() {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    let mounted = true;

    async function getInitialSession() {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        console.log("Auth page - Initial session check:", session);
        
        if (error) {
          console.error("Error checking session:", error);
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
          });
          return;
        }
        
        if (mounted && session) {
          console.log("Session found, redirecting to home");
          navigate("/");
        }
      } catch (error) {
        console.error("Error in getInitialSession:", error);
        toast({
          title: "Error",
          description: "An error occurred while checking your session",
          variant: "destructive",
        });
      }
    }

    getInitialSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, session);
      
      if (mounted) {
        if (event === 'SIGNED_IN') {
          console.log("User signed in, redirecting to home");
          toast({
            title: "Success",
            description: "Successfully signed in",
          });
          navigate("/");
        } else if (event === 'SIGNED_OUT') {
          console.log("User signed out");
          navigate("/auth");
        } else if (event === 'USER_UPDATED') {
          console.log("User updated");
        } else if (event === 'PASSWORD_RECOVERY') {
          console.log("Password recovery");
        }
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  return (
    <div className="min-h-screen flex flex-col bg-accent">
      <MainNav />
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-sm">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Welcome to GuideCampus
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Sign in to your account or create a new one
            </p>
          </div>
          <div className="mt-8">
            <SupabaseAuth 
              supabaseClient={supabase} 
              appearance={{ 
                theme: ThemeSupa,
                style: {
                  button: { background: '#9B87F5', color: 'white' },
                  anchor: { color: '#9B87F5' },
                  input: { borderRadius: '0.375rem' },
                  message: { borderRadius: '0.375rem' },
                },
                className: {
                  container: 'space-y-4',
                  button: 'rounded-md',
                  input: 'rounded-md',
                  message: 'rounded-md',
                }
              }}
              theme="light"
              providers={[]}
              redirectTo={window.location.origin}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}