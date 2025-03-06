import { useParams, useNavigate } from "react-router-dom";
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

const NewsDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
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
                
                {/* In a real app, you would have full article content here */}
                <p className="text-secondary/70 mt-4">
                  {newsItem.content}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

// Sample news data
const newsItems = [
  {
    id: "1",
    title: "GuideCampus Partners with 50 Engineering Colleges for Smart Campus Initiative",
    content:"",
    excerpt: "GuideCampus announces a groundbreaking partnership with 50 engineering colleges to implement comprehensive Smart Campus solutions, transforming educational infrastructure nationwide.",
    date: "May 25, 2024",
    category: "Partnerships",
    imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "2",
    title: "New AI-Powered Attendance Tracking Module Released",
    content:"June 5, 2024 – A groundbreaking 𝐀𝐈-𝐩𝐨𝐰𝐞𝐫𝐞𝐝 𝐀𝐭𝐭𝐞𝐧𝐝𝐚𝐧𝐜𝐞 𝐓𝐫𝐚𝐜𝐤𝐢𝐧𝐠 𝐌𝐨𝐝𝐮𝐥𝐞 has been launched, setting a new benchmark for 𝐚𝐮𝐭𝐨𝐦𝐚𝐭𝐞𝐝 𝐚𝐭𝐭𝐞𝐧𝐝𝐚𝐧𝐜𝐞 𝐦𝐚𝐧𝐚𝐠𝐞𝐦𝐞𝐧𝐭 in educational institutions. This cutting-edge solution leverages 𝐚𝐫𝐭𝐢𝐟𝐢𝐜𝐢𝐚𝐥 𝐢𝐧𝐭𝐞𝐥𝐥𝐢𝐠𝐞𝐧𝐜𝐞, 𝐟𝐚𝐜𝐢𝐚𝐥 𝐫𝐞𝐜𝐨𝐠𝐧𝐢𝐭𝐢𝐨𝐧, 𝐚𝐧𝐝 𝐫𝐞𝐚𝐥-𝐭𝐢𝐦𝐞 𝐝𝐚𝐭𝐚 𝐩𝐫𝐨𝐜𝐞𝐬𝐬𝐢𝐧𝐠 to streamline attendance tracking, reduce administrative burden, and eliminate proxy attendance.  ",
    excerpt: "Our latest feature release introduces artificial intelligence to streamline attendance tracking, reducing administrative burden while improving accuracy and providing valuable insights.",
    date: "June 6, 2024",
    category: "Product Update",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "3",
    title: "Pragathi College, Hyderabad Goes Live with GuideCampus for Smart Campus Management",
    content:"Hyderabad, India – Feb 2025 – Pragathi College, a leading educational institution in Hyderabad, has officially gone live with GuideCampus, an advanced Smart Campus Management & Automation Software. This strategic move aims to digitize and streamline academic, administrative, and operational activities, enhancing the overall efficiency of the institution.",
    excerpt: " Pragathi College, a leading educational institution in Hyderabad, has officially gone live with GuideCampus, an advanced Smart Campus Management & Automation Software.",
    date: "Feb 10, 2025",
    category: "MoU",
    imageUrl: "https://images.unsplash.com/photo-1551836022-8b2858c9c69b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "4",
    title: "Case Study: How CMR College Improved Operational Efficiency by 60%",
    content:"",
    excerpt: "Read how CMR College leveraged GuideCampus ERP solutions to streamline administrative processes, reduce paperwork, and significantly improve institutional efficiency.",
    date: "Mar 06, 2025",
    category: "Case Study",
    imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80"
  }
];

export default NewsDetails;
