import { motion, useInView } from "framer-motion";
import { useRef, forwardRef } from "react";

const GoldDivider = forwardRef<HTMLDivElement, { className?: string }>(
  ({ className = "" }, _ref) => {
    const internalRef = useRef(null);
    const inView = useInView(internalRef, { once: true, margin: "-40px" });

    return (
      <div ref={internalRef} className={`flex justify-center ${className}`}>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-px w-16 bg-accent origin-center"
        />
      </div>
    );
  }
);

GoldDivider.displayName = "GoldDivider";

export default GoldDivider;
