import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  created_at: string;
  author_id: string;
  author: {
    full_name: string | null;
  }[];
}

export default function BlogView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select(`
            *,
            author:profiles(full_name)
          `)
          .eq('id', id)
          .single();

        if (error) throw error;
        setPost(data);
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

    fetchPost();
  }, [id, toast]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
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
      
      <article className="prose prose-lg max-w-none">
        <h1>{post.title}</h1>
        <div className="text-sm text-gray-500 mb-6">
          {post.author?.[0]?.full_name && `By ${post.author[0].full_name}`}
        </div>
        <div className="whitespace-pre-wrap">{post.content}</div>
      </article>
    </div>
  );
}