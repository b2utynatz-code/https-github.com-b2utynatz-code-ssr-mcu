import { SurveyResponse, CategoryStats } from '../types';
import { SURVEY_QUESTIONS, LIKERT_LEVELS } from '../data/surveyQuestions';

export function calculateMean(values: number[]): number {
  if (!values || values.length === 0) return 0;
  const sum = values.reduce((acc, val) => acc + val, 0);
  return Number((sum / values.length).toFixed(2));
}

export function calculateSD(values: number[]): number {
  if (!values || values.length <= 1) return 0;
  const mean = values.reduce((acc, val) => acc + val, 0) / values.length;
  const variance = values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / (values.length - 1);
  return Number(Math.sqrt(variance).toFixed(2));
}

export function getLikertLevel(mean: number) {
  for (const level of LIKERT_LEVELS) {
    if (mean >= level.min && mean <= level.max) {
      return level;
    }
  }
  // Fallbacks
  if (mean >= 4.51) return LIKERT_LEVELS[0];
  if (mean >= 3.51) return LIKERT_LEVELS[1];
  if (mean >= 2.51) return LIKERT_LEVELS[2];
  if (mean >= 1.51) return LIKERT_LEVELS[3];
  return LIKERT_LEVELS[4];
}

export function getOverallStatistics(responses: SurveyResponse[]) {
  if (!responses.length) {
    return {
      overallMean: 0,
      overallSD: 0,
      overallPercentage: 0,
      overallLevel: getLikertLevel(0),
      totalCount: 0,
      categoryStats: [],
      questionStats: [],
      topStrengths: [],
      topImprovements: []
    };
  }

  // All item scores across all responses
  const allScores: number[] = [];

  // 15 question statistics
  const questionStats = SURVEY_QUESTIONS.map((q) => {
    const scores = responses.map((r) => Number(r[q.id as keyof SurveyResponse]) || 0);
    allScores.push(...scores);
    const mean = calculateMean(scores);
    const sd = calculateSD(scores);
    const levelInfo = getLikertLevel(mean);
    
    // Distribution 1 to 5
    const distribution: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    scores.forEach((sc) => {
      if (distribution[sc] !== undefined) {
        distribution[sc]++;
      }
    });

    return {
      id: q.id,
      code: q.code,
      title: q.title,
      category: q.category,
      categoryTitle: q.categoryTitle,
      mean,
      sd,
      level: levelInfo.label,
      levelColor: levelInfo.color,
      bgClass: levelInfo.bgClass,
      percentage: Number(((mean / 5) * 100).toFixed(1)),
      distribution
    };
  });

  // Category stats (3 groups)
  const categories: { id: 'auditor' | 'communication' | 'report'; name: string; prefix: string }[] = [
    { id: 'auditor', name: 'ด้านผู้ตรวจสอบภายใน', prefix: 'auditor_' },
    { id: 'communication', name: 'ด้านการสื่อสารงานตรวจสอบภายใน', prefix: 'comm_' },
    { id: 'report', name: 'ด้านการรายงานผลการตรวจสอบภายใน', prefix: 'report_' }
  ];

  const categoryStats: CategoryStats[] = categories.map((cat) => {
    const catQuestions = questionStats.filter((q) => q.id.startsWith(cat.prefix));
    const catScores: number[] = [];
    responses.forEach((r) => {
      catQuestions.forEach((q) => {
        catScores.push(Number(r[q.id as keyof SurveyResponse]) || 0);
      });
    });

    const mean = calculateMean(catScores);
    const sd = calculateSD(catScores);
    const levelInfo = getLikertLevel(mean);

    return {
      id: cat.id,
      name: cat.name,
      mean,
      sd,
      level: levelInfo.label,
      levelColor: levelInfo.color,
      percentage: Number(((mean / 5) * 100).toFixed(1)),
      items: catQuestions
    };
  });

  const overallMean = calculateMean(allScores);
  const overallSD = calculateSD(allScores);
  const overallLevel = getLikertLevel(overallMean);
  const overallPercentage = Number(((overallMean / 5) * 100).toFixed(1));

  // Strengths & Improvement Areas
  const sortedQuestions = [...questionStats].sort((a, b) => b.mean - a.mean);
  const topStrengths = sortedQuestions.slice(0, 3);
  const topImprovements = [...sortedQuestions].reverse().slice(0, 3);

  return {
    overallMean,
    overallSD,
    overallPercentage,
    overallLevel,
    totalCount: responses.length,
    categoryStats,
    questionStats,
    topStrengths,
    topImprovements
  };
}

export function getDemographicDistribution(responses: SurveyResponse[]) {
  const total = responses.length || 1;

  const getSingleCounts = (key: keyof SurveyResponse) => {
    const counts: Record<string, number> = {};
    responses.forEach((r) => {
      const val = String(r[key] || 'ไม่ระบุ').trim();
      counts[val] = (counts[val] || 0) + 1;
    });
    return Object.entries(counts).map(([name, count]) => ({
      name,
      count,
      percentage: Number(((count / total) * 100).toFixed(1))
    })).sort((a, b) => b.count - a.count);
  };

  const getMultiCounts = (key: keyof SurveyResponse) => {
    const counts: Record<string, number> = {};
    responses.forEach((r) => {
      const raw = String(r[key] || '').trim();
      const parts = raw.split(',').map(s => s.trim().replace(/^,+|,+$/g, '')).filter(Boolean);
      if (parts.length === 0) {
        counts['ไม่ระบุ'] = (counts['ไม่ระบุ'] || 0) + 1;
      } else {
        // distinct in same response so one person is not double-counted for the exact same item
        const uniqueParts = Array.from(new Set(parts));
        uniqueParts.forEach(p => {
          counts[p] = (counts[p] || 0) + 1;
        });
      }
    });
    return Object.entries(counts).map(([name, count]) => ({
      name,
      count,
      percentage: Number(((count / total) * 100).toFixed(1))
    })).sort((a, b) => b.count - a.count);
  };

  return {
    departments: getSingleCounts('department'),
    positions: getSingleCounts('position'),
    serviceTypes: getMultiCounts('serviceType'),
    channels: getMultiCounts('channel')
  };
}
