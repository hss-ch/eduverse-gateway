import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface BlogPostProps {
  id: string;
  title: string;
  content: string;
  created_at: string;
  author?: {
    full_name: string | null;
  }[];
}

export function BlogPost({ id, title, content, created_at, author }: BlogPostProps) {
  const authorName = author?.[0]?.full_name || "Anonymous";
  const authorInitials = authorName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Link to={`/blog/${id}`}>
      <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-secondary">
        <CardHeader className="space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarFallback>{authorInitials}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{authorName}</p>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(created_at), { addSuffix: true })}
              </p>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold hover:text-primary transition-colors">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground line-clamp-3">{content}</p>
        </CardContent>
      </Card>
    </Link>
  );
}