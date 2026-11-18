import SectionHeader from './SectionHeader.jsx';
import Reveal from './Reveal.jsx';
import { skillGroups } from '../data/site.js';

export default function Skills() {
  return (
    <section id="skills" className="section section--alt">
      <div className="container">
        <SectionHeader index="02" eyebrow="Skills" title="Every level of the stack.">
          From fundamentals to full stack. Each level builds on the one before it.
        </SectionHeader>
        <ol className="skills">
          {skillGroups.map((g, i) => (
            <Reveal as="li" key={g.title} className="skill-card" delay={i * 80}>
              <span className="skill-card__level">L{g.level}</span>
              <h3>{g.title}</h3>
              <p>{g.blurb}</p>
              <ul className="bars">
                {g.items.map((s) => (
                  <li key={s.name} className="bar">
                    <div className="bar__label">
                      <span>{s.name}</span>
                      <span className="bar__value">{s.value}%</span>
                    </div>
                    <div
                      className="bar__track"
                      role="progressbar"
                      aria-label={s.name}
                      aria-valuenow={s.value}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div className="bar__fill" style={{ '--value': s.value / 100 }} />
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
