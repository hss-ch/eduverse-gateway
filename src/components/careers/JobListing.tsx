
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building, MapPin, Clock, Edit, Trash2 } from "lucide-react";

interface JobListingProps {
  id: string;
  title: string;
  location: string;
  department: string;
  type: string;
  description: string;
  onApply: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  isAdmin?: boolean;
}

export function JobListing({
  id,
  title,
  location,
  department,
  type,
  description,
  onApply,
  onEdit,
  onDelete,
  isAdmin = false,
}: JobListingProps) {
  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border">
      <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-2">
        <div>
          <h3 className="text-lg md:text-xl font-semibold mb-2">{title}</h3>
          <div className="flex flex-wrap gap-3 text-xs md:text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3 md:h-4 md:w-4" />
              {location}
            </div>
            <div className="flex items-center gap-1">
              <Building className="h-3 w-3 md:h-4 md:w-4" />
              {department}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3 md:h-4 md:w-4" />
              {type}
            </div>
          </div>
        </div>
        <Badge className="mt-1 sm:mt-0">{type}</Badge>
      </div>
      
      <p className="text-muted-foreground text-sm md:text-base mb-4 md:mb-6">{description}</p>
      
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
        <Button onClick={onApply} className="w-full sm:w-auto">Apply Now</Button>
        
        {isAdmin && (
          <div className="flex gap-2 w-full sm:w-auto justify-end mt-3 sm:mt-0">
            <Button
              variant="outline"
              size="icon"
              onClick={onEdit}
              className="h-9 w-9"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="destructive"
              size="icon"
              onClick={onDelete}
              className="h-9 w-9"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
