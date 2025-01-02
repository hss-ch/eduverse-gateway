import { useEffect, useState } from "react";
import { BlogPost } from "@/components/blog/BlogPost";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export default function Blog() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Blog - Getting initial session:", session);
      setSession(session);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Blog - Auth state changed:", _event, session);
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    async function fetchPosts() {
      try {
        console.log("Fetching blog posts...");
        const { data, error } = await supabase
          .from("blogs")
          .select(`
            *,
            profiles (
              full_name
            )
          `)
          .eq("published", true)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching posts:", error);
          throw error;
        }

        console.log("Fetched posts:", data);
        setPosts(data || []);
      } catch (error: any) {
        console.error("Error in fetchPosts:", error);
        toast({
          title: "Error",
          description: "Failed to fetch blog posts",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [toast]);

  if (loading) {
    return (
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className="h-[400px] bg-muted animate-pulse rounded-lg"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <BlogPost key={post.id} {...post} session={session} />
      ))}
    </div>
  );
}