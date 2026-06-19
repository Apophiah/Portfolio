import React, { useEffect, useState } from 'react';
import './Hello.css';
import apo from '../../assets/apo.jpg';

const roles = [
  'Full Stack Developer',
  'Mobile App Developer',
  'UI/UX Designer',
  'DevOps Engineer',
];

const Hello: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 45);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex]);

  return (
    <section className="hello-section">
      <div className="hello-container">
        <div className="hello-content">
          <span className="hello-badge">👋 Available for hire</span>
          <h1 className="hello-title">
            Hello, I am<br />
            <span className="hello-name">Ronah</span>
          </h1>

          <div className="hello-typewriter">
            <span className="typewriter-text">{displayed}</span>
            <span className="typewriter-cursor">|</span>
          </div>

          <p className="hello-description">
            I'm a programmer specializing in mobile and web
            development, with strong problem-solving skills and
            expertise in DevOps and DevSecOps.
          </p>

          <div className="hello-actions">
            <a href="#contact" className="hello-button">Say Hello!</a>
            <a href="#portfolio" className="hello-outline-btn">View Work</a>
          </div>

          <div className="hello-stats">
            <div className="stat-card">
              <div className="stat-number">3+</div>
              <div className="stat-label">Years Exp.</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">4+</div>
              <div className="stat-label">Projects</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">2+</div>
              <div className="stat-label">Certs</div>
            </div>
          </div>
        </div>

        <div className="hello-image">
          <div className="image-frame">
            <img src={apo} alt="Ronah" />
            <div className="image-badge image-badge-top">
              <span>💼</span> Open to work
            </div>
            <div className="image-badge image-badge-bottom">
              <span>📍</span> Kigali, Rwanda
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
