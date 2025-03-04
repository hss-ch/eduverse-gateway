
import { motion } from "framer-motion";
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { BlogPageHeader } from "@/components/blog/BlogPageHeader";
import { Plus } from "lucide-react";

const BlogPortal = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <MainNav />
      
      <BlogPageHeader 
        title="Blog Portal" 
        description={session ? "Manage your blog posts" : "Sign in to manage your blog posts"}
        imageSrc="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
      />
      
      <section className="py-12 px-6">
        <div className="container">
          {session ? (
            <div className="grid gap-8 mb-16">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Your Blog Posts</h2>
                  <Button onClick={() => navigate("/blog/new")} className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    <span>Create New Post</span>
                  </Button>
                </div>
                <p className="text-muted-foreground">Manage your existing posts or create new content</p>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <Button onClick={() => navigate("/auth")}>
                Sign In to Continue
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default BlogPortal;
