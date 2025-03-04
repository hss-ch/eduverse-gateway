
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
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

  useEffect(() => {
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

  return (
    <div className="min-h-screen bg-background">
      <MainNav />
      
      <BlogPageHeader 
        title={post.title}
        imageSrc={post.image_url || "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8"}
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
        
        <div className="bg-card rounded-lg shadow-sm p-6 md:p-8">
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(post.created_at), "MMMM d, yyyy")}
                </p>
                <p className="text-sm text-muted-foreground">
                  By {post.profiles?.full_name || "Anonymous"}
                </p>
              </div>
              <BlogRating 
                id={post.id} 
                initialRating={post.rating || 0}
                initialCount={post.ratings_count || 0}
              />
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
