import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-switcher";
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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="flex justify-between border-b px-4 py-2">
            <span className="text-3xl font-bold">Turbosähkö</span>
            <ThemeToggle />
          </header>
          <main className="flex min-h-screen w-full items-center justify-center">
            {children}
          </main>
          <footer>{health.ok ? <p>API is up!</p> : <p>API is down!</p>}</footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
