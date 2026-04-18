'use client';

import { useState } from 'react';
import SettingsSidebar from './SettingsSidebar';

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      <header className="bg-[#050608] border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500 text-lg font-semibold text-black shadow-sm">Q</span>
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-emerald-400">Quran App</p>
                <h1 className="text-lg font-semibold text-white">Quran</h1>
              </div>
            </div>
            <button
              onClick={() => setSettingsOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gray-800 text-white transition hover:bg-gray-700"
              aria-label="Settings"
            >
              ⚙️
            </button>
          </div>
        </div>
      </header>
      <SettingsSidebar isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>
  );
}