import React from 'react';
import { 
  Building, 
  UserCheck, 
  Briefcase, 
  Radio, 
  PieChart as PieIcon,
  BarChart3
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell, 
  Legend 
} from 'recharts';
import { SurveyResponse } from '../types';
import { getDemographicDistribution } from '../utils/statistics';

interface DemographicsSectionProps {
  responses: SurveyResponse[];
}

const PALETTE_PRIMARY = [
  '#b45309', // amber-700
  '#0284c7', // sky-600
  '#059669', // emerald-600
  '#7c3aed', // violet-600
  '#e11d48', // rose-600
  '#d97706', // amber-600
  '#2563eb', // blue-600
  '#10b981', // emerald-500
  '#9333ea', // purple-600
  '#0d9488', // teal-600
];

export const DemographicsSection: React.FC<DemographicsSectionProps> = ({ responses }) => {
  const dist = getDemographicDistribution(responses);

  // Shorten department labels for clean chart rendering
  const deptData = dist.departments.map(d => ({
    fullName: d.name,
    shortName: d.name.length > 18 ? d.name.substring(0, 18) + '...' : d.name,
    count: d.count,
    percentage: d.percentage
  }));

  // Shorten service type labels
  const serviceData = dist.serviceTypes.map(s => ({
    fullName: s.name,
    shortName: s.name.length > 28 ? s.name.substring(0, 28) + '...' : s.name,
    count: s.count,
    percentage: s.percentage
  }));

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-sm">
            ส่วนที่ 1
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 font-['Prompt',sans-serif]">
              ข้อมูลทั่วไปของผู้ตอบแบบสอบถาม
            </h2>
            <p className="text-xs text-slate-500">
              วิเคราะห์โครงสร้างหน่วยงาน สถานะตำแหน่ง ประเภทงานบริการ และช่องทางการให้บริการ
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. สัดส่วนหน่วยงานผู้รับบริการ */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Building className="w-5 h-5 text-amber-700" />
                <h3 className="font-bold text-slate-800 text-sm font-['Prompt',sans-serif]">
                  1. จำแนกตามหน่วยงานผู้รับบริการ ({dist.departments.length} ส่วนงาน)
                </h3>
              </div>
              <span className="text-xs text-slate-400">จำนวน (คน)</span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={deptData} layout="vertical" margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                  <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                  <YAxis 
                    dataKey="shortName" 
                    type="category" 
                    width={130} 
                    tick={{ fontSize: 10, fill: '#334155' }} 
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const d = payload[0].payload;
                        return (
                          <div className="bg-slate-900 text-white text-xs p-2.5 rounded-lg shadow-xl border border-slate-700">
                            <p className="font-semibold">{d.fullName}</p>
                            <p className="text-amber-300 mt-1">จำนวน: {d.count} คน ({d.percentage}%)</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="count" fill="#b45309" radius={[0, 6, 6, 0]}>
                    {deptData.map((_, index) => (
                      <Cell key={`cell-dept-${index}`} fill={PALETTE_PRIMARY[index % PALETTE_PRIMARY.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>หน่วยงานที่มีผู้ประเมินสูงสุด: <strong className="text-slate-800">{dist.departments[0]?.name || '-'}</strong></span>
            <span className="font-semibold text-amber-700">{dist.departments[0]?.count || 0} คน ({dist.departments[0]?.percentage || 0}%)</span>
          </div>
        </div>

        {/* 2. สัดส่วนตำแหน่งของผู้ตอบแบบสอบถาม */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <UserCheck className="w-5 h-5 text-blue-700" />
                <h3 className="font-bold text-slate-800 text-sm font-['Prompt',sans-serif]">
                  2. จำแนกตามตำแหน่งของผู้ตอบแบบสอบถาม
                </h3>
              </div>
              <span className="text-xs text-slate-400">สัดส่วนร้อยละ</span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dist.positions}
                    dataKey="count"
                    nameKey="name"
                    cx="50%"
                    cy="45%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                  >
                    {dist.positions.map((_, index) => (
                      <Cell key={`cell-pos-${index}`} fill={PALETTE_PRIMARY[index % PALETTE_PRIMARY.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const d = payload[0].payload;
                        return (
                          <div className="bg-slate-900 text-white text-xs p-2.5 rounded-lg shadow-xl border border-slate-700">
                            <p className="font-semibold">{d.name}</p>
                            <p className="text-sky-300 mt-1">จำนวน: {d.count} คน ({d.percentage}%)</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend 
                    layout="horizontal" 
                    verticalAlign="bottom" 
                    align="center"
                    wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
                    formatter={(val) => {
                      const pos = dist.positions.find(p => p.name === val);
                      return <span className="text-slate-700">{val} ({pos?.percentage}%)</span>;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>กลุ่มตำแหน่งหลัก: <strong className="text-slate-800">{dist.positions[0]?.name || '-'}</strong></span>
            <span className="font-semibold text-blue-700">{dist.positions[0]?.count || 0} คน ({dist.positions[0]?.percentage || 0}%)</span>
          </div>
        </div>

        {/* 3. ได้รับบริการด้านใดจากส่วนงาน */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Briefcase className="w-5 h-5 text-emerald-700" />
                <h3 className="font-bold text-slate-800 text-sm font-['Prompt',sans-serif]">
                  3. จำแนกตามงานบริการที่ได้รับจากสำนักงานตรวจสอบภายใน
                </h3>
              </div>
              <span className="text-xs text-slate-400">จำนวน & ร้อยละ</span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={serviceData} layout="vertical" margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                  <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                  <YAxis 
                    dataKey="shortName" 
                    type="category" 
                    width={140} 
                    tick={{ fontSize: 10, fill: '#334155' }} 
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const d = payload[0].payload;
                        return (
                          <div className="bg-slate-900 text-white text-xs p-2.5 rounded-lg shadow-xl border border-slate-700">
                            <p className="font-semibold">{d.fullName}</p>
                            <p className="text-emerald-300 mt-1">จำนวน: {d.count} คน ({d.percentage}%)</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="count" fill="#059669" radius={[0, 6, 6, 0]}>
                    {serviceData.map((_, index) => (
                      <Cell key={`cell-srv-${index}`} fill={PALETTE_PRIMARY[(index + 2) % PALETTE_PRIMARY.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>บริการที่มีผู้รับบริการมากที่สุด: <strong className="text-slate-800">{dist.serviceTypes[0]?.name || '-'}</strong></span>
            <span className="font-semibold text-emerald-700">{dist.serviceTypes[0]?.count || 0} ครั้ง ({dist.serviceTypes[0]?.percentage || 0}%)</span>
          </div>
        </div>

        {/* 4. ช่องทางที่ได้รับบริการ */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Radio className="w-5 h-5 text-purple-700" />
                <h3 className="font-bold text-slate-800 text-sm font-['Prompt',sans-serif]">
                  4. จำแนกตามช่องทางที่ได้รับบริการ
                </h3>
              </div>
              <span className="text-xs text-slate-400">สัดส่วนช่องทาง</span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dist.channels}
                    dataKey="count"
                    nameKey="name"
                    cx="50%"
                    cy="45%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                  >
                    {dist.channels.map((_, index) => (
                      <Cell key={`cell-ch-${index}`} fill={PALETTE_PRIMARY[(index + 4) % PALETTE_PRIMARY.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const d = payload[0].payload;
                        return (
                          <div className="bg-slate-900 text-white text-xs p-2.5 rounded-lg shadow-xl border border-slate-700">
                            <p className="font-semibold">{d.name}</p>
                            <p className="text-purple-300 mt-1">จำนวน: {d.count} ครั้ง ({d.percentage}%)</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend 
                    layout="horizontal" 
                    verticalAlign="bottom" 
                    align="center"
                    wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
                    formatter={(val) => {
                      const ch = dist.channels.find(c => c.name === val);
                      return <span className="text-slate-700">{val} ({ch?.percentage}%)</span>;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>ช่องทางหลักที่นิยมที่สุด: <strong className="text-slate-800">{dist.channels[0]?.name || '-'}</strong></span>
            <span className="font-semibold text-purple-700">{dist.channels[0]?.count || 0} ครั้ง ({dist.channels[0]?.percentage || 0}%)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
