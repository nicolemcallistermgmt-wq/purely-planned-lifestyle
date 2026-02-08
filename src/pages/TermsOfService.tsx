import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft } from "lucide-react";

const TermsOfService = () => (
  <>
    <Helmet>
      <title>Terms of Service | Purely Planned Consulting</title>
      <meta name="description" content="Terms of Service for Purely Planned Consulting. Review the terms governing use of our website and services." />
    </Helmet>

    <div className="min-h-screen bg-charcoal text-cream">
      <div className="max-w-3xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gold hover:text-gold-light font-body text-sm tracking-wide uppercase transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <h1 className="text-3xl md:text-4xl font-heading text-cream mb-2">Terms of Service</h1>
        <p className="text-sm text-hero-muted font-body mb-10">Last Updated: February 8, 2026</p>
        <div className="h-px w-16 bg-gold mb-10" />

        <div className="space-y-8 font-body text-hero-muted leading-relaxed text-[15px]">
          <p>
            Welcome to the website of Purely Planned Consulting ("Company," "we," "us," or "our"). By accessing or using our website at purelyplannedconsulting.com (the "Site") or engaging our services, you ("User," "you," or "your") agree to be bound by these Terms of Service ("Terms"). If you do not agree, please do not use this Site or our services.
          </p>

          <section>
            <h2 className="font-heading text-xl text-cream mb-3">1. Overview of Services</h2>
            <p>
              Purely Planned Consulting provides lifestyle management, home organization, and personal concierge services to clients in the Washington D.C., Maryland, and Virginia metropolitan area. Services are provided on a consultation basis, and specific terms, scope, deliverables, and fees are agreed upon between the Company and the client prior to commencement of any engagement.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-cream mb-3">2. Eligibility</h2>
            <p>
              You must be at least eighteen (18) years of age to use this Site or engage our services. By using this Site, you represent and warrant that you are at least 18 years old and have the legal capacity to enter into a binding agreement under the laws of Maryland, Virginia, the District of Columbia, and the United States.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-cream mb-3">3. User Conduct</h2>
            <p className="mb-3">You agree not to use this Site for any unlawful purpose or in a manner that could damage, disable, overburden, or impair the Site. Without limitation, you agree not to:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Transmit any content that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, or otherwise objectionable</li>
              <li>Attempt to gain unauthorized access to any portion of the Site, its servers, or any systems or networks connected to the Site</li>
              <li>Use automated scripts, bots, or other means to collect information from or interact with the Site without prior written consent</li>
              <li>Impersonate any person or entity or misrepresent your affiliation with any person or entity</li>
              <li>Interfere with or disrupt the Site or servers or networks connected to the Site</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl text-cream mb-3">4. Intellectual Property & Copyright</h2>
            <p className="mb-3">
              All content on this Site — including but not limited to text, graphics, logos, images, photographs, icons, page layout, design elements, software, and overall look and feel — is the exclusive property of Purely Planned Consulting or its content suppliers and is protected by United States copyright law (Title 17, U.S. Code), the Digital Millennium Copyright Act (DMCA), trademark law, and applicable international intellectual property treaties.
            </p>
            <p className="mb-3">
              You may not reproduce, distribute, modify, create derivative works from, publicly display, publicly perform, republish, download, store, or transmit any content from this Site without our prior written consent, except as follows:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2 mb-4">
              <li>Your web browser may temporarily cache copies of pages for personal, non-commercial viewing</li>
              <li>You may print or download one copy of a reasonable number of pages for personal, non-commercial use, provided you do not modify, delete, or alter any copyright, trademark, or other proprietary notices</li>
            </ul>
            <h3 className="font-heading text-base text-cream mb-2">DMCA Notice & Takedown</h3>
            <p>
              If you believe that content on this Site infringes your copyright, you may submit a notice under the Digital Millennium Copyright Act (17 U.S.C. § 512) by contacting us at{" "}
              <a href="mailto:info@purelyplannedconsulting.com" className="text-gold hover:text-gold-light transition-colors">
                info@purelyplannedconsulting.com
              </a>{" "}
              with a description of the copyrighted work, the location of the infringing material, your contact information, and a statement made under penalty of perjury that the information is accurate and that you are authorized to act on behalf of the copyright owner.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-cream mb-3">5. Trademarks</h2>
            <p>
              The Purely Planned Consulting name, logo, and all related names, logos, product and service names, designs, and slogans are trademarks or service marks of Purely Planned Consulting. You must not use such marks without our prior written permission. All other names, logos, product and service names, designs, and slogans on this Site are the trademarks of their respective owners.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-cream mb-3">6. Service Agreements & Payment</h2>
            <p className="mb-3">
              Engagement of Purely Planned Consulting services is subject to a separate service agreement executed between the Company and the client. These Terms govern your use of the Site; service-specific terms — including scope of work, pricing, payment terms, cancellation, and refund policies — will be outlined in the applicable service agreement.
            </p>
            <p>
              The Company reserves the right to decline or discontinue services at its sole discretion for any lawful reason.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-cream mb-3">7. Confidentiality</h2>
            <p>
              We take client confidentiality seriously. Information shared during consultations or service engagements will be treated as confidential and will not be disclosed to third parties without your consent, except as required by law or as necessary to fulfill our services using trusted service providers bound by confidentiality obligations. Additional confidentiality terms may be included in your service agreement.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-cream mb-3">8. Disclaimer of Warranties</h2>
            <p className="mb-3">
              THIS SITE AND ALL INFORMATION, CONTENT, AND MATERIALS PROVIDED ON OR THROUGH IT ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
            </p>
            <p>
              TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, INCLUDING THE LAWS OF MARYLAND, VIRGINIA, AND THE DISTRICT OF COLUMBIA, THE COMPANY DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. THE COMPANY DOES NOT WARRANT THAT THE SITE WILL BE UNINTERRUPTED, ERROR-FREE, SECURE, OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-cream mb-3">9. Limitation of Liability</h2>
            <p className="mb-3">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL PURELY PLANNED CONSULTING, ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES — INCLUDING WITHOUT LIMITATION LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES — ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF OR INABILITY TO USE THE SITE OR OUR SERVICES.
            </p>
            <p>
              NOTHING IN THESE TERMS SHALL EXCLUDE OR LIMIT LIABILITY THAT CANNOT LAWFULLY BE EXCLUDED OR LIMITED UNDER THE LAWS OF MARYLAND, VIRGINIA, THE DISTRICT OF COLUMBIA, OR APPLICABLE FEDERAL LAW.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-cream mb-3">10. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless Purely Planned Consulting and its officers, directors, employees, agents, and affiliates from and against any and all claims, liabilities, damages, judgments, awards, losses, costs, expenses, and fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms or your use of the Site, including but not limited to any content you submit or transmit through the Site.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-cream mb-3">11. Third-Party Links</h2>
            <p>
              This Site may contain links to third-party websites or services that are not owned or controlled by Purely Planned Consulting. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You acknowledge and agree that we shall not be responsible or liable, directly or indirectly, for any damage or loss caused by or in connection with use of or reliance on any such content, goods, or services.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-cream mb-3">12. Electronic Communications</h2>
            <p>
              By using this Site or contacting us via our contact forms, you consent to receiving electronic communications from us. You agree that all agreements, notices, disclosures, and other communications we provide to you electronically satisfy any legal requirement that such communications be in writing, in compliance with the federal Electronic Signatures in Global and National Commerce Act (E-SIGN Act, 15 U.S.C. § 7001 et seq.) and applicable state laws governing electronic transactions in Maryland (Md. Code, Com. Law § 21-101 et seq.), Virginia (Va. Code § 59.1-479 et seq.), and the District of Columbia (D.C. Code § 28-4901 et seq.).
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-cream mb-3">13. Governing Law & Jurisdiction</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the State of Maryland, without regard to its conflict of law provisions. Any legal suit, action, or proceeding arising out of or related to these Terms or the Site shall be instituted exclusively in the federal or state courts located in the State of Maryland. You waive any objection to the exercise of jurisdiction over you by such courts and to venue in such courts.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-cream mb-3">14. Dispute Resolution</h2>
            <p>
              In the event of any dispute arising under these Terms, the parties agree to first attempt to resolve the dispute informally by contacting us at{" "}
              <a href="mailto:info@purelyplannedconsulting.com" className="text-gold hover:text-gold-light transition-colors">
                info@purelyplannedconsulting.com
              </a>
              . If the dispute cannot be resolved informally within thirty (30) days, either party may pursue resolution through the courts as described in Section 13 above.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-cream mb-3">15. Severability</h2>
            <p>
              If any provision of these Terms is held to be invalid, illegal, or unenforceable by a court of competent jurisdiction, such provision shall be modified to the minimum extent necessary to make it valid and enforceable, or if modification is not possible, severed from these Terms. The invalidity, illegality, or unenforceability of any provision shall not affect the validity, legality, or enforceability of the remaining provisions.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-cream mb-3">16. Waiver</h2>
            <p>
              No waiver by the Company of any term or condition set forth in these Terms shall be deemed a further or continuing waiver of such term or condition or a waiver of any other term or condition. Any failure of the Company to assert a right or provision under these Terms shall not constitute a waiver of such right or provision.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-cream mb-3">17. Entire Agreement</h2>
            <p>
              These Terms, together with our{" "}
              <Link to="/privacy" className="text-gold hover:text-gold-light transition-colors">
                Privacy Policy
              </Link>
              , constitute the entire agreement between you and Purely Planned Consulting regarding your use of the Site. Any separate service agreement executed between you and the Company will govern the specific terms of that engagement.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-cream mb-3">18. Changes to These Terms</h2>
            <p>
              We reserve the right to revise these Terms at any time at our sole discretion. All changes are effective immediately upon posting on this page and are indicated by the "Last Updated" date above. Your continued use of the Site following the posting of revised Terms constitutes your acceptance of such changes. You are responsible for reviewing these Terms periodically.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-cream mb-3">19. Contact Information</h2>
            <p>
              If you have questions or concerns about these Terms of Service, please contact:
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

export default TermsOfService;
