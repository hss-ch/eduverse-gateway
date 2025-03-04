
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { ChatWithUs } from "@/components/chat/ChatWithUs";

import Index from "@/pages/Index";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Features from "@/pages/Features";
import Pricing from "@/pages/Pricing";
import Academic from "@/pages/Academic";
import Administrative from "@/pages/Administrative";
import Planning from "@/pages/Planning";
import Auth from "@/pages/Auth";
import Careers from "@/pages/Careers";
import TermsOfService from "@/pages/TermsOfService";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import Accreditation from "@/pages/Accreditation";
import NaacAccreditation from "@/pages/accreditation/NaacAccreditation";
import NbaAccreditation from "@/pages/accreditation/NbaAccreditation";
import AbetAccreditation from "@/pages/accreditation/AbetAccreditation";
import NirfAccreditation from "@/pages/accreditation/NirfAccreditation";
import QsAccreditation from "@/pages/accreditation/QsAccreditation";
import Blog from "@/pages/Blog";
import BlogView from "@/pages/BlogView";
import BlogEdit from "@/pages/BlogEdit";
import BlogNew from "@/pages/BlogNew";
import BlogPortal from "@/pages/BlogPortal";
import { ProtectedRoutes } from "@/routes/ProtectedRoutes";
import Dashboard from "@/pages/Dashboard";
import AcademicPlanning from "@/pages/features/AcademicPlanning";
import AdmissionsManagement from "@/pages/features/AdmissionsManagement";
import ExaminationManagement from "@/pages/features/ExaminationManagement";
import OnlineExamination from "@/pages/features/OnlineExamination";
import TimetablesManagement from "@/pages/features/TimetablesManagement";
import AttendanceManagement from "@/pages/features/AttendanceManagement";
import StudentManagement from "@/pages/features/StudentManagement";
import StaffManagement from "@/pages/features/StaffManagement";
import HostelManagement from "@/pages/features/HostelManagement";
import TransportManagement from "@/pages/features/TransportManagement";
import LibraryManagement from "@/pages/features/LibraryManagement";
import FeeManagement from "@/pages/features/FeeManagement";
import PayrollManagement from "@/pages/features/PayrollManagement";
import InventoryManagement from "@/pages/features/InventoryManagement";
import OnlineFeedback from "@/pages/features/OnlineFeedback";
import GrievanceRedressal from "@/pages/features/GrievanceRedressal";
import LeaveManagement from "@/pages/features/LeaveManagement";
import CertificateGeneration from "@/pages/features/CertificateGeneration";
import PaymentGateway from "@/pages/features/PaymentGateway";
import Notifications from "@/pages/features/Notifications";
import ReportsAnalytics from "@/pages/features/ReportsAnalytics";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="app">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/academic" element={<Academic />} />
            <Route path="/administrative" element={<Administrative />} />
            <Route path="/planning" element={<Planning />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/accreditation" element={<Accreditation />} />
            <Route path="/accreditation/naac" element={<NaacAccreditation />} />
            <Route path="/accreditation/nba" element={<NbaAccreditation />} />
            <Route path="/accreditation/abet" element={<AbetAccreditation />} />
            <Route path="/accreditation/nirf" element={<NirfAccreditation />} />
            <Route path="/accreditation/qs" element={<QsAccreditation />} />
            <Route path="/blog" element={<Outlet />}>
              <Route index element={<Blog />} />
              <Route path=":id" element={<BlogView />} />
              <Route path=":id/edit" element={<BlogEdit />} />
              <Route path="new" element={<BlogNew />} />
              <Route path="portal" element={<BlogPortal />} />
            </Route>
            <Route path="/features/academic-planning" element={<AcademicPlanning />} />
            <Route path="/features/admissions-management" element={<AdmissionsManagement />} />
            <Route path="/features/examination-management" element={<ExaminationManagement />} />
            <Route path="/features/online-examination" element={<OnlineExamination />} />
            <Route path="/features/timetables-management" element={<TimetablesManagement />} />
            <Route path="/features/attendance-management" element={<AttendanceManagement />} />
            <Route path="/features/student-management" element={<StudentManagement />} />
            <Route path="/features/staff-management" element={<StaffManagement />} />
            <Route path="/features/hostel-management" element={<HostelManagement />} />
            <Route path="/features/transport-management" element={<TransportManagement />} />
            <Route path="/features/library-management" element={<LibraryManagement />} />
            <Route path="/features/fee-management" element={<FeeManagement />} />
            <Route path="/features/payroll-management" element={<PayrollManagement />} />
            <Route path="/features/inventory-management" element={<InventoryManagement />} />
            <Route path="/features/online-feedback" element={<OnlineFeedback />} />
            <Route path="/features/grievance-redressal" element={<GrievanceRedressal />} />
            <Route path="/features/leave-management" element={<LeaveManagement />} />
            <Route path="/features/certificate-generation" element={<CertificateGeneration />} />
            <Route path="/features/payment-gateway" element={<PaymentGateway />} />
            <Route path="/features/notifications" element={<Notifications />} />
            <Route path="/features/reports-analytics" element={<ReportsAnalytics />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
          <Toaster />
          <ChatWithUs />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
