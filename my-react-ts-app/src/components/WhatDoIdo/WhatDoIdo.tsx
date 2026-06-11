import React from 'react';
import './WhatDoIdo.css';

const WhatDoIdo: React.FC = () => {
  return (
    <section className="what-do-i-do-section" id="services">
      <div className="what-do-i-do-container">
        
        {/* Left Column: Intro Info */}
        <div className="info-column">
          <h2 className="section-title">What do I do?</h2>
          <p className="intro-text">
            I specialize in crafting digital experiences that are both functional and aesthetically pleasing. 
            With a strong foundation in UI/UX design and expertise in web development allows me to 
            build high-performance websites and mobile applications that are both scalable and reliable.
          </p>
          <p className="cta-subtext">
            Let's build something great together!
          </p>
          <button className="contact-btn">Contact Me!</button>
        </div>

        {/* Right Column: Cards */}
        <div className="cards-column">
          
          {/* Card 1: UI/UX */}
          <div className="service-card">
            <h3 className="card-title">User interface and experience Design (UI/UX)</h3>
            <p className="card-description">
              I craft intuitive and visually appealing interfaces that enhance user experience.
            </p>
            <hr className="card-divider" />
            <div className="skills-footer">
              <span className="skills-label">Skills:</span>{' '}
              <span className="skills-list">Figma, Adobe PS, Adobe Illustrator</span>
            </div>
          </div>

          {/* Card 2: Web Dev */}
          <div className="service-card">
            <h3 className="card-title">Web Development</h3>
            <p className="card-description">
              I build robust and scalable web applications using modern technologies. 
              From front-end interfaces to back-end logic.
            </p>
            <hr className="card-divider" />
            <div className="skills-footer">
              <span className="skills-label">Skills:</span>{' '}
              <span className="skills-list">ReactJs, Nodejs, ExpressJs, Flask, Typescript, MongoDB, MySQL, PostgreSQL</span>
            </div>
          </div>

          {/* Card 3: Mobile Dev */}
          <div className="service-card">
            <h3 className="card-title">Mobile App Development</h3>
            <p className="card-description">
              I develop cross-platform mobile applications that provide a native-like experience 
              on both Android and iOS. Fast, responsive, and user-friendly.
            </p>
            <hr className="card-divider" />
            <div className="skills-footer">
              <span className="skills-label">Skills:</span>{' '}
              <span className="skills-list">React Native</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default WhatDoIdo;
