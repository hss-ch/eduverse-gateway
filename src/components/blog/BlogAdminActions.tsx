
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { DeleteBlogDialog } from "./admin/DeleteBlogDialog";
import { PublishButton } from "./admin/PublishButton";
import { Loader2 } from "lucide-react";

interface BlogAdminActionsProps {
  blogId: string;
  isPublished?: boolean;
  onPublishChange?: () => void;
}

export function BlogAdminActions({ blogId, isPublished, onPublishChange }: BlogAdminActionsProps) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        console.log("BlogAdminActions - Checking admin status");
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          console.log("BlogAdminActions - No user found");
          setLoading(false);
          return;
        }

        // Get user's profile with role
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error("BlogAdminActions - Error fetching profile:", error);
          throw error;
        }

        console.log("BlogAdminActions - User role:", profile?.role, "Is admin:", profile?.role === 'admin');
        setIsAdmin(profile?.role === 'admin');
      } catch (error) {
        console.error('BlogAdminActions - Error checking admin status:', error);
        toast({
          title: "Error",
          description: "Failed to verify admin status",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, [toast]);

  if (loading) {
    return (
      <div className="flex justify-center p-4">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/blog/${blogId}/edit`);
  };

  return (
    <div className="flex gap-2 mt-4" onClick={(e) => e.stopPropagation()}>
      <Button
        variant="outline"
        onClick={handleEditClick}
      >
        Edit
      </Button>
      <PublishButton
        blogId={blogId}
        isPublished={isPublished}
        onPublishChange={onPublishChange}
      />
      <DeleteBlogDialog blogId={blogId} />
    </div>
  );
}
