import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "Nicole transformed our entire home — closets, kitchen, garage, all of it. She created systems that actually make sense for how we live. Months later, everything is still in its place.",
    author: "Homeowner, Baltimore County",
  },
  {
    quote: "I was drowning in paperwork, emails, and medical records. Nicole set up a system for everything — digital and physical. I finally feel like I can breathe. She's incredibly thorough and kind.",
    author: "Busy Professional",
  },
  {
    quote: "Downsizing felt impossible until Nicole stepped in. She helped us sort through decades of belongings with patience and care, coordinated donations, and made our new home feel just right.",
    author: "Recent Downsizer",
  },
];

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
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-accent font-body mb-4">Testimonials</p>
          <h2 className="text-3xl md:text-5xl font-heading text-foreground mb-6">What Clients Say</h2>
          <div className="h-px w-16 bg-accent mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.15 }}
              className="bg-background p-8 border border-border"
            >
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-base text-muted-foreground font-body leading-relaxed italic mb-6">
                "{t.quote}"
              </p>
              <div className="h-px bg-border mb-4" />
              <p className="text-sm text-foreground font-body tracking-wide">— {t.author}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
