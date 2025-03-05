
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

const partnerTypes = [
  { id: "sales", label: "Sales Partner" },
  { id: "business", label: "Business Partner" },
  { id: "technology", label: "Technology Partner" },
  { id: "consulting", label: "Consulting Partner" },
  { id: "reseller", label: "Reseller" },
];

export function PartnerRegistration() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    partnerType: "sales",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.company || !formData.phone) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.from('partner_requests').insert({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        phone: formData.phone,
        partner_type: formData.partnerType,
        message: formData.message,
        status: 'pending'
      });

      if (error) throw error;

      toast({
        title: "Request Submitted!",
        description: "Thank you for your interest in partnering with us. We'll be in touch soon.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        partnerType: "sales",
        message: "",
      });
    } catch (error) {
      console.error('Error submitting partner request:', error);
      toast({
        title: "Error",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Partner Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name*</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email*</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="company">Company/Organization*</Label>
          <Input
            id="company"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number*</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="partnerType">Partnership Type*</Label>
          <select
            id="partnerType"
            name="partnerType"
            value={formData.partnerType}
            onChange={handleInputChange}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            required
          >
            {partnerTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="message">Additional Information</Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Tell us about your business and how you'd like to partner with us..."
            className="min-h-[120px]"
          />
        </div>
        
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Partner Request"}
        </Button>
      </form>
    </div>
  );
}
