import { useState } from "react";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface BlogRatingProps {
  id: string;
  initialRating: number;
  initialCount: number;
  session: any;
}

export function BlogRating({ id, initialRating, initialCount, session }: BlogRatingProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentRating, setCurrentRating] = useState(initialRating);
  const [currentCount, setCurrentCount] = useState(initialCount);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userRating, setUserRating] = useState<number | null>(null);

  const handleRating = async (rating: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!session) {
      console.log('User not authenticated, redirecting to auth page');
      toast({
        title: "Authentication Required",
        description: "Please sign in to rate posts",
        variant: "destructive"
      });
      navigate("/auth");
      return;
    }

    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
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
      setUserRating(rating);

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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="flex items-center space-x-1" 
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={(e) => handleRating(star, e)}
          className={`text-yellow-400 hover:text-yellow-500 transition-colors ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={isSubmitting}
        >
          <Star 
            className={`h-4 w-4 ${
              star <= (userRating || currentRating) ? 'fill-current' : ''
            }`}
          />
        </button>
      ))}
      <span className="text-sm text-muted-foreground ml-1">
        ({currentCount})
      </span>
    </div>
  );
}