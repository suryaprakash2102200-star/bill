"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Scene3D from "./Scene3D";
import { resumeData } from "@/data/resume";
import { ArrowDown, Code, Rocket, Sparkles } from "lucide-react";

export default function Hero() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={sectionRef} className="relative h-screen w-full flex items-center" style={{ 
      overflow: 'hidden', 
      paddingTop: '4rem',
      background: 'var(--background)'
    }}>
      {/* Single 3D Background */}
      <Scene3D />
      
      {/* Floating Icons */}
      <motion.div 
        className="absolute animate-float"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 0.5, duration: 1 }}
        style={{ 
          top: '20%', 
          left: '10%',
          y
        }}
      >
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '20px',
          background: 'var(--primary-light)',
          border: '2px solid var(--primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--primary)'
        }}>
          <Code size={40} />
        </div>
      </motion.div>

      <motion.div 
        className="absolute animate-float"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 0.7, duration: 1 }}
        style={{ 
          bottom: '15%', 
          left: '15%',
          animationDelay: '2s',
          y
        }}
      >
        <div style={{
          width: '60px',
          height: '60px',
          borderRadius: '15px',
          background: 'var(--background)',
          border: '2px solid var(--warning)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--warning)'
        }}>
          <Sparkles size={30} />
        </div>
      </motion.div>

      <motion.div 
        className="absolute animate-float"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 0.9, duration: 1 }}
        style={{ 
          top: '30%', 
          right: '15%',
          animationDelay: '1s',
          y
        }}
      >
        <div style={{
          width: '70px',
          height: '70px',
          borderRadius: '18px',
          background: 'var(--background)',
          border: '2px solid var(--accent)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--accent)'
        }}>
          <Rocket size={35} />
        </div>
      </motion.div>
      
      <motion.div className="container relative z-10" style={{ y, opacity }}>
        <div style={{ maxWidth: '800px' }}>
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="section-badge"
              style={{ marginBottom: '2rem' }}
            >
              <Sparkles size={16} />
              <span>WELCOME TO MY PORTFOLIO</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }}
              style={{ 
                marginBottom: '1.5rem',
                color: 'var(--foreground)',
                fontWeight: 800,
                perspective: '1000px'
              }}
            >
              {resumeData.personalInfo.name}
            </motion.h1>
            
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              style={{ 
                color: 'var(--primary)', 
                marginBottom: '2rem',
                fontSize: '2rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}
            >
              <Code size={32} />
              {resumeData.personalInfo.role}
            </motion.h3>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.7 }}
              style={{ 
                margin: '0 0 2.5rem 0', 
                fontSize: '1.125rem',
                lineHeight: '1.8',
                color: 'var(--text-secondary)',
                maxWidth: '600px'
              }}
            >
              {resumeData.personalInfo.summary}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
            >
              <motion.a
                href="#projects"
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Rocket size={20} />
                <span>View My Work</span>
              </motion.a>
              
              <motion.a
                href="#contact"
                className="btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sparkles size={20} />
                <span>Get In Touch</span>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="absolute animate-bounce" style={{ 
        bottom: '2.5rem', 
        left: '50%', 
        transform: 'translateX(-50%)', 
        color: 'var(--primary)' 
      }}>
        <ArrowDown size={28} />
      </div>
    </section>
  );
}
