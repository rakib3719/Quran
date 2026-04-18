import { NextResponse } from 'next/server';
import quranData from '../../../../data/quran.json';

export async function GET(_request: Request, { params }: { params: { number: string } }) {
  const number = Number(params.number);
  if (Number.isNaN(number) || number < 1 || number > 114) {
    return NextResponse.json({ error: 'Invalid surah number' }, { status: 400 });
  }

  const surah = quranData.find((item: any) => item.number === number);
  if (!surah) {
    return NextResponse.json({ error: 'Surah not found' }, { status: 404 });
  }

  return NextResponse.json(surah);
}
