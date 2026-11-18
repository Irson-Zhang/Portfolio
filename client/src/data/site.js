// Edit this file to make the portfolio yours. Every section reads from here.

export const site = {
  name: 'Irson',
  role: 'Full-Stack MERN Developer',
  roles: ['full-stack developer.', 'React engineer.', 'Node & Express builder.', 'UI craftsperson.'],
  tagline:
    'I build fast, accessible web apps, from semantic HTML and hand-written CSS to production React and MERN stacks.',
  email: 'hello@example.com', // TODO: your email
  location: 'Remote', // TODO: your city
  socials: [
    { label: 'GitHub', href: 'https://github.com/' }, // TODO: your profile URLs
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
  ],
};

export const stats = [
  { value: '3+', label: 'Years coding' },
  { value: '20+', label: 'Projects shipped' },
  { value: '7', label: 'Core technologies' },
];

// Grouped by level, from fundamentals up to the full stack.
export const skillGroups = [
  {
    level: '01',
    title: 'Foundations',
    blurb: 'Semantic, accessible markup and modern layout.',
    items: [
      { name: 'HTML5 & semantics', value: 95 },
      { name: 'CSS3, Grid & Flexbox', value: 92 },
      { name: 'Responsive & fluid design', value: 90 },
      { name: 'Accessibility (WCAG)', value: 82 },
    ],
  },
  {
    level: '02',
    title: 'JavaScript',
    blurb: 'The language under everything else.',
    items: [
      { name: 'ES2024+ & modules', value: 90 },
      { name: 'DOM & Web APIs', value: 88 },
      { name: 'Async, Promises & Fetch', value: 87 },
      { name: 'TypeScript', value: 72 },
    ],
  },
  {
    level: '03',
    title: 'Frontend',
    blurb: 'Component-driven UIs that stay fast.',
    items: [
      { name: 'React & Hooks', value: 90 },
      { name: 'State (Context, reducers)', value: 84 },
      { name: 'React Router', value: 82 },
      { name: 'Vite & build tooling', value: 80 },
    ],
  },
  {
    level: '04',
    title: 'Backend',
    blurb: 'APIs that are secure and predictable.',
    items: [
      { name: 'Node.js', value: 85 },
      { name: 'Express & REST design', value: 86 },
      { name: 'Auth (JWT, bcrypt)', value: 78 },
      { name: 'Validation & security', value: 76 },
    ],
  },
  {
    level: '05',
    title: 'Data & Delivery',
    blurb: 'Persisting data and shipping it.',
    items: [
      { name: 'MongoDB & Mongoose', value: 84 },
      { name: 'Git & GitHub', value: 88 },
      { name: 'Testing (Vitest, Jest)', value: 70 },
      { name: 'Deploy (Render, Vercel)', value: 78 },
    ],
  },
];

export const journey = [
  { year: '2023', title: 'HTML & CSS', text: 'Built my first static sites and learned layout, typography and responsive design.' },
  { year: '2024', title: 'JavaScript', text: 'Moved from static pages to interactive apps with the DOM, events and fetch.' },
  { year: '2025', title: 'React', text: 'Switched to components, hooks and SPAs, and started shipping real projects.' },
  { year: '2026', title: 'MERN Stack', text: 'Took apps to full-stack with Node, Express and MongoDB, plus auth and deployment.' },
];
