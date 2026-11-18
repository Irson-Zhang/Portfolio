import SectionHeader from './SectionHeader.jsx';
import Reveal from './Reveal.jsx';
import { site, stats } from '../data/site.js';

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHeader index="01" eyebrow="About" title="Building for the web, end to end." />
        <div className="about">
          <Reveal className="about__text">
            <p>
              I&rsquo;m {site.name}, a developer who enjoys every layer of the web, from the first semantic HTML
              tag to a deployed API backed by MongoDB. I care about interfaces that feel quick, work with a
              keyboard and screen reader, and still hold up when the data gets large.
            </p>
            <p>
              Right now I build full-stack apps with <strong>React</strong>, <strong>Node.js</strong>,{' '}
              <strong>Express</strong> and <strong>MongoDB</strong>. This site is one of them: a React frontend
              talking to an Express API, with no UI libraries.
            </p>
            <dl className="stats">
              {stats.map((s) => (
                <div key={s.label} className="stat">
                  <dt>{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal className="code-card" delay={120} aria-label="About me as a JavaScript object" role="img">
            <div className="code-card__bar" aria-hidden="true">
              <span />
              <span />
              <span />
              <em>irson.js</em>
            </div>
            <pre aria-hidden="true">
              <code>
                <span className="tok-k">const</span> <span className="tok-v">developer</span> = {'{'}
                {'\n'}  name: <span className="tok-s">&apos;{site.name}&apos;</span>,
                {'\n'}  role: <span className="tok-s">&apos;{site.role}&apos;</span>,
                {'\n'}  location: <span className="tok-s">&apos;{site.location}&apos;</span>,
                {'\n'}  stack: [<span className="tok-s">&apos;Mongo&apos;</span>, <span className="tok-s">&apos;Express&apos;</span>, <span className="tok-s">&apos;React&apos;</span>, <span className="tok-s">&apos;Node&apos;</span>],
                {'\n'}  <span className="tok-f">loves</span>: () =&gt; <span className="tok-s">&apos;clean, accessible UI&apos;</span>,
                {'\n'}  openToWork: <span className="tok-k">true</span>,
                {'\n'}{'}'};
              </code>
            </pre>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
