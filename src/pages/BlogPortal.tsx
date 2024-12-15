import { motion } from "framer-motion";
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

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
    <div className="min-h-screen bg-accent">
      <MainNav />
      
      <section className="pt-24 px-6">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
              Blog Portal
            </h1>
            <p className="text-secondary/70 max-w-2xl mx-auto">
              {session ? "Manage your blog posts" : "Sign in to manage your blog posts"}
            </p>
          </motion.div>

          {session ? (
            <div className="grid gap-8 mb-16">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Your Blog Posts</h2>
                <Button onClick={() => navigate("/blog/new")}>
                  Create New Post
                </Button>
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
};

export default BlogPortal;