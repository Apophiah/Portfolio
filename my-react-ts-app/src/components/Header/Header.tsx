import React from 'react';
import './Header.css';

interface HeaderProps {
    className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
    return (
        <header className={`header ${className}`}>
            <div className="header-container">
                <div className="logo">
                    <h1>Ronah.</h1>
                </div>

                <nav className="nav">
                    <ul className="nav-list">
                        <li className="nav-item">
                            <a href="#about" className="nav-link">About</a>
                        </li>
                        <li className="nav-item">
                            <a href="#services" className="nav-link">services</a>
                        </li>
                        <li className="nav-item">
                            <a href="#portfolio" className="nav-link">portfolio</a>
                        </li>
                        <li className="nav-item">
                            <a href="#contact" className="nav-link">contact Me</a>
                        </li>
                    </ul>
                </nav>

                <div className="cta">
                    <a href="#contact" className="contact-button">Contact</a>
                </div>
            </div>
        </header>
    );
};

export default Header;
