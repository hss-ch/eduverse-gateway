import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface BlogAdminActionsProps {
  blogId: string;
  isPublished: boolean;
  onStatusChange?: () => void;
}

export function BlogAdminActions({ blogId, isPublished, onStatusChange }: BlogAdminActionsProps) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      console.log("BlogAdminActions - Deleting blog:", blogId);

      const { error } = await supabase
        .from("blogs")
        .delete()
        .eq("id", blogId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Blog post deleted successfully",
      });
      
      navigate("/blog");
    } catch (error: any) {
      console.error("Error deleting blog:", error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const togglePublishStatus = async () => {
    try {
      setIsUpdating(true);
      console.log("BlogAdminActions - Toggling publish status for blog:", blogId);

      const { error } = await supabase
        .from("blogs")
        .update({ published: !isPublished })
        .eq("id", blogId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Blog post ${isPublished ? "unpublished" : "published"} successfully`,
      });

      if (onStatusChange) {
        onStatusChange();
      }
    } catch (error: any) {
      console.error("Error updating blog status:", error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => navigate(`/blog/edit/${blogId}`)}
      >
        Edit
      </Button>
      
      <Button
        variant={isPublished ? "destructive" : "default"}
        size="sm"
        onClick={togglePublishStatus}
        disabled={isUpdating}
      >
        {isUpdating ? "Updating..." : isPublished ? "Unpublish" : "Publish"}
      </Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" size="sm">
            Delete
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the blog
              post and remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}