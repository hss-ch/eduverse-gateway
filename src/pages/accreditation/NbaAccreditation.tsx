import { useState } from "react";
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, CheckCircle, FileCheck, FileText, BarChart, Users } from "lucide-react";

export default function NbaAccreditation() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-accent">
      <MainNav />
      
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1606761568499-6d2451b23c66"
          alt="NBA Accreditation"
          className="w-full h-[300px] object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
              NBA Accreditation
            </h1>
            <p className="text-secondary/70 max-w-2xl mx-auto">
              National Board of Accreditation
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
                <CheckCircle className="h-10 w-10 text-primary mr-4" />
                <h2 className="text-3xl font-bold text-secondary">NBA Overview</h2>
              </div>
              <p className="text-secondary/70 mb-4">
                The National Board of Accreditation (NBA) is an autonomous organization in India that evaluates technical education programs based on various quality parameters. NBA focuses on outcome-based education and assesses programs rather than institutions.
              </p>
              <p className="text-secondary/70 mb-4">
                NBA accreditation ensures that the program meets certain specified norms and standards set by the accreditation agency in terms of curriculum, infrastructure, faculty, research, and other parameters.
              </p>
              <p className="text-secondary/70">
                Our software provides comprehensive solutions for managing the entire NBA accreditation process, from self-assessment reports to final submissions.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="criteria" className="space-y-6">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="flex items-center mb-6">
                <CheckCircle className="h-10 w-10 text-primary mr-4" />
                <h2 className="text-3xl font-bold text-secondary">NBA Criteria</h2>
              </div>
              <p className="text-secondary/70 mb-4">
                NBA assesses programs based on the following criteria:
              </p>
              <ul className="list-disc pl-6 text-secondary/70 space-y-2">
                <li>Curriculum and Teaching-Learning Processes</li>
                <li>Faculty Information and Contributions</li>
                <li>Infrastructure and Learning Resources</li>
                <li>Student Performance</li>
                <li>Governance, Institutional Support, and Financial Resources</li>
              </ul>
              <p className="text-secondary/70">
                Our software helps you manage and document all the necessary information for each criterion.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="process" className="space-y-6">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="flex items-center mb-6">
                <FileCheck className="h-10 w-10 text-primary mr-4" />
                <h2 className="text-3xl font-bold text-secondary">NBA Process</h2>
              </div>
              <p className="text-secondary/70 mb-4">
                The NBA accreditation process typically involves the following steps:
              </p>
              <ul className="list-disc pl-6 text-secondary/70 space-y-2">
                <li>Self-Assessment Report (SAR) Preparation</li>
                <li>Submission of SAR to NBA</li>
                <li>NBA Expert Team Visit</li>
                <li>Evaluation and Accreditation Decision</li>
              </ul>
              <p className="text-secondary/70">
                Our software streamlines each step of the process, ensuring accurate and timely submissions.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="documents" className="space-y-6">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="flex items-center mb-6">
                <FileText className="h-10 w-10 text-primary mr-4" />
                <h2 className="text-3xl font-bold text-secondary">NBA Documentation</h2>
              </div>
              <p className="text-secondary/70 mb-4">
                Key documents required for NBA accreditation include:
              </p>
              <ul className="list-disc pl-6 text-secondary/70 space-y-2">
                <li>Self-Assessment Report (SAR)</li>
                <li>Program Curriculum</li>
                <li>Faculty Profiles</li>
                <li>Student Records</li>
                <li>Infrastructure Details</li>
              </ul>
              <p className="text-secondary/70">
                Our software provides a centralized repository for all your NBA-related documents.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="benefits" className="space-y-6">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="flex items-center mb-6">
                <Award className="h-10 w-10 text-primary mr-4" />
                <h2 className="text-3xl font-bold text-secondary">Benefits of NBA Accreditation</h2>
              </div>
              <p className="text-secondary/70 mb-4">
                NBA accreditation offers several benefits, including:
              </p>
              <ul className="list-disc pl-6 text-secondary/70 space-y-2">
                <li>Enhanced Program Quality</li>
                <li>Improved Student Outcomes</li>
                <li>Recognition and Credibility</li>
                <li>Global Competitiveness</li>
              </ul>
              <p className="text-secondary/70">
                Our software helps you achieve and maintain NBA accreditation, ensuring long-term success.
              </p>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-16 text-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Get Started with NBA Accreditation
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
