import { useState } from "react";
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, CheckCircle, FileCheck, FileText, BarChart, Users } from "lucide-react";

export default function NaacAccreditation() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-accent">
      <MainNav />
      
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1569447891824-28a1e7e246fc"
          alt="NAAC Accreditation"
          className="w-full h-[300px] object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
              NAAC Accreditation
            </h1>
            <p className="text-secondary/70 max-w-2xl mx-auto">
              National Assessment and Accreditation Council
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
                <Award className="h-10 w-10 text-primary mr-4" />
                <h2 className="text-3xl font-bold text-secondary">NAAC Overview</h2>
              </div>
              <p className="text-secondary/70 mb-4">
                The National Assessment and Accreditation Council (NAAC) is an organization that assesses and accredits higher education institutions in India. NAAC is an autonomous body funded by the University Grants Commission of Government of India.
              </p>
              <p className="text-secondary/70 mb-4">
                NAAC assesses institutions based on several criteria encompassing all aspects of functioning including curriculum, teaching-learning, research, infrastructure, student support, governance, and institutional values.
              </p>
              <p className="text-secondary/70">
                Our software provides comprehensive solutions for managing the entire NAAC accreditation process, from self-study reports to final submissions.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="criteria" className="space-y-6">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="flex items-center mb-6">
                <CheckCircle className="h-10 w-10 text-primary mr-4" />
                <h2 className="text-3xl font-bold text-secondary">NAAC Criteria</h2>
              </div>
              <p className="text-secondary/70 mb-4">
                NAAC assesses institutions based on 7 criteria:
              </p>
              <ul className="list-disc pl-6 text-secondary/70 space-y-2">
                <li>Curricular Aspects</li>
                <li>Teaching-Learning and Evaluation</li>
                <li>Research, Innovations and Extension</li>
                <li>Infrastructure and Learning Resources</li>
                <li>Student Support and Progression</li>
                <li>Governance, Leadership and Management</li>
                <li>Institutional Values and Best Practices</li>
              </ul>
              <p className="text-secondary/70">
                Each criterion has key indicators that provide a framework for assessment.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="process" className="space-y-6">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="flex items-center mb-6">
                <FileCheck className="h-10 w-10 text-primary mr-4" />
                <h2 className="text-3xl font-bold text-secondary">NAAC Process</h2>
              </div>
              <p className="text-secondary/70 mb-4">
                The NAAC accreditation process involves several steps:
              </p>
              <ul className="list-disc pl-6 text-secondary/70 space-y-2">
                <li>Self-Study Report (SSR) submission</li>
                <li>Data Validation and Verification (DVV)</li>
                <li>Peer Team Visit</li>
                <li>Institutional Grading</li>
              </ul>
              <p className="text-secondary/70">
                Our software helps streamline each step of the process with automated tools and reporting.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="documents" className="space-y-6">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="flex items-center mb-6">
                <FileText className="h-10 w-10 text-primary mr-4" />
                <h2 className="text-3xl font-bold text-secondary">NAAC Documentation</h2>
              </div>
              <p className="text-secondary/70 mb-4">
                NAAC requires extensive documentation to support the assessment process. Key documents include:
              </p>
              <ul className="list-disc pl-6 text-secondary/70 space-y-2">
                <li>Institutional data</li>
                <li>Departmental reports</li>
                <li>Student records</li>
                <li>Financial statements</li>
              </ul>
              <p className="text-secondary/70">
                Our software provides a centralized repository for managing all required documents.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="benefits" className="space-y-6">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="flex items-center mb-6">
                <BarChart className="h-10 w-10 text-primary mr-4" />
                <h2 className="text-3xl font-bold text-secondary">Benefits of NAAC Accreditation</h2>
              </div>
              <p className="text-secondary/70 mb-4">
                NAAC accreditation offers several benefits:
              </p>
              <ul className="list-disc pl-6 text-secondary/70 space-y-2">
                <li>Enhances institutional quality and credibility</li>
                <li>Promotes continuous improvement</li>
                <li>Facilitates funding and grants</li>
                <li>Increases student enrollment</li>
              </ul>
              <p className="text-secondary/70">
                Our software helps institutions maximize these benefits through effective accreditation management.
              </p>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-16 text-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Get Started with NAAC Accreditation
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
