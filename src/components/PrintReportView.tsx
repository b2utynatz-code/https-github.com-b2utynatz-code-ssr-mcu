import React from 'react';
import { CategoryStats, SurveyResponse } from '../types';
import { getDemographicDistribution } from '../utils/statistics';

interface PrintReportViewProps {
  responses: SurveyResponse[];
  overallMean: number;
  overallSD: number;
  overallPercentage: number;
  overallLevel: any;
  categoryStats: CategoryStats[];
  topStrengths: any[];
  topImprovements: any[];
}

export const PrintReportView: React.FC<PrintReportViewProps> = ({
  responses,
  overallMean,
  overallSD,
  overallPercentage,
  overallLevel,
  categoryStats,
  topStrengths,
  topImprovements
}) => {
  const dist = getDemographicDistribution(responses);

  return (
    <div className="hidden print:block text-black bg-white p-8 max-w-4xl mx-auto font-['Sarabun',sans-serif] text-sm leading-normal">
      {/* Official University Header */}
      <div className="text-center border-b-2 border-black pb-4 mb-6">
        <div className="flex justify-center mb-3">
          <img
            src="/20241021145538_42EA823B-7A8C-439D-A3D3-9D15E334ED6A.png"
            alt="ตราสัญลักษณ์ มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย"
            className="h-20 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
        </div>
        <h1 className="text-xl font-bold font-['Prompt',sans-serif]">
          สำนักงานตรวจสอบภายใน มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย
        </h1>
        <h2 className="text-lg font-semibold mt-1">
          รายงานผลการสำรวจความพึงพอใจของผู้รับบริการต่อการปฏิบัติงาน ประจำปีงบประมาณ พ.ศ. 2569
        </h2>
        <p className="text-xs text-gray-600 mt-1">
          วิเคราะห์และประมวลผลจากแบบสอบถามกลุ่มตัวอย่างจำนวน {responses.length} ราย
        </p>
      </div>

      {/* 1. สรุปผลภาพรวม */}
      <div className="mb-6">
        <h3 className="text-base font-bold mb-2">1. บทสรุปผลการประเมินภาพรวม (Executive Summary)</h3>
        <p className="indent-8 text-justify leading-relaxed">
          ผลการสำรวจความพึงพอใจของผู้รับบริการต่อการปฏิบัติงานของสำนักงานตรวจสอบภายใน มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย ประจำปีงบประมาณ พ.ศ. 2569 
          ในภาพรวมทั้ง 3 ด้าน (จำนวน 15 ข้อคำถาม) พบว่า ผู้รับบริการมีความพึงพอใจโดยรวมอยู่ในระดับ <strong className="font-bold">"{overallLevel.label}"</strong> 
          โดยมีค่าเฉลี่ยเท่ากับ <strong className="font-bold">{overallMean.toFixed(2)}</strong> (จากคะแนนเต็ม 5.00) 
          ค่าเบี่ยงเบนมาตรฐาน (S.D.) เท่ากับ <strong className="font-bold">{overallSD.toFixed(2)}</strong> 
          คิดเป็นอัตราความพึงพอใจร้อยละ <strong className="font-bold">{overallPercentage}%</strong> 
          ซึ่งสูงกว่าค่าเกณฑ์เป้าหมายมาตรฐานที่มหาวิทยาลัยกำหนดไว้ (ไม่น้อยกว่า 4.00 หรือร้อยละ 80)
        </p>
      </div>

      {/* 2. สรุปข้อมูลทั่วไป */}
      <div className="mb-6">
        <h3 className="text-base font-bold mb-2">2. ข้อมูลทั่วไปของผู้ตอบแบบสอบถาม (ส่วนที่ 1)</h3>
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="border border-gray-300 p-2.5 rounded">
            <strong>หน่วยงานที่มีผู้ตอบมากที่สุด:</strong>
            <ul className="list-disc pl-4 mt-1">
              {dist.departments.slice(0, 4).map(d => (
                <li key={d.name}>{d.name}: {d.count} คน ({d.percentage}%)</li>
              ))}
            </ul>
          </div>
          <div className="border border-gray-300 p-2.5 rounded">
            <strong>จำแนกตามตำแหน่ง:</strong>
            <ul className="list-disc pl-4 mt-1">
              {dist.positions.map(p => (
                <li key={p.name}>{p.name}: {p.count} คน ({p.percentage}%)</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 3. สรุปสถิติ 3 ด้าน */}
      <div className="mb-6">
        <h3 className="text-base font-bold mb-2">3. ผลการประเมินความพึงพอใจจำแนกตามหมวดหมู่ (ส่วนที่ 2)</h3>
        <table className="w-full border-collapse border border-black text-xs">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-black p-2 text-left">ประเด็นการประเมิน</th>
              <th className="border border-black p-2 text-center w-20">ค่าเฉลี่ย (X̄)</th>
              <th className="border border-black p-2 text-center w-16">S.D.</th>
              <th className="border border-black p-2 text-center w-16">ร้อยละ</th>
              <th className="border border-black p-2 text-center w-28">ระดับความพึงพอใจ</th>
            </tr>
          </thead>
          <tbody>
            {categoryStats.map(cat => (
              <React.Fragment key={cat.id}>
                <tr className="font-bold bg-gray-50">
                  <td className="border border-black p-2">{cat.name}</td>
                  <td className="border border-black p-2 text-center">{cat.mean.toFixed(2)}</td>
                  <td className="border border-black p-2 text-center">{cat.sd.toFixed(2)}</td>
                  <td className="border border-black p-2 text-center">{cat.percentage}%</td>
                  <td className="border border-black p-2 text-center">{cat.level}</td>
                </tr>
                {cat.items.map(item => (
                  <tr key={item.code}>
                    <td className="border border-black p-1.5 pl-6">{item.code} {item.title}</td>
                    <td className="border border-black p-1.5 text-center">{item.mean.toFixed(2)}</td>
                    <td className="border border-black p-1.5 text-center">{item.sd.toFixed(2)}</td>
                    <td className="border border-black p-1.5 text-center">{((item.mean/5)*100).toFixed(1)}%</td>
                    <td className="border border-black p-1.5 text-center">{item.level}</td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
            <tr className="font-bold bg-gray-200">
              <td className="border border-black p-2">ค่าเฉลี่ยรวมทั้งสิ้น (15 ข้อคำถาม)</td>
              <td className="border border-black p-2 text-center">{overallMean.toFixed(2)}</td>
              <td className="border border-black p-2 text-center">{overallSD.toFixed(2)}</td>
              <td className="border border-black p-2 text-center">{overallPercentage}%</td>
              <td className="border border-black p-2 text-center">{overallLevel.label}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 4. สรุปข้อเสนอแนะ */}
      <div className="mb-8">
        <h3 className="text-base font-bold mb-2">4. สรุปข้อเสนอแนะเพื่อการปรับปรุงการบริการ (ส่วนที่ 3)</h3>
        <div className="space-y-2 text-xs leading-relaxed">
          <p>
            <strong>1. สิ่งที่ประทับใจ:</strong> ผู้ตรวจสอบภายในให้คำแนะนำและชี้แนะข้อปฏิบัติอย่างตรงไปตรงมา จริงใจ มีความเป็นกัลยาณมิตร มีความรอบรู้ในระเบียบวิชาชีพ และปฏิบัติหน้าที่ด้วยความโปร่งใสเป็นอิสระ ช่วยให้หน่วยรับตรวจเข้าใจข้อผิดพลาดและแนวทางแก้ไขที่ถูกต้อง
          </p>
          <p>
            <strong>2. สิ่งที่คาดหวังในอนาคต:</strong> ต้องการให้สำนักงานตรวจสอบภายในเข้าตรวจสอบเป็นประจำทุกปีหรือบ่อยขึ้น จัดสัมมนาฝึกอบรมให้ความรู้ด้านระเบียบการเงิน พัสดุ และการควบคุมภายในแก่ส่วนงานอย่างต่อเนื่อง เพื่อพัฒนาและป้องกันข้อผิดพลาดเชิงระบบ
          </p>
          <p>
            <strong>3. ข้อเสนอแนะอื่นๆ:</strong> ต้องการให้มีการลงพื้นที่ตรวจเยี่ยมและเป็นพี่เลี้ยงให้คำปรึกษาอย่างต่อเนื่อง ขยายช่องทางการติดต่อสื่อสารที่สะดวกรวดเร็ว และร่วมกันขับเคลื่อนระบบการดำเนินงานให้ถูกต้องตามประกาศและระเบียบของมหาวิทยาลัย
          </p>
        </div>
      </div>

      {/* Signature Block */}
      <div className="mt-12 pt-4 flex justify-between text-xs">
        <div className="text-center w-64">
          <p>ลงชื่อ..............................................................</p>
          <p className="mt-1 font-semibold">(นักวิชาการตรวจสอบภายใน)</p>
          <p>ผู้ประมวลผลข้อมูล</p>
        </div>
        <div className="text-center w-64">
          <p>ลงชื่อ..............................................................</p>
          <p className="mt-1 font-semibold">(ผู้อำนวยการสำนักงานตรวจสอบภายใน)</p>
          <p>มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย</p>
        </div>
      </div>
    </div>
  );
};
