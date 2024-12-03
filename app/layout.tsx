import './globals.css';
import { Playfair_Display } from 'next/font/google';
import SmoothScroll from '@/components/SmoothScroll';
import CustomCursor from '@/components/CustomCursor';
import ScrollProgress from '@/components/ScrollProgress';
import ErrorBoundary from '@/components/ErrorBoundary';
import type { Metadata, Viewport } from 'next';

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair'
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const metadata: Metadata = {
  title: 'When We Free The World',
  description: 'A Film by Kevin Powell',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={playfair.variable}>
      <head>
        <meta name="theme-color" content="#000000" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body 
        className={`${playfair.className} antialiased bg-black text-white overflow-x-hidden`}
        style={{
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        }}
      >
        <ErrorBoundary>
          <SmoothScroll>
            <ScrollProgress />
            {children}
            <CustomCursor />
          </SmoothScroll>
        </ErrorBoundary>
      </body>
    </html>
  );
}