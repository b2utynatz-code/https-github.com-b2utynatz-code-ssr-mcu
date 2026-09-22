import React from 'react';
import { Filter, X, Search, RotateCcw } from 'lucide-react';
import { FilterOptions } from '../types';
import { DEPARTMENTS, POSITIONS, SERVICE_TYPES, CHANNELS } from '../data/surveyQuestions';

interface FiltersBarProps {
  filters: FilterOptions;
  onFilterChange: (newFilters: Partial<FilterOptions>) => void;
  onResetFilters: () => void;
  totalFiltered: number;
  totalAll: number;
}

export const FiltersBar: React.FC<FiltersBarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalFiltered,
  totalAll
}) => {
  const hasActiveFilters = 
    filters.department !== '' || 
    filters.position !== '' || 
    filters.serviceType !== '' || 
    filters.channel !== '' || 
    filters.searchKeyword !== '';

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center">
            <Filter className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-800 font-['Prompt',sans-serif]">
              ตัวกรองข้อมูลและการเจาะลึกสถิติ (Filter & Drill-down)
            </h4>
            <p className="text-xs text-slate-500">
              กรองเพื่อดูสถิติความพึงพอใจและข้อเสนอแนะแยกตามบริบทส่วนงาน
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full font-medium">
            แสดง {totalFiltered} จากทั้งหมด {totalAll} รายการ
          </span>
          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-2.5 py-1 rounded-full transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              ล้างตัวกรอง
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Department Filter */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            หน่วยงานผู้รับบริการ
          </label>
          <select
            value={filters.department}
            onChange={(e) => onFilterChange({ department: e.target.value })}
            className="w-full text-xs rounded-xl border-slate-200 bg-slate-50 text-slate-700 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 py-2 px-3 transition-colors"
          >
            <option value="">ทุกหน่วยงาน / ส่วนงาน</option>
            {DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        {/* Position Filter */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            ตำแหน่งของผู้ตอบแบบสอบถาม
          </label>
          <select
            value={filters.position}
            onChange={(e) => onFilterChange({ position: e.target.value })}
            className="w-full text-xs rounded-xl border-slate-200 bg-slate-50 text-slate-700 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 py-2 px-3 transition-colors"
          >
            <option value="">ทุกกลุ่มตำแหน่ง</option>
            {POSITIONS.map((pos) => (
              <option key={pos} value={pos}>
                {pos}
              </option>
            ))}
          </select>
        </div>

        {/* Service Type Filter */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            งานบริการที่ได้รับ
          </label>
          <select
            value={filters.serviceType}
            onChange={(e) => onFilterChange({ serviceType: e.target.value })}
            className="w-full text-xs rounded-xl border-slate-200 bg-slate-50 text-slate-700 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 py-2 px-3 transition-colors truncate"
          >
            <option value="">ทุกประเภทงานบริการ</option>
            {SERVICE_TYPES.map((srv) => (
              <option key={srv} value={srv}>
                {srv}
              </option>
            ))}
          </select>
        </div>

        {/* Channel Filter */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            ช่องทางที่ได้รับบริการ
          </label>
          <select
            value={filters.channel}
            onChange={(e) => onFilterChange({ channel: e.target.value })}
            className="w-full text-xs rounded-xl border-slate-200 bg-slate-50 text-slate-700 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 py-2 px-3 transition-colors"
          >
            <option value="">ทุกช่องทางบริการ</option>
            {CHANNELS.map((ch) => (
              <option key={ch} value={ch}>
                {ch}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Keyword Search Row */}
      <div className="mt-3 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-2">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="ค้นหาข้อความในข้อเสนอแนะหรือความประทับใจ (เช่น กัลยาณมิตร, พัสดุ, รายงาน, ออนไลน์)..."
            value={filters.searchKeyword}
            onChange={(e) => onFilterChange({ searchKeyword: e.target.value })}
            className="w-full pl-9 pr-8 py-1.5 text-xs rounded-xl border-slate-200 bg-slate-50 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 text-slate-700"
          />
          {filters.searchKeyword && (
            <button
              onClick={() => onFilterChange({ searchKeyword: '' })}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
