import type { ReactNode } from 'react';

export default function OdLayout({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        overflowY: 'auto',
        overflowX: 'hidden',
        background: '#070605',
      }}
    >
      {children}
    </div>
  );
}
