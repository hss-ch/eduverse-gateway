import { useState, useEffect } from "react";
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
  const { toast } = useToast();
  const [currentRating, setCurrentRating] = useState(initialRating);
  const [currentCount, setCurrentCount] = useState(initialCount);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (session?.user?.id) {
      const fetchUserRating = async () => {
        console.log("Fetching user rating for blog:", id);
        const { data, error } = await supabase
          .from('blog_ratings')
          .select('rating')
          .eq('blog_id', id)
          .eq('user_id', session.user.id)
          .maybeSingle();

        if (error) {
          console.error('Error fetching user rating:', error);
          return;
        }

        if (data) {
          console.log("Found user rating:", data.rating);
          setUserRating(data.rating);
        }
      };

      fetchUserRating();
    }
  }, [id, session]);

  const handleRate = async (rating: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!session?.user?.id) {
      console.log('User not authenticated');
      toast({
        title: "Authentication Required",
        description: "Please sign in to rate posts",
        variant: "destructive"
      });
      return;
    }

    if (isSubmitting) return;

    setIsSubmitting(true);
    console.log("Submitting rating:", rating, "for blog:", id);

    try {
      // First, insert or update the user's rating
      const { error: ratingError } = await supabase
        .from('blog_ratings')
        .upsert({
          blog_id: id,
          user_id: session.user.id,
          rating: rating
        }, {
          onConflict: 'blog_id,user_id'
        });

      if (ratingError) throw ratingError;

      // Then fetch the updated blog data
      const { data: updatedBlog, error: blogError } = await supabase
        .from('blogs')
        .select('rating, ratings_count')
        .eq('id', id)
        .maybeSingle();

      if (blogError) throw blogError;

      if (updatedBlog) {
        console.log("Updated blog rating data:", updatedBlog);
        setCurrentRating(updatedBlog.rating);
        setCurrentCount(updatedBlog.ratings_count);
        setUserRating(rating);
      }

      toast({
        title: "Success",
        description: "Rating updated successfully"
      });

    } catch (error: any) {
      console.error('Error updating rating:', error);
      toast({
        title: "Error",
        description: "Failed to update rating",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
      <RatingStars
        rating={currentRating}
        userRating={userRating}
        isSubmitting={isSubmitting}
        onRate={handleRate}
      />
      <RatingCount count={currentCount} />
    </div>
  );
}