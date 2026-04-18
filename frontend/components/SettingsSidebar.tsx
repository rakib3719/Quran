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
      <div className="absolute inset-0 bg-black bg-opacity-70" onClick={onClose}></div>
      <div className="relative ml-auto w-80 bg-gray-800 shadow-xl border-l border-gray-700">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Settings</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">×</button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Arabic Font</label>
              <select
                value={settings.arabicFont}
                onChange={(e) => updateSettings({ arabicFont: e.target.value as 'amiri' | 'scheherazade' })}
                className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white"
              >
                <option value="amiri">Amiri</option>
                <option value="scheherazade">Scheherazade</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Arabic Font Size: {settings.arabicFontSize}px
              </label>
              <input
                type="range"
                min="16"
                max="48"
                value={settings.arabicFontSize}
                onChange={(e) => updateSettings({ arabicFontSize: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Translation Font Size: {settings.translationFontSize}px
              </label>
              <input
                type="range"
                min="12"
                max="24"
                value={settings.translationFontSize}
                onChange={(e) => updateSettings({ translationFontSize: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}