import type { Metadata } from "next";
import { Oswald, Roboto_Condensed, Roboto_Slab } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "@/components/providers/ConvexClientProvider";
import { UserSync } from "@/components/auth/UserSync";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const robotoCondensed = Roboto_Condensed({
  variable: "--font-roboto-condensed",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const robotoSlab = Roboto_Slab({
  variable: "--font-roboto-slab",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Street League Reproduction (PoC)",
  description: "Next.js migration of the SLS reproduction project.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="hide-scroll" suppressHydrationWarning>
      <body
        className={`${oswald.variable} ${robotoCondensed.variable} ${robotoSlab.variable} antialiased bg-black text-white font-body selection:bg-brand-blue selection:text-white`}
      >
        <ConvexClientProvider>
          <UserSync />
          {children}
        </ConvexClientProvider>
      </body>
    </html>
  );
}
