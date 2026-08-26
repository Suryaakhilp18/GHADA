import { Language, UserProfile, AIResponse } from '../types';
import { detectLanguage } from './languageDetector';

export const processAIQuery = (
  query: string,
  user: UserProfile,
  contextData: {
    currentBalance: number;
    savingStreak: number;
    expensesTotal?: number;
    activeBillsCount?: number;
  }
): AIResponse => {
  const text = query.trim();
  const detection = detectLanguage(text);
  const lang = detection.language;
  const lower = text.toLowerCase();

  // Helper formatting INR
  const fmt = (val: number) => `₹${val.toLocaleString('en-IN')}`;

  // INTENT 0: Greetings & Small Talk
  if (lower === 'hello' || lower === 'hi' || lower === 'hey' || lower.startsWith('hello') || lower.startsWith('hi ') || lower.includes('namaste')) {
    return {
      text: lang === 'te'
        ? `నమస్తే ${user.name}! 👋 నేను ఘటా మీ AI ఫైనాన్షియల్ కోచ్. ఈ రోజు నేను మీకు ఎలా సహాయపడగలను?`
        : `Hello ${user.name}! 👋 I am Ghada, your AI Financial Companion. How can I help you today? Ask me about your savings progress, creating a budget, tracking expenses, or checking scam messages.`,
      detectedLanguage: lang,
      isCodeSwitched: detection.isCodeSwitched,
      navigationTarget: '/coach',
    };
  }

  // INTENT 0.5: Gratitude
  if (lower.includes('thank') || lower.includes('thanks') || lower.includes('great') || lower.includes('awesome')) {
    return {
      text: lang === 'te'
        ? `మీకు స్వాగతం ${user.name}! 😊 మీ డబ్బును సురక్షితంగా ఉంచడానికి నేను ఎప్పుడూ సిద్ధంగా ఉంటాను.`
        : `You're very welcome, ${user.name}! 😊 I'm always here to help you stay financially safe. Let me know if you need anything else!`,
      detectedLanguage: lang,
      isCodeSwitched: detection.isCodeSwitched,
    };
  }

  // INTENT 1: Expense Entry (e.g., "I spent ₹250 on fuel today" or "250 rupees for lunch")
  const expenseMatch = lower.match(/(?:spent|paid|kharcha|kharch)\s*₹?\s*(\d+)|₹\s*(\d+)\s*(?:for|on|kharcha)?\s*([a-z\s]+)/i);
  if (expenseMatch || lower.includes('spent') || lower.includes('kharcha')) {
    const amount = parseInt(expenseMatch?.[1] || expenseMatch?.[2] || '250', 10);
    const category = lower.includes('fuel') || lower.includes('petrol') || lower.includes('cab') ? 'Transport' : lower.includes('food') || lower.includes('lunch') || lower.includes('dinner') ? 'Food' : 'Other';

    const respText = lang === 'te'
      ? `నేను మీరు ${fmt(amount)} ను ${category} కేటగిరీ కింద ఖర్చు చేశారని అర్థం చేసుకున్నాను. దీన్ని ఎక్స్‌పెన్స్ ట్రాకర్‌లో జోడించాలా?`
      : lang === 'hi'
      ? `मैंने समझा कि आपने ${category} के लिए ${fmt(amount)} खर्च किए। क्या इसे खर्च ट्रैकर में जोड़ें?`
      : `I understood that you spent ${fmt(amount)} on ${category}. Would you like to add this to your expense tracker?`;

    return {
      text: respText,
      detectedLanguage: lang,
      isCodeSwitched: detection.isCodeSwitched,
      structuredCard: {
        title: `Add Expense: ${fmt(amount)}`,
        subtitle: `Category: ${category} • Date: Today`,
        actionButton: {
          label: 'Confirm Expense Entry',
          actionType: 'ADD_EXPENSE',
          payload: { amount, category, description: `Spent on ${category}` },
        },
      },
      navigationTarget: '/expenses',
    };
  }

  // INTENT 2: Budgeting (e.g., "I earn ₹12,000. Help me budget")
  if (lower.includes('budget') || lower.includes('bajeet') || lower.includes('manage my money') || lower.includes('జీతం') || lower.includes('बजट')) {
    const income = user.monthlyIncome || 12000;
    const essential = Math.round(income * 0.5);
    const flexible = Math.round(income * 0.2);
    const savings = Math.round(income * 0.15);
    const buffer = income - (essential + flexible + savings);

    const respText = lang === 'te'
      ? `మీ ${fmt(income)} ఆదయం కోసం ఒక ఫ్లెక్సిబుల్ బడ్జెట్ తయారుచేశాను: నిత్యావసరాలు ${fmt(essential)}, అత్యవసర సేవింగ్స్ ${fmt(savings)}, ఫ్లెక్సిబుల్ ${fmt(flexible)}.`
      : lang === 'hi'
      ? `आपकी ${fmt(income)} आय के लिए एक लचीला बजट तैयार किया गया है: आवश्यक ${fmt(essential)}, आपातकालीन बचत ${fmt(savings)}, अन्य ${fmt(flexible)}।`
      : `Here is a custom flexible budget for your ${fmt(income)} income: Essentials (${fmt(essential)}), Emergency Savings (${fmt(savings)}), Flexible (${fmt(flexible)}), Buffer (${fmt(buffer)}).`;

    return {
      text: respText,
      detectedLanguage: lang,
      isCodeSwitched: detection.isCodeSwitched,
      structuredCard: {
        title: `AI Flexible Budget Plan (${fmt(income)})`,
        subtitle: 'Save First • Protect • Live Comfortably',
        metrics: [
          { label: 'Essential Expenses (50%)', value: fmt(essential) },
          { label: 'Emergency Savings (15%)', value: fmt(savings) },
          { label: 'Flexible Expenses (20%)', value: fmt(flexible) },
          { label: 'Buffer Reserve (15%)', value: fmt(buffer) },
        ],
        actionButton: {
          label: 'Apply Budget Plan',
          actionType: 'CREATE_BUDGET',
          payload: { income, essential, flexible, emergencySavings: savings, buffer },
        },
      },
      navigationTarget: '/budget',
    };
  }

  // INTENT 3: Emergency Fund & Safety Cushion (e.g., "How close am I?", "emergency fund entha undali")
  if (lower.includes('emergency') || lower.includes('cushion') || lower.includes('ఎమర్జెన్సీ') || lower.includes('इमरजेंसी')) {
    const remaining = Math.max(0, user.emergencyTarget - contextData.currentBalance);
    const progressPercent = Math.round((contextData.currentBalance / user.emergencyTarget) * 100);

    const respText = lang === 'te'
      ? `మీ వద్ద ప్రస్తుతం ${fmt(contextData.currentBalance)} ఎమర్జెన్సీ ఫండ్ ఉంది (${progressPercent}% పూర్తి). మీ లక్ష్యం ${fmt(user.emergencyTarget)} కి చేరుకోవడానికి ఇంకా ${fmt(remaining)} కావాలి.`
      : lang === 'hi'
      ? `आपके पास वर्तमान में ${fmt(contextData.currentBalance)} इमरजेंसी फंड है (${progressPercent}% पूरा)। ${fmt(user.emergencyTarget)} तक पहुंचने के लिए ${fmt(remaining)} की आवश्यकता है।`
      : `You currently have ${fmt(contextData.currentBalance)} in your Emergency Fund (${progressPercent}% complete). You are ${fmt(remaining)} away from your full ${fmt(user.emergencyTarget)} safety cushion.`;

    return {
      text: respText,
      detectedLanguage: lang,
      isCodeSwitched: detection.isCodeSwitched,
      structuredCard: {
        title: 'Emergency Cushion Status',
        metrics: [
          { label: 'Current Balance', value: fmt(contextData.currentBalance) },
          { label: 'Safety Goal', value: fmt(user.emergencyTarget) },
          { label: 'Streak', value: `${contextData.savingStreak} Days 🔥` },
        ],
        actionButton: {
          label: 'Deposit ₹50 Now',
          actionType: 'ADD_SAVING',
          payload: { amount: 50 },
        },
      },
      navigationTarget: '/emergency-fund',
    };
  }

  // INTENT 4: Fraud & Scam Verification
  if (lower.includes('scam') || lower.includes('otp') || lower.includes('fake') || lower.includes('suspicious') || lower.includes('fraud') || lower.includes('మోసం')) {
    return {
      text: lang === 'te'
        ? `ఎప్పుడూ బ్యాంక్ అకౌంట్ వివరాలు, OTP లంకెలను ఎవరికీ పంచుకోవద్దు! ఏదైనా మెసేజ్ అనుమానాస్పదంగా ఉంటే మా ఫ్రాడ్ సేఫ్టీ టూల్‌లో తనిఖీ చేయండి.`
        : `Never share your OTP, UPI PIN, or bank passwords with anyone claiming to be bank customer care! Check any suspicious message using Ghada Stay Safe.`,
      detectedLanguage: lang,
      isCodeSwitched: detection.isCodeSwitched,
      navigationTarget: '/fraud-safety',
    };
  }

  // INTENT 5: Simple Investing / SIP Education
  if (lower.includes('invest') || lower.includes('sip') || lower.includes('stock') || lower.includes(' gold') || lower.includes('పెట్టుబడి')) {
    const respText = lang === 'te'
      ? `ఘటా సూత్రం: ముందు దాచండి (Save First), తరువాత పెట్టుబడి (Invest Second). మొదట మీ ${fmt(user.emergencyTarget)} ఎమర్జెన్సీ ఫండ్‌ను పూర్తి చేయండి. ఆ తర్వాతే డిజిటల్ గోల్డ్ లేదా సురక్షిత ఫండ్లలో పెట్టుబడి పెట్టండి.`
      : `Ghada Core Principle: SAVE FIRST, INVEST SECOND. First finish your ${fmt(user.emergencyTarget)} emergency cushion. Afterwards, low-risk digital gold or fixed deposits allow your money to grow safely without market anxiety.`;

    return {
      text: respText,
      detectedLanguage: lang,
      isCodeSwitched: detection.isCodeSwitched,
      navigationTarget: '/learn',
    };
  }

  // Default Intelligent Response
  const defaultResp = lang === 'te'
    ? `మీరు మంచి ప్రశ్న అడిగారు! ఘటా నియమం: ముందు దాచండి, తరువాత పెట్టుబడి పెట్టండి, చివరిగా అప్పు చేయండి. ఈ రోజు కేవలం ₹20 లేదా ₹50 దాచడం వల్ల మీ ఆర్థిక భద్రత పెరుగుతుంది.`
    : lang === 'hi'
    ? `अच्छा सवाल! घाटा का नियम: पहले बचत, फिर निवेश, अंतिम विकल्प उधार। आज ₹20 या ₹50 बचाना आपकी वित्तीय सुरक्षा को बढ़ाता है।`
    : `Remember Ghada's golden philosophy: SAVE FIRST → INVEST SECOND → BORROW LAST. Small daily drops of ₹20 or ₹50 build an iron-clad safety net around your family.`;

  return {
    text: defaultResp,
    detectedLanguage: lang,
    isCodeSwitched: detection.isCodeSwitched,
    structuredCard: {
      title: 'Suggested Action',
      subtitle: 'Consistency matters more than starting amount.',
      actionButton: {
        label: 'Save ₹50 Today',
        actionType: 'ADD_SAVING',
        payload: { amount: 50 },
      },
    },
  };
};
