
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

type PartnerRequest = {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  partner_type: string;
  message: string | null;
  status: string;
  created_at: string;
  admin_notes: string | null;
  admin_response: string | null;
};

export function PartnerRequestsManagement() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState<PartnerRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<PartnerRequest | null>(null);
  const [responseData, setResponseData] = useState({
    status: "",
    notes: "",
    response: "",
  });

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("partner_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setRequests(data || []);
    } catch (error) {
      console.error("Error fetching partner requests:", error);
      toast({
        title: "Error",
        description: "Failed to load partner requests",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleViewRequest = (request: PartnerRequest) => {
    setSelectedRequest(request);
    setResponseData({
      status: request.status,
      notes: request.admin_notes || "",
      response: request.admin_response || "",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setResponseData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitResponse = async () => {
    if (!selectedRequest) return;
    
    try {
      const { error } = await supabase
        .from("partner_requests")
        .update({
          status: responseData.status,
          admin_notes: responseData.notes,
          admin_response: responseData.response,
        })
        .eq("id", selectedRequest.id);

      if (error) throw error;
      
      toast({
        title: "Response Submitted",
        description: "The partner request has been updated",
      });
      
      // Update the local state
      setRequests(prev => 
        prev.map(req => 
          req.id === selectedRequest.id 
            ? { 
                ...req, 
                status: responseData.status,
                admin_notes: responseData.notes,
                admin_response: responseData.response
              } 
            : req
        )
      );
      
      // Optional: Send email to partner
      if (responseData.status === "approved" || responseData.status === "rejected") {
        // You could implement email sending here
      }
    } catch (error) {
      console.error("Error updating partner request:", error);
      toast({
        title: "Error",
        description: "Failed to update partner request",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200">Pending</Badge>;
      case "approved":
        return <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">Approved</Badge>;
      case "rejected":
        return <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">Rejected</Badge>;
      case "in_review":
        return <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">In Review</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatPartnerType = (type: string) => {
    return type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Partner Requests</h2>
        <Button onClick={fetchRequests} variant="outline" size="sm">
          Refresh
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center p-8">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      ) : requests.length === 0 ? (
        <div className="text-center p-8 border rounded-lg">
          <p className="text-muted-foreground">No partner requests found.</p>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">{request.company}</TableCell>
                  <TableCell>{formatPartnerType(request.partner_type)}</TableCell>
                  <TableCell>{request.name}</TableCell>
                  <TableCell>{getStatusBadge(request.status)}</TableCell>
                  <TableCell>{formatDistanceToNow(new Date(request.created_at), { addSuffix: true })}</TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewRequest(request)}
                        >
                          Manage
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Partner Request Details</DialogTitle>
                          <DialogDescription>
                            Review and respond to this partnership request
                          </DialogDescription>
                        </DialogHeader>
                        
                        {selectedRequest && (
                          <div className="space-y-6 py-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h3 className="font-semibold">Company</h3>
                                <p>{selectedRequest.company}</p>
                              </div>
                              <div>
                                <h3 className="font-semibold">Partner Type</h3>
                                <p>{formatPartnerType(selectedRequest.partner_type)}</p>
                              </div>
                              <div>
                                <h3 className="font-semibold">Contact Name</h3>
                                <p>{selectedRequest.name}</p>
                              </div>
                              <div>
                                <h3 className="font-semibold">Email</h3>
                                <p>{selectedRequest.email}</p>
                              </div>
                              <div>
                                <h3 className="font-semibold">Phone</h3>
                                <p>{selectedRequest.phone}</p>
                              </div>
                              <div>
                                <h3 className="font-semibold">Submitted</h3>
                                <p>{formatDistanceToNow(new Date(selectedRequest.created_at), { addSuffix: true })}</p>
                              </div>
                            </div>
                            
                            {selectedRequest.message && (
                              <div>
                                <h3 className="font-semibold mb-2">Message</h3>
                                <div className="p-4 bg-muted rounded-md text-sm">
                                  {selectedRequest.message}
                                </div>
                              </div>
                            )}
                            
                            <div className="space-y-4 border-t pt-4">
                              <h3 className="font-semibold">Respond to Request</h3>
                              
                              <div className="space-y-2">
                                <Label htmlFor="status">Status</Label>
                                <select
                                  id="status"
                                  name="status"
                                  value={responseData.status}
                                  onChange={handleInputChange}
                                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                  <option value="pending">Pending</option>
                                  <option value="in_review">In Review</option>
                                  <option value="approved">Approved</option>
                                  <option value="rejected">Rejected</option>
                                </select>
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="notes">Internal Notes (admin only)</Label>
                                <Textarea
                                  id="notes"
                                  name="notes"
                                  value={responseData.notes || ""}
                                  onChange={handleInputChange}
                                  placeholder="Add notes for internal reference..."
                                  className="min-h-[80px]"
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="response">Response to Partner (will be emailed)</Label>
                                <Textarea
                                  id="response"
                                  name="response"
                                  value={responseData.response || ""}
                                  onChange={handleInputChange}
                                  placeholder="Compose a response to the partner..."
                                  className="min-h-[120px]"
                                />
                              </div>
                              
                              <div className="flex justify-end gap-3">
                                <DialogClose asChild>
                                  <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <DialogClose asChild>
                                  <Button onClick={handleSubmitResponse}>Save Response</Button>
                                </DialogClose>
                              </div>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
