import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import PricingSection from "@/components/PricingSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Purely Planned Consulting",
  description:
    "Thoughtful, discreet lifestyle management and home organization for discerning clients in Washington D.C., Maryland & Virginia.",
  url: "https://purelyplannedconsulting.com",
  email: "info@purelyplannedconsulting.com",
  areaServed: [
    { "@type": "State", name: "Maryland" },
    { "@type": "State", name: "Virginia" },
    { "@type": "Place", name: "Washington, D.C." },
  ],
  serviceType: [
    "Lifestyle Consulting",
    "Home Organizing",
    "Concierge Services",
    "Move Management",
  ],
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
      </Helmet>
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <PricingSection />
      <ContactSection />
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Index;
