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
    <div className="min-h-screen bg-gray-50">
      <Header
        title={surah.englishName}
        showBack
        backHref="/"
        showSearch
      />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-3xl text-center font-arabic">
            {surah.name}
          </h2>
        </div>

        {surah.ayahs?.map((ayah) => (
          <div key={ayah.number} className="bg-white p-6 mb-4 rounded-lg">
            <p className="text-right text-2xl font-arabic">
              {ayah.text}
            </p>
          </div>
        ))}
      </main>
    </div>
  );
}