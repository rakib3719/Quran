'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { searchAyahs } from '../../lib/quran';
import { Surah } from '../../types/quran';
import Header from '../../components/Header';

interface SearchResult {
  surah: Surah;
  ayah: any;
  translation: string;
}

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.trim().length > 2) {
      setLoading(true);
      searchAyahs(query).then(setResults).finally(() => setLoading(false));
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Search Quran" showBack />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search in translations..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        {loading && <p className="text-center text-gray-500">Searching...</p>}
        <div className="space-y-6">
          {results.map((result, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <Link href={`/surah/${result.surah.number}`} className="text-blue-600 hover:text-blue-800 font-medium">
                    {result.surah.englishName} ({result.surah.number}:{result.ayah.numberInSurah})
                  </Link>
                </div>
              </div>
              <p className="text-xl font-arabic text-right text-gray-800 leading-relaxed mb-4" style={{ fontSize: 'var(--arabic-font-size, 24px)', fontFamily: 'var(--arabic-font, var(--font-amiri))' }}>
                {result.ayah.text}
              </p>
              <p className="text-gray-700 leading-relaxed" style={{ fontSize: 'var(--translation-font-size, 16px)' }}>
                {result.translation}
              </p>
            </div>
          ))}
        </div>
        {query.trim().length > 2 && results.length === 0 && !loading && (
          <p className="text-center text-gray-500">No results found.</p>
        )}
      </main>
    </div>
  );
}