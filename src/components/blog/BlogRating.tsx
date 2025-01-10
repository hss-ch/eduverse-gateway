import { useState, useEffect } from "react";
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

  useEffect(() => {
    const fetchUserRating = async () => {
      if (!session?.user?.id) return;
      
      try {
        const { data, error } = await supabase
          .from('blog_ratings')
          .select('rating')
          .eq('blog_id', id)
          .eq('user_id', session.user.id)
          .single();

        if (error) throw error;
        if (data) setUserRating(data.rating);
      } catch (error) {
        console.error('Error fetching user rating:', error);
      }
    };

    fetchUserRating();
  }, [id, session?.user?.id]);

  const handleRating = async (rating: number, e: React.MouseEvent) => {
    // Prevent any navigation and event bubbling
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
      
      // Store old values for rollback if needed
      const oldRating = currentRating;
      const oldCount = currentCount;
      
      // Optimistically update UI
      setUserRating(rating);
      
      const { error } = await supabase
        .from('blog_ratings')
        .upsert({
          blog_id: id,
          user_id: session.user.id,
          rating
        }, {
          onConflict: 'user_id, blog_id'
        });

      if (error) throw error;

      // Fetch updated ratings
      const { data: newRatings, error: fetchError } = await supabase
        .from('blog_ratings')
        .select('rating')
        .eq('blog_id', id);

      if (fetchError) throw fetchError;

      const averageRating = newRatings.reduce((acc, curr) => acc + curr.rating, 0) / newRatings.length;

      const { error: updateError } = await supabase
        .from('blogs')
        .update({ 
          rating: averageRating,
          ratings_count: newRatings.length
        })
        .eq('id', id);

      if (updateError) throw updateError;

      setCurrentRating(averageRating);
      setCurrentCount(newRatings.length);

      toast({
        title: "Success",
        description: "Rating submitted successfully"
      });
    } catch (error: any) {
      console.error('Error rating post:', error);
      // Revert optimistic updates
      setUserRating(null);
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