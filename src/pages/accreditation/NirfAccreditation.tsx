import { useState } from "react";
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, CheckCircle, FileCheck, FileText, BookOpen, Users } from "lucide-react";

export default function NirfAccreditation() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-accent">
      <MainNav />
      
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1509062522246-3755977927d7"
          alt="NIRF Accreditation"
          className="w-full h-[300px] object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
              NIRF Ranking
            </h1>
            <p className="text-secondary/70 max-w-2xl mx-auto">
              National Institutional Ranking Framework
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
                <BarChart className="h-10 w-10 text-primary mr-4" />
                <h2 className="text-3xl font-bold text-secondary">NIRF Overview</h2>
              </div>
              <p className="text-secondary/70 mb-4">
                The National Institutional Ranking Framework (NIRF) is a methodology adopted by the Ministry of Education, Government of India, to rank institutions of higher education in India. NIRF was launched in 2015 and the first rankings were released in 2016.
              </p>
              <p className="text-secondary/70 mb-4">
                NIRF outlines a methodology to rank institutions across the country based on parameters such as teaching, learning and resources, research and professional practices, graduation outcomes, outreach and inclusivity, and perception.
              </p>
              <p className="text-secondary/70">
                Our software provides comprehensive solutions for managing the entire NIRF ranking process, from data collection to final submissions.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="criteria" className="space-y-6">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-secondary mb-6">
                Why Choose NIRF Ranking?
              </h2>
              <p className="text-secondary/70 mb-6">
                NIRF provides a comprehensive methodology to rank institutions across India. 
                It evaluates institutions based on multiple parameters including teaching, 
                research, employability, and social inclusion.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex items-center space-x-4 p-4 bg-blue-100 rounded-lg">
                  <BarChart className="w-8 h-8 text-blue-600" />
                  <span className="text-blue-800">Performance Metrics</span>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-green-100 rounded-lg">
                  <GraduationCap className="w-8 h-8 text-green-600" />
                  <span className="text-green-800">Academic Excellence</span>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-purple-100 rounded-lg">
                  <Users className="w-8 h-8 text-purple-600" />
                  <span className="text-purple-800">Stakeholder Perception</span>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="process" className="space-y-6">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-secondary mb-6">
                NIRF Process
              </h2>
              <p className="text-secondary/70 mb-6">
                NIRF follows a structured process to rank institutions. The process involves data collection, analysis, and evaluation of various parameters.
              </p>
              <p className="text-secondary/70">
                Our software automates the entire NIRF process, from data collection to final submissions.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="documents" className="space-y-6">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-secondary mb-6">
                NIRF Documents
              </h2>
              <p className="text-secondary/70 mb-6">
                NIRF requires institutions to submit various documents to be considered for ranking. Our software helps institutions prepare and submit these documents efficiently.
              </p>
              <p className="text-secondary/70">
                Our software provides comprehensive documentation templates and guides to help institutions prepare and submit their documents.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="benefits" className="space-y-6">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-secondary mb-6">
                NIRF Benefits
              </h2>
              <p className="text-secondary/70 mb-6">
                NIRF provides institutions with a comprehensive ranking that helps them identify their strengths and weaknesses. It also helps institutions attract students, faculty, and funding.
              </p>
              <p className="text-secondary/70">
                Our software provides comprehensive solutions for managing the entire NIRF ranking process, from data collection to final submissions.
              </p>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-16 text-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Get Started with NIRF Ranking
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
