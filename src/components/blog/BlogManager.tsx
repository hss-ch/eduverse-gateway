import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { useSession } from "@supabase/auth-helpers-react";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  published: boolean;
  created_at: string;
}

export function BlogManager() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const session = useSession();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) {
      fetchPosts();
    }
  }, [session]);

  const fetchPosts = async () => {
    if (!session) return;
    
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('author_id', session.user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast({
        title: "Error",
        description: "Failed to fetch blog posts",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const togglePublish = async (post: BlogPost) => {
    try {
      const { error } = await supabase
        .from('blogs')
        .update({ published: !post.published })
        .eq('id', post.id)
        .eq('author_id', session?.user.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Post ${post.published ? 'unpublished' : 'published'} successfully`,
      });

      fetchPosts();
    } catch (error) {
      console.error('Error toggling post publish status:', error);
      toast({
        title: "Error",
        description: "Failed to update post status",
        variant: "destructive",
      });
    }
  };

  const deletePost = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', id)
        .eq('author_id', session?.user.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Post deleted successfully",
      });

      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
      toast({
        title: "Error",
        description: "Failed to delete post",
        variant: "destructive",
      });
    }
  };

  if (!session) {
    return (
      <div className="text-center p-4">
        <p className="text-muted-foreground">Please sign in to manage your posts</p>
        <Button 
          className="mt-4"
          onClick={() => navigate('/auth')}
        >
          Sign In
        </Button>
      </div>
    );
  }

  if (loading) {
    return <div className="text-center p-4">Loading your posts...</div>;
  }

  return (
    <div className="space-y-4">
      {posts.length === 0 ? (
        <p className="text-center text-muted-foreground">You haven't created any posts yet.</p>
      ) : (
        posts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <CardTitle className="text-lg">{post.title}</CardTitle>
              <CardDescription>
                Created {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground line-clamp-2">{post.content}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => togglePublish(post)}
                >
                  {post.published ? 'Unpublish' : 'Publish'}
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => deletePost(post.id)}
                >
                  Delete
                </Button>
              </div>
              <Button
                variant="secondary"
                onClick={() => navigate(`/blog/edit/${post.id}`)}
              >
                Edit
              </Button>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  );
}