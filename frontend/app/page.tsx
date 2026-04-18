import Link from 'next/link';
import { getAllSurahs } from '../lib/quran';
import { Surah } from '../types/quran';
import Header from '../components/Header';

export default async function Home() {
  const surahs: Surah[] = await getAllSurahs();

  return (
    <div className="min-h-screen bg-[#050608] text-white">
      <Header title="Quran" showSearch />

      <main className="max-w-7xl mx-auto grid gap-6 px-4 py-8 lg:grid-cols-[320px_1fr]">
        <aside className="space-y-6">
          <section className="rounded-[2rem] border border-gray-800 bg-gray-900 p-6 card-surface">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-emerald-400">The Noble Quran</p>
                <h1 className="mt-4 text-3xl font-semibold">114 Surahs</h1>
                <p className="mt-3 text-sm body-secondary leading-6">
                  Read every surah in Arabic with translation. Choose a surah and use settings to adjust fonts.
                </p>
              </div>
              <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-sm text-emerald-300 border border-emerald-500/20">
                Dark UI
              </span>
            </div>
          </section>

          <section className="rounded-[2rem] border border-gray-800 bg-gray-900 p-4 card-soft">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h2 className="text-lg font-semibold text-white">Surah list</h2>
              <span className="text-sm body-secondary">114</span>
            </div>
            <div className="mt-4 space-y-3 max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
              {surahs.map((surah) => (
                <Link
                  key={surah.number}
                  href={`/surah/${surah.number}`}
                  className="group flex items-center gap-4 rounded-3xl border border-gray-800 bg-gray-950 px-4 py-3 transition hover:-translate-y-0.5 hover:border-emerald-400"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 text-sm font-semibold text-white">
                    {surah.number}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{surah.englishName}</p>
                    <p className="text-xs body-secondary truncate">{surah.englishNameTranslation}</p>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="text-base font-arabic text-gray-200 truncate">{surah.name}</p>
                    <p className="text-xs body-secondary">{surah.numberOfAyahs} ayahs</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </aside>

        <section className="space-y-6">
          <div className="rounded-[2rem] border border-gray-800 bg-gray-900 p-8 card-surface">
            <p className="text-sm uppercase tracking-[0.25em] text-emerald-400">Explore</p>
            <h2 className="mt-4 text-3xl font-semibold text-white">Read Quran in a premium dark layout</h2>
            <p className="mt-4 body-secondary leading-7">
              Use the surah list to open any chapter, search ayahs by translation text, and customize Arabic/translation font sizes in settings.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-[2rem] border border-gray-800 bg-gray-900 p-6 card-soft">
              <h3 className="text-lg font-semibold text-white">Font controls</h3>
              <p className="mt-3 body-secondary leading-6">
                Open the settings panel and choose between Amiri or Scheherazade Arabic fonts, then adjust Arabic and translation font sizes.
              </p>
            </div>
            <div className="rounded-[2rem] border border-gray-800 bg-gray-900 p-6 card-soft">
              <h3 className="text-lg font-semibold text-white">Search functionality</h3>
              <p className="mt-3 body-secondary leading-6">
                Search by translation text, then open the selected surah and follow along with Arabic and English verses.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
