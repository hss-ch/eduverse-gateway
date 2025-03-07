
import { useState, useEffect } from "react";
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { UserManagement } from "@/components/dashboard/UserManagement";
import { ProfileManagement } from "@/components/dashboard/ProfileManagement";
import { PartnerRequestsManagement } from "@/components/dashboard/PartnerRequestsManagement";
import { JobApplicationsManagement } from "@/components/dashboard/JobApplicationsManagement";
import { DemoRequestsManagement } from "@/components/dashboard/DemoRequestsManagement";
import { NewsEventsManagement } from "@/components/dashboard/NewsEventsManagement";
import { supabase } from "@/integrations/supabase/client";

export default function Dashboard() {
  const [activePage, setActivePage] = useState("users");
  const [session, setSession] = useState<any>(null);
  
  useEffect(() => {
    // Fetch the user session on component mount
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };
    
    getSession();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );
    
    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const renderContent = () => {
    switch (activePage) {
      case "users":
        return <UserManagement session={session} />;
      case "profile":
        return <ProfileManagement session={session} />;
      case "partners":
        return <PartnerRequestsManagement />;
      case "jobs":
        return <JobApplicationsManagement />;
      case "demos":
        return <DemoRequestsManagement />;
      case "news":
        return <NewsEventsManagement />;
      default:
        return <div>Select an option from the menu</div>;
    }
  };

  return (
    <div className="min-h-screen bg-accent">
      <MainNav />
      <div className="container py-12">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
          <DashboardNav onNavigate={setActivePage} />
          <main className="bg-white p-6 rounded-lg shadow-sm">
            {renderContent()}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
