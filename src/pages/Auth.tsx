import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";

export default function Auth() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, session);
      if (session) {
        navigate("/");
      }
    });
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-accent">
      <MainNav />
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
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
                },
              }}
              theme="light"
              providers={[]}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}