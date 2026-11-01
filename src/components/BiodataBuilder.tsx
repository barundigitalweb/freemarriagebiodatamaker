import React, { useState, useRef } from 'react';
import {
  type BiodataData,
  type TemplateId,
  BIODATA_TEMPLATES,
  INITIAL_BIODATA_DATA
} from '../lib/biodata-types';
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
  Trash2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function BiodataBuilder() {
  const [data, setData] = useState<BiodataData>(INITIAL_BIODATA_DATA);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>('royal-maroon');
  const [activeTab, setActiveTab] = useState<string>('personal');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportMessage, setExportMessage] = useState<string>('');

  const biodataRef = useRef<HTMLDivElement | null>(null);

  const currentTemplate =
    BIODATA_TEMPLATES.find((t) => t.id === selectedTemplate) || BIODATA_TEMPLATES[0];

  const handleInputChange = (field: keyof BiodataData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('অনুগ্রহ করে ৫ MB-র কম সাইজের ছবি নির্বাচন করুন।');
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

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  // Download HD Image (PNG) - Perfect for WhatsApp
  const downloadImage = async () => {
    if (!biodataRef.current) return;
    setIsExporting(true);
    setExportMessage('HD ইমেজ তৈরি হচ্ছে...');

    try {
      const canvas = await html2canvas(biodataRef.current, {
        scale: 2.5, // Crisp HD resolution
        useCORS: true,
        backgroundColor: '#ffffff'
      });

      const link = document.createElement('a');
      link.download = `${data.fullName ? data.fullName.replace(/\s+/g, '_') : 'Marriage'}_Biodata.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();

      triggerConfetti();
      setExportMessage('ইমেজ ডাউনলোড সম্পন্ন হয়েছে!');
      setTimeout(() => setExportMessage(''), 3000);
    } catch (err) {
      console.error(err);
      alert('ইমেজ ডাউনলোড করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
    } finally {
      setIsExporting(false);
    }
  };

  // Download Print-Ready PDF (A4)
  const downloadPdf = async () => {
    if (!biodataRef.current) return;
    setIsExporting(true);
    setExportMessage('A4 সাইজ PDF তৈরি হচ্ছে...');

    try {
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
      pdf.save(`${data.fullName ? data.fullName.replace(/\s+/g, '_') : 'Marriage'}_Biodata.pdf`);

      triggerConfetti();
      setExportMessage('PDF ডাউনলোড সফল হয়েছে!');
      setTimeout(() => setExportMessage(''), 3000);
    } catch (err) {
      console.error(err);
      alert('PDF ডাউনলোড করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner Actions */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-md border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5 text-rose-600" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-800">
              ফ্রি ম্যারেজ বায়োডাটা বিল্ডার (Free Matrimonial Profile Builder)
            </h3>
            <p className="text-xs text-slate-500">
              ১০০% ফ্রি | কোনো ওয়াটারমার্ক নেই | কোনো সাইন-আপ বা পেমেন্ট ছাড়াই সরাসরি ডাউনলোড
            </p>
          </div>
        </div>

        {/* Quick Download Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={downloadPdf}
            disabled={isExporting}
            className="inline-flex items-center gap-2 bg-rose-700 hover:bg-rose-800 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-md transition disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>PDF ডাউনলোড (Free)</span>
          </button>
          <button
            onClick={downloadImage}
            disabled={isExporting}
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-md transition disabled:opacity-50"
          >
            <Share2 className="w-4 h-4" />
            <span>WhatsApp ইমেজ (HD)</span>
          </button>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold px-3 py-2.5 rounded-xl transition"
            title="সরাসরি প্রিন্ট করুন"
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

      {/* Main Two-Column Layout (Form on Left, Live Preview on Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Data Input Form (6 Cols) */}
        <div className="lg:col-span-6 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Template Picker Header */}
          <div className="p-4 bg-slate-50 border-b border-slate-200">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-2 mb-3">
              <Palette className="w-4 h-4 text-rose-600" />
              টেমপ্লেট ও কালার থিম নির্বাচন করুন:
            </label>
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
              { id: 'personal', label: 'ব্যক্তিগত', icon: User },
              { id: 'astrology', label: 'ধর্ম ও রাশি', icon: BookOpen },
              { id: 'education', label: 'শিক্ষা ও চাকরি', icon: Briefcase },
              { id: 'family', label: 'পারিবারিক', icon: Users },
              { id: 'contact', label: 'যোগাযোগ', icon: Phone },
              { id: 'photo', label: 'ছবি (Photo)', icon: ImageIcon }
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
                  শীর্ষ প্রার্থনা / প্রতীক (Header Motto)
                </label>
                <input
                  type="text"
                  value={data.headerText}
                  onChange={(e) => handleInputChange('headerText', e.target.value)}
                  placeholder="যেমন: || শ্রী গণেশায় নমঃ || বা Bismillah"
                  className="w-full bg-white border border-amber-300 rounded-lg p-2 text-xs font-medium outline-none focus:border-rose-600"
                />
              </div>
              <div>
                <label className="block font-bold text-amber-900 mb-1">
                  বায়োডাটার শিরোনাম (Title)
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
                  <label className="block font-bold text-slate-700 mb-1">পূর্ণ নাম (Full Name) *</label>
                  <input
                    type="text"
                    value={data.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="যেমন: Rahul Sharma / রাহুল শর্মা"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm font-semibold outline-none focus:border-rose-600 focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">জন্ম তারিখ (DOB)</label>
                    <input
                      type="text"
                      value={data.dob}
                      onChange={(e) => handleInputChange('dob', e.target.value)}
                      placeholder="DD/MM/YYYY"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 outline-none focus:border-rose-600 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">জন্ম সময় (Birth Time)</label>
                    <input
                      type="text"
                      value={data.birthTime}
                      onChange={(e) => handleInputChange('birthTime', e.target.value)}
                      placeholder="যেমন: 06:45 AM"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 outline-none focus:border-rose-600 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">জন্ম স্থান (Birth Place)</label>
                    <input
                      type="text"
                      value={data.birthPlace}
                      onChange={(e) => handleInputChange('birthPlace', e.target.value)}
                      placeholder="শহর, রাজ্য"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 outline-none focus:border-rose-600 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">উচ্চতা (Height)</label>
                    <input
                      type="text"
                      value={data.height}
                      onChange={(e) => handleInputChange('height', e.target.value)}
                      placeholder="যেমন: 5 ft 8 in"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 outline-none focus:border-rose-600 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">গায়ের রং</label>
                    <input
                      type="text"
                      value={data.complexion}
                      onChange={(e) => handleInputChange('complexion', e.target.value)}
                      placeholder="Fair / Wheatish"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 outline-none focus:border-rose-600 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">রক্তের গ্রুপ</label>
                    <input
                      type="text"
                      value={data.bloodGroup}
                      onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
                      placeholder="B+, O+, etc."
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 outline-none focus:border-rose-600 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">মাতৃভাষা</label>
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
                    <label className="block font-bold text-slate-700 mb-1">বৈবাহিক অবস্থা</label>
                    <input
                      type="text"
                      value={data.maritalStatus}
                      onChange={(e) => handleInputChange('maritalStatus', e.target.value)}
                      placeholder="Never Married"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 outline-none focus:border-rose-600 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">খাবার পছন্দ (Diet)</label>
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

            {/* TAB 2: Astrological / Religious */}
            {activeTab === 'astrology' && (
              <div className="space-y-3.5 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">ধর্ম (Religion)</label>
                    <input
                      type="text"
                      value={data.religion}
                      onChange={(e) => handleInputChange('religion', e.target.value)}
                      placeholder="Hindu / Muslim / Sikh, etc."
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 outline-none focus:border-rose-600 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">জাত / বর্ণ (Caste)</label>
                    <input
                      type="text"
                      value={data.caste}
                      onChange={(e) => handleInputChange('caste', e.target.value)}
                      placeholder="যেমন: Brahmin / Kayastha"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 outline-none focus:border-rose-600 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">উপজাতি / উপবর্ণ (Sub-caste)</label>
                    <input
                      type="text"
                      value={data.subCaste}
                      onChange={(e) => handleInputChange('subCaste', e.target.value)}
                      placeholder="ঐচ্ছিক (Optional)"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 outline-none focus:border-rose-600 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">গোত্র (Gotra)</label>
                    <input
                      type="text"
                      value={data.gotra}
                      onChange={(e) => handleInputChange('gotra', e.target.value)}
                      placeholder="যেমন: Kashyap / Shandilya"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 outline-none focus:border-rose-600 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">রাশি (Rashi)</label>
                    <input
                      type="text"
                      value={data.rashi}
                      onChange={(e) => handleInputChange('rashi', e.target.value)}
                      placeholder="যেমন: Leo / সিংহ"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 outline-none focus:border-rose-600 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">নক্ষত্র (Nakshatra)</label>
                    <input
                      type="text"
                      value={data.nakshatra}
                      onChange={(e) => handleInputChange('nakshatra', e.target.value)}
                      placeholder="যেমন: Magha"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 outline-none focus:border-rose-600 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">মাঙ্গলিক অবস্থা</label>
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
                  <label className="block font-bold text-slate-700 mb-1">সর্বোচ্চ শিক্ষাগত যোগ্যতা</label>
                  <input
                    type="text"
                    value={data.education}
                    onChange={(e) => handleInputChange('education', e.target.value)}
                    placeholder="B.Tech / MBA / MBBS / M.Sc, etc."
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 outline-none focus:border-rose-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">কলেজ / বিশ্ববিদ্যালয়</label>
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
                    <label className="block font-bold text-slate-700 mb-1">পেশার ধরন</label>
                    <input
                      type="text"
                      value={data.occupation}
                      onChange={(e) => handleInputChange('occupation', e.target.value)}
                      placeholder="Private Job / Govt Service / Business"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 outline-none focus:border-rose-600 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">পদবী (Job Title)</label>
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
                    <label className="block font-bold text-slate-700 mb-1">প্রতিষ্ঠানের নাম</label>
                    <input
                      type="text"
                      value={data.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      placeholder="MNC Firm / Govt Dept."
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 outline-none focus:border-rose-600 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">বার্ষিক আয় (Income)</label>
                    <input
                      type="text"
                      value={data.income}
                      onChange={(e) => handleInputChange('income', e.target.value)}
                      placeholder="₹ 15,00,000 / Annum"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 outline-none focus:border-rose-600 focus:bg-white font-bold text-rose-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">কাজের স্থান (Work Location)</label>
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
                    <label className="block font-bold text-slate-700 mb-1">বাবার নাম (Father's Name)</label>
                    <input
                      type="text"
                      value={data.fatherName}
                      onChange={(e) => handleInputChange('fatherName', e.target.value)}
                      placeholder="বাবার পূর্ণ নাম"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 outline-none focus:border-rose-600 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">বাবার পেশা</label>
                    <input
                      type="text"
                      value={data.fatherOccupation}
                      onChange={(e) => handleInputChange('fatherOccupation', e.target.value)}
                      placeholder="Business / Service / Retired"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 outline-none focus:border-rose-600 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">মায়ের নাম (Mother's Name)</label>
                    <input
                      type="text"
                      value={data.motherName}
                      onChange={(e) => handleInputChange('motherName', e.target.value)}
                      placeholder="মায়ের পূর্ণ নাম"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 outline-none focus:border-rose-600 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">মায়ের পেশা</label>
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
                    <label className="block font-bold text-slate-700 mb-1">ভাইদের বিবরণ</label>
                    <input
                      type="text"
                      value={data.totalBrothers}
                      onChange={(e) => handleInputChange('totalBrothers', e.target.value)}
                      placeholder="1 (Elder, Married)"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 outline-none focus:border-rose-600 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">বোনেদের বিবরণ</label>
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
                    <label className="block font-bold text-slate-700 mb-1">পরিবারের ধরন</label>
                    <input
                      type="text"
                      value={data.familyType}
                      onChange={(e) => handleInputChange('familyType', e.target.value)}
                      placeholder="Nuclear / Joint Family"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 outline-none focus:border-rose-600 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">পৈতৃক নিবাস (Native Place)</label>
                    <input
                      type="text"
                      value={data.nativePlace}
                      onChange={(e) => handleInputChange('nativePlace', e.target.value)}
                      placeholder="জেলা, শহর"
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
                  <label className="block font-bold text-slate-700 mb-1">যোগাযোগকারী ব্যক্তি (Contact Person)</label>
                  <input
                    type="text"
                    value={data.contactPerson}
                    onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                    placeholder="বাবার নাম বা অভিভাবক"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 outline-none focus:border-rose-600 focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">প্রধান ফোন নম্বর *</label>
                    <input
                      type="text"
                      value={data.primaryPhone}
                      onChange={(e) => handleInputChange('primaryPhone', e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 outline-none focus:border-rose-600 focus:bg-white font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">বিকল্প ফোন নম্বর</label>
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
                  <label className="block font-bold text-slate-700 mb-1">ইমেইল ঠিকানা</label>
                  <input
                    type="email"
                    value={data.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="family.contact@example.com"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 outline-none focus:border-rose-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">পূর্ণ ঠিকানা (Address)</label>
                  <textarea
                    rows={2}
                    value={data.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="বাড়ি নং, রাস্তা, শহর, পিন কোড"
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
                        <span>ছবি মুছে ফেলুন</span>
                      </button>
                    </div>
                  ) : (
                    <div>
                      <ImageIcon className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                      <label className="block font-bold text-slate-700 mb-1 cursor-pointer text-sm">
                        পাত্র / পাত্রীর সুন্দর ছবি যুক্ত করুন (ঐচ্ছিক)
                      </label>
                      <p className="text-[11px] text-slate-400 mb-3">
                        JPG, PNG বা WEBP (সর্বোচ্চ ৫ MB)। ছবি সম্পূর্ণ আপনার ফোনে প্রসেস হবে।
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
                    <strong>১০০% গোপনীয়তা:</strong> আপনার ছবি কোনো সার্ভারে আপলোড করা হয় না। সরাসরি আপনার ব্রাউজারে বায়োডাটার সাথে সংযুক্ত হয়।
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
              লাইভ প্রিভিউ (A4 Print Preview)
            </span>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
              ১০ কোয়ালিটি রেন্ডার
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
                  {data.fullName || 'আপনার নাম'}
                </div>
                <div className="text-xs font-semibold text-slate-600">
                  {data.dob && <span>জন্ম: {data.dob}</span>}
                  {data.birthTime && <span> ({data.birthTime})</span>}
                </div>
                <div className="text-xs text-slate-600">
                  {data.height && <span>উচ্চতা: {data.height}</span>}
                  {data.complexion && <span> • বর্ণ: {data.complexion}</span>}
                </div>
                {data.education && (
                  <div className="text-xs font-medium text-slate-700 line-clamp-1">
                    শিক্ষা: {data.education}
                  </div>
                )}
                {data.jobTitle && (
                  <div
                    className="text-xs font-bold"
                    style={{ color: currentTemplate.primaryColor }}
                  >
                    পেশা: {data.jobTitle} {data.companyName && `(${data.companyName})`}
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
                    alt={data.fullName}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div
                  className="w-24 h-32 sm:w-28 sm:h-36 rounded-xl border-2 border-dashed flex flex-col items-center justify-center text-slate-400 text-center p-2 shrink-0 bg-slate-50/50"
                  style={{ borderColor: currentTemplate.secondaryColor }}
                >
                  <ImageIcon className="w-6 h-6 mb-1 opacity-40" />
                  <span className="text-[10px] font-sans font-medium">ছবি যোগ করুন</span>
                </div>
              )}
            </div>

            {/* Section 1: Personal & Physical Details */}
            <div className="space-y-1.5 text-xs text-slate-800">
              <div
                className="font-bold text-[11px] tracking-wider uppercase border-b pb-0.5"
                style={{ color: currentTemplate.primaryColor, borderColor: currentTemplate.secondaryColor }}
              >
                ব্যক্তিগত বিবরণ (Personal Details)
              </div>
              <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px]">
                {data.birthPlace && <div><strong>জন্ম স্থান:</strong> {data.birthPlace}</div>}
                {data.bloodGroup && <div><strong>রক্তের গ্রুপ:</strong> {data.bloodGroup}</div>}
                {data.motherTongue && <div><strong>মাতৃভাষা:</strong> {data.motherTongue}</div>}
                {data.maritalStatus && <div><strong>বৈবাহিক অবস্থা:</strong> {data.maritalStatus}</div>}
                {data.diet && <div><strong>আহার:</strong> {data.diet}</div>}
              </div>
            </div>

            {/* Section 2: Astrological / Religious Details (If provided) */}
            {(data.religion || data.caste || data.gotra || data.rashi) && (
              <div className="space-y-1.5 text-xs text-slate-800">
                <div
                  className="font-bold text-[11px] tracking-wider uppercase border-b pb-0.5"
                  style={{ color: currentTemplate.primaryColor, borderColor: currentTemplate.secondaryColor }}
                >
                  ধর্ম ও কুষ্ঠি বিবরণ (Religious & Horoscope)
                </div>
                <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px]">
                  {data.religion && <div><strong>ধর্ম:</strong> {data.religion}</div>}
                  {data.caste && <div><strong>জাত:</strong> {data.caste} {data.subCaste && `(${data.subCaste})`}</div>}
                  {data.gotra && <div><strong>গোত্র:</strong> {data.gotra}</div>}
                  {data.rashi && <div><strong>রাশি:</strong> {data.rashi}</div>}
                  {data.nakshatra && <div><strong>নক্ষত্র:</strong> {data.nakshatra}</div>}
                  {data.manglik && <div><strong>মাঙ্গলিক:</strong> {data.manglik}</div>}
                </div>
              </div>
            )}

            {/* Section 3: Education & Career Details */}
            <div className="space-y-1.5 text-xs text-slate-800">
              <div
                className="font-bold text-[11px] tracking-wider uppercase border-b pb-0.5"
                style={{ color: currentTemplate.primaryColor, borderColor: currentTemplate.secondaryColor }}
              >
                শিক্ষা ও কর্মজীবন (Education & Career)
              </div>
              <div className="space-y-1 text-[11px]">
                {data.education && <div><strong>যোগ্যতা:</strong> {data.education} {data.collegeUniversity && `(${data.collegeUniversity})`}</div>}
                {data.occupation && <div><strong>পেশা:</strong> {data.occupation}</div>}
                {data.jobTitle && <div><strong>পদবী ও প্রতিষ্ঠান:</strong> {data.jobTitle} {data.companyName && `at ${data.companyName}`}</div>}
                {data.income && <div><strong>বার্ষিক আয়:</strong> {data.income}</div>}
                {data.workLocation && <div><strong>কর্মক্ষেত্র:</strong> {data.workLocation}</div>}
              </div>
            </div>

            {/* Section 4: Family Details */}
            <div className="space-y-1.5 text-xs text-slate-800">
              <div
                className="font-bold text-[11px] tracking-wider uppercase border-b pb-0.5"
                style={{ color: currentTemplate.primaryColor, borderColor: currentTemplate.secondaryColor }}
              >
                পারিবারিক বিবরণ (Family Background)
              </div>
              <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px]">
                {data.fatherName && <div><strong>বাবা:</strong> {data.fatherName}</div>}
                {data.fatherOccupation && <div><strong>পেশা:</strong> {data.fatherOccupation}</div>}
                {data.motherName && <div><strong>মা:</strong> {data.motherName}</div>}
                {data.motherOccupation && <div><strong>পেশা:</strong> {data.motherOccupation}</div>}
                {data.totalBrothers && <div><strong>ভাই:</strong> {data.totalBrothers}</div>}
                {data.totalSisters && <div><strong>বোন:</strong> {data.totalSisters}</div>}
                {data.familyType && <div><strong>পরিবার:</strong> {data.familyType}</div>}
                {data.nativePlace && <div><strong>পৈতৃক নিবাস:</strong> {data.nativePlace}</div>}
              </div>
            </div>

            {/* Section 5: Contact Details */}
            <div className="space-y-1.5 text-xs text-slate-800">
              <div
                className="font-bold text-[11px] tracking-wider uppercase border-b pb-0.5"
                style={{ color: currentTemplate.primaryColor, borderColor: currentTemplate.secondaryColor }}
              >
                যোগাযোগের ঠিকানা (Contact Details)
              </div>
              <div className="space-y-1 text-[11px]">
                {data.contactPerson && <div><strong>অভিভাবক:</strong> {data.contactPerson}</div>}
                <div className="flex flex-wrap gap-x-4">
                  {data.primaryPhone && <div><strong>ফোন:</strong> {data.primaryPhone}</div>}
                  {data.secondaryPhone && <div><strong>বিকল্প ফোন:</strong> {data.secondaryPhone}</div>}
                </div>
                {data.email && <div><strong>ইমেইল:</strong> {data.email}</div>}
                {data.address && <div><strong>ঠিকানা:</strong> {data.address}</div>}
              </div>
            </div>

            {/* Clean, Non-Intrusive Footer */}
            <div className="pt-2 text-center text-[10px] text-slate-400 border-t border-slate-200/60 font-sans">
              Free Matrimonial Profile generated via FreeMarriageBiodataMaker.com
            </div>
          </div>

          <p className="text-xs text-slate-500 text-center mt-3">
            * উপরে দেখতে পাওয়া ডিজাইনটিই হুবহু আপনার PDF এবং WhatsApp HD ছবিতে ডাউনলোড হবে।
          </p>
        </div>
      </div>
    </div>
  );
}
