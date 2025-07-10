import Navbar from "@/components/Navbar/Navbar";
import "../styles/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <Navbar />
        
        {children}
      </body>
    </html>
  );
}
