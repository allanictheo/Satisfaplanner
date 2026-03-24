import { useStore } from '../../store/useStore';

const CATEGORIES: { value: string; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'ore', label: 'Ores' },
  { value: 'ingot', label: 'Ingots' },
  { value: 'mineral', label: 'Minerals' },
  { value: 'fluid', label: 'Fluids' },
  { value: 'component', label: 'Components' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'industrial', label: 'Industrial' },
  { value: 'compound', label: 'Advanced' },
  { value: 'space-elevator', label: 'Space Elevator' },
  { value: 'buildings', label: 'Buildings' },
];

const TIERS = [0, 1, 2, 3, 4, 5, 6, 7, 8] as const;

export function SidebarFilters() {
  const selectedCategory = useStore((s) => s.sidebar.selectedCategory);
  const selectedTier = useStore((s) => s.sidebar.selectedTier);
  const setSelectedCategory = useStore((s) => s.setSelectedCategory);
  const setSelectedTier = useStore((s) => s.setSelectedTier);

  const effectiveCategory = selectedCategory ?? 'all';

  return (
    <div className="border-b border-sf-border px-4 py-3 space-y-3">
      {/* Tier filters */}
      <div>
        <div className="text-xs font-semibold text-sf-text-dim uppercase tracking-wider mb-2">
          Tier
        </div>
        <div className="flex flex-wrap gap-1">
          <button
            onClick={() => setSelectedTier(null)}
            className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
              selectedTier === null
                ? 'bg-sf-orange text-sf-bg font-bold'
                : 'bg-sf-bg-card text-sf-text-dim hover:bg-sf-bg-hover hover:text-sf-text border border-sf-border'
            }`}
          >
            All
          </button>
          {TIERS.map((tier) => (
            <button
              key={tier}
              onClick={() => setSelectedTier(selectedTier === tier ? null : tier)}
              className={`px-2.5 py-1 text-xs font-medium rounded transition-colors min-w-[28px] ${
                selectedTier === tier
                  ? 'bg-sf-orange text-sf-bg font-bold'
                  : 'bg-sf-bg-card text-sf-text-dim hover:bg-sf-bg-hover hover:text-sf-text border border-sf-border'
              }`}
            >
              {tier}
            </button>
          ))}
        </div>
      </div>

      {/* Category filters */}
      <div>
        <div className="text-xs font-semibold text-sf-text-dim uppercase tracking-wider mb-2">
          Category
        </div>
        <div className="flex flex-wrap gap-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() =>
                setSelectedCategory(cat.value === 'all' ? null : cat.value)
              }
              className={`px-2.5 py-1 text-xs font-medium rounded-full transition-colors ${
                effectiveCategory === cat.value
                  ? 'bg-sf-orange text-sf-bg font-bold'
                  : 'bg-sf-bg-card text-sf-text-dim hover:bg-sf-bg-hover hover:text-sf-text border border-sf-border'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
