import React, { useEffect, useState } from 'react';
import './Header.css';
import { MoonIcon, SunIcon } from '../Icons/Icons';

type Theme = 'light' | 'dark';

const links = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#portfolio', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light',
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleTheme = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* storage unavailable (private mode) — theme still switches for this visit */
    }
    setTheme(next);
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <header className={`header ${scrolled ? 'is-scrolled' : ''} ${isOpen ? 'menu-open' : ''}`}>
      <div className="header-container container">
        <a href="#top" className="logo" onClick={closeMenu} aria-label="Ronah — back to top">
          Ronah<span className="logo-dot">.</span>
        </a>

        <nav className={`nav ${isOpen ? 'active' : ''}`} aria-label="Main">
          <ul className="nav-list">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="nav-link" onClick={closeMenu}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            <span className={`theme-icon ${theme === 'dark' ? 'show' : ''}`}><SunIcon /></span>
            <span className={`theme-icon ${theme === 'light' ? 'show' : ''}`}><MoonIcon /></span>
          </button>

          <a href="#contact" className="btn btn-primary header-cta" onClick={closeMenu}>
            Hire me
          </a>

          <button
            type="button"
            className={`menu-toggle ${isOpen ? 'open' : ''}`}
            onClick={() => setIsOpen((o) => !o)}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            <span className="hamburger-bar" />
            <span className="hamburger-bar" />
            <span className="hamburger-bar" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
