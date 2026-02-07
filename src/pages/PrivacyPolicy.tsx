import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft } from "lucide-react";

const PrivacyPolicy = () => (
  <>
    <Helmet>
      <title>Privacy Policy | Purely Planned Consulting</title>
      <meta name="description" content="Privacy Policy for Purely Planned Consulting. Learn how we collect, use, and protect your personal information." />
    </Helmet>

    <div className="min-h-screen bg-charcoal text-cream">
      <div className="max-w-3xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gold hover:text-gold-light font-body text-sm tracking-wide uppercase transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <h1 className="text-3xl md:text-4xl font-heading text-cream mb-2">Privacy Policy</h1>
        <p className="text-sm text-hero-muted font-body mb-10">Last Updated: February 7, 2026</p>
        <div className="h-px w-16 bg-gold mb-10" />

        <div className="space-y-8 font-body text-hero-muted leading-relaxed text-[15px]">
          <p>
            At Purely Planned Consulting, we respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information. This policy is designed to comply with applicable United States federal laws and the laws of the State of Maryland.
          </p>

          <section>
            <h2 className="font-heading text-xl text-cream mb-3">1. Information We Collect</h2>
            <h3 className="font-heading text-base text-cream mb-2">Information You Voluntarily Provide</h3>
            <p className="mb-3">
              We collect personal information that you voluntarily provide through our Client Intake Form or Quick Inquiry form, which may include:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2 mb-4">
              <li><strong className="text-cream">Contact Information:</strong> Name, email address, and phone number</li>
              <li><strong className="text-cream">Service Details:</strong> Information related to your household, lifestyle needs, or organization and concierge requests</li>
            </ul>
            <h3 className="font-heading text-base text-cream mb-2">Automatically Collected Information</h3>
            <p>
              When you visit our website, certain information may be collected automatically, including your IP address, browser type, device information, timestamps, and basic interaction data. This information is collected for security, operational integrity, and performance purposes only and is not used for advertising or profiling.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-cream mb-3">2. How We Use Your Information</h2>
            <p className="mb-3">
              We use personal information solely to operate our business and provide requested services. Specifically, we use your information to:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Respond to inquiries and requests</li>
              <li>Schedule and manage consultations or service sessions</li>
              <li>Coordinate household management or concierge services</li>
              <li>Maintain business records and ensure service quality</li>
              <li>Protect our website from misuse or unauthorized activity</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl text-cream mb-3">3. No Sale or Marketing Use of Personal Information</h2>
            <p>
              We do not sell, rent, trade, or otherwise disclose your personal information for marketing or advertising purposes. Your information is never treated as a commodity and is used exclusively within the professional relationship between you and Purely Planned Consulting.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-cream mb-3">4. Data Sharing & Third-Party Service Providers</h2>
            <p className="mb-3">
              We use trusted third-party service providers to support website functionality and security, including services such as Web3Forms (form processing) and hCaptcha (security and spam prevention).
            </p>
            <p>
              These providers act solely as data processors and are permitted to process personal information only as necessary to perform their designated technical functions. They are not authorized to use your information for their own marketing or unrelated purposes and are subject to their own privacy and security obligations.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-cream mb-3">5. Cookies & Tracking Technologies</h2>
            <p>
              Our website may use cookies or similar technologies provided by third-party service providers to ensure proper functionality, security, and form submission integrity. These technologies are not used for targeted advertising or behavioral tracking. You may control cookie preferences through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-cream mb-3">6. Data Retention</h2>
            <p>
              We retain personal information only for as long as reasonably necessary to fulfill the purposes for which it was collected, including service delivery, recordkeeping, and compliance with legal obligations. When personal information is no longer required, it is securely deleted or anonymized.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-cream mb-3">7. Security</h2>
            <p>
              We implement industry-standard administrative, technical, and physical safeguards designed to protect personal information from unauthorized access, disclosure, alteration, or destruction. This includes encrypted data transmission and modern security protocols. While no system can be guaranteed to be 100% secure, we take reasonable steps to protect your information.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-cream mb-3">8. Your Privacy Rights & Choices</h2>
            <p className="mb-3">
              You may request to access, update, correct, or delete your personal information at any time by contacting us at{" "}
              <a href="mailto:info@purelyplannedconsulting.com" className="text-gold hover:text-gold-light transition-colors">
                info@purelyplannedconsulting.com
              </a>.
            </p>
            <p>
              Depending on your state or country of residence, you may have additional privacy rights under applicable law. We honor all verified privacy rights requests in accordance with applicable legal requirements.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-cream mb-3">9. Children's Privacy</h2>
            <p>
              Our services are not directed to individuals under the age of 13, and we do not knowingly collect personal information from children. If we become aware that personal information from a child has been collected, we will promptly delete it.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-cream mb-3">10. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last Updated" date. Continued use of our website after changes are posted constitutes acceptance of the revised policy.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-cream mb-3">11. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or our privacy practices, please contact:
            </p>
            <div className="mt-3 space-y-1">
              <p className="text-cream font-medium">Purely Planned Consulting</p>
              <p>
                Email:{" "}
                <a href="mailto:info@purelyplannedconsulting.com" className="text-gold hover:text-gold-light transition-colors">
                  info@purelyplannedconsulting.com
                </a>
              </p>
              <p>
                Website:{" "}
                <a href="https://purelyplannedconsulting.com" className="text-gold hover:text-gold-light transition-colors">
                  purelyplannedconsulting.com
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  </>
);

export default PrivacyPolicy;
