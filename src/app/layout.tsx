import Navbar from "@/components/Navbar/Navbar";
import "../styles/globals.css";
import { ReduxProvider } from "@/store/provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
