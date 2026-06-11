import React from 'react';
import './CreateMe.css';

const CreateMe: React.FC = () => {
  return (
    <section className="contact-me-section" id="contact">
      <div className="contact-me-container">
        <h2 className="contact-title">Do you have a project Idea?</h2>
        <h3 className="contact-subtitle">Let's discuss your project!</h3>
        <p className="contact-description">
          I create full-stack solutions with Python and JavaScript.
          Whether you have a new project idea or need help refining
          one, let's collaborate to turn your vision into reality.
        </p>
        <button className="contact-submit-btn">Contact Me</button>
      </div>
    </section>     
  );
};

export default CreateMe;
