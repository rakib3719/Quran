'use client';

import { useState, useEffect } from 'react';

interface Settings {
  arabicFont: 'amiri' | 'scheherazade';
  arabicFontSize: number;
  translationFontSize: number;
}

interface SettingsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsSidebar({ isOpen, onClose }: SettingsSidebarProps) {
  const [settings, setSettings] = useState<Settings>({
    arabicFont: 'amiri',
    arabicFontSize: 24,
    translationFontSize: 16,
  });

  useEffect(() => {
    const saved = localStorage.getItem('quran-settings');
    if (saved) {
      const loadedSettings = JSON.parse(saved);
      setSettings(loadedSettings);
      // Apply loaded settings to document
      document.documentElement.style.setProperty('--arabic-font-size', `${loadedSettings.arabicFontSize}px`);
      document.documentElement.style.setProperty('--translation-font-size', `${loadedSettings.translationFontSize}px`);
      document.documentElement.style.setProperty('--arabic-font', loadedSettings.arabicFont === 'amiri' ? 'var(--font-amiri)' : 'var(--font-scheherazade)');
    }
  }, []);

  const updateSettings = (newSettings: Partial<Settings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem('quran-settings', JSON.stringify(updated));
    // Apply to document
    document.documentElement.style.setProperty('--arabic-font-size', `${updated.arabicFontSize}px`);
    document.documentElement.style.setProperty('--translation-font-size', `${updated.translationFontSize}px`);
    document.documentElement.style.setProperty('--arabic-font', updated.arabicFont === 'amiri' ? 'var(--font-amiri)' : 'var(--font-scheherazade)');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-black/70" onClick={onClose}></div>
      <div className="relative ml-auto w-full max-w-md bg-gray-950 shadow-2xl border-l border-gray-800">
        <div className="p-6">
          <div className="flex items-center justify-between gap-4 border-b border-gray-800 pb-4">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-emerald-400">Reader settings</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Font controls</h2>
            </div>
            <button onClick={onClose} className="rounded-full border border-gray-700 bg-gray-900 px-3 py-2 text-gray-300 transition hover:border-emerald-400 hover:text-white">
              ×
            </button>
          </div>

          <div className="mt-6 space-y-6">
            <div className="rounded-3xl border border-gray-800 bg-gray-900 p-4">
              <p className="text-sm text-gray-400 mb-2">Arabic Font</p>
              <select
                value={settings.arabicFont}
                onChange={(e) => updateSettings({ arabicFont: e.target.value as 'amiri' | 'scheherazade' })}
                className="w-full rounded-3xl border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none focus:border-emerald-400"
              >
                <option value="amiri">Amiri</option>
                <option value="scheherazade">Scheherazade</option>
              </select>
            </div>

            <div className="rounded-3xl border border-gray-800 bg-gray-900 p-4">
              <div className="flex items-center justify-between gap-4 mb-3">
                <p className="text-sm text-gray-400">Arabic Font Size</p>
                <span className="text-sm text-emerald-300">{settings.arabicFontSize}px</span>
              </div>
              <input
                type="range"
                min="16"
                max="48"
                value={settings.arabicFontSize}
                onChange={(e) => updateSettings({ arabicFontSize: parseInt(e.target.value) })}
                className="w-full accent-emerald-400"
              />
            </div>

            <div className="rounded-3xl border border-gray-800 bg-gray-900 p-4">
              <div className="flex items-center justify-between gap-4 mb-3">
                <p className="text-sm text-gray-400">Translation Font Size</p>
                <span className="text-sm text-emerald-300">{settings.translationFontSize}px</span>
              </div>
              <input
                type="range"
                min="12"
                max="24"
                value={settings.translationFontSize}
                onChange={(e) => updateSettings({ translationFontSize: parseInt(e.target.value) })}
                className="w-full accent-emerald-400"
              />
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-100">
            <p className="font-medium">Tip</p>
            <p className="mt-2 text-gray-300">
              Use the font slider and choose a different Arabic font to make reading easier. Your settings are saved automatically.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}