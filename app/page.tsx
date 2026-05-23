'use client';

import { useMemo, useState } from 'react';
import { servers, type Category, type Client, type Transport } from '@/data/servers';
import { ServerCard } from '@/components/ServerCard';
import { Filters } from '@/components/Filters';

export default function HomePage() {
  const [query, setQuery] = useState('');
  const [client, setClient] = useState<Client | 'All'>('All');
  const [transport, setTransport] = useState<Transport | 'All'>('All');
  const [category, setCategory] = useState<Category | 'All'>('All');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return servers.filter((s) => {
      if (client !== 'All' && !s.clients.includes(client)) return false;
      if (transport !== 'All' && !s.transports.includes(transport)) return false;
      if (category !== 'All' && s.category !== category) return false;
      if (q) {
        const hay = `${s.name} ${s.vendor} ${s.description}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [query, client, transport, category]);

  const onReset = () => {
    setQuery('');
    setClient('All');
    setTransport('All');
    setCategory('All');
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="mb-10">
        <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-500">
          <span className="rounded bg-blue-500/10 px-2 py-0.5 text-blue-300 ring-1 ring-inset ring-blue-500/30">
            MCP
          </span>
          <span>Catalog</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
          A browsable registry of Model Context Protocol servers
        </h1>
        <p className="mt-3 max-w-3xl text-base text-zinc-400">
          Production MCP servers from Anthropic, vendor-official releases and battle-tested community
          options. Filter by client, transport or category. Copy the install command, paste it into
          your Claude Code or Cursor config, ship.
        </p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs text-zinc-500">
          <span className="rounded bg-zinc-900 px-2 py-1 ring-1 ring-inset ring-zinc-800">
            {servers.length} servers
          </span>
          <span className="rounded bg-zinc-900 px-2 py-1 ring-1 ring-inset ring-zinc-800">
            Updated weekly
          </span>
          <a
            href="https://modelcontextprotocol.io"
            target="_blank"
            rel="noreferrer noopener"
            className="rounded bg-zinc-900 px-2 py-1 text-zinc-400 ring-1 ring-inset ring-zinc-800 hover:text-zinc-200"
          >
            What is MCP? &rarr;
          </a>
        </div>
      </header>

      <Filters
        query={query}
        onQueryChange={setQuery}
        client={client}
        onClientChange={setClient}
        transport={transport}
        onTransportChange={setTransport}
        category={category}
        onCategoryChange={setCategory}
        resultCount={filtered.length}
        totalCount={servers.length}
        onReset={onReset}
      />

      {filtered.length === 0 ? (
        <div className="mt-10 rounded-xl border border-dashed border-zinc-800 bg-zinc-950/40 p-10 text-center">
          <p className="text-zinc-400">
            No servers match these filters. Try clearing one of them.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((s) => (
            <ServerCard key={s.id} server={s} />
          ))}
        </div>
      )}

      <footer className="mt-16 border-t border-zinc-900 pt-6 text-xs text-zinc-500">
        <p>
          Catalog is curated by hand from vendor docs and the official servers repo. Missing one?
          {' '}
          <a
            href="https://github.com/L8ton-crypto/mcpcatalog/issues"
            target="_blank"
            rel="noreferrer noopener"
            className="text-blue-400 hover:underline"
          >
            Open an issue
          </a>
          .
        </p>
        <p className="mt-2">
          Built for AI architects evaluating MCP for their stack. Part of the
          {' '}
          <a
            href="https://appian-cheat.vercel.app"
            target="_blank"
            rel="noreferrer noopener"
            className="text-blue-400 hover:underline"
          >
            AppianCheat
          </a>
          {' '}AI and MCP cookbook portfolio.
        </p>
      </footer>
    </main>
  );
}
