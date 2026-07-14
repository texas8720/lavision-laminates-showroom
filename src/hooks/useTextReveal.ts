import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function useTextReveal() {
  const ref = useRef<any>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // Small delay to ensure DOM and layout are complete
    const timer = setTimeout(() => {
      const text = el.textContent || '';
      const words = text.split(' ').filter(Boolean);
      
      el.innerHTML = words.map((w: string) =>
        `<span style="display:inline-block; overflow:hidden; vertical-align:bottom; margin-right:0.25em">` +
        `<span class="word-inner" style="display:inline-block">${w}</span>` +
        `</span>`
      ).join('');

      const innerWords = el.querySelectorAll('.word-inner');

      // Set initial state
      gsap.set(innerWords, { y: '105%' });

      // Animate in on scroll
      gsap.to(innerWords, {
        y: 0,
        duration: 1.0,
        ease: 'power3.out',
        stagger: 0.05,
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          once: true,
        },
        onComplete: () => {
          // Safety: always ensure visible after animation
          gsap.set(innerWords, { y: 0, clearProps: 'transform' });
        }
      });
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return ref;
}
