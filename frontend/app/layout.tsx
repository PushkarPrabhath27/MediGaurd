import type { Metadata } from "next";
import { IBM_Plex_Mono, Manrope } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "MediGuard | Medical Asset Intelligence",
  description:
    "Professional predictive maintenance and operational intelligence for clinical equipment fleets.",
};

const bodyClassName = `${manrope.variable} ${plexMono.variable} min-h-full bg-background text-foreground`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${plexMono.variable} h-full antialiased`}>
      <body className={bodyClassName}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
