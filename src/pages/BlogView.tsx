import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

interface Profile {
  full_name: string | null;
}

interface BlogPost {
  id: string;
  title: string;
  content: string;
  created_at: string;
  author_id: string;
  image_url?: string | null;
  published: boolean;
  rating: number;
  ratings_count: number;
  profiles: Profile | null;
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
        // Validate that id is a valid UUID format
        if (!id || id === 'new' || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
          console.error('Invalid blog post ID:', id);
          toast({
            title: "Error",
            description: "Invalid blog post ID",
            variant: "destructive",
          });
          navigate('/blog');
          return;
        }

        console.log('Fetching post with ID:', id);
        const { data, error } = await supabase
          .from('blogs')
          .select(`
            *,
            profiles (
              full_name
            )
          `)
          .eq('id', id)
          .maybeSingle();

        if (error) {
          console.error('Error fetching post:', error);
          throw error;
        }
        
        if (!data) {
          console.log('No post found with ID:', id);
          toast({
            title: "Not Found",
            description: "The blog post you're looking for doesn't exist",
            variant: "destructive",
          });
          navigate('/blog');
          return;
        }

        console.log('Fetched post data:', data);
        setPost(data as BlogPost);
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
  }, [id, navigate, toast]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!post) {
    return null;
  }

  const authorName = post.profiles?.full_name || "Anonymous";
  const authorInitials = authorName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <Button
        variant="ghost"
        className="mb-8"
        onClick={() => navigate('/blog')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Blog
      </Button>
      
      <article className="prose prose-lg max-w-none dark:prose-invert">
        <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
        
        <div className="flex items-center space-x-4 mb-8 not-prose">
          <Avatar>
            <AvatarFallback>{authorInitials}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{authorName}</p>
            <p className="text-sm text-muted-foreground">
              {format(new Date(post.created_at), 'MMMM d, yyyy')}
            </p>
          </div>
        </div>

        {post.image_url && (
          <img 
            src={post.image_url} 
            alt={post.title}
            className="w-full h-auto rounded-lg mb-8"
          />
        )}

        <div className="whitespace-pre-wrap leading-relaxed">
          {post.content.split('\n').map((paragraph, index) => (
            paragraph ? <p key={index}>{paragraph}</p> : <br key={index} />
          ))}
        </div>
      </article>
    </div>
  );
}