import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import GoldDivider from "./GoldDivider";

const FounderBio = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="founder" className="section-padding bg-background" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-12"
          style={{ willChange: "opacity, transform" }}
        >
          <p className="text-xs tracking-[0.3em] uppercase text-accent font-body mb-4">The Founder</p>
          <h2 className="text-3xl md:text-5xl font-heading text-foreground mb-8">
            Nicole McAllister
          </h2>
          <GoldDivider className="mb-8" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="space-y-6"
          style={{ willChange: "opacity, transform" }}
        >
          <p className="text-base md:text-lg text-muted-foreground font-body leading-relaxed text-center">
            Nicole McAllister is the founder of Purely Planned Consulting, a concierge and
            lifestyle-management firm built to support individuals and families who value discretion,
            efficiency, and peace of mind.
          </p>
          <p className="text-base md:text-lg text-muted-foreground font-body leading-relaxed text-center">
            Nicole turned her natural strengths—organization, planning, research, and advocacy—into a
            business of her own.
          </p>
          <p className="text-base md:text-lg text-muted-foreground font-body leading-relaxed text-center">
            Prior to relocating to Maryland, Nicole worked in New York City as a Professional Organizer
            and Lifestyle Manager, supporting high-profile clients in environments where trust, attention
            to detail, and discretion were non-negotiable. That experience continues to shape her
            thoughtful, results-driven approach today.
          </p>
          <p className="text-base md:text-lg text-muted-foreground font-body leading-relaxed text-center italic">
            Through Purely Planned Consulting, Nicole provides highly personalized support designed to
            simplify life behind the scenes—allowing her clients to focus on what matters most.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FounderBio;
