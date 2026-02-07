import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#", section: "" },
  { label: "About", href: "#about", section: "about" },
  { label: "Services", href: "#services", section: "services" },
  { label: "Pricing", href: "#pricing", section: "pricing" },
  { label: "Contact", href: "#contact", section: "contact" },
];

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      // Determine active section
      const sections = navLinks
        .filter((l) => l.section)
        .map((l) => ({
          id: l.section,
          el: document.getElementById(l.section),
        }))
        .filter((s) => s.el);

      let current = "";
      for (const s of sections) {
        const rect = s.el!.getBoundingClientRect();
        if (rect.top <= 200) current = s.id;
      }
      setActiveSection(window.scrollY < 300 ? "" : current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass = (section: string) => {
    const isActive = activeSection === section || (!activeSection && !section);
    return `text-xs tracking-[0.2em] uppercase font-body font-medium transition-colors ${
      isActive
        ? "text-accent"
        : scrolled
          ? "text-foreground hover:text-accent"
          : "text-hero-foreground hover:text-accent"
    }`;
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="w-full px-6 md:px-12 flex items-center justify-start md:justify-center h-16 md:h-20">
        {/* Desktop */}
        <div className="hidden md:flex items-center justify-between w-full">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className={linkClass(link.section)}>
              {link.label}
            </a>
          ))}
          <a
            href="/intake"
            className="text-xs tracking-[0.2em] uppercase font-body font-medium px-5 py-2.5 border border-accent text-accent hover:bg-accent hover:text-primary-foreground transition-all"
          >
            Client Intake
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden transition-colors ${scrolled ? "text-foreground" : "text-hero-foreground"}`}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`text-sm tracking-[0.15em] uppercase font-body transition-colors ${
                    activeSection === link.section
                      ? "text-accent"
                      : "text-foreground hover:text-accent"
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/intake"
                className="text-sm tracking-[0.15em] uppercase font-body px-5 py-2.5 border border-accent text-accent text-center hover:bg-accent hover:text-primary-foreground transition-all mt-2"
              >
                Client Intake
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;
