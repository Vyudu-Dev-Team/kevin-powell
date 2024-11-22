import './globals.css';
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair'
});

export const metadata = {
  title: 'Modern Film Site',
  description: 'A cinematic journey through storytelling',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={playfair.variable} suppressHydrationWarning>
      <body className={`${playfair.className} antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}