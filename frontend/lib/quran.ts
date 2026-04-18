import { Surah, SurahWithAyahs } from '../types/quran';
import quranData from '../data/quran.json';

export async function getAllSurahs(): Promise<Surah[]> {
  return quranData.map((surah: any) => ({
    number: surah.number,
    name: surah.name,
    englishName: surah.englishName,
    englishNameTranslation: surah.englishNameTranslation,
    numberOfAyahs: surah.numberOfAyahs,
    revelationType: surah.revelationType,
  }));
}

export async function getSurahByNumber(number: number): Promise<SurahWithAyahs | null> {
  const surah = quranData.find((s: any) => s.number === number);
  if (!surah) return null;
  return {
    ...surah,
    ayahs: surah.ayahs,
  };
}

export async function searchAyahs(query: string): Promise<{ surah: Surah; ayah: any; translation: string }[]> {
  const results: { surah: Surah; ayah: any; translation: string }[] = [];

  quranData.forEach((surah: any) => {
    surah.ayahs.forEach((ayah: any) => {
      if (ayah.translation && ayah.translation.text.toLowerCase().includes(query.toLowerCase())) {
        results.push({
          surah: {
            number: surah.number,
            name: surah.name,
            englishName: surah.englishName,
            englishNameTranslation: surah.englishNameTranslation,
            numberOfAyahs: surah.numberOfAyahs,
            revelationType: surah.revelationType,
          },
          ayah,
          translation: ayah.translation.text,
        });
      }
    });
  });

  return results;
}