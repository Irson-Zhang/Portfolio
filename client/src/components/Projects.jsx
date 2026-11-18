import { useEffect, useMemo, useState } from 'react';
import SectionHeader from './SectionHeader.jsx';
import Reveal from './Reveal.jsx';
import { useReducedMotion } from '../hooks/useReducedMotion.js';
import localProjects from '../../../shared/projects.json';

const FILTERS = [
  ['all', 'All'],
  ['fundamentals', 'HTML · CSS · JS'],
  ['frontend', 'React'],
  ['fullstack', 'MERN'],
];

export default function Projects() {
  // Render the bundled copy right away, then swap in live API data if the server is up.
  const [projects, setProjects] = useState(localProjects);
  const [source, setSource] = useState('bundled');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const ctrl = new AbortController();
    fetch('/api/projects', { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(r.status))))
      .then((data) => {
        if (Array.isArray(data) && data.length) {
          setProjects(data);
          setSource('api');
        }
      })
      .catch(() => {});
    return () => ctrl.abort();
  }, []);

  const visible = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.category === filter)),
    [projects, filter]
  );

  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHeader index="03" eyebrow="Projects" title="Selected work.">
          Served by the Express API at <code>/api/projects</code>
          {source === 'api' ? ' (live).' : ' (bundled copy shown while the API is offline).'}
        </SectionHeader>

        <div className="filters" role="group" aria-label="Filter projects">
          {FILTERS.map(([key, label]) => (
            <button
              key={key}
              type="button"
              className="chip"
              aria-pressed={filter === key}
              onClick={() => setFilter(key)}
            >
              {label}
            </button>
          ))}
        </div>

        <ul className="projects">
          {visible.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={(i % 3) * 90}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ProjectCard({ project: p }) {
  const reduced = useReducedMotion();

  const onMove = (e) => {
    if (reduced || e.pointerType !== 'mouse') return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty('--rx', `${((0.5 - y) * 7).toFixed(2)}deg`);
    el.style.setProperty('--ry', `${((x - 0.5) * 9).toFixed(2)}deg`);
    el.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`);
    el.style.setProperty('--my', `${(y * 100).toFixed(1)}%`);
  };
  const onLeave = (e) => {
    e.currentTarget.style.setProperty('--rx', '0deg');
    e.currentTarget.style.setProperty('--ry', '0deg');
  };

  return (
    <article className={`project-card project-card--${p.category}`} onPointerMove={onMove} onPointerLeave={onLeave}>
      <div className="project-card__cover" aria-hidden="true">
        <span>{p.glyph}</span>
        {p.featured && <em className="badge">Featured</em>}
      </div>
      <div className="project-card__body">
        <div className="project-card__meta">
          <span>{p.year}</span>
        </div>
        <h3>{p.title}</h3>
        <p>{p.description}</p>
        <ul className="tags" aria-label="Technologies">
          {p.tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <div className="project-card__links">
          {p.links?.live ? (
            <a href={p.links.live} target="_blank" rel="noreferrer">
              Live demo ↗
            </a>
          ) : null}
          {p.links?.repo ? (
            <a href={p.links.repo} target="_blank" rel="noreferrer">
              Source ↗
            </a>
          ) : null}
          {!p.links?.live && !p.links?.repo && <span className="muted">Case study coming soon</span>}
        </div>
      </div>
    </article>
  );
}
