import React from 'react';
import './Portfolio.css';
import secureshopImg from '../../assets/secureshop.jpg';
import fittrackImg from '../../assets/fittrack.jpg';
import thinkBeyondImg from '../../assets/thinkbeyond.jpg';
import bulksmsImg from '../../assets/bulksms.jpg';
import innovationHubImg from '../../assets/innovation_hub.jpg';
import { ExternalIcon, GithubIcon } from '../Icons/Icons';

type Project = {
  title: string;
  kicker: string;
  image: string;
  alt: string;
  description: string;
  tags: string[];
  live?: string;
  code?: string;
  featured?: boolean;
};

const projects: Project[] = [
  {
    title: 'SecureShop',
    kicker: 'Featured · Secure e-commerce',
    image: secureshopImg,
    alt: 'SecureShop storefront with a hero carousel and product grid',
    description:
      'A secure Node.js/Express e-commerce app built with security in every phase: two-factor login, CSRF protection, a strict CSP, an audit log of sensitive actions and 55 automated security tests — behind a modern storefront with dark mode.',
    tags: ['Node.js', 'Express', 'SQLite', '2FA', 'CSRF', 'Security testing'],
    code: 'https://github.com/Apophiah/SecureShop',
    featured: true,
  },
  {
    title: 'FitTrack',
    kicker: 'Health & fitness',
    image: fittrackImg,
    alt: 'FitTrack dashboard mock-up with activity charts',
    description:
      'FitTrack serves as a useful tool to support healthier routines — track workouts, activity and goals from one dashboard.',
    tags: ['React', 'TypeScript', 'Vite'],
    live: 'https://fit-track-gamma-nine.vercel.app',
    code: 'https://github.com/Apophiah/Fit-track',
  },
  {
    title: 'Think Beyond',
    kicker: 'Future Regret Simulator',
    image: thinkBeyondImg,
    alt: 'Think Beyond — Future Regret Simulator landing page',
    description:
      'A Future Regret Simulator that helps you explore possible futures before making major decisions — four paths, one choice, infinite clarity.',
    tags: ['React', 'TypeScript', 'Vite'],
    live: 'https://apophiathink-beyond.vercel.app',
    code: 'https://github.com/Apophiah/Think-Beyond',
  },
  {
    title: 'Bulk SMS',
    kicker: 'Marketing platform · UI concept',
    image: bulksmsImg,
    alt: 'Bulk SMS marketing UI illustration',
    description:
      'Bulk SMS is a service used to send the same text message to many people at once.',
    tags: ['UI/UX', 'Figma', 'Marketing'],
  },
  {
    title: 'Innovation Hub',
    kicker: 'Community platform · UI concept',
    image: innovationHubImg,
    alt: 'Innovation Hub UI illustration',
    description:
      'An Innovation Hub is a center that encourages creativity and innovation by bringing people together to develop new ideas and solutions.',
    tags: ['UI/UX', 'Branding', 'Illustration'],
  },
];

const Portfolio: React.FC = () => (
  <section className="section portfolio-section" id="portfolio">
    <div className="container">
      <div className="section-head" data-reveal>
        <p className="eyebrow">Selected work</p>
        <h2 className="section-title">Portfolio</h2>
        <p className="section-lead">
          Explore a selection of my work, where I combine technical expertise and creativity to build
          impactful web and mobile applications that solve real-world challenges.
        </p>
      </div>

      <div className="portfolio-grid">
        {projects.map((p, i) => (
          <div
            key={p.title}
            className={`portfolio-cell ${p.featured ? 'is-featured' : ''}`}
            data-reveal
            style={{ '--delay': `${(i % 3) * 0.1}s` } as React.CSSProperties}
          >
            <article className="portfolio-card">
              <div className="portfolio-image-wrapper">
                <img src={p.image} alt={p.alt} className="portfolio-card-image" loading="lazy" />
                {p.featured && <span className="featured-badge">★ Featured</span>}
              </div>

              <div className="portfolio-card-body">
                <p className="portfolio-kicker">{p.kicker}</p>
                <h3 className="portfolio-card-title">{p.title}</h3>
                <p className="portfolio-card-description">{p.description}</p>

                <ul className="portfolio-tags" aria-label="Tech used">
                  {p.tags.map((t) => (
                    <li key={t} className="tag">
                      {t}
                    </li>
                  ))}
                </ul>

                <div className="portfolio-card-actions">
                  {p.live && (
                    <a href={p.live} className="btn btn-primary btn-sm" target="_blank" rel="noopener noreferrer">
                      Live site <ExternalIcon />
                    </a>
                  )}
                  {p.code && (
                    <a href={p.code} className="btn btn-ghost btn-sm" target="_blank" rel="noopener noreferrer">
                      <GithubIcon /> Code
                    </a>
                  )}
                  {!p.live && !p.code && <span className="concept-note">Design concept</span>}
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>

      <div className="portfolio-more" data-reveal>
        <a href="https://github.com/Apophiah" className="btn btn-ghost" target="_blank" rel="noopener noreferrer">
          <GithubIcon /> More on GitHub
        </a>
      </div>
    </div>
  </section>
);

export default Portfolio;
