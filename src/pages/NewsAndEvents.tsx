import { motion } from "framer-motion";
import { CalendarDays, Users, MapPin, Clock, Search } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const NewsAndEvents = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const filteredEvents = events.filter(
    event => 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredNews = newsItems.filter(
    news => 
      news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewEventDetails = (eventId: string) => {
    navigate(`/events/${eventId}`);
  };

  const handleViewAllEvents = () => {
    toast({
      title: "All Events",
      description: "Viewing all events",
    });
    navigate("/all-events");
  };

  const handleSubscribe = () => {
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }
    
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Success!",
      description: "You've been subscribed to our newsletter",
    });
    setEmail("");
  };

  const handleContact = () => {
    navigate("/contact");
  };

  return (
    <div className="min-h-screen bg-accent">
      <MainNav />
      
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Events Banner"
          className="w-full h-[300px] object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20" />
      </div>

      <section className="relative -mt-20 px-6 pb-16">
        <div className="container">
          <PageHeader 
            title="News & Events"
            description="Stay updated with the latest news and upcoming events from GuideCampus"
          />
          
          <div className="mb-8 max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search news and events..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <Tabs defaultValue="events" className="mb-16">
            <TabsList className="mx-auto mb-8">
              <TabsTrigger value="events">Upcoming Events</TabsTrigger>
              <TabsTrigger value="news">Latest News</TabsTrigger>
            </TabsList>
            
            <TabsContent value="events">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                    >
                      <div className="relative">
                        <img 
                          src={event.imageUrl} 
                          alt={event.title}
                          className="w-full h-48 object-cover"
                        />
                        {event.isFeatured && (
                          <div className="absolute top-4 left-4 bg-primary text-white text-xs px-2 py-1 rounded-full">
                            Featured
                          </div>
                        )}
                      </div>
                      
                      <div className="p-5">
                        <div className="flex items-center gap-2 text-primary mb-2">
                          <CalendarDays className="w-4 h-4" />
                          <span className="text-sm">{event.date}</span>
                        </div>
                        
                        <h3 className="text-xl font-semibold mb-2 line-clamp-2">{event.title}</h3>
                        <p className="text-secondary/70 mb-4 line-clamp-3">{event.description}</p>
                        
                        <div className="flex flex-wrap gap-4 mb-4">
                          <div className="flex items-center gap-1 text-sm text-secondary/70">
                            <Clock className="w-4 h-4" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-secondary/70">
                            <MapPin className="w-4 h-4" />
                            <span>{event.location}</span>
                          </div>
                          {event.attendees && (
                            <div className="flex items-center gap-1 text-sm text-secondary/70">
                              <Users className="w-4 h-4" />
                              <span>{event.attendees} Attendees</span>
                            </div>
                          )}
                        </div>
                        
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => handleViewEventDetails(event.id)}
                        >
                          View Details
                        </Button>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-lg text-secondary/70">No events found matching your search. Try different keywords.</p>
                  </div>
                )}
              </div>
              
              {filteredEvents.length > 0 && (
                <div className="mt-8 text-center">
                  <Button 
                    variant="outline"
                    onClick={handleViewAllEvents}
                  >
                    View All Events
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="news">
              <div className="grid md:grid-cols-2 gap-8">
                {filteredNews.length > 0 ? (
                  filteredNews.map((news, index) => (
                    <motion.div
                      key={news.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col md:flex-row"
                    >
                      <div className="md:w-1/3">
                        <img 
                          src={news.imageUrl} 
                          alt={news.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-5 md:w-2/3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs text-primary font-medium">{news.category}</span>
                          <span className="text-xs text-secondary/70">{news.date}</span>
                        </div>
                        
                        <h3 className="text-xl font-semibold mb-2 line-clamp-2">{news.title}</h3>
                        <p className="text-secondary/70 mb-4 line-clamp-3">{news.excerpt}</p>
                        
                        <Button 
                          variant="link" 
                          className="p-0 h-auto text-primary"
                          onClick={() => navigate(`/news/${news.id}`)}
                        >
                          Read More →
                        </Button>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-lg text-secondary/70">No news found matching your search. Try different keywords.</p>
                  </div>
                )}
              </div>
              
              {filteredNews.length > 0 && (
                <div className="mt-8 text-center">
                  <Button 
                    variant="outline"
                    onClick={() => toast({
                      title: "All News",
                      description: "Viewing all news articles",
                    })}
                  >
                    View All News
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
          
          <div className="bg-white rounded-lg p-8 mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-secondary mb-4">Subscribe to Our Newsletter</h2>
              <p className="text-secondary/70 max-w-xl mx-auto">Stay up-to-date with our latest news, events, and exclusive updates delivered straight to your inbox.</p>
            </div>
            
            <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
              <Input 
                placeholder="Enter your email address" 
                className="flex-1"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button onClick={handleSubscribe}>Subscribe</Button>
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="text-3xl font-bold text-secondary mb-6">Got Questions?</h2>
            <p className="text-secondary/70 max-w-xl mx-auto mb-6">If you have any questions about our events or need more information, our team is here to help.</p>
            <Button onClick={handleContact}>Contact Us</Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

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
    location: "Bangalore, India",
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
    location: "New Delhi, India",
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

const newsItems = [
  {
    id: "1",
    title: "GuideCampus Partners with Top 50 Engineering Colleges for Smart Campus Initiative",
    excerpt: "GuideCampus announces a groundbreaking partnership with India's top 50 engineering colleges to implement comprehensive Smart Campus solutions, transforming educational infrastructure nationwide.",
    date: "May 25, 2024",
    category: "Partnerships",
    imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "2",
    title: "New AI-Powered Attendance Tracking Module Released",
    excerpt: "Our latest feature release introduces artificial intelligence to streamline attendance tracking, reducing administrative burden while improving accuracy and providing valuable insights.",
    date: "June 6, 2024",
    category: "Product Update",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "3",
    title: "Pragathi College, Hyderabad Goes Live with GuideCampus for Smart Campus Management",
    excerpt: "Pragathi College, a leading educational institution in Hyderabad, has officially gone live with GuideCampus, an advanced Smart Campus Management & Automation Software.",
    date: "Feb 10, 2025",
    category: "Awards",
    imageUrl: "https://images.unsplash.com/photo-1551836022-8b2858c9c69b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "4",
    title: "Case Study: How CMR College Improved Operational Efficiency by 60%",
    excerpt: "Read how CMR College leveraged GuideCampus ERP solutions to streamline administrative processes, reduce paperwork, and significantly improve institutional efficiency.",
    date: "Mar 06, 2025",
    category: "Case Study",
    imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80"
  }
];

export default NewsAndEvents;
