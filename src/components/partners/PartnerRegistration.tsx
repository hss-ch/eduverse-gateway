
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type PartnerType = "sales_partner" | "business_partner" | "technology_partner" | "implementation_partner" | "reseller";

interface PartnerRegistrationProps {
  initialPartnerType?: PartnerType;
}

export function PartnerRegistration({ initialPartnerType = "business_partner" }: PartnerRegistrationProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    partnerType: initialPartnerType,
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      // Check if user is authenticated
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to submit a partner request.",
          variant: "destructive",
        });
        return;
      }
      
      // Use the "as any" workaround to bypass TypeScript checking
      // This is needed because the Supabase types don't know about our new table yet
      const { error } = await (supabase
        .from('partner_requests' as any)
        .insert({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          phone: formData.phone,
          partner_type: formData.partnerType,
          message: formData.message,
          status: "pending"
        }) as any);
      
      if (error) throw error;
      
      toast({
        title: "Request Submitted",
        description: "Your partnership request has been submitted successfully. We'll be in touch shortly.",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        partnerType: initialPartnerType,
        message: "",
      });
      
    } catch (error: any) {
      console.error("Error submitting partner request:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to submit your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Partner With Us</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="company">Company/Organization</Label>
            <Input
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="partnerType">Partnership Type</Label>
          <select
            id="partnerType"
            name="partnerType"
            value={formData.partnerType}
            onChange={handleChange}
            className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            required
          >
            <option value="sales_partner">Sales Partner</option>
            <option value="business_partner">Business Partner</option>
            <option value="technology_partner">Technology Partner</option>
            <option value="implementation_partner">Implementation Partner</option>
            <option value="reseller">Reseller</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="message">Message (Optional)</Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us more about your partnership interests..."
            className="min-h-[120px]"
          />
        </div>
        
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Submitting..." : "Submit Partner Request"}
        </Button>
      </form>
    </div>
  );
}
