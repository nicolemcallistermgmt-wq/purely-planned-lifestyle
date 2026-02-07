const Footer = () => (
  <footer className="bg-charcoal border-t border-charcoal-light py-10 px-6 md:px-12">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="font-heading text-lg text-cream">Purely Planned</p>
      <div className="flex items-center gap-6 text-xs text-hero-muted font-body">
        <span>Confidential & Discreet</span>
        <span className="text-gold/30">|</span>
        <span>Background Verified</span>
        <span className="text-gold/30">|</span>
        <span>Insured & Bonded</span>
      </div>
      <p className="text-xs text-hero-muted/50 font-body">
        © {new Date().getFullYear()} Purely Planned Consulting
      </p>
    </div>
  </footer>
);

export default Footer;
