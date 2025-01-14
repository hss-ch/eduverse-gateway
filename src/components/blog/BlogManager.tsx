import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { useQuery } from "@tanstack/react-query";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  published: boolean;
  created_at: string;
  author_id: string;
}

export function BlogManager() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [session, setSession] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user?.id) {
        checkAdminStatus(session.user.id);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("BlogManager - Auth state changed:", session);
      setSession(session);
      if (session?.user?.id) {
        checkAdminStatus(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminStatus = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error checking admin status:', error);
      return;
    }

    setIsAdmin(data?.role === 'admin');
  };

  const { data: posts = [], isLoading, refetch } = useQuery({
    queryKey: ['blog-posts', session?.user?.id, isAdmin],
    queryFn: async () => {
      if (!session?.user?.id) return [];
      
      let query = supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });

      // If user is not admin, only show their posts
      if (!isAdmin) {
        query = query.eq('author_id', session.user.id);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching posts:', error);
        toast({
          title: "Error",
          description: "Failed to fetch blog posts",
          variant: "destructive",
        });
        return [];
      }

      return data || [];
    },
    enabled: !!session?.user?.id,
    refetchOnMount: true,
    refetchOnWindowFocus: true
  });

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

      refetch();
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

      refetch();
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
        <p className="text-muted-foreground">Please sign in to manage posts</p>
        <Button 
          className="mt-4"
          onClick={() => navigate('/auth')}
        >
          Sign In
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return <div className="text-center p-4">Loading your posts...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          {isAdmin ? "All Blog Posts" : "Your Posts"}
        </h2>
      </div>

      {posts.length === 0 ? (
        <p className="text-center text-muted-foreground">No posts found.</p>
      ) : (
        posts.map((post: BlogPost) => (
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