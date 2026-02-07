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
      acceptedAnswer: { "@type": "Answer", text: "We serve clients throughout the Washington D.C., Maryland, and Virginia (DMV) metropolitan area. Both in-person and virtual consultations are available." },
    },
    {
      "@type": "Question",
      name: "What does a professional organizer actually do?",
      acceptedAnswer: { "@type": "Answer", text: "A professional organizer helps you create functional, sustainable systems for your home, office, or daily life — including decluttering, space planning, storage solutions, and building routines that reduce stress." },
    },
    {
      "@type": "Question",
      name: "How long does a typical organizing project take?",
      acceptedAnswer: { "@type": "Answer", text: "A single room can often be completed in one session (3–5 hours). Whole-home projects may take multiple sessions over several weeks. We provide a clear time estimate after an initial consultation." },
    },
    {
      "@type": "Question",
      name: "How is Purely Planned different from other organizers?",
      acceptedAnswer: { "@type": "Answer", text: "We offer full-service lifestyle management beyond organizing — including concierge services, relocation support, seasonal home transitions, and event hospitality, with an emphasis on discretion and privacy." },
    },
    {
      "@type": "Question",
      name: "Can you help with a move or relocation?",
      acceptedAnswer: { "@type": "Answer", text: "Yes. We offer comprehensive move management including downsizing support, packing and labeling, coordination with movers, unpacking, and setting up organized systems in your new home." },
    },
    {
      "@type": "Question",
      name: "Is my personal information kept confidential?",
      acceptedAnswer: { "@type": "Answer", text: "Absolutely. We never sell or share your personal information. All team members are background-verified and we are fully insured." },
    },
    {
      "@type": "Question",
      name: "How do I get started with Purely Planned Consulting?",
      acceptedAnswer: { "@type": "Answer", text: "Fill out our Client Intake Form or send a quick inquiry through our website. We'll respond within 24–48 hours to discuss your needs and schedule a consultation." },
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
