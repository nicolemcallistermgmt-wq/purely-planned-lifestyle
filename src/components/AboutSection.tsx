import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Layers, Sparkles } from "lucide-react";

const values = [
  { icon: Shield, title: "Discretion Assured", desc: "Complete confidentiality in every engagement" },
  { icon: Layers, title: "Comprehensive Approach", desc: "From initial consultation through ongoing support" },
  { icon: Sparkles, title: "Refined Results", desc: "Lasting systems tailored to how you live" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding bg-background" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-accent font-body mb-4">About Us</p>
          <h2 className="text-3xl md:text-5xl font-heading text-foreground mb-8">
            About Purely Planned
          </h2>
          <div className="h-px w-16 bg-accent mx-auto mb-8" />
          <p className="text-lg md:text-xl text-muted-foreground font-body font-light max-w-3xl mx-auto leading-relaxed italic">
            For those who expect more from life, we provide the calm, capable support that makes it possible.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="max-w-3xl mx-auto mb-20"
        >
          <p className="text-base md:text-lg text-muted-foreground font-body leading-relaxed text-center">
            Purely Planned Consulting serves accomplished individuals and families who value discretion,
            efficiency, and impeccable attention to detail. Whether managing multiple residences, navigating
            a significant transition, or simply seeking a more ordered life, our clients trust us to handle
            what matters most.
          </p>
          <p className="text-base md:text-lg text-muted-foreground font-body leading-relaxed text-center mt-6">
            With experience supporting executives, medical professionals, and distinguished families, we bring
            seasoned judgment and quiet professionalism to every engagement. Your priorities become our focus.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.15, ease: "easeOut" }}
              className="text-center group"
            >
              <div className="w-14 h-14 mx-auto mb-5 flex items-center justify-center border border-accent/30 group-hover:border-accent group-hover:scale-110 transition-all duration-300">
                <v.icon className="w-6 h-6 text-accent" strokeWidth={1.5} />
              </div>
              <h3 className="font-heading text-lg text-foreground mb-2">{v.title}</h3>
              <p className="text-sm text-muted-foreground font-body">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
