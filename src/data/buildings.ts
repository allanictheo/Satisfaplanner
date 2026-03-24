import type { Building, BuildingCategory } from '../types';

export const buildings: Record<string, Building> = {
  // =====================
  // EXTRACTION
  // =====================
  'miner-mk1': {
    id: 'miner-mk1', name: 'Miner Mk.1', category: 'extraction', icon: '⛏️',
    tier: 0, powerConsumption: 5, maxInputs: 0, maxOutputs: 1,
    description: 'Extracts solid resources from resource nodes at a basic rate.',
  },
  'miner-mk2': {
    id: 'miner-mk2', name: 'Miner Mk.2', category: 'extraction', icon: '⛏️',
    tier: 2, powerConsumption: 12, maxInputs: 0, maxOutputs: 1,
    description: 'An upgraded miner that extracts resources at double the rate of Mk.1.',
  },
  'miner-mk3': {
    id: 'miner-mk3', name: 'Miner Mk.3', category: 'extraction', icon: '⛏️',
    tier: 4, powerConsumption: 30, maxInputs: 0, maxOutputs: 1,
    description: 'The most advanced miner, extracting resources at quadruple the Mk.1 rate.',
  },
  'oil-extractor': {
    id: 'oil-extractor', name: 'Oil Extractor', category: 'extraction', icon: '🛢️',
    tier: 3, powerConsumption: 40, maxInputs: 0, maxOutputs: 1,
    description: 'Extracts Crude Oil from oil resource nodes.',
  },
  'water-extractor': {
    id: 'water-extractor', name: 'Water Extractor', category: 'extraction', icon: '🚰',
    tier: 3, powerConsumption: 20, maxInputs: 0, maxOutputs: 1,
    description: 'Pumps Water from bodies of water at 120 m\u00B3/min.',
  },

  // =====================
  // SMELTING
  // =====================
  'smelter': {
    id: 'smelter', name: 'Smelter', category: 'smelting', icon: '🔥',
    tier: 0, powerConsumption: 4, maxInputs: 1, maxOutputs: 1,
    description: 'Smelts a single ore type into ingots.',
  },
  'foundry': {
    id: 'foundry', name: 'Foundry', category: 'smelting', icon: '🏭',
    tier: 1, powerConsumption: 16, maxInputs: 2, maxOutputs: 1,
    description: 'Smelts two input types into alloy ingots.',
  },

  // =====================
  // PRODUCTION
  // =====================
  'constructor': {
    id: 'constructor', name: 'Constructor', category: 'production' as BuildingCategory, icon: '🏭',
    tier: 0 as const, powerConsumption: 4, maxInputs: 1, maxOutputs: 1,
    description: 'Crafts single-input items like plates, rods, and wire.',
  },
  'assembler': {
    id: 'assembler', name: 'Assembler', category: 'production', icon: '🔧',
    tier: 2, powerConsumption: 15, maxInputs: 2, maxOutputs: 1,
    description: 'Combines two input types into more complex products.',
  },
  'manufacturer': {
    id: 'manufacturer', name: 'Manufacturer', category: 'production', icon: '🏗️',
    tier: 4, powerConsumption: 55, maxInputs: 4, maxOutputs: 1,
    description: 'Crafts the most complex items from up to four different inputs.',
  },
  'particle-accelerator': {
    id: 'particle-accelerator', name: 'Particle Accelerator', category: 'production', icon: '⚛️',
    tier: 8, powerConsumption: 1500, maxInputs: 2, maxOutputs: 1,
    description: 'Uses immense energy to create exotic materials like Nuclear Pasta.',
  },

  // =====================
  // OIL PROCESSING
  // =====================
  'refinery': {
    id: 'refinery', name: 'Refinery', category: 'oil', icon: '⚗️',
    tier: 3, powerConsumption: 30, maxInputs: 2, maxOutputs: 2,
    description: 'Processes fluid and solid resources, primarily for oil products.',
  },
  'blender': {
    id: 'blender', name: 'Blender', category: 'oil', icon: '🫧',
    tier: 5, powerConsumption: 75, maxInputs: 4, maxOutputs: 2,
    description: 'An advanced fluid processor that handles up to four inputs.',
  },
  'packager': {
    id: 'packager', name: 'Packager', category: 'oil', icon: '📦',
    tier: 3, powerConsumption: 10, maxInputs: 2, maxOutputs: 2,
    description: 'Packages fluids into canisters or unpacks them back into fluids.',
  },

  // =====================
  // POWER
  // =====================
  'coal-generator': {
    id: 'coal-generator', name: 'Coal Generator', category: 'power', icon: '⚡',
    tier: 3, powerConsumption: -75, maxInputs: 2, maxOutputs: 0,
    description: 'Burns Coal and Water to generate 75 MW of power.',
  },
  'fuel-generator': {
    id: 'fuel-generator', name: 'Fuel Generator', category: 'power', icon: '⚡',
    tier: 5, powerConsumption: -250, maxInputs: 1, maxOutputs: 0,
    description: 'Burns liquid Fuel to generate 250 MW of power.',
  },
  'nuclear-power-plant': {
    id: 'nuclear-power-plant', name: 'Nuclear Power Plant', category: 'power', icon: '☢️',
    tier: 8, powerConsumption: -2500, maxInputs: 1, maxOutputs: 1,
    description: 'Generates 2500 MW from Uranium Fuel Rods, producing Nuclear Waste.',
  },
};

export function getBuildingById(id: string): Building | undefined {
  return buildings[id];
}

export function getBuildingsByCategory(category: BuildingCategory): Building[] {
  return Object.values(buildings).filter(b => b.category === category);
}
