import { NextResponse } from 'next/server';
import quranData from '../../../data/quran.json';

export async function GET() {
  const surahs = quranData.map((surah: any) => ({
    number: surah.number,
    name: surah.name,
    englishName: surah.englishName,
    englishNameTranslation: surah.englishNameTranslation,
    numberOfAyahs: surah.numberOfAyahs,
    revelationType: surah.revelationType,
  }));

  return NextResponse.json(surahs);
}
