import React, { useEffect, useState } from 'react';
import './Hello.css';
import apo from '../../assets/apo.jpg';
import { ArrowRightIcon, BriefcaseIcon, PinIcon } from '../Icons/Icons';

const roles = [
  'Full Stack Developer',
  'Mobile App Developer',
  'UI/UX Designer',
  'DevOps Engineer',
];

const stats = [
  { value: '3+', label: 'Years Exp.' },
  { value: '4+', label: 'Projects' },
  { value: '2+', label: 'Certs' },
];

const Hello: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  // Typewriter: every state change happens inside a timer callback, never synchronously in the effect.
  useEffect(() => {
    const current = roles[roleIndex];
    let delay = deleting ? 45 : 80;
    let step: () => void;

    if (!deleting && displayed.length < current.length) {
      step = () => setDisplayed(current.slice(0, displayed.length + 1));
    } else if (!deleting) {
      delay = 1800;
      step = () => setDeleting(true);
    } else if (displayed.length > 0) {
      step = () => setDisplayed(current.slice(0, displayed.length - 1));
    } else {
      delay = 250;
      step = () => {
        setDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      };
    }

    const timeout = setTimeout(step, delay);
    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex]);

  return (
    <section className="hello-section" id="top">
      <div className="hello-bg" aria-hidden="true">
        <span className="orb orb-1" />
        <span className="orb orb-2" />
        <span className="orb orb-3" />
        <span className="grid-overlay" />
      </div>

      <div className="hello-container container">
        <div className="hello-content">
          <span className="hello-badge hero-in" style={{ '--i': 0 } as React.CSSProperties}>
            <span className="pulse-dot" /> Available for hire
          </span>

          <h1 className="hello-title hero-in" style={{ '--i': 1 } as React.CSSProperties}>
            Hello, I am
            <br />
            <span className="hello-name gradient-text">Ronah</span>
            <span className="wave" role="img" aria-label="waving hand">👋</span>
          </h1>

          <p className="hello-typewriter hero-in" style={{ '--i': 2 } as React.CSSProperties} aria-live="polite">
            <span className="typewriter-text">{displayed}</span>
            <span className="typewriter-cursor" aria-hidden="true" />
          </p>

          <p className="hello-description hero-in" style={{ '--i': 3 } as React.CSSProperties}>
            I'm a programmer specializing in mobile and web development, with strong problem-solving
            skills and expertise in DevOps and DevSecOps.
          </p>

          <div className="hello-actions hero-in" style={{ '--i': 4 } as React.CSSProperties}>
            <a href="#contact" className="btn btn-primary">
              Say Hello! <ArrowRightIcon />
            </a>
            <a href="#portfolio" className="btn btn-ghost">
              View Work
            </a>
          </div>

          <div className="hello-stats hero-in" style={{ '--i': 5 } as React.CSSProperties}>
            {stats.map((s) => (
              <div className="stat-card" key={s.label}>
                <div className="stat-number">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="hello-image hero-in" style={{ '--i': 2 } as React.CSSProperties}>
          <div className="image-frame">
            <span className="image-ring" aria-hidden="true" />
            <img src={apo} alt="Portrait of Ronah" width={420} height={520} />
            <div className="image-badge image-badge-top">
              <BriefcaseIcon /> Open to work
            </div>
            <div className="image-badge image-badge-bottom">
              <PinIcon /> Kigali, Rwanda
            </div>
          </div>
        </div>
      </div>

      <a href="#about" className="scroll-down" aria-label="Scroll down">
        <span className="scroll-dot" />
      </a>
    </section>
  );
};

export default Hello;
