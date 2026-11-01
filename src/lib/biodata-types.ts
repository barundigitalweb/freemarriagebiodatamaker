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

export type TemplateId = 'royal-maroon' | 'regal-blue' | 'emerald-divine' | 'rose-gold' | 'classic-elegance';

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
