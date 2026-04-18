import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
class QuranService {
    quranData = null;
    constructor() {
        this.loadQuranData();
    }
    loadQuranData() {
        try {
            const dataPath = path.resolve(process.cwd(), 'src', 'data', 'quran.json');
            const data = fs.readFileSync(dataPath, 'utf-8');
            this.quranData = JSON.parse(data);
        }
        catch (error) {
            console.error('Error loading Quran data:', error);
            throw new Error('Quran data not found. Please ensure quran.json is in src/data/');
        }
    }
    getAllSurahs() {
        if (!this.quranData)
            return [];
        return this.quranData.map((surah) => ({
            number: surah.number,
            name: surah.name,
            englishName: surah.englishName,
            englishNameTranslation: surah.englishNameTranslation,
            numberOfAyahs: surah.numberOfAyahs,
            revelationType: surah.revelationType,
        }));
    }
    getSurahByNumber(number) {
        if (!this.quranData)
            return null;
        const surah = this.quranData.find((s) => s.number === number);
        if (!surah)
            return null;
        return {
            ...surah,
            ayahs: surah.ayahs,
        };
    }
    searchAyahs(query) {
        if (!this.quranData)
            return [];
        const results = [];
        this.quranData.forEach((surah) => {
            surah.ayahs.forEach((ayah) => {
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
//# sourceMappingURL=quranService.js.map