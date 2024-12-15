import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

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
import Pricing from "./pages/Pricing";
import Features from "./pages/Features";
import Careers from "./pages/Careers";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

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
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route
                  path="/academic"
                  element={
                    <ProtectedRoute>
                      <Academic />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/administrative"
                  element={
                    <ProtectedRoute>
                      <Administrative />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/planning"
                  element={
                    <ProtectedRoute>
                      <Planning />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/accreditation"
                  element={
                    <ProtectedRoute>
                      <Accreditation />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/accreditation/naac"
                  element={
                    <ProtectedRoute>
                      <NaacAccreditation />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/accreditation/nba"
                  element={
                    <ProtectedRoute>
                      <NbaAccreditation />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/accreditation/abet"
                  element={
                    <ProtectedRoute>
                      <AbetAccreditation />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/accreditation/nirf"
                  element={
                    <ProtectedRoute>
                      <NirfAccreditation />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/accreditation/qs"
                  element={
                    <ProtectedRoute>
                      <QsAccreditation />
                    </ProtectedRoute>
                  }
                />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/features" element={<Features />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
              </Routes>
            </AnimatePresence>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
}

export default App;
