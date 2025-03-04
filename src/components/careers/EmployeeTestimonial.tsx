
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { QuoteIcon } from "lucide-react";

interface EmployeeTestimonialProps {
  name: string;
  position: string;
  years: string;
  testimonial: string;
  imageSrc: string;
}

export function EmployeeTestimonial({
  name,
  position,
  years,
  testimonial,
  imageSrc,
}: EmployeeTestimonialProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <Card className="overflow-hidden">
      <div className="relative h-32 bg-gradient-to-r from-primary/40 to-primary/20">
        <QuoteIcon className="absolute top-4 right-4 h-8 w-8 text-white opacity-20" />
      </div>
      <CardContent className="pt-0 relative">
        <div className="flex flex-col items-center">
          <Avatar className="h-20 w-20 border-4 border-background -mt-10">
            <AvatarImage src={imageSrc} alt={name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <h3 className="mt-3 font-semibold text-lg text-center">{name}</h3>
          <p className="text-muted-foreground text-sm text-center">{position}</p>
          <p className="text-muted-foreground text-xs text-center mb-4">{years}</p>
          <p className="text-muted-foreground text-sm italic">"{testimonial}"</p>
        </div>
      </CardContent>
    </Card>
  );
}
