import React, { useState } from 'react';
import './Header.css';

interface HeaderProps {
    className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <header className={`header ${className}`}>
            <div className="header-container">
                <div className="logo">
                    <h1>Ronah.</h1>
                </div>

                <nav className={`nav ${isOpen ? 'active' : ''}`}>
                    <ul className="nav-list">
                        <li className="nav-item">
                            <a href="#about" className="nav-link" onClick={closeMenu}>About</a>
                        </li>
                        <li className="nav-item">
                            <a href="#services" className="nav-link" onClick={closeMenu}>services</a>
                        </li>
                        <li className="nav-item">
                            <a href="#portfolio" className="nav-link" onClick={closeMenu}>portfolio</a>
                        </li>
                        <li className="nav-item">
                            <a href="#contact" className="nav-link" onClick={closeMenu}>contact Me</a>
                        </li>
                    </ul>
                </nav>

                <div className="cta">
                    <a href="#contact" className="contact-button" onClick={closeMenu}>Contact</a>
                </div>

                <button 
                    className={`menu-toggle ${isOpen ? 'open' : ''}`} 
                    onClick={toggleMenu} 
                    aria-label="Toggle navigation menu"
                >
                    <span className="hamburger-bar"></span>
                    <span className="hamburger-bar"></span>
                    <span className="hamburger-bar"></span>
                </button>
            </div>
        </header>
    );
};

export default Header;
