import { useState, useRef } from 'react';
import { GripVertical, Zap } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { RecipeTooltip } from './RecipeTooltip';
import type { SidebarEntry } from './SidebarItemList';

const TIER_COLORS: Record<number, string> = {
  0: 'bg-sf-text-muted/20 text-sf-text-dim',
  1: 'bg-sf-green/20 text-sf-green',
  2: 'bg-sf-blue/20 text-sf-blue',
  3: 'bg-sf-cyan/20 text-sf-cyan',
  4: 'bg-sf-purple/20 text-sf-purple',
  5: 'bg-sf-orange/20 text-sf-orange',
  6: 'bg-sf-red/20 text-sf-red',
  7: 'bg-sf-yellow/20 text-sf-yellow',
  8: 'bg-sf-red/30 text-sf-red',
};

export function SidebarItem({ entry }: { entry: SidebarEntry }) {
  const setDraggedItem = useStore((s) => s.setDraggedItem);
  const [showTooltip, setShowTooltip] = useState(false);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const itemRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (e: React.DragEvent) => {
    setDraggedItem({ type: entry.type, id: entry.id });
    e.dataTransfer.setData(
      'application/json',
      JSON.stringify({ type: entry.type, id: entry.id })
    );
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const handleMouseEnter = () => {
    hoverTimeout.current = setTimeout(() => {
      setShowTooltip(true);
    }, 400);
  };

  const handleMouseLeave = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
      hoverTimeout.current = null;
    }
    setShowTooltip(false);
  };

  const tierColor = TIER_COLORS[entry.tier] || TIER_COLORS[0];

  return (
    <div
      ref={itemRef}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative group flex items-center gap-2.5 px-2.5 py-2 rounded-lg cursor-grab active:cursor-grabbing hover:bg-sf-bg-hover border border-transparent hover:border-sf-border transition-all"
    >
      {/* Drag affordance */}
      <GripVertical className="w-3 h-3 text-sf-text-muted opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />

      {/* Icon */}
      <span className="text-xl leading-none flex-shrink-0" role="img" aria-label={entry.name}>
        {entry.icon}
      </span>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="text-sm text-sf-text truncate font-medium">{entry.name}</div>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span
            className={`inline-flex items-center px-1.5 py-0 text-[10px] font-semibold rounded ${tierColor}`}
          >
            T{entry.tier}
          </span>
          {entry.type === 'building' && entry.powerConsumption !== undefined && (
            <span
              className={`inline-flex items-center gap-0.5 text-[10px] ${
                entry.powerConsumption < 0 ? 'text-sf-green' : 'text-sf-yellow'
              }`}
            >
              <Zap className="w-2.5 h-2.5" />
              {entry.powerConsumption < 0 ? '+' : ''}
              {Math.abs(entry.powerConsumption)} MW
            </span>
          )}
          {entry.isFluid && (
            <span className="text-[10px] text-sf-blue">fluid</span>
          )}
        </div>
      </div>

      {/* Tooltip */}
      {showTooltip && (
        <RecipeTooltip
          itemId={entry.id}
          itemType={entry.type}
          anchorRef={itemRef}
        />
      )}
    </div>
  );
}
