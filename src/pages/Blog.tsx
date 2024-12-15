import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BlogPost } from "@/components/blog/BlogPost";

export default function Blog() {
  const { data: blogs, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select(`
          id,
          title,
          content,
          created_at,
          author_id,
          profiles!blogs_author_id_fkey (
            full_name
          )
        `)
        .eq("published", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid gap-6">
      {blogs?.map((blog) => (
        <BlogPost
          key={blog.id}
          id={blog.id}
          title={blog.title}
          content={blog.content}
          created_at={blog.created_at}
          author={blog.profiles}
        />
      ))}
    </div>
  );
}