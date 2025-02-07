import React from 'react';
import { Route } from 'react-router-dom';
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Blog from "@/pages/Blog";
import BlogView from "@/pages/BlogView";
import { BlogLayout } from "@/components/blog/BlogLayout";
import Pricing from "@/pages/Pricing";
import Features from "@/pages/Features";
import AdmissionsManagement from "@/pages/features/AdmissionsManagement";
import StudentManagement from "@/pages/features/StudentManagement";
import Careers from "@/pages/Careers";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";

export const PublicRoutes = () => {
  return (
    <>
      <Route path="/" element={<Index />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/blog" element={<BlogLayout />}>
        <Route index element={<Blog />} />
        <Route path=":id" element={<BlogView />} />
      </Route>
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/features" element={<Features />} />
      <Route path="/features/admissions" element={<AdmissionsManagement />} />
      <Route path="/features/student-management" element={<StudentManagement />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
    </>
  );
};