import SectionHeader from './SectionHeader.jsx';
import Reveal from './Reveal.jsx';
import { journey } from '../data/site.js';

export default function Journey() {
  return (
    <section id="journey" className="section section--alt">
      <div className="container">
        <SectionHeader index="04" eyebrow="Journey" title="How I got here." />
        <ol className="timeline">
          {journey.map((j, i) => (
            <Reveal as="li" key={j.year} className="timeline__item" delay={i * 100}>
              <span className="timeline__year">{j.year}</span>
              <div className="timeline__card">
                <h3>{j.title}</h3>
                <p>{j.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
