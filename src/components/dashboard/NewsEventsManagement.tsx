
import { useState, useEffect } from "react";
import { NewsAdmin, type NewsItem, type EventItem } from "@/components/news/NewsAdmin";
import { useToast } from "@/components/ui/use-toast";
import { v4 as uuidv4 } from "uuid";

// Sample initial data
const initialNews: NewsItem[] = [
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
    content: "June 5, 2024 – A groundbreaking 𝐀𝐈-𝐩𝐨𝐰𝐞𝐫𝐞𝐝 𝐀𝐭𝐭𝐞𝐧𝐝𝐚𝐧𝐜𝐞 𝐓𝐫𝐚𝐜𝐤𝐢𝐧𝐠 𝐌𝐨𝐝𝐮𝐥𝐞 has been launched, setting a new benchmark for 𝐚𝐮𝐭𝐨𝐦𝐚𝐭𝐞𝐝 𝐚𝐭𝐭𝐞𝐧𝐝𝐚𝐧𝐜𝐞 𝐦𝐚𝐧𝐚𝐠𝐞𝐦𝐞𝐧𝐭 in educational institutions.",
    excerpt: "Our latest feature release introduces artificial intelligence to streamline attendance tracking, reducing administrative burden while improving accuracy and providing valuable insights.",
    date: "June 6, 2024",
    category: "Product Update",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
  }
];

const initialEvents: EventItem[] = [
  {
    id: "1",
    title: "EdTech Summit 2024",
    date: "July 15, 2024",
    location: "Hyderabad International Convention Centre",
    description: "Join us for the biggest EdTech event of the year featuring keynote speeches, product demonstrations, and networking opportunities.",
    imageUrl: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "2",
    title: "Campus Management Workshop",
    date: "August 20, 2024",
    location: "Virtual Event",
    description: "Learn best practices for campus management in this interactive workshop designed for educational administrators.",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80"
  }
];

export const NewsEventsManagement = () => {
  const { toast } = useToast();
  const [news, setNews] = useState<NewsItem[]>(initialNews);
  const [events, setEvents] = useState<EventItem[]>(initialEvents);
  
  // In a real application, you would fetch this data from your database
  useEffect(() => {
    // Fetch news and events from API/database
    // For now we're using the mock data defined above
  }, []);
  
  const handleAddNews = (newsItem: Omit<NewsItem, "id">) => {
    const newItem = {
      ...newsItem,
      id: uuidv4()
    };
    setNews([...news, newItem]);
    toast({
      title: "News Added",
      description: "The news item has been added successfully."
    });
  };
  
  const handleUpdateNews = (id: string, updatedItem: Partial<NewsItem>) => {
    setNews(news.map(item => 
      item.id === id ? { ...item, ...updatedItem } : item
    ));
    toast({
      title: "News Updated",
      description: "The news item has been updated successfully."
    });
  };
  
  const handleDeleteNews = (id: string) => {
    setNews(news.filter(item => item.id !== id));
    toast({
      title: "News Deleted",
      description: "The news item has been deleted successfully."
    });
  };
  
  const handleAddEvent = (eventItem: Omit<EventItem, "id">) => {
    const newItem = {
      ...eventItem,
      id: uuidv4()
    };
    setEvents([...events, newItem]);
    toast({
      title: "Event Added",
      description: "The event has been added successfully."
    });
  };
  
  const handleUpdateEvent = (id: string, updatedItem: Partial<EventItem>) => {
    setEvents(events.map(item => 
      item.id === id ? { ...item, ...updatedItem } : item
    ));
    toast({
      title: "Event Updated",
      description: "The event has been updated successfully."
    });
  };
  
  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter(item => item.id !== id));
    toast({
      title: "Event Deleted",
      description: "The event has been deleted successfully."
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">News & Events Management</h2>
      <p className="text-muted-foreground">
        Create, edit, and delete news articles and events. These will be displayed on the News & Events page.
      </p>
      
      <NewsAdmin 
        news={news}
        events={events}
        onAddNews={handleAddNews}
        onUpdateNews={handleUpdateNews}
        onDeleteNews={handleDeleteNews}
        onAddEvent={handleAddEvent}
        onUpdateEvent={handleUpdateEvent}
        onDeleteEvent={handleDeleteEvent}
      />
    </div>
  );
};
