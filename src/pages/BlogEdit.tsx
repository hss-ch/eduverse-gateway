
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function BlogEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminAndFetchPost = async () => {
      try {
        setLoading(true);
        console.log('BlogEdit - Checking admin status and fetching post', id);
        
        // Check if user is authenticated and admin
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          console.log("BlogEdit - No user found");
          toast({
            title: "Error",
            description: "You must be logged in to edit posts",
            variant: "destructive",
          });
          navigate('/auth');
          return;
        }

        // Get user's profile with role
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        if (profileError) {
          console.error("BlogEdit - Error fetching profile:", profileError);
          throw profileError;
        }

        const userIsAdmin = profile?.role === 'admin';
        setIsAdmin(userIsAdmin);
        
        if (!userIsAdmin) {
          console.log("BlogEdit - User is not an admin");
          toast({
            title: "Unauthorized",
            description: "You don't have permission to edit blog posts",
            variant: "destructive",
          });
          navigate('/blog');
          return;
        }

        // Fetch the blog post
        console.log('BlogEdit - Fetching blog post:', id);
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          console.error('BlogEdit - Error fetching post:', error);
          throw error;
        }
        
        if (!data) {
          console.log('BlogEdit - No post found with ID:', id);
          toast({
            title: "Not Found",
            description: "The blog post you're trying to edit doesn't exist",
            variant: "destructive",
          });
          navigate('/blog');
          return;
        }

        console.log('BlogEdit - Blog post data loaded:', data);
        setTitle(data.title);
        setContent(data.content);
        setCurrentImageUrl(data.image_url);
      } catch (error: any) {
        console.error('BlogEdit - Error:', error);
        toast({
          title: "Error",
          description: error.message || "Failed to fetch blog post",
          variant: "destructive",
        });
        navigate('/blog');
      } finally {
        setLoading(false);
      }
    };

    checkAdminAndFetchPost();
  }, [id, toast, navigate]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    try {
      let imageUrl = currentImageUrl;

      if (image) {
        // Upload new image if selected
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

      const { error } = await supabase
        .from('blogs')
        .update({ 
          title, 
          content,
          image_url: imageUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;

      console.log('BlogEdit - Blog post updated successfully');
      toast({
        title: "Success",
        description: "Blog post updated successfully",
      });
      navigate('/blog');
    } catch (error: any) {
      console.error('BlogEdit - Error updating post:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update blog post",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
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
        
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
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
          <CardTitle>Edit Blog Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Title
              </label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="image" className="text-sm font-medium">
                Cover Image
              </label>
              <div className="flex items-center gap-4">
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {currentImageUrl && (
                  <img
                    src={currentImageUrl}
                    alt="Current cover"
                    className="h-20 w-20 object-cover rounded-md"
                  />
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="content" className="text-sm font-medium">
                Content
              </label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                className="min-h-[400px]"
              />
            </div>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/blog')}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Updating..." : "Update Post"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
