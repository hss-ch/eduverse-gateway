import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { UserManagement } from "@/components/dashboard/UserManagement";
import { ProfileManagement } from "@/components/dashboard/ProfileManagement";
import { DemoRequestsManagement } from "@/components/dashboard/DemoRequestsManagement";
import { JobApplicationsManagement } from "@/components/dashboard/JobApplicationsManagement";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Dashboard - Checking session");
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Dashboard - Session:", session);
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Dashboard - Auth state changed:", session);
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    toast({
      title: "Authentication required",
      description: "Please sign in to access the dashboard",
      variant: "destructive",
    });
    navigate("/auth");
    return null;
  }

  return (
    <div className="min-h-screen bg-accent">
      <MainNav />
      <div className="container py-8">
        <div className="flex flex-col gap-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Tabs defaultValue="profile" className="w-full">
            <TabsList>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="demos">Demo Requests</TabsTrigger>
              <TabsTrigger value="applications">Job Applications</TabsTrigger>
            </TabsList>
            <TabsContent value="profile">
              <ProfileManagement session={session} />
            </TabsContent>
            <TabsContent value="users">
              <UserManagement session={session} />
            </TabsContent>
            <TabsContent value="demos">
              <DemoRequestsManagement />
            </TabsContent>
            <TabsContent value="applications">
              <JobApplicationsManagement />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;