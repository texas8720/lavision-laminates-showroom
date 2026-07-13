import Link from 'next/link';

export default function NotFound() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#050403', textAlign: 'center', padding: '40px' }}>
      <span style={{ fontFamily: 'var(--font-sans)', fontSize: '9px', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#F3C623', marginBottom: '24px', display: 'block' }}>404</span>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px, 6vw, 64px)', fontWeight: 300, color: '#F0EAE0', marginBottom: '24px', lineHeight: 1.1 }}>
        This Surface Doesn't Exist (Yet).
      </h1>
      <p style={{ color: 'rgba(240,234,224,0.45)', marginBottom: '40px', maxWidth: '400px' }}>
        Let's get you back to the collection.
      </p>
      <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', height: '52px', padding: '0 36px', background: '#F3C623', color: '#050403', fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', textDecoration: 'none' }}>
        Back to Home
      </Link>
    </main>
  );
}
