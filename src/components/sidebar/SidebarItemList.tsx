import { useMemo } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { items } from '../../data/items';
import { buildings } from '../../data/buildings';
import { SidebarItem } from './SidebarItem';
import type { Item, Building } from '../../types';

const CATEGORY_LABELS: Record<string, string> = {
  ore: 'Ores',
  ingot: 'Ingots',
  mineral: 'Minerals',
  fluid: 'Fluids',
  gas: 'Gases',
  component: 'Components',
  electronics: 'Electronics',
  industrial: 'Industrial',
  compound: 'Advanced',
  fuel: 'Fuels',
  'space-elevator': 'Space Elevator',
  extraction: 'Extraction',
  smelting: 'Smelting',
  production: 'Production',
  oil: 'Oil Processing',
  power: 'Power',
  logistics: 'Logistics',
};

const CATEGORY_ORDER = [
  'ore',
  'ingot',
  'mineral',
  'fluid',
  'gas',
  'fuel',
  'component',
  'electronics',
  'industrial',
  'compound',
  'space-elevator',
  'extraction',
  'smelting',
  'production',
  'oil',
  'power',
  'logistics',
];

export interface SidebarEntry {
  id: string;
  name: string;
  category: string;
  tier: number;
  icon: string;
  type: 'item' | 'building';
  isFluid?: boolean;
  description?: string;
  powerConsumption?: number;
}

function toEntry(item: Item): SidebarEntry {
  return {
    id: item.id,
    name: item.name,
    category: item.category,
    tier: item.tier,
    icon: item.icon,
    type: 'item',
    isFluid: item.isFluid,
    description: item.description,
  };
}

function buildingToEntry(b: Building): SidebarEntry {
  return {
    id: b.id,
    name: b.name,
    category: b.category,
    tier: b.tier,
    icon: b.icon,
    type: 'building',
    description: b.description,
    powerConsumption: b.powerConsumption,
  };
}

export function SidebarItemList() {
  const searchQuery = useStore((s) => s.sidebar.searchQuery);
  const selectedCategory = useStore((s) => s.sidebar.selectedCategory);
  const selectedTier = useStore((s) => s.sidebar.selectedTier);
  const expandedGroups = useStore((s) => s.sidebar.expandedGroups);
  const toggleGroup = useStore((s) => s.toggleGroup);

  const grouped = useMemo(() => {
    const allEntries: SidebarEntry[] = [];

    // Determine which entries to include based on category
    // null or any item category => show items; "buildings" => show only buildings
    const isBuildings = selectedCategory === 'buildings';
    const isAll = selectedCategory === null;
    const showItems = isAll || !isBuildings;
    const showBuildings = isAll || isBuildings;

    if (showItems) {
      for (const item of Object.values(items)) {
        allEntries.push(toEntry(item));
      }
    }

    if (showBuildings) {
      for (const b of Object.values(buildings)) {
        allEntries.push(buildingToEntry(b));
      }
    }

    // Filter by search
    let filtered = allEntries;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((e) => e.name.toLowerCase().includes(q));
    }

    // Filter by tier
    if (selectedTier !== null) {
      filtered = filtered.filter((e) => e.tier === selectedTier);
    }

    // Filter by specific item category (not null/"all" or "buildings")
    if (selectedCategory !== null && selectedCategory !== 'buildings') {
      filtered = filtered.filter((e) => e.category === selectedCategory);
    }

    // Group by category
    const groups = new Map<string, SidebarEntry[]>();
    for (const entry of filtered) {
      const cat = entry.category;
      if (!groups.has(cat)) {
        groups.set(cat, []);
      }
      groups.get(cat)!.push(entry);
    }

    // Sort groups by defined order
    const sorted: { category: string; label: string; entries: SidebarEntry[] }[] = [];
    for (const cat of CATEGORY_ORDER) {
      const entries = groups.get(cat);
      if (entries && entries.length > 0) {
        sorted.push({
          category: cat,
          label: CATEGORY_LABELS[cat] || cat,
          entries: entries.sort((a, b) => a.tier - b.tier || a.name.localeCompare(b.name)),
        });
      }
    }

    // Include any categories not in the predefined order
    for (const [cat, entries] of groups) {
      if (!CATEGORY_ORDER.includes(cat) && entries.length > 0) {
        sorted.push({
          category: cat,
          label: CATEGORY_LABELS[cat] || cat,
          entries: entries.sort((a, b) => a.tier - b.tier || a.name.localeCompare(b.name)),
        });
      }
    }

    return sorted;
  }, [searchQuery, selectedCategory, selectedTier]);

  const totalCount = grouped.reduce((sum, g) => sum + g.entries.length, 0);

  return (
    <div className="flex-1 overflow-y-auto">
      {totalCount === 0 ? (
        <div className="px-4 py-8 text-center text-sf-text-muted text-sm">
          No items match your filters.
        </div>
      ) : (
        grouped.map((group) => {
          const isExpanded = expandedGroups.has(group.category);
          return (
            <div key={group.category}>
              <button
                onClick={() => toggleGroup(group.category)}
                className="w-full flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-sf-text-dim hover:text-sf-text hover:bg-sf-bg-hover/50 transition-colors sticky top-0 bg-sf-sidebar z-10 border-b border-sf-border/50"
              >
                {isExpanded ? (
                  <ChevronDown className="w-3.5 h-3.5" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5" />
                )}
                <span>{group.label}</span>
                <span className="ml-auto text-sf-text-muted font-normal">
                  {group.entries.length}
                </span>
              </button>
              {isExpanded && (
                <div className="px-2 py-1 space-y-0.5">
                  {group.entries.map((entry) => (
                    <SidebarItem key={entry.id} entry={entry} />
                  ))}
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
