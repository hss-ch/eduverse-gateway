
import { useState, useRef, useEffect } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Send, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

const initialMessages: Message[] = [
  {
    id: '1',
    text: 'Hi there! I\'m your EduVerse assistant. How can I help you today?',
    sender: 'bot',
    timestamp: new Date(),
  },
];

// Expanded predefined responses for common questions
const predefinedResponses: Record<string, string> = {
  // Pricing related queries
  "pricing": "Our pricing is based on a per-student model, starting from ₹150 per student per year for Training Institutions, ₹450 for Schools, ₹500 for Colleges, and ₹600 for Universities. We're currently offering a special launch discount!",
  "cost": "Our pricing is affordable and flexible, with plans starting from ₹150 per student per year depending on your institution type. We also offer customized enterprise solutions for larger institutions.",
  "subscription": "All our plans are annual subscriptions with options for monthly installments. You can upgrade your plan at any time as your institution grows.",
  
  // Demo related queries
  "demo": "You can schedule a demo by clicking on the 'Get Started' button on our pricing page. We'll set up a personalized demo session to show you how our platform can benefit your institution.",
  "schedule demo": "Scheduling a demo is easy! Just navigate to our pricing page and click on 'Get Started', or go to the contact page to fill out a quick form. Our team will get back to you within 24 hours.",
  "see it in action": "We offer comprehensive demos tailored to your institution's needs. Our team will walk you through all the features and answer any questions you might have.",
  
  // Features related queries
  "features": "EduVerse offers a comprehensive suite of features including Academic Planning, Admissions Management, Examination Management, Timetable Management, Attendance Tracking, Student Information System, Staff Management, and much more!",
  "modules": "Our platform includes modules for Academic Management, Administrative Management, Student Life Management, Finance Management, and Accreditation Management, all integrated seamlessly.",
  "what can it do": "EduVerse can streamline your entire educational institution's operations - from admissions to alumni management, academic planning to financial tracking, and everything in between.",
  
  // Support related queries
  "support": "We offer 24/7 premium support for all our plans. You can reach out to us via email, phone, or chat anytime you need assistance.",
  "help": "Our support team is available 24/7 to assist you with any issues. You can reach us via email at support@eduverse.com or call us at +91 98765 43210.",
  "contact": "You can reach us by email at info@eduverse.com, call us at +91 98765 43210, or visit our office at 123 Education Street, Tech Park, Bangalore 560001.",
  
  // Implementation related queries
  "implementation": "Implementation typically takes 2-4 weeks, depending on the size and complexity of your institution. Our team will guide you through the entire process to ensure a smooth transition.",
  "setup": "Our setup process is designed to be smooth and efficient. We provide comprehensive training and support during the implementation phase, which typically takes 2-4 weeks.",
  "onboarding": "Our onboarding process includes data migration, system configuration, user training, and a trial period to ensure everything works perfectly for your institution.",
  
  // Trial related queries
  "trial": "Yes, we offer a 30-day free trial for all our plans. You can explore all features during the trial period with no commitment required.",
  "free version": "We offer a 30-day free trial that gives you access to all features of your selected plan. This allows you to fully evaluate the platform before making a commitment.",
  
  // Data related queries
  "data migration": "We provide comprehensive data migration services to help you transition smoothly from your existing systems. Our team will ensure all your data is transferred accurately and securely.",
  "data security": "We take data security very seriously. Our platform is compliant with all major educational data protection regulations, and we use advanced encryption to protect your institution's information.",
  "backup": "We perform automatic daily backups of all your data, and you can also manually export data at any time. Your information is safe with us.",
  
  // Training related queries
  "training": "We offer comprehensive training for all users including administrators, faculty, and staff. Training sessions can be conducted online or in-person based on your preference.",
  "learn how to use": "We provide detailed documentation, video tutorials, and live training sessions to help your team get the most out of EduVerse. Our support team is also always available to answer questions.",
  
  // Academic Management related queries
  "academic": "Our Academic Management module helps you handle curriculum management, student progress tracking, grade management, academic calendar planning, outcome-based education implementation, and detailed performance analytics.",
  "curriculum": "Our platform makes curriculum management easy with tools for planning, implementing, and evaluating your educational programs. You can align with educational standards and track outcomes efficiently.",
  "examination": "Our Examination Management system lets you create, schedule, and manage exams, generate hall tickets, record marks, analyze results, and produce comprehensive reports.",
  
  // Administrative related queries
  "administrative": "Our Administrative Management modules help you handle document management, task automation, system configuration, staff management, notifications, and centralized data management.",
  "admin": "The administrative features include document management, task automation, system configuration, staff management, notifications, and centralized data management for efficient institutional operations.",
  "administration": "Our administrative tools streamline operations with document management, task automation, customizable system settings, staff management, automated notifications, and centralized data storage.",
  
  // Accreditation related queries
  "accreditation": "We offer specialized solutions for NAAC, NBA, ABET, NIRF, and QS accreditations and rankings. Our system helps collect, organize, and present data required for these accreditations efficiently.",
  "ranking": "Our Accreditation & Ranking Solutions module helps you prepare for and maintain compliance with major accreditation bodies like NAAC, NBA, ABET, NIRF, and QS.",
  "naac": "Our NAAC accreditation module helps you prepare self-study reports, collect and organize evidence, and track key metrics required for NAAC assessment and accreditation.",
  
  // Career related queries
  "careers": "We're always looking for talented individuals to join our team! Check out our careers page for current openings in development, customer success, sales, and more.",
  "jobs": "Visit our careers page to see our current job openings. We offer competitive salaries, excellent benefits, and a dynamic work environment.",
  "work with us": "We welcome talented professionals to join our growing team. Check our careers page for current openings and application procedures.",
};

export function ChatWithUs() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Generate response
    setTimeout(() => {
      let responseText = "I'm not sure about that. Would you like to schedule a demo with our team to discuss further?";
      
      // Check for keywords in the user's message
      const userMessageLower = inputValue.toLowerCase();
      
      // Check for matches in predefined responses
      for (const [keyword, response] of Object.entries(predefinedResponses)) {
        if (userMessageLower.includes(keyword.toLowerCase())) {
          responseText = response;
          break;
        }
      }

      const botMessage: Message = {
        id: Date.now().toString(),
        text: responseText,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages(initialMessages);
    toast({
      title: "Chat history cleared",
      description: "Your conversation has been reset.",
    });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Dialog open={open} onOpenChange={setOpen}>
        <Button 
          onClick={() => setOpen(true)} 
          className="rounded-full h-14 w-14 shadow-lg flex items-center justify-center bg-primary hover:bg-primary/90"
        >
          <MessageSquare size={24} />
        </Button>
        <DialogContent className="w-[95vw] sm:max-w-[400px] h-[60vh] sm:h-[500px] p-0 flex flex-col">
          <DialogHeader className="p-4 border-b">
            <div className="flex items-center justify-between">
              <DialogTitle>Chat with us</DialogTitle>
              <Button variant="ghost" size="icon" onClick={clearChat} className="h-8 w-8">
                <X size={16} />
              </Button>
            </div>
            <DialogDescription>
              Ask questions about EduVerse
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex-grow overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'user' 
                      ? 'bg-primary text-white rounded-tr-none' 
                      : 'bg-muted rounded-tl-none'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="p-4 border-t">
            <div className="flex w-full gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="flex-grow"
              />
              <Button onClick={sendMessage} size="icon">
                <Send size={16} />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

