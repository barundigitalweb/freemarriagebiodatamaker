import React, { useState, useRef, useEffect } from 'react';
import {
  type BiodataData,
  type TemplateId,
  BIODATA_TEMPLATES,
  INITIAL_BIODATA_DATA
} from '../lib/biodata-types';
import {
  type Language,
  TRANSLATIONS
} from '../lib/translations';
import {
  User,
  BookOpen,
  Briefcase,
  Users,
  Phone,
  Image as ImageIcon,
  Sparkles,
  Download,
  Share2,
  Printer,
  Palette,
  CheckCircle2,
  Eye,
  Trash2,
  RotateCcw,
  Copy,
  Check,
  Globe,
  MessageCircle
} from 'lucide-react';

interface BiodataBuilderProps {
  initialLanguage?: Language;
  initialHeaderText?: string;
  initialTitle?: string;
}

const STORAGE_KEY = 'freemarriagebiodata_draft_v2';

export default function BiodataBuilder({
  initialLanguage = 'en',
  initialHeaderText,
  initialTitle
}: BiodataBuilderProps) {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const [data, setData] = useState<BiodataData>(() => {
    const base = { ...INITIAL_BIODATA_DATA };
    if (initialHeaderText) base.headerText = initialHeaderText;
    if (initialTitle) base.title = initialTitle;
    return base;
  });
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>('royal-maroon');
  const [activeTab, setActiveTab] = useState<string>('personal');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportMessage, setExportMessage] = useState<string>('');
  const [copyFeedback, setCopyFeedback] = useState<boolean>(false);

  const biodataRef = useRef<HTMLDivElement | null>(null);

  const t = TRANSLATIONS[language] || TRANSLATIONS.bn;
  const currentTemplate =
    BIODATA_TEMPLATES.find((tmpl) => tmpl.id === selectedTemplate) || BIODATA_TEMPLATES[0];

  // Load from localStorage on mount (Client-Side)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.data) setData(parsed.data);
        if (parsed?.selectedTemplate) setSelectedTemplate(parsed.selectedTemplate);
        if (parsed?.language && !initialLanguage) setLanguage(parsed.language);
      }
    } catch (e) {
      console.warn('Could not read from localStorage', e);
    }
  }, [initialLanguage]);

  // Persist draft to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          data,
          selectedTemplate,
          language
        })
      );
    } catch (e) {
      console.warn('Could not save draft to localStorage', e);
    }
  }, [data, selectedTemplate, language]);

  const handleInputChange = (field: keyof BiodataData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert(language === 'bn' ? 'অনুগ্রহ করে ৫ MB-র কম সাইজের ছবি নির্বাচন করুন।' : 'Please choose an image under 5 MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setData((prev) => ({ ...prev, photoUrl: event.target?.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    setData((prev) => ({ ...prev, photoUrl: null }));
  };

  const handleReset = () => {
    if (window.confirm(t.resetConfirm)) {
      const resetData = { ...INITIAL_BIODATA_DATA };
      if (initialHeaderText) resetData.headerText = initialHeaderText;
      if (initialTitle) resetData.title = initialTitle;
      setData(resetData);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const handleClearAll = () => {
    if (window.confirm(language === 'bn' ? 'আপনি কি সব ঘর খালি করতে চান?' : 'Clear all fields?')) {
      setData({
        headerText: data.headerText || '|| श्री गणेशाय नमः ||',
        title: data.title || 'MARRIAGE BIODATA',
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
        diet: '',
        religion: '',
        caste: '',
        subCaste: '',
        gotra: '',
        rashi: '',
        nakshatra: '',
        manglik: '',
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

  const shareOnWhatsApp = () => {
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
      const html2canvas = (await import('html2canvas')).default;
      const confetti = (await import('canvas-confetti')).default;

      const canvas = await html2canvas(biodataRef.current, {
        scale: 2.5, // Crisp HD resolution
        useCORS: true,
        backgroundColor: '#ffffff'
      });

      const link = document.createElement('a');
      link.download = `${data.fullName ? data.fullName.trim().replace(/\s+/g, '_') : 'Marriage'}_Biodata.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();

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
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');
      const confetti = (await import('canvas-confetti')).default;

      const canvas = await html2canvas(biodataRef.current, {
        scale: 2.5,
        useCORS: true,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${data.fullName ? data.fullName.trim().replace(/\s+/g, '_') : 'Marriage'}_Biodata.pdf`);

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

  return (
    <div className="space-y-8">
      {/* Top Banner Toolbar */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-md border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* App Title & Value Prop */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center font-bold shrink-0">
            <Sparkles className="w-5 h-5 text-rose-600" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-800">
              {t.appTitle}
            </h3>
            <p className="text-xs text-slate-500">
              {t.appSubtitle}
            </p>
          </div>
        </div>

        {/* Language Switcher + Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Multilingual Selector */}
          <div className="inline-flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold text-slate-700">
            <Globe className="w-3.5 h-3.5 ml-1.5 mr-1 text-slate-500" />
            {(['bn', 'en', 'hi', 'mr'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-2.5 py-1 rounded-lg transition text-xs font-bold ${
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

          {/* Share on WhatsApp */}
          <button
            onClick={shareOnWhatsApp}
            className="inline-flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold px-3 py-2 rounded-xl transition"
            title="Share with Family on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">WhatsApp</span>
          </button>

          {/* Copy Site Link */}
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 text-xs font-bold px-3 py-2 rounded-xl transition"
            title={t.share}
          >
            {copyFeedback ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copyFeedback ? 'Copied!' : t.share}</span>
          </button>

          {/* Reset / Clear */}
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1 bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-700 border border-slate-200 text-xs font-bold px-3 py-2 rounded-xl transition"
            title={t.reset}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.reset}</span>
          </button>

          {/* Quick PDF Download */}
          <button
            onClick={downloadPdf}
            disabled={isExporting}
            className="inline-flex items-center gap-1.5 bg-rose-700 hover:bg-rose-800 text-white text-xs sm:text-sm font-bold px-3.5 py-2 rounded-xl shadow-md transition disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{t.downloadPdf}</span>
          </button>

          {/* Quick Image Download */}
          <button
            onClick={downloadImage}
            disabled={isExporting}
            className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold px-3.5 py-2 rounded-xl shadow-md transition disabled:opacity-50"
          >
            <Share2 className="w-4 h-4" />
            <span>{t.downloadImage}</span>
          </button>

          {/* Direct Print */}
          <button
            onClick={() => window.print()}
            className="inline-flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold p-2 rounded-xl border border-slate-200 transition"
            title={t.print}
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {exportMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xl text-center text-sm font-bold animate-pulse">
          {exportMessage}
        </div>
      )}

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Data Input Form (6 Cols) */}
        <div className="lg:col-span-6 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
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
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {BIODATA_TEMPLATES.map((tmpl) => (
                <button
                  key={tmpl.id}
                  onClick={() => setSelectedTemplate(tmpl.id)}
                  className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between ${
                    selectedTemplate === tmpl.id
                      ? 'border-rose-600 bg-rose-50/50 ring-2 ring-rose-500/30'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                      style={{ backgroundColor: tmpl.primaryColor }}
                    ></span>
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                      style={{ backgroundColor: tmpl.secondaryColor }}
                    ></span>
                  </div>
                  <span className="text-[11px] font-bold text-slate-800 line-clamp-1 leading-tight">
                    {tmpl.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Form Navigation Tabs */}
          <div className="flex border-b border-slate-200 bg-slate-100/70 overflow-x-auto text-xs font-bold text-slate-600 scrollbar-none">
            {[
              { id: 'personal', label: t.tabPersonal, icon: User },
              { id: 'astrology', label: t.tabHoroscope, icon: BookOpen },
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
          <div className="p-6 space-y-4 max-h-[680px] overflow-y-auto">
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
                  placeholder="|| श्री गणेशाय नमः || / Bismillah"
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
                  placeholder="MARRIAGE BIODATA"
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
                    placeholder="Rahul Sharma"
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
                      placeholder="Kolkata, WB / Pune, MH"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 outline-none focus:border-rose-600 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">{t.height}</label>
                    <input
                      type="text"
                      value={data.height}
                      onChange={(e) => handleInputChange('height', e.target.value)}
                      placeholder="5 ft 10 in (178 cm)"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 outline-none focus:border-rose-600 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2.5">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">{t.complexion}</label>
                    <input
                      type="text"
                      value={data.complexion}
                      onChange={(e) => handleInputChange('complexion', e.target.value)}
                      placeholder="Fair / Wheatish"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 outline-none focus:border-rose-600 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">{t.bloodGroup}</label>
                    <input
                      type="text"
                      value={data.bloodGroup}
                      onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
                      placeholder="B+, O+, A+"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 outline-none focus:border-rose-600 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">{t.motherTongue}</label>
                    <input
                      type="text"
                      value={data.motherTongue}
                      onChange={(e) => handleInputChange('motherTongue', e.target.value)}
                      placeholder="Bengali / Hindi"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 outline-none focus:border-rose-600 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">{t.maritalStatus}</label>
                    <input
                      type="text"
                      value={data.maritalStatus}
                      onChange={(e) => handleInputChange('maritalStatus', e.target.value)}
                      placeholder="Never Married"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 outline-none focus:border-rose-600 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">{t.diet}</label>
                    <input
                      type="text"
                      value={data.diet}
                      onChange={(e) => handleInputChange('diet', e.target.value)}
                      placeholder="Vegetarian / Non-Veg"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 outline-none focus:border-rose-600 focus:bg-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Horoscope & Religion */}
            {activeTab === 'astrology' && (
              <div className="space-y-3.5 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">{t.religion}</label>
                    <input
                      type="text"
                      value={data.religion}
                      onChange={(e) => handleInputChange('religion', e.target.value)}
                      placeholder="Hindu / Muslim / Jain"
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
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">{t.rashi}</label>
                    <input
                      type="text"
                      value={data.rashi}
                      onChange={(e) => handleInputChange('rashi', e.target.value)}
                      placeholder="Leo (सिंह)"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 outline-none focus:border-rose-600 focus:bg-white"
                    />
                  </div>
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
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">{t.manglik}</label>
                    <input
                      type="text"
                      value={data.manglik}
                      onChange={(e) => handleInputChange('manglik', e.target.value)}
                      placeholder="Non-Manglik / Manglik"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 outline-none focus:border-rose-600 focus:bg-white"
                    />
                  </div>
                </div>
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
                      placeholder="Mr. Ramesh Sharma"
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
                      placeholder="Mrs. Sunita Sharma"
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
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">{t.familyType}</label>
                    <input
                      type="text"
                      value={data.familyType}
                      onChange={(e) => handleInputChange('familyType', e.target.value)}
                      placeholder="Nuclear / Joint Family"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 outline-none focus:border-rose-600 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">{t.nativePlace}</label>
                    <input
                      type="text"
                      value={data.nativePlace}
                      onChange={(e) => handleInputChange('nativePlace', e.target.value)}
                      placeholder="Burdwan, WB / Pune, MH"
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
                    placeholder="Mr. Ramesh Sharma (Father)"
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
                    placeholder="family.contact@example.com"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 outline-none focus:border-rose-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">{t.address}</label>
                  <textarea
                    rows={2}
                    value={data.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="House No, Road, City, PIN"
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
        </div>

        {/* RIGHT COLUMN: Live Visual Sheet Preview (6 Cols) */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-3 px-2">
            <span className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-rose-600" />
              {t.livePreview}
            </span>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
              {t.hdQuality}
            </span>
          </div>

          {/* THE ACTUAL PRINTABLE / EXPORTABLE BIODATA SHEET */}
          <div
            ref={biodataRef}
            className={`w-full max-w-[520px] bg-white rounded-lg shadow-2xl border-4 p-6 sm:p-8 space-y-4 transition-all duration-200 font-serif relative ${currentTemplate.bgGradient}`}
            style={{ borderColor: currentTemplate.borderColor }}
          >
            {/* Top Auspicious Header Text */}
            <div className="text-center pb-2 border-b-2" style={{ borderColor: currentTemplate.secondaryColor }}>
              <div
                className="text-xs sm:text-sm font-extrabold tracking-widest uppercase mb-1"
                style={{ color: currentTemplate.secondaryColor }}
              >
                {data.headerText}
              </div>
              <h2
                className="text-xl sm:text-2xl font-black tracking-wide"
                style={{ color: currentTemplate.primaryColor }}
              >
                {data.title}
              </h2>
            </div>

            {/* Profile Header with Photo */}
            <div className="flex items-start justify-between gap-4 pt-1">
              <div className="flex-1 space-y-1">
                <div
                  className="text-lg sm:text-xl font-black tracking-tight"
                  style={{ color: currentTemplate.primaryColor }}
                >
                  {data.fullName || (language === 'bn' ? 'আপনার নাম' : 'Full Name')}
                </div>
                <div className="text-xs font-semibold text-slate-600">
                  {data.dob && <span>{t.lblDob} {data.dob}</span>}
                  {data.birthTime && <span> ({data.birthTime})</span>}
                </div>
                <div className="text-xs text-slate-600">
                  {data.height && <span>{t.lblHeight} {data.height}</span>}
                  {data.complexion && <span> • {t.lblComplexion} {data.complexion}</span>}
                </div>
                {data.education && (
                  <div className="text-xs font-medium text-slate-700 line-clamp-1">
                    {t.lblEducation} {data.education}
                  </div>
                )}
                {data.jobTitle && (
                  <div
                    className="text-xs font-bold"
                    style={{ color: currentTemplate.primaryColor }}
                  >
                    {t.lblOccupation} {data.jobTitle} {data.companyName && `(${data.companyName})`}
                  </div>
                )}
              </div>

              {/* Photo Box */}
              {data.photoUrl ? (
                <div
                  className="w-24 h-32 sm:w-28 sm:h-36 rounded-xl overflow-hidden border-2 shadow-md shrink-0"
                  style={{ borderColor: currentTemplate.borderColor }}
                >
                  <img
                    src={data.photoUrl}
                    alt={data.fullName || 'Profile'}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div
                  className="w-24 h-32 sm:w-28 sm:h-36 rounded-xl border-2 border-dashed flex flex-col items-center justify-center text-slate-400 text-center p-2 shrink-0 bg-slate-50/50"
                  style={{ borderColor: currentTemplate.secondaryColor }}
                >
                  <ImageIcon className="w-6 h-6 mb-1 opacity-40" />
                  <span className="text-[10px] font-sans font-medium">{t.photoPlaceholder}</span>
                </div>
              )}
            </div>

            {/* Section 1: Personal & Physical Details */}
            <div className="space-y-1.5 text-xs text-slate-800">
              <div
                className="font-bold text-[11px] tracking-wider uppercase border-b pb-0.5"
                style={{ color: currentTemplate.primaryColor, borderColor: currentTemplate.secondaryColor }}
              >
                {t.personalDetails}
              </div>
              <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px]">
                {data.birthPlace && <div><strong>{t.lblBirthPlace}</strong> {data.birthPlace}</div>}
                {data.bloodGroup && <div><strong>{t.lblBloodGroup}</strong> {data.bloodGroup}</div>}
                {data.motherTongue && <div><strong>{t.lblMotherTongue}</strong> {data.motherTongue}</div>}
                {data.maritalStatus && <div><strong>{t.lblMaritalStatus}</strong> {data.maritalStatus}</div>}
                {data.diet && <div><strong>{t.lblDiet}</strong> {data.diet}</div>}
              </div>
            </div>

            {/* Section 2: Astrological / Religious Details */}
            {(data.religion || data.caste || data.gotra || data.rashi || data.nakshatra || data.manglik) && (
              <div className="space-y-1.5 text-xs text-slate-800">
                <div
                  className="font-bold text-[11px] tracking-wider uppercase border-b pb-0.5"
                  style={{ color: currentTemplate.primaryColor, borderColor: currentTemplate.secondaryColor }}
                >
                  {t.horoscopeDetails}
                </div>
                <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px]">
                  {data.religion && <div><strong>{t.lblReligion}</strong> {data.religion}</div>}
                  {data.caste && <div><strong>{t.lblCaste}</strong> {data.caste} {data.subCaste && `(${data.subCaste})`}</div>}
                  {data.gotra && <div><strong>{t.lblGotra}</strong> {data.gotra}</div>}
                  {data.rashi && <div><strong>{t.lblRashi}</strong> {data.rashi}</div>}
                  {data.nakshatra && <div><strong>{t.lblNakshatra}</strong> {data.nakshatra}</div>}
                  {data.manglik && <div><strong>{t.lblManglik}</strong> {data.manglik}</div>}
                </div>
              </div>
            )}

            {/* Section 3: Education & Career Details */}
            <div className="space-y-1.5 text-xs text-slate-800">
              <div
                className="font-bold text-[11px] tracking-wider uppercase border-b pb-0.5"
                style={{ color: currentTemplate.primaryColor, borderColor: currentTemplate.secondaryColor }}
              >
                {t.educationDetails}
              </div>
              <div className="space-y-1 text-[11px]">
                {data.education && <div><strong>{t.lblEducation}</strong> {data.education} {data.collegeUniversity && `(${data.collegeUniversity})`}</div>}
                {data.occupation && <div><strong>{t.lblOccupation}</strong> {data.occupation}</div>}
                {data.jobTitle && <div><strong>{t.lblJobTitle}</strong> {data.jobTitle} {data.companyName && `at ${data.companyName}`}</div>}
                {data.income && <div><strong>{t.lblIncome}</strong> {data.income}</div>}
                {data.workLocation && <div><strong>{t.lblWorkLocation}</strong> {data.workLocation}</div>}
              </div>
            </div>

            {/* Section 4: Family Details */}
            <div className="space-y-1.5 text-xs text-slate-800">
              <div
                className="font-bold text-[11px] tracking-wider uppercase border-b pb-0.5"
                style={{ color: currentTemplate.primaryColor, borderColor: currentTemplate.secondaryColor }}
              >
                {t.familyDetails}
              </div>
              <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px]">
                {data.fatherName && <div><strong>{t.lblFather}</strong> {data.fatherName}</div>}
                {data.fatherOccupation && <div><strong>{t.lblFatherOccupation}</strong> {data.fatherOccupation}</div>}
                {data.motherName && <div><strong>{t.lblMother}</strong> {data.motherName}</div>}
                {data.motherOccupation && <div><strong>{t.lblMotherOccupation}</strong> {data.motherOccupation}</div>}
                {data.totalBrothers && <div><strong>{t.lblBrothers}</strong> {data.totalBrothers}</div>}
                {data.totalSisters && <div><strong>{t.lblSisters}</strong> {data.totalSisters}</div>}
                {data.familyType && <div><strong>{t.lblFamilyType}</strong> {data.familyType}</div>}
                {data.nativePlace && <div><strong>{t.lblNativePlace}</strong> {data.nativePlace}</div>}
              </div>
            </div>

            {/* Section 5: Contact Details */}
            <div className="space-y-1.5 text-xs text-slate-800">
              <div
                className="font-bold text-[11px] tracking-wider uppercase border-b pb-0.5"
                style={{ color: currentTemplate.primaryColor, borderColor: currentTemplate.secondaryColor }}
              >
                {t.contactDetails}
              </div>
              <div className="space-y-1 text-[11px]">
                {data.contactPerson && <div><strong>{t.lblContactPerson}</strong> {data.contactPerson}</div>}
                <div className="flex flex-wrap gap-x-4">
                  {data.primaryPhone && <div><strong>{t.lblPhone}</strong> {data.primaryPhone}</div>}
                  {data.secondaryPhone && <div><strong>{t.lblAltPhone}</strong> {data.secondaryPhone}</div>}
                </div>
                {data.email && <div><strong>{t.lblEmail}</strong> {data.email}</div>}
                {data.address && <div><strong>{t.lblAddress}</strong> {data.address}</div>}
              </div>
            </div>

            {/* Clean, Non-Intrusive Footer */}
            <div className="pt-2 text-center text-[10px] text-slate-400 border-t border-slate-200/60 font-sans">
              {t.previewFooter}
            </div>
          </div>

          <p className="text-xs text-slate-500 text-center mt-3">
            {t.previewDisclaimer}
          </p>
        </div>
      </div>
    </div>
  );
}
