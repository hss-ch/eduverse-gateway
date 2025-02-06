import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const DemoRequestsManagement = () => {
  const { toast } = useToast();
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [emailContent, setEmailContent] = useState({
    subject: "",
    message: "",
  });

  const { data: demoRequests, isLoading } = useQuery({
    queryKey: ["demo-requests"],
    queryFn: async () => {
      console.log("Fetching demo requests");
      const { data, error } = await supabase
        .from("demo_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching demo requests:", error);
        throw error;
      }

      return data;
    },
  });

  const updateDemoStatus = async (id: string, status: string) => {
    try {
      console.log("Updating demo request status:", { id, status });
      const { error } = await supabase
        .from("demo_requests")
        .update({ status })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Status Updated",
        description: "Demo request status has been updated successfully.",
      });
    } catch (error: any) {
      console.error("Error updating demo status:", error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const sendEmail = async (to: string, name: string) => {
    try {
      const response = await supabase.functions.invoke('send-email', {
        body: {
          to,
          subject: emailContent.subject,
          message: emailContent.message,
          name,
        },
      });

      if (response.error) throw response.error;

      toast({
        title: "Email Sent",
        description: "Your email has been sent successfully.",
      });
    } catch (error: any) {
      console.error("Error sending email:", error);
      toast({
        title: "Error",
        description: "Failed to send email. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div>Loading demo requests...</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Demo Requests</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Organization</TableHead>
            <TableHead>Preferred Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {demoRequests?.map((demo) => (
            <TableRow key={demo.id}>
              <TableCell>{demo.name}</TableCell>
              <TableCell>{demo.email}</TableCell>
              <TableCell>{demo.organization}</TableCell>
              <TableCell>
                {format(new Date(demo.preferred_date), "PPP")}
              </TableCell>
              <TableCell>
                <Select
                  value={demo.status}
                  onValueChange={(value) => updateDemoStatus(demo.id, value)}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className="max-w-md truncate">
                {demo.message}
              </TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      Send Email
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Send Email Response</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          value={emailContent.subject}
                          onChange={(e) =>
                            setEmailContent((prev) => ({
                              ...prev,
                              subject: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          value={emailContent.message}
                          onChange={(e) =>
                            setEmailContent((prev) => ({
                              ...prev,
                              message: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button onClick={() => sendEmail(demo.email, demo.name)}>
                        Send Email
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};