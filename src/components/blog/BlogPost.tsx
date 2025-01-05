import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { BlogRating } from "./BlogRating";
import { BlogAdminActions } from "./BlogAdminActions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function BlogPost() {
  const { id } = useParams();
  const { toast } = useToast();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    getBlog();
    checkAdminStatus();
  }, [id]);

  async function getBlog() {
    try {
      setLoading(true);
      console.log("BlogPost - Fetching blog:", id);

      const { data: blogData, error: blogError } = await supabase
        .from("blogs")
        .select(`
          *,
          profiles:author_id (
            full_name
          )
        `)
        .eq("id", id)
        .single();

      if (blogError) throw blogError;

      console.log("BlogPost - Blog data:", blogData);
      setBlog(blogData);
    } catch (error: any) {
      console.error("Error fetching blog:", error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  async function checkAdminStatus() {
    try {
      console.log("BlogPost - Checking admin status");
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (error) throw error;

      console.log("BlogPost - User role:", profile?.role);
      setIsAdmin(profile?.role === "admin");
    } catch (error: any) {
      console.error("Error checking admin status:", error);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold">Blog post not found</h2>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-3xl font-bold mb-2">{blog.title}</CardTitle>
            <p className="text-sm text-muted-foreground">
              By {blog.profiles?.full_name || "Unknown Author"}
            </p>
          </div>
          {isAdmin && (
            <BlogAdminActions
              blogId={blog.id}
              isPublished={blog.published}
              onStatusChange={getBlog}
            />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="prose max-w-none">
          {blog.content.split("\n").map((paragraph: string, index: number) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-8">
          <BlogRating blogId={blog.id} />
        </div>
      </CardContent>
    </Card>
  );
}