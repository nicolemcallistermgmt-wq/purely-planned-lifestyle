import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, FileText, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import GoldDivider from "./GoldDivider";

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  const captchaRef = useRef<HCaptcha>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaToken) {
      toast({ title: "Please complete the captcha verification.", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      const body = new FormData();
      body.append("access_key", "db4d914c-862c-4068-b930-1b34baaf4951");
      body.append("subject", `Quick Inquiry from ${formData.name}`);
      body.append("from_name", formData.name);
      body.append("replyto", formData.email);
      body.append("Name", formData.name);
      body.append("Email", formData.email);
      body.append("Phone", formData.phone || "Not provided");
      body.append("Message", formData.message);
      body.append("h-captcha-response", captchaToken);
      const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body });
      const data = await response.json();
      if (data.success) {
        toast({ title: "Message sent!", description: "We'll be in touch shortly." });
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        toast({ title: "Submission failed", description: data.message || "Please try again.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Network error", description: "Please check your connection and try again.", variant: "destructive" });
    } finally {
      setSubmitting(false);
      setCaptchaToken("");
      captchaRef.current?.resetCaptcha();
    }
  };

  return (
    <section id="contact" className="section-padding bg-charcoal" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-gold font-body mb-4">Get In Touch</p>
          <h2 className="text-3xl md:text-5xl font-heading text-cream mb-6">Begin a Conversation</h2>
          <GoldDivider className="mb-6" />
          <p className="text-base md:text-lg text-hero-muted font-body font-light max-w-2xl mx-auto">
            We welcome the opportunity to discuss how we might be of service.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="lg:col-span-3"
          >
            <h3 className="font-heading text-xl text-cream mb-2">Quick Inquiry</h3>
            <p className="text-sm text-hero-muted font-body mb-6">
              For general questions, use this form. New clients should complete our{" "}
              <a href="/intake" className="text-gold hover:underline">comprehensive intake form</a>.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input type="text" placeholder="Name *" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3.5 bg-charcoal-light border border-charcoal-light text-cream placeholder-hero-muted/50 font-body text-base focus:border-gold focus:outline-none transition-colors rounded-none appearance-none" maxLength={100} />
                <input type="email" placeholder="Email *" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3.5 bg-charcoal-light border border-charcoal-light text-cream placeholder-hero-muted/50 font-body text-base focus:border-gold focus:outline-none transition-colors rounded-none appearance-none" maxLength={255} />
              </div>
              <input type="tel" placeholder="Phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3.5 bg-charcoal-light border border-charcoal-light text-cream placeholder-hero-muted/50 font-body text-base focus:border-gold focus:outline-none transition-colors rounded-none appearance-none" maxLength={30} />
              <textarea placeholder="Message *" required rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3.5 bg-charcoal-light border border-charcoal-light text-cream placeholder-hero-muted/50 font-body text-base focus:border-gold focus:outline-none transition-colors resize-none rounded-none appearance-none" maxLength={2000} />
              <div className="pt-1">
                <HCaptcha sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2" reCaptchaCompat={false} theme="dark" onVerify={(token) => setCaptchaToken(token)} onExpire={() => setCaptchaToken("")} ref={captchaRef} />
              </div>
              <button type="submit" disabled={submitting} className="w-full sm:w-auto px-8 py-3.5 bg-gold text-primary font-body text-sm tracking-[0.15em] uppercase hover:bg-gold-light active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                {submitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>

          {/* Sidebar info */}
          <div className="lg:col-span-2 space-y-8">
            {[
              { icon: Mail, title: "Email", content: (<a href="mailto:info@purelyplannedconsulting.com" className="text-sm text-hero-muted font-body hover:text-gold transition-colors">info@purelyplannedconsulting.com</a>) },
              { icon: FileText, title: "New Clients", content: (<><a href="/intake" className="text-sm text-gold font-body hover:text-gold-light transition-colors">Complete Intake Form →</a><p className="text-xs text-hero-muted/60 font-body mt-2">Comprehensive form ensures we understand your needs</p></>) },
            ].map((card, i) => (
              <motion.div key={card.title} initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.5 + i * 0.12, ease: "easeOut" }} className="border border-charcoal-light p-6 hover:border-gold/30 transition-colors duration-300">
                <card.icon className="w-5 h-5 text-gold mb-3" strokeWidth={1.5} />
                <h4 className="font-heading text-lg text-cream mb-2">{card.title}</h4>
                {card.content}
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.74, ease: "easeOut" }} className="border border-charcoal-light p-6 hover:border-gold/30 transition-colors duration-300">
              <h4 className="font-heading text-lg text-cream mb-3">Our Specialties</h4>
              <ul className="space-y-2">
                {["Lifestyle Consulting", "Organizing", "Concierge & Snow Bird Services", "Relocation & Event Hospitality"].map((s) => (
                  <li key={s} className="text-sm text-hero-muted font-body flex items-center gap-2">
                    <span className="text-gold text-[6px]">●</span> {s}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
