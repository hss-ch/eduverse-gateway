import { useState, useEffect } from "react";
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
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface UserManagementProps {
  session: any;
}

export const UserManagement = ({ session }: UserManagementProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<any[]>([]);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [currentUserRole, setCurrentUserRole] = useState<string>('user');

  useEffect(() => {
    if (session) {
      getUsers();
      getCurrentUserRole();
    }
  }, [session]);

  async function getCurrentUserRole() {
    try {
      if (!session?.user?.id) return;
      
      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();

      if (error) throw error;
      setCurrentUserRole(data?.role || 'user');
    } catch (error: any) {
      console.error("Error fetching user role:", error);
    }
  }

  async function getUsers() {
    try {
      setLoading(true);
      console.log("UserManagement - Fetching users");

      let query = supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      // If not admin, only fetch current user's profile
      if (currentUserRole !== 'admin') {
        query = query.eq('id', session.user.id);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      console.log("UserManagement - Users data:", data);
      setUsers(data || []);
    } catch (error: any) {
      console.error("Error fetching users:", error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  async function updateUserRole(userId: string, newRole: string) {
    try {
      // Only admins can update roles
      if (currentUserRole !== 'admin') {
        toast({
          title: "Error",
          description: "You don't have permission to update roles",
          variant: "destructive",
        });
        return;
      }

      console.log("UserManagement - Updating role for user:", userId);

      const { error } = await supabase
        .from("profiles")
        .update({ role: newRole })
        .eq("id", userId);

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: "User role updated successfully",
      });
      
      getUsers();
    } catch (error: any) {
      console.error("Error updating user role:", error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  async function updateUser(userId: string, data: any) {
    try {
      // Check if user has permission to update this profile
      if (currentUserRole !== 'admin' && userId !== session.user.id) {
        toast({
          title: "Error",
          description: "You don't have permission to update this profile",
          variant: "destructive",
        });
        return;
      }

      console.log("UserManagement - Updating user:", userId, data);

      const { error } = await supabase
        .from("profiles")
        .update(data)
        .eq("id", userId);

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: "User updated successfully",
      });
      
      setEditingUser(null);
      getUsers();
    } catch (error: any) {
      console.error("Error updating user:", error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  async function deleteUser(userId: string) {
    try {
      // Only admins can delete users
      if (currentUserRole !== 'admin') {
        toast({
          title: "Error",
          description: "You don't have permission to delete users",
          variant: "destructive",
        });
        return;
      }

      console.log("UserManagement - Deleting user:", userId);

      const { error } = await supabase
        .from("profiles")
        .delete()
        .eq("id", userId);

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: "User deleted successfully",
      });
      
      getUsers();
    } catch (error: any) {
      console.error("Error deleting user:", error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-sm text-muted-foreground">Loading users...</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Full Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.full_name || "N/A"}</TableCell>
                  <TableCell>{user.role || "user"}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {currentUserRole === 'admin' && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateUserRole(user.id, "admin")}
                            disabled={user.role === "admin"}
                          >
                            Make Admin
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateUserRole(user.id, "user")}
                            disabled={user.role === "user"}
                          >
                            Make User
                          </Button>
                        </>
                      )}
                      {(currentUserRole === 'admin' || user.id === session?.user?.id) && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setEditingUser(user)}
                            >
                              Edit
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit User</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid gap-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                  id="name"
                                  defaultValue={user.full_name}
                                  onChange={(e) => {
                                    const updatedUser = { ...editingUser, full_name: e.target.value };
                                    setEditingUser(updatedUser);
                                  }}
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                              </DialogClose>
                              <Button onClick={() => updateUser(user.id, editingUser)}>
                                Save Changes
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      )}
                      {currentUserRole === 'admin' && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteUser(user.id)}
                        >
                          Delete
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};
