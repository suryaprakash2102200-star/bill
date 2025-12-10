"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { resumeData } from "@/data/resume";
import { Calendar, MapPin, Briefcase, Award, TrendingUp } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 }
  }
};

export default function Experience() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (sectionRef.current) {
      const cards = sectionRef.current.querySelectorAll('.experience-card');
      
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { 
            opacity: 0, 
            x: -100,
            rotationY: -20,
            scale: 0.9
          },
          {
            opacity: 1,
            x: 0,
            rotationY: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "top 50%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }
  }, []);

  return (
    <section id="experience" className="section-padding relative" ref={sectionRef} style={{ background: 'var(--section-bg-alt)' }}>
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
          style={{ marginBottom: '4rem' }}
        >
          <div className="section-badge" style={{ marginBottom: '1rem' }}>
            <Award size={16} />
            <span>PROFESSIONAL JOURNEY</span>
          </div>
          <h2 style={{ color: 'var(--foreground)', marginBottom: '1rem' }}>Experience</h2>
          <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--text-secondary)' }}>
            Building exceptional digital experiences with cutting-edge technologies
          </p>
        </motion.div>

        <div style={{ position: 'relative', paddingLeft: '2rem', maxWidth: '900px', margin: '0 auto' }}>
          {/* Timeline Line */}
          <div className="timeline-line" style={{ left: '0' }} />
          
          {resumeData.experience.map((exp, index) => (
            <motion.div 
              key={index}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              style={{ position: 'relative', paddingLeft: '2rem', marginBottom: '3rem', perspective: '1000px' }}
              className="experience-card"
            >
              {/* Timeline Dot */}
              <div className="timeline-dot" style={{ top: '0', left: '-2.1rem' }} />

              <div className="card">
                <div className="flex flex-col md:flex-row justify-between gap-4" style={{ marginBottom: '1.5rem' }}>
                  <div>
                    <h3 style={{ color: 'var(--foreground)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <TrendingUp size={24} style={{ color: 'var(--primary)' }} />
                      {exp.role}
                    </h3>
                    <div className="flex gap-4" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', flexWrap: 'wrap' }}>
                      <span className="flex items-center gap-2">
                        <Briefcase size={16} style={{ color: 'var(--primary)' }} /> 
                        <strong>{exp.company}</strong>
                      </span>
                      <span className="flex items-center gap-2">
                        <MapPin size={16} color="var(--success)" /> {exp.location}
                      </span>
                      <span className="flex items-center gap-2">
                        <Calendar size={16} color="var(--warning)" /> {exp.duration}
                      </span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {exp.details.map((detail, i) => (
                    <motion.div key={i} variants={itemVariants}>
                      {typeof detail === 'string' ? (
                        <p style={{ 
                          fontStyle: 'italic', 
                          borderLeft: '3px solid var(--primary)', 
                          paddingLeft: '1rem',
                          background: 'var(--primary-light)',
                          padding: '0.75rem 1rem',
                          borderRadius: '0.5rem',
                          color: 'var(--primary-dark)'
                        }}>
                          {detail}
                        </p>
                      ) : (
                        <div style={{
                          background: 'var(--section-bg-alt)',
                          padding: '1rem',
                          borderRadius: '0.75rem',
                          border: '2px solid var(--card-border)'
                        }}>
                          <h4 style={{ 
                            fontSize: '1.125rem', 
                            fontWeight: 700, 
                            color: 'var(--primary)', 
                            marginBottom: '0.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                          }}>
                            <span style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              background: 'var(--primary)'
                            }} />
                            {detail.title}
                          </h4>
                          <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                            {detail.description}
                          </p>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
