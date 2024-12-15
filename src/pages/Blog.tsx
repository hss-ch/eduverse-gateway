import { useEffect, useState } from "react";
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { BlogPost } from "@/components/blog/BlogPost";
import { BlogManager } from "@/components/blog/BlogManager";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface Post {
  id: string;
  title: string;
  content: string;
  created_at: string;
  author?: {
    full_name: string | null;
  }[];
}

const Blog = () => {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select(`
          *,
          author:profiles(full_name)
        `)
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
  });

  return (
    <div className="min-h-screen bg-accent">
      <MainNav />
      
      <section className="pt-24 px-6">
        <div className="container max-w-4xl">
          <h1 className="text-4xl font-bold text-secondary mb-12">Blog</h1>
          
          {session && (
            <div className="mb-12">
              <BlogManager />
            </div>
          )}

          {isLoading ? (
            <div>Loading posts...</div>
          ) : (
            <div className="space-y-8">
              {posts.map((post: Post) => (
                <BlogPost
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  content={post.content}
                  created_at={post.created_at}
                  author={post.author}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;