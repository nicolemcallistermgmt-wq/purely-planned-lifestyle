import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck, Eye, UserCheck } from "lucide-react";
import { Link } from "react-router-dom";

const badges = [
  { icon: Eye, label: "Confidential & Discreet" },
  { icon: UserCheck, label: "Background Verified" },
  { icon: ShieldCheck, label: "Insured" },
];

const Footer = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <footer className="bg-charcoal border-t border-charcoal-light py-12 px-6 md:px-12" ref={ref}>
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-8">
        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          {badges.map((b, i) => (
            <motion.div
              key={b.label}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease: "easeOut" }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              className="flex items-center gap-2.5 px-5 py-3 border border-gold/20 bg-gold/5 text-cream"
            >
              <b.icon className="w-4 h-4 text-gold shrink-0" strokeWidth={1.5} />
              <span className="text-xs tracking-[0.15em] uppercase font-body font-medium">
                {b.label}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col items-center gap-3"
        >
          <div className="flex items-center gap-3">
            <Link
              to="/privacy"
              className="text-xs text-hero-muted/50 font-body hover:text-gold transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="text-hero-muted/30">|</span>
            <Link
              to="/terms"
              className="text-xs text-hero-muted/50 font-body hover:text-gold transition-colors"
            >
              Terms of Service
            </Link>
          </div>
          <p className="text-xs text-hero-muted/50 font-body">
            © {new Date().getFullYear()} Purely Planned Consulting
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
