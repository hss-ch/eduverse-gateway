import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { CalendarDays, User, Star } from "lucide-react";
import { useSession } from "@supabase/auth-helpers-react";
import { useToast } from "../ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

// Default placeholder images for blog posts
const DEFAULT_IMAGES = [
  "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
  "https://images.unsplash.com/photo-1518770660439-4636190af475",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
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
  const navigate = useNavigate();
  const [currentRating, setCurrentRating] = useState(rating);
  const [currentCount, setCurrentCount] = useState(ratings_count);
  const authorName = author?.[0]?.full_name || "Anonymous";
  const authorInitials = authorName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  // Get a random placeholder image if no image_url is provided
  const displayImage = image_url || DEFAULT_IMAGES[Math.floor(Math.random() * DEFAULT_IMAGES.length)];

  const handleRating = async (rating: number, e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation when rating
    e.stopPropagation(); // Stop event propagation
    
    if (!session?.user) {
      console.log('User not authenticated, redirecting to auth page');
      toast({
        title: "Authentication Required",
        description: "Please sign in to rate posts",
        variant: "destructive"
      });
      navigate("/auth");
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
        }, {
          onConflict: 'user_id, blog_id'
        });

      if (error) {
        console.error('Error submitting rating:', error);
        throw error;
      }

      // Update the average rating in the blogs table
      const { data: newRating } = await supabase
        .from('blog_ratings')
        .select('rating')
        .eq('blog_id', id);

      if (!newRating) {
        throw new Error('Failed to fetch updated ratings');
      }

      const averageRating = newRating.reduce((acc, curr) => acc + curr.rating, 0) / (newRating.length || 1);

      const { error: updateError } = await supabase
        .from('blogs')
        .update({ 
          rating: averageRating,
          ratings_count: newRating.length
        })
        .eq('id', id);

      if (updateError) throw updateError;

      setCurrentRating(averageRating);
      setCurrentCount(newRating.length);

      toast({
        title: "Success",
        description: "Rating submitted successfully"
      });
    } catch (error: any) {
      console.error('Error rating post:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to submit rating",
        variant: "destructive"
      });
    }
  };

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
              target.src = DEFAULT_IMAGES[0]; // Fallback to first placeholder image
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
            <div className="flex items-center space-x-1" onClick={(e) => e.preventDefault()}>
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