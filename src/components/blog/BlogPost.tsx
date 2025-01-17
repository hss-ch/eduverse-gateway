import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { BlogRating } from "./BlogRating";
import { BlogAdminActions } from "./BlogAdminActions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      console.error("BlogPost - No ID provided");
      setLoading(false);
      navigate('/blog');
      toast({
        title: "Error",
        description: "Blog post not found",
        variant: "destructive",
      });
      return;
    }

    getBlog();
  }, [id, navigate, toast]);

  async function getBlog() {
    try {
      if (!id) {
        console.error("BlogPost - Attempted to fetch with undefined ID");
        return;
      }

      setLoading(true);
      console.log("BlogPost - Fetching blog:", id);

      const { data: { user } } = await supabase.auth.getUser();
      
      const { data: blogData, error: blogError } = await supabase
        .from("blogs")
        .select(`
          *,
          profiles:author_id (
            full_name,
            role
          )
        `)
        .eq("id", id)
        .maybeSingle();

      if (blogError) throw blogError;

      if (!blogData) {
        console.log("BlogPost - No blog found with ID:", id);
        toast({
          title: "Not Found",
          description: "Blog post not found",
          variant: "destructive",
        });
        navigate('/blog');
      } else {
        // Check if the blog is published or if the user is the author
        if (!blogData.published && (!user || user.id !== blogData.author_id)) {
          console.log("BlogPost - Unauthorized access to unpublished blog");
          toast({
            title: "Unauthorized",
            description: "You don't have permission to view this blog post",
            variant: "destructive",
          });
          navigate('/blog');
          return;
        }

        console.log("BlogPost - Blog data:", blogData);
        setBlog(blogData);
      }
    } catch (error: any) {
      console.error("Error fetching blog:", error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      navigate('/blog');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold">Blog post not found</h2>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => navigate('/blog')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Blog
      </Button>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-3xl font-bold mb-2">{blog.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                By {blog.profiles?.full_name || "Unknown Author"}
              </p>
            </div>
            <BlogAdminActions
              blogId={blog.id}
              isPublished={blog.published}
              onPublishChange={getBlog}
            />
          </div>
        </CardHeader>
        <CardContent>
          {blog.image_url && (
            <img
              src={blog.image_url}
              alt={blog.title}
              className="w-full h-auto rounded-lg mb-6"
            />
          )}
          <div className="prose max-w-none">
            {blog.content.split("\n").map((paragraph: string, index: number) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-8">
            <BlogRating 
              id={blog.id} 
              initialRating={blog.rating || 0}
              initialCount={blog.ratings_count || 0}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}