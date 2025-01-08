import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Star } from "lucide-react";

export default function Blog() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Blog - Getting initial session:", session);
      setSession(session);
    });

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
        setLoading(true);
        
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
            className="h-[300px] bg-muted animate-pulse rounded-lg"
          />
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">No blog posts found</h2>
        <p className="text-muted-foreground">Check back later for new content!</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Link key={post.id} to={`/blog/${post.id}`}>
          <Card className="h-full hover:shadow-md transition-shadow">
            {post.image_url && (
              <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <CardHeader>
              <CardTitle className="line-clamp-2">{post.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                By {post.profiles?.full_name || "Unknown Author"}
              </p>
              <p className="text-xs text-muted-foreground">
                {format(new Date(post.created_at), "MMMM d, yyyy")}
              </p>
              <div className="flex items-center space-x-1 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= (post.rating || 0)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-sm text-muted-foreground ml-1">
                  ({post.ratings_count || 0})
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="line-clamp-3 text-muted-foreground">
                {post.content}
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}