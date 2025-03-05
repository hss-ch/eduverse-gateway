
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { ArrowLeft, Heart, Calendar, Clock, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlogRating } from "@/components/blog/BlogRating";
import { BlogAdminActions } from "@/components/blog/BlogAdminActions";
import { BlogPageHeader } from "@/components/blog/BlogPageHeader";

export default function BlogView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };
    
    checkAuth();
    
    if (id) {
      fetchPost(id);
    }
  }, [id]);

  async function fetchPost(postId: string) {
    try {
      console.log("Fetching blog post:", postId);
      setLoading(true);

      const { data, error } = await supabase
        .from("blogs")
        .select(`
          *,
          profiles (
            full_name,
            role
          )
        `)
        .eq("id", postId)
        .single();

      if (error) {
        console.error("Error fetching post:", error);
        toast({
          title: "Error",
          description: "Failed to fetch blog post. It may not exist or you may not have permission to view it.",
          variant: "destructive",
        });
        navigate("/blog");
        return;
      }

      console.log("Fetched post:", data);
      setPost(data);
      
      // Increment view count
      incrementViewCount(postId);
      
      // Check if user has liked this post
      checkUserLike(postId);
      
    } catch (error) {
      console.error("Unexpected error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
      navigate("/blog");
    } finally {
      setLoading(false);
    }
  }
  
  async function incrementViewCount(postId: string) {
    try {
      const { error } = await supabase.rpc('increment_blog_view', {
        blog_id: postId
      });
      
      if (error) {
        console.error("Error incrementing view count:", error);
      } else {
        // Update local state to show the incremented view
        setPost(prev => prev ? {...prev, views_count: (prev.views_count || 0) + 1} : prev);
      }
    } catch (error) {
      console.error("Error tracking view:", error);
    }
  }
  
  async function checkUserLike(postId: string) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      
      const { data } = await supabase
        .from('blog_likes')
        .select()
        .eq('blog_id', postId)
        .eq('user_id', user.id)
        .maybeSingle();
        
      setHasLiked(!!data);
    } catch (error) {
      console.error("Error checking like status:", error);
    }
  }
  
  async function handleLikeToggle() {
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
      if (!user || !post) return;
      
      if (hasLiked) {
        // Unlike the post
        const { error } = await supabase
          .from('blog_likes')
          .delete()
          .eq('blog_id', post.id)
          .eq('user_id', user.id);
          
        if (error) throw error;
        
        // Update local state
        setHasLiked(false);
        setPost({
          ...post,
          likes_count: Math.max((post.likes_count || 1) - 1, 0)
        });
      } else {
        // Like the post
        const { error } = await supabase
          .from('blog_likes')
          .insert({
            blog_id: post.id,
            user_id: user.id
          });
          
        if (error) throw error;
        
        // Update local state
        setHasLiked(true);
        setPost({
          ...post,
          likes_count: (post.likes_count || 0) + 1
        });
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      toast({
        title: "Error",
        description: "Failed to update like status. Please try again.",
        variant: "destructive",
      });
    }
  }

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

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <MainNav />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Blog Post Not Found</h2>
            <p className="text-muted-foreground mb-6">The blog post you're looking for doesn't exist or you don't have permission to view it.</p>
            <Button onClick={() => navigate("/blog")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Use the image_url if available, otherwise use a fallback image
  const headerImageUrl = post.image_url || "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8";

  return (
    <div className="min-h-screen bg-background">
      <MainNav />
      
      <BlogPageHeader 
        title={post.title}
        imageSrc={headerImageUrl}
      />
      
      <article className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/blog")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Button>
        
        <div className="bg-card rounded-lg shadow-sm p-4 sm:p-6 md:p-8">
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {format(new Date(post.created_at), "MMMM d, yyyy")}
                  </div>
                  {post.updated_at && post.updated_at !== post.created_at && (
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      Updated: {format(new Date(post.updated_at), "MMMM d, yyyy")}
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  By {post.profiles?.full_name || "Anonymous"}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {post.views_count || 0} views
                  </span>
                </div>
                <div 
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={handleLikeToggle}
                >
                  <Heart 
                    className={`h-4 w-4 ${hasLiked ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} 
                  />
                  <span className="text-sm text-muted-foreground">
                    {post.likes_count || 0} likes
                  </span>
                </div>
                <BlogRating 
                  id={post.id} 
                  initialRating={post.rating || 0}
                  initialCount={post.ratings_count || 0}
                />
              </div>
            </div>
          </div>
          
          <div className="prose max-w-none">
            <div className="whitespace-pre-wrap">{post.content}</div>
          </div>
          
          <div className="mt-8">
            <BlogAdminActions
              blogId={post.id}
              isPublished={post.published}
              onPublishChange={() => fetchPost(post.id)}
            />
          </div>
        </div>
      </article>
      
      <Footer />
    </div>
  );
}
