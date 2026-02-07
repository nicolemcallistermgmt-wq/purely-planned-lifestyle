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
    a: "We serve clients throughout the Washington D.C., Maryland, and Virginia (DMV) metropolitan area. Both in-person and virtual consultations are available depending on your needs and location.",
  },
  {
    q: "What does a professional organizer actually do?",
    a: "A professional organizer helps you create functional, sustainable systems for your home, office, or daily life. This includes decluttering, space planning, storage solutions, paper management, and building routines that reduce stress and save you time. We do the hands-on work alongside you — or independently if you prefer.",
  },
  {
    q: "Do I need to be home during organizing sessions?",
    a: "It's entirely up to you. Some clients prefer to be present and involved in every decision, while others give us guidelines and let us work independently. We're experienced in both approaches and will follow whatever makes you most comfortable.",
  },
  {
    q: "How long does a typical organizing project take?",
    a: "It depends on the scope. A single room like a closet or pantry can often be completed in one session (3–5 hours). A whole-home project may take multiple sessions over several weeks. After an initial consultation, we'll provide a clear time estimate tailored to your space and goals.",
  },
  {
    q: "Will you throw away my things?",
    a: "Never without your permission. We guide you through a decision-making process and respect that every item has a story. We help you sort items into categories — keep, donate, sell, recycle, or discard — and coordinate removal of anything you choose to part with.",
  },
  {
    q: "What if I'm embarrassed by the state of my home?",
    a: "Please don't be. We've seen it all and we never judge. Our clients range from busy professionals who've fallen behind to people navigating major life transitions. Our role is to help, not to evaluate. Confidentiality and compassion are at the core of every engagement.",
  },
  {
    q: "How is Purely Planned different from other organizers?",
    a: "We offer more than just organizing — we're a full-service lifestyle management firm. Beyond decluttering and space design, we provide concierge services, relocation support, seasonal home transitions, and event hospitality. Our clients also value our emphasis on discretion, privacy, and a personalized approach.",
  },
  {
    q: "What does a concierge service include?",
    a: "Our concierge services cover the day-to-day tasks that keep life running smoothly — errand running, vendor coordination, appointment scheduling, shopping, returns, and household oversight. Think of us as an extension of your household team.",
  },
  {
    q: "Can you help with a move or relocation?",
    a: "Yes. We offer comprehensive move management including downsizing support, packing and labeling, coordination with movers, unpacking at your new home, and setting up organized systems so you feel settled quickly. We handle the logistics so you can focus on the transition.",
  },
  {
    q: "How much do your services cost?",
    a: "Our pricing varies based on the type and scope of service. We offer transparent tiered packages as well as custom quotes for larger projects. After an initial consultation, we'll recommend the best option and provide a clear estimate with no hidden fees.",
  },
  {
    q: "Is my personal information kept confidential?",
    a: "Absolutely. Discretion is central to our practice. We never sell or share your personal information, and we regularly work with clients who require the highest levels of professional privacy. All team members are background-verified and we are fully insured.",
  },
  {
    q: "How do I get started?",
    a: "Simply fill out our Client Intake Form or send a quick inquiry through the contact section on our website. We'll respond within 24–48 hours to discuss your needs, answer any questions, and schedule an initial consultation.",
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
