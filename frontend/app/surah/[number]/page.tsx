import React from 'react';
import { notFound } from 'next/navigation';
import { getSurahByNumber } from '../../../lib/quran';
import Header from '../../../components/Header';

interface PageProps {
  params: Promise<{ number: string }>;
}

export default async function SurahPage({ params }: PageProps) {
  // IMPORTANT: params is a Promise in Next.js 15+
  const { number } = await params;
  const surahNumber = Number(number);

  if (!number || isNaN(surahNumber)) {
    return notFound();
  }

  const surah = await getSurahByNumber(surahNumber);

  if (!surah || !surah.ayahs) {
    console.log("SURAH NOT FOUND OR API ISSUE", surahNumber);
    return notFound();
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header
        title={surah.englishName}
        showBack
        backHref="/"
        showSearch
      />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-8 border border-gray-700">
          <h2 className="text-3xl text-center font-arabic text-gray-200 mb-4">
            {surah.name}
          </h2>
          <p className="text-center text-gray-300 mb-2">{surah.englishNameTranslation}</p>
          <p className="text-center text-sm text-gray-400">{surah.numberOfAyahs} verses • {surah.revelationType}</p>
        </div>

        {surah.ayahs?.map((ayah: any) => (
          <div key={ayah.number} className="bg-gray-800 p-6 mb-4 rounded-lg border border-gray-700">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full text-sm font-medium">
                {ayah.numberInSurah}
              </span>
            </div>
            <p className="text-right text-2xl font-arabic text-gray-200 mb-4" style={{ fontSize: 'var(--arabic-font-size, 24px)', fontFamily: 'var(--arabic-font, var(--font-amiri))' }}>
              {ayah.text}
            </p>
            {ayah.translation && (
              <p className="text-gray-300 leading-relaxed" style={{ fontSize: 'var(--translation-font-size, 16px)' }}>
                {ayah.translation.text}
              </p>
            )}
          </div>
        ))}
      </main>
    </div>
  );
}