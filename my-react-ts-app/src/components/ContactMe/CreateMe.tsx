import React, { useState } from 'react';
import './CreateMe.css';

type FormState = { name: string; email: string; message: string };
type Errors = Partial<FormState>;

const CreateMe: React.FC = () => {
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const e: Errors = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email address';
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
    setSubmitted(true);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section className="contact-me-section" id="contact">
      <div className="contact-me-container">
        <div className="contact-left">
          <p className="contact-eyebrow">Get in touch</p>
          <h2 className="contact-title">Do you have a project idea?</h2>
          <h3 className="contact-subtitle">Let's discuss your project!</h3>
          <p className="contact-description">
            I create full-stack solutions with Python and JavaScript.
            Whether you have a new project idea or need help refining
            one, let's collaborate to turn your vision into reality.
          </p>

          <div className="contact-info-list">
            <div className="contact-info-item">
              <span className="contact-info-icon">📍</span>
              <span>Kigali, Rwanda</span>
            </div>
            <div className="contact-info-item">
              <span className="contact-info-icon">✉️</span>
              <a href="mailto:apophia@gmail.com">apophia@gmail.com</a>
            </div>
            <div className="contact-info-item">
              <span className="contact-info-icon">📞</span>
              <a href="tel:+250791532685">+250 791 532 685</a>
            </div>
          </div>
        </div>

        <div className="contact-right">
          {submitted ? (
            <div className="contact-success">
              <span className="success-icon">✅</span>
              <h3>Message sent!</h3>
              <p>Thanks for reaching out. I'll get back to you soon.</p>
              <button className="contact-submit-btn" onClick={() => setSubmitted(false)}>
                Send another
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Ronah Apophia"
                  value={form.name}
                  onChange={handleChange}
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="form-error">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>

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
                />
                {errors.message && <span className="form-error">{errors.message}</span>}
              </div>

              <button type="submit" className="contact-submit-btn">
                Send Message →
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default CreateMe;
