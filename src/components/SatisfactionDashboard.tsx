import React, { useState } from 'react';
import { 
  BarChart3, 
  Radar as RadarIcon, 
  Table as TableIcon, 
  Sparkles, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  Award,
  ChevronDown,
  Layers
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ReferenceLine, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  Cell 
} from 'recharts';
import { CategoryStats, SurveyResponse } from '../types';
import { LIKERT_LEVELS } from '../data/surveyQuestions';

interface SatisfactionDashboardProps {
  categoryStats: CategoryStats[];
  questionStats: any[];
  overallMean: number;
  overallSD: number;
  overallLevel: any;
  topStrengths: any[];
  topImprovements: any[];
}

export const SatisfactionDashboard: React.FC<SatisfactionDashboardProps> = ({
  categoryStats,
  questionStats,
  overallMean,
  overallSD,
  overallLevel,
  topStrengths,
  topImprovements
}) => {
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<'all' | 'auditor' | 'communication' | 'report'>('all');
  const [viewMode, setViewMode] = useState<'charts' | 'table'>('charts');

  // Radar Data for the 3 Categories
  const radarData = categoryStats.map(c => ({
    category: c.name.replace('ด้าน', ''),
    score: c.mean,
    benchmark: 4.00,
    fullMark: 5.00
  }));

  // Filter questions according to tab
  const filteredQuestions = selectedCategoryTab === 'all' 
    ? questionStats 
    : questionStats.filter(q => {
        if (selectedCategoryTab === 'auditor') return q.category === 'auditor';
        if (selectedCategoryTab === 'communication') return q.category === 'comm';
        if (selectedCategoryTab === 'report') return q.category === 'report';
        return true;
      });

  const getCategoryColor = (cat: string) => {
    if (cat === 'auditor') return '#b45309'; // amber-700
    if (cat === 'comm') return '#0284c7'; // sky-600
    return '#7c3aed'; // violet-600
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-3">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
            ส่วนที่ 2
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 font-['Prompt',sans-serif]">
              แบบประเมินความพึงพอใจต่อการปฏิบัติงาน (15 ประเด็น)
            </h2>
            <p className="text-xs text-slate-500">
              วิเคราะห์เปรียบเทียบค่าเฉลี่ย (X̄), ส่วนเบี่ยงเบนมาตรฐาน (S.D.) และระดับความพึงพอใจตามเกณฑ์มาตรฐาน Likert
            </p>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl self-start sm:self-auto">
          <button
            onClick={() => setViewMode('charts')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'charts' 
                ? 'bg-white text-amber-900 shadow-xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            กราฟเปรียบเทียบ
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'table' 
                ? 'bg-white text-amber-900 shadow-xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <TableIcon className="w-3.5 h-3.5" />
            ตารางสถิติเชิงวิชาการ
          </button>
        </div>
      </div>

      {/* Category Navigation Pills */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategoryTab('all')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
            selectedCategoryTab === 'all'
              ? 'bg-amber-900 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          ภาพรวมทุกด้าน (15 ข้อ)
        </button>
        <button
          onClick={() => setSelectedCategoryTab('auditor')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
            selectedCategoryTab === 'auditor'
              ? 'bg-amber-700 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          1. ด้านผู้ตรวจสอบภายใน (5 ข้อ)
        </button>
        <button
          onClick={() => setSelectedCategoryTab('communication')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
            selectedCategoryTab === 'communication'
              ? 'bg-sky-700 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          2. ด้านการสื่อสาร (5 ข้อ)
        </button>
        <button
          onClick={() => setSelectedCategoryTab('report')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
            selectedCategoryTab === 'report'
              ? 'bg-purple-700 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          3. ด้านการรายงานผล (5 ข้อ)
        </button>
      </div>

      {viewMode === 'charts' ? (
        <>
          {/* Main Visuals: Radar Comparison + Grouped Bar Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 1. Radar Chart: 3 Dimensions */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <RadarIcon className="w-5 h-5 text-amber-700" />
                    <h3 className="font-bold text-slate-800 text-sm font-['Prompt',sans-serif]">
                      เปรียบเทียบสมรรถนะ 3 มิติหลัก
                    </h3>
                  </div>
                  <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-medium">
                    เต็ม 5.00
                  </span>
                </div>
                <p className="text-xs text-slate-500 mb-4">
                  แสดงความสมดุลระหว่างความเป็นมืออาชีพ การสื่อสาร และคุณภาพรายงาน
                </p>

                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData} outerRadius="75%">
                      <PolarGrid stroke="#e2e8f0" />
                      <PolarAngleAxis dataKey="category" tick={{ fontSize: 11, fill: '#334155', fontWeight: 600 }} />
                      <PolarRadiusAxis domain={[3.0, 5.0]} angle={30} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                      <Radar
                        name="คะแนนเฉลี่ยจริง (X̄)"
                        dataKey="score"
                        stroke="#b45309"
                        fill="#f59e0b"
                        fillOpacity={0.4}
                      />
                      <Radar
                        name="เกณฑ์เป้าหมาย (4.00)"
                        dataKey="benchmark"
                        stroke="#059669"
                        fill="#10b981"
                        fillOpacity={0.1}
                        strokeDasharray="4 4"
                      />
                      <Tooltip
                        formatter={(val: any) => [`${Number(val).toFixed(2)} / 5.00`, 'คะแนน']}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Radar Footer Summary */}
              <div className="space-y-2 pt-3 border-t border-slate-100 text-xs">
                {categoryStats.map((c) => (
                  <div key={c.id} className="flex items-center justify-between">
                    <span className="text-slate-600">{c.name}</span>
                    <span className="font-bold text-slate-900">
                      {c.mean.toFixed(2)} ({c.percentage}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Bar Chart of Questions (Takes 2 Columns) */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-amber-700" />
                    <h3 className="font-bold text-slate-800 text-sm font-['Prompt',sans-serif]">
                      คะแนนเฉลี่ยความพึงพอใจรายข้อ (ค่าเฉลี่ย X̄ จากเต็ม 5.00)
                    </h3>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="flex items-center gap-1 text-slate-600">
                      <span className="w-3 h-3 rounded-xs bg-amber-700"></span> ผู้ตรวจสอบ
                    </span>
                    <span className="flex items-center gap-1 text-slate-600">
                      <span className="w-3 h-3 rounded-xs bg-sky-600"></span> การสื่อสาร
                    </span>
                    <span className="flex items-center gap-1 text-slate-600">
                      <span className="w-3 h-3 rounded-xs bg-purple-600"></span> การรายงานผล
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mb-3">
                  เส้นประสีเขียวแสดงค่าเกณฑ์เป้าหมายมาตรฐานการปฏิบัติงานขั้นสูง (4.50 = ระดับมากที่สุด)
                </p>

                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={filteredQuestions}
                      margin={{ top: 20, right: 20, left: -20, bottom: 20 }}
                    >
                      <XAxis 
                        dataKey="code" 
                        tick={{ fontSize: 11, fill: '#334155', fontWeight: 600 }}
                      />
                      <YAxis 
                        domain={[3.5, 5.0]} 
                        ticks={[3.5, 4.0, 4.5, 5.0]} 
                        tick={{ fontSize: 11, fill: '#64748b' }}
                      />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const d = payload[0].payload;
                            return (
                              <div className="bg-slate-900 text-white text-xs p-3 rounded-xl shadow-2xl max-w-xs border border-slate-700">
                                <p className="font-bold text-amber-300">ข้อ {d.code}: {d.categoryTitle}</p>
                                <p className="mt-1 text-slate-200">{d.title}</p>
                                <div className="mt-2 pt-2 border-t border-slate-700 flex justify-between items-center">
                                  <span>ค่าเฉลี่ย: <strong className="text-emerald-400 text-sm">{d.mean.toFixed(2)}</strong></span>
                                  <span>S.D.: {d.sd.toFixed(2)}</span>
                                  <span className="px-2 py-0.5 bg-white/20 rounded text-[10px]">{d.level}</span>
                                </div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <ReferenceLine y={4.50} stroke="#10b981" strokeDasharray="3 3" label={{ value: 'เกณฑ์ 4.50 (มากที่สุด)', position: 'insideTopRight', fill: '#059669', fontSize: 10 }} />
                      <ReferenceLine y={4.00} stroke="#f59e0b" strokeDasharray="3 3" label={{ value: 'เกณฑ์ 4.00', position: 'insideTopRight', fill: '#d97706', fontSize: 10 }} />
                      <Bar dataKey="mean" radius={[6, 6, 0, 0]}>
                        {filteredQuestions.map((q, idx) => (
                          <Cell key={`bar-${idx}`} fill={getCategoryColor(q.category)} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between text-xs text-slate-500 border-t border-slate-100">
                <span>รหัส 1.1 - 1.5: ด้านผู้ตรวจสอบ | 2.1 - 2.5: ด้านการสื่อสาร | 3.1 - 3.5: ด้านการรายงานผล</span>
                <span className="font-medium text-slate-700">เกณฑ์คะแนน: 4.51-5.00 (มากที่สุด), 3.51-4.50 (มาก)</span>
              </div>
            </div>
          </div>

          {/* Highlights Grid: Top Strengths & Opportunities for Enhancement */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Top Strengths */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200/80 rounded-2xl p-4 sm:p-5 shadow-xs">
              <div className="flex items-center space-x-2.5 mb-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-emerald-950 font-['Prompt',sans-serif]">
                    จุดเด่นที่มีคะแนนเฉลี่ยสูงสุด 3 อันดับแรก (Key Strengths)
                  </h4>
                  <p className="text-xs text-emerald-700">ประเด็นที่ผู้รับบริการพึงพอใจและชื่นชมมากที่สุด</p>
                </div>
              </div>

              <div className="space-y-2.5">
                {topStrengths.map((item, idx) => (
                  <div key={item.id} className="bg-white/90 backdrop-blur-xs p-3 rounded-xl border border-emerald-200 flex items-start justify-between gap-3">
                    <div className="flex items-start space-x-2.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <div>
                        <span className="text-xs font-bold text-emerald-800 block">ข้อ {item.code} ({item.categoryTitle})</span>
                        <p className="text-xs text-slate-700 mt-0.5">{item.title}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-base font-bold text-emerald-700 font-['Prompt',sans-serif]">
                        {item.mean.toFixed(2)}
                      </span>
                      <span className="text-[10px] text-slate-400 block">S.D. {item.sd.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Opportunities for Growth */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/80 rounded-2xl p-4 sm:p-5 shadow-xs">
              <div className="flex items-center space-x-2.5 mb-3">
                <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-amber-950 font-['Prompt',sans-serif]">
                    ประเด็นที่ควรส่งเสริมและพัฒนาต่อเนื่อง (Growth Opportunities)
                  </h4>
                  <p className="text-xs text-amber-700">ประเด็นที่สามารถยกระดับกระบวนการให้ดียิ่งขึ้นในปีถัดไป</p>
                </div>
              </div>

              <div className="space-y-2.5">
                {topImprovements.map((item, idx) => (
                  <div key={item.id} className="bg-white/90 backdrop-blur-xs p-3 rounded-xl border border-amber-200 flex items-start justify-between gap-3">
                    <div className="flex items-start space-x-2.5">
                      <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <div>
                        <span className="text-xs font-bold text-amber-800 block">ข้อ {item.code} ({item.categoryTitle})</span>
                        <p className="text-xs text-slate-700 mt-0.5">{item.title}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-base font-bold text-amber-700 font-['Prompt',sans-serif]">
                        {item.mean.toFixed(2)}
                      </span>
                      <span className="text-[10px] text-slate-400 block">S.D. {item.sd.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Academic Statistical Table View */
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="font-bold text-slate-800 text-base font-['Prompt',sans-serif]">
                ตารางสรุปผลสถิติความพึงพอใจ จำแนกรายข้อและรายหมวดหมู่
              </h3>
              <p className="text-xs text-slate-500">
                รูปแบบตามระเบียบวิธีการวิจัยทางสังคมศาสตร์และเกณฑ์การประเมินคุณภาพภายใน
              </p>
            </div>
            <div className="text-xs text-slate-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200 font-medium">
              เกณฑ์: 4.51-5.00 มากที่สุด | 3.51-4.50 มาก | 2.51-3.50 ปานกลาง
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-amber-900 text-white font-['Prompt',sans-serif]">
                  <th className="py-3 px-3 w-16 text-center">รหัส</th>
                  <th className="py-3 px-4">รายการประเมินความพึงพอใจ</th>
                  <th className="py-3 px-3 text-center w-24">ค่าเฉลี่ย (X̄)</th>
                  <th className="py-3 px-3 text-center w-20">S.D.</th>
                  <th className="py-3 px-3 text-center w-20">ร้อยละ</th>
                  <th className="py-3 px-4 text-center w-28">ระดับความพึงพอใจ</th>
                  <th className="py-3 px-4 text-center w-36">การกระจาย (5-4-3-2-1)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {/* Loop by categories */}
                {categoryStats.map((cat) => {
                  if (selectedCategoryTab !== 'all' && selectedCategoryTab !== cat.id) return null;
                  
                  return (
                    <React.Fragment key={`cat-group-${cat.id}`}>
                      {/* Category Header Row */}
                      <tr className="bg-amber-50/70 font-bold text-amber-950">
                        <td colSpan={2} className="py-2.5 px-4 text-xs font-semibold">
                          {cat.name}
                        </td>
                        <td className="py-2.5 px-3 text-center font-bold text-amber-900">
                          {cat.mean.toFixed(2)}
                        </td>
                        <td className="py-2.5 px-3 text-center text-slate-600">
                          {cat.sd.toFixed(2)}
                        </td>
                        <td className="py-2.5 px-3 text-center text-amber-800">
                          {cat.percentage}%
                        </td>
                        <td className="py-2.5 px-4 text-center">
                          <span className="px-2 py-0.5 rounded-full text-xs bg-amber-200/70 text-amber-900 border border-amber-300 font-semibold">
                            {cat.level}
                          </span>
                        </td>
                        <td className="py-2.5 px-4 text-center text-slate-400 text-xs">
                          เฉลี่ยหมวด
                        </td>
                      </tr>

                      {/* Items in category */}
                      {cat.items.map((item) => (
                        <tr key={item.code} className="hover:bg-slate-50 transition-colors">
                          <td className="py-2.5 px-3 text-center font-bold text-slate-600">
                            {item.code}
                          </td>
                          <td className="py-2.5 px-4">
                            <span className="text-slate-800 font-medium">{item.title}</span>
                          </td>
                          <td className="py-2.5 px-3 text-center font-bold text-slate-900">
                            {item.mean.toFixed(2)}
                          </td>
                          <td className="py-2.5 px-3 text-center text-slate-500 font-mono">
                            {item.sd.toFixed(2)}
                          </td>
                          <td className="py-2.5 px-3 text-center text-slate-700">
                            {Number(((item.mean / 5) * 100).toFixed(1))}%
                          </td>
                          <td className="py-2.5 px-4 text-center">
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              {item.level}
                            </span>
                          </td>
                          <td className="py-2.5 px-4 text-center font-mono text-xs text-slate-500">
                            <span className="text-emerald-700 font-semibold">{item.distribution[5] || 0}</span> / {item.distribution[4] || 0} / {item.distribution[3] || 0} / {item.distribution[2] || 0} / {item.distribution[1] || 0}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  );
                })}

                {/* Overall Summary Row */}
                <tr className="bg-slate-900 text-white font-bold">
                  <td colSpan={2} className="py-3 px-4 font-['Prompt',sans-serif]">
                    สรุปคะแนนเฉลี่ยรวมทุกด้าน (15 ข้อ)
                  </td>
                  <td className="py-3 px-3 text-center text-amber-400 text-base font-bold">
                    {overallMean.toFixed(2)}
                  </td>
                  <td className="py-3 px-3 text-center text-slate-300">
                    {overallSD.toFixed(2)}
                  </td>
                  <td className="py-3 px-3 text-center text-amber-300">
                    {Number(((overallMean / 5) * 100).toFixed(1))}%
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-amber-950">
                      {overallLevel.label}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center text-slate-400 text-xs">
                    ภาพรวมทั้งหมด
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
