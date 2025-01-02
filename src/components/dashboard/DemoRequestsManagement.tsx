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

export const DemoRequestsManagement = () => {
  const { toast } = useToast();
  const [selectedStatus, setSelectedStatus] = useState<string>("");

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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};