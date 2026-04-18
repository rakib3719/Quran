import quranService from '../services/quranService.js';
export const getAllSurahs = (req, res) => {
    try {
        const surahs = quranService.getAllSurahs();
        res.json(surahs);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch surahs' });
    }
};
export const getSurahByNumber = (req, res) => {
    try {
        const number = parseInt(req.params.number);
        if (isNaN(number) || number < 1 || number > 114) {
            return res.status(400).json({ error: 'Invalid surah number' });
        }
        const surah = quranService.getSurahByNumber(number);
        if (!surah) {
            return res.status(404).json({ error: 'Surah not found' });
        }
        res.json(surah);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch surah' });
    }
};
export const searchAyahs = (req, res) => {
    try {
        const query = req.query.q;
        if (!query) {
            return res.status(400).json({ error: 'Query parameter required' });
        }
        const results = quranService.searchAyahs(query);
        res.json(results);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to search ayahs' });
    }
};
//# sourceMappingURL=quranController.js.map