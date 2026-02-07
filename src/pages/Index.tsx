import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import VideoDivider from "@/components/VideoDivider";
import luxuryFlowers from "@/assets/luxury-flowers.mp4";
import luxuryCloset from "@/assets/luxury-closet.mp4";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <VideoDivider
        videoSrc={luxuryFlowers}
        quote="For those who expect more from life, we provide the calm, capable support that makes it possible."
      />
      <ServicesSection />
      <VideoDivider
        videoSrc={luxuryCloset}
        quote="Your priorities become our focus."
      />
      <PricingSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
