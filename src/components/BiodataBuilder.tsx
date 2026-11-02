import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  type BiodataData,
  type TemplateId,
  BIODATA_TEMPLATES,
  INITIAL_BIODATA_DATA,
  INITIAL_MUSLIM_BIODATA_DATA,
  INITIAL_BENGALI_BIODATA_DATA,
  INITIAL_MARATHI_BIODATA_DATA,
  INITIAL_HINDU_BIODATA_DATA
} from '../lib/biodata-types';
import {
  type Language,
  TRANSLATIONS
} from '../lib/translations';
import {
  IslamicArchHeader,
  IslamicFloralFooter,
  GaneshaWatermark,
  HinduCalligraphyHeader,
  RoyalMandalaRing,
  CornerFiligree,
  TempleDeepamWatermark,
  IslamicSapphireArch
} from './BiodataDecorations';
import {
  User,
  BookOpen,
  Briefcase,
  Users,
  Phone,
  Image as ImageIcon,
  Sparkles,
  Download,
  Printer,
  Palette,
  CheckCircle2,
  Eye,
  Trash2,
  RotateCcw,
  Copy,
  Check,
  Globe,
  MessageCircle,
  Edit3,
  ArrowRight
} from 'lucide-react';

export type BiodataFormatType = 'general' | 'muslim' | 'bengali' | 'marathi' | 'hindu';

function KeyValueRow({
  label,
  value,
  labelColor = 'text-slate-700 font-bold',
  colonColor = 'text-slate-400 font-bold',
  valueColor = 'text-slate-900 font-medium',
  labelWidth = 'w-20 min-[360px]:w-24 sm:w-28'
}: {
  label: string;
  value?: string;
  labelColor?: string;
  colonColor?: string;
  valueColor?: string;
  labelWidth?: string;
}) {
  if (!value) return null;
  return (
    <div className="flex text-[11px] items-baseline leading-normal py-0.5">
      <span className={`${labelWidth} ${labelColor} shrink-0`}>{label}</span>
      <span className={`${colonColor} mr-1.5 shrink-0`}>:</span>
      <span className={`${valueColor} break-words flex-1`}>{value}</span>
    </div>
  );
}

// Predefined Curated Options for 1-Tap Form Filling
const HEIGHT_OPTIONS = [
  '4 ft 8 in (142 cm)',
  '4 ft 9 in (145 cm)',
  '4 ft 10 in (147 cm)',
  '4 ft 11 in (150 cm)',
  '5 ft 0 in (152 cm)',
  '5 ft 1 in (155 cm)',
  '5 ft 2 in (157 cm)',
  '5 ft 3 in (160 cm)',
  '5 ft 4 in (163 cm)',
  '5 ft 5 in (165 cm)',
  '5 ft 6 in (168 cm)',
  '5 ft 7 in (170 cm)',
  '5 ft 8 in (173 cm)',
  '5 ft 9 in (175 cm)',
  '5 ft 10 in (178 cm)',
  '5 ft 11 in (180 cm)',
  '6 ft 0 in (183 cm)',
  '6 ft 1 in (185 cm)',
  '6 ft 2 in (188 cm)',
  '6 ft 3 in (190 cm)',
  '6 ft 4 in (193 cm)'
];

const BLOOD_GROUP_OPTIONS = [
  'B+',
  'O+',
  'A+',
  'AB+',
  'B-',
  'O-',
  'A-',
  'AB-',
  "Don't Know"
];

const COMPLEXION_OPTIONS: Record<Language, string[]> = {
  en: ['Fair', 'Very Fair', 'Wheatish', 'Wheatish Medium', 'Dusky', 'Dark'],
  hi: ['गोरा (Fair)', 'बहुत गोरा (Very Fair)', 'गेहुंआ (Wheatish)', 'सांवला (Dusky)'],
  bn: ['উজ্জ্বল ফর্সা (Very Fair)', 'ফর্সা (Fair)', 'উজ্জ্বল শ্যামবর্ণ (Wheatish)', 'শ্যামবর্ণ (Medium)'],
  mr: ['गोरा (Fair)', 'अति गोरा (Very Fair)', 'गहूवर्ण (Wheatish)', 'सावळा (Dusky)']
};

const MARITAL_STATUS_OPTIONS: Record<Language, string[]> = {
  en: ['Never Married', 'Awaiting Divorce', 'Divorced', 'Widowed', 'Annulled'],
  hi: ['अविवाहित (Never Married)', 'तलाकशुदा (Divorced)', 'तलाक प्रतीक्षारत (Awaiting Divorce)', 'विधवा/विधुर (Widowed)'],
  bn: ['অবিবাহিত (Never Married)', 'ডিভোর্সড (Divorced)', 'ডিভোর্স প্রক্রিয়াধীন (Awaiting Divorce)', 'বিধবা/বিপত্নীক (Widowed)'],
  mr: ['अविवाहित (Never Married)', 'घटस्फोटित (Divorced)', 'घटस्फोट प्रक्रिया सुरू (Awaiting Divorce)', 'विधवा/विधुर (Widowed)']
};

const DIET_OPTIONS: Record<Language, string[]> = {
  en: ['Vegetarian', 'Pure Vegetarian (Jain)', 'Eggetarian', 'Non-Vegetarian', 'Halal (Non-Vegetarian)'],
  hi: ['शुद्ध शाकाहारी (Vegetarian)', 'शाकाहारी (Vegetarian)', 'अंडा युक्त (Eggetarian)', 'मांसाहारी (Non-Vegetarian)'],
  bn: ['নিরামিষ (Vegetarian)', 'আমিষ (Non-Vegetarian)', 'ডিম্বাহারী (Eggetarian)'],
  mr: ['शाकाहारी (Vegetarian)', 'शुद्ध शाकाहारी (Jain)', 'मांसाहारी (Non-Vegetarian)', 'अंडाहारी (Eggetarian)']
};

const MANGLIK_OPTIONS: Record<Language, string[]> = {
  en: ['Non-Manglik', 'Manglik', 'Anshik Manglik', "Don't Know"],
  hi: ['मांगलिक नहीं (Non-Manglik)', 'मांगलिक (Manglik)', 'आंशिक मांगलिक (Anshik Manglik)', 'ज्ञात नहीं (Don\'t Know)'],
  bn: ['মাঙ্গলিক নয় (Non-Manglik)', 'মাঙ্গলিক (Manglik)', 'আংশিক মাঙ্গলিক (Anshik Manglik)', 'জানা নেই (Don\'t Know)'],
  mr: ['मांगलिक नाही (Non-Manglik)', 'मांगलिक (Manglik)', 'अंशकालीन मांगलिक (Anshik Manglik)', 'माहित नाही (Don\'t Know)']
};

const FAMILY_TYPE_OPTIONS: Record<Language, string[]> = {
  en: ['Nuclear Family', 'Joint Family'],
  hi: ['एकल परिवार (Nuclear Family)', 'संयुक्त परिवार (Joint Family)'],
  bn: ['একক পরিবার (Nuclear Family)', 'যৌথ পরিবার (Joint Family)'],
  mr: ['विभक्त कुटुंब (Nuclear Family)', 'संयुक्त कुटुंब (Joint Family)']
};

const RASHI_OPTIONS: Record<Language, string[]> = {
  en: [
    'Leo (सिंह)',
    'Aries (मेष)',
    'Taurus (वृषभ)',
    'Gemini (मिथुन)',
    'Cancer (कर्क)',
    'Virgo (कन्या)',
    'Libra (तुला)',
    'Scorpio (वृश्चिक)',
    'Sagittarius (धनु)',
    'Capricorn (मकर)',
    'Aquarius (कुंभ)',
    'Pisces (मीन)'
  ],
  hi: [
    'सिंह (Leo)',
    'मेष (Aries)',
    'वृषभ (Taurus)',
    'मिथुन (Gemini)',
    'कर्क (Cancer)',
    'कन्या (Virgo)',
    'तुला (Libra)',
    'वृश्चिक (Scorpio)',
    'धनु (Sagittarius)',
    'मकर (Capricorn)',
    'कुंभ (Aquarius)',
    'मीन (Pisces)'
  ],
  bn: [
    'সিংহ (Leo)',
    'মেষ (Aries)',
    'বৃষ (Taurus)',
    'মিথুন (Gemini)',
    'কর্কট (Cancer)',
    'কন্যা (Virgo)',
    'তুলা (Libra)',
    'বৃশ্চিক (Scorpio)',
    'ধনু (Sagittarius)',
    'মকর (Capricorn)',
    'কুম্ভ (Aquarius)',
    'মীন (Pisces)'
  ],
  mr: [
    'सिंह (Leo)',
    'मेष (Aries)',
    'वृषभ (Taurus)',
    'मिथुन (Gemini)',
    'कर्क (Cancer)',
    'कन्या (Virgo)',
    'तूळ (Libra)',
    'वृश्चिक (Scorpio)',
    'धनु (Sagittarius)',
    'मकर (Capricorn)',
    'कुंभ (Aquarius)',
    'मीन (Pisces)'
  ]
};

const MUSLIM_SECT_OPTIONS = [
  'Sunni',
  'Shia',
  'Ahle Hadees',
  'Deobandi',
  'Barelvi',
  'Other'
];

const MUSLIM_NAMAZ_OPTIONS = [
  '5 Times Daily (Regular)',
  'Regular',
  'Friday Only (Jummah)',
  'Practicing'
];

const MUSLIM_ROZA_OPTIONS = [
  'Keeps Ramadan Fasts',
  'All 30 Fasts (Regular)',
  'Observes Fasts'
];

function SmartSelectField({
  label,
  value,
  options,
  onChange,
  placeholder = 'Select option...',
  customPlaceholder = 'Type custom value...'
}: {
  label: string;
  value?: string;
  options: string[];
  onChange: (val: string) => void;
  placeholder?: string;
  customPlaceholder?: string;
}) {
  const [isTypingCustom, setIsTypingCustom] = useState(false);
  const val = value || '';
  const isPredefined = options.includes(val);

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label className="block font-bold text-slate-700">{label}</label>
        {isTypingCustom ? (
          <button
            type="button"
            onClick={() => {
              setIsTypingCustom(false);
              if (!isPredefined && options.length > 0) {
                onChange(options[0]);
              }
            }}
            className="text-[10px] text-rose-600 hover:text-rose-700 hover:underline font-semibold cursor-pointer"
          >
            ← Quick Select
          </button>
        ) : null}
      </div>

      {isTypingCustom ? (
        <input
          type="text"
          value={val}
          onChange={(e) => onChange(e.target.value)}
          placeholder={customPlaceholder}
          autoFocus
          className="w-full bg-white border border-rose-300 focus:border-rose-600 rounded-lg p-2 outline-none text-xs font-medium"
        />
      ) : (
        <select
          value={val}
          onChange={(e) => {
            if (e.target.value === '__custom__') {
              setIsTypingCustom(true);
            } else {
              onChange(e.target.value);
            }
          }}
          className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 outline-none focus:border-rose-600 focus:bg-white text-xs font-medium cursor-pointer"
        >
          {!val && <option value="">{placeholder}</option>}
          {val && !isPredefined && (
            <option value={val}>{val} (Custom)</option>
          )}
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
          <option value="__custom__">✏️ Type Custom...</option>
        </select>
      )}
    </div>
  );
}

