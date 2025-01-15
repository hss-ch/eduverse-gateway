import { Star } from "lucide-react";

interface RatingStarsProps {
  rating: number;
  userRating: number | null;
  isSubmitting: boolean;
  onRate: (rating: number, e: React.MouseEvent) => void;
}

export function RatingStars({ rating, userRating, isSubmitting, onRate }: RatingStarsProps) {
  return (
    <>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onRate(star, e);
          }}
          className={`text-yellow-400 hover:text-yellow-500 transition-colors ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={isSubmitting}
        >
          <Star 
            className={`h-4 w-4 ${
              star <= (userRating || rating) ? 'fill-current' : ''
            }`}
          />
        </button>
      ))}
    </>
  );
}