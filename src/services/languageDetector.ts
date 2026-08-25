import { Language } from '../types';

export interface DetectionResult {
  language: Language;
  isCodeSwitched: boolean;
  scriptType: 'native' | 'romanized' | 'mixed';
  confidence: number;
}

export const detectLanguage = (input: string): DetectionResult => {
  const text = input.trim();
  if (!text) {
    return { language: 'en', isCodeSwitched: false, scriptType: 'romanized', confidence: 1.0 };
  }

  // Check Unicode script ranges
  const teluguRegex = /[\u0C00-\u0C7F]/;
  const devanagariRegex = /[\u0900-\u097F]/; // Hindi / Marathi
  const kannadaRegex = /[\u0C80-\u0CFF]/;
  const tamilRegex = /[\u0B80-\u0BFF]/;

  const hasTelugu = teluguRegex.test(text);
  const hasDevanagari = devanagariRegex.test(text);
  const hasKannada = kannadaRegex.test(text);
  const hasTamil = tamilRegex.test(text);
  const hasEnglishWords = /[a-zA-Z]/.test(text);

  // Native Script Detections
  if (hasTelugu) {
    return {
      language: 'te',
      isCodeSwitched: hasEnglishWords,
      scriptType: hasEnglishWords ? 'mixed' : 'native',
      confidence: 0.95,
    };
  }

  if (hasKannada) {
    return {
      language: 'kn',
      isCodeSwitched: hasEnglishWords,
      scriptType: hasEnglishWords ? 'mixed' : 'native',
      confidence: 0.95,
    };
  }

  if (hasTamil) {
    return {
      language: 'ta',
      isCodeSwitched: hasEnglishWords,
      scriptType: hasEnglishWords ? 'mixed' : 'native',
      confidence: 0.95,
    };
  }

  if (hasDevanagari) {
    // Distinguish Hindi vs Marathi keywords if possible
    const isMarathi = /\b(मला|आहे|माझे|पैसे|फंड)\b/i.test(text);
    return {
      language: isMarathi ? 'mr' : 'hi',
      isCodeSwitched: hasEnglishWords,
      scriptType: hasEnglishWords ? 'mixed' : 'native',
      confidence: 0.9,
    };
  }

  // Romanized Code-Switching Detections (Hinglish / Teluglish / Tanglish)
  const lower = text.toLowerCase();

  const teluguRomanKeywords = ['naaku', 'entha', 'undali', 'vastundi', 'చేయాలి', 'వస్తుంది', 'dachaali', 'save cheyali', 'emergancy', 'paisa'];
  const hindiRomanKeywords = ['mujhe', 'kitna', 'karna', 'hai', 'bachat', 'kare', 'chahiye', 'save karna', 'paise'];
  const tamilRomanKeywords = ['enakku', 'venum', 'epdi', 'pannanum', 'serkka'];
  const kannadaRomanKeywords = ['nanage', 'beku', 'yavaga', 'hege', 'maadabeku'];
  const marathiRomanKeywords = ['mala', 'pahije', 'kasa', 'karu'];

  const matchCount = (keywords: string[]) => keywords.filter(kw => lower.includes(kw)).length;

  const teScore = matchCount(teluguRomanKeywords);
  const hiScore = matchCount(hindiRomanKeywords);
  const taScore = matchCount(tamilRomanKeywords);
  const knScore = matchCount(kannadaRomanKeywords);
  const mrScore = matchCount(marathiRomanKeywords);

  if (teScore > 0 && teScore >= hiScore) {
    return { language: 'te', isCodeSwitched: true, scriptType: 'romanized', confidence: 0.85 };
  }
  if (hiScore > 0) {
    return { language: 'hi', isCodeSwitched: true, scriptType: 'romanized', confidence: 0.85 };
  }
  if (taScore > 0) {
    return { language: 'ta', isCodeSwitched: true, scriptType: 'romanized', confidence: 0.85 };
  }
  if (knScore > 0) {
    return { language: 'kn', isCodeSwitched: true, scriptType: 'romanized', confidence: 0.85 };
  }
  if (mrScore > 0) {
    return { language: 'mr', isCodeSwitched: true, scriptType: 'romanized', confidence: 0.85 };
  }

  // Default to English
  return { language: 'en', isCodeSwitched: false, scriptType: 'romanized', confidence: 0.9 };
};
