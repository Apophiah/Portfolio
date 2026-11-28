import React, { useEffect, useRef, useState } from 'react';
import './Services.css';

const stats = [
  { value: 3, suffix: '+', label: 'Years Experience' },
  { value: 4, suffix: '+', label: 'Projects Delivered' },
  { value: 2, suffix: '+', label: 'Certifications' },
  { value: 100, suffix: '%', label: 'Client Satisfaction' },
];

function useCountUp(target: number, active: boolean, duration = 1400) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target, duration]);
  return count;
}

const StatCard: React.FC<{ value: number; suffix: string; label: string; active: boolean }> = ({
  value,
  suffix,
  label,
  active,
}) => {
  const count = useCountUp(value, active);
  return (
    <div className="stat-block">
      <span className="stat-value">
        {count}
        {suffix}
      </span>
      <span className="stat-caption">{label}</span>
    </div>
  );
};

/** Animated numbers band between the projects and the contact form. */
const Services: React.FC = () => {
  const [countersActive, setCountersActive] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setCountersActive(true);
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="stats-section" id="stats" ref={ref} aria-label="Highlights">
      <div className="container">
        <div className="services-stats-bar" data-reveal="zoom">
          {stats.map((s) => (
            <StatCard key={s.label} value={s.value} suffix={s.suffix} label={s.label} active={countersActive} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
