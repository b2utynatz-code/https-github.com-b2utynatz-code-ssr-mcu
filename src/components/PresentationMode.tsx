import React, { useState, useEffect } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Award, 
  Building2, 
  UserCheck, 
  MessageSquareShare, 
  FileText, 
  TrendingUp, 
  CheckCircle2, 
  Compass, 
  HeartHandshake,
  Maximize2
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ReferenceLine,
  Cell
} from 'recharts';
import { CategoryStats, SurveyResponse } from '../types';
import { getDemographicDistribution } from '../utils/statistics';

interface PresentationModeProps {
  isOpen: boolean;
  onClose: () => void;
  responses: SurveyResponse[];
  overallMean: number;
  overallSD: number;
  overallPercentage: number;
  overallLevel: any;
  categoryStats: CategoryStats[];
  questionStats: any[];
  topStrengths: any[];
  topImprovements: any[];
}

export const PresentationMode: React.FC<PresentationModeProps> = ({
  isOpen,
  onClose,
  responses,
  overallMean,
  overallSD,
  overallPercentage,
  overallLevel,
  categoryStats,
  questionStats,
  topStrengths,
  topImprovements
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        setCurrentSlide(prev => Math.min(prev + 1, 4));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlide(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const dist = getDemographicDistribution(responses);

  const radarData = categoryStats.map(c => ({
    category: c.name.replace('ด้าน', ''),
    score: c.mean,
    benchmark: 4.00
  }));

  const slideTitles = [
    '1. บทสรุปผู้บริหารและภาพรวมผลการประเมิน',
    '2. ส่วนที่ 1 ข้อมูลทั่วไปของผู้ตอบแบบสำรวจ',
    '3. ส่วนที่ 2 ผลประเมินความพึงพอใจเปรียบเทียบ 3 มิติ',
    '4. ส่วนที่ 2 วิเคราะห์เจาะลึกความพึงพอใจรายข้อ (15 ประเด็น)',
    '5. ส่วนที่ 3 เสียงสะท้อนเชิงคุณภาพและข้อเสนอแนะพัฒนา'
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 text-white flex flex-col justify-between overflow-hidden">
      {/* Top Presentation Bar */}
      <div className="bg-slate-900/90 border-b border-slate-800 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            src="/20241021145538_42EA823B-7A8C-439D-A3D3-9D15E334ED6A.png"
            alt="ตราสัญลักษณ์ มจร"
            className="w-9 h-9 object-contain"
            referrerPolicy="no-referrer"
          />
          <div>
            <h2 className="text-sm font-bold text-amber-400 font-['Prompt',sans-serif]">
              นำเสนอผลการประเมินความพึงพอใจ สำนักงานตรวจสอบภายใน มจร 2569
            </h2>
            <span className="text-xs text-slate-400">
              สไลด์ที่ {currentSlide + 1} / 5 : {slideTitles[currentSlide]}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="hidden sm:flex items-center space-x-1 bg-slate-800 p-1 rounded-lg text-xs">
            {[0, 1, 2, 3, 4].map((idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`px-3 py-1 rounded-md transition-colors ${
                  currentSlide === idx ? 'bg-amber-500 text-amber-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
            title="ออกจากโหมดนำเสนอ (ESC)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Slide Canvas */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-6 sm:p-10 flex flex-col justify-center overflow-y-auto">
        {/* SLIDE 1: Executive Summary */}
        {currentSlide === 0 && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="text-center max-w-3xl mx-auto">
              <div className="flex justify-center mb-4">
                <img
                  src="/20241021145538_42EA823B-7A8C-439D-A3D3-9D15E334ED6A.png"
                  alt="ตราสัญลักษณ์ มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย"
                  className="h-24 w-auto object-contain drop-shadow-lg"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-amber-500/20 text-amber-400 border border-amber-500/30">
                รายงานประจำปีงบประมาณ พ.ศ. 2569
              </span>
              <h1 className="text-3xl sm:text-5xl font-black mt-4 font-['Prompt',sans-serif] text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-amber-300">
                สรุปผลการสำรวจความพึงพอใจของผู้รับบริการ
              </h1>
              <p className="text-slate-400 text-base sm:text-lg mt-2 font-light">
                สำนักงานตรวจสอบภายใน มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย
              </p>
            </div>

            {/* Metric Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 text-center shadow-xl">
                <span className="text-xs text-slate-400 uppercase tracking-wider block">คะแนนเฉลี่ยรวมทุกด้าน</span>
                <span className="text-5xl font-black text-amber-400 font-['Prompt',sans-serif] block mt-2">
                  {overallMean.toFixed(2)}
                </span>
                <span className="text-xs text-slate-500 block mt-1">เต็ม 5.00 (S.D. = {overallSD.toFixed(2)})</span>
                <div className="mt-3 inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                  ระดับ "{overallLevel.label}"
                </div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 text-center shadow-xl">
                <span className="text-xs text-slate-400 uppercase tracking-wider block">อัตราความพึงพอใจ</span>
                <span className="text-5xl font-black text-emerald-400 font-['Prompt',sans-serif] block mt-2">
                  {overallPercentage}%
                </span>
                <span className="text-xs text-slate-500 block mt-1">เกณฑ์เป้าหมายมหาวิทยาลัย ≥ 80%</span>
                <div className="mt-3 inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                  บรรลุเกินเป้าหมาย
                </div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 text-center shadow-xl">
                <span className="text-xs text-slate-400 uppercase tracking-wider block">กลุ่มตัวอย่างผู้ตอบ</span>
                <span className="text-5xl font-black text-sky-400 font-['Prompt',sans-serif] block mt-2">
                  {responses.length}
                </span>
                <span className="text-xs text-slate-500 block mt-1">ผู้บริหาร คณาจารย์ บุคลากร</span>
                <div className="mt-3 inline-block px-3 py-1 rounded-full bg-sky-500/20 text-sky-400 text-xs font-bold border border-sky-500/30">
                  ครอบคลุมทุกส่วนงาน
                </div>
              </div>
            </div>

            {/* 3 Categories Mini Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {categoryStats.map((c) => (
                <div key={c.id} className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-4 flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-300">{c.name}</span>
                  <span className="text-lg font-bold text-amber-300">{c.mean.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SLIDE 2: Demographics */}
        {currentSlide === 1 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <span className="text-xs font-bold text-amber-400 tracking-wider uppercase">ส่วนที่ 1: กลุ่มตัวอย่าง</span>
              <h2 className="text-2xl sm:text-3xl font-bold font-['Prompt',sans-serif] text-white">
                โครงสร้างข้อมูลทั่วไปของผู้รับบริการที่ตอบแบบสำรวจ
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Unit breakdown */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
                <h3 className="text-sm font-bold text-amber-400 mb-2 font-['Prompt',sans-serif]">
                  1. หน่วยงานผู้รับบริการ (Top Units)
                </h3>
                <div className="space-y-2 text-xs">
                  {dist.departments.slice(0, 5).map((d) => (
                    <div key={d.name} className="flex justify-between items-center text-slate-300">
                      <span className="truncate max-w-[170px]">{d.name}</span>
                      <span className="font-bold text-amber-400">{d.count} ({d.percentage}%)</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Positions */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
                <h3 className="text-sm font-bold text-sky-400 mb-2 font-['Prompt',sans-serif]">
                  2. กลุ่มตำแหน่งผู้ตอบ
                </h3>
                <div className="space-y-2 text-xs">
                  {dist.positions.map((p) => (
                    <div key={p.name} className="flex justify-between items-center text-slate-300">
                      <span className="truncate max-w-[170px]">{p.name}</span>
                      <span className="font-bold text-sky-400">{p.count} ({p.percentage}%)</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service Types */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
                <h3 className="text-sm font-bold text-emerald-400 mb-2 font-['Prompt',sans-serif]">
                  3. ประเภทบริการที่ได้รับ
                </h3>
                <div className="space-y-2 text-xs">
                  {dist.serviceTypes.slice(0, 5).map((s) => (
                    <div key={s.name} className="flex justify-between items-center text-slate-300">
                      <span className="truncate max-w-[170px]">{s.name}</span>
                      <span className="font-bold text-emerald-400">{s.count} ({s.percentage}%)</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Channels */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
                <h3 className="text-sm font-bold text-purple-400 mb-2 font-['Prompt',sans-serif]">
                  4. ช่องทางที่ได้รับบริการ
                </h3>
                <div className="space-y-2 text-xs">
                  {dist.channels.map((c) => (
                    <div key={c.name} className="flex justify-between items-center text-slate-300">
                      <span className="truncate max-w-[170px]">{c.name}</span>
                      <span className="font-bold text-purple-400">{c.count} ({c.percentage}%)</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 3: 3 Dimensions Radar Comparison */}
        {currentSlide === 2 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <span className="text-xs font-bold text-amber-400 tracking-wider uppercase">ส่วนที่ 2: ความพึงพอใจ 3 มิติ</span>
              <h2 className="text-2xl sm:text-3xl font-bold font-['Prompt',sans-serif] text-white">
                เปรียบเทียบผลการประเมิน 3 ด้านหลักกับเกณฑ์มาตรฐาน
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Radar Visual */}
              <div className="h-80 w-full bg-slate-900/80 border border-slate-800 rounded-3xl p-4 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData} outerRadius="75%">
                    <PolarGrid stroke="#334155" />
                    <PolarAngleAxis dataKey="category" tick={{ fontSize: 13, fill: '#f8fafc', fontWeight: 600 }} />
                    <PolarRadiusAxis domain={[3.5, 5.0]} angle={30} tick={{ fontSize: 11, fill: '#64748b' }} />
                    <Radar
                      name="คะแนนเฉลี่ยจริง"
                      dataKey="score"
                      stroke="#f59e0b"
                      fill="#f59e0b"
                      fillOpacity={0.4}
                    />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff' }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* 3 Categories Detail */}
              <div className="space-y-4">
                {categoryStats.map((c, idx) => (
                  <div key={c.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-base text-white font-['Prompt',sans-serif]">
                        {idx + 1}. {c.name}
                      </span>
                      <span className="text-xl font-black text-amber-400">
                        {c.mean.toFixed(2)} <span className="text-xs text-slate-400">/ 5.00</span>
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full"
                        style={{ width: `${(c.mean / 5) * 100}%` }}
                      ></div>
                    </div>
                    <div className="mt-2 flex justify-between text-xs text-slate-400">
                      <span>ร้อยละ {c.percentage}%</span>
                      <span>S.D. = {c.sd.toFixed(2)} | ระดับ "{c.level}"</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 4: 15-Item Performance & Strengths */}
        {currentSlide === 3 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <span className="text-xs font-bold text-amber-400 tracking-wider uppercase">ส่วนที่ 2: สถิติรายข้อ</span>
              <h2 className="text-2xl sm:text-3xl font-bold font-['Prompt',sans-serif] text-white">
                จุดเด่นสูงสุด และ ประเด็นที่ควรส่งเสริมพัฒนาต่อเนื่อง
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Strengths */}
              <div className="bg-slate-900/80 border border-emerald-500/40 rounded-2xl p-5">
                <div className="flex items-center space-x-2 text-emerald-400 mb-3">
                  <Award className="w-5 h-5" />
                  <h3 className="font-bold text-base font-['Prompt',sans-serif]">
                    3 ประเด็นที่มีคะแนนสูงสุด (Key Strengths)
                  </h3>
                </div>
                <div className="space-y-3">
                  {topStrengths.map((item, idx) => (
                    <div key={item.id} className="bg-slate-800/80 p-3 rounded-xl border border-emerald-500/20 flex justify-between items-center gap-3">
                      <div>
                        <span className="text-xs text-emerald-400 font-bold block">ข้อ {item.code} - {item.categoryTitle}</span>
                        <p className="text-xs text-slate-300 mt-0.5">{item.title}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xl font-bold text-emerald-400 block">{item.mean.toFixed(2)}</span>
                        <span className="text-[10px] text-slate-400 block">S.D. {item.sd.toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Opportunities */}
              <div className="bg-slate-900/80 border border-amber-500/40 rounded-2xl p-5">
                <div className="flex items-center space-x-2 text-amber-400 mb-3">
                  <TrendingUp className="w-5 h-5" />
                  <h3 className="font-bold text-base font-['Prompt',sans-serif]">
                    3 ประเด็นที่ควรส่งเสริมพัฒนา (Opportunities)
                  </h3>
                </div>
                <div className="space-y-3">
                  {topImprovements.map((item, idx) => (
                    <div key={item.id} className="bg-slate-800/80 p-3 rounded-xl border border-amber-500/20 flex justify-between items-center gap-3">
                      <div>
                        <span className="text-xs text-amber-400 font-bold block">ข้อ {item.code} - {item.categoryTitle}</span>
                        <p className="text-xs text-slate-300 mt-0.5">{item.title}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xl font-bold text-amber-400 block">{item.mean.toFixed(2)}</span>
                        <span className="text-[10px] text-slate-400 block">S.D. {item.sd.toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 5: Qualitative Insights & Future Actions */}
        {currentSlide === 4 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <span className="text-xs font-bold text-amber-400 tracking-wider uppercase">ส่วนที่ 3: ข้อเสนอแนะเชิงพัฒนา</span>
              <h2 className="text-2xl sm:text-3xl font-bold font-['Prompt',sans-serif] text-white">
                เสียงสะท้อนจากผู้รับบริการ และ แผนพัฒนาการบริการ ปีงบประมาณ 2570
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
                <div className="flex items-center space-x-2 text-rose-400 mb-3">
                  <HeartHandshake className="w-5 h-5" />
                  <h3 className="font-bold text-sm font-['Prompt',sans-serif]">1. สิ่งที่ประทับใจเด่นชัด</h3>
                </div>
                <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4 leading-relaxed">
                  <li>ให้คำแนะนำและชี้แนะตรงไปตรงมา จริงใจ มีความเป็นกัลยาณมิตร</li>
                  <li>มีความรอบรู้ในระเบียบวิชาชีพและให้ความกระจ่างในประเด็นปัญหา</li>
                  <li>ปฏิบัติหน้าที่ด้วยความโปร่งใส เที่ยงธรรม ช่วยแก้ปัญหาได้ตรงจุด</li>
                </ul>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
                <div className="flex items-center space-x-2 text-sky-400 mb-3">
                  <Compass className="w-5 h-5" />
                  <h3 className="font-bold text-sm font-['Prompt',sans-serif]">2. สิ่งที่คาดหวังในอนาคต</h3>
                </div>
                <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4 leading-relaxed">
                  <li>ต้องการให้ลงพื้นที่เข้าตรวจสอบเป็นประจำทุกปีและสม่ำเสมอ</li>
                  <li>จัดสัมมนาฝึกอบรมระเบียบการเงิน พัสดุ และการควบคุมภายในแก่ส่วนงาน</li>
                  <li>เป็นพี่เลี้ยงให้คำปรึกษาแนะนำการปฏิบัติงานตามประกาศและระเบียบ</li>
                </ul>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
                <div className="flex items-center space-x-2 text-amber-400 mb-3">
                  <CheckCircle2 className="w-5 h-5" />
                  <h3 className="font-bold text-sm font-['Prompt',sans-serif]">3. แผนการยกระดับบริการ</h3>
                </div>
                <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4 leading-relaxed">
                  <li>ขยายการให้คำปรึกษาเชิงรุกและให้คำแนะนำแบบรายกรณีผ่านช่องทางออนไลน์</li>
                  <li>จัดทำคู่มือแนวปฏิบัติที่ดี (Best Practice) และสรุปประเด็นข้อตรวจพบ</li>
                  <li>เสริมสร้างระบบการควบคุมภายในที่เข้มแข็งเพื่อความโปร่งใสในทุกส่วนงาน</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation Controls */}
      <div className="bg-slate-900 border-t border-slate-800 px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => setCurrentSlide(prev => Math.max(prev - 1, 0))}
          disabled={currentSlide === 0}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white text-xs font-semibold transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          สไลด์ก่อนหน้า
        </button>

        <div className="flex items-center space-x-2">
          {[0, 1, 2, 3, 4].map((idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                currentSlide === idx ? 'bg-amber-400 w-6' : 'bg-slate-700'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => setCurrentSlide(prev => Math.min(prev + 1, 4))}
          disabled={currentSlide === 4}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-30 text-white text-xs font-semibold transition-colors"
        >
          สไลด์ถัดไป
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
