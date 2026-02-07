import { ShieldCheck, Eye, UserCheck } from "lucide-react";

const badges = [
  { icon: Eye, label: "Confidential & Discreet" },
  { icon: UserCheck, label: "Background Verified" },
  { icon: ShieldCheck, label: "Fully Insured" },
];

const Footer = () => (
  <footer className="bg-charcoal border-t border-charcoal-light py-12 px-6 md:px-12">
    <div className="max-w-6xl mx-auto flex flex-col items-center gap-8">
      {/* Trust badges */}
      <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
        {badges.map((b) => (
          <div
            key={b.label}
            className="flex items-center gap-2.5 px-5 py-3 border border-gold/20 bg-gold/5 text-cream"
          >
            <b.icon className="w-4 h-4 text-gold shrink-0" strokeWidth={1.5} />
            <span className="text-xs tracking-[0.15em] uppercase font-body font-medium">
              {b.label}
            </span>
          </div>
        ))}
      </div>

      <p className="text-xs text-hero-muted/50 font-body">
        © {new Date().getFullYear()} Purely Planned Consulting
      </p>
    </div>
  </footer>
);

export default Footer;
