import { Surah, SurahWithAyahs, SurahWithAyahsAndTranslation } from '../types/quran.ts';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class QuranService {
  private quranData: any = null;

  constructor() {
    this.loadQuranData();
  }

  private loadQuranData() {
    try {
      const dataPath = path.resolve(process.cwd(), 'src', 'data', 'quran.json');
      const data = fs.readFileSync(dataPath, 'utf-8');
      this.quranData = JSON.parse(data);
    } catch (error) {
      console.error('Error loading Quran data:', error);
      throw new Error('Quran data not found. Please ensure quran.json is in src/data/');
    }
  }

  getAllSurahs(): Surah[] {
    if (!this.quranData) return [];
    return this.quranData.map((surah: any) => ({
      number: surah.number,
      name: surah.name,
      englishName: surah.englishName,
      englishNameTranslation: surah.englishNameTranslation,
      numberOfAyahs: surah.numberOfAyahs,
      revelationType: surah.revelationType,
    }));
  }

  getSurahByNumber(number: number): SurahWithAyahs | null {
    if (!this.quranData) return null;
    const surah = this.quranData.find((s: any) => s.number === number);
    if (!surah) return null;
    return {
      ...surah,
      ayahs: surah.ayahs,
    };
  }

  searchAyahs(query: string): { surah: Surah; ayah: any; translation: string }[] {
    if (!this.quranData) return [];
    const results: { surah: Surah; ayah: any; translation: string }[] = [];

    this.quranData.forEach((surah: any) => {
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
}

export default new QuranService();