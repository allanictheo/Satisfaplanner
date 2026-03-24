import type { Item, ItemCategory } from '../types';

export const items: Record<string, Item> = {
  // =====================
  // ORE (Tier 0)
  // =====================
  'iron-ore': {
    id: 'iron-ore', name: 'Iron Ore', category: 'ore', tier: 0, icon: '🪨',
    stackSize: 100, description: 'A basic but versatile ore found in abundance on the planet surface.',
  },
  'copper-ore': {
    id: 'copper-ore', name: 'Copper Ore', category: 'ore', tier: 0, icon: '🟤',
    stackSize: 100, description: 'A conductive ore essential for electronics and wiring.',
  },
  'limestone': {
    id: 'limestone', name: 'Limestone', category: 'ore', tier: 0, icon: '🏔️',
    stackSize: 100, description: 'A calcium-rich sedimentary mineral used for construction materials.',
  },
  'coal': {
    id: 'coal', name: 'Coal', category: 'ore', tier: 0, icon: '⚫',
    stackSize: 100, description: 'A combustible carbon-rich resource used for power generation and steel production.',
  },
  'caterium-ore': {
    id: 'caterium-ore', name: 'Caterium Ore', category: 'ore', tier: 0, icon: '🟡',
    stackSize: 100, description: 'A rare golden ore used for high-speed electronics.',
  },
  'raw-quartz': {
    id: 'raw-quartz', name: 'Raw Quartz', category: 'ore', tier: 0, icon: '💎',
    stackSize: 100, description: 'A crystalline mineral used for electronics and oscillators.',
  },
  'sulfur': {
    id: 'sulfur', name: 'Sulfur', category: 'ore', tier: 0, icon: '🟨',
    stackSize: 100, description: 'A reactive element used in explosives and acid production.',
  },
  'bauxite': {
    id: 'bauxite', name: 'Bauxite', category: 'ore', tier: 0, icon: '🟫',
    stackSize: 100, description: 'An aluminum-bearing ore that must undergo complex refining.',
  },
  'uranium-ore': {
    id: 'uranium-ore', name: 'Uranium Ore', category: 'ore', tier: 0, icon: '☢️',
    stackSize: 100, description: 'A highly radioactive ore used for nuclear power generation.',
  },
  'sam-ore': {
    id: 'sam-ore', name: 'SAM Ore', category: 'ore', tier: 0, icon: '🔮',
    stackSize: 100, description: 'Strange Alien Metal. A mysterious resource of unknown origin.',
  },
  'nitrogen-gas': {
    id: 'nitrogen-gas', name: 'Nitrogen Gas', category: 'gas', tier: 0, icon: '💨',
    isFluid: true, description: 'An inert gas extracted from resource wells, used in advanced production.',
  },

  // =====================
  // INGOT (Tier 1-3)
  // =====================
  'iron-ingot': {
    id: 'iron-ingot', name: 'Iron Ingot', category: 'ingot', tier: 1, icon: '🔩',
    stackSize: 100, description: 'A basic building material smelted from Iron Ore.',
  },
  'copper-ingot': {
    id: 'copper-ingot', name: 'Copper Ingot', category: 'ingot', tier: 1, icon: '🟠',
    stackSize: 100, description: 'A conductive ingot smelted from Copper Ore.',
  },
  'caterium-ingot': {
    id: 'caterium-ingot', name: 'Caterium Ingot', category: 'ingot', tier: 2, icon: '✨',
    stackSize: 100, description: 'A high-value ingot smelted from Caterium Ore.',
  },
  'steel-ingot': {
    id: 'steel-ingot', name: 'Steel Ingot', category: 'ingot', tier: 3, icon: '⚙️',
    stackSize: 100, description: 'A strong alloy produced by combining Iron Ore and Coal in a Foundry.',
  },
  'aluminum-ingot': {
    id: 'aluminum-ingot', name: 'Aluminum Ingot', category: 'ingot', tier: 3, icon: '🪙',
    stackSize: 100, description: 'A lightweight metal produced from Aluminum Scrap in a Foundry.',
  },

  // =====================
  // MINERAL (Tier 1-2)
  // =====================
  'concrete': {
    id: 'concrete', name: 'Concrete', category: 'mineral', tier: 1, icon: '🧱',
    stackSize: 100, description: 'A sturdy construction material processed from Limestone.',
  },
  'quartz-crystal': {
    id: 'quartz-crystal', name: 'Quartz Crystal', category: 'mineral', tier: 2, icon: '💠',
    stackSize: 100, description: 'Refined crystals used in advanced electronics.',
  },
  'silica': {
    id: 'silica', name: 'Silica', category: 'mineral', tier: 2, icon: '⚪',
    stackSize: 100, description: 'A fine powder derived from Raw Quartz, used in circuit production.',
  },
  'compacted-coal': {
    id: 'compacted-coal', name: 'Compacted Coal', category: 'mineral', tier: 2, icon: '⬛',
    stackSize: 100, description: 'A denser form of Coal with higher energy content.',
  },
  'aluminum-scrap': {
    id: 'aluminum-scrap', name: 'Aluminum Scrap', category: 'mineral', tier: 2, icon: '🔘',
    stackSize: 100, description: 'Intermediate aluminum product refined from Alumina Solution.',
  },
  'petroleum-coke': {
    id: 'petroleum-coke', name: 'Petroleum Coke', category: 'mineral', tier: 2, icon: '⬛',
    stackSize: 200, description: 'A carbon-rich byproduct of oil refining, can substitute Coal.',
  },

  // =====================
  // FLUID (Tier 3-5, isFluid)
  // =====================
  'water': {
    id: 'water', name: 'Water', category: 'fluid', tier: 3, icon: '💧',
    isFluid: true, description: 'A universal solvent extracted from water bodies.',
  },
  'crude-oil': {
    id: 'crude-oil', name: 'Crude Oil', category: 'fluid', tier: 3, icon: '🛢️',
    isFluid: true, description: 'A raw hydrocarbon fluid extracted from oil nodes.',
  },
  'heavy-oil-residue': {
    id: 'heavy-oil-residue', name: 'Heavy Oil Residue', category: 'fluid', tier: 3, icon: '🟤',
    isFluid: true, description: 'A viscous byproduct of oil processing.',
  },
  'fuel': {
    id: 'fuel', name: 'Fuel', category: 'fluid', tier: 4, icon: '⛽',
    isFluid: true, description: 'A refined liquid fuel used in generators and vehicles.',
  },
  'turbofuel': {
    id: 'turbofuel', name: 'Turbofuel', category: 'fluid', tier: 5, icon: '🔥',
    isFluid: true, description: 'A high-octane fuel that provides more energy than standard Fuel.',
  },
  'liquid-biofuel': {
    id: 'liquid-biofuel', name: 'Liquid Biofuel', category: 'fluid', tier: 4, icon: '🌿',
    isFluid: true, description: 'A renewable liquid fuel produced from biological matter.',
  },
  'alumina-solution': {
    id: 'alumina-solution', name: 'Alumina Solution', category: 'fluid', tier: 4, icon: '🧪',
    isFluid: true, description: 'A dissolved aluminum compound used in aluminum production.',
  },
  'sulfuric-acid': {
    id: 'sulfuric-acid', name: 'Sulfuric Acid', category: 'fluid', tier: 4, icon: '🧫',
    isFluid: true, description: 'A corrosive acid used in advanced manufacturing processes.',
  },
  'nitric-acid': {
    id: 'nitric-acid', name: 'Nitric Acid', category: 'fluid', tier: 5, icon: '⚗️',
    isFluid: true, description: 'A powerful acid used in the production of advanced materials.',
  },

  // =====================
  // COMPONENT (Tier 1-4)
  // =====================
  'iron-plate': {
    id: 'iron-plate', name: 'Iron Plate', category: 'component', tier: 1, icon: '🔲',
    stackSize: 200, description: 'A flat sheet of iron used in basic construction.',
  },
  'iron-rod': {
    id: 'iron-rod', name: 'Iron Rod', category: 'component', tier: 1, icon: '📏',
    stackSize: 200, description: 'A solid rod of iron used for structural support.',
  },
  'screw': {
    id: 'screw', name: 'Screw', category: 'component', tier: 1, icon: '🔧',
    stackSize: 500, description: 'A threaded fastener crafted from Iron Rods.',
  },
  'reinforced-iron-plate': {
    id: 'reinforced-iron-plate', name: 'Reinforced Iron Plate', category: 'component', tier: 2, icon: '🛡️',
    stackSize: 100, description: 'An upgraded plate strengthened with screws.',
  },
  'modular-frame': {
    id: 'modular-frame', name: 'Modular Frame', category: 'component', tier: 2, icon: '🔳',
    stackSize: 50, description: 'A versatile structural component used in many recipes.',
  },
  'steel-beam': {
    id: 'steel-beam', name: 'Steel Beam', category: 'component', tier: 3, icon: '🏗️',
    stackSize: 200, description: 'A strong structural beam made from Steel Ingots.',
  },
  'steel-pipe': {
    id: 'steel-pipe', name: 'Steel Pipe', category: 'component', tier: 3, icon: '🔩',
    stackSize: 200, description: 'A hollow steel tube used in fluid transport and manufacturing.',
  },
  'encased-industrial-beam': {
    id: 'encased-industrial-beam', name: 'Encased Industrial Beam', category: 'component', tier: 4, icon: '🏢',
    stackSize: 100, description: 'A reinforced beam encased in concrete for heavy construction.',
  },
  'motor': {
    id: 'motor', name: 'Motor', category: 'component', tier: 4, icon: '⚡',
    stackSize: 50, description: 'An electromagnetic motor combining rotors and stators.',
  },
  'heavy-modular-frame': {
    id: 'heavy-modular-frame', name: 'Heavy Modular Frame', category: 'component', tier: 4, icon: '🔩',
    stackSize: 50, description: 'A massive structural frame for advanced buildings.',
  },
  'rotor': {
    id: 'rotor', name: 'Rotor', category: 'component', tier: 2, icon: '🌀',
    stackSize: 100, description: 'A spinning component used in motors and generators.',
  },
  'stator': {
    id: 'stator', name: 'Stator', category: 'component', tier: 4, icon: '🧲',
    stackSize: 100, description: 'A stationary electromagnetic component paired with rotors.',
  },
  'copper-sheet': {
    id: 'copper-sheet', name: 'Copper Sheet', category: 'component', tier: 2, icon: '📄',
    stackSize: 200, description: 'A thin copper sheet used in electronics production.',
  },

  // =====================
  // ELECTRONICS (Tier 2-6)
  // =====================
  'wire': {
    id: 'wire', name: 'Wire', category: 'electronics', tier: 2, icon: '〰️',
    stackSize: 500, description: 'A thin copper wire used in electrical components.',
  },
  'cable': {
    id: 'cable', name: 'Cable', category: 'electronics', tier: 2, icon: '🔌',
    stackSize: 200, description: 'An insulated cable for power and data transmission.',
  },
  'quickwire': {
    id: 'quickwire', name: 'Quickwire', category: 'electronics', tier: 2, icon: '⚡',
    stackSize: 500, description: 'A high-speed wire made from Caterium Ingots.',
  },
  'circuit-board': {
    id: 'circuit-board', name: 'Circuit Board', category: 'electronics', tier: 4, icon: '🖥️',
    stackSize: 200, description: 'A printed circuit board essential for electronic devices.',
  },
  'ai-limiter': {
    id: 'ai-limiter', name: 'AI Limiter', category: 'electronics', tier: 4, icon: '🤖',
    stackSize: 100, description: 'An electronic safety device that limits AI processing capability.',
  },
  'high-speed-connector': {
    id: 'high-speed-connector', name: 'High-Speed Connector', category: 'electronics', tier: 5, icon: '🔗',
    stackSize: 100, description: 'A precision connector for high-bandwidth data transfer.',
  },
  'computer': {
    id: 'computer', name: 'Computer', category: 'electronics', tier: 5, icon: '💻',
    stackSize: 50, description: 'An advanced computing device used in automated systems.',
  },
  'supercomputer': {
    id: 'supercomputer', name: 'Supercomputer', category: 'electronics', tier: 6, icon: '🖥️',
    stackSize: 50, description: 'A powerful computing system for the most complex calculations.',
  },
  'radio-control-unit': {
    id: 'radio-control-unit', name: 'Radio Control Unit', category: 'electronics', tier: 6, icon: '📡',
    stackSize: 50, description: 'A wireless control module for remote operations.',
  },
  'crystal-oscillator': {
    id: 'crystal-oscillator', name: 'Crystal Oscillator', category: 'electronics', tier: 5, icon: '🔮',
    stackSize: 100, description: 'A precision frequency generator using Quartz Crystals.',
  },

  // =====================
  // INDUSTRIAL (Tier 3-5)
  // =====================
  'rubber': {
    id: 'rubber', name: 'Rubber', category: 'industrial', tier: 3, icon: '⭕',
    stackSize: 200, description: 'A flexible polymer produced from Crude Oil.',
  },
  'plastic': {
    id: 'plastic', name: 'Plastic', category: 'industrial', tier: 3, icon: '🧴',
    stackSize: 200, description: 'A versatile synthetic polymer produced from Crude Oil.',
  },
  'empty-canister': {
    id: 'empty-canister', name: 'Empty Canister', category: 'industrial', tier: 3, icon: '🥫',
    stackSize: 100, description: 'An empty container for packaging fluids.',
  },
  'packaged-water': {
    id: 'packaged-water', name: 'Packaged Water', category: 'industrial', tier: 3, icon: '💧',
    stackSize: 100, description: 'Water stored in a canister for belt transport.',
  },
  'packaged-fuel': {
    id: 'packaged-fuel', name: 'Packaged Fuel', category: 'industrial', tier: 4, icon: '⛽',
    stackSize: 100, description: 'Fuel stored in a canister for belt transport.',
  },
  'fabric': {
    id: 'fabric', name: 'Fabric', category: 'industrial', tier: 4, icon: '🧵',
    stackSize: 100, description: 'A woven textile material used in filters and equipment.',
  },
  'polymer-resin': {
    id: 'polymer-resin', name: 'Polymer Resin', category: 'industrial', tier: 3, icon: '🧪',
    stackSize: 200, description: 'A raw polymer byproduct of oil refining.',
  },

  // =====================
  // COMPOUND (Tier 4-6)
  // =====================
  'electromagnetic-control-rod': {
    id: 'electromagnetic-control-rod', name: 'Electromagnetic Control Rod', category: 'compound', tier: 4, icon: '🔋',
    stackSize: 100, description: 'A control mechanism for managing electromagnetic fields.',
  },
  'cooling-system': {
    id: 'cooling-system', name: 'Cooling System', category: 'compound', tier: 5, icon: '❄️',
    stackSize: 50, description: 'An advanced heat management system for high-performance machinery.',
  },
  'fused-modular-frame': {
    id: 'fused-modular-frame', name: 'Fused Modular Frame', category: 'compound', tier: 5, icon: '🔥',
    stackSize: 50, description: 'An extremely durable frame reinforced through fusion.',
  },
  'turbo-motor': {
    id: 'turbo-motor', name: 'Turbo Motor', category: 'compound', tier: 6, icon: '🌪️',
    stackSize: 50, description: 'A high-performance motor for the most demanding applications.',
  },
  'battery': {
    id: 'battery', name: 'Battery', category: 'compound', tier: 5, icon: '🔋',
    stackSize: 100, description: 'A rechargeable energy storage device.',
  },
  'pressure-conversion-cube': {
    id: 'pressure-conversion-cube', name: 'Pressure Conversion Cube', category: 'compound', tier: 6, icon: '🧊',
    stackSize: 50, description: 'A device that converts pressure differentials into usable energy.',
  },
  'aluminum-casing': {
    id: 'aluminum-casing', name: 'Aluminum Casing', category: 'compound', tier: 4, icon: '📦',
    stackSize: 200, description: 'A lightweight casing made from Aluminum Ingots.',
  },
  'heat-sink': {
    id: 'heat-sink', name: 'Heat Sink', category: 'compound', tier: 5, icon: '🌡️',
    stackSize: 100, description: 'A thermal management component for dissipating excess heat.',
  },
  'copper-powder': {
    id: 'copper-powder', name: 'Copper Powder', category: 'compound', tier: 5, icon: '🟠',
    stackSize: 100, description: 'A fine metallic powder used in particle acceleration.',
  },

  // =====================
  // SPACE ELEVATOR (Tier 5-8)
  // =====================
  'smart-plating': {
    id: 'smart-plating', name: 'Smart Plating', category: 'space-elevator', tier: 5, icon: '📱',
    stackSize: 50, description: 'Phase 1 Space Elevator component with integrated sensors.',
  },
  'versatile-framework': {
    id: 'versatile-framework', name: 'Versatile Framework', category: 'space-elevator', tier: 5, icon: '🔧',
    stackSize: 50, description: 'Phase 1 Space Elevator component with adaptive structural support.',
  },
  'automated-wiring': {
    id: 'automated-wiring', name: 'Automated Wiring', category: 'space-elevator', tier: 5, icon: '⚡',
    stackSize: 50, description: 'Phase 2 Space Elevator component with self-routing circuits.',
  },
  'modular-engine': {
    id: 'modular-engine', name: 'Modular Engine', category: 'space-elevator', tier: 6, icon: '🚂',
    stackSize: 50, description: 'Phase 3 Space Elevator component for propulsion systems.',
  },
  'adaptive-control-unit': {
    id: 'adaptive-control-unit', name: 'Adaptive Control Unit', category: 'space-elevator', tier: 6, icon: '🎛️',
    stackSize: 50, description: 'Phase 3 Space Elevator component with AI-driven controls.',
  },
  'assembly-director-system': {
    id: 'assembly-director-system', name: 'Assembly Director System', category: 'space-elevator', tier: 7, icon: '🏭',
    stackSize: 50, description: 'Phase 4 Space Elevator component that coordinates assembly drones.',
  },
  'magnetic-field-generator': {
    id: 'magnetic-field-generator', name: 'Magnetic Field Generator', category: 'space-elevator', tier: 7, icon: '🧲',
    stackSize: 50, description: 'Phase 4 Space Elevator component generating protective magnetic fields.',
  },
  'thermal-propulsion-rocket': {
    id: 'thermal-propulsion-rocket', name: 'Thermal Propulsion Rocket', category: 'space-elevator', tier: 8, icon: '🚀',
    stackSize: 50, description: 'Phase 5 Space Elevator component for orbital launch capability.',
  },
  'nuclear-pasta': {
    id: 'nuclear-pasta', name: 'Nuclear Pasta', category: 'space-elevator', tier: 8, icon: '🍝',
    stackSize: 50, description: 'Phase 5 Space Elevator component made from degenerate matter.',
  },
};

export function getItemById(id: string): Item | undefined {
  return items[id];
}

export function getItemsByCategory(category: ItemCategory): Item[] {
  return Object.values(items).filter(item => item.category === category);
}

export function getItemsByTier(tier: number): Item[] {
  return Object.values(items).filter(item => item.tier === tier);
}
