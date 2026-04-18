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
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {showBack && <Link href={backHref} className="text-blue-600 hover:text-blue-800">← Back</Link>}
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            </div>
            <div className="flex items-center space-x-4">
              {showSearch && <Link href="/search" className="text-blue-600 hover:text-blue-800">Search</Link>}
              <button
                onClick={() => setSettingsOpen(true)}
                className="text-gray-600 hover:text-gray-800"
              >
                ⚙️
              </button>
            </div>
          </div>
        </div>
      </header>
      <SettingsSidebar isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>
  );
}