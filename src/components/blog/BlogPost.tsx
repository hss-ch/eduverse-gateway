import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { CalendarDays, User } from "lucide-react";
import { BlogRating } from "./BlogRating";

// Default placeholder images for blog posts with proper URL format
const DEFAULT_IMAGES = [
  "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
];

interface BlogPostProps {
  id: string;
  title: string;
  content: string;
  created_at: string;
  image_url?: string | null;
  rating?: number;
  ratings_count?: number;
  author?: {
    full_name: string | null;
  }[];
  session?: any;
}

export function BlogPost({ 
  id, 
  title, 
  content, 
  created_at, 
  author,
  image_url,
  rating = 0,
  ratings_count = 0,
  session
}: BlogPostProps) {
  const authorName = author?.[0]?.full_name || "Anonymous";
  const authorInitials = authorName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  // Get a random placeholder image if no image_url is provided
  const displayImage = image_url || DEFAULT_IMAGES[Math.floor(Math.random() * DEFAULT_IMAGES.length)];

  return (
    <Link to={`/blog/${id}`} className="block">
      <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-secondary h-full overflow-hidden">
        <div className="relative w-full h-48">
          <img 
            src={displayImage} 
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = DEFAULT_IMAGES[0];
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center space-x-2">
                <CalendarDays className="h-4 w-4" />
                <p className="text-sm">
                  {formatDistanceToNow(new Date(created_at), { addSuffix: true })}
                </p>
              </div>
              <Badge variant="secondary" className="bg-primary/80">Blog</Badge>
            </div>
          </div>
        </div>
        <CardHeader className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback>{authorInitials}</AvatarFallback>
              </Avatar>
              <div className="text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <User className="h-3 w-3" />
                  <span>{authorName}</span>
                </div>
              </div>
            </div>
            <BlogRating 
              id={id} 
              initialRating={rating} 
              initialCount={ratings_count}
              session={session}
            />
          </div>
          <CardTitle className="text-xl font-bold hover:text-primary transition-colors line-clamp-2">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground line-clamp-3 text-sm">
            {content}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}