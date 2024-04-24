import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./global.css";
import { ThemeProvider } from "@/components/theme-provider";
import StoreProvider from "./StoreProvider";

// const barlow = Barlow({
//   subsets: ["latin"],
//   weight: ["300", "400", "500", "600", "700"],
// });
const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <StoreProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            // disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