interface BiodataBuilderProps {
  initialLanguage?: Language;
  initialHeaderText?: string;
  initialTitle?: string;
  formatType?: BiodataFormatType;
}

function getInitialData(formatType: BiodataFormatType): BiodataData {
  switch (formatType) {
    case 'muslim':
      return { ...INITIAL_MUSLIM_BIODATA_DATA };
    case 'bengali':
      return { ...INITIAL_BENGALI_BIODATA_DATA };
    case 'marathi':
      return { ...INITIAL_MARATHI_BIODATA_DATA };
    case 'hindu':
      return { ...INITIAL_HINDU_BIODATA_DATA };
    case 'general':
    default:
      return { ...INITIAL_BIODATA_DATA };
  }
}

function getStorageKey(formatType: BiodataFormatType): string {
  switch (formatType) {
    case 'muslim':
      return 'freemarriagebiodata_muslim_draft_v1';
    case 'bengali':
      return 'freemarriagebiodata_bengali_draft_v1';
    case 'marathi':
      return 'freemarriagebiodata_marathi_draft_v1';
    case 'hindu':
      return 'freemarriagebiodata_hindu_draft_v1';
    case 'general':
    default:
      return 'freemarriagebiodata_draft_v2';
  }
}

export default function BiodataBuilder({
  initialLanguage = 'en',
  initialHeaderText,
  initialTitle,
  formatType = 'general'
}: BiodataBuilderProps) {
  const isMuslim = formatType === 'muslim';
  const storageKey = getStorageKey(formatType);

  const [language, setLanguage] = useState<Language>(initialLanguage);
  const [data, setData] = useState<BiodataData>(() => {
    const base = getInitialData(formatType);
    if (initialHeaderText) base.headerText = initialHeaderText;
    if (initialTitle) base.title = initialTitle;
    return base;
  });
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>(
    isMuslim ? 'emerald-divine' : 'royal-maroon'
  );
  const [activeTab, setActiveTab] = useState<string>('personal');
  const [mobileTab, setMobileTab] = useState<'edit' | 'preview'>('edit');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportMessage, setExportMessage] = useState<string>('');
  const [copyFeedback, setCopyFeedback] = useState<boolean>(false);

  const biodataRef = useRef<HTMLDivElement | null>(null);

  const t = TRANSLATIONS[language] || TRANSLATIONS.bn;
  // Available templates strictly segmented by community context (Option B)
  const availableTemplates = useMemo(() => {
    if (isMuslim) {
      return BIODATA_TEMPLATES.filter((tmpl) => tmpl.id !== 'saffron-gold' && tmpl.id !== 'temple-gold');
    }
    // For General, Hindu, Marathi, Bengali: Never show Islamic Nikah template
    return BIODATA_TEMPLATES.filter((tmpl) => tmpl.id !== 'emerald-divine' && tmpl.id !== 'sapphire-noor');
  }, [isMuslim]);

  const currentTemplate =
    availableTemplates.find((tmpl) => tmpl.id === selectedTemplate) || availableTemplates[0];

  // Load from localStorage on mount (Client-Side)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.data) {
          const loadedData = { ...parsed.data };
          // Strict cultural boundary:
          if (isMuslim) {
            // Guarantee that an Islamic page NEVER carries a Hindu motto or title from past sessions
            if (
              !loadedData.headerText ||
              loadedData.headerText.includes('गणेशाय') ||
              loadedData.headerText.includes('Ganeshay')
            ) {
              loadedData.headerText = 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ';
            }
            if (
              !loadedData.title ||
              loadedData.title === 'MARRIAGE BIODATA' ||
              loadedData.title === 'विवाह बायोडाटा'
            ) {
              loadedData.title = 'ISLAMIC NIKAH BIODATA';
            }
          } else {
            // Guarantee that a Hindu/general page NEVER carries an Islamic motto from past sessions
            if (
              loadedData.headerText?.includes('بِسْمِ') ||
              loadedData.headerText?.includes('Bismillah')
            ) {
              if (formatType === 'bengali') {
                loadedData.headerText = '॥ শ্রী শ্রী প্রজাপতয়ে নমঃ ॥';
              } else if (formatType === 'general') {
                loadedData.headerText = '|| Shree Ganeshay Namah ||';
              } else {
                loadedData.headerText = '॥ श्री गणेशाय नमः ॥';
              }
            }
            if (loadedData.title === 'ISLAMIC NIKAH BIODATA') {
              if (formatType === 'bengali') {
                loadedData.title = 'বিবাহের বায়োডাটা';
              } else if (formatType === 'general') {
                loadedData.title = 'MARRIAGE BIODATA';
              } else {
                loadedData.title = 'विवाह बायोडाटा';
              }
            }
            // If on Bengali format and header was Devanagari from old draft, adapt to Bengali script
            if (formatType === 'bengali' && (loadedData.headerText?.includes('गणेशाय') || loadedData.headerText?.includes('Ganeshay'))) {
              loadedData.headerText = '॥ শ্রী শ্রী প্রজাপতয়ে নমঃ ॥';
              loadedData.title = 'বিবাহের বায়োডাটা';
            }
            // If on English/General format and header was Devanagari Hindi from old draft, adapt to English script
            if (formatType === 'general' && loadedData.headerText === '|| श्री गणेशाय नमः ||') {
              loadedData.headerText = '|| Shree Ganeshay Namah ||';
            }
          }
          setData(loadedData);
        }
        if (parsed?.selectedTemplate) {
          // If on non-muslim format and saved template was emerald-divine or sapphire-noor, reset to royal-maroon
          if (!isMuslim && (parsed.selectedTemplate === 'emerald-divine' || parsed.selectedTemplate === 'sapphire-noor')) {
            setSelectedTemplate('royal-maroon');
          } else if (isMuslim && (parsed.selectedTemplate === 'saffron-gold' || parsed.selectedTemplate === 'temple-gold')) {
            setSelectedTemplate('emerald-divine');
          } else {
            setSelectedTemplate(parsed.selectedTemplate);
          }
        }
        if (parsed?.language) setLanguage(parsed.language);
      }
    } catch (e) {
      console.warn('Could not read from localStorage', e);
    }
  }, [storageKey, isMuslim, formatType]);

  // Persist draft to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          data,
          selectedTemplate,
          language
        })
      );
    } catch (e) {
      console.warn('Could not save draft to localStorage', e);
    }
  }, [storageKey, data, selectedTemplate, language]);

  const handleApplyTemplate = (newTmplId: TemplateId) => {
    setSelectedTemplate(newTmplId);
    const found = BIODATA_TEMPLATES.find((t) => t.id === newTmplId);
    if (found) {
      setExportMessage(
        language === 'bn'
          ? `✨ "${found.name}" থিমটি নির্বাচন করা হয়েছে!`
          : `✨ Applied "${found.name}" Template!`
      );
      setTimeout(() => setExportMessage(''), 3000);
    }

    setData((prev) => {
      // 1. If on the Muslim page, NEVER switch to Hindu mottos or titles!
      if (isMuslim) {
        if (
          !prev.headerText ||
          prev.headerText.includes('गणेशाय') ||
          prev.headerText.includes('Ganeshay')
        ) {
          return {
            ...prev,
            headerText: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
            title: 'ISLAMIC NIKAH BIODATA'
          };
        }
        return prev;
      }

      // 2. If on Hindu / General format pages:
      if (
        newTmplId === 'saffron-gold' ||
        newTmplId === 'temple-gold' ||
        newTmplId === 'ruby-crimson' ||
        newTmplId === 'royal-maroon'
      ) {
        const isMuslimMotto =
          prev.headerText?.includes('بِسْمِ') || prev.headerText?.includes('Bismillah');
        if (isMuslimMotto) {
          return {
            ...prev,
            headerText:
              newTmplId === 'saffron-gold' || newTmplId === 'temple-gold'
                ? '॥ श्री गणेशाय नमः ॥'
                : '|| श्री गणेशाय नमः ||',
            title:
              formatType === 'hindu'
                ? 'विवाह बायोडाटा'
                : prev.title === 'ISLAMIC NIKAH BIODATA'
                ? 'MARRIAGE BIODATA'
                : prev.title
          };
        }
      }
      return prev;
    });
  };

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);

    setData((prev) => {
      const defaultMottos = [
        '|| श्री गणेशाय नमः ||',
        '॥ श्री गणेशाय नमः ॥',
        '|| श्री गणेशाय नम: ||',
        '|| Shree Ganeshay Namah ||',
        '॥ Shree Ganeshay Namah ॥',
        '|| শ্রী শ্রী প্রজাপতয়ে নমঃ ||',
        '॥ শ্রী শ্রী প্রজাপতয়ে নমঃ ॥',
        '|| শ্রী শ্রী গণেশায় নমঃ ||',
        '॥ শ্রী শ্রী গণেশায় নমঃ ॥',
        'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
        'Bismillah-ir-Rahman-ir-Rahim'
      ];
      const defaultTitles = [
        'MARRIAGE BIODATA',
        'বিবাহের বায়োডাটা',
        'विवाह बायोडाटा',
        'ISLAMIC NIKAH BIODATA',
        'ইসলামিক নিকাহ বায়োডাটা'
      ];

      const isDefaultMotto = !prev.headerText || defaultMottos.includes(prev.headerText.trim());
      const isDefaultTitle = !prev.title || defaultTitles.includes(prev.title.trim());

      let nextHeader = prev.headerText;
      let nextTitle = prev.title;

      if (isMuslim) {
        if (isDefaultTitle) {
          nextTitle = newLang === 'bn' ? 'ইসলামিক নিকাহ বায়োডাটা' : 'ISLAMIC NIKAH BIODATA';
        }
      } else {
        if (isDefaultMotto) {
          if (newLang === 'bn') nextHeader = '॥ শ্রী শ্রী প্রজাপতয়ে নমঃ ॥';
          else if (newLang === 'en') nextHeader = '|| Shree Ganeshay Namah ||';
          else if (newLang === 'mr') nextHeader = '॥ श्री गणेशाय नमः ॥';
          else nextHeader = '॥ श्री गणेशाय नमः ॥';
        }
        if (isDefaultTitle) {
          if (newLang === 'bn') nextTitle = 'বিবাহের বায়োডাটা';
          else if (newLang === 'mr' || newLang === 'hi') nextTitle = 'विवाह बायोडाटा';
          else nextTitle = 'MARRIAGE BIODATA';
        }
      }

      return {
        ...prev,
        headerText: nextHeader,
        title: nextTitle
      };
    });
  };

  // Listen for template selection events from the Template Gallery
  useEffect(() => {
    const handleTemplateSelect = (e: Event) => {
      const customEvent = e as CustomEvent<{ templateId: TemplateId }>;
      const newTmplId = customEvent.detail?.templateId;
      if (newTmplId) {
        handleApplyTemplate(newTmplId);
      }
    };

    window.addEventListener('select-biodata-template', handleTemplateSelect);

    // Also check URL parameters on load (e.g. ?template=emerald-divine)
    try {
      const params = new URLSearchParams(window.location.search);
      const urlTmpl = params.get('template') as TemplateId;
      if (urlTmpl && BIODATA_TEMPLATES.some((t) => t.id === urlTmpl)) {
        handleApplyTemplate(urlTmpl);
      }
    } catch (e) {
      // ignore
    }

    return () => {
      window.removeEventListener('select-biodata-template', handleTemplateSelect);
    };
  }, [language]);

  const handleInputChange = (field: keyof BiodataData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert(language === 'bn' ? 'অনুগ্রহ করে ১০ MB-র কম সাইজের ছবি নির্বাচন করুন।' : 'Please choose an image under 10 MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // High quality Retina downscale to max 800px to ensure it fits safely in localStorage & renders crisp
        const canvas = document.createElement('canvas');
        const maxDim = 800;
        let width = img.width;
        let height = img.height;

        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL('image/jpeg', 0.88);
          setData((prev) => ({ ...prev, photoUrl: compressed }));
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    setData((prev) => ({ ...prev, photoUrl: null }));
  };

  const handleReset = () => {
    if (window.confirm(t.resetConfirm)) {
      const resetData = getInitialData(formatType);
      if (initialHeaderText) resetData.headerText = initialHeaderText;
      if (initialTitle) resetData.title = initialTitle;
      setData(resetData);
      setSelectedTemplate(isMuslim ? 'emerald-divine' : 'royal-maroon');
      localStorage.removeItem(storageKey);
    }
  };

  const handleClearAll = () => {
    if (window.confirm(language === 'bn' ? 'আপনি কি সব ঘর খালি করতে চান?' : 'Clear all fields?')) {
      setData({
        headerText: data.headerText || (isMuslim ? 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ' : '|| श्री गणेशाय नमः ||'),
        title: data.title || (isMuslim ? 'ISLAMIC NIKAH BIODATA' : 'MARRIAGE BIODATA'),
        fullName: '',
        gender: 'male',
        dob: '',
        birthTime: '',
        birthPlace: '',
        height: '',
        complexion: '',
        bloodGroup: '',
        motherTongue: '',
        maritalStatus: '',
        diet: isMuslim ? 'Halal (Non-Vegetarian)' : '',
        religion: isMuslim ? 'Islam' : '',
        caste: '',
        subCaste: '',
        gotra: '',
        rashi: '',
        nakshatra: '',
        manglik: '',
        sect: '',
        namaz: '',
        roza: '',
        quran: '',
        education: '',
        collegeUniversity: '',
        occupation: '',
        jobTitle: '',
        companyName: '',
        income: '',
        workLocation: '',
        fatherName: '',
        fatherOccupation: '',
        motherName: '',
        motherOccupation: '',
        totalBrothers: '',
        marriedBrothers: '',
        totalSisters: '',
        marriedSisters: '',
        familyType: '',
        familyValues: '',
        nativePlace: '',
        contactPerson: '',
        primaryPhone: '',
        secondaryPhone: '',
        email: '',
        address: '',
        photoUrl: null
      });
    }
  };

  const handleCopyLink = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 3000);
    }
  };

  const trackEvent = (eventName: string, params: Record<string, any> = {}) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, params);
    }
  };

  const shareOnWhatsApp = () => {
    trackEvent('share_whatsapp', { event_category: 'social' });
    const text = encodeURIComponent(
      `Create elegant, 100% Free Marriage Biodata with Photo without watermark or login: ${window.location.href}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  // Dynamically Imported Export for Maximum Core Web Vitals Performance
  const downloadImage = async () => {
    if (!biodataRef.current) return;
    setIsExporting(true);
    setExportMessage(t.generatingImage);

    try {
      if (typeof document !== 'undefined' && document.fonts) {
        await document.fonts.ready;
      }
      const html2canvas = (await import('html2canvas')).default;
      const confetti = (await import('canvas-confetti')).default;

      const canvas = await html2canvas(biodataRef.current, {
        scale: 2.5, // Crisp HD resolution
        useCORS: true,
        backgroundColor: null,
        windowWidth: 1200,
        scrollX: 0,
        scrollY: 0,
        onclone: (clonedDoc) => {
          const el = clonedDoc.getElementById('biodata-preview-sheet');
          if (el) {
            el.style.width = '520px';
            el.style.maxWidth = '520px';
            el.style.overflow = 'visible';
            const allElements = el.querySelectorAll('*');
            allElements.forEach((node) => {
              const htmlEl = node as HTMLElement;
              if (htmlEl.style) {
                htmlEl.style.webkitLineClamp = 'unset';
              }
            });
          }
        }
      });

      const link = document.createElement('a');
      link.download = `${data.fullName ? data.fullName.trim().replace(/\s+/g, '_') : 'Marriage'}_Biodata.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();

      trackEvent('download_image', {
        event_category: 'conversion',
        template_id: currentTemplate.id,
        template_name: currentTemplate.name,
        language: language
      });

      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });

      setExportMessage(t.imageSuccess);
      setTimeout(() => setExportMessage(''), 3000);
    } catch (err) {
      console.error(err);
      alert('Error generating image. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  // Dynamically Imported A4 PDF Generator
  const downloadPdf = async () => {
    if (!biodataRef.current) return;
    setIsExporting(true);
    setExportMessage(t.generatingPdf);

    try {
      if (typeof document !== 'undefined' && document.fonts) {
        await document.fonts.ready;
      }
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');
      const confetti = (await import('canvas-confetti')).default;

      const canvas = await html2canvas(biodataRef.current, {
        scale: 2.5,
        useCORS: true,
        backgroundColor: null,
        windowWidth: 1200,
        scrollX: 0,
        scrollY: 0,
        onclone: (clonedDoc) => {
          const el = clonedDoc.getElementById('biodata-preview-sheet');
          if (el) {
            el.style.width = '520px';
            el.style.maxWidth = '520px';
            el.style.overflow = 'visible';
            const allElements = el.querySelectorAll('*');
            allElements.forEach((node) => {
              const htmlEl = node as HTMLElement;
              if (htmlEl.style) {
                htmlEl.style.webkitLineClamp = 'unset';
              }
            });
          }
        }
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth(); // 210mm
      const pageHeight = pdf.internal.pageSize.getHeight(); // 297mm

      let renderWidth = pageWidth;
      let renderHeight = (canvas.height * pageWidth) / canvas.width;

      if (renderHeight > pageHeight) {
        const scale = pageHeight / renderHeight;
        renderWidth = renderWidth * scale;
        renderHeight = pageHeight;
        const xOffset = (pageWidth - renderWidth) / 2;
        pdf.addImage(imgData, 'JPEG', xOffset, 0, renderWidth, renderHeight);
      } else {
        pdf.addImage(imgData, 'JPEG', 0, 0, renderWidth, renderHeight);
      }

      pdf.save(`${data.fullName ? data.fullName.trim().replace(/\s+/g, '_') : 'Marriage'}_Biodata.pdf`);

      trackEvent('download_pdf', {
        event_category: 'conversion',
        template_id: currentTemplate.id,
        template_name: currentTemplate.name,
        language: language
      });

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      setExportMessage(t.pdfSuccess);
      setTimeout(() => setExportMessage(''), 3000);
    } catch (err) {
      console.error(err);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  // Direct A4 Print Handler (Displays ONLY the Biodata sheet in print preview)
  const handlePrint = () => {
    trackEvent('print_biodata', {
      event_category: 'engagement',
      template_id: currentTemplate.id,
      template_name: currentTemplate.name,
      language: language
    });

    if (mobileTab !== 'preview') {
      setMobileTab('preview');
    }
    const originalTitle = document.title;
    if (data.fullName && data.fullName.trim()) {
      document.title = `${data.fullName.trim()} - Marriage Biodata`;
    }
    setTimeout(() => {
      window.print();
      setTimeout(() => {
        document.title = originalTitle;
      }, 500);
    }, 100);
  };

  return (
    <div id="builder" className="space-y-8 scroll-mt-24">
      {/* Top Banner Toolbar */}
      <div className="no-print bg-white rounded-2xl p-3 sm:p-6 shadow-md border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 overflow-hidden w-full max-w-full">
        {/* App Title & Value Prop */}
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center font-bold shrink-0">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-rose-600" />
          </div>
          <div className="min-w-0">
            <h3 className="text-sm sm:text-lg font-black text-slate-800 truncate">
              {t.appTitle}
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-500 line-clamp-1">
              {t.appSubtitle}
            </p>
          </div>
        </div>

        {/* Language Switcher + Quick Actions */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 justify-between md:justify-end">
          {/* Multilingual Selector */}
          <div className="inline-flex items-center bg-slate-100 p-0.5 sm:p-1 rounded-xl border border-slate-200 text-[11px] sm:text-xs font-bold text-slate-700">
            <Globe className="w-3 h-3 ml-1 mr-1 text-slate-500 shrink-0" />
            {(['bn', 'en', 'hi', 'mr'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={`px-1.5 sm:px-2.5 py-1 rounded-lg transition text-[11px] sm:text-xs font-bold shrink-0 ${
                  language === lang
                    ? 'bg-rose-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {lang === 'bn' && 'বাংলা'}
                {lang === 'en' && 'English'}
                {lang === 'hi' && 'हिन्दी'}
                {lang === 'mr' && 'मराठी'}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Copy Site Link */}
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 text-xs font-bold px-2 py-1.5 sm:px-3 sm:py-2 rounded-xl transition"
              title={t.share}
            >
              {copyFeedback ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copyFeedback ? 'Copied!' : t.share}</span>
            </button>

            {/* Reset / Clear */}
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1 bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-700 border border-slate-200 text-xs font-bold px-2 py-1.5 sm:px-3 sm:py-2 rounded-xl transition"
              title={t.reset}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.reset}</span>
            </button>
          </div>
        </div>
      </div>

      {exportMessage && (
        <div className="no-print p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xl text-center text-sm font-bold animate-pulse">
          {exportMessage}
        </div>
      )}

      {/* Mobile Tab Switcher: 1. Fill Form vs 2. Preview & Download (Visible on mobile screens < lg) */}
      <div className="no-print lg:hidden flex bg-slate-200/80 p-1.5 rounded-2xl border border-slate-300/80 shadow-xs">
        <button
          type="button"
          onClick={() => {
            setMobileTab('edit');
            const el = document.getElementById('builder-form-card');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
          className={`flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition ${
            mobileTab === 'edit'
              ? 'bg-white text-rose-700 shadow-sm border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Edit3 className="w-4 h-4" />
          <span>1. Fill Form</span>
        </button>
        <button
          type="button"
          onClick={() => {
            setMobileTab('preview');
            const el = document.getElementById('builder-preview-card');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
          className={`flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition ${
            mobileTab === 'preview'
              ? 'bg-rose-700 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>2. View Preview & Download</span>
        </button>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Data Input Form (6 Cols) */}
        <div
          id="builder-form-card"
          className={`no-print lg:col-span-6 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden ${
            mobileTab === 'preview' ? 'hidden lg:block' : 'block'
          }`}
        >
          {/* Template Picker Header */}
          <div className="p-4 bg-slate-50 border-b border-slate-200">
            <div className="flex items-center justify-between mb-2.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                <Palette className="w-4 h-4 text-rose-600" />
                {t.themeSelect}
              </label>
              <button
                onClick={handleClearAll}
                className="text-[11px] font-semibold text-slate-500 hover:text-rose-700 underline"
              >
                {t.clearAll}
              </button>
            </div>
            <div className="flex overflow-x-auto pb-2 scrollbar-none snap-x gap-2 sm:grid sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
              {availableTemplates.map((tmpl) => (
                <button
                  key={tmpl.id}
                  onClick={() => handleApplyTemplate(tmpl.id)}
                  className={`p-2 rounded-xl border text-center transition flex flex-col items-center justify-between gap-1.5 relative group shrink-0 min-w-[108px] sm:min-w-0 snap-start ${
                    selectedTemplate === tmpl.id
                      ? 'border-rose-600 bg-rose-50/70 ring-2 ring-rose-500/40 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                  }`}
                >
                  {selectedTemplate === tmpl.id && (
                    <span className="absolute -top-1.5 -right-1.5 bg-rose-600 text-white rounded-full p-0.5 shadow-xs z-10">
                      <Check className="w-3 h-3" />
                    </span>
                  )}
                  {/* Miniature Visual Mockup */}
                  <div className="w-full">
                    {tmpl.id === 'royal-maroon' && (
                      <div className="w-full h-11 rounded-lg border border-amber-500/80 bg-gradient-to-b from-[#380812] to-[#28040d] flex flex-col items-center justify-center p-1 relative overflow-hidden shadow-2xs">
                        <div className="w-4 h-4 rounded-full border border-dashed border-amber-400 bg-amber-950/80 flex items-center justify-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                        </div>
                        <div className="w-10 h-0.5 bg-amber-400/80 rounded mt-1"></div>
                      </div>
                    )}
                    {tmpl.id === 'saffron-gold' && (
                      <div className="w-full h-11 rounded-lg border border-amber-600/80 bg-[#fcf9f2] flex flex-col items-center justify-center p-1 relative overflow-hidden shadow-2xs">
                        <div className="w-10 h-0.5 bg-amber-600 rounded"></div>
                        <div className="w-4 h-4 rounded-full border border-amber-500 bg-amber-100 flex items-center justify-center my-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                        </div>
                        <div className="w-8 h-0.5 bg-slate-300 rounded"></div>
                      </div>
                    )}
                    {tmpl.id === 'emerald-divine' && (
                      <div className="w-full h-11 rounded-lg border border-emerald-400/80 bg-gradient-to-b from-[#064e3b] to-[#022c22] flex flex-col items-center justify-center p-1 relative overflow-hidden shadow-2xs">
                        <div className="w-10 h-0.5 bg-emerald-400 rounded"></div>
                        <div className="w-4 h-4 rounded-t-full border border-amber-300 bg-emerald-950 flex items-center justify-center my-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-300"></span>
                        </div>
                        <div className="w-8 h-0.5 bg-emerald-300/60 rounded"></div>
                      </div>
                    )}
                    {tmpl.id === 'regal-blue' && (
                      <div className="w-full h-11 rounded-lg border border-amber-500/80 bg-gradient-to-b from-[#0f172a] to-[#1e3a8a] flex flex-col items-center justify-center p-1 relative overflow-hidden shadow-2xs">
                        <div className="w-10 h-0.5 bg-amber-400 rounded"></div>
                        <div className="w-4 h-4 rounded border border-amber-300 bg-slate-900 flex items-center justify-center my-0.5">
                          <span className="w-1.5 h-1.5 bg-amber-400"></span>
                        </div>
                        <div className="w-8 h-0.5 bg-blue-200/60 rounded"></div>
                      </div>
                    )}
                    {tmpl.id === 'rose-gold' && (
                      <div className="w-full h-11 rounded-lg border border-rose-300 bg-gradient-to-b from-rose-50 to-pink-50 flex flex-col items-center justify-center p-1 relative overflow-hidden shadow-2xs">
                        <div className="w-10 h-0.5 bg-rose-400 rounded"></div>
                        <div className="w-4 h-4 rounded-full border border-rose-400 bg-rose-100 flex items-center justify-center my-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                        </div>
                        <div className="w-8 h-0.5 bg-rose-200 rounded"></div>
                      </div>
                    )}
                    {tmpl.id === 'peacock-teal' && (
                      <div className="w-full h-11 rounded-lg border border-teal-400 bg-gradient-to-b from-[#042f2e] to-[#0f766e] flex flex-col items-center justify-center p-1 relative overflow-hidden shadow-2xs">
                        <div className="w-10 h-0.5 bg-amber-300 rounded"></div>
                        <div className="w-4 h-4 rounded-full border border-teal-300 bg-teal-950 flex items-center justify-center my-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-300"></span>
                        </div>
                        <div className="w-8 h-0.5 bg-teal-200/60 rounded"></div>
                      </div>
                    )}
                    {tmpl.id === 'classic-elegance' && (
                      <div className="w-full h-11 rounded-lg border border-slate-700 bg-white flex flex-col items-center justify-center p-1 relative overflow-hidden shadow-2xs">
                        <div className="w-10 h-0.5 bg-slate-800 rounded"></div>
                        <div className="w-4 h-4 rounded border border-slate-800 bg-slate-100 flex items-center justify-center my-0.5">
                          <span className="w-1.5 h-1.5 bg-slate-700"></span>
                        </div>
                        <div className="w-8 h-0.5 bg-slate-300 rounded"></div>
                      </div>
                    )}
                    {tmpl.id === 'temple-gold' && (
                      <div className="w-full h-11 rounded-lg border border-amber-600 bg-[#fffdf9] flex flex-col items-center justify-center p-1 relative overflow-hidden shadow-2xs">
                        <div className="w-10 h-0.5 bg-amber-700 rounded"></div>
                        <div className="w-4 h-4 rounded-full border border-amber-600 bg-amber-100 flex items-center justify-center my-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-700"></span>
                        </div>
                        <div className="w-8 h-0.5 bg-amber-300 rounded"></div>
                      </div>
                    )}
                    {tmpl.id === 'ruby-crimson' && (
                      <div className="w-full h-11 rounded-lg border border-rose-700 bg-gradient-to-b from-[#fffaf8] to-rose-50 flex flex-col items-center justify-center p-1 relative overflow-hidden shadow-2xs">
                        <div className="w-10 h-0.5 bg-rose-700 rounded"></div>
                        <div className="w-4 h-4 rounded border border-rose-600 bg-rose-100 flex items-center justify-center my-0.5">
                          <span className="w-1.5 h-1.5 bg-rose-700"></span>
                        </div>
                        <div className="w-8 h-0.5 bg-rose-300 rounded"></div>
                      </div>
                    )}
                    {tmpl.id === 'lavender-blossom' && (
                      <div className="w-full h-11 rounded-lg border border-purple-400 bg-gradient-to-b from-purple-50 to-fuchsia-50 flex flex-col items-center justify-center p-1 relative overflow-hidden shadow-2xs">
                        <div className="w-10 h-0.5 bg-purple-700 rounded"></div>
                        <div className="w-4 h-4 rounded-full border border-purple-400 bg-purple-100 flex items-center justify-center my-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
                        </div>
                        <div className="w-8 h-0.5 bg-purple-200 rounded"></div>
                      </div>
                    )}
                    {tmpl.id === 'sapphire-noor' && (
                      <div className="w-full h-11 rounded-lg border border-blue-400 bg-gradient-to-b from-[#0a192f] to-[#071324] flex flex-col items-center justify-center p-1 relative overflow-hidden shadow-2xs">
                        <div className="w-10 h-0.5 bg-blue-400 rounded"></div>
                        <div className="w-4 h-4 rounded-full border border-amber-300 bg-blue-950 flex items-center justify-center my-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-300"></span>
                        </div>
                        <div className="w-8 h-0.5 bg-blue-300/60 rounded"></div>
                      </div>
                    )}
                  </div>
                  <div className="w-full">
                    <span className="text-[11px] font-bold text-slate-800 line-clamp-1 leading-tight block">
                      {tmpl.name.split(' (')[0]}
                    </span>
                    <span className="text-[9px] font-semibold text-rose-700 bg-rose-50 px-1 py-0.2 rounded mt-0.5 inline-block">
                      {tmpl.badge.split(' ')[0]}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Form Navigation Tabs */}
          <div className="flex border-b border-slate-200 bg-slate-100/70 overflow-x-auto text-xs font-bold text-slate-600 scrollbar-none">
            {[
              { id: 'personal', label: t.tabPersonal, icon: User },
              { id: 'astrology', label: isMuslim ? t.tabIslamic : t.tabHoroscope, icon: BookOpen },
              { id: 'education', label: t.tabEducation, icon: Briefcase },
              { id: 'family', label: t.tabFamily, icon: Users },
              { id: 'contact', label: t.tabContact, icon: Phone },
              { id: 'photo', label: t.tabPhoto, icon: ImageIcon }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-4 py-3 whitespace-nowrap border-b-2 transition ${
                    activeTab === tab.id
                      ? 'border-rose-600 text-rose-800 bg-white'
                      : 'border-transparent hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Form Fields Body */}
          <div className="p-3.5 sm:p-6 space-y-4 max-h-[680px] overflow-y-auto">
            {/* Header Texts */}
            <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-bold text-amber-900 mb-1">
                  {t.headerMotto}
                </label>
                <input
                  type="text"
                  value={data.headerText}
                  onChange={(e) => handleInputChange('headerText', e.target.value)}
                  placeholder={isMuslim ? 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ' : '|| श्री गणेशाय नमः ||'}
                  className="w-full bg-white border border-amber-300 rounded-lg p-2 text-xs font-medium outline-none focus:border-rose-600"
                />
              </div>
              <div>
                <label className="block font-bold text-amber-900 mb-1">
                  {t.biodataTitle}
                </label>
                <input
                  type="text"
                  value={data.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder={isMuslim ? 'ISLAMIC NIKAH BIODATA' : 'MARRIAGE BIODATA'}
                  className="w-full bg-white border border-amber-300 rounded-lg p-2 text-xs font-medium outline-none focus:border-rose-600"
                />
              </div>
            </div>

            {/* TAB 1: Personal Details */}
            {activeTab === 'personal' && (
              <div className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">{t.fullName}</label>
                  <input
                    type="text"
                    value={data.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder={isMuslim ? 'Mohammed Farhan Ali' : 'Rahul Sharma'}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm font-semibold outline-none focus:border-rose-600 focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">{t.dob}</label>
                    <input
                      type="text"
                      value={data.dob}
                      onChange={(e) => handleInputChange('dob', e.target.value)}
                      placeholder="15/08/1996"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 outline-none focus:border-rose-600 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">{t.birthTime}</label>
                    <input
                      type="text"
                      value={data.birthTime}
                      onChange={(e) => handleInputChange('birthTime', e.target.value)}
                      placeholder="06:45 AM"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 outline-none focus:border-rose-600 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">{t.birthPlace}</label>
                    <input
                      type="text"
                      value={data.birthPlace}
                      onChange={(e) => handleInputChange('birthPlace', e.target.value)}
                      placeholder={isMuslim ? 'Hyderabad, Telangana' : 'Kolkata, WB / Pune, MH'}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 outline-none focus:border-rose-600 focus:bg-white"
                    />
                  </div>
                  <SmartSelectField
                    label={t.height}
                    value={data.height}
                    options={HEIGHT_OPTIONS}
                    onChange={(val) => handleInputChange('height', val)}
                    placeholder="Select height..."
                    customPlaceholder="Type custom height (e.g. 5 ft 10 in)..."
                  />
                </div>

                <div className="grid grid-cols-3 gap-2.5">
                  <SmartSelectField
                    label={t.complexion}
                    value={data.complexion}
                    options={COMPLEXION_OPTIONS[language] || COMPLEXION_OPTIONS.en}
                    onChange={(val) => handleInputChange('complexion', val)}
                    placeholder="Select complexion..."
                    customPlaceholder="Type custom complexion..."
                  />
                  <SmartSelectField
                    label={t.bloodGroup}
                    value={data.bloodGroup}
                    options={BLOOD_GROUP_OPTIONS}
                    onChange={(val) => handleInputChange('bloodGroup', val)}
                    placeholder="Select blood group..."
                    customPlaceholder="Type custom blood group..."
                  />
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">{t.motherTongue}</label>
                    <input
                      type="text"
                      value={data.motherTongue}
                      onChange={(e) => handleInputChange('motherTongue', e.target.value)}
                      placeholder={isMuslim ? 'Urdu / English' : 'Bengali / Hindi'}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 outline-none focus:border-rose-600 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <SmartSelectField
                    label={t.maritalStatus}
                    value={data.maritalStatus}
                    options={MARITAL_STATUS_OPTIONS[language] || MARITAL_STATUS_OPTIONS.en}
                    onChange={(val) => handleInputChange('maritalStatus', val)}
                    placeholder="Select marital status..."
                    customPlaceholder="Type custom marital status..."
                  />
                  <SmartSelectField
                    label={t.diet}
                    value={data.diet}
                    options={DIET_OPTIONS[language] || DIET_OPTIONS.en}
                    onChange={(val) => handleInputChange('diet', val)}
                    placeholder="Select diet preference..."
                    customPlaceholder="Type custom diet..."
                  />
                </div>
              </div>
            )}

            {/* TAB 2: Horoscope / Islamic & Religion */}
            {activeTab === 'astrology' && (
              <div className="space-y-3.5 text-xs">
                {isMuslim ? (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">{t.religion}</label>
                        <input
                          type="text"
                          value={data.religion}
                          onChange={(e) => handleInputChange('religion', e.target.value)}
                          placeholder="Islam"
                          className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 outline-none focus:border-rose-600 focus:bg-white font-medium"
                        />
                      </div>
                      <SmartSelectField
                        label={t.sect}
                        value={data.sect || ''}
                        options={MUSLIM_SECT_OPTIONS}
                        onChange={(val) => handleInputChange('sect', val)}
                        placeholder="Select sect..."
                        customPlaceholder="Type sect (e.g. Sunni, Shia)..."
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">{t.biradari}</label>
                        <input
                          type="text"
                          value={data.caste}
                          onChange={(e) => handleInputChange('caste', e.target.value)}
                          placeholder="Syed, Sheikh, Pathan, Ansari, Qureshi..."
                          className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 outline-none focus:border-rose-600 focus:bg-white"
                        />
                      </div>
                      <SmartSelectField
                        label={t.namaz}
                        value={data.namaz || ''}
                        options={MUSLIM_NAMAZ_OPTIONS}
                        onChange={(val) => handleInputChange('namaz', val)}
                        placeholder="Select namaz..."
                        customPlaceholder="Type namaz details..."
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <SmartSelectField
                        label={t.roza}
                        value={data.roza || ''}
                        options={MUSLIM_ROZA_OPTIONS}
                        onChange={(val) => handleInputChange('roza', val)}
                        placeholder="Select fasting..."
                        customPlaceholder="Type roza details..."
                      />
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">{t.quran}</label>
                        <input
                          type="text"
                          value={data.quran || ''}
                          onChange={(e) => handleInputChange('quran', e.target.value)}
                          placeholder="Fluent Reciter (Tajweed) / Hafiz-e-Quran"
                          className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 outline-none focus:border-rose-600 focus:bg-white"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">{t.religion}</label>
                        <input
                          type="text"
                          value={data.religion}
                          onChange={(e) => handleInputChange('religion', e.target.value)}
                          placeholder="Hindu / Jain / Sikh"
                          className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 outline-none focus:border-rose-600 focus:bg-white"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">{t.caste}</label>
                        <input
                          type="text"
                          value={data.caste}
                          onChange={(e) => handleInputChange('caste', e.target.value)}
                          placeholder="Brahmin, Kayastha, Maratha..."
                          className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 outline-none focus:border-rose-600 focus:bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">{t.subCaste}</label>
                        <input
                          type="text"
                          value={data.subCaste}
                          onChange={(e) => handleInputChange('subCaste', e.target.value)}
                          placeholder="Kulin / 96 Kuli"
                          className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 outline-none focus:border-rose-600 focus:bg-white"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">{t.gotra}</label>
                        <input
                          type="text"
                          value={data.gotra}
                          onChange={(e) => handleInputChange('gotra', e.target.value)}
                          placeholder="Kashyap, Shandilya, Bharadwaj"
                          className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 outline-none focus:border-rose-600 focus:bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2.5">
                      <SmartSelectField
                        label={t.rashi}
                        value={data.rashi}
                        options={RASHI_OPTIONS[language] || RASHI_OPTIONS.en}
                        onChange={(val) => handleInputChange('rashi', val)}
                        placeholder="Select rashi..."
                        customPlaceholder="Type custom rashi..."
                      />
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">{t.nakshatra}</label>
                        <input
                          type="text"
                          value={data.nakshatra}
                          onChange={(e) => handleInputChange('nakshatra', e.target.value)}
                          placeholder="Magha / Rohini"
                          className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 outline-none focus:border-rose-600 focus:bg-white"
                        />
                      </div>
                      <SmartSelectField
                        label={t.manglik}
                        value={data.manglik}
                        options={MANGLIK_OPTIONS[language] || MANGLIK_OPTIONS.en}
                        onChange={(val) => handleInputChange('manglik', val)}
                        placeholder="Select manglik..."
                        customPlaceholder="Type custom manglik..."
                      />
                    </div>
                  </>
                )}
              </div>
            )}

            {/* TAB 3: Education & Career */}
            {activeTab === 'education' && (
              <div className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">{t.education} *</label>
                  <input
                    type="text"
                    value={data.education}
                    onChange={(e) => handleInputChange('education', e.target.value)}
                    placeholder="B.Tech, MBA, MBBS, M.Sc..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 outline-none focus:border-rose-600 focus:bg-white font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">{t.collegeUniversity}</label>
                  <input
                    type="text"
                    value={data.collegeUniversity}
                    onChange={(e) => handleInputChange('collegeUniversity', e.target.value)}
                    placeholder="Jadavpur University / Delhi University"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 outline-none focus:border-rose-600 focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">{t.occupation}</label>
                    <input
                      type="text"
                      value={data.occupation}
                      onChange={(e) => handleInputChange('occupation', e.target.value)}
                      placeholder="Private Job / Govt Service / Business"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 outline-none focus:border-rose-600 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">{t.jobTitle}</label>
                    <input
                      type="text"
                      value={data.jobTitle}
                      onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                      placeholder="Senior Software Engineer, Doctor, etc."
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 outline-none focus:border-rose-600 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">{t.companyName}</label>
                    <input
                      type="text"
                      value={data.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      placeholder="MNC Firm / Govt Dept."
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 outline-none focus:border-rose-600 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">{t.income}</label>
                    <input
                      type="text"
                      value={data.income}
                      onChange={(e) => handleInputChange('income', e.target.value)}
                      placeholder="₹ 18,00,000 / Annum"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 outline-none focus:border-rose-600 focus:bg-white font-bold text-rose-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">{t.workLocation}</label>
                  <input
                    type="text"
                    value={data.workLocation}
                    onChange={(e) => handleInputChange('workLocation', e.target.value)}
                    placeholder="Kolkata / Bangalore / Remote"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 outline-none focus:border-rose-600 focus:bg-white"
                  />
                </div>
              </div>
            )}

            {/* TAB 4: Family Details */}
            {activeTab === 'family' && (
              <div className="space-y-3.5 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">{t.fatherName}</label>
                    <input
                      type="text"
                      value={data.fatherName}
                      onChange={(e) => handleInputChange('fatherName', e.target.value)}
                      placeholder={isMuslim ? "Mr. Mohammed Rafiq Ali" : "Mr. Ramesh Sharma"}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 outline-none focus:border-rose-600 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">{t.fatherOccupation}</label>
                    <input
                      type="text"
                      value={data.fatherOccupation}
                      onChange={(e) => handleInputChange('fatherOccupation', e.target.value)}
                      placeholder="Business / Retired Officer"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 outline-none focus:border-rose-600 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">{t.motherName}</label>
                    <input
                      type="text"
                      value={data.motherName}
                      onChange={(e) => handleInputChange('motherName', e.target.value)}
                      placeholder={isMuslim ? "Mrs. Parveen Begum" : "Mrs. Sunita Sharma"}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 outline-none focus:border-rose-600 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">{t.motherOccupation}</label>
                    <input
                      type="text"
                      value={data.motherOccupation}
                      onChange={(e) => handleInputChange('motherOccupation', e.target.value)}
                      placeholder="Homemaker / Teacher"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 outline-none focus:border-rose-600 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">{t.totalBrothers}</label>
                    <input
                      type="text"
                      value={data.totalBrothers}
                      onChange={(e) => handleInputChange('totalBrothers', e.target.value)}
                      placeholder="1 (Elder, Married)"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 outline-none focus:border-rose-600 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">{t.totalSisters}</label>
                    <input
                      type="text"
                      value={data.totalSisters}
                      onChange={(e) => handleInputChange('totalSisters', e.target.value)}
                      placeholder="1 (Younger, Unmarried)"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 outline-none focus:border-rose-600 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <SmartSelectField
                    label={t.familyType}
                    value={data.familyType}
                    options={FAMILY_TYPE_OPTIONS[language] || FAMILY_TYPE_OPTIONS.en}
                    onChange={(val) => handleInputChange('familyType', val)}
                    placeholder="Select family type..."
                    customPlaceholder="Type family type..."
                  />
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">{t.nativePlace}</label>
                    <input
                      type="text"
                      value={data.nativePlace}
                      onChange={(e) => handleInputChange('nativePlace', e.target.value)}
                      placeholder={isMuslim ? "Hyderabad, Telangana" : "Burdwan, WB / Pune, MH"}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 outline-none focus:border-rose-600 focus:bg-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: Contact Info */}
            {activeTab === 'contact' && (
              <div className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">{t.contactPerson}</label>
                  <input
                    type="text"
                    value={data.contactPerson}
                    onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                    placeholder={isMuslim ? "Mr. Mohammed Rafiq Ali (Father)" : "Mr. Ramesh Sharma (Father)"}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 outline-none focus:border-rose-600 focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">{t.primaryPhone}</label>
                    <input
                      type="text"
                      value={data.primaryPhone}
                      onChange={(e) => handleInputChange('primaryPhone', e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 outline-none focus:border-rose-600 focus:bg-white font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">{t.secondaryPhone}</label>
                    <input
                      type="text"
                      value={data.secondaryPhone}
                      onChange={(e) => handleInputChange('secondaryPhone', e.target.value)}
                      placeholder="+91 91234 56789"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 outline-none focus:border-rose-600 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">{t.email}</label>
                  <input
                    type="email"
                    value={data.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder={isMuslim ? "family.nikah@example.com" : "family.contact@example.com"}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 outline-none focus:border-rose-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">{t.address}</label>
                  <textarea
                    rows={2}
                    value={data.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder={isMuslim ? "Banjara Hills, Road No 12, Hyderabad - 500034" : "House No, Road, City, PIN"}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 outline-none focus:border-rose-600 focus:bg-white"
                  ></textarea>
                </div>
              </div>
            )}

            {/* TAB 6: Photo Upload */}
            {activeTab === 'photo' && (
              <div className="space-y-4 text-xs">
                <div className="p-4 bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl text-center">
                  {data.photoUrl ? (
                    <div className="space-y-3">
                      <img
                        src={data.photoUrl}
                        alt="Profile preview"
                        className="w-28 h-36 object-cover mx-auto rounded-xl shadow-md border-2 border-rose-600"
                      />
                      <button
                        onClick={removePhoto}
                        className="inline-flex items-center gap-1.5 text-xs text-rose-700 font-bold hover:text-rose-900 bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-200 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>{t.photoRemove}</span>
                      </button>
                    </div>
                  ) : (
                    <div>
                      <ImageIcon className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                      <label className="block font-bold text-slate-700 mb-1 cursor-pointer text-sm">
                        {t.photoUploadTitle}
                      </label>
                      <p className="text-[11px] text-slate-400 mb-3">
                        {t.photoUploadDesc}
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100 cursor-pointer"
                      />
                    </div>
                  )}
                </div>

                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800 text-[11px] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    <strong>100% Privacy:</strong> {t.photoPrivacyNote}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Bottom Quick-Jump to Preview Button */}
          <div className="lg:hidden p-3.5 bg-slate-50 border-t border-slate-200">
            <button
              type="button"
              onClick={() => {
                setMobileTab('preview');
                const el = document.getElementById('builder-preview-card');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-rose-700 to-rose-800 hover:from-rose-800 hover:to-rose-900 text-white font-bold text-sm py-3 px-4 rounded-xl shadow-md transition"
            >
              <Eye className="w-4 h-4 text-amber-300" />
              <span>Preview Biodata & Download →</span>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Live Visual Sheet Preview (6 Cols) */}
        <div
          id="builder-preview-card"
          className={`lg:col-span-6 flex flex-col items-center ${
            mobileTab === 'edit' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          {/* Mobile Back-to-Edit Top Bar */}
          <div className="no-print lg:hidden w-full max-w-[520px] mb-3 flex items-center justify-between bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
            <button
              type="button"
              onClick={() => {
                setMobileTab('edit');
                const el = document.getElementById('builder-form-card');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 py-1.5 px-3 rounded-lg transition"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>← Edit Form Details</span>
            </button>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Live Preview
            </span>
          </div>

          <div className="no-print w-full flex items-center justify-between mb-3 px-2">
            <span className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-rose-600" />
              {t.livePreview}
            </span>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
              {t.hdQuality}
            </span>
          </div>

          {/* THE ACTUAL PRINTABLE / EXPORTABLE BIODATA SHEET */}
          {(() => {
            const isEmeraldIslamic = selectedTemplate === 'emerald-divine';
            const isSapphireIslamic = selectedTemplate === 'sapphire-noor';
            const isDarkIslamic = isEmeraldIslamic || isSapphireIslamic;
            const isSaffronHindu = selectedTemplate === 'saffron-gold';
            const isTempleGold = selectedTemplate === 'temple-gold';
            const isRubyCrimson = selectedTemplate === 'ruby-crimson';
            const isLavenderLuxe = selectedTemplate === 'lavender-blossom';
            const isRoyalMaroon = selectedTemplate === 'royal-maroon';

            // Theme Styling Tokens
            let sheetClasses = `w-full max-w-[520px] rounded-xl shadow-2xl border-2 sm:border-4 p-3.5 sm:p-8 space-y-3 sm:space-y-4 transition-all duration-200 font-serif relative overflow-hidden`;
            let sheetInlineStyle: React.CSSProperties = { borderColor: currentTemplate.borderColor };

            let headingColor = currentTemplate.primaryColor;
            let headingBorderColor = currentTemplate.secondaryColor;
            let labelColor = 'text-slate-800 font-bold';
            let colonColor = 'text-slate-400 font-bold';
            let valueColor = 'text-slate-900 font-medium';
            let photoBorder = currentTemplate.borderColor;

            if (isEmeraldIslamic) {
              sheetClasses += ' bg-gradient-to-b from-[#092d2d] via-[#0e3a3a] to-[#072424] text-emerald-100 border-[#d4af37]';
              sheetInlineStyle = { borderColor: '#d4af37' };
              headingColor = '#facc15';
              headingBorderColor = 'rgba(250, 204, 21, 0.4)';
              labelColor = 'text-amber-300 font-medium';
              colonColor = 'text-amber-400 font-bold';
              valueColor = 'text-white font-semibold';
              photoBorder = '#facc15';
            } else if (isSapphireIslamic) {
              sheetClasses += ' bg-gradient-to-b from-[#0a192f] via-[#112240] to-[#071324] text-blue-100 border-blue-400';
              sheetInlineStyle = { borderColor: '#60a5fa' };
              headingColor = '#facc15';
              headingBorderColor = 'rgba(250, 204, 21, 0.4)';
              labelColor = 'text-amber-300 font-medium';
              colonColor = 'text-amber-400 font-bold';
              valueColor = 'text-white font-semibold';
              photoBorder = '#facc15';
            } else if (isSaffronHindu) {
              sheetClasses += ' bg-[#fcf9f2] text-slate-800 border-amber-600/90 shadow-amber-900/10';
              sheetInlineStyle = { borderColor: '#c2410c' };
              headingColor = '#7c2d12';
              headingBorderColor = 'rgba(194, 65, 12, 0.4)';
              labelColor = 'text-amber-950 font-bold';
              colonColor = 'text-amber-700 font-bold';
              valueColor = 'text-slate-800 font-medium';
              photoBorder = '#d97706';
            } else if (isTempleGold) {
              sheetClasses += ' bg-[#fffdf9] text-amber-950 border-amber-600 shadow-amber-900/10';
              sheetInlineStyle = { borderColor: '#ca8a04' };
              headingColor = '#854d0e';
              headingBorderColor = 'rgba(202, 138, 4, 0.4)';
              labelColor = 'text-amber-900 font-bold';
              colonColor = 'text-amber-700 font-bold';
              valueColor = 'text-amber-950 font-medium';
              photoBorder = '#ca8a04';
            } else if (isRubyCrimson) {
              sheetClasses += ' bg-[#fffaf8] text-slate-900 border-rose-700 shadow-rose-900/10';
              sheetInlineStyle = { borderColor: '#be123c' };
              headingColor = '#9f1239';
              headingBorderColor = 'rgba(225, 29, 72, 0.4)';
              labelColor = 'text-rose-950 font-bold';
              colonColor = 'text-rose-700 font-bold';
              valueColor = 'text-slate-900 font-medium';
              photoBorder = '#e11d48';
            } else if (isLavenderLuxe) {
              sheetClasses += ' bg-[#faf5ff] text-slate-900 border-purple-400 shadow-purple-900/10';
              sheetInlineStyle = { borderColor: '#a855f7' };
              headingColor = '#581c87';
              headingBorderColor = 'rgba(168, 85, 247, 0.4)';
              labelColor = 'text-purple-950 font-bold';
              colonColor = 'text-purple-600 font-bold';
              valueColor = 'text-slate-900 font-medium';
              photoBorder = '#a855f7';
            } else if (isRoyalMaroon) {
              sheetClasses += ' bg-gradient-to-b from-[#380812] via-[#4a0518] to-[#28040d] text-amber-100 border-amber-500';
              sheetInlineStyle = { borderColor: '#f59e0b' };
              headingColor = '#fde047';
              headingBorderColor = 'rgba(245, 158, 11, 0.4)';
              labelColor = 'text-amber-300 font-medium';
              colonColor = 'text-amber-400 font-bold';
              valueColor = 'text-amber-50 font-semibold';
              photoBorder = '#f59e0b';
            } else {
              sheetClasses += ` bg-white ${currentTemplate.bgGradient}`;
            }

            return (
              <div
                ref={biodataRef}
                id="biodata-preview-sheet"
                className={sheetClasses}
                style={sheetInlineStyle}
              >
                {/* 1. Islamic Emerald Top Arch & Lanterns */}
                {isEmeraldIslamic && <IslamicArchHeader />}

                {/* 1b. Islamic Sapphire Noor Top Arch & Crescent */}
                {isSapphireIslamic && <IslamicSapphireArch />}

                {/* 2. Hindu Saffron Ganesha Watermark & Corner Filigrees */}
                {isSaffronHindu && (
                  <>
                    <GaneshaWatermark />
                    <CornerFiligree />
                  </>
                )}

                {/* 2b. Temple Gold Watermark & Corner Filigrees */}
                {isTempleGold && (
                  <>
                    <TempleDeepamWatermark />
                    <CornerFiligree />
                  </>
                )}

                {/* 2c. Ruby Crimson Corner Filigrees */}
                {isRubyCrimson && <CornerFiligree />}

                {/* 3. Royal Maroon Corner Filigrees */}
                {isRoyalMaroon && <CornerFiligree />}

                {/* Top Auspicious Header Text */}
                {isSaffronHindu ? (
                  <HinduCalligraphyHeader headerText={data.headerText} />
                ) : (
                  <div className="text-center relative z-10">
                    <div
                      className={`text-xs sm:text-sm font-extrabold tracking-widest uppercase mb-1 ${
                        isDarkIslamic
                          ? 'text-amber-300'
                          : isRoyalMaroon
                          ? 'text-amber-300'
                          : ''
                      }`}
                      style={{
                        color:
                          !isDarkIslamic && !isRoyalMaroon
                            ? currentTemplate.secondaryColor
                            : undefined
                      }}
                    >
                      {data.headerText}
                    </div>
                    <h2
                      className={`text-xl sm:text-2xl font-black tracking-wide leading-tight ${
                        isDarkIslamic
                          ? 'text-amber-400'
                          : isRoyalMaroon
                          ? 'text-amber-200'
                          : ''
                      }`}
                      style={{
                        color:
                          !isDarkIslamic && !isRoyalMaroon
                            ? currentTemplate.primaryColor
                            : undefined
                      }}
                    >
                      {data.title}
                    </h2>
                    <div
                      className="w-full h-[2px] mt-2 mb-2 rounded-full"
                      style={{ backgroundColor: headingBorderColor }}
                    />
                  </div>
                )}

                {/* Royal Centered Mandala Avatar Variant (Image 2 Style) */}
                {isRoyalMaroon ? (
                  <div className="text-center pt-1 pb-2 space-y-2 relative z-10">
                    <RoyalMandalaRing>
                      {data.photoUrl ? (
                        <img
                          src={data.photoUrl}
                          alt={data.fullName || 'Profile'}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-amber-300/60 p-2">
                          <ImageIcon className="w-8 h-8 mb-1 opacity-60 text-amber-300" />
                          <span className="text-[10px] font-sans font-medium">
                            {t.photoPlaceholder}
                          </span>
                        </div>
                      )}
                    </RoyalMandalaRing>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-amber-200 tracking-wide font-serif">
                        {data.fullName || (language === 'bn' ? 'আপনার নাম' : 'Full Name')}
                      </h3>
                      {data.jobTitle && (
                        <p className="text-xs font-bold text-amber-400 mt-0.5">
                          {data.jobTitle} {data.companyName && `at ${data.companyName}`}
                        </p>
                      )}
                      <p className="text-[11px] italic text-amber-300/80 mt-1 max-w-xs mx-auto">
                        “Two souls with but a single thought, two hearts that beat as one.”
                      </p>
                    </div>

                    {/* Micro Highlight Badges */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-1 text-[10px] text-amber-200/90 font-medium">
                      {data.dob && (
                        <div className="bg-amber-950/50 border border-amber-500/30 rounded-lg p-1.5 text-center">
                          <span className="block text-amber-400 font-bold">{t.lblDob}</span>
                          <span>{data.dob}</span>
                        </div>
                      )}
                      {data.height && (
                        <div className="bg-amber-950/50 border border-amber-500/30 rounded-lg p-1.5 text-center">
                          <span className="block text-amber-400 font-bold">{t.lblHeight}</span>
                          <span>{data.height}</span>
                        </div>
                      )}
                      {data.education && (
                        <div className="bg-amber-950/50 border border-amber-500/30 rounded-lg p-1.5 text-center col-span-2 sm:col-span-1">
                          <span className="block text-amber-400 font-bold">{t.lblEducation}</span>
                          <span className="break-words leading-tight">{data.education}</span>
                        </div>
                      )}
                      {data.birthPlace && (
                        <div className="bg-amber-950/50 border border-amber-500/30 rounded-lg p-1.5 text-center col-span-2 sm:col-span-1">
                          <span className="block text-amber-400 font-bold">{t.lblBirthPlace}</span>
                          <span className="break-words leading-tight">{data.birthPlace}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  /* Standard Top-Right Photo Layout (Image 1 & Image 3 Style) */
                  <div className="flex items-start justify-between gap-4 pt-1 relative z-10">
                    <div className="flex-1 space-y-1">
                      <div
                        className={`text-lg sm:text-xl font-black tracking-tight leading-snug break-words ${
                          isDarkIslamic
                            ? 'text-amber-300'
                            : isSaffronHindu
                            ? 'text-amber-950'
                            : isTempleGold
                            ? 'text-amber-950'
                            : isRubyCrimson
                            ? 'text-rose-950'
                            : ''
                        }`}
                        style={{
                          color:
                            !isDarkIslamic && !isSaffronHindu && !isTempleGold && !isRubyCrimson
                              ? currentTemplate.primaryColor
                              : undefined
                        }}
                      >
                        {data.fullName || (language === 'bn' ? 'আপনার নাম' : 'Full Name')}
                      </div>
                      <div className={`text-xs font-semibold leading-normal break-words py-0.5 ${isDarkIslamic ? 'text-amber-200' : 'text-slate-600'}`}>
                        {data.dob && <span>{t.lblDob} {data.dob}</span>}
                        {data.birthTime && <span> ({data.birthTime})</span>}
                      </div>
                      <div className={`text-xs leading-normal break-words py-0.5 ${isDarkIslamic ? 'text-amber-300/80' : 'text-slate-600'}`}>
                        {data.height && <span>{t.lblHeight} {data.height}</span>}
                        {data.complexion && <span> • {t.lblComplexion} {data.complexion}</span>}
                      </div>
                      {data.education && (
                        <div className={`text-xs font-medium leading-normal break-words py-0.5 ${isDarkIslamic ? 'text-white' : 'text-slate-700'}`}>
                          {t.lblEducation} {data.education}
                        </div>
                      )}
                      {data.jobTitle && (
                        <div
                          className={`text-xs font-bold leading-normal break-words py-0.5 ${isDarkIslamic ? 'text-amber-300' : ''}`}
                          style={{
                            color: !isDarkIslamic ? currentTemplate.primaryColor : undefined
                          }}
                        >
                          {t.lblOccupation} {data.jobTitle} {data.companyName && `(${data.companyName})`}
                        </div>
                      )}
                    </div>

                    {/* Photo Box */}
                    {data.photoUrl ? (
                      <div
                        className={`w-20 h-28 min-[380px]:w-24 min-[380px]:h-32 sm:w-28 sm:h-36 rounded-xl overflow-hidden border-2 shadow-md shrink-0 ${
                          isDarkIslamic ? 'ring-2 ring-amber-400/30' : ''
                        }`}
                        style={{ borderColor: photoBorder }}
                      >
                        <img
                          src={data.photoUrl}
                          alt={data.fullName || 'Profile'}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div
                        className={`w-20 h-28 min-[380px]:w-24 min-[380px]:h-32 sm:w-28 sm:h-36 rounded-xl border-2 border-dashed flex flex-col items-center justify-center text-center p-2 shrink-0 ${
                          isDarkIslamic
                            ? 'border-amber-400/60 bg-slate-900/40 text-amber-300/70'
                            : 'border-slate-300 bg-slate-50/50 text-slate-400'
                        }`}
                        style={{
                          borderColor:
                            !isDarkIslamic ? currentTemplate.secondaryColor : undefined
                        }}
                      >
                        <ImageIcon className="w-6 h-6 mb-1 opacity-50" />
                        <span className="text-[10px] font-sans font-medium">{t.photoPlaceholder}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Section 1: Personal & Physical Details */}
                <div className="space-y-1 text-xs relative z-10">
                  <div>
                    <div
                      className="font-bold text-[11px] tracking-wider uppercase leading-snug"
                      style={{ color: headingColor }}
                    >
                      {t.personalDetails}
                    </div>
                    <div
                      className="w-full h-[1.5px] mt-1 mb-1.5 rounded-full"
                      style={{ backgroundColor: headingBorderColor }}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-1 text-[11px]">
                    <KeyValueRow label={t.lblBirthPlace} value={data.birthPlace} labelColor={labelColor} colonColor={colonColor} valueColor={valueColor} />
                    <KeyValueRow label={t.lblBloodGroup} value={data.bloodGroup} labelColor={labelColor} colonColor={colonColor} valueColor={valueColor} />
                    <KeyValueRow label={t.lblMotherTongue} value={data.motherTongue} labelColor={labelColor} colonColor={colonColor} valueColor={valueColor} />
                    <KeyValueRow label={t.lblMaritalStatus} value={data.maritalStatus} labelColor={labelColor} colonColor={colonColor} valueColor={valueColor} />
                    <KeyValueRow label={t.lblDiet} value={data.diet} labelColor={labelColor} colonColor={colonColor} valueColor={valueColor} />
                  </div>
                </div>

                {/* Section 2: Astrological / Religious Details */}
                {isMuslim ? (
                  (data.religion || data.sect || data.caste || data.namaz || data.roza || data.quran) && (
                    <div className="space-y-1 text-xs relative z-10">
                      <div>
                        <div
                          className="font-bold text-[11px] tracking-wider uppercase leading-snug"
                          style={{ color: headingColor }}
                        >
                          {t.islamicDetails}
                        </div>
                        <div
                          className="w-full h-[1.5px] mt-1 mb-1.5 rounded-full"
                          style={{ backgroundColor: headingBorderColor }}
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-1 text-[11px]">
                        <KeyValueRow label={t.lblReligion} value={data.religion} labelColor={labelColor} colonColor={colonColor} valueColor={valueColor} />
                        <KeyValueRow label={t.lblSect} value={data.sect} labelColor={labelColor} colonColor={colonColor} valueColor={valueColor} />
                        <KeyValueRow label={t.lblBiradari} value={data.caste} labelColor={labelColor} colonColor={colonColor} valueColor={valueColor} />
                        <KeyValueRow label={t.lblNamaz} value={data.namaz} labelColor={labelColor} colonColor={colonColor} valueColor={valueColor} />
                        <KeyValueRow label={t.lblRoza} value={data.roza} labelColor={labelColor} colonColor={colonColor} valueColor={valueColor} />
                        <KeyValueRow label={t.lblQuran} value={data.quran} labelColor={labelColor} colonColor={colonColor} valueColor={valueColor} />
                      </div>
                    </div>
                  )
                ) : (
                  (data.religion || data.caste || data.gotra || data.rashi || data.nakshatra || data.manglik) && (
                    <div className="space-y-1 text-xs relative z-10">
                      <div>
                        <div
                          className="font-bold text-[11px] tracking-wider uppercase leading-snug"
                          style={{ color: headingColor }}
                        >
                          {t.horoscopeDetails}
                        </div>
                        <div
                          className="w-full h-[1.5px] mt-1 mb-1.5 rounded-full"
                          style={{ backgroundColor: headingBorderColor }}
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-1 text-[11px]">
                        <KeyValueRow label={t.lblReligion} value={data.religion} labelColor={labelColor} colonColor={colonColor} valueColor={valueColor} />
                        <KeyValueRow label={t.lblCaste} value={data.caste ? `${data.caste}${data.subCaste ? ` (${data.subCaste})` : ''}` : ''} labelColor={labelColor} colonColor={colonColor} valueColor={valueColor} />
                        <KeyValueRow label={t.lblGotra} value={data.gotra} labelColor={labelColor} colonColor={colonColor} valueColor={valueColor} />
                        <KeyValueRow label={t.lblRashi} value={data.rashi} labelColor={labelColor} colonColor={colonColor} valueColor={valueColor} />
                        <KeyValueRow label={t.lblNakshatra} value={data.nakshatra} labelColor={labelColor} colonColor={colonColor} valueColor={valueColor} />
                        <KeyValueRow label={t.lblManglik} value={data.manglik} labelColor={labelColor} colonColor={colonColor} valueColor={valueColor} />
                      </div>
                    </div>
                  )
                )}

                {/* Section 3: Education & Career Details */}
                <div className="space-y-1 text-xs relative z-10">
                  <div>
                    <div
                      className="font-bold text-[11px] tracking-wider uppercase leading-snug"
                      style={{ color: headingColor }}
                    >
                      {t.educationDetails}
                    </div>
                    <div
                      className="w-full h-[1.5px] mt-1 mb-1.5 rounded-full"
                      style={{ backgroundColor: headingBorderColor }}
                    />
                  </div>
                  <div className="space-y-1 text-[11px]">
                    <KeyValueRow label={t.lblEducation} value={data.education ? `${data.education}${data.collegeUniversity ? ` (${data.collegeUniversity})` : ''}` : ''} labelColor={labelColor} colonColor={colonColor} valueColor={valueColor} />
                    <KeyValueRow label={t.lblOccupation} value={data.occupation} labelColor={labelColor} colonColor={colonColor} valueColor={valueColor} />
                    <KeyValueRow label={t.lblJobTitle} value={data.jobTitle ? `${data.jobTitle}${data.companyName ? ` at ${data.companyName}` : ''}` : ''} labelColor={labelColor} colonColor={colonColor} valueColor={valueColor} />
                    <KeyValueRow label={t.lblIncome} value={data.income} labelColor={labelColor} colonColor={colonColor} valueColor={valueColor} />
                    <KeyValueRow label={t.lblWorkLocation} value={data.workLocation} labelColor={labelColor} colonColor={colonColor} valueColor={valueColor} />
                  </div>
                </div>

                {/* Section 4: Family Details */}
                <div className="space-y-1 text-xs relative z-10">
                  <div>
                    <div
                      className="font-bold text-[11px] tracking-wider uppercase leading-snug"
                      style={{ color: headingColor }}
                    >
                      {t.familyDetails}
                    </div>
                    <div
                      className="w-full h-[1.5px] mt-1 mb-1.5 rounded-full"
                      style={{ backgroundColor: headingBorderColor }}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-1 text-[11px]">
                    <KeyValueRow label={t.lblFather} value={data.fatherName} labelColor={labelColor} colonColor={colonColor} valueColor={valueColor} />
                    <KeyValueRow label={t.lblFatherOccupation} value={data.fatherOccupation} labelColor={labelColor} colonColor={colonColor} valueColor={valueColor} />
                    <KeyValueRow label={t.lblMother} value={data.motherName} labelColor={labelColor} colonColor={colonColor} valueColor={valueColor} />
                    <KeyValueRow label={t.lblMotherOccupation} value={data.motherOccupation} labelColor={labelColor} colonColor={colonColor} valueColor={valueColor} />
                    <KeyValueRow label={t.lblBrothers} value={data.totalBrothers} labelColor={labelColor} colonColor={colonColor} valueColor={valueColor} />
                    <KeyValueRow label={t.lblSisters} value={data.totalSisters} labelColor={labelColor} colonColor={colonColor} valueColor={valueColor} />
                    <KeyValueRow label={t.lblFamilyType} value={data.familyType} labelColor={labelColor} colonColor={colonColor} valueColor={valueColor} />
                    <KeyValueRow label={t.lblNativePlace} value={data.nativePlace} labelColor={labelColor} colonColor={colonColor} valueColor={valueColor} />
                  </div>
                </div>

                {/* Section 5: Contact Details */}
                <div className="space-y-1 text-xs relative z-10">
                  <div>
                    <div
                      className="font-bold text-[11px] tracking-wider uppercase leading-snug"
                      style={{ color: headingColor }}
                    >
                      {t.contactDetails}
                    </div>
                    <div
                      className="w-full h-[1.5px] mt-1 mb-1.5 rounded-full"
                      style={{ backgroundColor: headingBorderColor }}
                    />
                  </div>
                  <div className="space-y-1 text-[11px]">
                    <KeyValueRow label={t.lblContactPerson} value={data.contactPerson} labelColor={labelColor} colonColor={colonColor} valueColor={valueColor} />
                    <KeyValueRow label={t.lblPhone} value={data.primaryPhone} labelColor={labelColor} colonColor={colonColor} valueColor={valueColor} />
                    <KeyValueRow label={t.lblAltPhone} value={data.secondaryPhone} labelColor={labelColor} colonColor={colonColor} valueColor={valueColor} />
                    <KeyValueRow label={t.lblEmail} value={data.email} labelColor={labelColor} colonColor={colonColor} valueColor={valueColor} />
                    <KeyValueRow label={t.lblAddress} value={data.address} labelColor={labelColor} colonColor={colonColor} valueColor={valueColor} />
                  </div>
                </div>

                {/* Bottom Islamic Floral Border */}
                {isEmeraldIslamic && <IslamicFloralFooter />}
              </div>
            );
          })()}

          {/* Prominent Action & Download Card Directly Below A4 Preview Sheet */}
          <div className="no-print w-full max-w-[520px] bg-white rounded-2xl p-4 sm:p-5 shadow-lg border border-slate-200/90 mt-4 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-0.5">
              <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                100% Free • No Watermark
              </span>
              <span className="text-[11px] text-slate-400">
                A4 Print & HD Ready
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Primary PDF Download Button */}
              <button
                onClick={downloadPdf}
                disabled={isExporting}
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-rose-700 to-rose-800 hover:from-rose-800 hover:to-rose-900 text-white font-bold text-sm py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all transform active:scale-[0.98] disabled:opacity-50 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>{t.downloadPdf}</span>
              </button>

              {/* Primary HD Image Download Button */}
              <button
                onClick={downloadImage}
                disabled={isExporting}
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-sm py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all transform active:scale-[0.98] disabled:opacity-50 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>{t.downloadImage}</span>
              </button>
            </div>

            <div className="flex items-center justify-between pt-1.5 text-xs border-t border-slate-100">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 font-semibold py-1 px-2 rounded-lg hover:bg-slate-100 transition cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-slate-500" />
                <span>{t.print}</span>
              </button>

              <button
                onClick={shareOnWhatsApp}
                className="inline-flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 font-semibold py-1 px-2 rounded-lg hover:bg-emerald-50 transition"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Share on WhatsApp</span>
              </button>
            </div>
          </div>

          <p className="no-print text-xs text-slate-500 text-center mt-2">
            {t.previewDisclaimer}
          </p>
        </div>
      </div>

      {/* Floating Sticky Mobile Quick Action Bar (when editing form on mobile) */}
      {mobileTab === 'edit' && (
        <div className="no-print lg:hidden fixed bottom-3 left-2.5 right-2.5 sm:left-4 sm:right-4 z-40 max-w-md mx-auto">
          <button
            type="button"
            onClick={() => {
              setMobileTab('preview');
              const el = document.getElementById('builder-preview-card');
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="w-full inline-flex items-center justify-between bg-gradient-to-r from-rose-800 via-rose-700 to-rose-900 text-white font-bold text-xs sm:text-sm py-2.5 px-3 sm:py-3 sm:px-4 rounded-xl sm:rounded-2xl shadow-2xl border border-rose-400/40 transform active:scale-95 transition-all"
          >
            <span className="flex items-center gap-1.5 sm:gap-2">
              <Eye className="w-4 h-4 text-amber-300 shrink-0" />
              <span className="truncate">Preview & Download Biodata</span>
            </span>
            <span className="bg-white/20 text-white text-[11px] sm:text-xs px-2 py-0.5 rounded-full flex items-center gap-1 font-semibold shrink-0">
              <span>View</span>
              <ArrowRight className="w-3 h-3" />
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
