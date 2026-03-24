import { useCallback, useEffect, useRef, useState } from 'react';
import { Copy, Trash2, Unplug, ChefHat, ChevronRight } from 'lucide-react';
import { useStore } from '../../store/useStore';
import {
  getBuildingById,
  getRecipeById,
  getRecipesForBuilding,
} from '../../data';

interface NodeContextMenuProps {
  nodeId: string;
  x: number;
  y: number;
  onClose: () => void;
}

export function NodeContextMenu({
  nodeId,
  x,
  y,
  onClose,
}: NodeContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [showRecipes, setShowRecipes] = useState(false);

  const nodes = useStore((s) => s.nodes);
  const edges = useStore((s) => s.edges);
  const duplicateNode = useStore((s) => s.duplicateNode);
  const removeNode = useStore((s) => s.removeNode);
  const removeEdge = useStore((s) => s.removeEdge);
  const updateNodeData = useStore((s) => s.updateNodeData);
  const setSelectedNode = useStore((s) => s.setSelectedNode);
  const simulateFlows = useStore((s) => s.simulateFlows);

  const node = nodes.find((n) => n.id === nodeId);
  const building = node?.data.buildingId
    ? getBuildingById(node.data.buildingId)
    : null;
  const availableRecipes = building
    ? getRecipesForBuilding(building.id)
    : [];

  // Close menu on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as HTMLElement)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [onClose]);

  // Close menu on escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const handleDuplicate = useCallback(() => {
    duplicateNode(nodeId);
    onClose();
  }, [duplicateNode, nodeId, onClose]);

  const handleDelete = useCallback(() => {
    removeNode(nodeId);
    setSelectedNode(null);
    onClose();
    setTimeout(() => simulateFlows(), 0);
  }, [removeNode, nodeId, setSelectedNode, onClose, simulateFlows]);

  const handleDisconnectAll = useCallback(() => {
    const connected = edges.filter(
      (e) => e.source === nodeId || e.target === nodeId,
    );
    for (const edge of connected) {
      removeEdge(edge.id);
    }
    onClose();
    setTimeout(() => simulateFlows(), 0);
  }, [edges, nodeId, removeEdge, onClose, simulateFlows]);

  const handleRecipeSelect = useCallback(
    (recipeId: string) => {
      const recipe = getRecipeById(recipeId);
      if (!recipe) return;

      const requiredInputRates: Record<string, number> = {};
      const requiredOutputRates: Record<string, number> = {};

      for (const input of recipe.inputs) {
        requiredInputRates[input.itemId] = input.perMinute;
      }
      for (const output of recipe.outputs) {
        requiredOutputRates[output.itemId] = output.perMinute;
      }

      updateNodeData(nodeId, {
        recipeId,
        requiredInputRates,
        requiredOutputRates,
      });

      onClose();
      setTimeout(() => simulateFlows(), 0);
    },
    [nodeId, updateNodeData, onClose, simulateFlows],
  );

  if (!node) return null;

  return (
    <div
      ref={menuRef}
      className="fixed z-[100] min-w-[180px] bg-sf-bg-card border border-sf-border rounded-lg shadow-2xl py-1 fade-in"
      style={{ left: x, top: y }}
    >
      {/* Duplicate */}
      <button
        onClick={handleDuplicate}
        className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-sf-text hover:bg-sf-bg-hover transition-colors"
      >
        <Copy size={14} className="text-sf-text-dim" />
        Duplicate
      </button>

      {/* Change recipe (submenu) */}
      {availableRecipes.length > 1 && (
        <div
          className="relative"
          onMouseEnter={() => setShowRecipes(true)}
          onMouseLeave={() => setShowRecipes(false)}
        >
          <button className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-sf-text hover:bg-sf-bg-hover transition-colors">
            <ChefHat size={14} className="text-sf-text-dim" />
            Change Recipe
            <ChevronRight size={12} className="ml-auto text-sf-text-muted" />
          </button>

          {showRecipes && (
            <div className="absolute left-full top-0 ml-1 min-w-[200px] bg-sf-bg-card border border-sf-border rounded-lg shadow-2xl py-1 fade-in">
              {availableRecipes.map((r) => (
                <button
                  key={r.id}
                  onClick={() => handleRecipeSelect(r.id)}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-sf-bg-hover transition-colors ${
                    r.id === node.data.recipeId
                      ? 'text-sf-orange'
                      : 'text-sf-text'
                  }`}
                >
                  {r.name}
                  {r.isAlternate && (
                    <span className="ml-1 text-sf-text-muted text-xs">
                      (Alt)
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Disconnect all */}
      <button
        onClick={handleDisconnectAll}
        className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-sf-text hover:bg-sf-bg-hover transition-colors"
      >
        <Unplug size={14} className="text-sf-text-dim" />
        Disconnect All
      </button>

      {/* Divider */}
      <div className="my-1 border-t border-sf-border" />

      {/* Delete */}
      <button
        onClick={handleDelete}
        className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-sf-red hover:bg-sf-red/10 transition-colors"
      >
        <Trash2 size={14} />
        Delete
      </button>
    </div>
  );
}
