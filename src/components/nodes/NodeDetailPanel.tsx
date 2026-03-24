import { useCallback, useMemo } from 'react';
import { X, Copy, Trash2, Zap, Clock, ArrowRightLeft } from 'lucide-react';
import { useStore } from '../../store/useStore';
import {
  getBuildingById,
  getItemById,
  getRecipeById,
  getRecipesForBuilding,
  getBeltById,
} from '../../data';
import { belts } from '../../data/belts';
import type { ConnectionData } from '../../types';

export function NodeDetailPanel() {
  const selectedNodeId = useStore((s) => s.canvas.selectedNodeId);
  const nodes = useStore((s) => s.nodes);
  const edges = useStore((s) => s.edges);
  const updateNodeData = useStore((s) => s.updateNodeData);
  const removeNode = useStore((s) => s.removeNode);
  const duplicateNode = useStore((s) => s.duplicateNode);
  const setSelectedNode = useStore((s) => s.setSelectedNode);
  const updateEdgeData = useStore((s) => s.updateEdgeData);
  const simulateFlows = useStore((s) => s.simulateFlows);

  const node = useMemo(
    () => nodes.find((n) => n.id === selectedNodeId),
    [nodes, selectedNodeId],
  );

  const connectedEdges = useMemo(
    () =>
      edges.filter(
        (e) => e.source === selectedNodeId || e.target === selectedNodeId,
      ),
    [edges, selectedNodeId],
  );

  const building = node?.data.buildingId
    ? getBuildingById(node.data.buildingId)
    : null;

  const recipe = node?.data.recipeId
    ? getRecipeById(node.data.recipeId)
    : null;

  const availableRecipes = building
    ? getRecipesForBuilding(building.id)
    : [];

  const handleClose = useCallback(() => {
    setSelectedNode(null);
  }, [setSelectedNode]);

  const handleRecipeChange = useCallback(
    (recipeId: string) => {
      if (!selectedNodeId) return;
      const newRecipe = getRecipeById(recipeId);
      if (!newRecipe) return;

      const requiredInputRates: Record<string, number> = {};
      const requiredOutputRates: Record<string, number> = {};

      for (const input of newRecipe.inputs) {
        requiredInputRates[input.itemId] = input.perMinute;
      }
      for (const output of newRecipe.outputs) {
        requiredOutputRates[output.itemId] = output.perMinute;
      }

      updateNodeData(selectedNodeId, {
        recipeId,
        label: building?.name ?? newRecipe.name,
        requiredInputRates,
        requiredOutputRates,
      });
      setTimeout(() => simulateFlows(), 0);
    },
    [selectedNodeId, building, updateNodeData, simulateFlows],
  );

  const handleClockSpeedChange = useCallback(
    (speed: number) => {
      if (!selectedNodeId || !recipe) return;

      const factor = speed / 100;
      const requiredInputRates: Record<string, number> = {};
      const requiredOutputRates: Record<string, number> = {};

      for (const input of recipe.inputs) {
        requiredInputRates[input.itemId] = input.perMinute * factor;
      }
      for (const output of recipe.outputs) {
        requiredOutputRates[output.itemId] = output.perMinute * factor;
      }

      updateNodeData(selectedNodeId, {
        clockSpeed: speed,
        requiredInputRates,
        requiredOutputRates,
      });
      setTimeout(() => simulateFlows(), 0);
    },
    [selectedNodeId, recipe, updateNodeData, simulateFlows],
  );

  const handleBeltChange = useCallback(
    (edgeId: string, beltId: string) => {
      const belt = getBeltById(beltId);
      if (!belt) return;
      updateEdgeData(edgeId, { beltId, maxRate: belt.maxRate });
      setTimeout(() => simulateFlows(), 0);
    },
    [updateEdgeData, simulateFlows],
  );

  const handleDelete = useCallback(() => {
    if (!selectedNodeId) return;
    removeNode(selectedNodeId);
    setSelectedNode(null);
    setTimeout(() => simulateFlows(), 0);
  }, [selectedNodeId, removeNode, setSelectedNode, simulateFlows]);

  const handleDuplicate = useCallback(() => {
    if (!selectedNodeId) return;
    duplicateNode(selectedNodeId);
  }, [selectedNodeId, duplicateNode]);

  if (!node) return null;

  const { data } = node;

  const statusColors: Record<string, string> = {
    running: 'text-sf-green',
    bottleneck: 'text-sf-red',
    overflow: 'text-sf-yellow',
    idle: 'text-sf-text-muted',
    starved: 'text-sf-blue',
  };

  const statusDotColors: Record<string, string> = {
    running: 'bg-sf-green',
    bottleneck: 'bg-sf-red',
    overflow: 'bg-sf-yellow',
    idle: 'bg-sf-text-muted',
    starved: 'bg-sf-blue',
  };

  return (
    <div className="absolute top-0 right-0 h-full w-[350px] bg-sf-bg-light border-l border-sf-border shadow-2xl z-50 flex flex-col overflow-hidden fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-sf-border bg-sf-bg-card">
        <span className="text-3xl">{data.icon}</span>
        <div className="flex-1 min-w-0">
          <h2 className="text-base font-semibold text-sf-text truncate">
            {data.label}
          </h2>
          {recipe && (
            <p className="text-xs text-sf-text-dim truncate">{recipe.name}</p>
          )}
        </div>
        <button
          onClick={handleClose}
          className="p-1.5 rounded hover:bg-sf-bg-hover text-sf-text-muted hover:text-sf-text transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        {/* Status */}
        <div className="flex items-center gap-2">
          <span
            className={`w-2.5 h-2.5 rounded-full ${statusDotColors[data.status]}`}
          />
          <span className={`text-sm font-medium ${statusColors[data.status]}`}>
            {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
          </span>
          {building && building.powerConsumption !== 0 && (
            <span className="ml-auto flex items-center gap-1 text-xs text-sf-text-muted">
              <Zap size={12} />
              {building.powerConsumption < 0 ? '+' : ''}
              {Math.abs(
                Math.round(
                  building.powerConsumption * (data.clockSpeed / 100) * 10,
                ) / 10,
              )}{' '}
              MW
            </span>
          )}
        </div>

        {/* Recipe selector */}
        {data.type === 'building' && availableRecipes.length > 0 && (
          <div>
            <label className="block text-xs font-medium text-sf-text-dim mb-1.5">
              Recipe
            </label>
            <select
              value={data.recipeId ?? ''}
              onChange={(e) => handleRecipeChange(e.target.value)}
              className="w-full bg-sf-bg-card border border-sf-border rounded px-3 py-2 text-sm text-sf-text focus:outline-none focus:border-sf-orange"
            >
              {availableRecipes.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                  {r.isAlternate ? ' (Alt)' : ''}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Clock speed */}
        {data.type === 'building' && (
          <div>
            <label className="flex items-center justify-between text-xs font-medium text-sf-text-dim mb-1.5">
              <span className="flex items-center gap-1">
                <Clock size={12} />
                Clock Speed
              </span>
              <span className="text-sf-orange font-semibold">
                {data.clockSpeed}%
              </span>
            </label>
            <input
              type="range"
              min={25}
              max={250}
              step={1}
              value={data.clockSpeed}
              onChange={(e) => handleClockSpeedChange(Number(e.target.value))}
              className="w-full h-1.5 bg-sf-border rounded-lg appearance-none cursor-pointer accent-sf-orange"
            />
            <div className="flex justify-between text-[10px] text-sf-text-muted mt-0.5">
              <span>25%</span>
              <span>100%</span>
              <span>250%</span>
            </div>
          </div>
        )}

        {/* Inputs */}
        {Object.keys(data.requiredInputRates).length > 0 && (
          <div>
            <h3 className="text-xs font-medium text-sf-text-dim mb-2 uppercase tracking-wider">
              Inputs
            </h3>
            <div className="space-y-1.5">
              {Object.entries(data.requiredInputRates).map(
                ([itemId, requiredRate]) => {
                  const item = getItemById(itemId);
                  const actualRate = data.inputRates[itemId] ?? 0;
                  const ratio =
                    requiredRate > 0 ? actualRate / requiredRate : 0;
                  const barColor =
                    ratio >= 0.95
                      ? 'bg-sf-green'
                      : ratio >= 0.5
                        ? 'bg-sf-yellow'
                        : 'bg-sf-red';

                  return (
                    <div
                      key={itemId}
                      className="bg-sf-bg-card rounded p-2 border border-sf-border"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="flex items-center gap-1.5 text-xs text-sf-text">
                          <span>{item?.icon ?? '?'}</span>
                          {item?.name ?? itemId}
                        </span>
                        <span className="text-xs text-sf-text-dim">
                          {Math.round(actualRate * 10) / 10} /{' '}
                          {Math.round(requiredRate * 10) / 10} /min
                        </span>
                      </div>
                      <div className="w-full h-1 bg-sf-border rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${barColor}`}
                          style={{ width: `${Math.min(ratio * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  );
                },
              )}
            </div>
          </div>
        )}

        {/* Outputs */}
        {Object.keys(data.requiredOutputRates).length > 0 && (
          <div>
            <h3 className="text-xs font-medium text-sf-text-dim mb-2 uppercase tracking-wider">
              Outputs
            </h3>
            <div className="space-y-1.5">
              {Object.entries(data.requiredOutputRates).map(
                ([itemId, requiredRate]) => {
                  const item = getItemById(itemId);
                  // const _actualRate = data.outputRates[itemId] ?? 0;

                  return (
                    <div
                      key={itemId}
                      className="bg-sf-bg-card rounded p-2 border border-sf-border"
                    >
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-xs text-sf-text">
                          <span>{item?.icon ?? '?'}</span>
                          {item?.name ?? itemId}
                        </span>
                        <span className="text-xs text-sf-green">
                          {Math.round(requiredRate * 10) / 10}/min
                        </span>
                      </div>
                    </div>
                  );
                },
              )}
            </div>
          </div>
        )}

        {/* Belt connections */}
        {connectedEdges.length > 0 && (
          <div>
            <h3 className="flex items-center gap-1.5 text-xs font-medium text-sf-text-dim mb-2 uppercase tracking-wider">
              <ArrowRightLeft size={12} />
              Connections
            </h3>
            <div className="space-y-1.5">
              {connectedEdges.map((edge) => {
                const edgeData = edge.data as ConnectionData | undefined;
                if (!edgeData) return null;

                // const _belt = getBeltById(edgeData.beltId);
                const item = edgeData.itemId
                  ? getItemById(edgeData.itemId)
                  : null;
                const isIncoming = edge.target === selectedNodeId;
                const otherNodeId = isIncoming ? edge.source : edge.target;
                const otherNode = nodes.find((n) => n.id === otherNodeId);

                return (
                  <div
                    key={edge.id}
                    className="bg-sf-bg-card rounded p-2 border border-sf-border"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs text-sf-text">
                        {isIncoming ? 'From' : 'To'}{' '}
                        <span className="text-sf-text-dim">
                          {otherNode?.data.label ?? otherNodeId}
                        </span>
                      </span>
                      {item && (
                        <span className="text-xs">
                          {item.icon} {Math.round(edgeData.actualRate * 10) / 10}/m
                        </span>
                      )}
                    </div>
                    <select
                      value={edgeData.beltId}
                      onChange={(e) => handleBeltChange(edge.id, e.target.value)}
                      className="w-full bg-sf-bg border border-sf-border rounded px-2 py-1 text-xs text-sf-text focus:outline-none focus:border-sf-orange"
                    >
                      {Object.values(belts).map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.icon} {b.name} ({b.maxRate}/min)
                        </option>
                      ))}
                    </select>
                    {edgeData.isBottleneck && (
                      <p className="text-[10px] text-sf-red mt-1">
                        Bottleneck: rate exceeds belt capacity
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Footer actions */}
      <div className="flex gap-2 px-4 py-3 border-t border-sf-border bg-sf-bg-card">
        <button
          onClick={handleDuplicate}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded bg-sf-bg-hover border border-sf-border text-sm text-sf-text hover:bg-sf-border transition-colors"
        >
          <Copy size={14} />
          Duplicate
        </button>
        <button
          onClick={handleDelete}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded bg-sf-red/10 border border-sf-red/30 text-sm text-sf-red hover:bg-sf-red/20 transition-colors"
        >
          <Trash2 size={14} />
          Delete
        </button>
      </div>
    </div>
  );
}
