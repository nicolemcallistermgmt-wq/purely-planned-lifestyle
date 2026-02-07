import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const TestimonialsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding bg-secondary" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-accent font-body mb-4">Testimonials</p>
          <h2 className="text-3xl md:text-5xl font-heading text-foreground mb-6">What Clients Say</h2>
          <div className="h-px w-16 bg-accent mx-auto mb-8" />
          <p className="text-muted-foreground font-body max-w-lg mx-auto">
            Client testimonials coming soon. We look forward to sharing their experiences with you.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
