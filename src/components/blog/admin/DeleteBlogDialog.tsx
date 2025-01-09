import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

interface DeleteBlogDialogProps {
  blogId: string;
}

export function DeleteBlogDialog({ blogId }: DeleteBlogDialogProps) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

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

  return (
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
  );
}