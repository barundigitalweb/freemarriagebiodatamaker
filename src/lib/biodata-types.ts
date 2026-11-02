export interface BiodataData {
  // Title / Heading
  headerText: string; // e.g. "|| Shree Ganeshay Namah ||" or "Bismillah-ir-Rahman-ir-Rahim" or "Biodata"
  title: string; // "MARRIAGE BIODATA" or "বিবাহের বায়োডাটা"

  // Personal Info
  fullName: string;
  gender: 'male' | 'female';
  dob: string;
  birthTime: string;
  birthPlace: string;
  height: string;
  complexion: string;
  bloodGroup: string;
  motherTongue: string;
  maritalStatus: string;
  diet: string;

  // Astrological / Religious (Optional)
  religion: string;
  caste: string;
  subCaste: string;
  gotra: string;
  rashi: string;
  nakshatra: string;
  manglik: string;
  sect?: string; // e.g. Sunni / Hanafi / Shia
  namaz?: string; // e.g. 5 Times Daily / Regular
  roza?: string; // e.g. Keeps Ramadan Fasts
  quran?: string; // e.g. Fluent Reciter / Hafiz-e-Quran

  // Education & Career
  education: string;
  collegeUniversity: string;
  occupation: string;
  jobTitle: string;
  companyName: string;
  income: string;
  workLocation: string;

  // Family Info
  fatherName: string;
  fatherOccupation: string;
  motherName: string;
  motherOccupation: string;
  totalBrothers: string;
  marriedBrothers: string;
  totalSisters: string;
  marriedSisters: string;
  familyType: string; // Nuclear / Joint
  familyValues: string; // Moderate / Traditional / Liberal
  nativePlace: string;

  // Contact Info
  contactPerson: string;
  primaryPhone: string;
  secondaryPhone: string;
  email: string;
  address: string;

  // Photo
  photoUrl: string | null;
}

export type TemplateId =
  | 'royal-maroon'
  | 'regal-blue'
  | 'emerald-divine'
  | 'rose-gold'
  | 'classic-elegance'
  | 'saffron-gold'
  | 'peacock-teal';

export interface BiodataTemplate {
  id: TemplateId;
  name: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  borderColor: string;
  bgGradient: string;
  badge: string;
}

export const BIODATA_TEMPLATES: BiodataTemplate[] = [
  {
    id: 'royal-maroon',
    name: 'Royal Maroon & Gold',
    description: 'Traditional Indian Wedding Theme with Auspicious Maroon & Golden Accents',
    primaryColor: '#881337',
    secondaryColor: '#d97706',
    borderColor: '#b45309',
    bgGradient: 'from-amber-50/40 via-white to-rose-50/30',
    badge: 'Most Popular 👑'
  },
  {
    id: 'regal-blue',
    name: 'Regal Navy & Gold',
    description: 'Sophisticated & Prestigious Royal Blue with Elegant Gold Borders',
    primaryColor: '#1e3a8a',
    secondaryColor: '#b45309',
    borderColor: '#d97706',
    bgGradient: 'from-blue-50/30 via-white to-slate-50',
    badge: 'Regal & Premium 💎'
  },
  {
    id: 'emerald-divine',
    name: 'Emerald & Mint Divine',
    description: 'Fresh & Auspicious Forest Green with Royal Ornamental Accents',
    primaryColor: '#064e3b',
    secondaryColor: '#059669',
    borderColor: '#047857',
    bgGradient: 'from-emerald-50/30 via-white to-teal-50/20',
    badge: 'Auspicious Classic ✨'
  },
  {
    id: 'rose-gold',
    name: 'Rose Gold & Floral Pastel',
    description: 'Chic, Modern & Delicate Pastel Floral Palette (Popular with Brides)',
    primaryColor: '#be123c',
    secondaryColor: '#f43f5e',
    borderColor: '#fb7185',
    bgGradient: 'from-rose-50/50 via-white to-pink-50/30',
    badge: 'Romantic & Soft 🌸'
  },
  {
    id: 'saffron-gold',
    name: 'Vedic Saffron & Kesar Gold',
    description: 'Auspicious Turmeric, Saffron & Temple Gold Theme for Traditional Vedic Ceremonies',
    primaryColor: '#c2410c',
    secondaryColor: '#d97706',
    borderColor: '#ea580c',
    bgGradient: 'from-amber-50/50 via-white to-orange-50/30',
    badge: 'Auspicious Vedic 🪔'
  },
  {
    id: 'peacock-teal',
    name: 'Royal Peacock Teal & Gold',
    description: 'Majestic Peacock Teal with Antique Golden Accents & Imperial Heritage Borders',
    primaryColor: '#0f766e',
    secondaryColor: '#b45309',
    borderColor: '#0d9488',
    bgGradient: 'from-teal-50/40 via-white to-emerald-50/20',
    badge: 'Royal Heritage 🦚'
  },
  {
    id: 'classic-elegance',
    name: 'Classic Monochrome Crisp',
    description: 'Ultra Clean, Formal & High-Contrast Layout for Perfect Physical Printing',
    primaryColor: '#0f172a',
    secondaryColor: '#475569',
    borderColor: '#334155',
    bgGradient: 'from-white via-slate-50/40 to-white',
    badge: 'Print-Friendly 📄'
  }
];

