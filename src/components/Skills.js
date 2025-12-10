"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/data/resume";
import { Zap, Target, CheckCircle2, Code2, Database, Layout, Server, Wrench } from "lucide-react";

// Categorize skills for better display
const skillCategories = [
  {
    name: "Frontend",
    icon: <Layout size={20} />,
    color: "text-blue-500",
    bg: "bg-blue-100 dark:bg-blue-900/30",
    skills: ["React.js", "Next.js", "JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3", "Tailwind CSS", "Material UI", "Redux"]
  },
  {
    name: "Backend",
    icon: <Server size={20} />,
    color: "text-emerald-500",
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
    skills: ["Node.js", "Express", "MongoDB", "REST APIs"]
  },
  {
    name: "Tools & Others",
    icon: <Wrench size={20} />,
    color: "text-purple-500",
    bg: "bg-purple-100 dark:bg-purple-900/30",
    skills: ["Git", "GitHub", "VS Code", "Postman", "Responsive Design"]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="section-padding" style={{ background: 'var(--section-bg-alt)' }}>
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
            <Zap size={16} />
            <span>EXPERTISE</span>
          </div>
          <h2 style={{ color: 'var(--foreground)', marginBottom: '1rem' }}>Skills & Expertise</h2>
          <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--text-secondary)' }}>
            Mastering modern technologies to build exceptional digital experiences
          </p>
        </motion.div>

        {/* Technical Skills - Tech Cloud / Categorized Layout */}
        <div style={{ marginBottom: '5rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '3rem',
            justifyContent: 'center'
          }}>
            <div style={{
              width: '3.5rem',
              height: '3.5rem',
              borderRadius: '1rem',
              background: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              boxShadow: 'var(--shadow-lg)'
            }}>
              <Code2 size={24} />
            </div>
            <h3 style={{ 
              fontSize: '2rem', 
              fontWeight: 700, 
              color: 'var(--foreground)'
            }}>
              Technical Stack
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skillCategories.map((category, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="card"
                style={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.75rem', 
                  marginBottom: '1.5rem',
                  paddingBottom: '1rem',
                  borderBottom: '1px solid var(--card-border)'
                }}>
                  <div className={`p-2 rounded-lg ${category.bg} ${category.color}`}>
                    {category.icon}
                  </div>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--foreground)' }}>
                    {category.name}
                  </h4>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  {category.skills.map((skill, i) => (
                    <motion.span
                      key={i}
                      whileHover={{ scale: 1.05, y: -2 }}
                      style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '0.5rem',
                        background: 'var(--section-bg-alt)',
                        color: 'var(--text-primary)',
                        fontSize: '0.925rem',
                        fontWeight: 500,
                        border: '1px solid var(--card-border)',
                        cursor: 'default',
                        transition: 'all 0.2s ease',
                        boxShadow: 'var(--shadow-sm)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--primary)';
                        e.currentTarget.style.background = 'var(--primary-light)';
                        e.currentTarget.style.color = 'var(--primary)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--card-border)';
                        e.currentTarget.style.background = 'var(--section-bg-alt)';
                        e.currentTarget.style.color = 'var(--text-primary)';
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '3rem' }}>
          {/* Strengths */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              <div style={{
                width: '3rem',
                height: '3rem',
                borderRadius: '0.75rem',
                background: 'var(--secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                boxShadow: '0 10px 15px -3px rgba(139, 92, 246, 0.3)'
              }}>
                <Target size={20} />
              </div>
              <h3 style={{ 
                fontSize: '1.75rem', 
                fontWeight: 700, 
                color: 'var(--foreground)'
              }}>
                Core Strengths
              </h3>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {resumeData.strengths.map((strength, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1rem 1.5rem',
                    background: 'var(--card-bg)',
                    borderRadius: '0.75rem',
                    border: '1px solid var(--card-border)',
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'all 0.3s ease'
                  }}
                  whileHover={{
                    x: 5,
                    borderColor: 'var(--primary)',
                    boxShadow: 'var(--shadow-md)'
                  }}
                >
                  <CheckCircle2 size={24} color="var(--success)" strokeWidth={2.5} />
                  <span style={{ 
                    fontSize: '1rem', 
                    color: 'var(--text-primary)',
                    fontWeight: 600
                  }}>
                    {strength}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Key Achievements */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              <div style={{
                width: '3rem',
                height: '3rem',
                borderRadius: '0.75rem',
                background: 'var(--success)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                boxShadow: '0 10px 15px -3px rgba(16, 185, 129, 0.3)',
                color: 'white'
              }}>
                🏆
              </div>
              <h3 style={{ 
                fontSize: '1.75rem', 
                fontWeight: 700, 
                color: 'var(--foreground)'
              }}>
                Key Achievements
              </h3>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {resumeData.keyAchievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="card"
                >
                  <p style={{ 
                    fontSize: '0.9375rem', 
                    lineHeight: '1.7',
                    color: 'var(--text-secondary)',
                    margin: 0
                  }}>
                    {achievement}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
