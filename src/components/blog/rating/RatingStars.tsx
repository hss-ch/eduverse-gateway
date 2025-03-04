
import { Star } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";

interface RatingStarsProps {
  rating: number;
  onRate: (rating: number, e: React.MouseEvent) => void;
  isSubmitting?: boolean;
  isInteractive?: boolean;
  isAuthenticated?: boolean;
}

export function RatingStars({ 
  rating, 
  onRate, 
  isSubmitting, 
  isInteractive = true,
  isAuthenticated = false
}: RatingStarsProps) {
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  const handleStarClick = (starValue: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated && isInteractive) {
      setShowAuthDialog(true);
      return;
    }
    
    onRate(starValue, e);
  };

  return (
    <>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={(e) => handleStarClick(star, e)}
          className={`text-yellow-400 hover:text-yellow-500 transition-colors ${
            !isInteractive || isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          }`}
          disabled={!isInteractive || isSubmitting}
        >
          <Star 
            className={`h-4 w-4 ${
              star <= rating ? 'fill-current' : ''
            }`}
          />
        </button>
      ))}

      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Sign in required</DialogTitle>
            <DialogDescription>
              You need to sign in to rate blog posts.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center gap-4 pt-4">
            <Button asChild variant="secondary" onClick={() => setShowAuthDialog(false)}>
              <span>Cancel</span>
            </Button>
            <Button asChild>
              <Link to="/auth">Sign in</Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
