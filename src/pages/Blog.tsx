
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { BlogRating } from "@/components/blog/BlogRating";
import { BlogAdminActions } from "@/components/blog/BlogAdminActions";
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { BlogPageHeader } from "@/components/blog/BlogPageHeader";

export default function Blog() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setIsAuthenticated(!!session);
  };

  const fetchPosts = async () => {
    try {
      console.log("Fetching blog posts...");
      const { data: { user } } = await supabase.auth.getUser();
      
      let query = supabase
        .from("blogs")
        .select(`
          *,
          profiles (
            full_name,
            role
          )
        `);

      // If not admin, only show published posts
      if (!user || !user.id) {
        query = query.eq("published", true);
      }

      const { data, error } = await query.order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching posts:", error);
        toast({
          title: "Error",
          description: "Failed to fetch blog posts. Please try again later.",
          variant: "destructive",
        });
        return;
      }

      console.log("Fetched posts:", data);
      setPosts(data || []);
    } catch (error) {
      console.error("Unexpected error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <MainNav />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <MainNav />
      
      <BlogPageHeader 
        title="Our Blog" 
        description="Insights, updates, and educational resources for your institution"
        imageSrc="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8"
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Latest Posts</h2>
          {isAuthenticated && (
            <Button onClick={() => navigate("/blog/new")} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>Create Post</span>
            </Button>
          )}
        </div>
        
        {!posts.length ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">No Blog Posts Found</h2>
            <p className="text-muted-foreground">Check back later for new content!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div key={post.id}>
                <Link to={`/blog/${post.id}`}>
                  <Card className="h-full hover:shadow-md transition-shadow">
                    {post.image_url && (
                      <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
                        <img
                          src={post.image_url}
                          alt={post.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            console.log("Image failed to load:", post.image_url);
                            const target = e.target as HTMLImageElement;
                            target.src = "/placeholder.svg";
                          }}
                        />
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(post.created_at), "MMMM d, yyyy")}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <p className="line-clamp-3 text-muted-foreground mb-4">
                        {post.content}
                      </p>
                      <div onClick={(e) => e.preventDefault()}>
                        <BlogRating 
                          id={post.id} 
                          initialRating={post.rating || 0}
                          initialCount={post.ratings_count || 0}
                        />
                        <BlogAdminActions
                          blogId={post.id}
                          isPublished={post.published}
                          onPublishChange={fetchPosts}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
