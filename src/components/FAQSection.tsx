import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import GoldDivider from "./GoldDivider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What areas does Purely Planned Consulting serve?",
    a: "We serve clients throughout the Washington D.C., Maryland, and Virginia (DMV) metropolitan area. Both in-person and virtual consultations are available depending on your needs.",
  },
  {
    q: "What services does a lifestyle management consultant provide?",
    a: "We offer lifestyle consulting, home and office organizing, personal concierge services, snow bird seasonal transitions, relocation support, and event hospitality — all tailored to your specific situation.",
  },
  {
    q: "Is my personal information kept confidential?",
    a: "Absolutely. Discretion is central to our practice. We never sell or share your personal information, and we regularly work with clients who require the highest levels of professional privacy.",
  },
  {
    q: "How do I get started?",
    a: "You can fill out our Client Intake Form or send a quick inquiry through the contact section on our website. We'll respond within 24–48 hours to discuss your needs and schedule a consultation.",
  },
  {
    q: "Do you offer virtual consultations?",
    a: "Yes. We offer both in-person and virtual consultations depending on the service and your location within the DMV area.",
  },
];

const FAQSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="faq" className="section-padding bg-charcoal" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-gold font-body mb-4">
            Common Questions
          </p>
          <h2 className="text-3xl md:text-5xl font-heading text-cream mb-6">
            Frequently Asked Questions
          </h2>
          <GoldDivider className="mb-6" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border border-charcoal-light px-6 data-[state=open]:border-gold/30 transition-colors duration-300"
              >
                <AccordionTrigger className="font-heading text-cream text-left text-base py-5 hover:no-underline hover:text-gold transition-colors">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-hero-muted font-body text-sm leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
