import './globals.css';
import { DM_Sans } from 'next/font/google';
import type { ReactNode } from 'react';

const dmSans = DM_Sans({ subsets: ['latin'] });

export const metadata = {
  title: 'AnyPay',
  description: 'Accept any currency. Settle in yours.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={dmSans.className}>{children}</body>
    </html>
  );
}
