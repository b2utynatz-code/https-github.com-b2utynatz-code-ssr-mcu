import React, { useState, useEffect, useMemo } from 'react';
import { 
  Building2, 
  BarChart3, 
  Users, 
  MessageSquareHeart, 
  Download, 
  Printer, 
  PlusCircle, 
  Sparkles,
  LayoutDashboard,
  Award,
  BookOpen
} from 'lucide-react';
import { SurveyResponse, FilterOptions } from './types';
import { INITIAL_RESPONSES } from './data/initialResponses';
import { getOverallStatistics } from './utils/statistics';
import { Header } from './components/Header';
import { OverviewCards } from './components/OverviewCards';
import { FiltersBar } from './components/FiltersBar';
import { DemographicsSection } from './components/DemographicsSection';
import { SatisfactionDashboard } from './components/SatisfactionDashboard';
import { FeedbackSection } from './components/FeedbackSection';
import { AddResponseModal } from './components/AddResponseModal';
import { PresentationMode } from './components/PresentationMode';
import { PrintReportView } from './components/PrintReportView';
import { 
  recordVisit, 
  getInitialOrStoredVisitorStats, 
  VisitorStats 
} from './utils/visitorCounter';
import { 
  VisitorFooterWidget, 
  VisitorDetailsModal 
} from './components/VisitorCounter';

const CURRENT_DATA_VERSION = 'v163_official';
const STORAGE_KEY = `mcu_audit_survey_2569_${CURRENT_DATA_VERSION}`;

