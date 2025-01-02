import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building, MapPin, Clock } from "lucide-react";

interface JobListingProps {
  title: string;
  location: string;
  department: string;
  type: string;
  description: string;
  onApply: () => void;
}

export function JobListing({
  title,
  location,
  department,
  type,
  description,
  onApply,
}: JobListingProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {location}
            </div>
            <div className="flex items-center gap-1">
              <Building className="h-4 w-4" />
              {department}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {type}
            </div>
          </div>
        </div>
        <Badge>{type}</Badge>
      </div>
      
      <p className="text-muted-foreground mb-6">{description}</p>
      
      <Button onClick={onApply}>Apply Now</Button>
    </div>
  );
}