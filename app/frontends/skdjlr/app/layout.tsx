import type { Metadata } from "next";
import { Barlow, Inter } from "next/font/google";
import "./global.css";
import { ThemeProvider } from "@/components/theme-provider";

// const barlow = Barlow({
//   subsets: ["latin"],
//   weight: ["300", "400", "500", "600", "700"],
// });
const barlow = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SKDJLR",
  description: "Scheduling was never so easy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={barlow.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          // disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
      {/* <body className={inter.className}>{children}</body> */}
    </html>
  );
}
