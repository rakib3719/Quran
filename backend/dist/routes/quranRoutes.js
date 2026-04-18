import { Router } from 'express';
import { getAllSurahs, getSurahByNumber, searchAyahs } from '../controllers/quranController.js';
const router = Router();
// GET /api/surahs - Get all surahs
router.get('/surahs', getAllSurahs);
// GET /api/surahs/:number - Get surah by number with ayahs
router.get('/surahs/:number', getSurahByNumber);
// GET /api/search?q=query - Search ayahs by translation
router.get('/search', searchAyahs);
export default router;
//# sourceMappingURL=quranRoutes.js.map