import type { Metadata } from "next";
import "../styles/global-rules.scss";
import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer/Footer";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<div>Loading...</div>}>
          <Nav />
        </Suspense>
        {children}
        <Footer />
      </body>
    </html>
  );
}
