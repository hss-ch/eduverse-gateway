import { useNavigate } from "react-router-dom";
import { DeleteBlogDialog } from "./admin/DeleteBlogDialog";
import { PublishButton } from "./admin/PublishButton";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface BlogAdminActionsProps {
  blogId: string;
  isPublished: boolean;
  onStatusChange?: () => void;
}

export function BlogAdminActions({ blogId, isPublished, onStatusChange }: BlogAdminActionsProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setLoading(false);
          return;
        }

        const { data: profile, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        if (error) throw error;

        setIsAdmin(profile?.role === 'admin');
      } catch (error) {
        console.error('Error checking admin status:', error);
        toast({
          title: "Error",
          description: "Failed to verify admin status",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, [toast]);

  if (loading) {
    return <div className="animate-pulse flex gap-2">
      <div className="h-9 w-16 bg-muted rounded"></div>
      <div className="h-9 w-20 bg-muted rounded"></div>
      <div className="h-9 w-16 bg-muted rounded"></div>
    </div>;
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => navigate(`/blog/edit/${blogId}`)}
      >
        Edit
      </Button>
      
      <PublishButton 
        blogId={blogId}
        isPublished={isPublished}
        onStatusChange={onStatusChange}
      />

      <DeleteBlogDialog blogId={blogId} />
    </div>
  );
}