import React from 'react';
import './Hello.css';
import apo  from '../../assets/apo.jpg';
const Hello: React.FC = () => {
    return (
        <section className="hello-section">
            <div className="hello-container">
                <div className="hello-content">
                    <h1 className="hello-title">
                        Hello, I am<br />
                        Ronah
                    </h1>

                    <p className="hello-description">
                        Here is the summarized English version:<br />
                        I'm a programmer specializing in mobile and web<br />
                        development, with strong problem-solving skills and<br />
                        expertise in DevOps and DevSecOps.
                    </p>

                    <button className="hello-button">Say Hello!</button>

                    <div className="hello-stats">
                        <div className="stat-card">
                            <div className="stat-number">3+ Years</div>
                            <div className="stat-label">Experience</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-number">3+</div>
                            <div className="stat-label">Projects completed</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-number">2+</div>
                            <div className="stat-label">Certifications</div>
                        </div>
                    </div>
                </div>

                <div className="hello-image">
                    <div className="image-frame">
                        <img
                            src={apo}
                            alt="Ronah"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hello;
