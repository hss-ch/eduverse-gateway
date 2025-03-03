import { useState } from "react";
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, CheckCircle, FileCheck, FileText, BarChart, Globe } from "lucide-react";

export default function QsAccreditation() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-accent">
      <MainNav />
      
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1"
          alt="QS Ranking"
          className="w-full h-[300px] object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
              QS World Rankings
            </h1>
            <p className="text-secondary/70 max-w-2xl mx-auto">
              Quacquarelli Symonds World University Rankings
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 md:grid-cols-5 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="criteria">Parameters</TabsTrigger>
            <TabsTrigger value="process">Process</TabsTrigger>
            <TabsTrigger value="documents">Documentation</TabsTrigger>
            <TabsTrigger value="benefits">Benefits</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="flex items-center mb-6">
                <Globe className="h-10 w-10 text-primary mr-4" />
                <h2 className="text-3xl font-bold text-secondary">QS Rankings Overview</h2>
              </div>
              <p className="text-secondary/70 mb-4">
                QS World University Rankings is an annual publication of university rankings by Quacquarelli Symonds (QS). It is one of the most widely read university rankings worldwide, along with Academic Ranking of World Universities and Times Higher Education World University Rankings.
              </p>
              <p className="text-secondary/70 mb-4">
                QS evaluates universities based on six metrics: academic reputation, employer reputation, faculty/student ratio, citations per faculty, international faculty ratio, and international student ratio.
              </p>
              <p className="text-secondary/70">
                Our software provides comprehensive solutions for managing the entire QS ranking process, from data collection to final submissions.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="criteria" className="space-y-6">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="flex items-center mb-6">
                <CheckCircle className="h-10 w-10 text-primary mr-4" />
                <h2 className="text-3xl font-bold text-secondary">QS Parameters</h2>
              </div>
              <p className="text-secondary/70 mb-4">
                QS evaluates universities based on several key parameters:
              </p>
              <ul className="list-disc pl-6 text-secondary/70 space-y-2">
                <li>Academic Reputation</li>
                <li>Employer Reputation</li>
                <li>Faculty/Student Ratio</li>
                <li>Citations per Faculty</li>
                <li>International Faculty Ratio</li>
                <li>International Student Ratio</li>
              </ul>
              <p className="text-secondary/70">
                Our software helps you collect and analyze data for each parameter to improve your QS ranking.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="process" className="space-y-6">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="flex items-center mb-6">
                FileText className="h-10 w-10 text-primary mr-4" />
                <h2 className="text-3xl font-bold text-secondary">QS Ranking Process</h2>
              </div>
              <p className="text-secondary/70 mb-4">
                The QS ranking process involves several steps:
              </p>
              <ul className="list-disc pl-6 text-secondary/70 space-y-2">
                <li>Data Collection</li>
                <li>Data Submission</li>
                <li>QS Evaluation</li>
                <li>Ranking Publication</li>
              </ul>
              <p className="text-secondary/70">
                Our software streamlines each step of the process, ensuring accurate data submission and improved ranking outcomes.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="documents" className="space-y-6">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="flex items-center mb-6">
                FileCheck className="h-10 w-10 text-primary mr-4" />
                <h2 className="text-3xl font-bold text-secondary">Required Documentation</h2>
              </div>
              <p className="text-secondary/70 mb-4">
                To participate in QS rankings, institutions need to provide the following documents:
              </p>
              <ul className="list-disc pl-6 text-secondary/70 space-y-2">
                <li>Institutional Profile</li>
                <li>Academic Data</li>
                <li>Research Output</li>
                <li>Internationalization Data</li>
              </ul>
              <p className="text-secondary/70">
                Our software helps you organize and manage all required documentation for QS submission.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="benefits" className="space-y-6">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="flex items-center mb-6">
                Users className="h-10 w-10 text-primary mr-4" />
                <h2 className="text-3xl font-bold text-secondary">Benefits of QS Ranking</h2>
              </div>
              <p className="text-secondary/70 mb-4">
                Achieving a good QS ranking can bring several benefits:
              </p>
              <ul className="list-disc pl-6 text-secondary/70 space-y-2">
                <li>Enhanced Reputation</li>
                <li>Increased Student Enrollment</li>
                <li>Improved Research Funding</li>
                <li>Global Recognition</li>
              </ul>
              <p className="text-secondary/70">
                Our software helps you improve your QS ranking and unlock these benefits for your institution.
              </p>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-16 text-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Get Started with QS Rankings
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
