'use client';

import type { Category, Client, Transport } from '@/data/servers';
import { allCategories, allClients, allTransports } from '@/data/servers';

interface Props {
  query: string;
  onQueryChange: (v: string) => void;
  client: Client | 'All';
  onClientChange: (v: Client | 'All') => void;
  transport: Transport | 'All';
  onTransportChange: (v: Transport | 'All') => void;
  category: Category | 'All';
  onCategoryChange: (v: Category | 'All') => void;
  resultCount: number;
  totalCount: number;
  onReset: () => void;
}

const baseSelect =
  'rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-200 outline-none transition focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600';

export function Filters(props: Props) {
  const {
    query,
    onQueryChange,
    client,
    onClientChange,
    transport,
    onTransportChange,
    category,
    onCategoryChange,
    resultCount,
    totalCount,
    onReset,
  } = props;

  const filtersDirty =
    query !== '' || client !== 'All' || transport !== 'All' || category !== 'All';

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <input
          type="search"
          placeholder="Search name, vendor, description..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          className={`${baseSelect} sm:col-span-2 lg:col-span-1`}
        />
        <select
          value={client}
          onChange={(e) => onClientChange(e.target.value as Client | 'All')}
          className={baseSelect}
        >
          <option value="All">All clients</option>
          {allClients.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          value={transport}
          onChange={(e) => onTransportChange(e.target.value as Transport | 'All')}
          className={baseSelect}
        >
          <option value="All">All transports</option>
          {allTransports.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value as Category | 'All')}
          className={baseSelect}
        >
          <option value="All">All categories</option>
          {allCategories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-zinc-500">
        <span>
          Showing <span className="text-zinc-200">{resultCount}</span> of {totalCount} servers
        </span>
        {filtersDirty ? (
          <button
            onClick={onReset}
            className="rounded bg-zinc-900 px-2 py-1 text-zinc-300 ring-1 ring-inset ring-zinc-800 hover:bg-zinc-800"
          >
            Reset filters
          </button>
        ) : null}
      </div>
    </div>
  );
}
