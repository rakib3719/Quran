import quranData from '../data/quran.json';

export async function getAllSurahs() {
  return quranData.map((surah: any) => ({
    number: surah.number,
    name: surah.name,
    englishName: surah.englishName,
    englishNameTranslation: surah.englishNameTranslation,
    numberOfAyahs: surah.numberOfAyahs,
    revelationType: surah.revelationType,
  }));
}

export async function getSurahByNumber(number: number) {
  const surah = quranData.find((item: any) => item.number === number);
  return surah ?? null;
}

export async function searchAyahs(query: string) {
  const normalizedQuery = query.trim().toLowerCase();
  const results: Array<{ surah: any; ayah: any; translation: string }> = [];

  quranData.forEach((surah: any) => {
    surah.ayahs.forEach((ayah: any) => {
      if (ayah.translation && ayah.translation.text.toLowerCase().includes(normalizedQuery)) {
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

const quranService = {
  getAllSurahs,
  getSurahByNumber,
  searchAyahs,
};

export default quranService;