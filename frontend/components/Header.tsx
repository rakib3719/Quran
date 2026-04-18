'use client';

import { useState } from 'react';
import Link from 'next/link';
import SettingsSidebar from './SettingsSidebar';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  backHref?: string;
  showSearch?: boolean;
}

export default function Header({ title, showBack = false, backHref = '/', showSearch = false }: HeaderProps) {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      <header className="bg-gray-950 border-b border-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              {showBack && (
                <Link href={backHref} className="rounded-full border border-gray-800 bg-gray-900 px-3 py-2 text-sm text-emerald-300 transition hover:border-emerald-400 hover:text-white">
                  ← Back
                </Link>
              )}
              <h1 className="text-2xl font-bold text-white">{title}</h1>
            </div>
            <div className="flex items-center gap-3">
              {showSearch && (
                <Link href="/search" className="rounded-full border border-gray-800 bg-gray-900 px-4 py-2 text-sm text-emerald-300 transition hover:border-emerald-400 hover:text-white">
                  Search
                </Link>
              )}
              <button
                onClick={() => setSettingsOpen(true)}
                className="rounded-full border border-gray-800 bg-gray-900 px-4 py-2 text-sm text-emerald-300 transition hover:border-emerald-400 hover:text-white"
              >
                ⚙️ Settings
              </button>
            </div>
          </div>
        </div>
      </header>
      <SettingsSidebar isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>
  );
}