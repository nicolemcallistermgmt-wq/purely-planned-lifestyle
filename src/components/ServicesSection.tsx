import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Compass, Home, HandHelping, Snowflake, Truck, PartyPopper,
} from "lucide-react";
import GoldDivider from "./GoldDivider";

const services = [
  {
    icon: Compass,
    title: "Lifestyle Consulting",
    desc: "Strategic guidance for a more balanced, well-managed life.",
    items: ["Time management and daily scheduling", "Household systems and productivity routines", "Goal setting and prioritization", "Family administration and coordination"],
  },
  {
    icon: Home,
    title: "Organizing",
    desc: "Transform your spaces into calm, functional environments you can maintain.",
    items: ["Home, office, and digital space organization", "Decluttering, space planning, and storage systems", "Paperwork, filing, and document management", "Donation, selling, and removal coordination"],
  },
  {
    icon: HandHelping,
    title: "Concierge",
    desc: "Personal support for the details that keep life running smoothly.",
    items: ["Errand running and vendor coordination", "Appointment scheduling and management", "Shopping, returns, and personal tasks", "Day-to-day household oversight"],
  },
  {
    icon: Snowflake,
    title: "Snow Bird Services",
    desc: "Seamless seasonal transitions between your homes.",
    items: ["Home opening and closing preparation", "Property readiness checks and walkthroughs", "Seasonal wardrobe and supply rotation", "Mail, utilities, and vendor coordination"],
  },
  {
    icon: Truck,
    title: "Relocation",
    desc: "Comprehensive support for moves and major life transitions.",
    items: ["Downsizing and decision support", "Packing, labeling, and move coordination", "Unpacking and new home setup", "Settling-in systems so you feel at home quickly"],
  },
  {
    icon: PartyPopper,
    title: "Event Hospitality",
    desc: "Polished preparation and support for gatherings of every size.",
    items: ["Event planning and day-of coordination", "Home staging and preparation for entertaining", "Vendor and catering liaison", "Post-event cleanup and home restoration"],
  },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="section-padding bg-charcoal" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-gold font-body mb-4">What We Do</p>
          <h2 className="text-3xl md:text-5xl font-heading text-cream mb-6">Our Services</h2>
          <GoldDivider className="mb-6" />
          <p className="text-base md:text-lg text-hero-muted font-body font-light max-w-2xl mx-auto">
            Comprehensive services tailored to your life, your space, and your needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.1, ease: "easeOut" }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="border border-charcoal-light p-8 hover:border-gold/40 hover:bg-charcoal-light/30 transition-all duration-500 group"
            >
              <s.icon className="w-7 h-7 text-gold mb-5 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
              <h3 className="font-heading text-xl text-cream mb-3">{s.title}</h3>
              <p className="text-sm text-hero-muted font-body mb-5">{s.desc}</p>
              <ul className="space-y-2">
                {s.items.map((item) => (
                  <li key={item} className="text-sm text-hero-muted/70 font-body flex items-start gap-2">
                    <span className="text-gold mt-1.5 text-[6px]">●</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
