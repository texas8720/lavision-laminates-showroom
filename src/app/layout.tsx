import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import SmoothScroll from '@/components/SmoothScroll';
import PreloaderWrapper from '@/components/PreloaderWrapper';

export const metadata: Metadata = {
  title: 'lavision Laminates | Surfaces, Engineered for Imagination.',
  description: 'Curating premium laminates, louvers, acrylics, polymer, leather finish sheets, and natural stone veneer for luxury interiors in Rajkot & Ahmedabad, Gujarat.',
  keywords: 'Laminates, Louvers, Acrylic Sheets, Polymer Sheets, Leather Sheets, Natural Stone Veneer, Decorative Panels, Rajkot, Ahmedabad, Gujarat',
  authors: [{ name: 'lavision Laminates' }],
  openGraph: {
    title: 'lavision Laminates | Premium Surface Solutions',
    description: '15 Years of Surface Mastery. Discover our digital showroom and flagship locations in Gujarat.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ height: '100%' }}>
      <head>
        <link rel="canonical" href="https://lavision-laminates.com" />
        {/* Structured LocalBusiness SEO Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              'name': 'lavision Laminates',
              'image': 'https://lavision-laminates.com/logo.png',
              'telephone': '+919876543210',
              'email': 'hello@lavision.in',
              'address': {
                '@type': 'PostalAddress',
                'streetAddress': 'G-14, Ramdevnagar Complex, Satellite Road',
                'addressLocality': 'Ahmedabad',
                'addressRegion': 'Gujarat',
                'postalCode': '380015',
                'addressCountry': 'IN',
              },
              'openingHoursSpecification': {
                '@type': 'OpeningHoursSpecification',
                'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                'opens': '10:00',
                'closes': '19:00',
              },
            }),
          }}
        />
      </head>
      <body style={{ minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
        <div className="grain-overlay" />
        <CustomCursor />
        <PreloaderWrapper>
          <Navbar />
          <SmoothScroll>
            {children}
          </SmoothScroll>
          <Footer />
        </PreloaderWrapper>
      </body>
    </html>
  );
}