export const INITIAL_BIODATA_DATA: BiodataData = {
  headerText: '|| श्री गणेशाय नमः ||',
  title: 'MARRIAGE BIODATA',
  fullName: 'Rahul Sharma',
  gender: 'male',
  dob: '15/08/1996',
  birthTime: '06:45 AM',
  birthPlace: 'New Delhi',
  height: '5 ft 10 in (178 cm)',
  complexion: 'Fair',
  bloodGroup: 'B+',
  motherTongue: 'Hindi / English',
  maritalStatus: 'Never Married',
  diet: 'Vegetarian',

  religion: 'Hindu',
  caste: 'Brahmin',
  subCaste: 'Saraswat',
  gotra: 'Kashyap',
  rashi: 'Leo (सिंह)',
  nakshatra: 'Magha',
  manglik: 'Non-Manglik',

  education: 'B.Tech in Computer Science',
  collegeUniversity: 'Delhi University',
  occupation: 'Working Professional',
  jobTitle: 'Senior Software Engineer',
  companyName: 'MNC Tech Firm',
  income: '₹ 18,00,000 / Annum',
  workLocation: 'Bangalore / Gurgaon',

  fatherName: 'Mr. Ramesh Sharma',
  fatherOccupation: 'Retired Government Officer',
  motherName: 'Mrs. Sunita Sharma',
  motherOccupation: 'Homemaker',
  totalBrothers: '1 (Elder, Married)',
  marriedBrothers: '1',
  totalSisters: '1 (Younger, Unmarried)',
  marriedSisters: '0',
  familyType: 'Nuclear Family',
  familyValues: 'Moderate / Cultured',
  nativePlace: 'Lucknow, Uttar Pradesh',

  contactPerson: 'Mr. Ramesh Sharma (Father)',
  primaryPhone: '+91 98765 43210',
  secondaryPhone: '+91 91234 56789',
  email: 'family.contact@example.com',
  address: 'Sector 14, Rohini, New Delhi - 110085',

  photoUrl: null
};

export const INITIAL_MUSLIM_BIODATA_DATA: BiodataData = {
  headerText: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
  title: 'ISLAMIC NIKAH BIODATA',
  fullName: 'Mohammed Farhan Ali',
  gender: 'male',
  dob: '12/10/1996',
  birthTime: '08:30 AM',
  birthPlace: 'Hyderabad, Telangana',
  height: '5 ft 11 in (180 cm)',
  complexion: 'Fair',
  bloodGroup: 'O+',
  motherTongue: 'Urdu / English',
  maritalStatus: 'Never Married',
  diet: 'Halal (Non-Vegetarian)',

  religion: 'Islam',
  sect: 'Sunni (Hanafi)',
  caste: 'Syed / Sheikh',
  subCaste: '',
  gotra: '',
  rashi: '',
  nakshatra: '',
  manglik: '',
  namaz: '5 Times Daily (Regular)',
  roza: 'Keeps Ramadan Fasts',
  quran: 'Fluent Reciter (Tajweed)',

  education: 'B.Tech & M.Tech in Computer Science',
  collegeUniversity: 'Osmania University',
  occupation: 'Working Professional',
  jobTitle: 'Senior Software Engineer',
  companyName: 'MNC Software Corp',
  income: '₹ 20,00,000 / Annum',
  workLocation: 'Hyderabad / Dubai',

  fatherName: 'Mr. Mohammed Rafiq Ali',
  fatherOccupation: 'Businessman',
  motherName: 'Mrs. Parveen Begum',
  motherOccupation: 'Homemaker',
  totalBrothers: '1 (Elder, Married)',
  marriedBrothers: '1',
  totalSisters: '1 (Younger, Unmarried)',
  marriedSisters: '0',
  familyType: 'Nuclear Family',
  familyValues: 'Deen-Practicing / Moderate',
  nativePlace: 'Hyderabad, Telangana',

  contactPerson: 'Mr. Mohammed Rafiq Ali (Father)',
  primaryPhone: '+91 98765 12345',
  secondaryPhone: '+91 91234 56780',
  email: 'family.nikah@example.com',
  address: 'Banjara Hills, Road No 12, Hyderabad - 500034',

  photoUrl: null
};


