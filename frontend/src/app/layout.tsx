import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import QueryProvider from '@/components/providers/query-provider';
import { Toaster } from '@/components/ui/sonner';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'RecipeHub',
  description: 'Recipe sharing app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
        suppressHydrationWarning
      >
        <QueryProvider>{children}</QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
