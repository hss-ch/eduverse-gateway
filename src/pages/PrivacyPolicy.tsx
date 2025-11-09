
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
              When you use the app, we may collect the following information:
            </p>
            <ul className="list-disc pl-6 text-secondary/70 space-y-2">
              <li>User-provided data: Name, email, institution, or other details you submit while using the app.</li>
              <li>Usage data: App interactions, analytics data, and performance metrics.</li>
              <li>Payment information</li>
              <li>Device information: Device type, operating system, and app version.</li>
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
            <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
            <p className="text-secondary/70 mb-4">
              We use the collected information to:
            </p>
            <ul className="list-disc pl-6 text-secondary/70 space-y-2">
              <li>Provide and improve the app’s features and performance.</li>
              <li>Analyze campus analytics and automation workflows.</li>
              <li>Communicate important updates or announcements (if you consent).</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">4. Sharing Your Information</h2>
            <p className="text-secondary/70 mb-4">
              We do not sell or share your personal data with third parties, except:
            </p>
            <ul className="list-disc pl-6 text-secondary/70 space-y-2">
              <li>With service providers who help us operate the app (e.g., analytics services), strictly under contractual agreements.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">5. GDPR and EU Users</h2>
            <p className="text-secondary/70 mb-4">
              If you are located in the European Union, you have the following rights under GDPR:
            </p>
            <ul className="list-disc pl-6 text-secondary/70 space-y-2">
              <li>Access: Request a copy of your personal data.</li>
              <li>Correction: Request that we correct inaccurate data.</li>
              <li>Deletion: Request that we delete your personal data.</li>
              <li>Withdrawal of Consent: Withdraw consent for data processing at any time.</li>
            </ul>
            <p className="text-secondary/70 mb-4">
              To exercise these rights, contact us at support@guidecampus.com.
            </p>            
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">6. Data Security</h2>
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
            <h2 className="text-2xl font-bold mb-4">7. Children’s Privacy</h2>
            <p className="text-secondary/70 mb-4">
              The app is intended for use by students and staff in educational institutions. We do not knowingly collect personal data from children under 13 without parental consent.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">8. Changes to This Privacy Policy</h2>
            <p className="text-secondary/70 mb-4">
              We may update this Privacy Policy occasionally. We will notify users through the app or by updating the Effective Date.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">9. Contact Us</h2>
            <p className="text-secondary/70">
              If you have any questions about our Privacy Policy, please contact us at:
              <br />
              Email: support@guidecampus.com
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
