"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <Toaster
        position="top-center"
        toastOptions={{
          style: { fontFamily: "Cairo, sans-serif", direction: "rtl" },
          duration: 3000,
        }}
      />
    </SessionProvider>
  );
}
