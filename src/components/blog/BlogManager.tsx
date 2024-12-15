import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";

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
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
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
        .eq('id', post.id);

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
        .eq('id', id);

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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Blog Posts</h2>
        <Button onClick={() => navigate('/blog/new')}>
          Create New Post
        </Button>
      </div>

      <div className="grid gap-6">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>
                Created {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-secondary/70 line-clamp-3">{post.content}</p>
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
        ))}
      </div>
    </div>
  );
}