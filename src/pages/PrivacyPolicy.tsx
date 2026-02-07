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
            At Purely Planned Consulting, we respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy outlines how we collect, use, and safeguard your information in compliance with United States federal laws and the laws of the State of Maryland.
          </p>

          <section>
            <h2 className="font-heading text-xl text-cream mb-3">1. Information We Collect</h2>
            <p className="mb-3">
              We only collect information that you voluntarily provide to us through our Client Intake Form or our Quick Inquiry form. This may include:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li><strong className="text-cream">Contact Information:</strong> Name, email address, and phone number.</li>
              <li><strong className="text-cream">Service Details:</strong> Information regarding your household, lifestyle needs, or specific organization projects.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl text-cream mb-3">2. How We Use Your Information</h2>
            <p className="mb-3">
              Your data is used exclusively for the purpose of providing our services and communicating directly with you. We use your information to:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Respond to your initial inquiries.</li>
              <li>Schedule and manage your consultations or service sessions.</li>
              <li>Coordinate household management or concierge tasks as requested.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl text-cream mb-3">3. Our "No-Sale" Guarantee</h2>
            <p>
              We do not sell, rent, trade, or otherwise share your personal information with third parties for marketing purposes. Your data is never treated as a commodity. It is used solely for the professional relationship between you and Purely Planned Consulting.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-cream mb-3">4. Data Sharing & Third-Party Services</h2>
            <p>
              To facilitate our website operations, we use trusted third-party service providers (such as Web3Forms for form processing and hCaptcha for security). These providers are only permitted to process your information as necessary to perform these specific technical functions and are bound by their own privacy protections.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-cream mb-3">5. Maryland Privacy Rights</h2>
            <p>
              In accordance with Maryland state consumer protections, we maintain high standards for data discretion. We prioritize the confidentiality of our clients, many of whom require the highest levels of professional privacy due to their public or sensitive roles.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-cream mb-3">6. Security</h2>
            <p>
              We implement industry-standard security measures to protect your data. This includes using encrypted transmission for our forms and utilizing modern security protocols to prevent unauthorized access.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-cream mb-3">7. Your Choices</h2>
            <p>
              You may request to review, update, or delete your personal information at any time by contacting us directly at{" "}
              <a href="mailto:info@purelyplannedconsulting.com" className="text-gold hover:text-gold-light transition-colors">
                info@purelyplannedconsulting.com
              </a>.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-cream mb-3">8. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or our privacy practices, please contact:
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
