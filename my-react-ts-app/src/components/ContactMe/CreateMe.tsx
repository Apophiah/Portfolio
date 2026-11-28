import React, { useState } from 'react';
import './CreateMe.css';
import {
  ArrowRightIcon,
  ChatIcon,
  CheckCircleIcon,
  GithubIcon,
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  WhatsAppIcon,
} from '../Icons/Icons';
import { profile } from '../../data/profile';

type FormState = { name: string; email: string; phone: string; message: string };
type Errors = Partial<FormState>;

const socials = [
  { label: 'WhatsApp', href: profile.whatsapp, color: '#25D366', Icon: WhatsAppIcon },
  { label: 'LinkedIn', href: profile.linkedin, color: '#0A66C2', Icon: LinkedInIcon },
  { label: 'Instagram', href: profile.instagram, color: '#E1306C', Icon: InstagramIcon },
  { label: 'GitHub', href: profile.github, color: '#8b5cf6', Icon: GithubIcon },
];

const contactItems = [
  { Icon: MailIcon, label: 'Email', value: profile.email, href: `mailto:${profile.email}`, wide: true },
  { Icon: PinIcon, label: 'Address', value: profile.location },
  { Icon: PhoneIcon, label: 'Phone / WhatsApp', value: profile.phoneDisplay, href: `tel:${profile.phone}` },
  { Icon: ChatIcon, label: 'SMS', value: 'Send SMS', href: `sms:${profile.phone}` },
];

const emptyForm: FormState = { name: '', email: '', phone: '', message: '' };

const CreateMe: React.FC = () => {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const e: Errors = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email address';
    if (form.phone && !/^\+?[\d\s\-()]{7,}$/.test(form.phone)) e.phone = 'Invalid phone number';
    if (!form.message.trim()) e.message = 'Message is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    // Opens the visitor's email app with the message addressed to Ronah.
    const subject = encodeURIComponent(`Portfolio message from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}${form.phone ? `\nPhone: ${form.phone}` : ''}\n\nMessage:\n${form.message}`,
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setForm(emptyForm);
  };

  const field = (
    name: keyof FormState,
    label: React.ReactNode,
    props: React.InputHTMLAttributes<HTMLInputElement>,
  ) => (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        value={form[name]}
        onChange={handleChange}
        className={errors[name] ? 'error' : ''}
        aria-invalid={!!errors[name]}
        aria-describedby={errors[name] ? `${name}-error` : undefined}
        {...props}
      />
      {errors[name] && (
        <span className="form-error" id={`${name}-error`}>
          {errors[name]}
        </span>
      )}
    </div>
  );

  return (
    <section className="section contact-me-section" id="contact">
      <div className="contact-glow" aria-hidden="true" />
      <div className="container contact-me-container">
        <div className="contact-left" data-reveal="left">
          <p className="eyebrow">Get in touch</p>
          <h2 className="section-title">Do you have a project idea?</h2>
          <h3 className="contact-subtitle">Let's discuss your project!</h3>
          <p className="contact-description">
            I create full-stack solutions with Python and JavaScript. Whether you have a new project idea
            or need help refining one, let's collaborate to turn your vision into reality.
          </p>

          <ul className="contact-info-list">
            {contactItems.map(({ Icon, label, value, href, wide }) => {
              const inner = (
                <>
                  <span className="contact-info-icon">
                    <Icon />
                  </span>
                  <span className="contact-info-text">
                    <span className="contact-info-label">{label}</span>
                    <span className="contact-info-value">{value}</span>
                  </span>
                </>
              );
              return (
                <li key={label} className={wide ? 'is-wide' : undefined}>
                  {href ? (
                    <a href={href} className="contact-info-item">
                      {inner}
                    </a>
                  ) : (
                    <div className="contact-info-item">{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="contact-socials">
            <p className="contact-socials-label">Connect with me</p>
            <div className="contact-socials-row">
              {socials.map(({ label, href, color, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-social-btn"
                  style={{ '--social-color': color } as React.CSSProperties}
                  aria-label={label}
                >
                  <Icon width={16} height={16} />
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="contact-right" data-reveal="right">
          {submitted ? (
            <div className="contact-success" role="status">
              <CheckCircleIcon className="success-icon icon-draw is-visible" />
              <h3>Message ready to send!</h3>
              <p>Your email app should have opened with the message. Ronah will get back to you soon.</p>
              <button type="button" className="btn btn-primary" onClick={() => setSubmitted(false)}>
                Send another
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              {field('name', 'Your Name', { type: 'text', placeholder: 'Your full name', autoComplete: 'name' })}
              {field('email', 'Email Address', {
                type: 'email',
                placeholder: 'you@example.com',
                autoComplete: 'email',
              })}
              {field(
                'phone',
                <>
                  Phone Number <span className="form-optional">(optional)</span>
                </>,
                { type: 'tel', placeholder: '+250 7XX XXX XXX', autoComplete: 'tel' },
              )}

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Tell me about your project..."
                  value={form.message}
                  onChange={handleChange}
                  className={errors.message ? 'error' : ''}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && (
                  <span className="form-error" id="message-error">
                    {errors.message}
                  </span>
                )}
              </div>

              <button type="submit" className="btn btn-primary contact-submit-btn">
                Send Message <ArrowRightIcon />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default CreateMe;
