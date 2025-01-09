import { useLocation } from "react-router-dom";
import { MainNav } from "../MainNav";
import { Footer } from "../Footer";
import { BlogHeader } from "./layout/BlogHeader";
import { BlogAuthCheck } from "./layout/BlogAuthCheck";
import { useState } from "react";
import { Outlet } from "react-router-dom";

export function BlogLayout() {
  const location = useLocation();
  const [session, setSession] = useState<any>(null);

  return (
    <BlogAuthCheck onSessionChange={setSession}>
      <div className="min-h-screen flex flex-col bg-accent/50">
        <MainNav />
        <main className="flex-1 container mx-auto px-6 py-24">
          <BlogHeader 
            session={session} 
            isMainPage={location.pathname === "/blog"} 
          />
          <div className="bg-background rounded-lg p-6 shadow-sm">
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </BlogAuthCheck>
  );
}