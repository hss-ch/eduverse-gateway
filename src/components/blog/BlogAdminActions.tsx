import { useNavigate } from "react-router-dom";
import { DeleteBlogDialog } from "./admin/DeleteBlogDialog";
import { PublishButton } from "./admin/PublishButton";
import { Button } from "@/components/ui/button";

interface BlogAdminActionsProps {
  blogId: string;
  isPublished: boolean;
  onStatusChange?: () => void;
}

export function BlogAdminActions({ blogId, isPublished, onStatusChange }: BlogAdminActionsProps) {
  const navigate = useNavigate();

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