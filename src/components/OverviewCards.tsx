import React from 'react';
import { 
  Users, 
  Award, 
  UserCheck, 
  MessageSquareShare, 
  FileText, 
  TrendingUp,
  CheckCircle2
} from 'lucide-react';
import { CategoryStats } from '../types';

interface OverviewCardsProps {
  overallMean: number;
  overallSD: number;
  overallPercentage: number;
  overallLevel: { label: string; bgClass: string; color: string };
  totalCount: number;
  categoryStats: CategoryStats[];
  totalVisits?: number;
}

export const OverviewCards: React.FC<OverviewCardsProps> = ({
  overallMean,
  overallSD,
  overallPercentage,
  overallLevel,
  totalCount,
  categoryStats,
  totalVisits
}) => {
  const auditorCat = categoryStats.find(c => c.id === 'auditor');
  const commCat = categoryStats.find(c => c.id === 'communication');
  const reportCat = categoryStats.find(c => c.id === 'report');

  return (
    <div className="space-y-4">
      {/* Top Banner Target Metric */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-md">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-200/60 px-2 py-0.5 rounded">
                เกณฑ์เป้าหมายการประเมิน มหาวิทยาลัย ≥ 4.00 (80%)
              </span>
              <span className="inline-flex items-center text-xs font-semibold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                บรรลุเกินค่าเป้าหมาย
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-800 mt-1 font-['Prompt',sans-serif]">
              ภาพรวมผลการประเมินความพึงพอใจ อยู่ในระดับ "{overallLevel.label}"
            </h3>
            <p className="text-sm text-slate-600">
              วิเคราะห์จากกลุ่มตัวอย่างผู้บริหาร คณาจารย์ เจ้าหน้าที่การเงินและบุคลากรสายสนับสนุน จำนวนทั้งสิ้น {totalCount} ราย
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4 bg-white/80 backdrop-blur-xs px-4 py-2.5 rounded-xl border border-amber-200 self-start md:self-auto">
          <div className="text-right">
            <span className="text-xs text-slate-500 block">อัตราความพึงพอใจรวม</span>
            <span className="text-2xl font-black text-amber-900 font-['Prompt',sans-serif]">
              {overallPercentage}%
            </span>
          </div>
          <div className="h-8 w-px bg-amber-200"></div>
          <div className="text-right">
            <span className="text-xs text-slate-500 block">จำนวนผู้ตอบ</span>
            <span className="text-2xl font-black text-slate-800 font-['Prompt',sans-serif]">
              {totalCount} <span className="text-xs font-normal text-slate-500">คน</span>
            </span>
          </div>
          {typeof totalVisits === 'number' && (
            <>
              <div className="h-8 w-px bg-amber-200"></div>
              <div className="text-right">
                <span className="text-xs text-slate-500 block">ยอดผู้เข้าชม</span>
                <span className="text-2xl font-black text-amber-800 font-['Prompt',sans-serif]">
                  {totalVisits.toLocaleString()} <span className="text-xs font-normal text-slate-500">ครั้ง</span>
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: ภาพรวมทุกด้าน */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-amber-800 uppercase tracking-wide">คะแนนเฉลี่ยรวมทุกด้าน</span>
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 font-['Prompt',sans-serif]">
              {overallMean.toFixed(2)}
            </span>
            <span className="text-xs text-slate-400 font-medium">/ 5.00</span>
          </div>
          <div className="mt-2.5 flex items-center justify-between text-xs pt-2.5 border-t border-slate-100">
            <span className={`px-2 py-0.5 rounded-full font-semibold border ${overallLevel.bgClass}`}>
              {overallLevel.label}
            </span>
            <span className="text-slate-500">
              S.D. = <span className="font-semibold text-slate-700">{overallSD.toFixed(2)}</span>
            </span>
          </div>
        </div>

        {/* Card 2: ด้านผู้ตรวจสอบภายใน */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-blue-800 uppercase tracking-wide">1. ด้านผู้ตรวจสอบภายใน</span>
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 font-['Prompt',sans-serif]">
              {auditorCat?.mean.toFixed(2) || '0.00'}
            </span>
            <span className="text-xs text-slate-400 font-medium">/ 5.00</span>
          </div>
          <div className="mt-2.5 flex items-center justify-between text-xs pt-2.5 border-t border-slate-100">
            <span className="px-2 py-0.5 rounded-full font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              {auditorCat?.level || 'มากที่สุด'} ({auditorCat?.percentage}%)
            </span>
            <span className="text-slate-500">
              S.D. = <span className="font-semibold text-slate-700">{auditorCat?.sd.toFixed(2) || '0.00'}</span>
            </span>
          </div>
        </div>

        {/* Card 3: ด้านการสื่อสาร */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">2. ด้านการสื่อสาร</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <MessageSquareShare className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 font-['Prompt',sans-serif]">
              {commCat?.mean.toFixed(2) || '0.00'}
            </span>
            <span className="text-xs text-slate-400 font-medium">/ 5.00</span>
          </div>
          <div className="mt-2.5 flex items-center justify-between text-xs pt-2.5 border-t border-slate-100">
            <span className="px-2 py-0.5 rounded-full font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              {commCat?.level || 'มากที่สุด'} ({commCat?.percentage}%)
            </span>
            <span className="text-slate-500">
              S.D. = <span className="font-semibold text-slate-700">{commCat?.sd.toFixed(2) || '0.00'}</span>
            </span>
          </div>
        </div>

        {/* Card 4: ด้านการรายงานผล */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-purple-800 uppercase tracking-wide">3. ด้านการรายงานผล</span>
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 font-['Prompt',sans-serif]">
              {reportCat?.mean.toFixed(2) || '0.00'}
            </span>
            <span className="text-xs text-slate-400 font-medium">/ 5.00</span>
          </div>
          <div className="mt-2.5 flex items-center justify-between text-xs pt-2.5 border-t border-slate-100">
            <span className="px-2 py-0.5 rounded-full font-semibold bg-purple-50 text-purple-700 border border-purple-200">
              {reportCat?.level || 'มากที่สุด'} ({reportCat?.percentage}%)
            </span>
            <span className="text-slate-500">
              S.D. = <span className="font-semibold text-slate-700">{reportCat?.sd.toFixed(2) || '0.00'}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
