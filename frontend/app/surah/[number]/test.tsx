import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getSurahByNumber, getAllSurahs } from '../../../lib/quran';
import { SurahWithAyahs } from '../../../types/quran';
import Header from '../../../components/Header';

interface PageProps {
  params: { number: string };
}

export default async function SurahPage({ params }: PageProps) {
  const { number } = params;
  const surahNumber = parseInt(number);
  if (isNaN(surahNumber) || surahNumber < 1 || surahNumber > 114) {
    notFound();
  }

  const surah: SurahWithAyahs | null = await getSurahByNumber(surahNumber);
  if (!surah) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title={surah.englishName} showBack backHref="/" showSearch />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-3xl font-arabic text-center text-gray-800 mb-4">{surah.name}</h2>
          <p className="text-center text-gray-600">{surah.englishNameTranslation}</p>
          <p className="text-center text-sm text-gray-500 mt-2">{surah.numberOfAyahs} verses • {surah.revelationType}</p>
        </div>
        <div className="space-y-6">
          {surah.ayahs.map((ayah) => (
            <div key={ayah.number} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                  {ayah.numberInSurah}
                </span>
              </div>
              <p className="text-2xl font-arabic text-right text-gray-800 leading-relaxed mb-4" style={{ fontSize: 'var(--arabic-font-size, 24px)', fontFamily: 'var(--arabic-font, var(--font-amiri))' }}>
                {ayah.text}
              </p>
              {ayah.translation && (
                <p className="text-gray-700 leading-relaxed" style={{ fontSize: 'var(--translation-font-size, 16px)' }}>
                  {ayah.translation.text}
                </p>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export async function generateStaticParams() {
  const surahs = await getAllSurahs();
  return surahs.map((surah) => ({
    number: surah.number.toString(),
  }));
}