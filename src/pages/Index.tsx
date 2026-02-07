import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Purely Planned Consulting",
  description:
    "Thoughtful, discreet lifestyle management, home organization, and concierge services for discerning clients in Washington D.C., Maryland & Virginia.",
  url: "https://purelyplannedconsulting.com",
  email: "info@purelyplannedconsulting.com",
  areaServed: [
    { "@type": "State", name: "Maryland" },
    { "@type": "State", name: "Virginia" },
    { "@type": "Place", name: "Washington, D.C." },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Lifestyle Consulting", description: "Strategic guidance for a more balanced, well-managed life including time management, household systems, and family coordination." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Home & Office Organizing", description: "Transform spaces into calm, functional environments with decluttering, space planning, and storage systems." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Personal Concierge", description: "Errand running, vendor coordination, appointment scheduling, and day-to-day household oversight." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Snow Bird Services", description: "Seamless seasonal transitions between homes including property readiness checks and supply rotation." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Relocation Support", description: "Comprehensive move management including downsizing, packing coordination, unpacking, and new home setup." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Event Hospitality", description: "Event planning, home staging for entertaining, vendor liaison, and post-event restoration." } },
    ],
  },
  priceRange: "$$",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What areas does Purely Planned Consulting serve?",
      acceptedAnswer: { "@type": "Answer", text: "We serve clients throughout the Washington D.C., Maryland, and Virginia (DMV) metropolitan area." },
    },
    {
      "@type": "Question",
      name: "What services does a lifestyle management consultant provide?",
      acceptedAnswer: { "@type": "Answer", text: "We offer lifestyle consulting, home and office organizing, personal concierge services, snow bird seasonal transitions, relocation support, and event hospitality." },
    },
    {
      "@type": "Question",
      name: "Is my personal information kept confidential?",
      acceptedAnswer: { "@type": "Answer", text: "Absolutely. Discretion is central to our practice. We never sell or share your personal information, and we work with clients who require the highest levels of professional privacy." },
    },
    {
      "@type": "Question",
      name: "How do I get started with Purely Planned Consulting?",
      acceptedAnswer: { "@type": "Answer", text: "You can fill out our Client Intake Form or send a quick inquiry through the contact form on our website. We'll respond within 24-48 hours to discuss your needs." },
    },
    {
      "@type": "Question",
      name: "Do you offer virtual consultations?",
      acceptedAnswer: { "@type": "Answer", text: "Yes, we offer both in-person and virtual consultations depending on your needs and location within the DMV area." },
    },
  ],
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <meta property="og:title" content="Purely Planned Consulting | Lifestyle Management & Home Organization" />
        <meta property="og:description" content="Thoughtful, discreet lifestyle management, home organization, and concierge services in Washington D.C., Maryland & Virginia." />
        <meta property="og:url" content="https://purelyplannedconsulting.com" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Purely Planned Consulting" />
        <meta name="twitter:description" content="Lifestyle management, home organization & concierge services in the DMV area." />
        <link rel="canonical" href="https://purelyplannedconsulting.com/" />
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <PricingSection />
      <FAQSection />
      <ContactSection />
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Index;
