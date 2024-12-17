import { Link, Outlet, useLocation } from "react-router-dom";
import { MainNav } from "../MainNav";
import { Footer } from "../Footer";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function BlogLayout() {
  const location = useLocation();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Blog layout - Current session:", session);
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Blog layout - Auth state changed:", session);
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
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