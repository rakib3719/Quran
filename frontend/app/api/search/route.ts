import { NextResponse } from 'next/server';
import quranData from '../../../data/quran.json';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.trim().toLowerCase();

  if (!query) {
    return NextResponse.json({ error: 'Query parameter required' }, { status: 400 });
  }

  const results: Array<{ surah: any; ayah: any; translation: string }> = [];

  quranData.forEach((surah: any) => {
    surah.ayahs.forEach((ayah: any) => {
      if (ayah.translation?.text?.toLowerCase().includes(query)) {
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

  return NextResponse.json(results);
}
