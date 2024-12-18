import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { BlogManager } from "@/components/blog/BlogManager";

export default function BlogNew() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [session, setSession] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      toast({
        title: "Error",
        description: "You must be logged in to create a post",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    setIsSubmitting(true);
    try {
      let imageUrl = null;

      if (image) {
        const fileExt = image.name.split('.').pop();
        const filePath = `${crypto.randomUUID()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('blog-images')
          .upload(filePath, image);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('blog-images')
          .getPublicUrl(filePath);

        imageUrl = publicUrl;
      }

      const { error } = await supabase.from("blogs").insert({
        title,
        content,
        author_id: session.user.id,
        published: true,
        image_url: imageUrl,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Blog post created successfully",
      });
      navigate("/blog");
    } catch (error: any) {
      console.error("Error creating post:", error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter your blog title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="text-lg"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="image">Cover Image</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="cursor-pointer"
                  />
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-20 w-20 object-cover rounded-md"
                    />
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  placeholder="Write your blog content here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  className="min-h-[300px] text-base leading-relaxed"
                />
              </div>
              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/blog")}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Publish Post"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Manage Your Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <BlogManager />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}