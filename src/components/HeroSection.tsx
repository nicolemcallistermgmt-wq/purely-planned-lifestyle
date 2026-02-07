import { motion } from "framer-motion";
import logo from "@/assets/logo.png";
import slide1 from "@/assets/slide-1.jpg";
import slide2 from "@/assets/slide-2.jpg";
import slide3 from "@/assets/slide-3.jpg";
import slide4 from "@/assets/slide-4.jpg";
import ImageSlideshow from "./ImageSlideshow";

const heroImages = [slide1, slide2, slide3, slide4];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-section">
      <ImageSlideshow images={heroImages} interval={7000} overlay="bg-charcoal/70" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-10"
        >
          <img
            src={logo}
            alt="Purely Planned Consulting"
            className="w-28 h-28 md:w-36 md:h-36 mx-auto rounded-xl shadow-2xl bg-cream p-3"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-heading font-normal text-hero-foreground mb-6 leading-tight"
        >
          Purely Planned
          <br />
          <span className="italic font-light">Consulting</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className="h-px w-12 bg-gold/50" />
          <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-hero-muted font-body">
            Lifestyle Management & Home Organization
          </p>
          <div className="h-px w-12 bg-gold/50" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-hero-muted font-body font-light max-w-2xl mx-auto mb-4 leading-relaxed"
        >
          Thoughtful, discreet service for discerning clients who value their time
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-xs tracking-[0.25em] uppercase text-gold font-body mb-12"
        >
          Proudly Serving Washington D.C., Maryland & Virginia
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#contact"
            className="px-8 py-3.5 bg-accent text-primary font-body text-sm tracking-[0.15em] uppercase hover:bg-gold-light transition-colors"
          >
            Begin a Conversation
          </a>
          <a
            href="#services"
            className="px-8 py-3.5 border border-hero-muted/30 text-hero-foreground font-body text-sm tracking-[0.15em] uppercase hover:border-accent hover:text-accent transition-colors"
          >
            Explore Services
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
