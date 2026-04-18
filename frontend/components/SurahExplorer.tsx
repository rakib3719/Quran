'use client';

import { useEffect, useMemo, useState } from 'react';
import { getSurahByNumber, searchAyahs } from '../lib/quran';
import type { Surah, SurahWithAyahs } from '../types/quran';
import Header from './Header';

interface SearchResult {
  surah: Surah;
  ayah: any;
  translation: string;
}

interface SurahExplorerProps {
  surahs: Surah[];
}

export default function SurahExplorer({ surahs }: SurahExplorerProps) {
  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSurahNumber, setSelectedSurahNumber] = useState<number>(surahs[0]?.number ?? 1);
  const [selectedSurah, setSelectedSurah] = useState<SurahWithAyahs | null>(null);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (surahs.length > 0) {
      setSelectedSurahNumber(surahs[0].number);
    }
  }, [surahs]);

  useEffect(() => {
    if (!selectedSurahNumber) return;

    getSurahByNumber(selectedSurahNumber).then((surah) => {
      if (surah) setSelectedSurah(surah);
    });
  }, [selectedSurahNumber]);

  const handleSearch = async () => {
    const trimmed = searchInput.trim();
    setSearchTerm(trimmed);
    if (trimmed.length === 0) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    const results = await searchAyahs(trimmed);
    setSearchResults(results);
    setLoading(false);
  };

  const displayedSurahs = surahs;

  return (
    <div className="min-h-screen bg-[#050608] text-white">
      <Header title="Quran" showSearch={false} />
      <main className="mx-auto max-w-7xl px-4 pb-16 pt-8">
        <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
          <section className="space-y-6 rounded-[2rem] border border-gray-800 bg-gray-950 p-6 shadow-2xl">
            <div className="rounded-[1.75rem] border border-gray-800 bg-[#0b1220] p-5">
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">Search Quran</p>
              <div className="mt-4 flex gap-3">
                <input
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Type translation text or surah name..."
                  className="flex-1 rounded-3xl border border-gray-700 bg-gray-900 px-4 py-3 text-white outline-none transition focus:border-emerald-400"
                />
                <button
                  type="button"
                  onClick={handleSearch}
                  className="rounded-3xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-emerald-400"
                >
                  Find
                </button>
              </div>
              <p className="mt-3 text-sm body-secondary">
                Type your search and click Find to search ayahs by translation.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-gray-800 bg-[#0b1220] p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">Surah list</p>
                  <h2 className="mt-3 text-2xl font-semibold text-white">114 Surahs</h2>
                </div>
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm text-emerald-300">
                  {displayedSurahs.length} shown
                </span>
              </div>

              <div className="mt-5 space-y-3 max-h-[560px] overflow-y-auto pr-2">
                {displayedSurahs.map((surah) => {
                  const active = surah.number === selectedSurahNumber;
                  return (
                    <button
                      key={surah.number}
                      type="button"
                      onClick={() => setSelectedSurahNumber(surah.number)}
                      className={`w-full rounded-3xl border px-4 py-4 text-left transition ${
                        active
                          ? 'border-emerald-400 bg-emerald-500/10 text-white'
                          : 'border-gray-800 bg-gray-900 text-gray-200 hover:border-emerald-400 hover:bg-gray-800'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-sm font-semibold">{surah.englishName}</p>
                          <p className="mt-1 text-xs body-secondary">{surah.englishNameTranslation}</p>
                        </div>
                        <div className="rounded-full border border-gray-700 bg-gray-800 px-3 py-1 text-sm text-gray-300">
                          {surah.number}
                        </div>
                      </div>
                      <p className="mt-3 text-sm body-secondary">{surah.numberOfAyahs} ayahs • {surah.revelationType}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <div className="rounded-[2rem] border border-gray-800 bg-[#0b1220] p-6 shadow-2xl">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">Current Surah</p>
                  <h2 className="mt-3 text-3xl font-semibold text-white">
                    {selectedSurah?.englishName ?? 'Select a Surah'}
                  </h2>
                  {selectedSurah && (
                    <p className="mt-3 text-sm body-secondary">
                      {selectedSurah.englishNameTranslation} • {selectedSurah.numberOfAyahs} verses • {selectedSurah.revelationType}
                    </p>
                  )}
                </div>
                <div className="rounded-3xl bg-gray-900 px-5 py-4 text-sm text-gray-300 border border-gray-800">
                  Use the side panel to select Surah, then adjust font sizes with settings for the best reading experience.
                </div>
              </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-[1fr]">
              <div className="rounded-[2rem] border border-gray-800 bg-[#0b1220] p-6 card-surface">
                <h3 className="text-xl font-semibold text-white">Reader</h3>
                <p className="mt-2 body-secondary">If search results appear, they show directly below. Otherwise, use the chosen surah from the left list.</p>
              </div>

              <div className="rounded-[2rem] border border-gray-800 bg-[#0b1220] p-6">
                {searchTerm ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-4 border-b border-gray-800 pb-4">
                      <div>
                        <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">Search results</p>
                        <h3 className="mt-2 text-2xl font-semibold text-white">{searchResults.length} matches</h3>
                      </div>
                      {loading && <span className="text-sm text-gray-300">Searching...</span>}
                    </div>
                    <div className="space-y-4 max-h-[620px] overflow-y-auto pr-1">
                      {searchResults.length === 0 && !loading ? (
                        <p className="text-gray-400">No ayahs found for this search.</p>
                      ) : (
                        searchResults.map((result) => (
                          <button
                            key={`${result.surah.number}-${result.ayah.number}`}
                            type="button"
                            onClick={() => setSelectedSurahNumber(result.surah.number)}
                            className="w-full rounded-3xl border border-gray-800 bg-gray-900 p-5 text-left transition hover:border-emerald-400"
                          >
                            <p className="text-sm text-emerald-300">Surah {result.surah.number} · {result.surah.englishName}</p>
                            <p className="mt-3 text-xl font-arabic text-right text-gray-100" style={{ fontSize: 'var(--arabic-font-size, 24px)', fontFamily: 'var(--arabic-font, var(--font-amiri))' }}>
                              {result.ayah.text}
                            </p>
                            <p className="mt-3 text-gray-300" style={{ fontSize: 'var(--translation-font-size, 16px)' }}>
                              {result.translation}
                            </p>
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                ) : selectedSurah ? (
                  <div className="space-y-5">
                    <div className="rounded-[1.75rem] border border-gray-800 bg-gray-900 p-6">
                      <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">Surah Arabic</p>
                      <h3 className="mt-3 text-3xl font-arabic text-right text-white" style={{ fontSize: 'var(--arabic-font-size, 24px)', fontFamily: 'var(--arabic-font, var(--font-amiri))' }}>
                        {selectedSurah.name}
                      </h3>
                    </div>

                    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
                      {selectedSurah.ayahs.map((ayah) => (
                        <article key={ayah.number} className="rounded-3xl border border-gray-800 bg-gray-900 p-5">
                          <div className="flex items-center justify-between gap-4 pb-4 border-b border-gray-800">
                            <p className="rounded-full bg-gray-800 px-3 py-1 text-sm text-gray-300">{ayah.numberInSurah}</p>
                            <p className="text-sm body-secondary">Juz {ayah.juz}</p>
                          </div>
                          <p className="mt-4 text-right text-3xl font-arabic leading-relaxed text-white" style={{ fontSize: 'var(--arabic-font-size, 24px)', fontFamily: 'var(--arabic-font, var(--font-amiri))' }}>
                            {ayah.text}
                          </p>
                          {ayah.translation && (
                            <p className="mt-4 text-gray-300 leading-relaxed" style={{ fontSize: 'var(--translation-font-size, 16px)' }}>
                              {ayah.translation.text}
                            </p>
                          )}
                        </article>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="rounded-3xl border border-gray-800 bg-gray-900 p-6 text-gray-400">
                    Select a surah from the left panel to view its ayahs here.
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
