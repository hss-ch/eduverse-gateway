import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Blog from "@/pages/Blog";
import BlogView from "@/pages/BlogView";
import BlogNew from "@/pages/BlogNew";
import { BlogLayout } from "@/components/blog/BlogLayout";
import Pricing from "@/pages/Pricing";
import Features from "@/pages/Features";
import AdmissionsManagement from "@/pages/features/AdmissionsManagement";
import StudentManagement from "@/pages/features/StudentManagement";
import StaffManagement from "@/pages/features/StaffManagement";
import ExaminationManagement from "@/pages/features/ExaminationManagement";
import TimetablesManagement from "@/pages/features/TimetablesManagement";
import AttendanceManagement from "@/pages/features/AttendanceManagement";
import FeeManagement from "@/pages/features/FeeManagement";
import PaymentGateway from "@/pages/features/PaymentGateway";
import OnlineExamination from "@/pages/features/OnlineExamination";
import OnlineFeedback from "@/pages/features/OnlineFeedback";
import CertificateGeneration from "@/pages/features/CertificateGeneration";
import Notifications from "@/pages/features/Notifications";
import Careers from "@/pages/Careers";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import Academic from "@/pages/Academic";
import Administrative from "@/pages/Administrative";
import Planning from "@/pages/Planning";
import Accreditation from "@/pages/Accreditation";
import NaacAccreditation from "@/pages/accreditation/NaacAccreditation";
import NbaAccreditation from "@/pages/accreditation/NbaAccreditation";
import AbetAccreditation from "@/pages/accreditation/AbetAccreditation";
import NirfAccreditation from "@/pages/accreditation/NirfAccreditation";
import QsAccreditation from "@/pages/accreditation/QsAccreditation";
import Dashboard from "@/pages/Dashboard";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import HostelManagement from "@/pages/features/HostelManagement";
import TransportManagement from "@/pages/features/TransportManagement";
import GrievanceRedressal from "@/pages/features/GrievanceRedressal";
import LeaveManagement from "@/pages/features/LeaveManagement";
import PayrollManagement from "@/pages/features/PayrollManagement";
import LibraryManagement from "@/pages/features/LibraryManagement";
import AcademicPlanning from "@/pages/features/AcademicPlanning";
import InventoryManagement from "@/pages/features/InventoryManagement";
import ReportsAnalytics from "@/pages/features/ReportsAnalytics";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
    },
  },
});

function App() {
  console.log("App rendering");
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<BlogLayout />}>
                <Route index element={<Blog />} />
                <Route path="new" element={
                  <ProtectedRoute>
                    <BlogNew />
                  </ProtectedRoute>
                } />
                <Route path=":id" element={<BlogView />} />
              </Route>
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/features" element={<Features />} />
              <Route path="/features/admissions" element={<AdmissionsManagement />} />
              <Route path="/features/student-management" element={<StudentManagement />} />
              <Route path="/features/staff-management" element={<StaffManagement />} />
              <Route path="/features/examination" element={<ExaminationManagement />} />
              <Route path="/features/timetables" element={<TimetablesManagement />} />
              <Route path="/features/attendance" element={<AttendanceManagement />} />
              <Route path="/features/fee-management" element={<FeeManagement />} />
              <Route path="/features/payment" element={<PaymentGateway />} />
              <Route path="/features/online-exam" element={<OnlineExamination />} />
              <Route path="/features/feedback" element={<OnlineFeedback />} />
              <Route path="/features/certificates" element={<CertificateGeneration />} />
              <Route path="/features/notifications" element={<Notifications />} />
              <Route path="/features/hostel" element={<HostelManagement />} />
              <Route path="/features/transport" element={<TransportManagement />} />
              <Route path="/features/grievance" element={<GrievanceRedressal />} />
              <Route path="/features/leave" element={<LeaveManagement />} />
              <Route path="/features/payroll" element={<PayrollManagement />} />
              <Route path="/features/library" element={<LibraryManagement />} />
              <Route path="/features/academic-planning" element={<AcademicPlanning />} />
              <Route path="/features/inventory" element={<InventoryManagement />} />
              <Route path="/features/reports" element={<ReportsAnalytics />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              
              {/* Solution Routes - No Authentication Required */}
              <Route path="/academic" element={<Academic />} />
              <Route path="/administrative" element={<Administrative />} />
              <Route path="/planning" element={<Planning />} />
              <Route path="/accreditation" element={<Accreditation />} />
              <Route path="/accreditation/naac" element={<NaacAccreditation />} />
              <Route path="/accreditation/nba" element={<NbaAccreditation />} />
              <Route path="/accreditation/abet" element={<AbetAccreditation />} />
              <Route path="/accreditation/nirf" element={<NirfAccreditation />} />
              <Route path="/accreditation/qs" element={<QsAccreditation />} />

              {/* Protected Routes */}
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