export const INITIAL_BENGALI_BIODATA_DATA: BiodataData = {
  headerText: '|| শ্রী শ্রী প্রজাপতয়ে নমঃ ||',
  title: 'বিবাহের বায়োডাটা',
  fullName: 'রাহুল মুখার্জী',
  gender: 'male',
  dob: '১৫/০৮/১৯৯৬',
  birthTime: '০৬:৪৫ AM',
  birthPlace: 'কলকাতা, পশ্চিমবঙ্গ',
  height: '৫ ফুট ১০ ইঞ্চি (১৭৮ সেমি)',
  complexion: 'উজ্জ্বল ফর্সা (Fair)',
  bloodGroup: 'B+',
  motherTongue: 'বাংলা (Bengali)',
  maritalStatus: 'অবিবাহিত (Never Married)',
  diet: 'আমিষ (Non-Vegetarian)',

  religion: 'হিন্দু',
  caste: 'ব্রাহ্মণ (কুলীন)',
  subCaste: 'রাঢ়ী',
  gotra: 'শাণ্ডিল্য',
  rashi: 'সিংহ (Leo)',
  nakshatra: 'মঘা (Magha)',
  manglik: 'অমাঙ্গলিক (Non-Manglik)',

  education: 'B.Tech in Computer Science',
  collegeUniversity: 'যাদবপুর বিশ্ববিদ্যালয়',
  occupation: 'চাকরিজীবী (Private Service)',
  jobTitle: 'সিনিয়র সফটওয়্যার ইঞ্জিনিয়ার',
  companyName: 'MNC Tech Firm',
  income: '₹ ১৮,০০,০০০ / বার্ষিক',
  workLocation: 'কলকাতা / বেঙ্গালুরু',

  fatherName: 'শ্রী অমল মুখার্জী',
  fatherOccupation: 'অবসরপ্রাপ্ত সরকারি আধিকারিক',
  motherName: 'শ্রীমতী অঞ্জলি মুখার্জী',
  motherOccupation: 'গৃহিণী (Homemaker)',
  totalBrothers: '১ (বড়, বিবাহিত)',
  marriedBrothers: '১',
  totalSisters: '১ (ছোট, অবিবাহিতা)',
  marriedSisters: '০',
  familyType: 'একান্নবর্তী পরিবার (Nuclear Family)',
  familyValues: 'সংস্কৃতিবান ও মধ্যপন্থী',
  nativePlace: 'বর্ধমান, পশ্চিমবঙ্গ',

  contactPerson: 'শ্রী অমল মুখার্জী (পিতা)',
  primaryPhone: '+91 98765 43210',
  secondaryPhone: '+91 91234 56789',
  email: 'family.contact@example.com',
  address: 'সল্টলেক, সেক্টর ২, কলকাতা - ৭০০০৯১',

  photoUrl: null
};

