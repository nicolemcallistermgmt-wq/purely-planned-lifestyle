import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, FileText } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `mailto:nicole@purelyplannedconsulting.com?subject=Inquiry from ${formData.name}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\n${formData.message}`
    )}`;
  };

  return (
    <section id="contact" className="section-padding bg-charcoal" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-gold font-body mb-4">Get In Touch</p>
          <h2 className="text-3xl md:text-5xl font-heading text-cream mb-6">Begin a Conversation</h2>
          <div className="h-px w-16 bg-gold mx-auto mb-6" />
          <p className="text-base md:text-lg text-hero-muted font-body font-light max-w-2xl mx-auto">
            We welcome the opportunity to discuss how we might be of service.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <h3 className="font-heading text-xl text-cream mb-2">Quick Inquiry</h3>
            <p className="text-sm text-hero-muted font-body mb-6">
              For general questions, use this form. New clients should complete our{" "}
              <a href="/intake.html" className="text-gold hover:underline">comprehensive intake form</a>.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Name *"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-charcoal-light border border-charcoal-light text-cream placeholder-hero-muted/50 font-body text-sm focus:border-gold focus:outline-none transition-colors"
                />
                <input
                  type="email"
                  placeholder="Email *"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-charcoal-light border border-charcoal-light text-cream placeholder-hero-muted/50 font-body text-sm focus:border-gold focus:outline-none transition-colors"
                />
              </div>
              <input
                type="tel"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 bg-charcoal-light border border-charcoal-light text-cream placeholder-hero-muted/50 font-body text-sm focus:border-gold focus:outline-none transition-colors"
              />
              <textarea
                placeholder="Message *"
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 bg-charcoal-light border border-charcoal-light text-cream placeholder-hero-muted/50 font-body text-sm focus:border-gold focus:outline-none transition-colors resize-none"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-gold text-primary font-body text-sm tracking-[0.15em] uppercase hover:bg-gold-light transition-colors"
              >
                Send Message
              </button>
            </form>
          </motion.div>

          {/* Sidebar info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="border border-charcoal-light p-6">
              <Mail className="w-5 h-5 text-gold mb-3" strokeWidth={1.5} />
              <h4 className="font-heading text-lg text-cream mb-2">Email</h4>
              <a href="mailto:nicole@purelyplannedconsulting.com" className="text-sm text-hero-muted font-body hover:text-gold transition-colors">
                nicole@purelyplannedconsulting.com
              </a>
            </div>

            <div className="border border-charcoal-light p-6">
              <FileText className="w-5 h-5 text-gold mb-3" strokeWidth={1.5} />
              <h4 className="font-heading text-lg text-cream mb-2">New Clients</h4>
              <a href="/intake.html" className="text-sm text-gold font-body hover:text-gold-light transition-colors">
                Complete Intake Form →
              </a>
              <p className="text-xs text-hero-muted/60 font-body mt-2">
                Comprehensive form ensures we understand your needs
              </p>
            </div>

            <div className="border border-charcoal-light p-6">
              <h4 className="font-heading text-lg text-cream mb-3">Our Specialties</h4>
              <ul className="space-y-2">
                {["Lifestyle Consulting", "Organizing", "Concierge & Snow Bird Services", "Relocation & Event Hospitality"].map((s) => (
                  <li key={s} className="text-sm text-hero-muted font-body flex items-center gap-2">
                    <span className="text-gold text-[6px]">●</span> {s}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
