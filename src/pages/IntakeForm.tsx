import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Send, User, Home, Briefcase, Heart } from "lucide-react";
import { Link } from "react-router-dom";

interface FormData {
  // Personal
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  preferredContact: string;
  // Address
  address: string;
  city: string;
  state: string;
  zip: string;
  // Services
  services: string[];
  // Details
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
  { label: "Personal", icon: User },
  { label: "Location", icon: Home },
  { label: "Services", icon: Briefcase },
  { label: "Details", icon: Heart },
];

const inputClass =
  "w-full px-4 py-3 bg-charcoal-light border border-charcoal-light text-cream placeholder-hero-muted/50 font-body text-sm focus:border-gold focus:outline-none transition-colors";

const IntakeForm = () => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);

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

    window.location.href = `mailto:nicole@purelyplannedconsulting.com?subject=${encodeURIComponent(
      `New Client Intake: ${form.firstName} ${form.lastName}`
    )}&body=${encodeURIComponent(body)}`;

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
            <Send className="w-7 h-7 text-gold" />
          </div>
          <h1 className="font-heading text-3xl text-cream mb-4">Thank You</h1>
          <p className="text-hero-muted font-body mb-2">
            Your email client should have opened with the intake form details.
            Please press send in your email app to complete your submission.
          </p>
          <p className="text-hero-muted/60 font-body text-sm mb-8">
            If your email client didn't open, please email us directly at{" "}
            <a href="mailto:nicole@purelyplannedconsulting.com" className="text-gold hover:underline">
              nicole@purelyplannedconsulting.com
            </a>
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gold font-body text-sm hover:text-gold-light transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-charcoal border-b border-charcoal-light">
        <div className="max-w-3xl mx-auto px-6 py-6 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-hero-muted hover:text-cream font-body text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <span className="font-heading text-lg text-cream">Purely Planned</span>
          <div className="w-16" />
        </div>
      </div>

      {/* Title */}
      <div className="max-w-3xl mx-auto px-6 pt-12 pb-8 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-gold font-body mb-3">New Client</p>
        <h1 className="text-3xl md:text-4xl font-heading text-cream mb-3">Intake Form</h1>
        <div className="h-px w-16 bg-gold mx-auto mb-4" />
        <p className="text-hero-muted font-body text-sm max-w-lg mx-auto">
          Please complete this form so we can understand your needs and provide personalized service.
        </p>
      </div>

      {/* Step indicator */}
      <div className="max-w-3xl mx-auto px-6 mb-10">
        <div className="flex items-center justify-center gap-2 md:gap-4">
          {steps.map((s, i) => {
            const Icon = s.icon;
            const active = i === step;
            const done = i < step;
            return (
              <button
                key={s.label}
                onClick={() => i < step && setStep(i)}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-body uppercase tracking-wider transition-colors ${
                  active
                    ? "text-gold border-b border-gold"
                    : done
                    ? "text-cream/70 cursor-pointer hover:text-cream"
                    : "text-hero-muted/40 cursor-default"
                }`}
              >
                <Icon className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span className="hidden sm:inline">{s.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Form steps */}
      <div className="max-w-3xl mx-auto px-6 pb-20">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {step === 0 && (
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name *"
                  required
                  value={form.firstName}
                  onChange={(e) => set("firstName", e.target.value)}
                  className={inputClass}
                />
                <input
                  type="text"
                  placeholder="Last Name *"
                  required
                  value={form.lastName}
                  onChange={(e) => set("lastName", e.target.value)}
                  className={inputClass}
                />
              </div>
              <input
                type="email"
                placeholder="Email Address *"
                required
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                className={inputClass}
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                className={inputClass}
              />
              <div>
                <label className="block text-xs text-hero-muted font-body mb-2">Preferred Contact Method</label>
                <div className="flex gap-4">
                  {["email", "phone", "text"].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => set("preferredContact", m)}
                      className={`px-4 py-2 text-xs uppercase tracking-wider font-body border transition-colors ${
                        form.preferredContact === m
                          ? "border-gold text-gold"
                          : "border-charcoal-light text-hero-muted/60 hover:border-hero-muted/40"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Street Address"
                value={form.address}
                onChange={(e) => set("address", e.target.value)}
                className={inputClass}
              />
              <div className="grid sm:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="City"
                  value={form.city}
                  onChange={(e) => set("city", e.target.value)}
                  className={inputClass}
                />
                <input
                  type="text"
                  placeholder="State"
                  value={form.state}
                  onChange={(e) => set("state", e.target.value)}
                  className={inputClass}
                />
                <input
                  type="text"
                  placeholder="ZIP Code"
                  value={form.zip}
                  onChange={(e) => set("zip", e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <p className="text-sm text-hero-muted font-body mb-4">
                Select all services you're interested in *
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {serviceOptions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggleService(s)}
                    className={`px-4 py-3 text-sm font-body text-left border transition-colors ${
                      form.services.includes(s)
                        ? "border-gold text-gold bg-gold/5"
                        : "border-charcoal-light text-hero-muted hover:border-hero-muted/40"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-hero-muted font-body mb-2">Ideal Timeline</label>
                <select
                  value={form.timeline}
                  onChange={(e) => set("timeline", e.target.value)}
                  className={inputClass + " appearance-none"}
                >
                  <option value="">Select timeline...</option>
                  <option value="ASAP">As soon as possible</option>
                  <option value="1-2 weeks">1–2 weeks</option>
                  <option value="1 month">Within a month</option>
                  <option value="2-3 months">2–3 months</option>
                  <option value="Flexible">Flexible / No rush</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-hero-muted font-body mb-2">Budget Range</label>
                <select
                  value={form.budget}
                  onChange={(e) => set("budget", e.target.value)}
                  className={inputClass + " appearance-none"}
                >
                  <option value="">Select budget range...</option>
                  <option value="Under $500">Under $500</option>
                  <option value="$500 - $1,000">$500 – $1,000</option>
                  <option value="$1,000 - $2,500">$1,000 – $2,500</option>
                  <option value="$2,500 - $5,000">$2,500 – $5,000</option>
                  <option value="$5,000+">$5,000+</option>
                  <option value="Prefer to discuss">Prefer to discuss</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-hero-muted font-body mb-2">How did you hear about us?</label>
                <input
                  type="text"
                  placeholder="Referral, social media, search..."
                  value={form.referralSource}
                  onChange={(e) => set("referralSource", e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs text-hero-muted font-body mb-2">Anything else we should know?</label>
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

        {/* Navigation */}
        <div className="flex justify-between mt-10">
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className={`px-6 py-3 text-xs uppercase tracking-wider font-body border border-charcoal-light text-hero-muted hover:text-cream hover:border-hero-muted/40 transition-colors ${
              step === 0 ? "invisible" : ""
            }`}
          >
            Back
          </button>

          {step < 3 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              disabled={!canAdvance()}
              className="px-8 py-3 bg-gold text-primary font-body text-xs tracking-[0.15em] uppercase hover:bg-gold-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="px-8 py-3 bg-gold text-primary font-body text-xs tracking-[0.15em] uppercase hover:bg-gold-light transition-colors flex items-center gap-2"
            >
              <Send className="w-3.5 h-3.5" /> Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default IntakeForm;
