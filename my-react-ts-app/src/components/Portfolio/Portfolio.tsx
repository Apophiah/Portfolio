import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Portfolio.css';
import fittrackImg from '../../assets/fittrack.png';
import bulksmsImg from '../../assets/bulksms.png';
import innovationHubImg from '../../assets/innovation_hub.png';

const Portfolio: React.FC = () => {
  const navigate = useNavigate();
  const projects = [
    {
      id: 1,
      image: fittrackImg,
      alt: 'FitTrack UI Mockup',
      description: 'FitTrack serves as a useful tool to support healthier routines.',
      link: 'https://fit-track-gamma-nine.vercel.app',
      placeholder: null,
    },
    {
      id: 2,
      image: bulksmsImg,
      alt: 'Bulk SMS Marketing UI',
      description: 'Bulk SMS is a service used to send the same text message to many people at once.',
      link: '#',
      placeholder: null,
    },
    {
      id: 3,
      image: innovationHubImg,
      alt: 'Innovation Hub UI Illustration',
      description: 'An Innovation Hub is a center that encourages creativity and innovation by bringing people together to develop new ideas and solutions.',
      link: '#',
      placeholder: null,
    },
    {
      id: 4,
      image: null,
      alt: 'Future Regret Simulator',
      description: 'A Future Regret Simulator that helps you explore possible futures before making major decisions — four paths, one choice, infinite clarity.',
      link: 'https://apophiathink-beyond.vercel.app',
      placeholder: {
        emoji: '🧠',
        title: 'Future Regret Simulator',
        subtitle: 'Think Beyond',
      },
    },
  ];

  return (
    <section className="portfolio-section" id="portfolio">
      <div className="portfolio-container">
        <h2 className="portfolio-title">Portfolio</h2>
        <p className="portfolio-subtitle">
          Explore a selection of my work, where I combine technical expertise and creativity to build impactful web and mobile applications that solve real-world challenges.
        </p>

        <div className="portfolio-grid">
          {projects.map((project) => (
            <div key={project.id} className="portfolio-card">
              <div className="portfolio-image-wrapper">
                {project.image ? (
                  <img src={project.image} alt={project.alt} className="portfolio-card-image" />
                ) : (
                  <div className="portfolio-card-placeholder">
                    <span className="placeholder-emoji">{project.placeholder?.emoji}</span>
                    <span className="placeholder-title">{project.placeholder?.title}</span>
                    <span className="placeholder-subtitle">{project.placeholder?.subtitle}</span>
                  </div>
                )}
              </div>
              <div className="portfolio-card-body">
                <p className="portfolio-card-description">{project.description}</p>
                <div className="portfolio-card-action">
                  {project.link.startsWith('/') ? (
                    <button onClick={() => navigate(project.link)} className="portfolio-view-btn">
                      <span>VIEW</span>
                      <svg className="portfolio-link-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </button>
                  ) : (
                    <a href={project.link} className="portfolio-view-btn" target="_blank" rel="noopener noreferrer">
                      <span>VIEW</span>
                      <svg className="portfolio-link-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
