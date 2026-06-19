import React, { useState } from 'react';
import './WhatDoIdo.css';

const services = [
  {
    id: 1,
    icon: '🎨',
    title: 'UI/UX Design',
    description:
      'I craft intuitive and visually appealing interfaces that enhance user experience.',
    skills: ['Figma', 'Adobe PS', 'Adobe Illustrator'],
    color: '#f59e0b',
  },
  {
    id: 2,
    icon: '🌐',
    title: 'Web Development',
    description:
      'I build robust and scalable web applications using modern technologies — from front-end interfaces to back-end logic.',
    skills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'PostgreSQL'],
    color: '#a855f7',
  },
  {
    id: 3,
    icon: '📱',
    title: 'Mobile Development',
    description:
      'I develop cross-platform mobile apps that feel native on both Android and iOS. Fast, responsive, and user-friendly.',
    skills: ['React Native', 'Expo'],
    color: '#10b981',
  },
  {
    id: 4,
    icon: '⚙️',
    title: 'DevOps & DevSecOps',
    description:
      'I set up CI/CD pipelines, containerize apps with Docker, and apply security best practices throughout the dev lifecycle.',
    skills: ['Docker', 'GitHub Actions', 'Linux', 'Nginx'],
    color: '#3b82f6',
  },
];

const WhatDoIdo: React.FC = () => {
  const [activeId, setActiveId] = useState<number | null>(null);

  return (
    <section className="what-do-i-do-section" id="services">
      <div className="what-do-i-do-container">

        <div className="info-column">
          <p className="info-eyebrow">What I offer</p>
          <h2 className="section-title">What do I do?</h2>
          <p className="intro-text">
            I specialize in crafting digital experiences that are both functional and
            aesthetically pleasing. Strong foundation in UI/UX and full-stack engineering
            lets me build high-performance, scalable products end-to-end.
          </p>
          <p className="cta-subtext">Let's build something great together!</p>
          <a href="#contact" className="contact-btn">Contact Me!</a>
        </div>

        <div className="cards-column">
          {services.map((svc) => (
            <div
              key={svc.id}
              className={`service-card ${activeId === svc.id ? 'active' : ''}`}
              onClick={() => setActiveId(activeId === svc.id ? null : svc.id)}
              style={{ '--accent': svc.color } as React.CSSProperties}
            >
              <div className="card-header">
                <span className="card-icon">{svc.icon}</span>
                <h3 className="card-title">{svc.title}</h3>
                <span className="card-toggle">{activeId === svc.id ? '−' : '+'}</span>
              </div>

              <div className="card-body">
                <p className="card-description">{svc.description}</p>
                <hr className="card-divider" />
                <div className="skills-tags">
                  {svc.skills.map((s) => (
                    <span key={s} className="skill-tag">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhatDoIdo;
