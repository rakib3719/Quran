const getAllSurahs = async()=>{
    const response = await fetch('https://api.quran.com/api/v4/chapters');
    const data = await response.json();
    return data.chapters;
}
const getSurahByNumber = async (number: number) => {
    const response = await fetch(`https://api.quran.com/api/v4/chapters/${number}?language=en`);
    const data = await response.json();
    return data.chapter;
}
const searchAyahs = async (query: string) => {
    const response = await fetch(`https://api.quran.com/api/v4/search?q=${encodeURIComponent(query)}&language=en`);
    const data = await response.json();
    return data.data.matches;
}

export const quranService = {
    getAllSurahs
}