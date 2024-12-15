import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";

interface BlogPostProps {
  id: string;
  title: string;
  content: string;
  created_at: string;
  author?: {
    full_name: string;
  };
}

export function BlogPost({ id, title, content, created_at, author }: BlogPostProps) {
  return (
    <Link to={`/blog/${id}`}>
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>
            {author?.full_name && `By ${author.full_name} • `}
            {formatDistanceToNow(new Date(created_at), { addSuffix: true })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 line-clamp-3">{content}</p>
        </CardContent>
      </Card>
    </Link>
  );
}