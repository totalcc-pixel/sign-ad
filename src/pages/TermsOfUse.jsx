import React from "react";
import { Link } from "react-router-dom";
import { FileText } from "lucide-react";

export default function TermsOfUse() {
  return (
    <div className="min-h-screen bg-black pt-32 lg:pt-56 pb-16">
      <div className="max-w-3xl mx-auto px-5 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#F39C12]/15 border border-[#F39C12]/30">
            <FileText className="w-6 h-6 text-[#F39C12]" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white">Terms of Use</h1>
        </div>
        <p className="text-white/50 text-sm mb-10">Last updated: August 2026</p>

        <div className="space-y-8 text-white/70 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the SIGN AD website and services, you agree to be bound by these
              Terms of Use. If you do not agree with any part of these terms, please do not use our
              services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Services</h2>
            <p>
              SIGN AD provides vehicle wrap design concepts, mockup generation, and quotation services
              for vinyl wrapping, signage, and vehicle graphics. We reserve the right to modify,
              suspend, or discontinue any service at any time without notice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. User Accounts</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account credentials and
              for all activities that occur under your account. You must be at least 18 years old to
              create an account. You agree to provide accurate and complete information during
              registration and to keep it updated.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. User Content & Permissions</h2>
            <p>
              You confirm that you have the legal right and permission to upload and use any vehicle
              photos, logos, and business materials you submit to our platform. You retain ownership
              of your content but grant SIGN AD a non-exclusive licence to use it solely for creating
              design concepts, providing quotations, and communicating with you.
            </p>
            <p className="mt-3">
              Uploaded vehicle photos, logos, and contact information will only be used to create
              vehicle design concepts, provide quotations, and communicate with the customer. Your
              data is never shared with third parties for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Data Access</h2>
            <p>
              Customers may only view, edit, and delete their own projects and uploaded files. Admin
              users may access customer projects solely for design, quotation, and customer-service
              purposes. SIGN AD will not sell or distribute your personal information or designs to
              third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Intellectual Property</h2>
            <p>
              All design concepts, mockups, and quotations provided by SIGN AD remain the intellectual
              property of SIGN AD until full payment is received. You may not reproduce, distribute, or
              use our designs for purposes other than evaluating our services without prior written
              consent.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Limitation of Liability</h2>
            <p>
              SIGN AD provides design concepts and mockups for illustrative purposes. Final results
              may vary based on vehicle condition, material availability, and installation factors.
              We are not liable for any indirect, incidental, or consequential damages arising from
              the use of our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Termination</h2>
            <p>
              You may delete your account at any time. SIGN AD reserves the right to suspend or
              terminate accounts that violate these Terms of Use or engage in unlawful activity.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">9. Contact</h2>
            <p>
              If you have questions about these Terms of Use, please{" "}
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