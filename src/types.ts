export interface SurveyResponse {
  id: string;
  timestamp: string; // ISO date string or formatted date
  // ส่วนที่ 1: ข้อมูลทั่วไป
  department: string;
  position: string;
  serviceType: string;
  channel: string;
  
  // ส่วนที่ 2: แบบประเมินความพึงพอใจ (1-5)
  // หมวดที่ 1: ด้านผู้ตรวจสอบภายใน (5 ข้อ)
  auditor_q1: number; // ความสุภาพ กริยาวาจา และการให้เกียรติ
  auditor_q2: number; // ความรู้ ความเชี่ยวชาญ และความเข้าใจบริบทงาน
  auditor_q3: number; // ความเป็นอิสระ เที่ยงธรรม และปราศจากอคติ
  auditor_q4: number; // ความตรงต่อเวลาและมาตรฐานวิชาชีพ
  auditor_q5: number; // การให้คำปรึกษาและข้อเสนอแนะที่สร้างสรรค์
  
  // หมวดที่ 2: ด้านการสื่อสารงานตรวจสอบภายใน (5 ข้อ)
  comm_q1: number; // ความชัดเจนในการแจ้งวัตถุประสงค์และแผน
  comm_q2: number; // ช่องทางการติดต่อสะดวกและรวดเร็ว
  comm_q3: number; // การประสานงานและการขอเอกสารเข้าใจง่าย
  comm_q4: number; // การเปิดโอกาสให้ชี้แจงและรับฟังข้อคิดเห็น
  comm_q5: number; // การสื่อสารผลเบื้องต้นและสะท้อนข้อมูลทันเวลา
  
  // หมวดที่ 3: ด้านการรายงานผลการตรวจสอบภายใน (5 ข้อ)
  report_q1: number; // ความถูกต้อง ตรงประเด็น มีหลักฐานรองรับ
  report_q2: number; // ภาษาและรูปแบบรายงานกระชับ ชัดเจน
  report_q3: number; // ข้อเสนอแนะนำไปปรับปรุงปฏิบัติได้จริง
  report_q4: number; // ความรวดเร็วและตรงต่อเวลาในการส่งมอบรายงาน
  report_q5: number; // ประโยชน์ของรายงานต่อการพัฒนาคุณภาพส่วนงาน
  
  // ส่วนที่ 3: ข้อเสนอแนะเพิ่มเติม
  impression: string; // สิ่งที่ประทับใจจากการได้รับบริการ
  expectation: string; // สิ่งที่คาดหวังต่อการบริการในอนาคต
  suggestion: string; // ข้อเสนอแนะอื่นๆ
}

export interface QuestionDefinition {
  id: keyof Omit<SurveyResponse, 'id' | 'timestamp' | 'department' | 'position' | 'serviceType' | 'channel' | 'impression' | 'expectation' | 'suggestion'>;
  code: string;
  title: string;
  category: 'auditor' | 'communication' | 'comm' | 'report';
  categoryTitle: string;
}

export interface CategoryStats {
  id: 'auditor' | 'communication' | 'report';
  name: string;
  mean: number;
  sd: number;
  level: string;
  levelColor: string;
  percentage: number;
  items: {
    code: string;
    title: string;
    mean: number;
    sd: number;
    level: string;
    distribution: Record<number, number>;
  }[];
}

export interface FilterOptions {
  department: string;
  position: string;
  serviceType: string;
  channel: string;
  searchKeyword: string;
}
