"use client";
import Navbar from "@/components/organizms/Navbar/Navbar";
import "../styles/globals.css";
import { useEffect } from 'react';
import Modal from 'react-modal';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    Modal.setAppElement('#__next');
  }, []);

  return (
    <html lang="en">
      <body id="__next">
        <Navbar />
        {children}
      </body>
    </html>
  );
}