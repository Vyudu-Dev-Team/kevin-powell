import './globals.css';
import { Playfair_Display } from 'next/font/google';
import SmoothScroll from '@/components/SmoothScroll';

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair'
});

export const metadata = {
  title: 'Kevin Powell Film',
  description: 'Official website for Kevin Powell\'s latest film',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={playfair.variable} suppressHydrationWarning>
      <body className={`${playfair.className} antialiased`} suppressHydrationWarning>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}