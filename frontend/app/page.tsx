import Link from 'next/link';
import { getAllSurahs } from '../lib/quran';
import { Surah } from '../types/quran';
import Header from '../components/Header';

export default async function Home() {
  const surahs: Surah[] = await getAllSurahs();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header title="Quran" showSearch />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {surahs.map((surah) => (
            <Link
              key={surah.number}
              href={`/surah/${surah.number}`}
              className="block bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-700"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold text-white">{surah.englishName}</h2>
                  <p className="text-gray-300">{surah.englishNameTranslation}</p>
                  <p className="text-sm text-gray-400 mt-2">{surah.numberOfAyahs} verses • {surah.revelationType}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-arabic text-gray-200">{surah.name}</p>
                  <p className="text-sm text-gray-400 mt-1">{surah.number}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
