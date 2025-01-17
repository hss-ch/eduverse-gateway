import { Star } from "lucide-react";

interface RatingStarsProps {
  rating: number;
  onRate: (rating: number, e: React.MouseEvent) => void;
  isSubmitting?: boolean;
  isInteractive?: boolean;
}

export function RatingStars({ rating, onRate, isSubmitting, isInteractive = true }: RatingStarsProps) {
  return (
    <>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={(e) => onRate(star, e)}
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
    </>
  );
}