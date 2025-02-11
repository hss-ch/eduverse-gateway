
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
      
      <div className="flex justify-between items-center">
        <Button onClick={onApply}>Apply Now</Button>
        
        {isAdmin && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={onEdit}
              className="h-10 w-10"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="destructive"
              size="icon"
              onClick={onDelete}
              className="h-10 w-10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
