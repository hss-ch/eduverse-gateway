import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";

export default function BlogEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const session = useSession();
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        
        if (data.author_id !== session?.user?.id) {
          toast({
            title: "Error",
            description: "You don't have permission to edit this post",
            variant: "destructive",
          });
          navigate('/blog');
          return;
        }

        setTitle(data.title);
        setContent(data.content);
      } catch (error: any) {
        console.error('Error fetching post:', error);
        toast({
          title: "Error",
          description: "Failed to fetch blog post",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchPost();
    }
  }, [id, session, toast, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('blogs')
        .update({ title, content })
        .eq('id', id)
        .eq('author_id', session.user.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Blog post updated successfully",
      });
      navigate('/blog');
    } catch (error: any) {
      console.error('Error updating post:', error);
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
    return <div>Loading...</div>;
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
    </div>
  );
}