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
    badge: 'সবচেয়ে জনপ্রিয় 👑'
  },
  {
    id: 'regal-blue',
    name: 'Regal Navy & Gold',
    description: 'Sophisticated & Prestigious Royal Blue with Elegant Gold Borders',
    primaryColor: '#1e3a8a',
    secondaryColor: '#b45309',
    borderColor: '#d97706',
    bgGradient: 'from-blue-50/30 via-white to-slate-50',
    badge: 'আধুনিক ও প্রিমিয়াম 💎'
  },
  {
    id: 'emerald-divine',
    name: 'Emerald & Mint Divine',
    description: 'Fresh & Auspicious Forest Green with Royal Ornamental Accents',
    primaryColor: '#064e3b',
    secondaryColor: '#059669',
    borderColor: '#047857',
    bgGradient: 'from-emerald-50/30 via-white to-teal-50/20',
    badge: 'ডিভাইন ও ক্লাসিক ✨'
  },
  {
    id: 'rose-gold',
    name: 'Rose Gold & Floral Pastel',
    description: 'Chic, Modern & Delicate Pastel Floral Palette (Popular with Brides)',
    primaryColor: '#be123c',
    secondaryColor: '#f43f5e',
    borderColor: '#fb7185',
    bgGradient: 'from-rose-50/50 via-white to-pink-50/30',
    badge: 'রোমান্টিক ও সফ্ট 🌸'
  },
  {
    id: 'classic-elegance',
    name: 'Classic Monochrome Crisp',
    description: 'Ultra Clean, Formal & High-Contrast Layout for Perfect Physical Printing',
    primaryColor: '#0f172a',
    secondaryColor: '#475569',
    borderColor: '#334155',
    bgGradient: 'from-white via-slate-50/40 to-white',
    badge: 'প্রিন্ট-ফ্রেন্ডলি 📄'
  }
];

export const INITIAL_BIODATA_DATA: BiodataData = {
  headerText: '|| श्री गणेशाय नमः ||',
  title: 'MARRIAGE BIODATA',
  fullName: 'Rahul Sharma',
  gender: 'male',
  dob: '15/08/1996',
  birthTime: '06:45 AM',
  birthPlace: 'Kolkata, West Bengal',
  height: '5 ft 10 in (178 cm)',
  complexion: 'Fair',
  bloodGroup: 'B+',
  motherTongue: 'Bengali / Hindi',
  maritalStatus: 'Never Married',
  diet: 'Vegetarian',

  religion: 'Hindu',
  caste: 'Brahmin',
  subCaste: 'Kulin',
  gotra: 'Kashyap',
  rashi: 'Leo (सिंह)',
  nakshatra: 'Magha',
  manglik: 'Non-Manglik',

  education: 'B.Tech in Computer Science',
  collegeUniversity: 'Jadavpur University',
  occupation: 'Working Professional',
  jobTitle: 'Senior Software Engineer',
  companyName: 'MNC Tech Firm',
  income: '₹ 18,00,000 / Annum',
  workLocation: 'Bangalore / Kolkata',

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
  nativePlace: 'Burdwan, West Bengal',

  contactPerson: 'Mr. Ramesh Sharma (Father)',
  primaryPhone: '+91 98765 43210',
  secondaryPhone: '+91 91234 56789',
  email: 'family.contact@example.com',
  address: 'Salt Lake City, Sector 2, Kolkata - 700091',

  photoUrl: null
};
