import type { Recipe } from '../types';

// Helper: perMinute = (amount / duration) * 60
// function _pm(amount: number, duration: number): number {
//   return (amount / duration) * 60;
// }

export const recipes: Record<string, Recipe> = {
  // =====================================================
  // SMELTER RECIPES
  // =====================================================
  'iron-ingot': {
    id: 'iron-ingot', name: 'Iron Ingot', buildingId: 'smelter', duration: 2, tier: 0,
    inputs: [{ itemId: 'iron-ore', amount: 1, perMinute: 30 }],
    outputs: [{ itemId: 'iron-ingot', amount: 1, perMinute: 30 }],
  },
  'copper-ingot': {
    id: 'copper-ingot', name: 'Copper Ingot', buildingId: 'smelter', duration: 2, tier: 0,
    inputs: [{ itemId: 'copper-ore', amount: 1, perMinute: 30 }],
    outputs: [{ itemId: 'copper-ingot', amount: 1, perMinute: 30 }],
  },
  'caterium-ingot': {
    id: 'caterium-ingot', name: 'Caterium Ingot', buildingId: 'smelter', duration: 4, tier: 2,
    inputs: [{ itemId: 'caterium-ore', amount: 3, perMinute: 45 }],
    outputs: [{ itemId: 'caterium-ingot', amount: 1, perMinute: 15 }],
  },

  // =====================================================
  // FOUNDRY RECIPES
  // =====================================================
  'steel-ingot': {
    id: 'steel-ingot', name: 'Steel Ingot', buildingId: 'foundry', duration: 4, tier: 3,
    inputs: [
      { itemId: 'iron-ore', amount: 3, perMinute: 45 },
      { itemId: 'coal', amount: 3, perMinute: 45 },
    ],
    outputs: [{ itemId: 'steel-ingot', amount: 3, perMinute: 45 }],
  },
  'aluminum-ingot': {
    id: 'aluminum-ingot', name: 'Aluminum Ingot', buildingId: 'foundry', duration: 4, tier: 3,
    inputs: [
      { itemId: 'aluminum-scrap', amount: 6, perMinute: 90 },
      { itemId: 'silica', amount: 5, perMinute: 75 },
    ],
    outputs: [{ itemId: 'aluminum-ingot', amount: 4, perMinute: 60 }],
  },
  'compacted-coal': {
    id: 'compacted-coal', name: 'Compacted Coal', buildingId: 'assembler', duration: 12, tier: 2,
    inputs: [
      { itemId: 'coal', amount: 5, perMinute: 25 },
      { itemId: 'sulfur', amount: 5, perMinute: 25 },
    ],
    outputs: [{ itemId: 'compacted-coal', amount: 5, perMinute: 25 }],
  },

  // =====================================================
  // CONSTRUCTOR RECIPES
  // =====================================================
  'iron-plate': {
    id: 'iron-plate', name: 'Iron Plate', buildingId: 'constructor', duration: 6, tier: 0,
    inputs: [{ itemId: 'iron-ingot', amount: 3, perMinute: 30 }],
    outputs: [{ itemId: 'iron-plate', amount: 2, perMinute: 20 }],
  },
  'iron-rod': {
    id: 'iron-rod', name: 'Iron Rod', buildingId: 'constructor', duration: 4, tier: 0,
    inputs: [{ itemId: 'iron-ingot', amount: 1, perMinute: 15 }],
    outputs: [{ itemId: 'iron-rod', amount: 1, perMinute: 15 }],
  },
  'screw': {
    id: 'screw', name: 'Screw', buildingId: 'constructor', duration: 6, tier: 0,
    inputs: [{ itemId: 'iron-rod', amount: 1, perMinute: 10 }],
    outputs: [{ itemId: 'screw', amount: 4, perMinute: 40 }],
  },
  'wire': {
    id: 'wire', name: 'Wire', buildingId: 'constructor', duration: 4, tier: 0,
    inputs: [{ itemId: 'copper-ingot', amount: 1, perMinute: 15 }],
    outputs: [{ itemId: 'wire', amount: 2, perMinute: 30 }],
  },
  'cable': {
    id: 'cable', name: 'Cable', buildingId: 'constructor', duration: 2, tier: 0,
    inputs: [{ itemId: 'wire', amount: 2, perMinute: 60 }],
    outputs: [{ itemId: 'cable', amount: 1, perMinute: 30 }],
  },
  'concrete': {
    id: 'concrete', name: 'Concrete', buildingId: 'constructor', duration: 4, tier: 0,
    inputs: [{ itemId: 'limestone', amount: 3, perMinute: 45 }],
    outputs: [{ itemId: 'concrete', amount: 1, perMinute: 15 }],
  },
  'copper-sheet': {
    id: 'copper-sheet', name: 'Copper Sheet', buildingId: 'constructor', duration: 6, tier: 2,
    inputs: [{ itemId: 'copper-ingot', amount: 2, perMinute: 20 }],
    outputs: [{ itemId: 'copper-sheet', amount: 1, perMinute: 10 }],
  },
  'quartz-crystal': {
    id: 'quartz-crystal', name: 'Quartz Crystal', buildingId: 'constructor', duration: 8, tier: 2,
    inputs: [{ itemId: 'raw-quartz', amount: 5, perMinute: 37.5 }],
    outputs: [{ itemId: 'quartz-crystal', amount: 3, perMinute: 22.5 }],
  },
  'silica': {
    id: 'silica', name: 'Silica', buildingId: 'constructor', duration: 6, tier: 2,
    inputs: [{ itemId: 'raw-quartz', amount: 3, perMinute: 30 }],
    outputs: [{ itemId: 'silica', amount: 5, perMinute: 50 }],
  },
  'steel-beam': {
    id: 'steel-beam', name: 'Steel Beam', buildingId: 'constructor', duration: 4, tier: 3,
    inputs: [{ itemId: 'steel-ingot', amount: 4, perMinute: 60 }],
    outputs: [{ itemId: 'steel-beam', amount: 1, perMinute: 15 }],
  },
  'steel-pipe': {
    id: 'steel-pipe', name: 'Steel Pipe', buildingId: 'constructor', duration: 6, tier: 3,
    inputs: [{ itemId: 'steel-ingot', amount: 3, perMinute: 30 }],
    outputs: [{ itemId: 'steel-pipe', amount: 2, perMinute: 20 }],
  },
  'quickwire': {
    id: 'quickwire', name: 'Quickwire', buildingId: 'constructor', duration: 5, tier: 2,
    inputs: [{ itemId: 'caterium-ingot', amount: 1, perMinute: 12 }],
    outputs: [{ itemId: 'quickwire', amount: 5, perMinute: 60 }],
  },
  'empty-canister': {
    id: 'empty-canister', name: 'Empty Canister', buildingId: 'constructor', duration: 4, tier: 3,
    inputs: [{ itemId: 'plastic', amount: 2, perMinute: 30 }],
    outputs: [{ itemId: 'empty-canister', amount: 4, perMinute: 60 }],
  },

  // =====================================================
  // ASSEMBLER RECIPES
  // =====================================================
  'reinforced-iron-plate': {
    id: 'reinforced-iron-plate', name: 'Reinforced Iron Plate', buildingId: 'assembler', duration: 12, tier: 0,
    inputs: [
      { itemId: 'iron-plate', amount: 6, perMinute: 30 },
      { itemId: 'screw', amount: 12, perMinute: 60 },
    ],
    outputs: [{ itemId: 'reinforced-iron-plate', amount: 1, perMinute: 5 }],
  },
  'rotor': {
    id: 'rotor', name: 'Rotor', buildingId: 'assembler', duration: 15, tier: 2,
    inputs: [
      { itemId: 'iron-rod', amount: 5, perMinute: 20 },
      { itemId: 'screw', amount: 25, perMinute: 100 },
    ],
    outputs: [{ itemId: 'rotor', amount: 1, perMinute: 4 }],
  },
  'modular-frame': {
    id: 'modular-frame', name: 'Modular Frame', buildingId: 'assembler', duration: 60, tier: 2,
    inputs: [
      { itemId: 'reinforced-iron-plate', amount: 3, perMinute: 3 },
      { itemId: 'iron-rod', amount: 12, perMinute: 12 },
    ],
    outputs: [{ itemId: 'modular-frame', amount: 2, perMinute: 2 }],
  },
  'smart-plating': {
    id: 'smart-plating', name: 'Smart Plating', buildingId: 'assembler', duration: 30, tier: 5,
    inputs: [
      { itemId: 'reinforced-iron-plate', amount: 1, perMinute: 2 },
      { itemId: 'rotor', amount: 1, perMinute: 2 },
    ],
    outputs: [{ itemId: 'smart-plating', amount: 1, perMinute: 2 }],
  },
  'stator': {
    id: 'stator', name: 'Stator', buildingId: 'assembler', duration: 12, tier: 4,
    inputs: [
      { itemId: 'steel-pipe', amount: 3, perMinute: 15 },
      { itemId: 'wire', amount: 8, perMinute: 40 },
    ],
    outputs: [{ itemId: 'stator', amount: 1, perMinute: 5 }],
  },
  'motor': {
    id: 'motor', name: 'Motor', buildingId: 'assembler', duration: 12, tier: 4,
    inputs: [
      { itemId: 'rotor', amount: 2, perMinute: 10 },
      { itemId: 'stator', amount: 2, perMinute: 10 },
    ],
    outputs: [{ itemId: 'motor', amount: 1, perMinute: 5 }],
  },
  'encased-industrial-beam': {
    id: 'encased-industrial-beam', name: 'Encased Industrial Beam', buildingId: 'assembler', duration: 10, tier: 4,
    inputs: [
      { itemId: 'steel-beam', amount: 4, perMinute: 24 },
      { itemId: 'concrete', amount: 5, perMinute: 30 },
    ],
    outputs: [{ itemId: 'encased-industrial-beam', amount: 1, perMinute: 6 }],
  },
  'circuit-board': {
    id: 'circuit-board', name: 'Circuit Board', buildingId: 'assembler', duration: 8, tier: 4,
    inputs: [
      { itemId: 'copper-sheet', amount: 2, perMinute: 15 },
      { itemId: 'plastic', amount: 4, perMinute: 30 },
    ],
    outputs: [{ itemId: 'circuit-board', amount: 1, perMinute: 7.5 }],
  },
  'ai-limiter': {
    id: 'ai-limiter', name: 'AI Limiter', buildingId: 'assembler', duration: 12, tier: 4,
    inputs: [
      { itemId: 'circuit-board', amount: 5, perMinute: 25 },
      { itemId: 'quickwire', amount: 24, perMinute: 120 },
    ],
    outputs: [{ itemId: 'ai-limiter', amount: 1, perMinute: 5 }],
  },
  'versatile-framework': {
    id: 'versatile-framework', name: 'Versatile Framework', buildingId: 'assembler', duration: 24, tier: 5,
    inputs: [
      { itemId: 'modular-frame', amount: 1, perMinute: 2.5 },
      { itemId: 'steel-beam', amount: 12, perMinute: 30 },
    ],
    outputs: [{ itemId: 'versatile-framework', amount: 2, perMinute: 5 }],
  },
  'automated-wiring': {
    id: 'automated-wiring', name: 'Automated Wiring', buildingId: 'assembler', duration: 24, tier: 5,
    inputs: [
      { itemId: 'stator', amount: 1, perMinute: 2.5 },
      { itemId: 'cable', amount: 20, perMinute: 50 },
    ],
    outputs: [{ itemId: 'automated-wiring', amount: 1, perMinute: 2.5 }],
  },
  'electromagnetic-control-rod': {
    id: 'electromagnetic-control-rod', name: 'Electromagnetic Control Rod', buildingId: 'assembler', duration: 15, tier: 4,
    inputs: [
      { itemId: 'stator', amount: 3, perMinute: 12 },
      { itemId: 'ai-limiter', amount: 2, perMinute: 8 },
    ],
    outputs: [{ itemId: 'electromagnetic-control-rod', amount: 2, perMinute: 8 }],
  },
  'crystal-oscillator': {
    id: 'crystal-oscillator', name: 'Crystal Oscillator', buildingId: 'manufacturer', duration: 120, tier: 5,
    inputs: [
      { itemId: 'quartz-crystal', amount: 36, perMinute: 18 },
      { itemId: 'cable', amount: 28, perMinute: 14 },
      { itemId: 'reinforced-iron-plate', amount: 5, perMinute: 2.5 },
    ],
    outputs: [{ itemId: 'crystal-oscillator', amount: 2, perMinute: 1 }],
  },
  'fabric': {
    id: 'fabric', name: 'Fabric', buildingId: 'assembler', duration: 4, tier: 4,
    inputs: [
      { itemId: 'polymer-resin', amount: 1, perMinute: 15 },
      { itemId: 'water', amount: 1, perMinute: 15 },
    ],
    outputs: [{ itemId: 'fabric', amount: 1, perMinute: 15 }],
  },
  'aluminum-casing': {
    id: 'aluminum-casing', name: 'Aluminum Casing', buildingId: 'constructor', duration: 2, tier: 4,
    inputs: [{ itemId: 'aluminum-ingot', amount: 3, perMinute: 90 }],
    outputs: [{ itemId: 'aluminum-casing', amount: 2, perMinute: 60 }],
  },
  'heat-sink': {
    id: 'heat-sink', name: 'Heat Sink', buildingId: 'assembler', duration: 8, tier: 5,
    inputs: [
      { itemId: 'aluminum-casing', amount: 5, perMinute: 37.5 },
      { itemId: 'copper-sheet', amount: 3, perMinute: 22.5 },
    ],
    outputs: [{ itemId: 'heat-sink', amount: 1, perMinute: 7.5 }],
  },
  'battery': {
    id: 'battery', name: 'Battery', buildingId: 'blender', duration: 3, tier: 5,
    inputs: [
      { itemId: 'sulfuric-acid', amount: 2.5, perMinute: 50 },
      { itemId: 'alumina-solution', amount: 1.5, perMinute: 30 },
      { itemId: 'aluminum-casing', amount: 1, perMinute: 20 },
    ],
    outputs: [
      { itemId: 'battery', amount: 1, perMinute: 20 },
      { itemId: 'water', amount: 1.5, perMinute: 30 },
    ],
  },

  // =====================================================
  // MANUFACTURER RECIPES
  // =====================================================
  'heavy-modular-frame': {
    id: 'heavy-modular-frame', name: 'Heavy Modular Frame', buildingId: 'manufacturer', duration: 30, tier: 4,
    inputs: [
      { itemId: 'modular-frame', amount: 5, perMinute: 10 },
      { itemId: 'steel-pipe', amount: 15, perMinute: 30 },
      { itemId: 'encased-industrial-beam', amount: 5, perMinute: 10 },
      { itemId: 'screw', amount: 100, perMinute: 200 },
    ],
    outputs: [{ itemId: 'heavy-modular-frame', amount: 1, perMinute: 2 }],
  },
  'computer': {
    id: 'computer', name: 'Computer', buildingId: 'manufacturer', duration: 24, tier: 5,
    inputs: [
      { itemId: 'circuit-board', amount: 10, perMinute: 25 },
      { itemId: 'cable', amount: 9, perMinute: 22.5 },
      { itemId: 'plastic', amount: 18, perMinute: 45 },
      { itemId: 'screw', amount: 52, perMinute: 130 },
    ],
    outputs: [{ itemId: 'computer', amount: 1, perMinute: 2.5 }],
  },
  'high-speed-connector': {
    id: 'high-speed-connector', name: 'High-Speed Connector', buildingId: 'manufacturer', duration: 16, tier: 5,
    inputs: [
      { itemId: 'quickwire', amount: 56, perMinute: 210 },
      { itemId: 'cable', amount: 10, perMinute: 37.5 },
      { itemId: 'circuit-board', amount: 1, perMinute: 3.75 },
    ],
    outputs: [{ itemId: 'high-speed-connector', amount: 1, perMinute: 3.75 }],
  },
  'supercomputer': {
    id: 'supercomputer', name: 'Supercomputer', buildingId: 'manufacturer', duration: 32, tier: 6,
    inputs: [
      { itemId: 'computer', amount: 2, perMinute: 3.75 },
      { itemId: 'ai-limiter', amount: 2, perMinute: 3.75 },
      { itemId: 'high-speed-connector', amount: 3, perMinute: 5.625 },
      { itemId: 'plastic', amount: 28, perMinute: 52.5 },
    ],
    outputs: [{ itemId: 'supercomputer', amount: 1, perMinute: 1.875 }],
  },
  'radio-control-unit': {
    id: 'radio-control-unit', name: 'Radio Control Unit', buildingId: 'manufacturer', duration: 48, tier: 6,
    inputs: [
      { itemId: 'aluminum-casing', amount: 32, perMinute: 40 },
      { itemId: 'crystal-oscillator', amount: 1, perMinute: 1.25 },
      { itemId: 'computer', amount: 1, perMinute: 1.25 },
    ],
    outputs: [{ itemId: 'radio-control-unit', amount: 2, perMinute: 2.5 }],
  },
  'modular-engine': {
    id: 'modular-engine', name: 'Modular Engine', buildingId: 'manufacturer', duration: 60, tier: 6,
    inputs: [
      { itemId: 'motor', amount: 2, perMinute: 2 },
      { itemId: 'rubber', amount: 15, perMinute: 15 },
      { itemId: 'smart-plating', amount: 2, perMinute: 2 },
    ],
    outputs: [{ itemId: 'modular-engine', amount: 1, perMinute: 1 }],
  },
  'adaptive-control-unit': {
    id: 'adaptive-control-unit', name: 'Adaptive Control Unit', buildingId: 'manufacturer', duration: 120, tier: 6,
    inputs: [
      { itemId: 'automated-wiring', amount: 15, perMinute: 7.5 },
      { itemId: 'circuit-board', amount: 10, perMinute: 5 },
      { itemId: 'heavy-modular-frame', amount: 2, perMinute: 1 },
      { itemId: 'computer', amount: 2, perMinute: 1 },
    ],
    outputs: [{ itemId: 'adaptive-control-unit', amount: 2, perMinute: 1 }],
  },
  'assembly-director-system': {
    id: 'assembly-director-system', name: 'Assembly Director System', buildingId: 'assembler', duration: 80, tier: 7,
    inputs: [
      { itemId: 'adaptive-control-unit', amount: 2, perMinute: 1.5 },
      { itemId: 'supercomputer', amount: 1, perMinute: 0.75 },
    ],
    outputs: [{ itemId: 'assembly-director-system', amount: 1, perMinute: 0.75 }],
  },
  'magnetic-field-generator': {
    id: 'magnetic-field-generator', name: 'Magnetic Field Generator', buildingId: 'manufacturer', duration: 120, tier: 7,
    inputs: [
      { itemId: 'versatile-framework', amount: 5, perMinute: 2.5 },
      { itemId: 'electromagnetic-control-rod', amount: 2, perMinute: 1 },
      { itemId: 'battery', amount: 10, perMinute: 5 },
    ],
    outputs: [{ itemId: 'magnetic-field-generator', amount: 2, perMinute: 1 }],
  },
  'thermal-propulsion-rocket': {
    id: 'thermal-propulsion-rocket', name: 'Thermal Propulsion Rocket', buildingId: 'manufacturer', duration: 120, tier: 8,
    inputs: [
      { itemId: 'modular-engine', amount: 5, perMinute: 2.5 },
      { itemId: 'turbo-motor', amount: 2, perMinute: 1 },
      { itemId: 'cooling-system', amount: 6, perMinute: 3 },
      { itemId: 'fused-modular-frame', amount: 2, perMinute: 1 },
    ],
    outputs: [{ itemId: 'thermal-propulsion-rocket', amount: 2, perMinute: 1 }],
  },
  'turbo-motor': {
    id: 'turbo-motor', name: 'Turbo Motor', buildingId: 'manufacturer', duration: 32, tier: 6,
    inputs: [
      { itemId: 'cooling-system', amount: 4, perMinute: 7.5 },
      { itemId: 'radio-control-unit', amount: 2, perMinute: 3.75 },
      { itemId: 'motor', amount: 4, perMinute: 7.5 },
      { itemId: 'rubber', amount: 24, perMinute: 45 },
    ],
    outputs: [{ itemId: 'turbo-motor', amount: 1, perMinute: 1.875 }],
  },
  'cooling-system': {
    id: 'cooling-system', name: 'Cooling System', buildingId: 'blender', duration: 10, tier: 5,
    inputs: [
      { itemId: 'heat-sink', amount: 2, perMinute: 12 },
      { itemId: 'rubber', amount: 2, perMinute: 12 },
      { itemId: 'water', amount: 5, perMinute: 30 },
      { itemId: 'nitrogen-gas', amount: 25, perMinute: 150 },
    ],
    outputs: [{ itemId: 'cooling-system', amount: 1, perMinute: 6 }],
  },
  'fused-modular-frame': {
    id: 'fused-modular-frame', name: 'Fused Modular Frame', buildingId: 'blender', duration: 40, tier: 5,
    inputs: [
      { itemId: 'heavy-modular-frame', amount: 1, perMinute: 1.5 },
      { itemId: 'aluminum-casing', amount: 50, perMinute: 75 },
      { itemId: 'nitrogen-gas', amount: 25, perMinute: 37.5 },
    ],
    outputs: [{ itemId: 'fused-modular-frame', amount: 1, perMinute: 1.5 }],
  },
  'pressure-conversion-cube': {
    id: 'pressure-conversion-cube', name: 'Pressure Conversion Cube', buildingId: 'assembler', duration: 60, tier: 6,
    inputs: [
      { itemId: 'fused-modular-frame', amount: 1, perMinute: 1 },
      { itemId: 'radio-control-unit', amount: 2, perMinute: 2 },
    ],
    outputs: [{ itemId: 'pressure-conversion-cube', amount: 1, perMinute: 1 }],
  },
  'nuclear-pasta': {
    id: 'nuclear-pasta', name: 'Nuclear Pasta', buildingId: 'particle-accelerator', duration: 120, tier: 8,
    inputs: [
      { itemId: 'copper-powder', amount: 200, perMinute: 100 },
      { itemId: 'pressure-conversion-cube', amount: 1, perMinute: 0.5 },
    ],
    outputs: [{ itemId: 'nuclear-pasta', amount: 1, perMinute: 0.5 }],
  },

  // =====================================================
  // REFINERY RECIPES
  // =====================================================
  'plastic': {
    id: 'plastic', name: 'Plastic', buildingId: 'refinery', duration: 6, tier: 3,
    inputs: [{ itemId: 'crude-oil', amount: 3, perMinute: 30 }],
    outputs: [
      { itemId: 'plastic', amount: 2, perMinute: 20 },
      { itemId: 'heavy-oil-residue', amount: 1, perMinute: 10 },
    ],
  },
  'rubber': {
    id: 'rubber', name: 'Rubber', buildingId: 'refinery', duration: 6, tier: 3,
    inputs: [{ itemId: 'crude-oil', amount: 3, perMinute: 30 }],
    outputs: [
      { itemId: 'rubber', amount: 2, perMinute: 20 },
      { itemId: 'heavy-oil-residue', amount: 2, perMinute: 20 },
    ],
  },
  'fuel': {
    id: 'fuel', name: 'Fuel', buildingId: 'refinery', duration: 6, tier: 3,
    inputs: [{ itemId: 'crude-oil', amount: 6, perMinute: 60 }],
    outputs: [
      { itemId: 'fuel', amount: 4, perMinute: 40 },
      { itemId: 'polymer-resin', amount: 3, perMinute: 30 },
    ],
  },
  'residual-fuel': {
    id: 'residual-fuel', name: 'Residual Fuel', buildingId: 'refinery', duration: 6, tier: 3,
    inputs: [{ itemId: 'heavy-oil-residue', amount: 6, perMinute: 60 }],
    outputs: [{ itemId: 'fuel', amount: 4, perMinute: 40 }],
  },
  'petroleum-coke': {
    id: 'petroleum-coke', name: 'Petroleum Coke', buildingId: 'refinery', duration: 6, tier: 3,
    inputs: [{ itemId: 'heavy-oil-residue', amount: 4, perMinute: 40 }],
    outputs: [{ itemId: 'petroleum-coke', amount: 12, perMinute: 120 }],
  },
  'residual-plastic': {
    id: 'residual-plastic', name: 'Residual Plastic', buildingId: 'refinery', duration: 6, tier: 3,
    inputs: [
      { itemId: 'polymer-resin', amount: 6, perMinute: 60 },
      { itemId: 'water', amount: 2, perMinute: 20 },
    ],
    outputs: [{ itemId: 'plastic', amount: 2, perMinute: 20 }],
  },
  'residual-rubber': {
    id: 'residual-rubber', name: 'Residual Rubber', buildingId: 'refinery', duration: 6, tier: 3,
    inputs: [
      { itemId: 'polymer-resin', amount: 4, perMinute: 40 },
      { itemId: 'water', amount: 4, perMinute: 40 },
    ],
    outputs: [{ itemId: 'rubber', amount: 2, perMinute: 20 }],
  },
  'turbofuel': {
    id: 'turbofuel', name: 'Turbofuel', buildingId: 'refinery', duration: 16, tier: 5,
    inputs: [
      { itemId: 'fuel', amount: 6, perMinute: 22.5 },
      { itemId: 'compacted-coal', amount: 4, perMinute: 15 },
    ],
    outputs: [{ itemId: 'turbofuel', amount: 5, perMinute: 18.75 }],
  },
  'alumina-solution': {
    id: 'alumina-solution', name: 'Alumina Solution', buildingId: 'refinery', duration: 6, tier: 4,
    inputs: [
      { itemId: 'bauxite', amount: 12, perMinute: 120 },
      { itemId: 'water', amount: 18, perMinute: 180 },
    ],
    outputs: [
      { itemId: 'alumina-solution', amount: 12, perMinute: 120 },
      { itemId: 'silica', amount: 5, perMinute: 50 },
    ],
  },
  'aluminum-scrap': {
    id: 'aluminum-scrap', name: 'Aluminum Scrap', buildingId: 'refinery', duration: 1, tier: 4,
    inputs: [
      { itemId: 'alumina-solution', amount: 4, perMinute: 240 },
      { itemId: 'coal', amount: 2, perMinute: 120 },
    ],
    outputs: [
      { itemId: 'aluminum-scrap', amount: 6, perMinute: 360 },
      { itemId: 'water', amount: 2, perMinute: 120 },
    ],
  },
  'sulfuric-acid': {
    id: 'sulfuric-acid', name: 'Sulfuric Acid', buildingId: 'refinery', duration: 6, tier: 4,
    inputs: [
      { itemId: 'sulfur', amount: 5, perMinute: 50 },
      { itemId: 'water', amount: 5, perMinute: 50 },
    ],
    outputs: [{ itemId: 'sulfuric-acid', amount: 5, perMinute: 50 }],
  },

  // =====================================================
  // BLENDER RECIPES
  // =====================================================
  'nitric-acid': {
    id: 'nitric-acid', name: 'Nitric Acid', buildingId: 'blender', duration: 6, tier: 5,
    inputs: [
      { itemId: 'nitrogen-gas', amount: 12, perMinute: 120 },
      { itemId: 'water', amount: 3, perMinute: 30 },
      { itemId: 'iron-plate', amount: 1, perMinute: 10 },
    ],
    outputs: [{ itemId: 'nitric-acid', amount: 3, perMinute: 30 }],
  },

  // =====================================================
  // PACKAGER RECIPES
  // =====================================================
  'packaged-water': {
    id: 'packaged-water', name: 'Packaged Water', buildingId: 'packager', duration: 2, tier: 3,
    inputs: [
      { itemId: 'water', amount: 2, perMinute: 60 },
      { itemId: 'empty-canister', amount: 2, perMinute: 60 },
    ],
    outputs: [{ itemId: 'packaged-water', amount: 2, perMinute: 60 }],
  },
  'packaged-fuel': {
    id: 'packaged-fuel', name: 'Packaged Fuel', buildingId: 'packager', duration: 3, tier: 4,
    inputs: [
      { itemId: 'fuel', amount: 2, perMinute: 40 },
      { itemId: 'empty-canister', amount: 2, perMinute: 40 },
    ],
    outputs: [{ itemId: 'packaged-fuel', amount: 2, perMinute: 40 }],
  },
  'liquid-biofuel': {
    id: 'liquid-biofuel', name: 'Liquid Biofuel', buildingId: 'refinery', duration: 4, tier: 4,
    inputs: [
      { itemId: 'fabric', amount: 5, perMinute: 75 },
      { itemId: 'water', amount: 3, perMinute: 45 },
    ],
    outputs: [{ itemId: 'liquid-biofuel', amount: 4, perMinute: 60 }],
  },

  // =====================================================
  // ALTERNATE RECIPES
  // =====================================================
  'alt-steel-screw': {
    id: 'alt-steel-screw', name: 'Steel Screw', buildingId: 'constructor', duration: 12, tier: 3,
    isAlternate: true,
    inputs: [{ itemId: 'steel-beam', amount: 1, perMinute: 5 }],
    outputs: [{ itemId: 'screw', amount: 52, perMinute: 260 }],
  },
  'alt-cast-screw': {
    id: 'alt-cast-screw', name: 'Cast Screw', buildingId: 'constructor', duration: 24, tier: 1,
    isAlternate: true,
    inputs: [{ itemId: 'iron-ingot', amount: 5, perMinute: 12.5 }],
    outputs: [{ itemId: 'screw', amount: 20, perMinute: 50 }],
  },
  'alt-iron-wire': {
    id: 'alt-iron-wire', name: 'Iron Wire', buildingId: 'constructor', duration: 24, tier: 1,
    isAlternate: true,
    inputs: [{ itemId: 'iron-ingot', amount: 5, perMinute: 12.5 }],
    outputs: [{ itemId: 'wire', amount: 9, perMinute: 22.5 }],
  },
  'alt-caterium-wire': {
    id: 'alt-caterium-wire', name: 'Caterium Wire', buildingId: 'constructor', duration: 4, tier: 2,
    isAlternate: true,
    inputs: [{ itemId: 'caterium-ingot', amount: 1, perMinute: 15 }],
    outputs: [{ itemId: 'wire', amount: 8, perMinute: 120 }],
  },
  'alt-bolted-iron-plate': {
    id: 'alt-bolted-iron-plate', name: 'Bolted Iron Plate', buildingId: 'assembler', duration: 12, tier: 1,
    isAlternate: true,
    inputs: [
      { itemId: 'iron-plate', amount: 18, perMinute: 90 },
      { itemId: 'screw', amount: 50, perMinute: 250 },
    ],
    outputs: [{ itemId: 'reinforced-iron-plate', amount: 3, perMinute: 15 }],
  },
  'alt-stitched-iron-plate': {
    id: 'alt-stitched-iron-plate', name: 'Stitched Iron Plate', buildingId: 'assembler', duration: 32, tier: 2,
    isAlternate: true,
    inputs: [
      { itemId: 'iron-plate', amount: 10, perMinute: 18.75 },
      { itemId: 'wire', amount: 20, perMinute: 37.5 },
    ],
    outputs: [{ itemId: 'reinforced-iron-plate', amount: 3, perMinute: 5.625 }],
  },
  'alt-bolted-frame': {
    id: 'alt-bolted-frame', name: 'Bolted Frame', buildingId: 'assembler', duration: 24, tier: 2,
    isAlternate: true,
    inputs: [
      { itemId: 'reinforced-iron-plate', amount: 3, perMinute: 7.5 },
      { itemId: 'screw', amount: 56, perMinute: 140 },
    ],
    outputs: [{ itemId: 'modular-frame', amount: 2, perMinute: 5 }],
  },
  'alt-steeled-frame': {
    id: 'alt-steeled-frame', name: 'Steeled Frame', buildingId: 'assembler', duration: 60, tier: 3,
    isAlternate: true,
    inputs: [
      { itemId: 'reinforced-iron-plate', amount: 2, perMinute: 2 },
      { itemId: 'steel-pipe', amount: 10, perMinute: 10 },
    ],
    outputs: [{ itemId: 'modular-frame', amount: 3, perMinute: 3 }],
  },
  'alt-pure-iron-ingot': {
    id: 'alt-pure-iron-ingot', name: 'Pure Iron Ingot', buildingId: 'refinery', duration: 12, tier: 1,
    isAlternate: true,
    inputs: [
      { itemId: 'iron-ore', amount: 7, perMinute: 35 },
      { itemId: 'water', amount: 4, perMinute: 20 },
    ],
    outputs: [{ itemId: 'iron-ingot', amount: 13, perMinute: 65 }],
  },
  'alt-pure-copper-ingot': {
    id: 'alt-pure-copper-ingot', name: 'Pure Copper Ingot', buildingId: 'refinery', duration: 24, tier: 1,
    isAlternate: true,
    inputs: [
      { itemId: 'copper-ore', amount: 6, perMinute: 15 },
      { itemId: 'water', amount: 4, perMinute: 10 },
    ],
    outputs: [{ itemId: 'copper-ingot', amount: 15, perMinute: 37.5 }],
  },
  'alt-solid-steel-ingot': {
    id: 'alt-solid-steel-ingot', name: 'Solid Steel Ingot', buildingId: 'foundry', duration: 3, tier: 3,
    isAlternate: true,
    inputs: [
      { itemId: 'iron-ingot', amount: 2, perMinute: 40 },
      { itemId: 'coal', amount: 2, perMinute: 40 },
    ],
    outputs: [{ itemId: 'steel-ingot', amount: 3, perMinute: 60 }],
  },
  'alt-recycled-plastic': {
    id: 'alt-recycled-plastic', name: 'Recycled Plastic', buildingId: 'refinery', duration: 12, tier: 3,
    isAlternate: true,
    inputs: [
      { itemId: 'rubber', amount: 6, perMinute: 30 },
      { itemId: 'fuel', amount: 6, perMinute: 30 },
    ],
    outputs: [{ itemId: 'plastic', amount: 12, perMinute: 60 }],
  },
  'alt-recycled-rubber': {
    id: 'alt-recycled-rubber', name: 'Recycled Rubber', buildingId: 'refinery', duration: 12, tier: 3,
    isAlternate: true,
    inputs: [
      { itemId: 'plastic', amount: 6, perMinute: 30 },
      { itemId: 'fuel', amount: 6, perMinute: 30 },
    ],
    outputs: [{ itemId: 'rubber', amount: 12, perMinute: 60 }],
  },
  'alt-heavy-oil-residue': {
    id: 'alt-heavy-oil-residue', name: 'Heavy Oil Residue', buildingId: 'refinery', duration: 6, tier: 3,
    isAlternate: true,
    inputs: [{ itemId: 'crude-oil', amount: 3, perMinute: 30 }],
    outputs: [
      { itemId: 'heavy-oil-residue', amount: 4, perMinute: 40 },
      { itemId: 'polymer-resin', amount: 2, perMinute: 20 },
    ],
  },
  'alt-diluted-fuel': {
    id: 'alt-diluted-fuel', name: 'Diluted Fuel', buildingId: 'blender', duration: 6, tier: 4,
    isAlternate: true,
    inputs: [
      { itemId: 'heavy-oil-residue', amount: 5, perMinute: 50 },
      { itemId: 'water', amount: 10, perMinute: 100 },
    ],
    outputs: [{ itemId: 'fuel', amount: 10, perMinute: 100 }],
  },
  'alt-silicon-circuit-board': {
    id: 'alt-silicon-circuit-board', name: 'Silicon Circuit Board', buildingId: 'assembler', duration: 24, tier: 4,
    isAlternate: true,
    inputs: [
      { itemId: 'copper-sheet', amount: 11, perMinute: 27.5 },
      { itemId: 'silica', amount: 11, perMinute: 27.5 },
    ],
    outputs: [{ itemId: 'circuit-board', amount: 5, perMinute: 12.5 }],
  },
  'alt-caterium-computer': {
    id: 'alt-caterium-computer', name: 'Caterium Computer', buildingId: 'manufacturer', duration: 16, tier: 5,
    isAlternate: true,
    inputs: [
      { itemId: 'circuit-board', amount: 7, perMinute: 26.25 },
      { itemId: 'quickwire', amount: 28, perMinute: 105 },
      { itemId: 'rubber', amount: 12, perMinute: 45 },
    ],
    outputs: [{ itemId: 'computer', amount: 1, perMinute: 3.75 }],
  },
  'alt-heavy-encased-frame': {
    id: 'alt-heavy-encased-frame', name: 'Heavy Encased Frame', buildingId: 'manufacturer', duration: 64, tier: 4,
    isAlternate: true,
    inputs: [
      { itemId: 'modular-frame', amount: 8, perMinute: 7.5 },
      { itemId: 'encased-industrial-beam', amount: 10, perMinute: 9.375 },
      { itemId: 'steel-pipe', amount: 36, perMinute: 33.75 },
      { itemId: 'concrete', amount: 22, perMinute: 20.625 },
    ],
    outputs: [{ itemId: 'heavy-modular-frame', amount: 3, perMinute: 2.8125 }],
  },
};
