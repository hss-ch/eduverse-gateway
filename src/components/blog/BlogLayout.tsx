import { Link, Outlet, useLocation } from "react-router-dom";
import { MainNav } from "../MainNav";
import { Footer } from "../Footer";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";
import { useSession } from "@supabase/auth-helpers-react";

export function BlogLayout() {
  const location = useLocation();
  const session = useSession();

  return (
    <div className="min-h-screen flex flex-col bg-accent/50">
      <MainNav />
      <main className="flex-1 container mx-auto px-6 py-24">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-secondary mb-2">Blog</h1>
            <p className="text-muted-foreground">
              Discover insights and stories from our community
            </p>
          </div>
          {session && location.pathname === "/blog" && (
            <Link to="/blog/new">
              <Button className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" />
                Create Post
              </Button>
            </Link>
          )}
        </div>
        <div className="bg-background rounded-lg p-6 shadow-sm">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}