export default function App() {
  // Clear any old mock caches and load authentic survey responses
  const [responses, setResponses] = useState<SurveyResponse[]>(() => {
    try {
      const legacyKeys = [
        'mcu_internal_audit_survey_2569',
        'mcu_internal_audit_survey_2569_actual',
        'mcu_internal_audit_survey_2569_v1',
        'mcu_internal_audit_survey_2569_v2',
        'mcu_internal_audit_survey_2569_v163'
      ];
      legacyKeys.forEach(k => {
        try { localStorage.removeItem(k); } catch (e) {}
      });

      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= INITIAL_RESPONSES.length) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading survey responses:', e);
    }
    return INITIAL_RESPONSES;
  });

  // Active section view
  const [activeTab, setActiveTab] = useState<'all' | 'demographics' | 'satisfaction' | 'feedback'>('all');

  // Modal & Presentation States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isPresentationOpen, setIsPresentationOpen] = useState(false);
  const [isVisitorModalOpen, setIsVisitorModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Visitor Counter State & Session Tracker
  const [visitorStats, setVisitorStats] = useState<VisitorStats>(() => getInitialOrStoredVisitorStats());

  useEffect(() => {
    // Record visit on page load
    const updated = recordVisit();
    setVisitorStats(updated);

    // Subtle realistic fluctuation for active online users
    const interval = setInterval(() => {
      setVisitorStats(prev => ({
        ...prev,
        onlineUsers: Math.max(2, Math.min(8, prev.onlineUsers + (Math.random() > 0.5 ? 1 : -1)))
      }));
    }, 35000);

    return () => clearInterval(interval);
  }, []);

  // Filters State
  const [filters, setFilters] = useState<FilterOptions>({
    department: '',
    position: '',
    serviceType: '',
    channel: '',
    searchKeyword: ''
  });

  // Save to localStorage when responses change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(responses));
    } catch (e) {
      console.error('Error saving survey responses:', e);
    }
  }, [responses]);

  // Show auto-dismissing toast
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Filter logic
  const filteredResponses = useMemo(() => {
    return responses.filter((r) => {
      if (filters.department && r.department !== filters.department) return false;
      if (filters.position && r.position !== filters.position) return false;
      if (filters.serviceType && r.serviceType !== filters.serviceType) return false;
      if (filters.channel && r.channel !== filters.channel) return false;

      if (filters.searchKeyword) {
        const term = filters.searchKeyword.toLowerCase();
        const matchesImp = r.impression?.toLowerCase().includes(term);
        const matchesExp = r.expectation?.toLowerCase().includes(term);
        const matchesSug = r.suggestion?.toLowerCase().includes(term);
        const matchesDept = r.department?.toLowerCase().includes(term);
        if (!matchesImp && !matchesExp && !matchesSug && !matchesDept) {
          return false;
        }
      }
      return true;
    });
  }, [responses, filters]);

  // Dynamic Statistical Calculations
  const stats = useMemo(() => {
    return getOverallStatistics(filteredResponses);
  }, [filteredResponses]);

  // Handlers
  const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters({
      department: '',
      position: '',
      serviceType: '',
      channel: '',
      searchKeyword: ''
    });
  };

  const handleAddResponse = (newResponse: SurveyResponse) => {
    setResponses(prev => [newResponse, ...prev]);
    showToast('บันทึกแบบประเมินความพึงพอใจเรียบร้อยแล้ว');
  };

  const handleResetData = () => {
    if (window.confirm('คุณต้องการล้างข้อมูลและประมวลผลสรุปใหม่จากไฟล์สำรวจทั้งหมด 163 ชุดหรือไม่?')) {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {}
      setResponses(INITIAL_RESPONSES);
      handleResetFilters();
      showToast('ประมวลผลสรุปข้อมูลใหม่จากไฟล์สำรวจ 163 ชุดเรียบร้อยแล้ว');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    // Generate CSV with BOM for Thai language Excel support
    const BOM = '\uFEFF';
    const headers = [
      'รหัสแบบสอบถาม',
      'วันเวลา',
      'หน่วยงาน',
      'ตำแหน่ง',
      'งานบริการที่ได้รับ',
      'ช่องทางที่ได้รับบริการ',
      '1.1 ความสุภาพกริยาวาจา',
      '1.2 ความรู้ความเชี่ยวชาญ',
      '1.3 ความเป็นอิสระเที่ยงธรรม',
      '1.4 ความตรงต่อเวลามาตรฐานวิชาชีพ',
      '1.5 การให้คำปรึกษาสร้างสรรค์',
      '2.1 แจ้งวัตถุประสงค์และแผนชัดเจน',
      '2.2 ช่องทางติดต่อสะดวกรวดเร็ว',
      '2.3 การขอเอกสารชัดเจนไม่ซ้ำซ้อน',
      '2.4 เปิดโอกาสชี้แจงรับฟัง',
      '2.5 สื่อสารผลเบื้องต้นทันเวลา',
      '3.1 รายงานถูกต้องตรงประเด็น',
      '3.2 ภาษาและรูปแบบกระชับชัดเจน',
      '3.3 ข้อเสนอแนะปฏิบัติได้จริง',
      '3.4 จัดส่งรายงานตรงเวลา',
      '3.5 รายงานมีประโยชน์ต่อการพัฒนา',
      'สิ่งที่ประทับใจ',
      'สิ่งที่คาดหวังในอนาคต',
      'ข้อเสนอแนะอื่นๆ'
    ];

    const rows = filteredResponses.map(r => [
      `"${r.id}"`,
      `"${r.timestamp}"`,
      `"${r.department}"`,
      `"${r.position}"`,
      `"${r.serviceType}"`,
      `"${r.channel}"`,
      r.auditor_q1,
      r.auditor_q2,
      r.auditor_q3,
      r.auditor_q4,
      r.auditor_q5,
      r.comm_q1,
      r.comm_q2,
      r.comm_q3,
      r.comm_q4,
      r.comm_q5,
      r.report_q1,
      r.report_q2,
      r.report_q3,
      r.report_q4,
      r.report_q5,
      `"${(r.impression || '').replace(/"/g, '""')}"`,
      `"${(r.expectation || '').replace(/"/g, '""')}"`,
      `"${(r.suggestion || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = BOM + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `MCU_Internal_Audit_Satisfaction_2569.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('ดาวน์โหลดไฟล์ CSV เรียบร้อยแล้ว');
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-['Sarabun',sans-serif]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center space-x-2 text-xs font-semibold animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Screen Header */}
      <Header
        totalResponses={responses.length}
        visitorStats={visitorStats}
        onOpenVisitorDetails={() => setIsVisitorModalOpen(true)}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onTogglePresentation={() => setIsPresentationOpen(true)}
        onPrint={handlePrint}
        onExportCSV={handleExportCSV}
        onResetData={handleResetData}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 print:hidden">
        {/* Navigation Tabs Bar */}
        <div className="bg-white rounded-2xl p-2 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'all'
                  ? 'bg-slate-900 text-white shadow-sm ring-1 ring-slate-800'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <LayoutDashboard className={`w-4 h-4 ${activeTab === 'all' ? 'text-amber-400' : 'text-slate-400'}`} />
              <span>แดชบอร์ดภาพรวมสรุปผล</span>
            </button>

            <button
              onClick={() => setActiveTab('demographics')}
              className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'demographics'
                  ? 'bg-slate-900 text-white shadow-sm ring-1 ring-slate-800'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Users className={`w-4 h-4 ${activeTab === 'demographics' ? 'text-amber-400' : 'text-slate-400'}`} />
              <span>ส่วนที่ 1 ข้อมูลทั่วไป</span>
              <span className={`px-2 py-0.2 rounded-full text-xs font-bold ${
                activeTab === 'demographics' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {filteredResponses.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('satisfaction')}
              className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'satisfaction'
                  ? 'bg-slate-900 text-white shadow-sm ring-1 ring-slate-800'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BarChart3 className={`w-4 h-4 ${activeTab === 'satisfaction' ? 'text-amber-400' : 'text-slate-400'}`} />
              <span>ส่วนที่ 2 สถิติความพึงพอใจ (15 ข้อ)</span>
            </button>

            <button
              onClick={() => setActiveTab('feedback')}
              className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'feedback'
                  ? 'bg-slate-900 text-white shadow-sm ring-1 ring-slate-800'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <MessageSquareHeart className={`w-4 h-4 ${activeTab === 'feedback' ? 'text-amber-400' : 'text-slate-400'}`} />
              <span>ส่วนที่ 3 ข้อเสนอแนะเพิ่มเติม</span>
            </button>
          </div>

          <div className="flex items-center space-x-2 text-xs text-slate-500 font-medium">
            <span className="hidden sm:inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>สถานะ: ข้อมูลล่าสุด {filteredResponses.length} ชุด</span>
          </div>
        </div>

        {/* Overview Metric Cards */}
        <OverviewCards
          overallMean={stats.overallMean}
          overallSD={stats.overallSD}
          overallPercentage={stats.overallPercentage}
          overallLevel={stats.overallLevel}
          totalCount={stats.totalCount}
          categoryStats={stats.categoryStats}
          totalVisits={visitorStats.totalVisits}
        />

        {/* Dynamic Filters Bar */}
        <FiltersBar
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          totalFiltered={filteredResponses.length}
          totalAll={responses.length}
        />

        {/* Section Contents based on Active Tab */}
        {(activeTab === 'all' || activeTab === 'demographics') && (
          <DemographicsSection responses={filteredResponses} />
        )}

        {(activeTab === 'all' || activeTab === 'satisfaction') && (
          <SatisfactionDashboard
            categoryStats={stats.categoryStats}
            questionStats={stats.questionStats}
            overallMean={stats.overallMean}
            overallSD={stats.overallSD}
            overallLevel={stats.overallLevel}
            topStrengths={stats.topStrengths}
            topImprovements={stats.topImprovements}
          />
        )}

        {(activeTab === 'all' || activeTab === 'feedback') && (
          <FeedbackSection responses={filteredResponses} />
        )}
      </main>

      {/* Official Print View (Only visible during print) */}
      <PrintReportView
        responses={filteredResponses}
        overallMean={stats.overallMean}
        overallSD={stats.overallSD}
        overallPercentage={stats.overallPercentage}
        overallLevel={stats.overallLevel}
        categoryStats={stats.categoryStats}
        topStrengths={stats.topStrengths}
        topImprovements={stats.topImprovements}
      />

      {/* Add Survey Response Modal */}
      <AddResponseModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddResponse}
      />

      {/* Slide Presentation Mode */}
      <PresentationMode
        isOpen={isPresentationOpen}
        onClose={() => setIsPresentationOpen(false)}
        responses={filteredResponses}
        overallMean={stats.overallMean}
        overallSD={stats.overallSD}
        overallPercentage={stats.overallPercentage}
        overallLevel={stats.overallLevel}
        categoryStats={stats.categoryStats}
        questionStats={stats.questionStats}
        topStrengths={stats.topStrengths}
        topImprovements={stats.topImprovements}
      />

      {/* Institutional Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-8 mt-12 border-t border-slate-800 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Institutional Visitor Counter Widget */}
          <VisitorFooterWidget 
            stats={visitorStats}
            onOpenDetails={() => setIsVisitorModalOpen(true)}
          />

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-2">
            <div className="flex items-center space-x-4">
              <img
                src="/20241021145538_42EA823B-7A8C-439D-A3D3-9D15E334ED6A.png"
                alt="ตราสัญลักษณ์ มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย"
                className="h-12 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/mcu_logo_web.png';
                }}
              />
              <div>
                <p className="font-bold text-slate-200">
                  สำนักงานตรวจสอบภายใน มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (มจร)
                </p>
                <p className="text-slate-400 mt-0.5">
                  อาคารวิทยบริการ ชั้น 4 ตำบลลำไทร อำเภอวังน้อย จังหวัดพระนครศรีอยุธยา 13170
                </p>
              </div>
            </div>

            <div className="text-center md:text-right text-slate-400">
              <p>รายงานผลการประเมินความพึงพอใจ ประจำปีงบประมาณ พ.ศ. 2569</p>
              <p className="text-slate-500 mt-0.5">
                สนับสนุนการกำกับดูแลกิจการที่ดีและการประกันคุณภาพงานตรวจสอบภายในตามมาตรฐานสากล
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Visitor Counter Details Modal */}
      <VisitorDetailsModal
        isOpen={isVisitorModalOpen}
        onClose={() => setIsVisitorModalOpen(false)}
        stats={visitorStats}
      />
    </div>
  );
}
