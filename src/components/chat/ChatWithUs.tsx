
import { useState, useRef, useEffect } from 'react';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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

// Predefined responses for common questions
const predefinedResponses: Record<string, string> = {
  "pricing": "Our pricing is based on a per-student model, starting from ₹150 per student per year for Training Institutions, ₹450 for Schools, ₹500 for Colleges, and ₹600 for Universities. We're currently offering a special launch discount!",
  "demo": "You can schedule a demo by clicking on the 'Get Started' button on our pricing page. We'll set up a personalized demo session to show you how our platform can benefit your institution.",
  "features": "EduVerse offers a comprehensive suite of features including Academic Planning, Admissions Management, Examination Management, Timetable Management, Attendance Tracking, Student Information System, Staff Management, and much more!",
  "support": "We offer 24/7 premium support for all our plans. You can reach out to us via email, phone, or chat anytime you need assistance.",
  "implementation": "Implementation typically takes 2-4 weeks, depending on the size and complexity of your institution. Our team will guide you through the entire process to ensure a smooth transition.",
  "trial": "Yes, we offer a 30-day free trial for all our plans. You can explore all features during the trial period with no commitment required.",
  "data migration": "We provide comprehensive data migration services to help you transition smoothly from your existing systems. Our team will ensure all your data is transferred accurately and securely.",
  "training": "We offer comprehensive training for all users including administrators, faculty, and staff. Training sessions can be conducted online or in-person based on your preference.",
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
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button className="rounded-full h-14 w-14 shadow-lg flex items-center justify-center bg-primary hover:bg-primary/90">
            <MessageSquare size={24} />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="w-[95vw] sm:max-w-[400px] h-[60vh] sm:h-[500px] p-0 flex flex-col">
          <AlertDialogHeader className="p-4 border-b">
            <div className="flex items-center justify-between">
              <AlertDialogTitle>Chat with us</AlertDialogTitle>
              <Button variant="ghost" size="icon" onClick={clearChat} className="h-8 w-8">
                <X size={16} />
              </Button>
            </div>
            <AlertDialogDescription>
              Ask questions about EduVerse
            </AlertDialogDescription>
          </AlertDialogHeader>
          
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
          
          <AlertDialogFooter className="p-4 border-t">
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
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
