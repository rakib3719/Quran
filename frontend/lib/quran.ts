const getApiBaseUrl = () => {
  // 1. Priority: Environment variable
  if (process.env.NEXT_PUBLIC_API_BASE_URL) {
    return process.env.NEXT_PUBLIC_API_BASE_URL;
  }

  // 2. Production: Fixed backend URL
  if (process.env.NODE_ENV === 'production') {
    return 'http://localhost:5000';
  }

  // 3. Development: Local backend
  return 'http://localhost:5000';
};

const API_BASE_URL = getApiBaseUrl();

export async function getAllSurahs() {
  const response = await fetch(`${API_BASE_URL}/api/surahs`, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch surah list from API');
  }

  return response.json();
}

export async function getSurahByNumber(number: number) {
  const response = await fetch(`${API_BASE_URL}/api/surahs/${number}`, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
}

export async function searchAyahs(query: string) {
  const response = await fetch(`${API_BASE_URL}/api/search?q=${encodeURIComponent(query)}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    return [];
  }

  return response.json();
}