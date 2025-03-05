
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { UserManagement } from "@/components/dashboard/UserManagement";
import { ProfileManagement } from "@/components/dashboard/ProfileManagement";
import { DemoRequestsManagement } from "@/components/dashboard/DemoRequestsManagement";
import { JobApplicationsManagement } from "@/components/dashboard/JobApplicationsManagement";
import { PartnerRequestsManagement } from "@/components/dashboard/PartnerRequestsManagement";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'profile';
  const { toast } = useToast();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  // Handle tab change both for the Tabs component and URL
  const handleTabChange = (value: string) => {
    console.log("Tab changed to:", value);
    setSearchParams({ tab: value });
    setSidebarOpen(false);
  };

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
      <div className="container py-4 md:py-8">
        <div className="flex flex-col gap-4 md:gap-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
            
            {/* Mobile sidebar trigger */}
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[240px] sm:w-[300px] p-0">
                <div className="py-6 px-4">
                  <h2 className="text-lg font-semibold mb-4">Dashboard Menu</h2>
                  <DashboardNav onTabChange={handleTabChange} />
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">
            {/* Sidebar - Visible only on MD and larger screens */}
            <div className="hidden md:block bg-white rounded-lg shadow p-4">
              <DashboardNav onTabChange={handleTabChange} />
            </div>
            
            {/* Main content */}
            <div className="bg-white rounded-lg shadow p-4">
              <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                {/* Tabs for mobile view */}
                <TabsList className="w-full md:hidden mb-4 overflow-x-auto flex justify-start">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="users">Users</TabsTrigger>
                  <TabsTrigger value="demos">Demo Requests</TabsTrigger>
                  <TabsTrigger value="applications">Job Applications</TabsTrigger>
                  <TabsTrigger value="partners">Partner Requests</TabsTrigger>
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
                <TabsContent value="partners">
                  <PartnerRequestsManagement />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
