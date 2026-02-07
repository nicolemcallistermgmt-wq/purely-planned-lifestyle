import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Send, User, Home, Briefcase, Heart, Check, Mail, Phone, MessageSquare, Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { intakeSchema, ALLOWED_SERVICES, type IntakeFormData } from "@/lib/intake-schema";
import { toast } from "@/hooks/use-toast";
import HCaptcha from "@hcaptcha/react-hcaptcha";

const serviceOptions = [...ALLOWED_SERVICES];

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
] as const;

const inputClass =
  "w-full px-5 py-3.5 bg-charcoal-light/50 border border-hero-muted/20 text-cream placeholder-hero-muted/40 font-body text-sm focus:border-gold/60 focus:ring-1 focus:ring-gold/20 focus:outline-none transition-all duration-300 rounded";

const errorClass = "text-red-400 font-body text-xs mt-1.5";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  preferredContact: "email" as const,
  address: "",
  city: "",
  state: "",
  zip: "",
  services: [] as string[],
  timeline: "",
  budget: "",
  referralSource: "",
  additionalInfo: "",
};

const IntakeForm = () => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [direction, setDirection] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  // Honeypot field - hidden from real users
  const [honeypot, setHoneypot] = useState("");
  // hCaptcha
  const [captchaToken, setCaptchaToken] = useState("");
  const captchaRef = useRef<HCaptcha>(null);

  const set = (field: keyof typeof initialForm, value: string | string[]) => {
    setForm((f) => ({ ...f, [field]: value }));
    // Clear error on change
    if (fieldErrors[field]) {
      setFieldErrors((e) => {
        const next = { ...e };
        delete next[field];
        return next;
      });
    }
  };

  const toggleService = (s: string) =>
    setForm((f) => ({
      ...f,
      services: f.services.includes(s)
        ? f.services.filter((x) => x !== s)
        : [...f.services, s],
    }));

  const validateStep = (): boolean => {
    const result = intakeSchema.safeParse(form);
    if (result.success) {
      setFieldErrors({});
      return true;
    }

    const errors: Record<string, string> = {};
    const stepFields: Record<number, string[]> = {
      0: ["firstName", "lastName", "email", "phone", "preferredContact"],
      1: ["address", "city", "state", "zip"],
      2: ["services"],
      3: ["timeline", "budget", "referralSource", "additionalInfo"],
    };

    const currentFields = stepFields[step];
    result.error.issues.forEach((issue) => {
      const field = issue.path[0] as string;
      if (currentFields.includes(field) && !errors[field]) {
        errors[field] = issue.message;
      }
    });

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const canAdvance = () => {
    if (step === 0) return form.firstName && form.lastName && form.email;
    if (step === 2) return form.services.length > 0;
    return true;
  };

  const goNext = () => {
    if (!validateStep()) return;
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

  const handleSubmit = async () => {
    // Full validation
    const result = intakeSchema.safeParse(form);
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        if (!errors[field]) errors[field] = issue.message;
      });
      setFieldErrors(errors);
      toast({ title: "Please fix the errors before submitting.", variant: "destructive" });
      return;
    }

    if (!captchaToken) {
      toast({ title: "Please complete the captcha verification.", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("access_key", "db4d914c-862c-4068-b930-1b34baaf4951");
      formData.append("subject", `New Client Intake: ${result.data.firstName} ${result.data.lastName}`);
      formData.append("from_name", `${result.data.firstName} ${result.data.lastName}`);
      formData.append("replyto", result.data.email);
      formData.append("First Name", result.data.firstName);
      formData.append("Last Name", result.data.lastName);
      formData.append("Email", result.data.email);
      formData.append("Phone", result.data.phone || "Not provided");
      formData.append("Preferred Contact", result.data.preferredContact || "email");
      formData.append("Address", result.data.address || "Not provided");
      formData.append("City", result.data.city || "Not provided");
      formData.append("State", result.data.state || "Not provided");
      formData.append("ZIP", result.data.zip || "Not provided");
      formData.append("Services Requested", result.data.services.join(", "));
      formData.append("Timeline", result.data.timeline || "Not specified");
      formData.append("Budget Range", result.data.budget || "Not specified");
      formData.append("Referral Source", result.data.referralSource || "Not specified");
      formData.append("Additional Information", result.data.additionalInfo || "None provided");
      formData.append("h-captcha-response", captchaToken);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
      } else {
        toast({
          title: "Submission failed",
          description: data.message || "Please try again later.",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error("Fetch error:", err);
      toast({
        title: "Network error",
        description: "Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
      // Reset captcha for retry
      setCaptchaToken("");
      captchaRef.current?.resetCaptcha();
    }
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
            Your intake form has been submitted successfully. We'll review your information and be in touch shortly.
          </p>
          <p className="text-hero-muted/50 font-body text-sm mb-10">
            If you need immediate assistance, email us at{" "}
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
                  done ? "cursor-pointer" : "cursor-default"
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
          {/* Honeypot - invisible to humans */}
          <div className="absolute opacity-0 h-0 overflow-hidden" aria-hidden="true" tabIndex={-1}>
            <label htmlFor="website">Website</label>
            <input
              id="website"
              name="website"
              type="text"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              autoComplete="off"
              tabIndex={-1}
            />
          </div>

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
                        value={form.firstName}
                        onChange={(e) => set("firstName", e.target.value)}
                        className={`${inputClass} ${fieldErrors.firstName ? "border-red-400/60" : ""}`}
                        maxLength={100}
                      />
                      {fieldErrors.firstName && <p className={errorClass}>{fieldErrors.firstName}</p>}
                    </div>
                    <div>
                      <label className="block text-[11px] text-hero-muted/60 font-body mb-2 uppercase tracking-wider">Last Name <span className="text-gold">*</span></label>
                      <input
                        type="text"
                        placeholder="Smith"
                        value={form.lastName}
                        onChange={(e) => set("lastName", e.target.value)}
                        className={`${inputClass} ${fieldErrors.lastName ? "border-red-400/60" : ""}`}
                        maxLength={100}
                      />
                      {fieldErrors.lastName && <p className={errorClass}>{fieldErrors.lastName}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] text-hero-muted/60 font-body mb-2 uppercase tracking-wider">Email <span className="text-gold">*</span></label>
                    <input
                      type="email"
                      placeholder="jane@example.com"
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                      className={`${inputClass} ${fieldErrors.email ? "border-red-400/60" : ""}`}
                      maxLength={255}
                    />
                    {fieldErrors.email && <p className={errorClass}>{fieldErrors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-[11px] text-hero-muted/60 font-body mb-2 uppercase tracking-wider">Phone</label>
                    <input
                      type="tel"
                      placeholder="(555) 000-0000"
                      value={form.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      className={`${inputClass} ${fieldErrors.phone ? "border-red-400/60" : ""}`}
                      maxLength={30}
                    />
                    {fieldErrors.phone && <p className={errorClass}>{fieldErrors.phone}</p>}
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
                      maxLength={200}
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
                        maxLength={100}
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
                        maxLength={50}
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-hero-muted/60 font-body mb-2 uppercase tracking-wider">ZIP Code</label>
                      <input
                        type="text"
                        placeholder="34102"
                        value={form.zip}
                        onChange={(e) => set("zip", e.target.value)}
                        className={`${inputClass} ${fieldErrors.zip ? "border-red-400/60" : ""}`}
                        maxLength={15}
                      />
                      {fieldErrors.zip && <p className={errorClass}>{fieldErrors.zip}</p>}
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
                  {fieldErrors.services && <p className={errorClass + " mt-3"}>{fieldErrors.services}</p>}
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
                      maxLength={200}
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
                      maxLength={2000}
                    />
                  </div>
                  {/* hCaptcha */}
                  <div className="pt-2">
                    <HCaptcha
                      sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
                      reCaptchaCompat={false}
                      theme="dark"
                      onVerify={(token) => setCaptchaToken(token)}
                      onExpire={() => setCaptchaToken("")}
                      ref={captchaRef}
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
                disabled={submitting}
                className="flex items-center gap-2 px-8 py-3 bg-gold text-charcoal font-body text-xs tracking-[0.15em] uppercase hover:bg-gold-light transition-all duration-300 rounded group disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> Submitting…
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" /> Submit
                  </>
                )}
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
