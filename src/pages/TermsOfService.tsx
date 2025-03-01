import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-accent">
      <MainNav />
      
      <PageHeader 
        title="Terms of Service" 
        description="Last updated: March 2024"
      />

      <div className="container mx-auto px-6 py-12">
        <div className="prose prose-lg max-w-4xl mx-auto">
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
            <p className="text-secondary/70 mb-4">
              By accessing and using our services, you agree to be bound by these Terms of Service
              and all applicable laws and regulations.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">2. Payment Terms</h2>
            <p className="text-secondary/70 mb-4">
              Our payment terms are as follows:
            </p>
            <ul className="list-disc pl-6 text-secondary/70 space-y-2">
              <li>All prices are in USD unless otherwise stated</li>
              <li>Subscriptions are billed in advance on a monthly or annual basis</li>
              <li>Refunds are processed within 30 days of approval</li>
              <li>Late payments may result in service suspension</li>
            </ul>
            
            <h3 className="text-xl font-bold mt-6 mb-4">2.1 Payment Methods</h3>
            <p className="text-secondary/70 mb-4">We accept the following payment methods:</p>
            <ul className="list-disc pl-6 text-secondary/70 space-y-2">
              <li>Credit Cards (Visa, MasterCard, American Express)</li>
              <li>Bank Transfers</li>
              <li>PayPal</li>
              <li>Wire Transfers (for enterprise customers)</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">3. Service Usage</h2>
            <p className="text-secondary/70 mb-4">
              Guidelines for using our services:
            </p>
            <ul className="list-disc pl-6 text-secondary/70 space-y-2">
              <li>Use of services must comply with all applicable laws</li>
              <li>Account sharing is not permitted</li>
              <li>Users are responsible for maintaining account security</li>
              <li>Abuse or excessive use may result in service limitations</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">4. Termination</h2>
            <p className="text-secondary/70 mb-4">
              We reserve the right to terminate or suspend access to our services:
            </p>
            <ul className="list-disc pl-6 text-secondary/70 space-y-2">
              <li>For violation of these terms</li>
              <li>Non-payment of fees</li>
              <li>Fraudulent or illegal activities</li>
              <li>Upon user request</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">5. Contact Information</h2>
            <p className="text-secondary/70">
              For questions about these Terms of Service, please contact us at:
              <br />
              Email: legal@GuideCampus.com
              <br />
              Phone: +91 8555862483
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TermsOfService;
