import { useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Clock, ArrowRight, Zap } from 'lucide-react';
import { getRecipesProducing, getRecipesForBuilding } from '../../data';
import { getItemById } from '../../data/items';
import { getBuildingById } from '../../data/buildings';
import type { Recipe, RecipeIO } from '../../types';

interface RecipeTooltipProps {
  itemId: string;
  itemType: 'item' | 'building';
  anchorRef: React.RefObject<HTMLDivElement | null>;
}

function RecipeIODisplay({ io, label }: { io: RecipeIO[]; label: string }) {
  return (
    <div>
      <div className="text-[10px] font-semibold text-sf-text-muted uppercase tracking-wider mb-1">
        {label}
      </div>
      <div className="space-y-1">
        {io.map((entry) => {
          const item = getItemById(entry.itemId);
          return (
            <div key={entry.itemId} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="text-sm">{item?.icon || '?'}</span>
                <span className="text-xs text-sf-text truncate">
                  {item?.name || entry.itemId}
                </span>
              </div>
              <span className="text-xs text-sf-orange font-mono whitespace-nowrap">
                {entry.perMinute}/min
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RecipeCard({ recipe }: { recipe: Recipe }) {
  const building = getBuildingById(recipe.buildingId);

  return (
    <div className="border border-sf-border rounded-lg p-2.5 bg-sf-bg-card/50">
      {/* Recipe header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <span className="text-sm">{building?.icon || '🏭'}</span>
          <span className="text-xs font-semibold text-sf-text">{recipe.name}</span>
        </div>
        {recipe.isAlternate && (
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-sf-purple/20 text-sf-purple font-semibold">
            ALT
          </span>
        )}
      </div>

      {/* Building info */}
      <div className="flex items-center gap-3 mb-2 text-[10px] text-sf-text-dim">
        <span className="flex items-center gap-0.5">
          <Clock className="w-2.5 h-2.5" />
          {recipe.duration}s
        </span>
        {building && (
          <span className="flex items-center gap-0.5">
            <Zap className="w-2.5 h-2.5" />
            {building.powerConsumption} MW
          </span>
        )}
      </div>

      {/* IO */}
      <div className="space-y-2">
        {recipe.inputs.length > 0 && <RecipeIODisplay io={recipe.inputs} label="Inputs" />}
        <div className="flex justify-center">
          <ArrowRight className="w-3 h-3 text-sf-orange" />
        </div>
        {recipe.outputs.length > 0 && <RecipeIODisplay io={recipe.outputs} label="Outputs" />}
      </div>
    </div>
  );
}

export function RecipeTooltip({ itemId, itemType, anchorRef }: RecipeTooltipProps) {
  const recipes = useMemo(() => {
    if (itemType === 'building') {
      return getRecipesForBuilding(itemId);
    }
    return getRecipesProducing(itemId);
  }, [itemId, itemType]);

  const item = useMemo(() => {
    if (itemType === 'building') {
      return getBuildingById(itemId);
    }
    return getItemById(itemId);
  }, [itemId, itemType]);

  if (recipes.length === 0 && !item?.description) {
    return null;
  }

  // Calculate position based on anchor element
  const rect = anchorRef.current?.getBoundingClientRect();
  if (!rect) return null;

  const tooltipStyle: React.CSSProperties = {
    position: 'fixed',
    left: rect.right + 8,
    top: rect.top,
    zIndex: 50,
    maxHeight: '80vh',
  };

  // If tooltip would go off screen right, position to the left instead
  if (rect.right + 308 > window.innerWidth) {
    tooltipStyle.left = rect.left - 308;
  }

  // If tooltip would go off screen bottom, align to bottom of viewport
  if (rect.top + 300 > window.innerHeight) {
    tooltipStyle.top = undefined;
    tooltipStyle.bottom = 16;
  }

  const content = (
    <div
      style={tooltipStyle}
      className="w-72 bg-sf-bg-light border border-sf-border rounded-xl shadow-2xl shadow-black/50 p-3 fade-in overflow-y-auto"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-2 pb-2 border-b border-sf-border">
        <span className="text-2xl">{item?.icon || '?'}</span>
        <div>
          <div className="text-sm font-bold text-sf-text">{item?.name || itemId}</div>
          {item?.description && (
            <div className="text-[11px] text-sf-text-dim mt-0.5 leading-tight">
              {item.description}
            </div>
          )}
        </div>
      </div>

      {/* Building-specific info */}
      {itemType === 'building' && item && 'powerConsumption' in item && (
        <div className="flex items-center gap-3 mb-2 pb-2 border-b border-sf-border text-xs text-sf-text-dim">
          <span className="flex items-center gap-1">
            <Zap className="w-3 h-3" />
            {(item as { powerConsumption: number }).powerConsumption} MW
          </span>
        </div>
      )}

      {/* Recipes */}
      {recipes.length > 0 && (
        <div className="space-y-2">
          <div className="text-[10px] font-semibold text-sf-orange uppercase tracking-wider">
            {itemType === 'building' ? 'Available Recipes' : 'Produced By'}
          </div>
          {recipes.slice(0, 5).map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
          {recipes.length > 5 && (
            <div className="text-[10px] text-sf-text-muted text-center">
              +{recipes.length - 5} more recipes
            </div>
          )}
        </div>
      )}
    </div>
  );

  return createPortal(content, document.body);
}
