import React from 'react';
import './Services.css';

const Services: React.FC = () => {
  return (
    <section className="services-section" id="services">
      <div className="services-container">
        {/* Main Floating White Contact Card */}
        <div className="services-contact-card">
          <div className="services-header">
            <h2 className="services-title">Let's discuss your project</h2>
            <p className="services-subtitle">
              Let's connect! Reach out for projects, collaborations, questions, or just to say hello.
            </p>
          </div>

          <div className="services-grid">
            {/* Address Info Block */}
            <div className="services-info-box">
              <div className="services-icon-wrapper">
                <svg viewBox="0 0 24 24" className="services-icon" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <div className="services-info-text">
                <span className="services-info-label">Address:</span>
                <span className="services-info-value">Kigali Rwanda</span>
              </div>
            </div>

            {/* Email Info Block */}
            <a href="mailto:apophia@gmail.com" className="services-info-box link-box">
              <div className="services-icon-wrapper">
                <svg viewBox="0 0 24 24" className="services-icon" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </div>
              <div className="services-info-text">
                <span className="services-info-label">Email:</span>
                <span className="services-info-value">apophia@gmail.com</span>
              </div>
            </a>

            {/* Phone Info Block */}
            <a href="tel:+250791532685" className="services-info-box link-box">
              <div className="services-icon-wrapper">
                <svg viewBox="0 0 24 24" className="services-icon" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 1H7c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm-5 20c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm5-4H7V6h10v11z"/>
                </svg>
              </div>
              <div className="services-info-text">
                <span className="services-info-label">Phone/Whatsapp:</span>
                <span className="services-info-value underlined">+250 791532685</span>
              </div>
            </a>
          </div>
        </div>

        {/* Footer Area */}
        <div className="services-footer">
          <span className="services-footer-signature">Ronah.</span>
          <span className="services-footer-copyright">@2026 Apophia Roha</span>
        </div>
      </div>
    </section>
  );
};

export default Services;
