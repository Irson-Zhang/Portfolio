import { useState } from 'react';
import SectionHeader from './SectionHeader.jsx';
import Reveal from './Reveal.jsx';
import { site } from '../data/site.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const EMPTY = { name: '', email: '', message: '', company: '' };

function validate({ name, email, message }) {
  const errors = {};
  if (name.trim().length < 2) errors.name = 'Please enter your name.';
  if (!EMAIL_RE.test(email.trim())) errors.email = 'Enter a valid email address.';
  if (message.trim().length < 10) errors.message = 'Message should be at least 10 characters.';
  return errors;
}

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [serverMsg, setServerMsg] = useState('');

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(`f-${Object.keys(found)[0]}`)?.focus();
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 429) throw new Error('Too many messages. Please try again in a few minutes.');
      if (res.status === 400 && data.errors) {
        setErrors(data.errors);
        throw new Error('Please check the highlighted fields.');
      }
      if (!res.ok) throw new Error('The server is unreachable right now.');
      setStatus('sent');
      setForm(EMPTY);
    } catch (err) {
      setStatus('error');
      setServerMsg(err instanceof TypeError ? 'The server is unreachable right now.' : err.message);
    }
  };

  const field = (name, label, props = {}) => {
    const Tag = props.as || 'input';
    const { as, ...rest } = props;
    return (
      <div className={`field${errors[name] ? ' field--error' : ''}`}>
        <label htmlFor={`f-${name}`}>{label}</label>
        <Tag
          id={`f-${name}`}
          name={name}
          value={form[name]}
          onChange={onChange}
          aria-invalid={Boolean(errors[name])}
          aria-describedby={errors[name] ? `f-${name}-err` : undefined}
          {...rest}
        />
        {errors[name] && (
          <p className="field__error" id={`f-${name}-err`}>
            {errors[name]}
          </p>
        )}
      </div>
    );
  };

  return (
    <section id="contact" className="section">
      <div className="container contact">
        <div>
          <SectionHeader index="05" eyebrow="Contact" title="Let's build something.">
            Have a project, a role or a question? Send a message. It goes straight to my Express API and into
            MongoDB.
          </SectionHeader>
          <Reveal className="contact__alt">
            <p>
              Or email me directly at <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
          </Reveal>
        </div>

        <Reveal as="form" className="contact__form" onSubmit={onSubmit} noValidate delay={120}>
          {field('name', 'Name', { autoComplete: 'name', maxLength: 80 })}
          {field('email', 'Email', { type: 'email', autoComplete: 'email', maxLength: 254 })}
          {field('message', 'Message', { as: 'textarea', rows: 5, maxLength: 2000 })}

          {/* Honeypot: hidden from people, tempting to bots */}
          <div className="hp" aria-hidden="true">
            <label htmlFor="f-company">Company</label>
            <input id="f-company" name="company" tabIndex={-1} autoComplete="off" value={form.company} onChange={onChange} />
          </div>

          <button type="submit" className="btn btn--primary btn--block" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </button>

          <p className={`form-status form-status--${status}`} role="status" aria-live="polite">
            {status === 'sent' && 'Thanks! Your message was sent. I’ll reply soon.'}
            {status === 'error' && (
              <>
                {serverMsg} You can also email <a href={`mailto:${site.email}`}>{site.email}</a>.
              </>
            )}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
