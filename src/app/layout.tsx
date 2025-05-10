import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import ReactQueryProvider from "@/components/react-query-provider";
import { Toaster } from "@/components/ui/sonner";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Weatherly - Live Weather App",
  description:
    "Get accurate, real-time weather updates and forecasts with Weatherly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${lato.variable} antialiased`}>
        <ReactQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
          >
            <div className="bg-gradient-to-br from-background to-muted">
              <Navbar />

              <main className="min-h-screen container mx-auto py-8 px-4">
                {children}
              </main>

              <footer className="container mx-auto p-4 text-center">
                <p className="text-xs font-semibold">
                  Sherin Mostafa &copy; {new Date().getFullYear()}
                </p>
              </footer>
            </div>
            <Toaster position="top-right" />
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
