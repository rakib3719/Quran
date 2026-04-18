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
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-white">{title}</h1>
            <button
              onClick={() => setSettingsOpen(true)}
              className="rounded-full bg-gray-800 p-2 text-gray-300 transition hover:bg-gray-700 hover:text-white"
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