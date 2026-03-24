import type { Item, Recipe, Building, Belt, PipelineTier, ItemCategory } from '../types';
import { items } from './items';
import { buildings } from './buildings';
import { recipes } from './recipes';
import { belts, pipelines } from './belts';

export { items } from './items';
export { buildings } from './buildings';
export { recipes } from './recipes';
export { belts, pipelines } from './belts';

// =====================
// Item helpers
// =====================

export function getItemById(id: string): Item | undefined {
  return items[id];
}

export function getAllItemsSorted(): Item[] {
  return Object.values(items).sort((a, b) => {
    if (a.tier !== b.tier) return a.tier - b.tier;
    return a.name.localeCompare(b.name);
  });
}

export function getCategoryItems(category: ItemCategory): Item[] {
  return Object.values(items).filter(item => item.category === category);
}

export function getCategoryLabel(category: ItemCategory): string {
  const labels: Record<ItemCategory, string> = {
    'ore': 'Ores & Raw Resources',
    'ingot': 'Ingots',
    'mineral': 'Minerals',
    'fluid': 'Fluids',
    'gas': 'Gases',
    'component': 'Components',
    'industrial': 'Industrial Parts',
    'electronics': 'Electronics',
    'compound': 'Compounds',
    'fuel': 'Fuels',
    'ammo': 'Ammunition',
    'special': 'Special',
    'space-elevator': 'Space Elevator Parts',
  };
  return labels[category] ?? category;
}

// =====================
// Building helpers
// =====================

export function getBuildingById(id: string): Building | undefined {
  return buildings[id];
}

// =====================
// Recipe helpers
// =====================

export function getRecipeById(id: string): Recipe | undefined {
  return recipes[id];
}

export function getRecipesForBuilding(buildingId: string): Recipe[] {
  return Object.values(recipes).filter(r => r.buildingId === buildingId);
}

export function getRecipesProducing(itemId: string): Recipe[] {
  return Object.values(recipes).filter(r =>
    r.outputs.some(o => o.itemId === itemId)
  );
}

export function getRecipesConsuming(itemId: string): Recipe[] {
  return Object.values(recipes).filter(r =>
    r.inputs.some(i => i.itemId === itemId)
  );
}

// =====================
// Belt helpers
// =====================

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
