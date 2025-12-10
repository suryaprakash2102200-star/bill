"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { resumeData } from "@/data/resume";
import { ExternalLink, Github, Folder, Star } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Projects() {
  const projectsRef = useRef(null);

  useEffect(() => {
    if (projectsRef.current) {
      const cards = projectsRef.current.querySelectorAll('.project-card');
      
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { 
            opacity: 0, 
            y: 100,
            scale: 0.8,
            rotationX: 45
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationX: 0,
            duration: 1,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 60%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }
  }, []);

  return (
    <section id="projects" className="section-padding" style={{ background: 'var(--card-bg)' }}>
      <div className="container" ref={projectsRef}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
          style={{ marginBottom: '4rem' }}
        >
          <div className="section-badge" style={{ marginBottom: '1rem' }}>
            <Folder size={16} />
            <span>MY WORK</span>
          </div>
          <h2 style={{ color: 'var(--foreground)', marginBottom: '1rem' }}>Featured Projects</h2>
          <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--text-secondary)' }}>
            Showcasing innovative solutions and creative implementations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: '2rem', perspective: '1000px' }}>
          {resumeData.projects.map((project, index) => (
            <div
              key={index}
              className="card project-card"
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                transformStyle: 'preserve-3d',
                position: 'relative'
              }}
            >
              <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div className="flex justify-between items-start" style={{ marginBottom: '1.5rem' }}>
                  <div style={{
                    width: '3.5rem',
                    height: '3.5rem',
                    borderRadius: '1rem',
                    background: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.75rem',
                    boxShadow: 'var(--shadow-lg)'
                  }}>
                    📦
                  </div>
                  <div className="flex gap-2">
                    <button style={{ 
                      padding: '0.625rem', 
                      borderRadius: '0.5rem', 
                      background: 'var(--card-bg)', 
                      border: '2px solid var(--card-border)', 
                      color: 'var(--text-secondary)', 
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      boxShadow: 'var(--shadow-sm)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Github size={18} />
                    </button>
                    <button style={{ 
                      padding: '0.625rem', 
                      borderRadius: '0.5rem', 
                      background: 'var(--primary)', 
                      border: 'none', 
                      color: 'white', 
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      boxShadow: 'var(--shadow-md)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <ExternalLink size={18} />
                    </button>
                  </div>
                </div>
                
                <h3 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: 'bold', 
                  color: 'var(--foreground)',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <Star size={20} color="var(--warning)" fill="var(--warning)" />
                  {project.title}
                </h3>

                <p style={{ 
                  marginBottom: '1.5rem', 
                  flex: 1,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.7',
                  fontSize: '0.9375rem'
                }}>
                  {project.description}
                </p>

                <div className="flex" style={{ flexWrap: 'wrap', gap: '0.5rem' }}>
                  {project.tags.map((tag, i) => (
                    <span key={i} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
