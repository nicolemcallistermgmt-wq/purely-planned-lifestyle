import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import logo from "@/assets/logo.png";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.75, 0.9]);

  return (
    <section ref={ref} className="relative min-h-screen-dynamic flex items-center justify-center overflow-hidden hero-section">
      {/* Parallax background */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <img src={heroBg} alt="" className="w-full h-full object-cover scale-110" loading="eager" fetchPriority="high" width={1534} height={1080} />
      </motion.div>
      <motion.div className="absolute inset-0 bg-charcoal" style={{ opacity: overlayOpacity }} />

      <div className="relative z-10 text-center px-5 max-w-4xl mx-auto pt-16 pb-8 md:pt-0 md:pb-0">
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
            width={144}
            height={144}
            loading="eager"
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
            className="px-8 py-3.5 bg-accent text-primary font-body text-sm tracking-[0.15em] uppercase hover:bg-gold-light active:scale-[0.97] transition-all"
          >
            Begin a Conversation
          </a>
          <a
            href="#services"
            className="px-8 py-3.5 bg-accent/15 border border-accent text-accent font-body text-sm tracking-[0.15em] uppercase hover:bg-accent hover:text-primary active:scale-[0.97] transition-all"
          >
            Explore Services
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
