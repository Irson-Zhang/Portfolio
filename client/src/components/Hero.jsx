import ParticleField from './ParticleField.jsx';
import { useTypewriter } from '../hooks/useTypewriter.js';
import { site } from '../data/site.js';

const STACK = ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Express', 'MongoDB'];

export default function Hero() {
  const typed = useTypewriter(site.roles);

  return (
    <section id="top" className="hero">
      <ParticleField />
      <div className="hero__glow" aria-hidden="true" />
      <div className="container hero__content">
        <p className="pill">
          <span className="status-dot" aria-hidden="true" /> Available for freelance &amp; full-time roles
        </p>
        <h1 className="hero__title">
          Hi, I&rsquo;m <span className="gradient-text">{site.name}</span>
          <span className="hero__typed-line">
            a{' '}
            <span className="hero__typed" aria-hidden="true">
              {typed}
            </span>
            <span className="caret" aria-hidden="true" />
            <span className="sr-only">{site.roles.join(' ')}</span>
          </span>
        </h1>
        <p className="hero__lead">{site.tagline}</p>
        <div className="hero__cta">
          <a className="btn btn--primary" href="#projects">
            View my work <span aria-hidden="true">→</span>
          </a>
          <a className="btn btn--ghost" href="#contact">
            Get in touch
          </a>
        </div>
        <ul className="hero__stack" aria-label="Core stack">
          {STACK.map((s, i) => (
            <li key={s} style={{ '--i': i }}>
              {s}
            </li>
          ))}
        </ul>
      </div>
      <a href="#about" className="scroll-cue" aria-label="Scroll to About section">
        <span />
      </a>
    </section>
  );
}
