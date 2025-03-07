
import { useParams, useNavigate } from "react-router-dom";
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define an interface for our news items
interface NewsItem {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  category: string;
  imageUrl: string;
}

const NewsDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // State for delete confirmation dialog
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  // State for edit dialog
  const [showEditDialog, setShowEditDialog] = useState(false);
  
  // Mock admin status - in a real app, this would come from auth context
  const isAdmin = true; // For demonstration purposes, set to true
  
  // State to store the current news data for editing
  const [editFormData, setEditFormData] = useState<NewsItem | null>(null);
  
  // Find the news item from our news data
  const newsItem = newsItems.find(n => n.id === id);
  
  if (!newsItem) {
    return (
      <div className="min-h-screen bg-accent">
        <MainNav />
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">News article not found</h1>
          <Button onClick={() => navigate("/news-and-events")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to News & Events
          </Button>
        </div>
        <Footer />
      </div>
    );
  }
  
  const handleEdit = () => {
    setEditFormData({...newsItem});
    setShowEditDialog(true);
  };
  
  const handleEditSave = () => {
    // In a real app, this would update the news item in the database
    if (editFormData) {
      // Find and update the news item in our mock data
      const index = newsItems.findIndex(n => n.id === id);
      if (index !== -1) {
        newsItems[index] = {...editFormData};
        
        toast({
          title: "News Updated",
          description: "The news item has been updated successfully.",
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
    const index = newsItems.findIndex(n => n.id === id);
    if (index !== -1) {
      newsItems.splice(index, 1);
    }
    
    toast({
      title: "Success",
      description: "News item has been deleted",
    });
    
    // Navigate back to the news list
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
          title={newsItem.title}
          description={newsItem.excerpt}
        />
        
        <div className="mt-8">
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <img 
              src={newsItem.imageUrl} 
              alt={newsItem.title}
              className="w-full h-[400px] object-cover"
            />
            
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <span className="text-primary font-medium">{newsItem.category}</span>
                <span className="text-secondary/70">{newsItem.date}</span>
              </div>
              
              <div className="prose max-w-none">
                <p className="text-secondary/70 whitespace-pre-line">
                  {newsItem.excerpt}
                </p>
                
                <p className="text-secondary/70 mt-4 whitespace-pre-line">
                  {newsItem.content}
                </p>
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
              This action cannot be undone. This will permanently delete the news item.
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
            <DialogTitle>Edit News</DialogTitle>
            <DialogDescription>
              Update the news article details below.
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
                <Label htmlFor="edit-excerpt" className="text-right">
                  Excerpt
                </Label>
                <Textarea
                  id="edit-excerpt"
                  value={editFormData.excerpt}
                  onChange={(e) => setEditFormData({...editFormData, excerpt: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-content" className="text-right">
                  Content
                </Label>
                <Textarea
                  id="edit-content"
                  value={editFormData.content}
                  onChange={(e) => setEditFormData({...editFormData, content: e.target.value})}
                  className="col-span-3"
                  rows={6}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-category" className="text-right">
                  Category
                </Label>
                <Select 
                  value={editFormData.category}
                  onValueChange={(value) => setEditFormData({...editFormData, category: value})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Product Update">Product Update</SelectItem>
                    <SelectItem value="Partnerships">Partnerships</SelectItem>
                    <SelectItem value="Case Study">Case Study</SelectItem>
                    <SelectItem value="MoU">MoU</SelectItem>
                    <SelectItem value="Company News">Company News</SelectItem>
                  </SelectContent>
                </Select>
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

// Sample news data
const newsItems = [
  {
    id: "1",
    title: "GuideCampus Partners with 50 Engineering Colleges for Smart Campus Initiative",
    content: "GuideCampus is excited to announce a groundbreaking partnership with 50 engineering colleges across the country to implement comprehensive Smart Campus solutions. This initiative aims to transform educational infrastructure and enhance the learning experience for thousands of students.\n\nThe partnership, which was finalized after months of planning, will see GuideCampus deploy its full suite of campus management tools including attendance tracking, academic planning, examination management, and administrative modules.\n\n\"This is a significant milestone for both GuideCampus and our partner institutions,\" said the CEO of GuideCampus. \"By digitizing and streamlining campus operations, we're helping these colleges focus more on education and less on administration.\"\n\nThe initiative is expected to be fully implemented within the next six months, with the first phase starting immediately.",
    excerpt: "GuideCampus announces a groundbreaking partnership with 50 engineering colleges to implement comprehensive Smart Campus solutions, transforming educational infrastructure nationwide.",
    date: "May 25, 2024",
    category: "Partnerships",
    imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "2",
    title: "New AI-Powered Attendance Tracking Module Released",
    content: "June 5, 2024 – A groundbreaking 𝐀𝐈-𝐩𝐨𝐰𝐞𝐫𝐞𝐝 𝐀𝐭𝐭𝐞𝐧𝐝𝐚𝐧𝐜𝐞 𝐓𝐫𝐚𝐜𝐤𝐢𝐧𝐠 𝐌𝐨𝐝𝐮𝐥𝐞 has been launched, setting a new benchmark for 𝐚𝐮𝐭𝐨𝐦𝐚𝐭𝐞𝐝 𝐚𝐭𝐭𝐞𝐧𝐝𝐚𝐧𝐜𝐞 𝐦𝐚𝐧𝐚𝐠𝐞𝐦𝐞𝐧𝐭 in educational institutions. This cutting-edge solution leverages 𝐚𝐫𝐭𝐢𝐟𝐢𝐜𝐢𝐚𝐥 𝐢𝐧𝐭𝐞𝐥𝐥𝐢𝐠𝐞𝐧𝐜𝐞, 𝐟𝐚𝐜𝐢𝐚𝐥 𝐫𝐞𝐜𝐨𝐠𝐧𝐢𝐭𝐢𝐨𝐧, 𝐚𝐧𝐝 𝐫𝐞𝐚𝐥-𝐭𝐢𝐦𝐞 𝐝𝐚𝐭𝐚 𝐩𝐫𝐨𝐜𝐞𝐬𝐬𝐢𝐧𝐠 to streamline attendance tracking, reduce administrative burden, and eliminate proxy attendance.\n\nThe new module offers several key features:\n\n1. Facial recognition for quick and accurate attendance marking\n2. Mobile app support for both faculty and students\n3. Real-time analytics and reporting\n4. Automated notifications for absent students\n5. Integration with existing Learning Management Systems\n\n\"Our AI-powered attendance tracking represents a significant advancement in educational technology,\" said the CTO of GuideCampus. \"Early adopters have reported a 60% reduction in time spent on attendance-related tasks and a 40% improvement in attendance accuracy.\"",
    excerpt: "Our latest feature release introduces artificial intelligence to streamline attendance tracking, reducing administrative burden while improving accuracy and providing valuable insights.",
    date: "June 6, 2024",
    category: "Product Update",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "3",
    title: "Pragathi College, Hyderabad Goes Live with GuideCampus for Smart Campus Management",
    content: "Hyderabad, India – Feb 2025 – Pragathi College, a leading educational institution in Hyderabad, has officially gone live with GuideCampus, an advanced Smart Campus Management & Automation Software. This strategic move aims to digitize and streamline academic, administrative, and operational activities, enhancing the overall efficiency of the institution.\n\nThe implementation covers several key areas:\n\n- Academic management including curriculum planning, timetable generation, and faculty allocation\n- Student management with complete lifecycle tracking from admission to placement\n- Administrative functions including fee management, inventory control, and resource allocation\n- Reporting and analytics for data-driven decision making\n\n\"The transition to GuideCampus has been remarkably smooth, and we're already seeing tangible benefits in terms of reduced paperwork and improved coordination between departments,\" said the Principal of Pragathi College. \"Our faculty and staff have embraced the system enthusiastically.\"\n\nThe college plans to further expand its use of the platform to include additional modules such as hostels management and transportation over the coming months.",
    excerpt: " Pragathi College, a leading educational institution in Hyderabad, has officially gone live with GuideCampus, an advanced Smart Campus Management & Automation Software.",
    date: "Feb 10, 2025",
    category: "MoU",
    imageUrl: "https://images.unsplash.com/photo-1551836022-8b2858c9c69b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "4",
    title: "Case Study: How CMR College Improved Operational Efficiency by 60%",
    content: "In a remarkable transformation, CMR College has achieved a 60% improvement in operational efficiency after implementing GuideCampus ERP solutions across their campus. This comprehensive case study examines the challenges, implementation process, and measurable outcomes of this digital transformation journey.\n\nPrior to implementing GuideCampus, CMR College struggled with fragmented systems, paper-based processes, and significant administrative overhead. Key challenges included:\n\n- Inconsistent data across departments\n- Time-consuming manual processes\n- Difficulty in tracking student performance\n- Limited reporting capabilities\n- Resource allocation inefficiencies\n\nThe college implemented a phased approach, starting with core administrative functions and gradually expanding to academic and student management modules. The results have been impressive:\n\n- 60% reduction in administrative processing time\n- 75% decrease in paper usage\n- 45% improvement in resource utilization\n- Enhanced data accuracy and reporting capabilities\n- Better student engagement and communication\n\n\"The transition to GuideCampus has been a game-changer for our institution,\" commented the Director of CMR College. \"We've not only improved our operational efficiency but also enhanced the quality of education and student experience.\"",
    excerpt: "Read how CMR College leveraged GuideCampus ERP solutions to streamline administrative processes, reduce paperwork, and significantly improve institutional efficiency.",
    date: "Mar 06, 2025",
    category: "Case Study",
    imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80"
  }
];

export default NewsDetails;
