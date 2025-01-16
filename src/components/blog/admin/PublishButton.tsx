import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

interface PublishButtonProps {
  blogId: string;
  isPublished?: boolean;
  onPublishChange?: (isPublished: boolean) => void;
}

export function PublishButton({ 
  blogId, 
  isPublished = false, 
  onPublishChange 
}: PublishButtonProps) {
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = useState(false);

  const togglePublishStatus = async () => {
    try {
      setIsUpdating(true);
      console.log("PublishButton - Toggling publish status for blog:", blogId);

      const { error } = await supabase
        .from("blogs")
        .update({ published: !isPublished })
        .eq("id", blogId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Blog post ${isPublished ? "unpublished" : "published"} successfully`,
      });

      if (onPublishChange) {
        onPublishChange(!isPublished);
      }
    } catch (error: any) {
      console.error("PublishButton - Error updating blog status:", error);
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
      onClick={togglePublishStatus}
      disabled={isUpdating}
    >
      {isUpdating ? "Updating..." : isPublished ? "Unpublish" : "Publish"}
    </Button>
  );
}