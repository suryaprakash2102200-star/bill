"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { name: "Home", href: "#" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" }
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: "1rem 0",
        background: isScrolled ? "var(--nav-bg)" : "transparent",
        backdropFilter: isScrolled ? "blur(20px)" : "none",
        borderBottom: isScrolled ? "1px solid var(--nav-border)" : "none",
        boxShadow: isScrolled ? "var(--nav-shadow)" : "none",
        transition: "all 0.3s ease"
      }}
    >
      <div className="container flex justify-between items-center">
        {/* Logo */}
        <motion.a
          href="#"
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          <div style={{
            width: "2.5rem",
            height: "2.5rem",
            borderRadius: "0.75rem",
            background: "linear-gradient(135deg, #6366f1, #06b6d4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 6px -1px rgba(99, 102, 241, 0.3)"
          }}>
            <Sparkles size={20} color="white" />
          </div>
          <span className="gradient-text" style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
            Surya Prakash
          </span>
        </motion.a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex gap-1" style={{
            background: "var(--nav-menu-bg)",
            padding: "0.5rem",
            borderRadius: "9999px",
            boxShadow: "var(--nav-shadow)",
            border: "1px solid var(--nav-border)"
          }}>
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                style={{
                  padding: "0.5rem 1.5rem",
                  borderRadius: "9999px",
                  color: activeSection === item.name ? "white" : "var(--text-secondary)",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  transition: "all 0.3s",
                  background: activeSection === item.name ? "linear-gradient(135deg, #6366f1, #06b6d4)" : "transparent"
                }}
                whileHover={{ 
                  background: activeSection === item.name ? "linear-gradient(135deg, #6366f1, #06b6d4)" : "rgba(99, 102, 241, 0.1)",
                  color: activeSection === item.name ? "white" : "#6366f1"
                }}
                onClick={() => setActiveSection(item.name)}
              >
                {item.name}
              </motion.a>
            ))}
          </div>
          
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button & Toggle */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button className="gradient-text"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              background: "linear-gradient(135deg, #6366f1, #06b6d4)",
              border: "none",
              color: "white",
              cursor: "pointer",
              padding: "0.75rem",
              borderRadius: "0.75rem",
              boxShadow: "0 4px 6px -1px rgba(99, 102, 241, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden"
            style={{
              background: "var(--nav-menu-bg)",
              backdropFilter: "blur(20px)",
              borderTop: "1px solid var(--nav-border)",
              marginTop: "1rem",
              borderRadius: "1rem",
              marginLeft: "1rem",
              marginRight: "1rem",
              boxShadow: "var(--nav-shadow)"
            }}
          >
            <div className="flex flex-col gap-2" style={{ padding: "1.5rem" }}>
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setActiveSection(item.name);
                  }}
                  style={{
                    padding: "0.75rem 1rem",
                    borderRadius: "0.75rem",
                    color: "var(--text-secondary)",
                    fontSize: "1rem",
                    fontWeight: 600,
                    transition: "all 0.3s",
                    background: "transparent"
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = "linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(6, 182, 212, 0.1))";
                    e.target.style.color = "#6366f1";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = "transparent";
                    e.target.style.color = "var(--text-secondary)";
                  }}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
