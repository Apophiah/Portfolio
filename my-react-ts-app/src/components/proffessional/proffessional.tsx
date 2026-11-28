import React, { useEffect, useRef, useState } from 'react';
import './proffessional.css';
import { GithubIcon, LinkedInIcon, WhatsAppIcon } from '../Icons/Icons';
import { profile } from '../../data/profile';

const skills = [
  { label: 'React / React Native', percent: 90 },
  { label: 'Node.js / Express', percent: 85 },
  { label: 'TypeScript', percent: 80 },
  { label: 'UI/UX Design (Figma)', percent: 75 },
  { label: 'DevOps / Docker', percent: 70 },
];

const socials = [
  { href: profile.whatsapp, label: 'WhatsApp', className: 'icon-whatsapp', Icon: WhatsAppIcon },
  { href: profile.linkedin, label: 'LinkedIn', className: 'icon-linkedin', Icon: LinkedInIcon },
  { href: profile.github, label: 'GitHub', className: 'icon-github', Icon: GithubIcon },
];

const Proffessional = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section professional-section" id="about">
      <div className="container">
        <div className="professional-card" ref={ref} data-reveal>
          <div className="profile-section">
            <div className="profile-image-wrap">
              <img
                src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Professional workspace"
                className="profile-image"
                loading="lazy"
              />
            </div>
            <div className="social-icons">
              {socials.map(({ href, label, className, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`icon ${className}`}
                  aria-label={label}
                  title={label}
                >
                  <Icon width={17} height={17} />
                </a>
              ))}
            </div>
          </div>

          <div className="content-section">
            <p className="eyebrow">About me</p>
            <h2 className="content-title">
              I am a Professional <span className="highlight">Web</span> and{' '}
              <span className="highlight">Mobile</span> developer.
            </h2>
            <p className="content-description">
              I am a passionate fullstack developer based in Kigali, Rwanda, with a strong background in
              both web and mobile development. I specialize in creating dynamic and responsive
              applications using the latest technologies.
            </p>

            <div className="skills-section">
              <h3 className="skills-heading">Tech Skills</h3>
              {skills.map((skill, i) => (
                <div key={skill.label} className="skill-row">
                  <div className="skill-meta">
                    <span className="skill-label">{skill.label}</span>
                    <span className="skill-percent">{skill.percent}%</span>
                  </div>
                  <div
                    className="skill-track"
                    role="progressbar"
                    aria-label={skill.label}
                    aria-valuenow={skill.percent}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div
                      className="skill-fill"
                      style={
                        {
                          width: visible ? `${skill.percent}%` : '0%',
                          transitionDelay: `${0.15 * i}s`,
                        } as React.CSSProperties
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Proffessional;
