import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check } from "lucide-react";
import GoldDivider from "./GoldDivider";

const plans = [
  {
    title: "Hourly Rate",
    price: "$75",
    unit: "per hour",
    features: ["All services included", "3-hour minimum per session", "Flexible scheduling", "Professional expertise"],
    cta: "Get Started",
    href: "/intake",
    featured: false,
  },
  {
    title: "Monthly Retainer",
    price: "Custom",
    unit: "pricing available",
    features: ["20+ hours per month", "Priority scheduling", "Preferred rates", "Dedicated support", "Comprehensive lifestyle management", "Best value for ongoing needs"],
    cta: "Discuss Options",
    href: "#contact",
    featured: true,
  },
  {
    title: "Project-Based",
    price: "Custom",
    unit: "quote provided",
    features: ["Whole-home organization", "Office & digital organization", "Downsizing & life transitions", "Family & household management", "Comprehensive proposals", "Transparent cost breakdown"],
    cta: "Request Quote",
    href: "#contact",
    featured: false,
  },
];

const PricingSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="commitment" className="section-padding bg-background" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-accent font-body mb-4">Investment</p>
          <h2 className="text-3xl md:text-5xl font-heading text-foreground mb-6">Your Commitment</h2>
          <GoldDivider className="mb-6" />
          <p className="text-base md:text-lg text-muted-foreground font-body font-light max-w-2xl mx-auto">
            Professional services with clear, straightforward rates
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.15 + i * 0.12, ease: "easeOut" }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className={`relative p-8 border transition-all duration-500 group ${
                plan.featured
                  ? "border-accent bg-secondary hover:shadow-[0_0_30px_-5px_hsl(var(--accent)/0.3)]"
                  : "border-border hover:border-accent/40 hover:shadow-[0_0_25px_-5px_hsl(var(--accent)/0.15)]"
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-primary px-4 py-1 text-xs tracking-[0.15em] uppercase font-body">
                  Best Value
                </span>
              )}
              <h3 className="font-heading text-xl text-foreground mb-4">{plan.title}</h3>
              <div className="mb-6">
                <span className="text-3xl md:text-4xl font-heading text-foreground">{plan.price}</span>
                <span className="text-sm text-muted-foreground font-body ml-1">{plan.unit}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground font-body">
                    <Check className="w-4 h-4 text-accent mt-0.5 shrink-0 group-hover:scale-110 transition-transform duration-300" strokeWidth={2} />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={plan.href}
                className={`block text-center px-6 py-3 text-sm tracking-[0.15em] uppercase font-body transition-all duration-300 ${
                  plan.featured
                    ? "bg-accent text-primary hover:bg-gold-light hover:shadow-[0_4px_15px_-3px_hsl(var(--accent)/0.4)]"
                    : "border border-accent text-accent hover:bg-accent hover:text-primary hover:shadow-[0_4px_15px_-3px_hsl(var(--accent)/0.3)]"
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.8, ease: "easeOut" }}
          className="text-center text-sm text-muted-foreground font-body mt-12 max-w-3xl mx-auto"
        >
          <strong className="text-foreground">3-hour minimum per session.</strong> All pricing is customized based on
          project scope and complexity. Travel fees may apply for locations outside the primary service area.
          Corporate and group discounts available upon request.
        </motion.p>
      </div>
    </section>
  );
};

export default PricingSection;
