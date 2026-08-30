import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black pt-32 lg:pt-56 pb-16">
      <div className="max-w-3xl mx-auto px-5 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#F39C12]/15 border border-[#F39C12]/30">
            <ShieldCheck className="w-6 h-6 text-[#F39C12]" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white">Privacy Policy</h1>
        </div>
        <p className="text-white/50 text-sm mb-10">Last updated: August 2026</p>

        <div className="space-y-8 text-white/70 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Information We Collect</h2>
            <p>
              When you create an account, we collect your full name, email address, phone number, and
              optionally your company name. When you use our design tools, we also collect uploaded
              vehicle photos, logos, reference files, and design specifications.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. How We Use Your Information</h2>
            <p>
              Uploaded vehicle photos, logos, and contact information will only be used to:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-1.5">
              <li>Create vehicle design concepts and mockups</li>
              <li>Provide quotations for wrapping and signage services</li>
              <li>Communicate with you about your project</li>
            </ul>
            <p className="mt-3">
              Your data is never shared with third parties for marketing purposes. If you opt in to
              marketing communications, you will only receive SIGN AD offers, design tips, and
              promotions directly from us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Data Access & Control</h2>
            <p>
              Customers may only view, edit, and delete their own projects and uploaded files. Admin
              users may access customer projects solely for design, quotation, and customer-service
              purposes. You have the right to:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-1.5">
              <li>Access and review your personal data and designs</li>
              <li>Update your account information at any time</li>
              <li>Delete your account and associated data</li>
              <li>Withdraw marketing consent at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Data Storage & Security</h2>
            <p>
              Your data is stored securely on our platform. We use industry-standard security measures
              to protect your personal information and designs from unauthorised access, alteration, or
              disclosure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. File Uploads</h2>
            <p>
              When you upload vehicle photos, logos, or reference files, you confirm that you have
              permission to use these materials. These files are used exclusively for creating your
              design concepts and quotations and are not shared externally without your consent.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Cookies</h2>
            <p>
              We use essential cookies to maintain your session and provide our services. We do not
              use tracking cookies for third-party advertising.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Account Deletion</h2>
            <p>
              You can delete your account at any time from your account settings. Upon deletion, all
              your projects, uploaded files, and associated data will be permanently removed.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Contact</h2>
            <p>
              If you have questions about our Privacy Policy or how your data is handled, please{" "}
              <Link to="/contact" className="text-[#F39C12] font-medium hover:underline">contact us</Link>.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <Link to="/" className="text-[#F39C12] font-medium hover:underline">&larr; Back to Home</Link>
        </div>
      </div>
    </div>
  );
}