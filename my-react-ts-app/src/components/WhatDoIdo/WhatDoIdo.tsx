import React from 'react';
import './WhatDoIdo.css';
import { ArrowRightIcon, CodeIcon, MobileIcon, PenToolIcon, ShieldIcon } from '../Icons/Icons';

const services = [
  {
    id: 1,
    Icon: PenToolIcon,
    title: 'UI/UX Design',
    description: 'I craft intuitive and visually appealing interfaces that enhance user experience.',
    skills: ['Figma', 'Adobe PS', 'Adobe Illustrator'],
    color: '#f59e0b',
  },
  {
    id: 2,
    Icon: CodeIcon,
    title: 'Web Development',
    description:
      'I build robust and scalable web applications using modern technologies — from front-end interfaces to back-end logic.',
    skills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'PostgreSQL'],
    color: '#a855f7',
  },
  {
    id: 3,
    Icon: MobileIcon,
    title: 'Mobile Development',
    description:
      'I develop cross-platform mobile apps that feel native on both Android and iOS. Fast, responsive, and user-friendly.',
    skills: ['React Native', 'Expo'],
    color: '#10b981',
  },
  {
    id: 4,
    Icon: ShieldIcon,
    title: 'DevOps & DevSecOps',
    description:
      'I set up CI/CD pipelines, containerize apps with Docker, and apply security best practices throughout the dev lifecycle.',
    skills: ['Docker', 'GitHub Actions', 'Linux', 'Nginx'],
    color: '#3b82f6',
  },
];

const WhatDoIdo: React.FC = () => (
  <section className="section section-alt what-do-i-do-section" id="services">
    <div className="container what-do-i-do-container">
      <div className="info-column" data-reveal="left">
        <p className="eyebrow">What I offer</p>
        <h2 className="section-title">What do I do?</h2>
        <p className="intro-text">
          I specialize in crafting digital experiences that are both functional and aesthetically
          pleasing. Strong foundation in UI/UX and full-stack engineering lets me build
          high-performance, scalable products end-to-end.
        </p>
        <p className="cta-subtext">Let's build something great together!</p>
        <a href="#contact" className="btn btn-primary">
          Contact Me! <ArrowRightIcon />
        </a>
      </div>

      <div className="cards-column">
        {services.map(({ id, Icon, title, description, skills, color }, i) => (
          // The wrapper handles the reveal so the card's own hover transition has no delay.
          <div key={id} data-reveal style={{ '--delay': `${i * 0.1}s` } as React.CSSProperties}>
          <article className="service-card" style={{ '--accent-c': color } as React.CSSProperties}>
            <div className="card-icon">
              <Icon className="icon-draw" />
            </div>
            <h3 className="card-title">{title}</h3>
            <p className="card-description">{description}</p>
            <div className="skills-tags">
              {skills.map((s) => (
                <span key={s} className="skill-tag">
                  {s}
                </span>
              ))}
            </div>
          </article>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhatDoIdo;
