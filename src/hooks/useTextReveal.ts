import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function useTextReveal() {
  const ref = useRef<any>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    if (!el) return;

    const text = el.textContent || '';
    const words = text.split(' ');
    el.innerHTML = words.map((w: string) =>
      `<span style="display:inline-block; overflow:hidden; vertical-align:bottom">` +
      `<span class="word-inner" style="display:inline-block; transform:translateY(110%)">${w}&nbsp;</span>` +
      `</span>`
    ).join('');

    const anim = gsap.to(el.querySelectorAll('.word-inner'), {
      y: 0,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.04,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
    });

    return () => {
      anim.kill();
    };
  }, []);

  return ref;
}
