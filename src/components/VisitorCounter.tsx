import React, { useState } from 'react';
import { 
  Eye, 
  Users, 
  Activity, 
  Calendar, 
  Clock, 
  TrendingUp, 
  X, 
  ShieldCheck, 
  Sparkles,
  BarChart2
} from 'lucide-react';
import { VisitorStats, formatOdometerDigits } from '../utils/visitorCounter';

interface VisitorBadgeProps {
  stats: VisitorStats;
  onOpenDetails: () => void;
}

export const VisitorBadge: React.FC<VisitorBadgeProps> = ({ stats, onOpenDetails }) => {
  return (
    <button
      id="btn-visitor-counter-badge"
      onClick={onOpenDetails}
      className="group inline-flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 text-xs font-medium border border-slate-700/80 hover:border-amber-500/50 shadow-xs transition-all cursor-pointer"
      title="คลิกเพื่อดูรายละเอียดสถิติผู้เข้าชมเว็บไซต์"
    >
      <div className="flex items-center gap-1.5">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <Eye className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
      </div>

      <div className="flex items-center gap-2 text-[11px] sm:text-xs">
        <span>
          ผู้เข้าชม: <strong className="text-white font-semibold font-mono">{stats.totalVisits.toLocaleString()}</strong> ครั้ง
        </span>
        <span className="text-slate-500 hidden sm:inline">|</span>
        <span className="hidden sm:inline-flex items-center gap-1 text-emerald-300">
          <Users className="w-3 h-3 text-emerald-400" />
          <span>ออนไลน์ {stats.onlineUsers}</span>
        </span>
      </div>
    </button>
  );
};

interface VisitorFooterWidgetProps {
  stats: VisitorStats;
  onOpenDetails: () => void;
}

