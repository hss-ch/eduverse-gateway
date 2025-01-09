import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { DeleteBlogDialog } from "./admin/DeleteBlogDialog";
import { PublishButton } from "./admin/PublishButton";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface BlogAdminActionsProps {
  blogId: string;
  isPublished: boolean;
  onStatusChange?: () => void;
}

export function BlogAdminActions({ blogId, isPublished, onStatusChange }: BlogAdminActionsProps) {
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);

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
        isUpdating={isUpdating}
        setIsUpdating={setIsUpdating}
      />

      <DeleteBlogDialog blogId={blogId} />
    </div>
  );
}