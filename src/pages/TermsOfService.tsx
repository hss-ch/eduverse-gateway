
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-accent">
      <MainNav />
      
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1589578527966-fdac0f44566c"
          alt="Terms of Service"
          className="w-full h-[300px] object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
              Terms of Service
            </h1>
            <p className="text-secondary/70 max-w-2xl mx-auto">
              Last updated: March 2024
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="prose prose-lg max-w-4xl mx-auto">
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
            <p className="text-secondary/70 mb-4">
              By using the app, you agree to comply with these Terms and all applicable laws. If you do not agree, you may not use the App.
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
            <h2 className="text-2xl font-bold mb-4">3. Eligibility</h2>
            <p className="text-secondary/70 mb-4">
              The App is intended for students, staff, and authorized users of educational institutions. By using the App, you confirm that you meet any eligibility requirements.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">4. Use of the App</h2>
            <p className="text-secondary/70 mb-4">
              Guidelines for using our services:
            </p>
            <ul className="list-disc pl-6 text-secondary/70 space-y-2">
              <li>You agree to use the App only for lawful purposes and in accordance with these Terms.</li>
              <li>You will not misuse, interfere with, or attempt to compromise the App, servers, or networks.</li>
              <li>Any data you input should be accurate and lawful.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">5. Account Responsibility</h2>
            <p className="text-secondary/70 mb-4">
              If the App requires an account:
            </p>
            <ul className="list-disc pl-6 text-secondary/70 space-y-2">
              <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
              <li>You are responsible for all activities that occur under your account.</li>
              <li>Notify us immediately of any unauthorized use.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">6. Privacy</h2>
            <p className="text-secondary/70 mb-4">
              Your use of the App is also governed by our <Link to="/privacy-policy" className="font-bold">Privacy Policy</Link>. Please review it to understand how we collect, use, and protect your data.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">7. Intellectual Property</h2>
            <ul className="list-disc pl-6 text-secondary/70 space-y-2">
              <li>All content, software, and materials provided in the App are owned by or licensed to the app.</li>
              <li>You may not copy, modify, distribute, or create derivative works without prior written permission.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">8. Disclaimers</h2>
            <ul className="list-disc pl-6 text-secondary/70 space-y-2">
              <li>The App is provided “as-is” and “as available.”</li>
              <li>We do not guarantee that the App will be uninterrupted, error-free, or completely secure.</li>
              <li>Use of the App is at your own risk.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">9. Limitation of Liability</h2>
            <p className="text-secondary/70 mb-4">
              To the maximum extent permitted by law, the app will not be liable for any direct, indirect, incidental, or consequential damages arising from your use of the App.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">10. Termination</h2>
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
            <h2 className="text-2xl font-bold mb-4">11. Governing Law</h2>
            <p className="text-secondary/70 mb-4">
              These Terms are governed by the laws of India. Any disputes will be resolved in the applicable courts.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">12. Changes to Terms</h2>
            <p className="text-secondary/70 mb-4">
              We may update these Terms from time to time. Updates will be posted on the App or our website with an updated “Effective Date.” Your continued use constitutes acceptance of the revised Terms.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">13. Contact Information</h2>
            <p className="text-secondary/70">
              For questions about these Terms of Service, please contact us at:
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

export default TermsOfService;
