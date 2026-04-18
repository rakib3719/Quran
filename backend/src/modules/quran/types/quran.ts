export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
}

export interface SurahWithAyahs extends Surah {
  ayahs: Ayah[];
}

export interface Translation {
  text: string;
  language: string;
}

export interface AyahWithTranslation extends Ayah {
  translation?: Translation;
}

export interface SurahWithAyahsAndTranslation extends Surah {
  ayahs: AyahWithTranslation[];
}

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}