export const VisitorFooterWidget: React.FC<VisitorFooterWidgetProps> = ({ stats, onOpenDetails }) => {
  const digits = formatOdometerDigits(stats.totalVisits, 6);

  return (
    <div className="bg-slate-950/80 border border-slate-800/90 rounded-2xl p-4 text-slate-300 shadow-inner">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <BarChart2 className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
              สถิติการเข้าชมเว็บไซต์ (Visitor Counter)
            </h4>
            <p className="text-[11px] text-slate-400">
              สำนักงานตรวจสอบภายใน มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย
            </p>
          </div>
        </div>

        {/* Digital Odometer Display */}
        <div className="flex items-center gap-1 bg-slate-900 px-2 py-1 rounded-xl border border-slate-800 self-start sm:self-auto">
          <span className="text-[10px] text-slate-400 mr-1 font-sans">รวม:</span>
          <div className="flex gap-0.5">
            {digits.map((digit, idx) => (
              <span
                key={idx}
                className="w-5 h-6 rounded bg-slate-950 text-amber-400 font-mono text-xs font-bold flex items-center justify-center border border-amber-500/30 shadow-xs"
              >
                {digit}
              </span>
            ))}
          </div>
          <span className="text-[10px] text-slate-400 ml-1 font-sans">ครั้ง</span>
        </div>
      </div>

      {/* Breakdown Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
        <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/60">
          <span className="text-[10px] text-slate-400 block mb-0.5">วันนี้</span>
          <div className="flex items-baseline gap-1">
            <span className="text-base font-bold text-white font-mono">{stats.todayVisits.toLocaleString()}</span>
            <span className="text-[10px] text-slate-500">ครั้ง</span>
          </div>
        </div>

        <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/60">
          <span className="text-[10px] text-slate-400 block mb-0.5">เดือนนี้</span>
          <div className="flex items-baseline gap-1">
            <span className="text-base font-bold text-white font-mono">{stats.monthVisits.toLocaleString()}</span>
            <span className="text-[10px] text-slate-500">ครั้ง</span>
          </div>
        </div>

        <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/60">
          <span className="text-[10px] text-slate-400 block mb-0.5">กำลังออนไลน์</span>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-base font-bold text-emerald-400 font-mono">{stats.onlineUsers}</span>
            <span className="text-[10px] text-slate-500">คน</span>
          </div>
        </div>

        <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/60 flex flex-col justify-between">
          <span className="text-[10px] text-slate-400 block mb-0.5">เริ่มบันทึกระบบ</span>
          <span className="text-[11px] text-amber-300 font-medium">ปีงบประมาณ 2569</span>
        </div>
      </div>

      <div className="mt-3 pt-2 text-right">
        <button
          onClick={onOpenDetails}
          className="text-[11px] text-amber-400 hover:text-amber-300 underline underline-offset-2 transition-colors cursor-pointer"
        >
          ดูรายงานสถิติผู้เข้าชมแบบละเอียด &rarr;
        </button>
      </div>
    </div>
  );
};

interface VisitorDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: VisitorStats;
}

export const VisitorDetailsModal: React.FC<VisitorDetailsModalProps> = ({ isOpen, onClose, stats }) => {
  if (!isOpen) return null;

  const digits = formatOdometerDigits(stats.totalVisits, 6);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-slate-900 text-slate-100 rounded-3xl border border-slate-700 max-w-lg w-full p-6 shadow-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative blur lighting */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white font-['Prompt',sans-serif]">
                สถิติการเข้าชมเว็บไซต์ (Visitor Statistics)
              </h3>
              <p className="text-xs text-slate-400 font-light">
                ระบบรายงานสรุปผลความพึงพอใจ สำนักงานตรวจสอบภายใน มจร
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Digital Counter Display */}
        <div className="my-5 p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center">
          <span className="text-xs text-slate-400 mb-2">จำนวนการเข้าชมสะสมทั้งหมด</span>
          <div className="flex items-center gap-1.5">
            {digits.map((digit, idx) => (
              <span
                key={idx}
                className="w-8 h-10 sm:w-9 sm:h-12 rounded-lg bg-slate-900 text-amber-400 font-mono text-xl sm:text-2xl font-black flex items-center justify-center border border-amber-500/40 shadow-inner"
              >
                {digit}
              </span>
            ))}
            <span className="text-sm font-medium text-slate-400 ml-2">ครั้ง</span>
          </div>
          <div className="flex items-center gap-2 mt-3 text-[11px] text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>สถานะระบบ: บันทึกสถิติแบบเรียลไทม์ (Active Online)</span>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 text-xs mb-5">
          <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-800">
            <div className="flex items-center gap-2 text-slate-400 mb-1">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>เข้าชมวันนี้</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold text-white font-mono">{stats.todayVisits.toLocaleString()}</span>
              <span className="text-slate-500 text-[11px]">ครั้ง</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-800">
            <div className="flex items-center gap-2 text-slate-400 mb-1">
              <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
              <span>เข้าชมเดือนนี้</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold text-white font-mono">{stats.monthVisits.toLocaleString()}</span>
              <span className="text-slate-500 text-[11px]">ครั้ง</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-800">
            <div className="flex items-center gap-2 text-slate-400 mb-1">
              <Users className="w-3.5 h-3.5 text-emerald-400" />
              <span>กำลังออนไลน์ขณะนี้</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold text-emerald-400 font-mono">{stats.onlineUsers}</span>
              <span className="text-slate-500 text-[11px]">คน</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-800">
            <div className="flex items-center gap-2 text-slate-400 mb-1">
              <Clock className="w-3.5 h-3.5 text-purple-400" />
              <span>เข้าชมล่าสุด</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm font-semibold text-slate-200 font-mono">{stats.lastVisitTime} น.</span>
            </div>
          </div>
        </div>

        {/* Informational Footer */}
        <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/70 text-[11px] text-slate-400 space-y-1.5">
          <div className="flex items-center gap-2 font-medium text-slate-300">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>ระบบนับผู้เข้าชมและประมวลผลตามมาตรฐานสถิติ</span>
          </div>
          <p className="font-light leading-relaxed">
            นับการเข้าชมแบบไม่ซ้ำในแต่ละเซสชัน (Unique Session Views) เพื่อการประเมินการเผยแพร่ข้อมูลสารสนเทศและความโปร่งใสในการดำเนินงานของสำนักงานตรวจสอบภายใน
          </p>
        </div>

        {/* Close Button */}
        <div className="mt-5 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-colors"
          >
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  );
};
