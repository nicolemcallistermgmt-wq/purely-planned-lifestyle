import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const GoldDivider = ({ className = "" }: { className?: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className={`flex justify-center ${className}`}>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="h-px w-16 bg-accent origin-center"
      />
    </div>
  );
};

export default GoldDivider;
