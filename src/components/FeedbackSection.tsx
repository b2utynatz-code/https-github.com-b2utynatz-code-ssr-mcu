import React, { useState } from 'react';
import { 
  HeartHandshake, 
  Compass, 
  MessageSquarePlus, 
  Quote, 
  Building2, 
  User, 
  Search,
  Sparkles,
  Tag
} from 'lucide-react';
import { SurveyResponse } from '../types';

interface FeedbackSectionProps {
  responses: SurveyResponse[];
}

export const FeedbackSection: React.FC<FeedbackSectionProps> = ({ responses }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'impression' | 'expectation' | 'suggestion'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Extract non-empty feedbacks
  const items = responses.map(r => ({
    id: r.id,
    department: r.department,
    position: r.position,
    serviceType: r.serviceType,
    impression: r.impression?.trim() || '',
    expectation: r.expectation?.trim() || '',
    suggestion: r.suggestion?.trim() || ''
  })).filter(r => r.impression || r.expectation || r.suggestion);

  // Filter by search
  const filtered = items.filter(r => {
    const term = searchTerm.toLowerCase();
    return (
      r.department.toLowerCase().includes(term) ||
      r.position.toLowerCase().includes(term) ||
      r.impression.toLowerCase().includes(term) ||
      r.expectation.toLowerCase().includes(term) ||
      r.suggestion.toLowerCase().includes(term)
    );
  });

  // Count items
  const countImpressions = items.filter(r => r.impression).length;
  const countExpectations = items.filter(r => r.expectation).length;
  const countSuggestions = items.filter(r => r.suggestion).length;

  const themeKeywords = [
    { label: 'คำแนะนำ & ชี้แนะ', query: 'คำแนะนำ', color: 'bg-emerald-100 text-emerald-800' },
    { label: 'ความชัดเจน & ตรงประเด็น', query: 'ชัดเจน', color: 'bg-blue-100 text-blue-800' },
    { label: 'ฝึกอบรม & พัฒนา', query: 'อบรม', color: 'bg-amber-100 text-amber-800' },
    { label: 'ตรงไปตรงมา & โปร่งใส', query: 'ตรงไปตรงมา', color: 'bg-purple-100 text-purple-800' },
    { label: 'ตรวจทุกปี / สม่ำเสมอ', query: 'บ่อย', color: 'bg-rose-100 text-rose-800' },
    { label: 'กัลยาณมิตร & พี่เลี้ยง', query: 'กัลยาณมิตร', color: 'bg-cyan-100 text-cyan-800' },
  ];

  const keyThemes = themeKeywords.map(tk => ({
    label: tk.label,
    query: tk.query,
    count: items.filter(r => (r.impression + ' ' + r.expectation + ' ' + r.suggestion).includes(tk.query)).length,
    color: tk.color
  }));

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-3">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-purple-700 text-white flex items-center justify-center font-bold text-sm shadow-sm">
            ส่วนที่ 3
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 font-['Prompt',sans-serif]">
              ข้อเสนอแนะเพิ่มเติมเพื่อนำมาปรับปรุงและพัฒนาการบริการ
            </h2>
            <p className="text-xs text-slate-500">
              เสียงสะท้อนเชิงคุณภาพ (Qualitative Insights) จากผู้รับบริการ มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="ค้นหาข้อเสนอแนะ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border-slate-200 bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-slate-700"
          />
        </div>
      </div>

      {/* Thematic Key Tags */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-wrap items-center gap-2">
        <div className="flex items-center space-x-1.5 text-xs font-semibold text-slate-600 mr-2">
          <Tag className="w-4 h-4 text-purple-600" />
          <span>ประเด็นคำสำคัญที่พบบ่อย (Thematic Keywords):</span>
        </div>
        {keyThemes.map((tag) => (
          <button
            key={tag.label}
            onClick={() => setSearchTerm(tag.query)}
            className={`text-xs px-2.5 py-1 rounded-full font-medium transition-transform hover:scale-105 ${tag.color}`}
          >
            {tag.label} <span className="opacity-70 text-[10px]">({tag.count})</span>
          </button>
        ))}
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="text-xs text-slate-400 hover:text-slate-600 underline ml-2"
          >
            ล้างคำค้น
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'all'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          ทุกหมวดข้อเสนอแนะ ({items.length})
        </button>
        <button
          onClick={() => setActiveTab('impression')}
          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'impression'
              ? 'bg-rose-700 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <HeartHandshake className="w-4 h-4" />
          1. สิ่งที่ประทับใจ ({countImpressions})
        </button>
        <button
          onClick={() => setActiveTab('expectation')}
          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'expectation'
              ? 'bg-blue-700 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Compass className="w-4 h-4" />
          2. สิ่งที่คาดหวังในอนาคต ({countExpectations})
        </button>
        <button
          onClick={() => setActiveTab('suggestion')}
          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'suggestion'
              ? 'bg-amber-700 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <MessageSquarePlus className="w-4 h-4" />
          3. ข้อเสนอแนะอื่นๆ ({countSuggestions})
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              {/* Respondent Meta */}
              <div className="flex items-start justify-between gap-2 mb-3 pb-3 border-b border-slate-100">
                <div>
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-800">
                    <Building2 className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span>{item.department}</span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-[11px] text-slate-500 mt-0.5">
                    <User className="w-3 h-3 text-slate-400 shrink-0" />
                    <span>{item.position}</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono bg-slate-100 text-slate-500 px-2 py-0.5 rounded">
                  {item.id}
                </span>
              </div>

              {/* Feedback Content */}
              <div className="space-y-3 text-xs">
                {(activeTab === 'all' || activeTab === 'impression') && item.impression && (
                  <div className="bg-rose-50/70 border border-rose-100 rounded-xl p-3">
                    <span className="font-bold text-rose-800 flex items-center gap-1 mb-1">
                      <HeartHandshake className="w-3.5 h-3.5 text-rose-600" />
                      สิ่งที่ประทับใจ:
                    </span>
                    <p className="text-slate-700 leading-relaxed italic">
                      "{item.impression}"
                    </p>
                  </div>
                )}

                {(activeTab === 'all' || activeTab === 'expectation') && item.expectation && (
                  <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-3">
                    <span className="font-bold text-blue-800 flex items-center gap-1 mb-1">
                      <Compass className="w-3.5 h-3.5 text-blue-600" />
                      สิ่งที่คาดหวังในอนาคต:
                    </span>
                    <p className="text-slate-700 leading-relaxed italic">
                      "{item.expectation}"
                    </p>
                  </div>
                )}

                {(activeTab === 'all' || activeTab === 'suggestion') && item.suggestion && (
                  <div className="bg-amber-50/70 border border-amber-100 rounded-xl p-3">
                    <span className="font-bold text-amber-900 flex items-center gap-1 mb-1">
                      <MessageSquarePlus className="w-3.5 h-3.5 text-amber-700" />
                      ข้อเสนอแนะอื่นๆ:
                    </span>
                    <p className="text-slate-700 leading-relaxed italic">
                      "{item.suggestion}"
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-400 truncate">
              บริการ: {item.serviceType}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 text-slate-500">
          <Quote className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-base font-semibold">ไม่พบข้อเสนอแนะที่ตรงกับเงื่อนไขการค้นหา</p>
          <p className="text-xs text-slate-400 mt-1">ลองเปลี่ยนคำค้นหาหรือตัวกรองหน่วยงาน</p>
        </div>
      )}
    </div>
  );
};
