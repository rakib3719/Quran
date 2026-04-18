import { getAllSurahs } from '../lib/quran';
import type { Surah } from '../types/quran';
import SurahExplorer from '../components/SurahExplorer';

export default async function Home() {
  const surahs: Surah[] = await getAllSurahs();

  return <SurahExplorer surahs={surahs} />;
}
