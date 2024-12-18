import { useEffect, useState } from "react";
import { BlogPost } from "@/components/blog/BlogPost";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

interface Post {
  id: string;
  title: string;
  content: string;
  created_at: string;
  author_id: string;
}

interface Profile {
  id: string;
  full_name: string | null;
}

const Blog = () => {
  const [session, setSession] = useState<any>(null);
  const [authorProfiles, setAuthorProfiles] = useState<{ [key: string]: Profile }>({});

  useEffect(() => {
    let mounted = true;

    async function getInitialSession() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        console.log("Blog - Getting initial session:", session);
        if (mounted) {
          setSession(session);
        }
      } catch (error) {
        console.error("Error in getInitialSession:", error);
      }
    }

    getInitialSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Blog - Auth state changed:", _event, session);
      if (mounted) {
        setSession(session);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      console.log('Fetching posts...');
      const { data: postsData, error: postsError } = await supabase
        .from('blogs')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (postsError) throw postsError;

      // Fetch author profiles for all posts
      const authorIds = [...new Set(postsData.map(post => post.author_id))];
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, full_name')
        .in('id', authorIds);

      if (profilesError) throw profilesError;

      // Create a map of author profiles
      const profilesMap = (profilesData || []).reduce((acc, profile) => ({
        ...acc,
        [profile.id]: profile
      }), {});

      setAuthorProfiles(profilesMap);

      return postsData || [];
    },
  });

  return (
    <div className="space-y-8">
      {isLoading ? (
        // Loading skeletons
        Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[150px]" />
              </div>
            </div>
            <Skeleton className="h-8 w-[300px]" />
            <Skeleton className="h-24 w-full" />
          </div>
        ))
      ) : posts.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-2xl font-semibold text-muted-foreground">No blog posts yet</h3>
          <p className="text-muted-foreground mt-2">Check back later for new content!</p>
        </div>
      ) : (
        posts.map((post: Post) => (
          <BlogPost
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
            created_at={post.created_at}
            author={[authorProfiles[post.author_id]]}
          />
        ))
      )}
    </div>
  );
};

export default Blog;