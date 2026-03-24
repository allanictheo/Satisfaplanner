import type { Belt, PipelineTier } from '../types';

export const belts: Record<string, Belt> = {
  'belt-mk1': { id: 'belt-mk1', name: 'Conveyor Belt Mk.1', tier: 0, maxRate: 60, icon: '➡️' },
  'belt-mk2': { id: 'belt-mk2', name: 'Conveyor Belt Mk.2', tier: 2, maxRate: 120, icon: '⏩' },
  'belt-mk3': { id: 'belt-mk3', name: 'Conveyor Belt Mk.3', tier: 4, maxRate: 270, icon: '⏭️' },
  'belt-mk4': { id: 'belt-mk4', name: 'Conveyor Belt Mk.4', tier: 5, maxRate: 480, icon: '🚀' },
  'belt-mk5': { id: 'belt-mk5', name: 'Conveyor Belt Mk.5', tier: 7, maxRate: 780, icon: '⚡' },
  'belt-mk6': { id: 'belt-mk6', name: 'Conveyor Belt Mk.6', tier: 8, maxRate: 1200, icon: '💫' },
};

export const pipelines: Record<string, PipelineTier> = {
  'pipe-mk1': { id: 'pipe-mk1', name: 'Pipeline Mk.1', tier: 3, maxRate: 300, icon: '🔵' },
  'pipe-mk2': { id: 'pipe-mk2', name: 'Pipeline Mk.2', tier: 6, maxRate: 600, icon: '🔷' },
};

export function getBeltById(id: string): Belt | undefined {
  return belts[id];
}

export function getPipelineById(id: string): PipelineTier | undefined {
  return pipelines[id];
}

export function getBeltForRate(rate: number): Belt {
  const sorted = Object.values(belts).sort((a, b) => a.maxRate - b.maxRate);
  return sorted.find(b => b.maxRate >= rate) ?? sorted[sorted.length - 1];
}
