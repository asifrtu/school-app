import type { Metadata } from "next";
import { Rethink_Sans } from 'next/font/google'
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { ourFileRouter } from "./api/uploadthing/core";
import { Toaster } from "sonner";
// If loading a variable font, you don't need to specify the font weight
const inter = Rethink_Sans({
  subsets: ['latin'],
  display: 'swap',
})

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ProviderWrapper } from "@/store/ProviderWrapper";

export const metadata: Metadata = {
  title: "School App",
  description: "School Management System",
};
type ToasterProps = React.ComponentProps<typeof Toaster>;

const toastOptions: ToasterProps = {
  theme: "dark",
  richColors: true,
  closeButton: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* <Toaster position="top-center" reverseOrder={false}/> */}
        
        <Toaster {...toastOptions} />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <ProviderWrapper>
          {children}
        </ProviderWrapper>
        </ThemeProvider>

      </body>
    </html>
  );
}
