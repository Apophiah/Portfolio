import React from 'react';
import './Footer.css';
import { ArrowUpIcon, GithubIcon, InstagramIcon, LinkedInIcon, WhatsAppIcon } from '../Icons/Icons';
import { profile } from '../../data/profile';

const socials = [
  { label: 'GitHub', href: profile.github, Icon: GithubIcon },
  { label: 'LinkedIn', href: profile.linkedin, Icon: LinkedInIcon },
  { label: 'WhatsApp', href: profile.whatsapp, Icon: WhatsAppIcon },
  { label: 'Instagram', href: profile.instagram, Icon: InstagramIcon },
];

const Footer: React.FC = () => (
  <footer className="footer">
    <div className="container footer-inner">
      <div className="footer-brand">
        <span className="footer-signature">
          Ronah<span className="logo-dot">.</span>
        </span>
        <p>Let's connect! Reach out for projects, collaborations, questions, or just to say hello.</p>
      </div>

      <div className="footer-socials">
        {socials.map(({ label, href, Icon }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}>
            <Icon width={17} height={17} />
          </a>
        ))}
      </div>
    </div>

    <div className="container footer-bottom">
      <span>© {new Date().getFullYear()} {profile.name}. Built with React, TypeScript &amp; Vite.</span>
      <a href="#top" className="back-to-top">
        Back to top <ArrowUpIcon />
      </a>
    </div>
  </footer>
);

export default Footer;
