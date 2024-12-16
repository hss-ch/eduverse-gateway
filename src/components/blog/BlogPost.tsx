import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { CalendarDays, User } from "lucide-react";

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
      <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-secondary h-full">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarFallback>{authorInitials}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm font-medium">{authorName}</p>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <CalendarDays className="h-4 w-4" />
                  <p className="text-xs">
                    {formatDistanceToNow(new Date(created_at), { addSuffix: true })}
                  </p>
                </div>
              </div>
            </div>
            <Badge variant="secondary">Blog</Badge>
          </div>
          <CardTitle className="text-2xl font-bold hover:text-primary transition-colors line-clamp-2">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground line-clamp-3 text-base leading-relaxed">
            {content}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}