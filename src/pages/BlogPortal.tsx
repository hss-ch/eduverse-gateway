
import { motion } from "framer-motion";
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { BlogPageHeader } from "@/components/blog/BlogPageHeader";
import { Plus, Eye, Heart, Calendar } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { format } from "date-fns";

const BlogPortal = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<any>(null);
  const [userPosts, setUserPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        fetchUserPosts(session.user.id);
      } else {
        setLoading(false);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        fetchUserPosts(session.user.id);
      } else {
        setUserPosts([]);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserPosts = async (userId: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("author_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching user posts:", error);
        return;
      }

      setUserPosts(data || []);
    } catch (error) {
      console.error("Error fetching user posts:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <MainNav />
      
      <BlogPageHeader 
        title="Blog Portal" 
        description={session ? "Manage your blog posts" : "Sign in to manage your blog posts"}
        imageSrc="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
      />
      
      <section className="py-12 px-6">
        <div className="container">
          {session ? (
            <div className="grid gap-8 mb-16">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Your Blog Posts</h2>
                  <Button onClick={() => navigate("/blog/new")} className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    <span>Create New Post</span>
                  </Button>
                </div>
                
                {loading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : userPosts.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">You haven't created any blog posts yet.</p>
                    <Button onClick={() => navigate("/blog/new")}>Create Your First Post</Button>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {userPosts.map(post => (
                      <Card key={post.id} className="overflow-hidden">
                        <div className="grid md:grid-cols-12 gap-4">
                          {post.image_url && (
                            <div className="md:col-span-3">
                              <div className="w-full h-full min-h-[120px] relative">
                                <img 
                                  src={post.image_url} 
                                  alt={post.title}
                                  className="absolute inset-0 w-full h-full object-cover" 
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = "/placeholder.svg";
                                  }}
                                />
                              </div>
                            </div>
                          )}
                          <div className={post.image_url ? "md:col-span-9 p-4" : "md:col-span-12 p-4"}>
                            <CardHeader className="p-0 pb-2">
                              <h3 className="text-lg font-semibold">{post.title}</h3>
                              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <div className="flex items-center">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  {format(new Date(post.created_at), "MMM d, yyyy")}
                                </div>
                                <div className="flex items-center">
                                  <Eye className="h-3 w-3 mr-1" />
                                  {post.views_count || 0}
                                </div>
                                <div className="flex items-center">
                                  <Heart className="h-3 w-3 mr-1" />
                                  {post.likes_count || 0}
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className="p-0 py-2">
                              <p className="line-clamp-2 text-muted-foreground text-sm">
                                {post.content}
                              </p>
                              <div className="flex gap-2 mt-4">
                                <Button
                                  size="sm"
                                  onClick={() => navigate(`/blog/${post.id}`)}
                                >
                                  View
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => navigate(`/blog/edit/${post.id}`)}
                                >
                                  Edit
                                </Button>
                                <div className="ml-auto">
                                  <Button
                                    size="sm"
                                    variant={post.published ? "secondary" : "default"}
                                  >
                                    {post.published ? "Published" : "Draft"}
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center">
              <Button onClick={() => navigate("/auth")}>
                Sign In to Continue
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default BlogPortal;
