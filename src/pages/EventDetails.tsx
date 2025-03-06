import { useParams, useNavigate } from "react-router-dom";
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CalendarDays, Users, MapPin, Clock, ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find the event from our events data
  const event = events.find(e => e.id === id);
  
  if (!event) {
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

  return (
    <div className="min-h-screen bg-accent">
      <MainNav />
      
      <div className="container py-16">
        <Button 
          variant="outline" 
          className="mb-8"
          onClick={() => navigate("/news-and-events")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to News & Events
        </Button>
        
        <PageHeader 
          title={event.title}
          description={event.description}
        />
        
        <div className="mt-8">
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <img 
              src={event.imageUrl} 
              alt={event.title}
              className="w-full h-[400px] object-cover"
            />
            
            <div className="p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-medium">{event.date}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Time</p>
                    <p className="font-medium">{event.time}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">{event.location}</p>
                  </div>
                </div>
                
                {event.attendees && (
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Attendees</p>
                      <p className="font-medium">{event.attendees}</p>
                    </div>
                  </div>
                )}
              </div>
              
              <p className="text-secondary/70 whitespace-pre-line">
                {event.description}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

// Sample event data
const events = [
  {
    id: "1",
    title: "EdTech Summit 2025",
    description: "Join us for a day of learning, networking, and discovering the latest trends in educational technology. This summit brings together educators, administrators, and technology providers to explore innovative solutions.",
    date: "June 15, 2025",
    time: "9:00 AM - 5:00 PM",
    location: "Virtual Event",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
    isFeatured: true,
    attendees: 250
  },
  {
    id: "2",
    title: "Campus Management Workshop",
    description: "A hands-on workshop focused on improving campus management processes using modern digital tools. Learn from industry experts and share experiences with peers.",
    date: "July 10, 2025",
    time: "10:30 AM - 3:30 PM",
    location: "Hyderabad, India",
    imageUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80",
    isFeatured: false,
    attendees: 120
  },
  {
    id: "3",
    title: "Accreditation Preparation Webinar",
    description: "This webinar will guide educational institutions through the process of preparing for NAAC, NBA, and other accreditation processes with practical tips and strategies.",
    date: "August 5, 2025",
    time: "2:00 PM - 4:00 PM",
    location: "Online Webinar",
    imageUrl: "https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&w=800&q=80",
    isFeatured: false,
    attendees: 175
  },
  {
    id: "4",
    title: "Higher Education Conference",
    description: "A premier gathering of higher education leaders, discussing the future of education, emerging technologies, and strategic initiatives for institutional growth.",
    date: "September 20, 2025",
    time: "9:00 AM - 6:00 PM",
    location: "Hyderabad, India",
    imageUrl: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=80",
    isFeatured: true,
    attendees: 300
  },
  {
    id: "5",
    title: "Student Management Systems Demo Day",
    description: "Discover how GuideCampus student management solutions can transform your institution's approach to student data, engagement, and success tracking.",
    date: "October 8, 2025",
    time: "11:00 AM - 1:00 PM",
    location: "Virtual Demo",
    imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
    isFeatured: false,
    attendees: 90
  },
  {
    id: "6",
    title: "Education Innovation Summit",
    description: "A collaborative event exploring breakthrough approaches to education, featuring case studies, panel discussions, and networking opportunities.",
    date: "November 15, 2025",
    time: "10:00 AM - 4:00 PM",
    location: "Mumbai, India",
    imageUrl: "https://images.unsplash.com/photo-1661956602868-6ae368943878?auto=format&fit=crop&w=800&q=80",
    isFeatured: false,
    attendees: 220
  }
];

export default EventDetails;
