'use client';

import { useState } from 'react';
import type { McpServer } from '@/data/servers';

const vendorBadgeColor: Record<McpServer['vendorType'], string> = {
  Anthropic: 'bg-orange-500/15 text-orange-300 ring-orange-500/30',
  'Vendor-official': 'bg-emerald-500/15 text-emerald-300 ring-emerald-500/30',
  Community: 'bg-zinc-500/15 text-zinc-300 ring-zinc-500/30',
};

const transportColor: Record<string, string> = {
  stdio: 'bg-sky-500/15 text-sky-300 ring-sky-500/30',
  sse: 'bg-violet-500/15 text-violet-300 ring-violet-500/30',
  http: 'bg-fuchsia-500/15 text-fuchsia-300 ring-fuchsia-500/30',
};

export function ServerCard({ server }: { server: McpServer }) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(server.install);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <article className="group relative flex flex-col rounded-xl border border-zinc-800 bg-zinc-950/60 p-5 transition hover:border-zinc-700 hover:bg-zinc-900/40">
      <header className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-zinc-100">{server.name}</h3>
          <p className="mt-0.5 text-xs text-zinc-500">{server.vendor}</p>
        </div>
        <span
          className={`shrink-0 rounded-md px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ring-1 ring-inset ${vendorBadgeColor[server.vendorType]}`}
        >
          {server.vendorType}
        </span>
      </header>

      <p className="mt-3 text-sm leading-relaxed text-zinc-400">{server.description}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        <span className="rounded-md bg-zinc-800/70 px-2 py-0.5 text-[11px] text-zinc-300 ring-1 ring-inset ring-zinc-700/60">
          {server.category}
        </span>
        {server.transports.map((t) => (
          <span
            key={t}
            className={`rounded-md px-2 py-0.5 text-[11px] font-medium uppercase ring-1 ring-inset ${transportColor[t]}`}
          >
            {t}
          </span>
        ))}
        <span className="rounded-md bg-zinc-800/70 px-2 py-0.5 text-[11px] text-zinc-300 ring-1 ring-inset ring-zinc-700/60">
          {server.toolCount} tools
        </span>
      </div>

      <div className="mt-3 flex flex-wrap gap-1">
        {server.clients.map((c) => (
          <span
            key={c}
            className="rounded bg-zinc-900 px-1.5 py-0.5 text-[10px] text-zinc-400 ring-1 ring-inset ring-zinc-800"
          >
            {c}
          </span>
        ))}
      </div>

      <div className="mt-4 rounded-lg border border-zinc-800 bg-black/50">
        <div className="flex items-center justify-between border-b border-zinc-800 px-3 py-1.5">
          <span className="text-[10px] uppercase tracking-wider text-zinc-500">install</span>
          <button
            onClick={onCopy}
            className="rounded bg-zinc-800 px-2 py-0.5 text-[10px] text-zinc-300 transition hover:bg-zinc-700"
            aria-label="Copy install command"
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        <pre className="overflow-x-auto px-3 py-2 font-mono text-[11px] leading-relaxed text-zinc-300">
{server.install}
        </pre>
      </div>

      <footer className="mt-4 flex items-center justify-between gap-2 text-xs">
        <a
          href={server.repoUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="text-blue-400 hover:text-blue-300 hover:underline"
        >
          Repo &rarr;
        </a>
        {server.docsUrl ? (
          <a
            href={server.docsUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="text-zinc-400 hover:text-zinc-200 hover:underline"
          >
            Docs &rarr;
          </a>
        ) : null}
      </footer>
    </article>
  );
}
