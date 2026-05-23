import './globals.css';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  title: 'MCPCatalog - browsable registry of MCP servers',
  description: 'Curated catalog of production Model Context Protocol servers. Filter by client, transport, category. Built for AI architects evaluating MCP for their stack.',
  openGraph: {
    title: 'MCPCatalog',
    description: 'Curated catalog of production MCP servers for AI architects.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
