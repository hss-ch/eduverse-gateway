import { useState } from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { CalendarDays, User, Star } from "lucide-react";
import { useSession } from "@supabase/auth-helpers-react";
import { useToast } from "../ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

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
}

export function BlogPost({ 
  id, 
  title, 
  content, 
  created_at, 
  author,
  image_url,
  rating = 0,
  ratings_count = 0
}: BlogPostProps) {
  const session = useSession();
  const { toast } = useToast();
  const [currentRating, setCurrentRating] = useState(rating);
  const [currentCount, setCurrentCount] = useState(ratings_count);
  const authorName = author?.[0]?.full_name || "Anonymous";
  const authorInitials = authorName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const handleRating = async (rating: number, e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation when rating
    
    if (!session) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to rate posts",
        variant: "destructive"
      });
      return;
    }

    try {
      console.log('Submitting rating:', { blog_id: id, user_id: session.user.id, rating });
      
      const { error } = await supabase
        .from('blog_ratings')
        .upsert({
          blog_id: id,
          user_id: session.user.id,
          rating
        });

      if (error) throw error;

      // Update the average rating in the blogs table
      const { data: newRating } = await supabase
        .from('blog_ratings')
        .select('rating')
        .eq('blog_id', id);

      const averageRating = newRating?.reduce((acc, curr) => acc + curr.rating, 0) / (newRating?.length || 1);

      await supabase
        .from('blogs')
        .update({ 
          rating: averageRating,
          ratings_count: newRating?.length || 0
        })
        .eq('id', id);

      setCurrentRating(averageRating);
      setCurrentCount(newRating?.length || 0);

      toast({
        title: "Success",
        description: "Rating submitted successfully"
      });
    } catch (error: any) {
      console.error('Error rating post:', error);
      toast({
        title: "Error",
        description: "Failed to submit rating",
        variant: "destructive"
      });
    }
  };

  return (
    <Link to={`/blog/${id}`}>
      <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-secondary h-full overflow-hidden">
        {image_url && (
          <div className="relative w-full h-48">
            <img 
              src={image_url} 
              alt={title}
              className="w-full h-full object-cover"
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
        )}
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
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={(e) => handleRating(star, e)}
                  className="text-yellow-400 hover:text-yellow-500 transition-colors"
                >
                  <Star 
                    className={`h-4 w-4 ${star <= currentRating ? 'fill-current' : ''}`}
                  />
                </button>
              ))}
              <span className="text-sm text-muted-foreground ml-1">
                ({currentCount})
              </span>
            </div>
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