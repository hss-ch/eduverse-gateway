
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

export const JobApplicationsManagement = () => {
  const { toast } = useToast();
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [emailContent, setEmailContent] = useState({
    subject: "",
    message: "",
  });

  // Get current user's session and role
  const { data: session } = await supabase.auth.getSession();
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", session?.user?.id)
    .single();

  const isAdmin = profile?.role === "admin";
  const userEmail = session?.user?.email;

  const { data: applications, isLoading } = useQuery({
    queryKey: ["job-applications", isAdmin, userEmail],
    queryFn: async () => {
      console.log("Fetching job applications");
      let query = supabase
        .from("job_applications")
        .select("*")
        .order("created_at", { ascending: false });

      // If not admin, only fetch user's own applications
      if (!isAdmin && userEmail) {
        query = query.eq("email", userEmail);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching job applications:", error);
        throw error;
      }

      return data;
    },
  });

  const updateApplicationStatus = async (id: string, status: string) => {
    if (!isAdmin) {
      toast({
        title: "Access Denied",
        description: "Only administrators can update application status.",
        variant: "destructive",
      });
      return;
    }

    try {
      console.log("Updating application status:", { id, status });
      const { error } = await supabase
        .from("job_applications")
        .update({ status })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Status Updated",
        description: "Application status has been updated successfully.",
      });
    } catch (error: any) {
      console.error("Error updating application status:", error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const sendEmail = async (to: string, name: string) => {
    if (!isAdmin) {
      toast({
        title: "Access Denied",
        description: "Only administrators can send emails.",
        variant: "destructive",
      });
      return;
    }

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
    return <div>Loading job applications...</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Job Applications</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Job Title</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Cover Letter</TableHead>
            {isAdmin && <TableHead>Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications?.map((application) => (
            <TableRow key={application.id}>
              <TableCell>{application.job_title}</TableCell>
              <TableCell>{application.name}</TableCell>
              <TableCell>{application.email}</TableCell>
              <TableCell>{application.phone}</TableCell>
              <TableCell>
                {isAdmin ? (
                  <Select
                    value={application.status}
                    onValueChange={(value) =>
                      updateApplicationStatus(application.id, value)
                    }
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="reviewing">Reviewing</SelectItem>
                      <SelectItem value="interviewed">Interviewed</SelectItem>
                      <SelectItem value="accepted">Accepted</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <span>{application.status}</span>
                )}
              </TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Cover Letter</DialogTitle>
                    </DialogHeader>
                    <div className="mt-4 max-h-96 overflow-y-auto">
                      <p className="whitespace-pre-wrap">
                        {application.cover_letter}
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>
              </TableCell>
              {isAdmin && (
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
                        <Button onClick={() => sendEmail(application.email, application.name)}>
                          Send Email
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
