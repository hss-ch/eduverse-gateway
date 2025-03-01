
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-accent">
      <MainNav />
      
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40"
          alt="Privacy Policy"
          className="w-full h-[300px] object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20" />
      </div>
      
      <section className="relative -mt-20 px-6">
        <div className="container">
          <PageHeader 
            title="Privacy Policy" 
            description="Last updated: March 2024"
          />
        </div>
      </section>

      <div className="container mx-auto px-6 py-12">
        <div className="prose prose-lg max-w-4xl mx-auto">
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
            <p className="text-secondary/70 mb-4">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 text-secondary/70 space-y-2">
              <li>Name and contact information</li>
              <li>Institution details</li>
              <li>Payment information</li>
              <li>Usage data and preferences</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">2. Payment Information</h2>
            <p className="text-secondary/70 mb-4">
              We process payments through secure payment gateways. When you make a payment:
            </p>
            <ul className="list-disc pl-6 text-secondary/70 space-y-2">
              <li>All transactions are encrypted and secure</li>
              <li>We accept major credit cards and bank transfers</li>
              <li>Payment information is never stored on our servers</li>
              <li>Receipts are automatically generated and sent via email</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">3. Data Security</h2>
            <p className="text-secondary/70 mb-4">
              We implement appropriate security measures to protect your personal information:
            </p>
            <ul className="list-disc pl-6 text-secondary/70 space-y-2">
              <li>SSL encryption for all data transmission</li>
              <li>Regular security audits</li>
              <li>Access controls and authentication</li>
              <li>Data backup and recovery procedures</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">4. Contact Us</h2>
            <p className="text-secondary/70">
              If you have any questions about our Privacy Policy, please contact us at:
              <br />
              Email: privacy@GuideCampus.com
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

export default PrivacyPolicy;
