import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";

interface DemoSchedulerProps {
  selectedPlan?: string | null;
  onSuccess?: () => void;
}

export function DemoScheduler({ selectedPlan, onSuccess }: DemoSchedulerProps) {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) return;

    try {
      const { error } = await supabase.from('demo_requests').insert({
        name: formData.name,
        email: formData.email,
        organization: formData.organization,
        message: `${formData.message}${selectedPlan ? `\nSelected Plan: ${selectedPlan}` : ''}`,
        preferred_date: date.toISOString().split('T')[0],
      });

      if (error) throw error;

      toast({
        title: "Demo Scheduled!",
        description: `We'll contact you soon to confirm your demo on ${format(date, 'PPP')}.`,
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        organization: "",
        message: "",
      });
      setDate(undefined);

      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error scheduling demo:', error);
      toast({
        title: "Error",
        description: "There was an error scheduling your demo. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Schedule a Demo</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Name</label>
          <Input
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <Input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Organization</label>
          <Input
            name="organization"
            value={formData.organization}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Preferred Date</label>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full justify-start">
                {date ? format(date, 'PPP') : 'Pick a date'}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-fit">
              <DialogHeader>
                <DialogTitle>Choose a date</DialogTitle>
                <DialogDescription>
                  Select your preferred demo date
                </DialogDescription>
              </DialogHeader>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Additional Information</label>
          <Textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Tell us about your needs..."
            className="min-h-[100px]"
          />
        </div>
        
        <Button type="submit" className="w-full">
          Schedule Demo
        </Button>
      </form>
    </div>
  );
}