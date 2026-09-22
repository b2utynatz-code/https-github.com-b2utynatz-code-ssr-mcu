import React, { useState } from 'react';
import { X, Check, Save, AlertCircle, HelpCircle } from 'lucide-react';
import { SurveyResponse } from '../types';
import { 
  DEPARTMENTS, 
  POSITIONS, 
  SERVICE_TYPES, 
  CHANNELS, 
  SURVEY_QUESTIONS,
  LIKERT_SCORE_LABELS 
} from '../data/surveyQuestions';

interface AddResponseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (response: SurveyResponse) => void;
}

export const AddResponseModal: React.FC<AddResponseModalProps> = ({
  isOpen,
  onClose,
  onSave
}) => {
  if (!isOpen) return null;

  const [department, setDepartment] = useState(DEPARTMENTS[0]);
  const [position, setPosition] = useState(POSITIONS[0]);
  const [serviceType, setServiceType] = useState(SERVICE_TYPES[0]);
  const [channel, setChannel] = useState(CHANNELS[0]);

  // Scores default to 5
  const [scores, setScores] = useState<Record<string, number>>({
    auditor_q1: 5, auditor_q2: 5, auditor_q3: 5, auditor_q4: 5, auditor_q5: 5,
    comm_q1: 5, comm_q2: 5, comm_q3: 5, comm_q4: 5, comm_q5: 5,
    report_q1: 5, report_q2: 5, report_q3: 5, report_q4: 5, report_q5: 5,
  });

  const [impression, setImpression] = useState('');
  const [expectation, setExpectation] = useState('');
  const [suggestion, setSuggestion] = useState('');

  const handleScoreChange = (qId: string, score: number) => {
    setScores(prev => ({ ...prev, [qId]: score }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `MCU-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const timestamp = `2569-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newResponse: SurveyResponse = {
      id: newId,
      timestamp,
      department,
      position,
      serviceType,
      channel,
      auditor_q1: scores.auditor_q1,
      auditor_q2: scores.auditor_q2,
      auditor_q3: scores.auditor_q3,
      auditor_q4: scores.auditor_q4,
      auditor_q5: scores.auditor_q5,
      comm_q1: scores.comm_q1,
      comm_q2: scores.comm_q2,
      comm_q3: scores.comm_q3,
      comm_q4: scores.comm_q4,
      comm_q5: scores.comm_q5,
      report_q1: scores.report_q1,
      report_q2: scores.report_q2,
      report_q3: scores.report_q3,
      report_q4: scores.report_q4,
      report_q5: scores.report_q5,
      impression,
      expectation,
      suggestion
    };

    onSave(newResponse);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-900 to-amber-950 px-6 py-5 text-white flex items-center justify-between border-b-4 border-amber-500">
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-amber-300">
              บันทึกข้อมูลแบบสำรวจความพึงพอใจ
            </span>
            <h3 className="text-lg font-bold font-['Prompt',sans-serif]">
              แบบประเมินความพึงพอใจของผู้รับบริการ สำนักงานตรวจสอบภายใน มจร 2569
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 max-h-[75vh] overflow-y-auto space-y-8">
          {/* ส่วนที่ 1: ข้อมูลทั่วไป */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 border-b border-slate-200 pb-2">
              <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center">
                1
              </span>
              <h4 className="font-bold text-slate-800 font-['Prompt',sans-serif]">
                ส่วนที่ 1: ข้อมูลทั่วไปของผู้ตอบแบบสอบถาม
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  1. หน่วยงานผู้รับบริการ <span className="text-rose-500">*</span>
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full text-xs rounded-xl border-slate-200 bg-slate-50 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 py-2.5 px-3"
                  required
                >
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  2. ตำแหน่งของผู้ตอบแบบสอบถาม <span className="text-rose-500">*</span>
                </label>
                <select
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="w-full text-xs rounded-xl border-slate-200 bg-slate-50 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 py-2.5 px-3"
                  required
                >
                  {POSITIONS.map((pos) => (
                    <option key={pos} value={pos}>{pos}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  3. งานบริการที่ได้รับจากส่วนงาน <span className="text-rose-500">*</span>
                </label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full text-xs rounded-xl border-slate-200 bg-slate-50 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 py-2.5 px-3 truncate"
                  required
                >
                  {SERVICE_TYPES.map((srv) => (
                    <option key={srv} value={srv}>{srv}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  4. ช่องทางที่ได้รับบริการ <span className="text-rose-500">*</span>
                </label>
                <select
                  value={channel}
                  onChange={(e) => setChannel(e.target.value)}
                  className="w-full text-xs rounded-xl border-slate-200 bg-slate-50 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 py-2.5 px-3"
                  required
                >
                  {CHANNELS.map((ch) => (
                    <option key={ch} value={ch}>{ch}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* ส่วนที่ 2: ระดับความพึงพอใจ 15 ข้อ */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center">
                  2
                </span>
                <h4 className="font-bold text-slate-800 font-['Prompt',sans-serif]">
                  ส่วนที่ 2: แบบประเมินความพึงพอใจ (15 ประเด็น)
                </h4>
              </div>
              <span className="text-xs text-slate-500">
                ระดับคะแนน 5 = มากที่สุด, 1 = น้อยที่สุด
              </span>
            </div>

            <div className="space-y-6">
              {['auditor', 'comm', 'report'].map((categoryKey) => {
                const categoryQuestions = SURVEY_QUESTIONS.filter(q => q.category === categoryKey);
                const categoryTitle = categoryQuestions[0]?.categoryTitle;

                return (
                  <div key={categoryKey} className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200">
                    <h5 className="font-bold text-amber-900 text-xs sm:text-sm mb-3 font-['Prompt',sans-serif]">
                      {categoryTitle}
                    </h5>

                    <div className="space-y-3">
                      {categoryQuestions.map((q) => (
                        <div key={q.id} className="bg-white p-3 rounded-xl border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="text-xs text-slate-800">
                            <span className="font-bold text-amber-800 mr-1.5">{q.code}</span>
                            {q.title}
                          </div>

                          <div className="flex items-center space-x-1 shrink-0 self-end sm:self-center">
                            {[5, 4, 3, 2, 1].map((val) => {
                              const isSelected = scores[q.id] === val;
                              return (
                                <button
                                  type="button"
                                  key={val}
                                  onClick={() => handleScoreChange(q.id, val)}
                                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                                    isSelected
                                      ? 'bg-amber-600 text-white shadow-md scale-105'
                                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                                  }`}
                                  title={LIKERT_SCORE_LABELS[val]}
                                >
                                  {val}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ส่วนที่ 3: ข้อเสนอแนะเพิ่มเติม */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 border-b border-slate-200 pb-2">
              <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center">
                3
              </span>
              <h4 className="font-bold text-slate-800 font-['Prompt',sans-serif]">
                ส่วนที่ 3: ข้อเสนอแนะเพิ่มเติมเพื่อการปรับปรุงพัฒนา
              </h4>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  1. สิ่งที่ท่านประทับใจจากการได้รับบริการ
                </label>
                <textarea
                  rows={2}
                  value={impression}
                  onChange={(e) => setImpression(e.target.value)}
                  placeholder="ระบุความประทับใจ เช่น ผู้ตรวจสอบสุภาพ ให้คำแนะนำดี เป็นกัลยาณมิตร..."
                  className="w-full rounded-xl border-slate-200 bg-slate-50 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 p-3"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  2. สิ่งที่ท่านคาดหวังต่อการบริการในอนาคต
                </label>
                <textarea
                  rows={2}
                  value={expectation}
                  onChange={(e) => setExpectation(e.target.value)}
                  placeholder="ระบุสิ่งที่คาดหวัง เช่น อยากให้จัดสัมมนาอบรมระเบียบพัสดุ พัฒนาระบบรายงานดิจิทัล..."
                  className="w-full rounded-xl border-slate-200 bg-slate-50 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 p-3"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  3. ข้อเสนอแนะอื่นๆ
                </label>
                <textarea
                  rows={2}
                  value={suggestion}
                  onChange={(e) => setSuggestion(e.target.value)}
                  placeholder="ข้อเสนอแนะเพิ่มเติมเพื่อการพัฒนาส่วนงาน..."
                  className="w-full rounded-xl border-slate-200 bg-slate-50 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 p-3"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              <Save className="w-4 h-4" />
              บันทึกแบบประเมิน
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
