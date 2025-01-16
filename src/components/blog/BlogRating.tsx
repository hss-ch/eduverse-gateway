import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { RatingStars } from "./rating/RatingStars";
import { RatingCount } from "./rating/RatingCount";
import { Session } from "@supabase/supabase-js";

interface BlogRatingProps {
  id: string;
  initialRating?: number;
  initialCount?: number;
}

export function BlogRating({ id, initialRating = 0, initialCount = 0 }: BlogRatingProps) {
  const [session, setSession] = useState<Session | null>(null);
  const [currentRating, setCurrentRating] = useState(initialRating);
  const [currentCount, setCurrentCount] = useState(initialCount);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session?.user?.id) {
      const fetchUserRating = async () => {
        console.log("BlogRating - Fetching user rating for blog:", id);
        const { data, error } = await supabase
          .from('blog_ratings')
          .select('rating')
          .eq('blog_id', id)
          .eq('user_id', session.user.id)
          .maybeSingle();

        if (error) {
          console.error('BlogRating - Error fetching user rating:', error);
          return;
        }

        if (data) {
          console.log("BlogRating - Found user rating:", data.rating);
          setUserRating(data.rating);
        }
      };

      fetchUserRating();
    }
  }, [id, session?.user?.id]);

  const handleRating = async (rating: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!session?.user?.id) {
      console.log('BlogRating - User not authenticated');
      toast({
        title: "Authentication Required",
        description: "Please sign in to rate posts",
        variant: "destructive",
      });
      return;
    }

    if (isSubmitting) return;

    setIsSubmitting(true);
    console.log("BlogRating - Submitting rating:", rating, "for blog:", id);

    try {
      const { error: ratingError } = await supabase
        .from('blog_ratings')
        .upsert({
          blog_id: id,
          user_id: session.user.id,
          rating: rating
        }, {
          onConflict: 'blog_id,user_id'
        });

      if (ratingError) {
        console.error('BlogRating - Error upserting rating:', ratingError);
        throw ratingError;
      }

      // Fetch updated blog data
      const { data: updatedBlog, error: blogError } = await supabase
        .from('blogs')
        .select('rating, ratings_count')
        .eq('id', id)
        .maybeSingle();

      if (blogError) {
        console.error('BlogRating - Error fetching updated blog:', blogError);
        throw blogError;
      }

      if (updatedBlog) {
        console.log("BlogRating - Updated blog data:", updatedBlog);
        setCurrentRating(updatedBlog.rating);
        setCurrentCount(updatedBlog.ratings_count);
        setUserRating(rating);

        toast({
          title: "Success",
          description: "Rating updated successfully",
        });
      }
    } catch (error: any) {
      console.error('BlogRating - Error updating rating:', error);
      toast({
        title: "Error",
        description: "Failed to update rating",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <RatingStars
        rating={userRating ?? currentRating}
        onRate={handleRating}
        isSubmitting={isSubmitting}
        isInteractive={!!session}
      />
      <RatingCount count={currentCount} />
    </div>
  );
}