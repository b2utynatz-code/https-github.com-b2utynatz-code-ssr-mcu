import React from 'react';
import { 
  Presentation, 
  Printer, 
  Download, 
  RotateCcw,
  Sparkles,
  Award,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import { VisitorStats } from '../utils/visitorCounter';
import { VisitorBadge } from './VisitorCounter';

interface HeaderProps {
  totalResponses: number;
  visitorStats: VisitorStats;
  onOpenVisitorDetails: () => void;
  onOpenAddModal?: () => void;
  onTogglePresentation: () => void;
  onPrint: () => void;
  onExportCSV: () => void;
  onResetData: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  totalResponses,
  visitorStats,
  onOpenVisitorDetails,
  onOpenAddModal,
  onTogglePresentation,
  onPrint,
  onExportCSV,
  onResetData
}) => {
  return (
    <header className="bg-slate-900 text-white shadow-xl print:hidden border-b border-slate-800 relative overflow-hidden">
      {/* Subtle modern background decorative lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-0"></div>
      <div className="absolute -top-10 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl pointer-events-none -z-0"></div>

      {/* Main Header Container - System name bar hidden per user request */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          {/* Logo & Academic Title */}
          <div className="flex items-center space-x-4 sm:space-x-5">
            {/* Official Uploaded MCU Logo */}
            <div className="relative shrink-0 flex items-center justify-center p-1.5 rounded-2xl bg-white/5 border border-white/10 shadow-inner backdrop-blur-xs">
              <img
                src="/20241021145538_42EA823B-7A8C-439D-A3D3-9D15E334ED6A.png"
                alt="ตราสัญลักษณ์ มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย"
                className="h-16 w-auto sm:h-20 object-contain drop-shadow-md transition-transform duration-300 hover:scale-105"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // Fallback if full path has issue
                  (e.target as HTMLImageElement).src = '/mcu_logo_web.png';
                }}
              />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  สำนักงานตรวจสอบภายใน
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700/80">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800/80 text-amber-400/90 border border-slate-700/60">
                  <Calendar className="w-3 h-3" />
                  ปีงบประมาณ พ.ศ. 2569
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white mt-2 font-['Prompt',sans-serif]">
                รายงานสรุปผลการสำรวจความพึงพอใจของผู้รับบริการ
              </h1>
              <p className="text-slate-300/90 text-xs sm:text-sm mt-1 font-light">
                ต่อการปฏิบัติงานของสำนักงานตรวจสอบภายใน มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย
              </p>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 self-start lg:self-center">
            {/* Live Visitor Counter Badge */}
            <VisitorBadge 
              stats={visitorStats} 
              onOpenDetails={onOpenVisitorDetails} 
            />

            <button
              id="btn-presentation-mode"
              onClick={onTogglePresentation}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs sm:text-sm font-medium border border-slate-700 transition-all shadow-xs hover:border-amber-500/40"
              title="เปิดโหมดนำเสนอสำหรับที่ประชุมหรือคณะกรรมการ"
            >
              <Presentation className="w-4 h-4 text-amber-400" />
              <span>โหมดนำเสนอ</span>
            </button>

            <button
              id="btn-print-report"
              onClick={onPrint}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-100 text-xs sm:text-sm font-medium border border-slate-700 transition-all shadow-xs"
              title="พิมพ์แบบรายงานสรุปทางการ"
            >
              <Printer className="w-4 h-4 text-slate-300" />
              <span>พิมพ์รายงาน</span>
            </button>

            <button
              id="btn-export-csv"
              onClick={onExportCSV}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-100 text-xs sm:text-sm font-medium border border-slate-700 transition-all shadow-xs"
              title="ดาวน์โหลดข้อมูลสรุปในรูปแบบ CSV สำหรับ Excel"
            >
              <Download className="w-4 h-4 text-slate-300" />
              <span>ส่งออก CSV</span>
            </button>

            <button
              id="btn-reset-data"
              onClick={onResetData}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700/60 transition-colors"
              title="รีเซ็ตข้อมูลสู่ค่าเริ่มต้น"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
