import "@/styles/globals.css";
import { fingridFetch } from "@/utils/fetch";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Turbosähkö",
  description: "Turbosähköllä näet reaaliaikaiset sähkön hinnat Suomessa.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const health = await fingridFetch("/health");
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <header>Turbosähkö</header>
        <main>{children}</main>
        <footer>{health.ok ? <p>API is up!</p> : <p>API is down!</p>}</footer>
      </body>
    </html>
  );
}
