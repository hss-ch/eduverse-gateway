
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";

// Define types for our news and events items
export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  imageUrl: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  imageUrl: string;
}

interface NewsAdminProps {
  news: NewsItem[];
  events: EventItem[];
  onAddNews: (newsItem: Omit<NewsItem, "id">) => void;
  onUpdateNews: (id: string, newsItem: Partial<NewsItem>) => void;
  onDeleteNews: (id: string) => void;
  onAddEvent: (eventItem: Omit<EventItem, "id">) => void;
  onUpdateEvent: (id: string, eventItem: Partial<EventItem>) => void;
  onDeleteEvent: (id: string) => void;
}

export const NewsAdmin: React.FC<NewsAdminProps> = ({
  news,
  events,
  onAddNews,
  onUpdateNews,
  onDeleteNews,
  onAddEvent,
  onUpdateEvent,
  onDeleteEvent,
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"news" | "events">("news");
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);
  const [newsFormOpen, setNewsFormOpen] = useState(false);
  const [eventFormOpen, setEventFormOpen] = useState(false);
  
  const [newsForm, setNewsForm] = useState<Omit<NewsItem, "id">>({
    title: "",
    excerpt: "",
    content: "",
    date: format(new Date(), "MMM dd, yyyy"),
    category: "Product Update",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
  });
  
  const [eventForm, setEventForm] = useState<Omit<EventItem, "id">>({
    title: "",
    date: format(new Date(), "MMM dd, yyyy"),
    location: "",
    description: "",
    imageUrl: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=800&q=80",
  });

  const handleNewsSubmit = () => {
    if (editingNews) {
      onUpdateNews(editingNews.id, newsForm);
      toast({
        title: "News Updated",
        description: "The news item has been updated successfully.",
      });
    } else {
      onAddNews(newsForm);
      toast({
        title: "News Added",
        description: "The news item has been added successfully.",
      });
    }
    
    setNewsForm({
      title: "",
      excerpt: "",
      content: "",
      date: format(new Date(), "MMM dd, yyyy"),
      category: "Product Update",
      imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    });
    setEditingNews(null);
    setNewsFormOpen(false);
  };

  const handleEventSubmit = () => {
    if (editingEvent) {
      onUpdateEvent(editingEvent.id, eventForm);
      toast({
        title: "Event Updated",
        description: "The event has been updated successfully.",
      });
    } else {
      onAddEvent(eventForm);
      toast({
        title: "Event Added",
        description: "The event has been added successfully.",
      });
    }
    
    setEventForm({
      title: "",
      date: format(new Date(), "MMM dd, yyyy"),
      location: "",
      description: "",
      imageUrl: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=800&q=80",
    });
    setEditingEvent(null);
    setEventFormOpen(false);
  };

  const handleEditNews = (item: NewsItem) => {
    setEditingNews(item);
    setNewsForm({
      title: item.title,
      excerpt: item.excerpt,
      content: item.content,
      date: item.date,
      category: item.category,
      imageUrl: item.imageUrl,
    });
    setNewsFormOpen(true);
  };

  const handleEditEvent = (item: EventItem) => {
    setEditingEvent(item);
    setEventForm({
      title: item.title,
      date: item.date,
      location: item.location,
      description: item.description,
      imageUrl: item.imageUrl,
    });
    setEventFormOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-x-2">
          <Button
            variant={activeTab === "news" ? "default" : "outline"}
            onClick={() => setActiveTab("news")}
          >
            News
          </Button>
          <Button
            variant={activeTab === "events" ? "default" : "outline"}
            onClick={() => setActiveTab("events")}
          >
            Events
          </Button>
        </div>
        
        {activeTab === "news" ? (
          <Dialog open={newsFormOpen} onOpenChange={setNewsFormOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" /> Add News
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>{editingNews ? "Edit News" : "Add News"}</DialogTitle>
                <DialogDescription>
                  {editingNews ? "Update the news article details below." : "Fill in the details for the new news article."}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="title"
                    value={newsForm.title}
                    onChange={(e) => setNewsForm({...newsForm, title: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="excerpt" className="text-right">
                    Excerpt
                  </Label>
                  <Textarea
                    id="excerpt"
                    value={newsForm.excerpt}
                    onChange={(e) => setNewsForm({...newsForm, excerpt: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="content" className="text-right">
                    Content
                  </Label>
                  <Textarea
                    id="content"
                    value={newsForm.content}
                    onChange={(e) => setNewsForm({...newsForm, content: e.target.value})}
                    className="col-span-3"
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Category
                  </Label>
                  <Select 
                    value={newsForm.category}
                    onValueChange={(value) => setNewsForm({...newsForm, category: value})}
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
                  <Label htmlFor="imageUrl" className="text-right">
                    Image URL
                  </Label>
                  <Input
                    id="imageUrl"
                    value={newsForm.imageUrl}
                    onChange={(e) => setNewsForm({...newsForm, imageUrl: e.target.value})}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleNewsSubmit}>{editingNews ? "Update" : "Add"}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ) : (
          <Dialog open={eventFormOpen} onOpenChange={setEventFormOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" /> Add Event
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>{editingEvent ? "Edit Event" : "Add Event"}</DialogTitle>
                <DialogDescription>
                  {editingEvent ? "Update the event details below." : "Fill in the details for the new event."}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="title"
                    value={eventForm.title}
                    onChange={(e) => setEventForm({...eventForm, title: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">
                    Location
                  </Label>
                  <Input
                    id="location"
                    value={eventForm.location}
                    onChange={(e) => setEventForm({...eventForm, location: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={eventForm.description}
                    onChange={(e) => setEventForm({...eventForm, description: e.target.value})}
                    className="col-span-3"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="imageUrl" className="text-right">
                    Image URL
                  </Label>
                  <Input
                    id="imageUrl"
                    value={eventForm.imageUrl}
                    onChange={(e) => setEventForm({...eventForm, imageUrl: e.target.value})}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleEventSubmit}>{editingEvent ? "Update" : "Add"}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
      
      {activeTab === "news" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <Card key={item.id}>
              <CardHeader className="p-0">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-40 object-cover rounded-t-lg"
                />
              </CardHeader>
              <CardContent className="pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-medium text-primary">{item.category}</span>
                  <span className="text-xs text-secondary/70">{item.date}</span>
                </div>
                <CardTitle className="text-lg mb-2 line-clamp-2">{item.title}</CardTitle>
                <CardDescription className="line-clamp-2">{item.excerpt}</CardDescription>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" onClick={() => handleEditNews(item)}>
                  <Edit className="h-4 w-4 mr-2" /> Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    onDeleteNews(item.id);
                    toast({
                      title: "News Deleted",
                      description: "The news item has been deleted successfully.",
                    });
                  }}
                >
                  <Trash className="h-4 w-4 mr-2 text-destructive" /> Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((item) => (
            <Card key={item.id}>
              <CardHeader className="p-0">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-40 object-cover rounded-t-lg"
                />
              </CardHeader>
              <CardContent className="pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-medium text-primary">{item.location}</span>
                  <span className="text-xs text-secondary/70">{item.date}</span>
                </div>
                <CardTitle className="text-lg mb-2 line-clamp-2">{item.title}</CardTitle>
                <CardDescription className="line-clamp-2">{item.description}</CardDescription>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" onClick={() => handleEditEvent(item)}>
                  <Edit className="h-4 w-4 mr-2" /> Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    onDeleteEvent(item.id);
                    toast({
                      title: "Event Deleted",
                      description: "The event has been deleted successfully.",
                    });
                  }}
                >
                  <Trash className="h-4 w-4 mr-2 text-destructive" /> Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
