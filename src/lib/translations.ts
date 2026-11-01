export type Language = 'en' | 'bn' | 'hi' | 'mr';

export interface Translations {
  appTitle: string;
  appSubtitle: string;
  downloadPdf: string;
  downloadImage: string;
  print: string;
  share: string;
  shareCopied: string;
  reset: string;
  resetConfirm: string;
  clearAll: string;
  loadSample: string;
  generatingPdf: string;
  generatingImage: string;
  pdfSuccess: string;
  imageSuccess: string;
  themeSelect: string;
  tabPersonal: string;
  tabHoroscope: string;
  tabIslamic: string;
  tabEducation: string;
  tabFamily: string;
  tabContact: string;
  tabPhoto: string;
  headerMotto: string;
  biodataTitle: string;
  fullName: string;
  dob: string;
  birthTime: string;
  birthPlace: string;
  height: string;
  complexion: string;
  bloodGroup: string;
  motherTongue: string;
  maritalStatus: string;
  diet: string;
  religion: string;
  caste: string;
  subCaste: string;
  gotra: string;
  rashi: string;
  nakshatra: string;
  manglik: string;
  sect: string;
  namaz: string;
  roza: string;
  quran: string;
  biradari: string;
  education: string;
  collegeUniversity: string;
  occupation: string;
  jobTitle: string;
  companyName: string;
  income: string;
  workLocation: string;
  fatherName: string;
  fatherOccupation: string;
  motherName: string;
  motherOccupation: string;
  totalBrothers: string;
  totalSisters: string;
  familyType: string;
  nativePlace: string;
  contactPerson: string;
  primaryPhone: string;
  secondaryPhone: string;
  email: string;
  address: string;
  photoUploadTitle: string;
  photoUploadDesc: string;
  photoRemove: string;
  photoPrivacyNote: string;
  photoPlaceholder: string;
  livePreview: string;
  hdQuality: string;
  personalDetails: string;
  horoscopeDetails: string;
  islamicDetails: string;
  educationDetails: string;
  familyDetails: string;
  contactDetails: string;
  previewDisclaimer: string;
  previewFooter: string;
  // Inline labels in preview
  lblDob: string;
  lblBirthTime: string;
  lblBirthPlace: string;
  lblHeight: string;
  lblComplexion: string;
  lblBloodGroup: string;
  lblMotherTongue: string;
  lblMaritalStatus: string;
  lblDiet: string;
  lblReligion: string;
  lblCaste: string;
  lblGotra: string;
  lblRashi: string;
  lblNakshatra: string;
  lblManglik: string;
  lblSect: string;
  lblNamaz: string;
  lblRoza: string;
  lblQuran: string;
  lblBiradari: string;
  lblEducation: string;
  lblOccupation: string;
  lblJobTitle: string;
  lblIncome: string;
  lblWorkLocation: string;
  lblFather: string;
  lblFatherOccupation: string;
  lblMother: string;
  lblMotherOccupation: string;
  lblBrothers: string;
  lblSisters: string;
  lblFamilyType: string;
  lblNativePlace: string;
  lblContactPerson: string;
  lblPhone: string;
  lblAltPhone: string;
  lblEmail: string;
  lblAddress: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    appTitle: 'Free Marriage Biodata Maker',
    appSubtitle: '100% Free • No Watermark • No Sign-up • Instant A4 PDF & HD Image Download',
    downloadPdf: 'Download PDF (Free)',
    downloadImage: 'WhatsApp Image (HD)',
    print: 'Print Direct',
    share: 'Share Link',
    shareCopied: 'Website link copied to clipboard!',
    reset: 'Reset',
    resetConfirm: 'Are you sure you want to reset all biodata fields to default sample?',
    clearAll: 'Clear All Fields',
    loadSample: 'Load Sample Data',
    generatingPdf: 'Generating A4 Print PDF...',
    generatingImage: 'Rendering HD Image...',
    pdfSuccess: 'PDF downloaded successfully!',
    imageSuccess: 'HD Image downloaded successfully!',
    themeSelect: 'Select Wedding Theme & Colors:',
    tabPersonal: 'Personal',
    tabHoroscope: 'Horoscope',
    tabIslamic: 'Islamic & Deen',
    tabEducation: 'Education & Career',
    tabFamily: 'Family',
    tabContact: 'Contact',
    tabPhoto: 'Photo',
    headerMotto: 'Top Header / Prayer Motto',
    biodataTitle: 'Document Title',
    fullName: 'Full Name *',
    dob: 'Date of Birth (DOB)',
    birthTime: 'Time of Birth',
    birthPlace: 'Birth Place',
    height: 'Height',
    complexion: 'Complexion',
    bloodGroup: 'Blood Group',
    motherTongue: 'Mother Tongue',
    maritalStatus: 'Marital Status',
    diet: 'Diet Preference',
    religion: 'Religion',
    caste: 'Caste',
    subCaste: 'Sub-Caste',
    gotra: 'Gotra',
    rashi: 'Rashi (Moon Sign)',
    nakshatra: 'Nakshatra',
    manglik: 'Manglik Status',
    sect: 'Sect / Maslak (e.g. Sunni / Hanafi)',
    namaz: 'Namaz / Prayer Habit',
    roza: 'Roza / Ramadan Fasting',
    quran: 'Quran Knowledge / Recitation',
    biradari: 'Community / Biradari',
    education: 'Highest Degree / Qualification',
    collegeUniversity: 'College / University',
    occupation: 'Occupation Type',
    jobTitle: 'Designation / Job Title',
    companyName: 'Company / Organization',
    income: 'Annual Income',
    workLocation: 'Work Location',
    fatherName: "Father's Full Name",
    fatherOccupation: "Father's Occupation",
    motherName: "Mother's Full Name",
    motherOccupation: "Mother's Occupation",
    totalBrothers: 'Brothers (e.g., 1 Elder, Married)',
    totalSisters: 'Sisters (e.g., 1 Younger, Unmarried)',
    familyType: 'Family Type (Nuclear / Joint)',
    nativePlace: 'Native / Ancestral Place',
    contactPerson: 'Contact Person (e.g., Father)',
    primaryPhone: 'Primary Phone Number *',
    secondaryPhone: 'Alternative Phone Number',
    email: 'Email Address',
    address: 'Residential Address',
    photoUploadTitle: 'Add Groom / Bride Photo (Optional)',
    photoUploadDesc: 'JPG, PNG, or WEBP (Max 5 MB). Processed 100% on your device.',
    photoRemove: 'Remove Photo',
    photoPrivacyNote: '100% Privacy: Your photo is processed directly in your browser and never uploaded to any server.',
    photoPlaceholder: 'Add Photo',
    livePreview: 'Live A4 Print Preview',
    hdQuality: 'HD Quality Render',
    personalDetails: 'Personal Details',
    horoscopeDetails: 'Horoscope & Religious Details',
    islamicDetails: 'Islamic & Religious Information',
    educationDetails: 'Education & Career',
    familyDetails: 'Family Background',
    contactDetails: 'Contact Details',
    previewDisclaimer: '* This exact layout will be exported into your A4 PDF and WhatsApp HD image.',
    previewFooter: 'Free Matrimonial Profile generated via FreeMarriageBiodataMaker.com',
    lblDob: 'Date of Birth:',
    lblBirthTime: 'Birth Time:',
    lblBirthPlace: 'Birth Place:',
    lblHeight: 'Height:',
    lblComplexion: 'Complexion:',
    lblBloodGroup: 'Blood Group:',
    lblMotherTongue: 'Mother Tongue:',
    lblMaritalStatus: 'Marital Status:',
    lblDiet: 'Diet:',
    lblReligion: 'Religion:',
    lblCaste: 'Caste:',
    lblGotra: 'Gotra:',
    lblRashi: 'Rashi:',
    lblNakshatra: 'Nakshatra:',
    lblManglik: 'Manglik:',
    lblSect: 'Sect / Maslak:',
    lblNamaz: 'Namaz / Prayer:',
    lblRoza: 'Fasting (Roza):',
    lblQuran: 'Quran Recitation:',
    lblBiradari: 'Community / Biradari:',
    lblEducation: 'Qualification:',
    lblOccupation: 'Occupation:',
    lblJobTitle: 'Designation & Company:',
    lblIncome: 'Annual Income:',
    lblWorkLocation: 'Work Location:',
    lblFather: 'Father:',
    lblFatherOccupation: 'Father Occupation:',
    lblMother: 'Mother:',
    lblMotherOccupation: 'Mother Occupation:',
    lblBrothers: 'Brothers:',
    lblSisters: 'Sisters:',
    lblFamilyType: 'Family Type:',
    lblNativePlace: 'Native Place:',
    lblContactPerson: 'Contact Person:',
    lblPhone: 'Phone:',
    lblAltPhone: 'Alt Phone:',
    lblEmail: 'Email:',
    lblAddress: 'Address:'
  },
  bn: {
    appTitle: 'ফ্রি ম্যারেজ বায়োডাটা মেকার',
    appSubtitle: '১০০% আজীবন ফ্রি • নো ওয়াটারমার্ক • নো সাইন-আপ • সরাসরি PDF ও HD ইমেজ ডাউনলোড',
    downloadPdf: 'PDF ডাউনলোড (Free)',
    downloadImage: 'WhatsApp ইমেজ (HD)',
    print: 'সরাসরি প্রিন্ট',
    share: 'শেয়ার করুন',
    shareCopied: 'ওয়েবসাইটের লিংক কপি করা হয়েছে!',
    reset: 'রিসেট',
    resetConfirm: 'আপনি কি নিশ্চিত যে সমস্ত তথ্য মুছে প্রাথমিক নমুনাতে ফিরে যেতে চান?',
    clearAll: 'সব তথ্য মুছুন',
    loadSample: 'নমুনা তথ্য লোড করুন',
    generatingPdf: 'A4 সাইজ PDF তৈরি হচ্ছে...',
    generatingImage: 'HD ইমেজ রেন্ডার হচ্ছে...',
    pdfSuccess: 'PDF ডাউনলোড সফল হয়েছে!',
    imageSuccess: 'HD ইমেজ ডাউনলোড সম্পন্ন হয়েছে!',
    themeSelect: 'টেমপ্লেট ও কালার থিম নির্বাচন করুন:',
    tabPersonal: 'ব্যক্তিগত',
    tabHoroscope: 'ধর্ম ও কুষ্ঠি',
    tabIslamic: 'ইসলামিক ও দ্বীন',
    tabEducation: 'শিক্ষা ও চাকরি',
    tabFamily: 'পারিবারিক',
    tabContact: 'যোগাযোগ',
    tabPhoto: 'ছবি (Photo)',
    headerMotto: 'শীর্ষ প্রার্থনা / প্রতীক (Header Motto)',
    biodataTitle: 'বায়োডাটার শিরোনাম (Title)',
    fullName: 'পূর্ণ নাম (Full Name) *',
    dob: 'জন্ম তারিখ (DOB)',
    birthTime: 'জন্মের সময় (Birth Time)',
    birthPlace: 'জন্মস্থান (Birth Place)',
    height: 'উচ্চতা (Height)',
    complexion: 'গায়ের রং (Complexion)',
    bloodGroup: 'রক্তের গ্রুপ (Blood Group)',
    motherTongue: 'মাতৃভাষা (Mother Tongue)',
    maritalStatus: 'বৈবাহিক অবস্থা (Marital Status)',
    diet: 'আহার / খাদ্যাভ্যাস (Diet)',
    religion: 'ধর্ম (Religion)',
    caste: 'জাত ও কুলীন পদবী (Caste)',
    subCaste: 'উপজাতি / সাব-কাস্ট',
    gotra: 'গোত্র (Gotra)',
    rashi: 'রাশি (Rashi / Moon Sign)',
    nakshatra: 'নক্ষত্র (Nakshatra)',
    manglik: 'মাঙ্গলিক অবস্থা (Manglik)',
    sect: 'মাজহাব / ফিরকা (যেমন: সুন্নি / হানাফি)',
    namaz: 'নামাযের অভ্যাস (পঞ্জেগানা)',
    roza: 'রোজার বিবরণ (রমজান)',
    quran: 'কোরআন পাঠ ও দ্বীনি শিক্ষা',
    biradari: 'বংশ / খান্দান / বিরান্দরী',
    education: 'সর্বোচ্চ শিক্ষাগত যোগ্যতা',
    collegeUniversity: 'কলেজ বা বিশ্ববিদ্যালয়ের নাম',
    occupation: 'পেশার ধরন (Service / Business)',
    jobTitle: 'পদবী (Job Title)',
    companyName: 'প্রতিষ্ঠানের নাম (Company)',
    income: 'বার্ষিক আয় (Annual Income)',
    workLocation: 'কাজের স্থান (Work Location)',
    fatherName: 'বাবার পূর্ণ নাম (Father)',
    fatherOccupation: 'বাবার পেশা (Father Occupation)',
    motherName: 'মায়ের পূর্ণ নাম (Mother)',
    motherOccupation: 'মায়ের পেশা (Mother Occupation)',
    totalBrothers: 'ভাইদের বিবরণ (যেমন: ১ জন বড়, বিবাহিত)',
    totalSisters: 'বোনেদের বিবরণ (যেমন: ১ জন ছোট)',
    familyType: 'পরিবারের ধরন (Nuclear / Joint)',
    nativePlace: 'পৈতৃক নিবাস (Native Place)',
    contactPerson: 'যোগাযোগকারী অভিভাবক (Contact Person)',
    primaryPhone: 'প্রধান ফোন নম্বর *',
    secondaryPhone: 'বিকল্প ফোন নম্বর',
    email: 'ইমেইল ঠিকানা (Email)',
    address: 'বর্তমান বা স্থায়ী ঠিকানা (Address)',
    photoUploadTitle: 'পাত্র / পাত্রীর সুন্দর ছবি যুক্ত করুন (ঐচ্ছিক)',
    photoUploadDesc: 'JPG, PNG বা WEBP (সর্বোচ্চ ৫ MB)। সম্পূর্ণ আপনার ফোনে প্রসেস হবে।',
    photoRemove: 'ছবি মুছে ফেলুন',
    photoPrivacyNote: '১০০% গোপনীয়তা: আপনার ছবি কোনো সার্ভারে আপলোড করা হয় না। সরাসরি আপনার ব্রাউজারে বায়োডাটার সাথে সংযুক্ত হয়।',
    photoPlaceholder: 'ছবি যোগ করুন',
    livePreview: 'লাইভ প্রিভিউ (A4 Print Preview)',
    hdQuality: 'HD কোয়ালিটি রেন্ডার',
    personalDetails: 'ব্যক্তিগত বিবরণ (Personal Details)',
    horoscopeDetails: 'ধর্ম ও কুষ্ঠি বিবরণ (Religious & Horoscope)',
    islamicDetails: 'ইসলামিক ও ধর্মীয় বিবরণ',
    educationDetails: 'শিক্ষা ও কর্মজীবন (Education & Career)',
    familyDetails: 'পারিবারিক বিবরণ (Family Background)',
    contactDetails: 'যোগাযোগের ঠিকানা (Contact Details)',
    previewDisclaimer: '* উপরে দেখতে পাওয়া ডিজাইনটিই হুবহু আপনার PDF এবং WhatsApp HD ছবিতে ডাউনলোড হবে।',
    previewFooter: 'Free Matrimonial Profile generated via FreeMarriageBiodataMaker.com',
    lblDob: 'জন্ম তারিখ:',
    lblBirthTime: 'জন্ম সময়:',
    lblBirthPlace: 'জন্ম স্থান:',
    lblHeight: 'উচ্চতা:',
    lblComplexion: 'বর্ণ:',
    lblBloodGroup: 'রক্তের গ্রুপ:',
    lblMotherTongue: 'মাতৃভাষা:',
    lblMaritalStatus: 'বৈবাহিক অবস্থা:',
    lblDiet: 'আহার:',
    lblReligion: 'ধর্ম:',
    lblCaste: 'জাত:',
    lblGotra: 'গোত্র:',
    lblRashi: 'রাশি:',
    lblNakshatra: 'নক্ষত্র:',
    lblManglik: 'মাঙ্গলিক:',
    lblSect: 'মাজহাব / ফিরকা:',
    lblNamaz: 'নামায:',
    lblRoza: 'রোজা:',
    lblQuran: 'কোরআন পাঠ:',
    lblBiradari: 'খান্দান / জাতি:',
    lblEducation: 'যোগ্যতা:',
    lblOccupation: 'পেশা:',
    lblJobTitle: 'পদবী ও প্রতিষ্ঠান:',
    lblIncome: 'বার্ষিক আয়:',
    lblWorkLocation: 'কর্মক্ষেত্র:',
    lblFather: 'বাবা:',
    lblFatherOccupation: 'বাবার পেশা:',
    lblMother: 'মা:',
    lblMotherOccupation: 'মায়ের পেশা:',
    lblBrothers: 'ভাই:',
    lblSisters: 'বোন:',
    lblFamilyType: 'পরিবার:',
    lblNativePlace: 'পৈতৃক নিবাস:',
    lblContactPerson: 'অভিভাবক:',
    lblPhone: 'ফোন:',
    lblAltPhone: 'বিকল্প ফোন:',
    lblEmail: 'ইমেইল:',
    lblAddress: 'ঠিকানা:'
  },
  hi: {
    appTitle: 'फ्री मैरिज बायोडाटा मेकर',
    appSubtitle: '100% मुफ्त • कोई वाटरमार्क नहीं • बिना साइन-अप • सीधा PDF और HD फोटो डाउनलोड',
    downloadPdf: 'PDF डाउनलोड करें (Free)',
    downloadImage: 'WhatsApp इमेज (HD)',
    print: 'सीधा प्रिंट करें',
    share: 'शेयर करें',
    shareCopied: 'वेबसाइट लिंक कॉपी हो गया!',
    reset: 'रीसेट',
    resetConfirm: 'क्या आप सभी विवरण रीसेट करके डिफ़ॉल्ट सैंपल लोड करना चाहते हैं?',
    clearAll: 'सभी फ़ील्ड खाली करें',
    loadSample: 'सैंपल डेटा लोड करें',
    generatingPdf: 'A4 साइज PDF बन रहा है...',
    generatingImage: 'HD इमेज तैयार हो रही है...',
    pdfSuccess: 'PDF सफलतापूर्वक डाउनलोड हो गया!',
    imageSuccess: 'HD इमेज डाउनलोड हो गई!',
    themeSelect: 'विवाह थीम व रंग चुनें:',
    tabPersonal: 'व्यक्तिगत',
    tabHoroscope: 'कुंडली व धर्म',
    tabIslamic: 'दीनी व इस्लामिक',
    tabEducation: 'शिक्षा व करियर',
    tabFamily: 'पारिवारिक',
    tabContact: 'संपर्क',
    tabPhoto: 'फोटो (Photo)',
    headerMotto: 'शीर्ष श्लोक / प्रार्थना (Header Motto)',
    biodataTitle: 'बायोडाटा शीर्षक (Title)',
    fullName: 'पूरा नाम (Full Name) *',
    dob: 'जन्म तिथि (DOB)',
    birthTime: 'जन्म समय (Birth Time)',
    birthPlace: 'जन्म स्थान (Birth Place)',
    height: 'कद / ऊंचाई (Height)',
    complexion: 'रंग-रूप (Complexion)',
    bloodGroup: 'ब्लड ग्रुप (Blood Group)',
    motherTongue: 'मातृभाषा (Mother Tongue)',
    maritalStatus: 'वैवाहिक स्थिति (Marital Status)',
    diet: 'खान-पान (Diet)',
    religion: 'धर्म (Religion)',
    caste: 'जाति (Caste)',
    subCaste: 'उपजाति (Sub-Caste)',
    gotra: 'गोत्र (Gotra)',
    rashi: 'राशि (Rashi)',
    nakshatra: 'नक्षत्र (Nakshatra)',
    manglik: 'मांगलिक (Manglik Status)',
    sect: 'मसलक / फिरका (उदा. सुन्नी / हनफ़ी)',
    namaz: 'नमाज़ की पाबंदी (पंजागाना)',
    roza: 'रोज़ा (माहे रमज़ान)',
    quran: 'क़ुरआन पाक पढ़ना / तालीम',
    biradari: 'बिरादरी / ख़ानदान',
    education: 'सर्वोच्च शिक्षा (Highest Degree)',
    collegeUniversity: 'कॉलेज / विश्वविद्यालय का नाम',
    occupation: 'पेशा (Service / Business)',
    jobTitle: 'पद / पदवी (Job Title)',
    companyName: 'कंपनी / संस्थान का नाम',
    income: 'वार्षिक आय (Annual Income)',
    workLocation: 'कार्य स्थल (Work Location)',
    fatherName: 'पिताजी का नाम (Father)',
    fatherOccupation: 'पिताजी का व्यवसाय',
    motherName: 'माताजी का नाम (Mother)',
    motherOccupation: 'माताजी का व्यवसाय',
    totalBrothers: 'भाईयों की संख्या (उदा. 1 बड़े भाई, विवाहित)',
    totalSisters: 'बहनों की संख्या (उदा. 1 छोटी बहन)',
    familyType: 'परिवार का प्रकार (संयुक्त / एकल)',
    nativePlace: 'मूल निवास (Native Place)',
    contactPerson: 'संपर्क व्यक्ति (अभिभावक)',
    primaryPhone: 'मुख्य फोन नंबर *',
    secondaryPhone: 'वैकल्पिक फोन नंबर',
    email: 'ईमेल पता (Email)',
    address: 'वर्तमान / स्थायी पता (Address)',
    photoUploadTitle: 'वर / वधू का सुंदर फोटो जोड़ें (वैकल्पिक)',
    photoUploadDesc: 'JPG, PNG या WEBP (अधिकतम 5 MB)। पूरा प्रोसेस आपके फोन पर ही होगा।',
    photoRemove: 'फोटो हटाएं',
    photoPrivacyNote: '100% गोपनीयता: आपका फोटो किसी भी सर्वर पर अपलोड नहीं होता। यह सीधे आपके ब्राउज़र में बायोडाटा से जुड़ता है।',
    photoPlaceholder: 'फोटो जोड़ें',
    livePreview: 'लाइव A4 प्रिंट प्रीव्यू',
    hdQuality: 'HD क्वालिटी रेंडर',
    personalDetails: 'व्यक्तिगत विवरण (Personal Details)',
    horoscopeDetails: 'धार्मिक एवं कुंडली विवरण (Horoscope)',
    islamicDetails: 'दीनी एवं धार्मिक विवरण',
    educationDetails: 'शिक्षा एवं कार्यक्षेत्र (Education & Career)',
    familyDetails: 'पारिवारिक विवरण (Family Background)',
    contactDetails: 'संपर्क सूत्र (Contact Details)',
    previewDisclaimer: '* यह डिज़ाइन हूबहू आपके PDF और WhatsApp HD इमेज में डाउनलोड होगा।',
    previewFooter: 'Free Matrimonial Profile generated via FreeMarriageBiodataMaker.com',
    lblDob: 'जन्म तिथि:',
    lblBirthTime: 'जन्म समय:',
    lblBirthPlace: 'जन्म स्थान:',
    lblHeight: 'कद / ऊंचाई:',
    lblComplexion: 'वर्ण:',
    lblBloodGroup: 'ब्लड ग्रुप:',
    lblMotherTongue: 'मातृभाषा:',
    lblMaritalStatus: 'वैवाहिक स्थिति:',
    lblDiet: 'आहार:',
    lblReligion: 'धर्म:',
    lblCaste: 'जाति:',
    lblGotra: 'गोत्र:',
    lblRashi: 'राशि:',
    lblNakshatra: 'नक्षत्र:',
    lblManglik: 'मांगलिक:',
    lblSect: 'मसलक / फिरका:',
    lblNamaz: 'नमाज़:',
    lblRoza: 'रोज़ा:',
    lblQuran: 'क़ुरआन पाक:',
    lblBiradari: 'बिरादरी:',
    lblEducation: 'शिक्षा:',
    lblOccupation: 'पेशा:',
    lblJobTitle: 'पद व कंपनी:',
    lblIncome: 'वार्षिक आय:',
    lblWorkLocation: 'कार्य स्थल:',
    lblFather: 'पिताजी:',
    lblFatherOccupation: 'पिताजी का पेशा:',
    lblMother: 'माताजी:',
    lblMotherOccupation: 'माताजी का पेशा:',
    lblBrothers: 'भाई:',
    lblSisters: 'बहन:',
    lblFamilyType: 'परिवार:',
    lblNativePlace: 'मूल निवास:',
    lblContactPerson: 'संपर्क:',
    lblPhone: 'फोन:',
    lblAltPhone: 'अतिरिक्त फोन:',
    lblEmail: 'ईमेल:',
    lblAddress: 'पता:'
  },
  mr: {
    appTitle: 'मोफत विवाह बायोडाटा मेकर',
    appSubtitle: '१००% मोफत • वॉटरमार्क नाही • लॉगिन नाही • थेट A4 PDF आणि HD इमेज डाउनलोड',
    downloadPdf: 'PDF डाउनलोड करा (Free)',
    downloadImage: 'WhatsApp इमेज (HD)',
    print: 'थेट प्रिंट करा',
    share: 'शेअर करा',
    shareCopied: 'वेबसाइटची लिंक कॉपी झाली!',
    reset: 'रीसेट',
    resetConfirm: 'तुम्हाला सर्व माहिती रीसेट करून मूळ सॅम्पल लोड करायचे आहे का?',
    clearAll: 'सर्व माहिती पुसा',
    loadSample: 'सॅम्पल माहिती लोड करा',
    generatingPdf: 'A4 साईझ PDF तयार होत आहे...',
    generatingImage: 'HD इमेज तयार होत आहे...',
    pdfSuccess: 'PDF यशस्वीरित्या डाउनलोड झाली!',
    imageSuccess: 'HD इमेज डाउनलोड झाली!',
    themeSelect: 'लग्न थीम आणि रंग निवडा:',
    tabPersonal: 'वैयक्तिक',
    tabHoroscope: 'पत्रिका व धर्म',
    tabIslamic: 'धार्मिक व दीनी',
    tabEducation: 'शिक्षण व नोकरी',
    tabFamily: 'कौटुंबिक',
    tabContact: 'संपर्क',
    tabPhoto: 'फोटो (Photo)',
    headerMotto: 'शीर्ष प्रार्थना / प्रतीक (Header Motto)',
    biodataTitle: 'बायोडाटा शीर्षक (Title)',
    fullName: 'पूर्ण नाव (Full Name) *',
    dob: 'जन्मतारीख (DOB)',
    birthTime: 'जन्म वेळ (Birth Time)',
    birthPlace: 'जन्म ठिकाण (Birth Place)',
    height: 'उंची (Height)',
    complexion: 'वर्ण (Complexion)',
    bloodGroup: 'रक्तगट (Blood Group)',
    motherTongue: 'मातृभाषा (Mother Tongue)',
    maritalStatus: 'वैवाहिक स्थिती (Marital Status)',
    diet: 'आहार (Diet)',
    religion: 'धर्म (Religion)',
    caste: 'जात (Caste)',
    subCaste: 'पोटजात (Sub-Caste)',
    gotra: 'गोत्र (Gotra)',
    rashi: 'रास (Rashi)',
    nakshatra: 'नक्षत्र (Nakshatra)',
    manglik: 'मंगळ (Manglik Status)',
    sect: 'पंथ / मसलक (उदा. सुन्नी / हनफी)',
    namaz: 'नमाजाची सवय',
    roza: 'रोजा (रमजान)',
    quran: 'कुराण पठण / दीनी तालीम',
    biradari: 'बिरादरी / खानदान',
    education: 'उच्च शिक्षण (Highest Degree)',
    collegeUniversity: 'कॉलेज / विद्यापीठाचे नाव',
    occupation: 'व्यवसाय प्रकार (Service / Business)',
    jobTitle: 'नोकरीचे पद (Job Title)',
    companyName: 'कंपनीचे नाव (Company)',
    income: 'वार्षिक उत्पन्न (Annual Income)',
    workLocation: 'नोकरीचे ठिकाण (Work Location)',
    fatherName: 'वडिलांचे पूर्ण नाव (Father)',
    fatherOccupation: 'वडिलांचा व्यवसाय',
    motherName: 'आईचे पूर्ण नाव (Mother)',
    motherOccupation: 'आईचा व्यवसाय',
    totalBrothers: 'भाऊ (उदा. १ मोठा, विवाहित)',
    totalSisters: 'बहिणी (उदा. १ लहान, अविवाहित)',
    familyType: 'कुटुंब प्रकार (एकत्र / विभक्त)',
    nativePlace: 'मूळ गाव / वतन (Native Place)',
    contactPerson: 'संपर्क व्यक्ती (पालक)',
    primaryPhone: 'मुख्य फोन नंबर *',
    secondaryPhone: 'पर्यायी फोन नंबर',
    email: 'ईमेल (Email)',
    address: 'पत्ता (Address)',
    photoUploadTitle: 'वधू / वराचा फोटो जोडा (ऐच्छिक)',
    photoUploadDesc: 'JPG, PNG किंवा WEBP (कमाल 5 MB). सर्व प्रोसेस तुमच्या फोनवरच होईल.',
    photoRemove: 'फोटो काढा',
    photoPrivacyNote: '१००% गोपनीयता: तुमचा फोटो कोणत्याही सर्व्हरवर अपलोड केला जात नाही.',
    photoPlaceholder: 'फोटो जोडा',
    livePreview: 'थेट A4 प्रिंट प्रीव्ह्यू',
    hdQuality: 'HD क्वालिटी रेंडर',
    personalDetails: 'वैयक्तिक माहिती (Personal Details)',
    horoscopeDetails: 'धार्मिक व पत्रिका माहिती (Horoscope)',
    islamicDetails: 'धार्मिक व दीनी माहिती',
    educationDetails: 'शिक्षण व नोकरी (Education & Career)',
    familyDetails: 'कौटुंबिक माहिती (Family Background)',
    contactDetails: 'संपर्क तपशील (Contact Details)',
    previewDisclaimer: '* हीच डिझाईन हुबेहूब तुमच्या PDF आणि WhatsApp HD इमेजमध्ये डाउनलोड होईल.',
    previewFooter: 'Free Matrimonial Profile generated via FreeMarriageBiodataMaker.com',
    lblDob: 'जन्मतारीख:',
    lblBirthTime: 'जन्म वेळ:',
    lblBirthPlace: 'जन्म ठिकाण:',
    lblHeight: 'उंची:',
    lblComplexion: 'वर्ण:',
    lblBloodGroup: 'रक्तगट:',
    lblMotherTongue: 'मातृभाषा:',
    lblMaritalStatus: 'वैवाहिक स्थिती:',
    lblDiet: 'आहार:',
    lblReligion: 'धर्म:',
    lblCaste: 'जात:',
    lblGotra: 'गोत्र:',
    lblRashi: 'रास:',
    lblNakshatra: 'नक्षत्र:',
    lblManglik: 'मंगळ:',
    lblSect: 'मसलक / पंथ:',
    lblNamaz: 'नमाज:',
    lblRoza: 'रोजा:',
    lblQuran: 'कुराण पठण:',
    lblBiradari: 'बिरादरी:',
    lblEducation: 'शिक्षण:',
    lblOccupation: 'व्यवसाय:',
    lblJobTitle: 'पद व कंपनी:',
    lblIncome: 'वार्षिक उत्पन्न:',
    lblWorkLocation: 'कामाचे ठिकाण:',
    lblFather: 'वडील:',
    lblFatherOccupation: 'वडिलांचा व्यवसाय:',
    lblMother: 'आई:',
    lblMotherOccupation: 'आईचा व्यवसाय:',
    lblBrothers: 'भाऊ:',
    lblSisters: 'बहीण:',
    lblFamilyType: 'कुटुंब:',
    lblNativePlace: 'मूळ गाव:',
    lblContactPerson: 'पालक:',
    lblPhone: 'फोन:',
    lblAltPhone: 'पर्यायी फोन:',
    lblEmail: 'ईमेल:',
    lblAddress: 'पत्ता:'
  }
};
