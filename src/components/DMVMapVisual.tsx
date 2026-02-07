import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin } from "lucide-react";

const areas = [
  { name: "Washington, D.C.", x: "52%", y: "42%" },
  { name: "Maryland", x: "62%", y: "28%" },
  { name: "Virginia", x: "38%", y: "62%" },
];

const DMVMapVisual = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="mt-16"
    >
      <div className="text-center mb-8">
        <p className="text-xs tracking-[0.3em] uppercase text-accent font-body mb-3">Service Area</p>
        <h3 className="text-2xl md:text-3xl font-heading text-foreground">The DMV Region</h3>
      </div>

      {/* Stylized map visualization */}
      <div className="relative max-w-md mx-auto aspect-square">
        {/* Background shape — abstract DMV silhouette */}
        <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
          <motion.path
            d="M60 30 Q80 20, 120 25 Q150 30, 160 50 Q170 70, 165 100 Q160 130, 140 150 Q120 170, 100 175 Q80 178, 60 165 Q40 150, 35 120 Q30 90, 40 60 Q45 40, 60 30Z"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 1.5, ease: "easeOut" }}
            stroke="hsl(var(--accent))"
            strokeWidth="0.5"
            fill="hsl(var(--accent) / 0.05)"
          />
          <motion.path
            d="M60 30 Q80 20, 120 25 Q150 30, 160 50 Q170 70, 165 100 Q160 130, 140 150 Q120 170, 100 175 Q80 178, 60 165 Q40 150, 35 120 Q30 90, 40 60 Q45 40, 60 30Z"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
            stroke="none"
            fill="hsl(var(--accent) / 0.08)"
          />
        </svg>

        {/* Location pins */}
        {areas.map((area, i) => (
          <motion.div
            key={area.name}
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 1.2 + i * 0.2, ease: "backOut" }}
            className="absolute flex flex-col items-center gap-1"
            style={{ left: area.x, top: area.y, transform: "translate(-50%, -50%)" }}
          >
            <MapPin className="w-5 h-5 text-accent" strokeWidth={1.5} />
            <span className="text-[10px] tracking-[0.15em] uppercase font-body text-muted-foreground whitespace-nowrap">
              {area.name}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default DMVMapVisual;
