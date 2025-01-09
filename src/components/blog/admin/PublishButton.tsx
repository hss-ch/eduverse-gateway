import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

interface PublishButtonProps {
  blogId: string;
  isPublished: boolean;
  onStatusChange?: () => void;
  isUpdating: boolean;
  setIsUpdating: (value: boolean) => void;
}

export function PublishButton({ 
  blogId, 
  isPublished, 
  onStatusChange,
  isUpdating,
  setIsUpdating 
}: PublishButtonProps) {
  const { toast } = useToast();

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
    <Button
      variant={isPublished ? "destructive" : "default"}
      size="sm"
      onClick={togglePublishStatus}
      disabled={isUpdating}
    >
      {isUpdating ? "Updating..." : isPublished ? "Unpublish" : "Publish"}
    </Button>
  );
}