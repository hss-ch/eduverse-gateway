
import { useParams, useNavigate } from "react-router-dom";
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CalendarIcon, MapPin, Edit, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

// Define an interface for our event items
interface EventItem {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  imageUrl: string;
}

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // State for delete confirmation dialog
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  // State for edit dialog
  const [showEditDialog, setShowEditDialog] = useState(false);
  
  // Mock admin status - in a real app, this would come from auth context
  const isAdmin = true; // For demonstration purposes, set to true
  
  // State to store the current event data for editing
  const [editFormData, setEditFormData] = useState<EventItem | null>(null);
  
  // Find the event item from our events data
  const eventItem = events.find(e => e.id === id);
  
  if (!eventItem) {
    return (
      <div className="min-h-screen bg-accent">
        <MainNav />
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Event not found</h1>
          <Button onClick={() => navigate("/news-and-events")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to News & Events
          </Button>
        </div>
        <Footer />
      </div>
    );
  }
  
  const handleEdit = () => {
    setEditFormData({...eventItem});
    setShowEditDialog(true);
  };
  
  const handleEditSave = () => {
    // In a real app, this would update the event item in the database
    if (editFormData) {
      // Find and update the event item in our mock data
      const index = events.findIndex(e => e.id === id);
      if (index !== -1) {
        events[index] = {...editFormData};
        
        toast({
          title: "Event Updated",
          description: "The event has been updated successfully.",
        });
        
        setShowEditDialog(false);
      }
    }
  };
  
  const handleDelete = () => {
    // Close the dialog
    setShowDeleteDialog(false);
    
    // In a real app, this would delete the item from the database
    // For demonstration, we're removing the item from our mock data
    const index = events.findIndex(e => e.id === id);
    if (index !== -1) {
      events.splice(index, 1);
    }
    
    toast({
      title: "Success",
      description: "Event has been deleted",
    });
    
    // Navigate back to the events list
    navigate("/news-and-events");
  };

  return (
    <div className="min-h-screen bg-accent">
      <MainNav />
      
      <div className="container py-16">
        <div className="flex justify-between items-center mb-8">
          <Button 
            variant="outline"
            onClick={() => navigate("/news-and-events")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to News & Events
          </Button>
          
          {isAdmin && (
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={handleEdit}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => setShowDeleteDialog(true)}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          )}
        </div>
        
        <PageHeader 
          title={eventItem.title}
          description={eventItem.description}
        />
        
        <div className="mt-8">
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <img 
              src={eventItem.imageUrl} 
              alt={eventItem.title}
              className="w-full h-[400px] object-cover"
            />
            
            <div className="p-8">
              <div className="flex flex-col md:flex-row gap-4 md:gap-8 mb-6">
                <div className="flex items-center">
                  <CalendarIcon className="mr-2 h-5 w-5 text-primary" />
                  <span className="text-secondary/70">{eventItem.date}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-primary" />
                  <span className="text-secondary/70">{eventItem.location}</span>
                </div>
              </div>
              
              <div className="prose max-w-none">
                <p className="text-secondary/70 whitespace-pre-line">
                  {eventItem.description}
                </p>
              </div>
              
              <div className="mt-8 flex justify-center">
                <Button>
                  Register for this Event
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the event.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
            <DialogDescription>
              Update the event details below.
            </DialogDescription>
          </DialogHeader>
          {editFormData && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-title" className="text-right">
                  Title
                </Label>
                <Input
                  id="edit-title"
                  value={editFormData.title}
                  onChange={(e) => setEditFormData({...editFormData, title: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-date" className="text-right">
                  Date
                </Label>
                <Input
                  id="edit-date"
                  value={editFormData.date}
                  onChange={(e) => setEditFormData({...editFormData, date: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-location" className="text-right">
                  Location
                </Label>
                <Input
                  id="edit-location"
                  value={editFormData.location}
                  onChange={(e) => setEditFormData({...editFormData, location: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="edit-description"
                  value={editFormData.description}
                  onChange={(e) => setEditFormData({...editFormData, description: e.target.value})}
                  className="col-span-3"
                  rows={6}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-imageUrl" className="text-right">
                  Image URL
                </Label>
                <Input
                  id="edit-imageUrl"
                  value={editFormData.imageUrl}
                  onChange={(e) => setEditFormData({...editFormData, imageUrl: e.target.value})}
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditSave}>
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

// Sample events data
const events = [
  {
    id: "1",
    title: "EdTech Summit 2024",
    date: "July 15, 2024",
    location: "Hyderabad International Convention Centre",
    description: "Join us for the biggest EdTech event of the year featuring keynote speeches, product demonstrations, and networking opportunities. This full-day event brings together educators, administrators, and technology providers to explore the latest innovations in educational technology.\n\nThe summit will include:\n\n- Keynote presentations from industry leaders\n- Panel discussions on the future of education\n- Hands-on workshops and product demonstrations\n- Networking sessions with peers and potential partners\n\nRegistration includes access to all sessions, lunch, and refreshments throughout the day. Early bird registration is now open with special pricing available until June 15.",
    imageUrl: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "2",
    title: "Campus Management Workshop",
    date: "August 20, 2024",
    location: "Virtual Event",
    description: "Learn best practices for campus management in this interactive workshop designed for educational administrators. This virtual workshop is perfect for college and university administrators looking to optimize their campus operations through technology.\n\nTopics covered include:\n\n- Streamlining administrative processes\n- Implementing effective student information systems\n- Best practices for academic planning and scheduling\n- Data-driven decision making for educational institutions\n- Resource optimization and budget management\n\nThe workshop will be conducted via Zoom and will include breakout sessions for specific topics of interest. Participants will receive a certificate of completion and access to recorded sessions for future reference.",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "3",
    title: "GuideCampus User Conference",
    date: "September 10-12, 2024",
    location: "Bangalore Marriott Hotel",
    description: "Join fellow GuideCampus users for three days of learning, networking, and inspiration at our annual user conference. Whether you're new to the platform or an experienced user, this conference offers valuable insights and opportunities to enhance your skills.\n\nThe conference agenda includes:\n\n- Product updates and roadmap presentations\n- Customer success stories and case studies\n- Technical workshops and advanced training sessions\n- One-on-one consultations with product experts\n- Evening networking events and activities\n\nEarly registration is recommended as this event typically sells out. Special hotel rates are available for conference attendees.",
    imageUrl: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=800&q=80"
  }
];

export default EventDetails;
