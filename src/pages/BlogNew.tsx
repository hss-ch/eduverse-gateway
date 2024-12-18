import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlogPostForm } from "@/components/blog/BlogPostForm";

export default function BlogNew() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function getInitialSession() {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        console.log("BlogNew - Getting initial session:", session);
        
        if (error) {
          console.error("Error getting session:", error);
          if (mounted) {
            toast({
              title: "Error",
              description: "Failed to get session. Please try signing in again.",
              variant: "destructive",
            });
            navigate("/auth");
          }
          return;
        }

        if (!session) {
          if (mounted) {
            toast({
              title: "Authentication required",
              description: "Please sign in to create a blog post",
              variant: "destructive",
            });
            navigate("/auth");
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
          navigate("/auth");
        }
      }
    }

    getInitialSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("BlogNew - Auth state changed:", _event, session);
      if (mounted) {
        setSession(session);
        setLoading(false);
        if (!session) {
          navigate("/auth");
        }
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 animate-fade-up">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => navigate("/blog")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Blog
      </Button>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Create New Blog Post</CardTitle>
          </CardHeader>
          <CardContent>
            <BlogPostForm session={session} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Manage Your Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center text-muted-foreground">
              Your posts will appear here after publishing
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}