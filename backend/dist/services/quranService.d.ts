import { Surah, SurahWithAyahs } from '../types/quran.js';
declare class QuranService {
    private quranData;
    constructor();
    private loadQuranData;
    getAllSurahs(): Surah[];
    getSurahByNumber(number: number): SurahWithAyahs | null;
    searchAyahs(query: string): {
        surah: Surah;
        ayah: any;
        translation: string;
    }[];
}
declare const _default: QuranService;
export default _default;
//# sourceMappingURL=quranService.d.ts.map