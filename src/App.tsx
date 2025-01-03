import React, { useEffect, useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Academic from "./pages/Academic";
import Administrative from "./pages/Administrative";
import Planning from "./pages/Planning";
import Accreditation from "./pages/Accreditation";
import NaacAccreditation from "./pages/accreditation/NaacAccreditation";
import NbaAccreditation from "./pages/accreditation/NbaAccreditation";
import AbetAccreditation from "./pages/accreditation/AbetAccreditation";
import NirfAccreditation from "./pages/accreditation/NirfAccreditation";
import QsAccreditation from "./pages/accreditation/QsAccreditation";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogNew from "./pages/BlogNew";
import BlogView from "./pages/BlogView";
import BlogEdit from "./pages/BlogEdit";
import { BlogLayout } from "./components/blog/BlogLayout";
import Pricing from "./pages/Pricing";
import Features from "./pages/Features";
import Careers from "./pages/Careers";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Dashboard from "./pages/Dashboard";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
    },
  },
});

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (mounted) {
        console.log("ProtectedRoute - Initial session:", session);
        setSession(session);
        setLoading(false);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) {
        console.log("ProtectedRoute - Auth state changed:", session);
        setSession(session);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
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
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/academic" element={<Academic />} />
              <Route path="/administrative" element={<Administrative />} />
              <Route path="/planning" element={<Planning />} />
              <Route path="/accreditation" element={<Accreditation />} />
              <Route path="/accreditation/naac" element={<NaacAccreditation />} />
              <Route path="/accreditation/nba" element={<NbaAccreditation />} />
              <Route path="/accreditation/abet" element={<AbetAccreditation />} />
              <Route path="/accreditation/nirf" element={<NirfAccreditation />} />
              <Route path="/accreditation/qs" element={<QsAccreditation />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<BlogLayout />}>
                <Route index element={<Blog />} />
                <Route
                  path="new"
                  element={
                    <ProtectedRoute>
                      <BlogNew />
                    </ProtectedRoute>
                  }
                />
                <Route path=":id" element={<BlogView />} />
                <Route
                  path="edit/:id"
                  element={
                    <ProtectedRoute>
                      <BlogEdit />
                    </ProtectedRoute>
                  }
                />
              </Route>
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/features" element={<Features />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
