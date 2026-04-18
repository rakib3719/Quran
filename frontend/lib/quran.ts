const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

export async function getAllSurahs() {
  const response = await fetch(`${API_BASE_URL}/surahs`, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch surah list from backend');
  }

  return response.json();
}

export async function getSurahByNumber(number: number) {
  const response = await fetch(`${API_BASE_URL}/surahs/${number}`, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
}

export async function searchAyahs(query: string) {
  const response = await fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    return [];
  }

  return response.json();
}