import { NextResponse } from 'next/server';
import quranData from '../../../../data/quran.json';

export async function GET(_request: Request, { params }: { params: Promise<{ number: string }> }) {
  const { number } = await params;
  
  const surahNumber = Number(number);
  if (Number.isNaN(surahNumber) || surahNumber < 1 || surahNumber > 114) {
    return NextResponse.json({ error: 'Invalid surah number' }, { status: 400 });
  }

  const surah = quranData.find((item: any) => item.number === surahNumber);
  if (!surah) {
    return NextResponse.json({ error: 'Surah not found' }, { status: 404 });
  }

  return NextResponse.json(surah);
}