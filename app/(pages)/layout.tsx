import type { ReactNode } from 'react';

import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

export default function PagesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
