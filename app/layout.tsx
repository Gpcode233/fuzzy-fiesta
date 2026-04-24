import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Flux',
  description: 'Accept more currencies. Settle in yours.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="font-sans">
      <body>{children}</body>
    </html>
  );
}
