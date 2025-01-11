interface RatingCountProps {
  count: number;
}

export function RatingCount({ count }: RatingCountProps) {
  return (
    <span className="text-sm text-muted-foreground ml-1">
      ({count})
    </span>
  );
}