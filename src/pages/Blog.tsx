
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Plus, Heart, Calendar, Eye, Clock } from "lucide-react";
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
      
      // Track views for each post that's displayed in the list
      if (data && data.length > 0) {
        data.forEach(async (post) => {
          await incrementViewCount(post.id);
        });
      }
      
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

  const incrementViewCount = async (blogId: string) => {
    try {
      // Increment the view count
      const { error } = await supabase.rpc('increment_blog_view', {
        blog_id: blogId
      });
      
      if (error) {
        console.error("Error incrementing view count:", error);
      }
    } catch (error) {
      console.error("Error tracking view:", error);
    }
  };

  const handleLikeClick = async (blogId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to like blog posts",
        variant: "default",
      });
      return;
    }
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      
      // Check if user already liked the post
      const { data: existingLike } = await supabase
        .from('blog_likes')
        .select()
        .eq('blog_id', blogId)
        .eq('user_id', user.id)
        .single();
      
      if (existingLike) {
        // Unlike the post
        await supabase
          .from('blog_likes')
          .delete()
          .eq('blog_id', blogId)
          .eq('user_id', user.id);
          
        // Update local state
        setPosts(prevPosts => 
          prevPosts.map(post => 
            post.id === blogId 
              ? { ...post, likes_count: (post.likes_count || 1) - 1, user_has_liked: false } 
              : post
          )
        );
      } else {
        // Like the post
        await supabase
          .from('blog_likes')
          .insert({
            blog_id: blogId,
            user_id: user.id
          });
          
        // Update local state
        setPosts(prevPosts => 
          prevPosts.map(post => 
            post.id === blogId 
              ? { ...post, likes_count: (post.likes_count || 0) + 1, user_has_liked: true } 
              : post
          )
        );
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      toast({
        title: "Error",
        description: "Failed to update like status. Please try again.",
        variant: "destructive",
      });
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
        <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
          <h2 className="text-2xl font-bold">Latest Posts</h2>
          {isAuthenticated && (
            <Button onClick={() => navigate("/blog/new")} className="flex items-center gap-2 ml-auto">
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
                      <div className="flex items-center text-sm text-muted-foreground gap-4">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {format(new Date(post.created_at), "MMM d, yyyy")}
                        </div>
                        {post.updated_at && post.updated_at !== post.created_at && (
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            Updated: {format(new Date(post.updated_at), "MMM d, yyyy")}
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="line-clamp-3 text-muted-foreground mb-4">
                        {post.content}
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-4">
                          <div 
                            onClick={(e) => handleLikeClick(post.id, e)}
                            className="flex items-center gap-1 cursor-pointer"
                          >
                            <Heart 
                              className={`h-4 w-4 ${post.user_has_liked ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} 
                            />
                            <span className="text-xs text-muted-foreground">
                              {post.likes_count || 0}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              {post.views_count || 0}
                            </span>
                          </div>
                          <div onClick={(e) => e.preventDefault()}>
                            <BlogRating 
                              id={post.id} 
                              initialRating={post.rating || 0}
                              initialCount={post.ratings_count || 0}
                            />
                          </div>
                        </div>
                        <div onClick={(e) => e.preventDefault()}>
                          <BlogAdminActions
                            blogId={post.id}
                            isPublished={post.published}
                            onPublishChange={fetchPosts}
                          />
                        </div>
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
