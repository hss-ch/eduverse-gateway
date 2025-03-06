
import React from 'react';
import { Route } from 'react-router-dom';
import { ProtectedRoute } from "./ProtectedRoute";
import Academic from "@/pages/Academic";
import Administrative from "@/pages/Administrative";
import Planning from "@/pages/Planning";
import Accreditation from "@/pages/Accreditation";
import NaacAccreditation from "@/pages/accreditation/NaacAccreditation";
import NbaAccreditation from "@/pages/accreditation/NbaAccreditation";
import AbetAccreditation from "@/pages/accreditation/AbetAccreditation";
import NirfAccreditation from "@/pages/accreditation/NirfAccreditation";
import QsAccreditation from "@/pages/accreditation/QsAccreditation";
import BlogNew from "@/pages/BlogNew";
import BlogEdit from "@/pages/BlogEdit";
import Dashboard from "@/pages/Dashboard";
import Partners from "@/pages/Partners";

export const ProtectedRoutes = () => {
  return (
    <>
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
      <Route
        path="/blog/new"
        element={
          <ProtectedRoute>
            <BlogNew />
          </ProtectedRoute>
        }
      />
      <Route
        path="/blog/edit/:id"
        element={
          <ProtectedRoute>
            <BlogEdit />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/partners"
        element={
          <ProtectedRoute>
            <Partners />
          </ProtectedRoute>
        }
      />
    </>
  );
};
