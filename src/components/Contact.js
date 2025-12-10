"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/data/resume";
import { Mail, Phone, MapPin, Send, MessageCircle, User } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="section-padding" style={{ background: 'var(--section-bg-alt)' }}>
      <div className="container" style={{ maxWidth: '56rem' }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
          style={{ marginBottom: '3rem' }}
        >
          <div className="section-badge" style={{ marginBottom: '1rem' }}>
            <MessageCircle size={16} />
            <span>LET'S CONNECT</span>
          </div>
          <h2 style={{ color: 'var(--foreground)', marginBottom: '1rem' }}>Get In Touch</h2>
          <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--text-secondary)', fontSize: '1.125rem' }}>
            I'm currently open to new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card"
          style={{ padding: '3rem' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" style={{ marginBottom: '3rem' }}>
            <motion.div 
              className="flex flex-col items-center gap-4 text-center"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div style={{
                width: '4rem',
                height: '4rem',
                borderRadius: '1rem',
                background: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                boxShadow: 'var(--shadow-lg)',
                transition: 'all 0.3s ease'
              }}>
                <Mail size={28} />
              </div>
              <div>
                <h4 style={{ fontWeight: 700, color: 'var(--foreground)', marginBottom: '0.5rem', fontSize: '1.125rem' }}>Email</h4>
                <a 
                  href={`mailto:${resumeData.personalInfo.email}`} 
                  style={{ 
                    color: 'var(--primary)', 
                    transition: 'color 0.3s',
                    fontSize: '0.9375rem',
                    wordBreak: 'break-word',
                    fontWeight: 500
                  }}
                >
                  {resumeData.personalInfo.email}
                </a>
              </div>
            </motion.div>

            <motion.div 
              className="flex flex-col items-center gap-4 text-center"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div style={{
                width: '4rem',
                height: '4rem',
                borderRadius: '1rem',
                background: 'var(--success)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                boxShadow: 'var(--shadow-lg)',
                transition: 'all 0.3s ease'
              }}>
                <Phone size={28} />
              </div>
              <div>
                <h4 style={{ fontWeight: 700, color: 'var(--foreground)', marginBottom: '0.5rem', fontSize: '1.125rem' }}>Phone</h4>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', fontWeight: 500 }}>
                  {resumeData.personalInfo.phone}
                </span>
              </div>
            </motion.div>

            <motion.div 
              className="flex flex-col items-center gap-4 text-center"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div style={{
                width: '4rem',
                height: '4rem',
                borderRadius: '1rem',
                background: 'var(--warning)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                boxShadow: 'var(--shadow-lg)',
                transition: 'all 0.3s ease'
              }}>
                <MapPin size={28} />
              </div>
              <div>
                <h4 style={{ fontWeight: 700, color: 'var(--foreground)', marginBottom: '0.5rem', fontSize: '1.125rem' }}>Location</h4>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', fontWeight: 500 }}>
                  {resumeData.personalInfo.location}
                </span>
              </div>
            </motion.div>
          </div>

          <div style={{
            height: '2px',
            background: 'var(--card-border)',
            margin: '2rem 0'
          }} />

          <div className="text-center">
            <motion.a
              href={`mailto:${resumeData.personalInfo.email}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
              style={{
                padding: '1.25rem 3rem',
                fontSize: '1.0625rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}
            >
              <Send size={20} />
              <span>Send Message</span>
            </motion.a>
          </div>
        </motion.div>

        <footer className="text-center" style={{ marginTop: '4rem' }}>
          <div style={{
            padding: '2rem',
            background: 'var(--card-bg)',
            borderRadius: '1rem',
            border: '1px solid var(--card-border)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              gap: '0.5rem',
              marginBottom: '0.5rem'
            }}>
              <User size={20} style={{ color: 'var(--primary)' }} />
              <p style={{ color: 'var(--foreground)', fontSize: '1rem', fontWeight: 600, margin: 0 }}>
                © {new Date().getFullYear()} {resumeData.personalInfo.name}
              </p>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', margin: 0 }}>
              Built with Next.js, GSAP, Three.js & Framer Motion
            </p>
          </div>
        </footer>
      </div>
    </section>
  );
}
