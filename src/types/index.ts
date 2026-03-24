export type ItemCategory = 'ore' | 'ingot' | 'mineral' | 'fluid' | 'gas' | 'component' | 'industrial' | 'electronics' | 'compound' | 'fuel' | 'ammo' | 'special' | 'space-elevator';

export type BuildingCategory = 'extraction' | 'smelting' | 'production' | 'oil' | 'power' | 'logistics';

export type Tier = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface Item {
  id: string;
  name: string;
  category: ItemCategory;
  tier: Tier;
  icon: string; // emoji for now
  stackSize?: number;
  isFluid?: boolean;
  description?: string;
}

export interface RecipeIO {
  itemId: string;
  amount: number; // per cycle
  perMinute: number;
}

export interface Recipe {
  id: string;
  name: string;
  buildingId: string;
  duration: number; // seconds per cycle
  inputs: RecipeIO[];
  outputs: RecipeIO[];
  isAlternate?: boolean;
  tier: Tier;
}

export interface Building {
  id: string;
  name: string;
  category: BuildingCategory;
  icon: string;
  tier: Tier;
  powerConsumption: number; // MW
  description?: string;
  maxInputs: number;
  maxOutputs: number;
  allowedRecipeIds?: string[];
}

export interface Belt {
  id: string;
  name: string;
  tier: Tier;
  maxRate: number; // items/min
  icon: string;
}

export interface PipelineTier {
  id: string;
  name: string;
  tier: Tier;
  maxRate: number; // m³/min
  icon: string;
}

// Canvas/Node types
export type FactoryNodeType = 'building' | 'resource' | 'storage' | 'splitter' | 'merger' | 'logistics';

export interface FactoryNodeData extends Record<string, unknown> {
  type: FactoryNodeType;
  buildingId?: string;
  itemId?: string;
  recipeId?: string;
  label: string;
  icon: string;
  clockSpeed: number; // 0-250%
  inputRates: Record<string, number>; // itemId -> actual rate
  outputRates: Record<string, number>;
  requiredInputRates: Record<string, number>;
  requiredOutputRates: Record<string, number>;
  status: 'idle' | 'running' | 'bottleneck' | 'overflow' | 'starved';
  isOptimized?: boolean;
}

export interface ConnectionData extends Record<string, unknown> {
  beltId: string;
  itemId?: string;
  actualRate: number;
  maxRate: number;
  utilization: number; // 0-1
  isBottleneck: boolean;
  isOptimized?: boolean;
}

export interface OptimizationResult {
  targetItemId: string;
  targetRate: number;
  nodes: OptimizationNode[];
  connections: OptimizationConnection[];
  bottlenecks: string[];
  totalPower: number;
  efficiency: number;
}

export interface OptimizationNode {
  buildingId: string;
  recipeId: string;
  count: number;
  clockSpeed: number;
}

export interface OptimizationConnection {
  fromNode: string;
  toNode: string;
  itemId: string;
  rate: number;
  beltId: string;
}
