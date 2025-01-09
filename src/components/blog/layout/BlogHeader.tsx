import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface BlogHeaderProps {
  session: any;
  isMainPage: boolean;
}

export function BlogHeader({ session, isMainPage }: BlogHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-4xl font-bold text-secondary mb-2">Blog</h1>
        <p className="text-muted-foreground">
          Discover insights and stories from our community
        </p>
      </div>
      {session && isMainPage && (
        <Link to="/blog/new">
          <Button className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            Create Post
          </Button>
        </Link>
      )}
    </div>
  );
}