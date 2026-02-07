import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Send, User, Home, Briefcase, Heart, Check, Mail, Phone, MessageSquare } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  preferredContact: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  services: string[];
  timeline: string;
  budget: string;
  referralSource: string;
  additionalInfo: string;
}

const initialForm: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  preferredContact: "email",
  address: "",
  city: "",
  state: "",
  zip: "",
  services: [],
  timeline: "",
  budget: "",
  referralSource: "",
  additionalInfo: "",
};

const serviceOptions = [
  "Lifestyle Consulting",
  "Home Organizing",
  "Concierge Services",
  "Snow Bird Services",
  "Relocation Assistance",
  "Event Hospitality",
  "Move Management",
  "Downsizing",
];

const steps = [
  { label: "Personal", icon: User, description: "Your contact details" },
  { label: "Location", icon: Home, description: "Where you're based" },
  { label: "Services", icon: Briefcase, description: "What you need" },
  { label: "Details", icon: Heart, description: "Project specifics" },
];

const contactMethods = [
  { value: "email", icon: Mail, label: "Email" },
  { value: "phone", icon: Phone, label: "Phone" },
  { value: "text", icon: MessageSquare, label: "Text" },
];

const inputClass =
  "w-full px-5 py-3.5 bg-charcoal-light/50 border border-hero-muted/20 text-cream placeholder-hero-muted/40 font-body text-sm focus:border-gold/60 focus:ring-1 focus:ring-gold/20 focus:outline-none transition-all duration-300 rounded";

