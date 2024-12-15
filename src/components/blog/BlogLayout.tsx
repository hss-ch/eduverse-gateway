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
    <div className="min-h-screen flex flex-col">
      <MainNav />
      <main className="flex-1 container mx-auto px-6 py-24">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Blog</h1>
          {session && location.pathname === "/blog" && (
            <Link to="/blog/new">
              <Button className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" />
                Create Post
              </Button>
            </Link>
          )}
        </div>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}