export const INITIAL_MARATHI_BIODATA_DATA: BiodataData = {
  headerText: '|| श्री गणेशाय नमः ||',
  title: 'विवाह बायोडाटा',
  fullName: 'राहुल रमेश कदम',
  gender: 'male',
  dob: '१५/०८/१९९६',
  birthTime: 'सकाळी ०६:४५',
  birthPlace: 'पुणे, महाराष्ट्र',
  height: '५ फूट १० इंच (१७८ सेमी)',
  complexion: 'गोरा (Fair)',
  bloodGroup: 'B+',
  motherTongue: 'मराठी (Marathi)',
  maritalStatus: 'अविवाहित (Never Married)',
  diet: 'शाकाहारी (Vegetarian)',

  religion: 'हिंदू',
  caste: 'मराठा',
  subCaste: '९६ कुळी',
  gotra: 'कश्यप',
  rashi: 'सिंह (Leo)',
  nakshatra: 'मघा (Magha)',
  manglik: 'निर्दोष / मंगळ नाही',

  education: 'बी.ई (संगणक अभियांत्रिकी)',
  collegeUniversity: 'पुणे विद्यापीठ (SPPU)',
  occupation: 'खाजगी नोकरी (Software Engineer)',
  jobTitle: 'सिनियर सॉफ्टवेअर इंजिनिअर',
  companyName: 'MNC Tech Company',
  income: '₹ १८,००,००० / वार्षिक',
  workLocation: 'हिंजवडी, पुणे / मुंबई',

  fatherName: 'श्री. रमेश कदम',
  fatherOccupation: 'सेवानिवृत्त शासकीय अधिकारी',
  motherName: 'सौ. सुनिता कदम',
  motherOccupation: 'गृहिणी (Homemaker)',
  totalBrothers: '१ (मोठा, विवाहित)',
  marriedBrothers: '१',
  totalSisters: '१ (लहान, अविवाहित)',
  marriedSisters: '०',
  familyType: 'एकत्र कुटुंब (Nuclear Family)',
  familyValues: 'सुसंस्कृत व पुरोगामी',
  nativePlace: 'सातारा, महाराष्ट्र',

  contactPerson: 'श्री. रमेश कदम (वडील)',
  primaryPhone: '+91 98765 43210',
  secondaryPhone: '+91 91234 56789',
  email: 'family.contact@example.com',
  address: 'कोथरुड, पुणे, महाराष्ट्र - ४११०३८',

  photoUrl: null
};

export const INITIAL_HINDU_BIODATA_DATA: BiodataData = {
  headerText: '|| श्री गणेशाय नमः ||',
  title: 'विवाह बायोडाटा',
  fullName: 'राहुल शर्मा',
  gender: 'male',
  dob: '15/08/1996',
  birthTime: '06:45 AM',
  birthPlace: 'नई दिल्ली',
  height: '5 ft 10 in (178 cm)',
  complexion: 'गोरा (Fair)',
  bloodGroup: 'B+',
  motherTongue: 'हिन्दी / English',
  maritalStatus: 'अविवाहित (Never Married)',
  diet: 'शुद्ध शाकाहारी (Vegetarian)',

  religion: 'हिन्दू (सनातन)',
  caste: 'ब्राह्मण',
  subCaste: 'सारस्वत',
  gotra: 'कश्यप',
  rashi: 'सिंह (Leo)',
  nakshatra: 'मघा (Magha)',
  manglik: 'मांगलिक नहीं (Non-Manglik)',

  education: 'B.Tech in Computer Science',
  collegeUniversity: 'दिल्ली विश्वविद्यालय',
  occupation: 'प्राइवेट सर्विस (Software Professional)',
  jobTitle: 'सीनियर सॉफ्टवेयर इंजीनियर',
  companyName: 'MNC Tech Firm',
  income: '₹ 18,00,000 / वार्षिक',
  workLocation: 'गुरुग्राम / नोएडा',

  fatherName: 'श्री रमेश शर्मा',
  fatherOccupation: 'सेवानिवृत्त अधिकारी (Govt. Dept)',
  motherName: 'श्रीमती सुनीता शर्मा',
  motherOccupation: 'गृहणी (Homemaker)',
  totalBrothers: '1 (बड़े, विवाहित)',
  marriedBrothers: '1',
  totalSisters: '1 (छोटी, अविवाहित)',
  marriedSisters: '0',
  familyType: 'एकल परिवार (Nuclear Family)',
  familyValues: 'धार्मिक एवं संस्कारी',
  nativePlace: 'लखनऊ, उत्तर प्रदेश',

  contactPerson: 'श्री रमेश शर्मा (पिता जी)',
  primaryPhone: '+91 98765 43210',
  secondaryPhone: '+91 91234 56789',
  email: 'family.contact@example.com',
  address: 'सेक्टर 14, रोहिणी, नई दिल्ली - 110085',

  photoUrl: null
};