const IntakeForm = () => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [direction, setDirection] = useState(1);

  const set = (field: keyof FormData, value: string | string[]) =>
    setForm((f) => ({ ...f, [field]: value }));

  const toggleService = (s: string) =>
    setForm((f) => ({
      ...f,
      services: f.services.includes(s)
        ? f.services.filter((x) => x !== s)
        : [...f.services, s],
    }));

  const canAdvance = () => {
    if (step === 0) return form.firstName && form.lastName && form.email;
    if (step === 1) return true;
    if (step === 2) return form.services.length > 0;
    return true;
  };

  const goNext = () => {
    setDirection(1);
    setStep((s) => s + 1);
  };

  const goBack = () => {
    setDirection(-1);
    setStep((s) => s - 1);
  };

  const goToStep = (i: number) => {
    if (i < step) {
      setDirection(-1);
      setStep(i);
    }
  };

  const handleSubmit = () => {
    const body = [
      `=== NEW CLIENT INTAKE FORM ===`,
      ``,
      `PERSONAL INFORMATION`,
      `Name: ${form.firstName} ${form.lastName}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone || "Not provided"}`,
      `Preferred Contact: ${form.preferredContact}`,
      ``,
      `LOCATION`,
      `Address: ${form.address || "Not provided"}`,
      `City: ${form.city || "Not provided"}`,
      `State: ${form.state || "Not provided"}`,
      `ZIP: ${form.zip || "Not provided"}`,
      ``,
      `SERVICES REQUESTED`,
      form.services.map((s) => `• ${s}`).join("\n"),
      ``,
      `PROJECT DETAILS`,
      `Timeline: ${form.timeline || "Not specified"}`,
      `Budget Range: ${form.budget || "Not specified"}`,
      `Referral Source: ${form.referralSource || "Not specified"}`,
      ``,
      `ADDITIONAL INFORMATION`,
      form.additionalInfo || "None provided",
    ].join("\n");

    window.location.href = `mailto:info@purelyplannedconsulting.com?subject=${encodeURIComponent(
      `New Client Intake: ${form.firstName} ${form.lastName}`
    )}&body=${encodeURIComponent(body)}`;

    setSubmitted(true);
  };

  const slideVariants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -60 : 60 }),
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center px-6">
        <Helmet>
          <title>Thank You | Purely Planned Consulting</title>
        </Helmet>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-md"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-8"
          >
            <Check className="w-8 h-8 text-gold" />
          </motion.div>
          <h1 className="font-heading text-4xl text-cream mb-4">Thank You</h1>
          <div className="h-px w-12 bg-gold mx-auto mb-6" />
          <p className="text-hero-muted font-body leading-relaxed mb-2">
            Your email client should have opened with the intake form details.
            Please press send to complete your submission.
          </p>
          <p className="text-hero-muted/50 font-body text-sm mb-10">
            If your email client didn't open, please email us directly at{" "}
            <a href="mailto:info@purelyplannedconsulting.com" className="text-gold hover:text-gold-light transition-colors">
              info@purelyplannedconsulting.com
            </a>
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gold font-body text-sm hover:text-gold-light transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal">
      <Helmet>
        <title>Client Intake Form | Purely Planned Consulting</title>
        <meta name="description" content="Submit your intake form to get started with Purely Planned Consulting's lifestyle management and home organization services." />
      </Helmet>

      {/* Back link */}
      <div className="px-6 py-5">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-hero-muted/60 hover:text-cream font-body text-sm transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back
        </Link>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto px-6 pt-4 pb-10 text-center"
      >
        <p className="text-[11px] tracking-[0.35em] uppercase text-gold font-body mb-4">New Client</p>
        <h1 className="text-3xl md:text-5xl font-heading text-cream mb-4">Intake Form</h1>
        <div className="h-px w-16 bg-gold/60 mx-auto mb-5" />
        <p className="text-hero-muted/70 font-body text-sm max-w-md mx-auto leading-relaxed">
          Complete this form so we can understand your needs and provide personalized service.
        </p>
      </motion.div>

      {/* Step indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="max-w-2xl mx-auto px-6 mb-10"
      >
        <div className="flex items-center justify-between relative">
          {/* Progress line */}
          <div className="absolute top-5 left-0 right-0 h-px bg-charcoal-light mx-10" />
          <div
            className="absolute top-5 left-0 h-px bg-gold/40 mx-10 transition-all duration-500"
            style={{ width: `${(step / (steps.length - 1)) * 100}%` }}
          />

          {steps.map((s, i) => {
            const Icon = s.icon;
            const active = i === step;
            const done = i < step;
            return (
              <button
                key={s.label}
                onClick={() => goToStep(i)}
                className={`relative z-10 flex flex-col items-center gap-2 transition-all duration-300 ${
                  done ? "cursor-pointer" : i > step ? "cursor-default" : "cursor-default"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    active
                      ? "bg-gold/15 border-2 border-gold text-gold shadow-[0_0_20px_rgba(184,149,92,0.15)]"
                      : done
                      ? "bg-gold text-charcoal border-2 border-gold"
                      : "bg-charcoal-light/50 border border-hero-muted/20 text-hero-muted/40"
                  }`}
                >
                  {done ? (
                    <Check className="w-4 h-4" strokeWidth={2.5} />
                  ) : (
                    <Icon className="w-4 h-4" strokeWidth={1.5} />
                  )}
                </div>
                <div className="text-center">
                  <p className={`text-[10px] uppercase tracking-widest font-body transition-colors duration-300 ${
                    active ? "text-gold" : done ? "text-cream/60" : "text-hero-muted/30"
                  }`}>
                    {s.label}
                  </p>
                  <p className={`text-[10px] font-body mt-0.5 hidden sm:block transition-colors duration-300 ${
                    active ? "text-hero-muted/60" : "text-transparent"
                  }`}>
                    {s.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Form card */}
      <div className="max-w-2xl mx-auto px-6 pb-20">
        <div className="bg-charcoal-light/20 border border-hero-muted/10 rounded-lg p-6 sm:p-10">
          {/* Step title */}
          <div className="mb-8">
            <h2 className="font-heading text-xl text-cream mb-1">{steps[step].label} Information</h2>
            <p className="text-hero-muted/50 font-body text-xs">{steps[step].description}</p>
          </div>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              {step === 0 && (
                <div className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] text-hero-muted/60 font-body mb-2 uppercase tracking-wider">First Name <span className="text-gold">*</span></label>
                      <input
                        type="text"
                        placeholder="Jane"
                        required
                        value={form.firstName}
                        onChange={(e) => set("firstName", e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-hero-muted/60 font-body mb-2 uppercase tracking-wider">Last Name <span className="text-gold">*</span></label>
                      <input
                        type="text"
                        placeholder="Smith"
                        required
                        value={form.lastName}
                        onChange={(e) => set("lastName", e.target.value)}
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] text-hero-muted/60 font-body mb-2 uppercase tracking-wider">Email <span className="text-gold">*</span></label>
                    <input
                      type="email"
                      placeholder="jane@example.com"
                      required
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-hero-muted/60 font-body mb-2 uppercase tracking-wider">Phone</label>
                    <input
                      type="tel"
                      placeholder="(555) 000-0000"
                      value={form.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-hero-muted/60 font-body mb-3 uppercase tracking-wider">Preferred Contact</label>
                    <div className="flex gap-3">
                      {contactMethods.map((m) => {
                        const Icon = m.icon;
                        const selected = form.preferredContact === m.value;
                        return (
                          <button
                            key={m.value}
                            type="button"
                            onClick={() => set("preferredContact", m.value)}
                            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-body border rounded transition-all duration-300 ${
                              selected
                                ? "border-gold/60 text-gold bg-gold/5"
                                : "border-hero-muted/15 text-hero-muted/50 hover:border-hero-muted/30 hover:text-hero-muted/70"
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5" strokeWidth={1.5} />
                            {m.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-[11px] text-hero-muted/60 font-body mb-2 uppercase tracking-wider">Street Address</label>
                    <input
                      type="text"
                      placeholder="123 Main Street"
                      value={form.address}
                      onChange={(e) => set("address", e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] text-hero-muted/60 font-body mb-2 uppercase tracking-wider">City</label>
                      <input
                        type="text"
                        placeholder="Naples"
                        value={form.city}
                        onChange={(e) => set("city", e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-hero-muted/60 font-body mb-2 uppercase tracking-wider">State</label>
                      <input
                        type="text"
                        placeholder="FL"
                        value={form.state}
                        onChange={(e) => set("state", e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-hero-muted/60 font-body mb-2 uppercase tracking-wider">ZIP Code</label>
                      <input
                        type="text"
                        placeholder="34102"
                        value={form.zip}
                        onChange={(e) => set("zip", e.target.value)}
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <p className="text-hero-muted/30 font-body text-xs pt-2">
                    All location fields are optional. Provide what's relevant to your project.
                  </p>
                </div>
              )}

              {step === 2 && (
                <div>
                  <p className="text-sm text-hero-muted/60 font-body mb-5">
                    Select all services you're interested in <span className="text-gold">*</span>
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {serviceOptions.map((s) => {
                      const selected = form.services.includes(s);
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => toggleService(s)}
                          className={`group relative px-5 py-4 text-sm font-body text-left border rounded transition-all duration-300 ${
                            selected
                              ? "border-gold/50 text-cream bg-gold/8"
                              : "border-hero-muted/15 text-hero-muted/60 hover:border-hero-muted/30 hover:text-hero-muted"
                          }`}
                        >
                          <span className="flex items-center justify-between">
                            {s}
                            {selected && (
                              <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-5 h-5 rounded-full bg-gold/20 flex items-center justify-center"
                              >
                                <Check className="w-3 h-3 text-gold" strokeWidth={2.5} />
                              </motion.span>
                            )}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {form.services.length > 0 && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-gold/60 font-body text-xs mt-4"
                    >
                      {form.services.length} service{form.services.length > 1 ? "s" : ""} selected
                    </motion.p>
                  )}
                </div>
              )}

              {step === 3 && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-[11px] text-hero-muted/60 font-body mb-2 uppercase tracking-wider">Ideal Timeline</label>
                    <Select value={form.timeline} onValueChange={(v) => set("timeline", v)}>
                      <SelectTrigger className="w-full px-5 py-3.5 h-auto bg-charcoal-light/50 border-hero-muted/20 text-cream font-body text-sm rounded focus:ring-gold/20 focus:ring-1 focus:border-gold/60 [&>svg]:text-hero-muted/40">
                        <SelectValue placeholder="Select timeline..." />
                      </SelectTrigger>
                      <SelectContent className="bg-charcoal border-hero-muted/20 z-50 rounded">
                        {[
                          { value: "ASAP", label: "As soon as possible" },
                          { value: "1-2 weeks", label: "1–2 weeks" },
                          { value: "1 month", label: "Within a month" },
                          { value: "2-3 months", label: "2–3 months" },
                          { value: "Flexible", label: "Flexible / No rush" },
                        ].map((o) => (
                          <SelectItem key={o.value} value={o.value} className="text-cream/80 font-body text-sm hover:bg-charcoal-light focus:bg-charcoal-light focus:text-gold cursor-pointer">
                            {o.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-[11px] text-hero-muted/60 font-body mb-2 uppercase tracking-wider">Budget Range</label>
                    <Select value={form.budget} onValueChange={(v) => set("budget", v)}>
                      <SelectTrigger className="w-full px-5 py-3.5 h-auto bg-charcoal-light/50 border-hero-muted/20 text-cream font-body text-sm rounded focus:ring-gold/20 focus:ring-1 focus:border-gold/60 [&>svg]:text-hero-muted/40">
                        <SelectValue placeholder="Select budget range..." />
                      </SelectTrigger>
                      <SelectContent className="bg-charcoal border-hero-muted/20 z-50 rounded">
                        {[
                          { value: "Under $500", label: "Under $500" },
                          { value: "$500 - $1,000", label: "$500 – $1,000" },
                          { value: "$1,000 - $2,500", label: "$1,000 – $2,500" },
                          { value: "$2,500 - $5,000", label: "$2,500 – $5,000" },
                          { value: "$5,000+", label: "$5,000+" },
                          { value: "Prefer to discuss", label: "Prefer to discuss" },
                        ].map((o) => (
                          <SelectItem key={o.value} value={o.value} className="text-cream/80 font-body text-sm hover:bg-charcoal-light focus:bg-charcoal-light focus:text-gold cursor-pointer">
                            {o.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-[11px] text-hero-muted/60 font-body mb-2 uppercase tracking-wider">How did you hear about us?</label>
                    <input
                      type="text"
                      placeholder="Referral, social media, search..."
                      value={form.referralSource}
                      onChange={(e) => set("referralSource", e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-hero-muted/60 font-body mb-2 uppercase tracking-wider">Anything else we should know?</label>
                    <textarea
                      placeholder="Tell us about your project or situation..."
                      rows={4}
                      value={form.additionalInfo}
                      onChange={(e) => set("additionalInfo", e.target.value)}
                      className={inputClass + " resize-none"}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-hero-muted/10">
            <button
              type="button"
              onClick={goBack}
              className={`flex items-center gap-2 px-5 py-3 text-xs uppercase tracking-wider font-body text-hero-muted/50 hover:text-cream transition-colors rounded group ${
                step === 0 ? "invisible" : ""
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              Back
            </button>

            {step < 3 ? (
              <button
                type="button"
                onClick={goNext}
                disabled={!canAdvance()}
                className="flex items-center gap-2 px-8 py-3 bg-gold text-charcoal font-body text-xs tracking-[0.15em] uppercase hover:bg-gold-light transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed rounded group"
              >
                Continue
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="flex items-center gap-2 px-8 py-3 bg-gold text-charcoal font-body text-xs tracking-[0.15em] uppercase hover:bg-gold-light transition-all duration-300 rounded group"
              >
                <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" /> Submit
              </button>
            )}
          </div>
        </div>

        {/* Step counter */}
        <p className="text-center text-hero-muted/30 font-body text-xs mt-6">
          Step {step + 1} of {steps.length}
        </p>
      </div>
    </div>
  );
};

export default IntakeForm;
