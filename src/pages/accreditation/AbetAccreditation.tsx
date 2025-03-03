import { useState } from "react";
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, CheckCircle, FileCheck, FileText, BarChart, Users } from "lucide-react";

export default function AbetAccreditation() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-accent">
      <MainNav />
      
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1513530534585-c7b1394c6d51"
          alt="ABET Accreditation"
          className="w-full h-[300px] object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
              ABET Accreditation
            </h1>
            <p className="text-secondary/70 max-w-2xl mx-auto">
              Accreditation Board for Engineering and Technology
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 md:grid-cols-5 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="criteria">Criteria</TabsTrigger>
            <TabsTrigger value="process">Process</TabsTrigger>
            <TabsTrigger value="documents">Documentation</TabsTrigger>
            <TabsTrigger value="benefits">Benefits</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="flex items-center mb-6">
                <BookOpen className="h-10 w-10 text-primary mr-4" />
                <h2 className="text-3xl font-bold text-secondary">ABET Overview</h2>
              </div>
              <p className="text-secondary/70 mb-4">
                ABET (Accreditation Board for Engineering and Technology) is a non-governmental organization that accredits college and university programs in the disciplines of applied and natural science, computing, engineering, and engineering technology.
              </p>
              <p className="text-secondary/70 mb-4">
                ABET accreditation provides assurance that a college or university program meets the quality standards of the profession for which that program prepares graduates.
              </p>
              <p className="text-secondary/70">
                Our software provides comprehensive solutions for managing the entire ABET accreditation process, from self-study reports to final submissions.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="criteria" className="space-y-6">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="flex items-center mb-6">
                <CheckCircle className="h-10 w-10 text-primary mr-4" />
                <h2 className="text-3xl font-bold text-secondary">ABET Criteria</h2>
              </div>
              <p className="text-secondary/70 mb-4">
                ABET accreditation is globally recognized and ensures that programs meet the quality standards of the technical profession for which they prepare students.
              </p>
              <p className="text-secondary/70 mb-4">
                Our software provides comprehensive solutions for managing the entire ABET accreditation process, from self-study reports to final submissions.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="process" className="space-y-6">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="flex items-center mb-6">
                <FileCheck className="h-10 w-10 text-primary mr-4" />
                <h2 className="text-3xl font-bold text-secondary">ABET Process</h2>
              </div>
              <p className="text-secondary/70 mb-4">
                ABET accreditation is globally recognized and ensures that programs meet the quality standards of the technical profession for which they prepare students.
              </p>
              <p className="text-secondary/70 mb-4">
                Our software provides comprehensive solutions for managing the entire ABET accreditation process, from self-study reports to final submissions.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="documents" className="space-y-6">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="flex items-center mb-6">
                <FileText className="h-10 w-10 text-primary mr-4" />
                <h2 className="text-3xl font-bold text-secondary">ABET Documents</h2>
              </div>
              <p className="text-secondary/70 mb-4">
                ABET accreditation is globally recognized and ensures that programs meet the quality standards of the technical profession for which they prepare students.
              </p>
              <p className="text-secondary/70 mb-4">
                Our software provides comprehensive solutions for managing the entire ABET accreditation process, from self-study reports to final submissions.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="benefits" className="space-y-6">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="flex items-center mb-6">
                <BarChart className="h-10 w-10 text-primary mr-4" />
                <h2 className="text-3xl font-bold text-secondary">ABET Benefits</h2>
              </div>
              <p className="text-secondary/70 mb-4">
                ABET accreditation is globally recognized and ensures that programs meet the quality standards of the technical profession for which they prepare students.
              </p>
              <p className="text-secondary/70 mb-4">
                Our software provides comprehensive solutions for managing the entire ABET accreditation process, from self-study reports to final submissions.
              </p>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-16 text-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Get Started with ABET Accreditation
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
