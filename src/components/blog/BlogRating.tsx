import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { RatingStars } from "./rating/RatingStars";
import { RatingCount } from "./rating/RatingCount";

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
          .maybeSingle();

        if (error) throw error;
        if (data) setUserRating(data.rating);
      } catch (error) {
        console.error('Error fetching user rating:', error);
      }
    };

    fetchUserRating();
  }, [id, session?.user?.id]);

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
      
      const { error: upsertError } = await supabase
        .from('blog_ratings')
        .upsert({
          blog_id: id,
          user_id: session.user.id,
          rating
        }, {
          onConflict: 'blog_id,user_id'
        });

      if (upsertError) throw upsertError;

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
      <RatingStars
        rating={currentRating}
        userRating={userRating}
        isSubmitting={isSubmitting}
        onRate={handleRating}
      />
      <RatingCount count={currentCount} />
    </div>
  );
}