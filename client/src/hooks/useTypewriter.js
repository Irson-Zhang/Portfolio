import { useEffect, useState } from 'react';
import { useReducedMotion } from './useReducedMotion.js';

export function useTypewriter(words, { typeMs = 70, deleteMs = 35, holdMs = 1700 } = {}) {
  const reduced = useReducedMotion();
  const [text, setText] = useState(reduced ? words[0] : '');

  useEffect(() => {
    if (reduced) {
      setText(words[0]);
      return;
    }
    let word = 0;
    let len = 0;
    let deleting = false;
    let timer;

    const tick = () => {
      const current = words[word];
      len += deleting ? -1 : 1;
      setText(current.slice(0, len));

      let delay = deleting ? deleteMs : typeMs;
      if (!deleting && len === current.length) {
        deleting = true;
        delay = holdMs;
      } else if (deleting && len === 0) {
        deleting = false;
        word = (word + 1) % words.length;
        delay = 300;
      }
      timer = setTimeout(tick, delay);
    };

    timer = setTimeout(tick, 500);
    return () => clearTimeout(timer);
  }, [words, reduced, typeMs, deleteMs, holdMs]);

  return text;
}
