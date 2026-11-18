import { site } from '../data/site.js';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>
          © {new Date().getFullYear()} {site.name}. Built with MongoDB, Express, React &amp; Node.
        </p>
        <ul className="footer__links">
          {site.socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noreferrer">
                {s.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#top">Back to top ↑</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
