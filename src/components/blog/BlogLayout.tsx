import { Link, Outlet, useLocation } from "react-router-dom";
import { MainNav } from "../MainNav";
import { Footer } from "../Footer";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export function BlogLayout() {
  const location = useLocation();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    let mounted = true;

    async function getInitialSession() {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        console.log("BlogLayout - Getting initial session:", session);
        
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

        if (mounted) {
          setSession(session);
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
      console.log("BlogLayout - Auth state changed:", _event, session);
      if (mounted) {
        setSession(session);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [toast]);

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

  return (
    <div className="min-h-screen flex flex-col bg-accent/50">
      <MainNav />
      <main className="flex-1 container mx-auto px-6 py-24">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-secondary mb-2">Blog</h1>
            <p className="text-muted-foreground">
              Discover insights and stories from our community
            </p>
          </div>
          {session && location.pathname === "/blog" && (
            <Link to="/blog/new">
              <Button className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" />
                Create Post
              </Button>
            </Link>
          )}
        </div>
        <div className="bg-background rounded-lg p-6 shadow-sm">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}