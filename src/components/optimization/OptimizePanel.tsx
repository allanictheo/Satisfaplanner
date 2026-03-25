import { useState, useMemo, useRef, useEffect } from 'react';
import {
  Zap,
  ChevronDown,
  X,
  AlertTriangle,
  CheckCircle,
  Package,
  Building2,
  Cpu,
  Search,
  Play,
  Trash2,
  ArrowDownToLine,
  Gauge,
  BatteryCharging,
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { items } from '../../data/items';
import { getBuildingById, getItemById } from '../../data';
import type { OptimizationResult } from '../../types';

function EfficiencyBadge({ efficiency }: { efficiency: number }) {
  const pct = Math.round(efficiency * 100);
  let colorClass = 'text-sf-green';
  let bgClass = 'bg-sf-green/10 border-sf-green/30';
  let label = 'Excellent';

  if (pct < 50) {
    colorClass = 'text-sf-red';
    bgClass = 'bg-sf-red/10 border-sf-red/30';
    label = 'Poor';
  } else if (pct < 80) {
    colorClass = 'text-sf-yellow';
    bgClass = 'bg-sf-yellow/10 border-sf-yellow/30';
    label = 'Moderate';
  }

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold border ${bgClass} ${colorClass}`}
    >
      <Gauge className="w-3 h-3" />
      {pct}% {label}
    </span>
  );
}

function SectionHeader({
  icon: Icon,
  title,
  count,
}: {
  icon: React.ElementType;
  title: string;
  count?: number;
}) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <Icon className="w-4 h-4 text-sf-orange" />
      <h4 className="text-xs font-semibold text-sf-text uppercase tracking-wider">
        {title}
      </h4>
      {count !== undefined && (
        <span className="ml-auto text-xs text-sf-text-muted bg-sf-bg-hover rounded-full px-2 py-0.5">
          {count}
        </span>
      )}
    </div>
  );
}

function ResultsSummary({ results }: { results: OptimizationResult }) {
  const targetItem = getItemById(results.targetItemId);

  return (
    <div className="bg-sf-bg/60 border border-sf-border rounded-lg p-3 space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">{targetItem?.icon}</span>
          <div>
            <p className="text-sm font-semibold text-sf-text">
              {targetItem?.name ?? results.targetItemId}
            </p>
            <p className="text-xs text-sf-text-dim">
              {results.targetRate} items/min
            </p>
          </div>
        </div>
        <EfficiencyBadge efficiency={results.efficiency} />
      </div>
    </div>
  );
}

function BuildingsList({ results }: { results: OptimizationResult }) {
  return (
    <div>
      <SectionHeader
        icon={Building2}
        title="Required Buildings"
        count={results.nodes.length}
      />
      <div className="space-y-1.5">
        {results.nodes.map((node, i) => {
          const building = getBuildingById(node.buildingId);
          return (
            <div
              key={`${node.buildingId}-${node.recipeId}-${i}`}
              className="flex items-center gap-2 bg-sf-bg/40 border border-sf-border-light rounded-md px-2.5 py-1.5 text-sm"
            >
              <span className="text-base shrink-0">
                {building?.icon ?? '?'}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sf-text truncate text-xs font-medium">
                  {building?.name ?? node.buildingId}
                </p>
              </div>
              <span className="text-sf-orange font-bold text-xs shrink-0">
                x{node.count}
              </span>
              {node.clockSpeed !== 100 && (
                <span className="text-sf-cyan text-[10px] font-mono shrink-0">
                  {node.clockSpeed}%
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RawResources({ results }: { results: OptimizationResult }) {
  // Collect raw inputs: items consumed but not produced by any node
  // We derive this from connections whose fromNode is not a building in the result set
  const producedItems = new Set<string>();
  for (const _node of results.nodes) {
    // Each node produces items -- we approximate from connections
  }
  for (const conn of results.connections) {
    if (results.nodes.some((n) => `${n.buildingId}-${n.recipeId}` === conn.fromNode)) {
      producedItems.add(conn.itemId);
    }
  }

  // Aggregate input rates by itemId from connections that feed into the chain
  const rawInputs = new Map<string, number>();
  for (const conn of results.connections) {
    // Connections whose source is not an internal node are raw inputs
    const isInternal = results.nodes.some(
      (n) => `${n.buildingId}-${n.recipeId}` === conn.fromNode
    );
    if (!isInternal) {
      rawInputs.set(
        conn.itemId,
        (rawInputs.get(conn.itemId) ?? 0) + conn.rate
      );
    }
  }

  // If no raw inputs detected from connections, show all connection items as a fallback
  const resourceEntries =
    rawInputs.size > 0
      ? Array.from(rawInputs.entries())
      : Array.from(
          results.connections.reduce((acc, c) => {
            acc.set(c.itemId, (acc.get(c.itemId) ?? 0) + c.rate);
            return acc;
          }, new Map<string, number>())
        );

  if (resourceEntries.length === 0) return null;

  return (
    <div>
      <SectionHeader
        icon={Package}
        title="Resources"
        count={resourceEntries.length}
      />
      <div className="space-y-1">
        {resourceEntries.map(([itemId, rate]) => {
          const item = getItemById(itemId);
          return (
            <div
              key={itemId}
              className="flex items-center gap-2 text-xs px-2.5 py-1.5 bg-sf-bg/40 border border-sf-border-light rounded-md"
            >
              <span className="text-sm">{item?.icon ?? '?'}</span>
              <span className="text-sf-text flex-1 truncate">
                {item?.name ?? itemId}
              </span>
              <span className="text-sf-text-dim font-mono">
                {Math.round(rate * 100) / 100}/min
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Bottlenecks({ bottlenecks }: { bottlenecks: string[] }) {
  if (bottlenecks.length === 0) return null;

  return (
    <div>
      <SectionHeader icon={AlertTriangle} title="Bottlenecks" count={bottlenecks.length} />
      <div className="space-y-1">
        {bottlenecks.map((msg, i) => (
          <div
            key={i}
            className="flex items-start gap-2 text-xs px-2.5 py-1.5 bg-sf-red/10 border border-sf-red/30 rounded-md text-sf-red"
          >
            <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
            <span>{msg}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PowerConsumption({ totalPower }: { totalPower: number }) {
  return (
    <div className="flex items-center gap-2 bg-sf-bg/40 border border-sf-border-light rounded-md px-2.5 py-2 text-sm">
      <BatteryCharging className="w-4 h-4 text-sf-yellow" />
      <span className="text-sf-text-dim text-xs">Total Power</span>
      <span className="ml-auto text-sf-yellow font-bold text-sm">
        {totalPower >= 1000
          ? `${(totalPower / 1000).toFixed(1)} GW`
          : `${Math.round(totalPower)} MW`}
      </span>
    </div>
  );
}

export function OptimizePanel() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const optimization = useStore((s) => s.optimization);
  const setOptimizationTarget = useStore((s) => s.setOptimizationTarget);
  const runOptimization = useStore((s) => s.runOptimization);
  const clearOptimization = useStore((s) => s.clearOptimization);
  const applyOptimizationToCanvas = useStore((s) => s.applyOptimizationToCanvas);
  const nodes = useStore((s) => s.nodes);

  const { targetItemId, targetRate, results, isOptimizing } = optimization;

  const hasCanvasNodes = nodes.length > 0;

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search when dropdown opens
  useEffect(() => {
    if (isDropdownOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isDropdownOpen]);

  const allItems = useMemo(() => Object.values(items), []);

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return allItems;
    const q = searchQuery.toLowerCase();
    return allItems.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [allItems, searchQuery]);

  const selectedItem = targetItemId ? getItemById(targetItemId) : null;

  const canRun = targetItemId !== null && targetRate > 0 && !isOptimizing;

  const handleSelectItem = (itemId: string) => {
    setOptimizationTarget(itemId, targetRate);
    setIsDropdownOpen(false);
    setSearchQuery('');
  };

  const handleRateChange = (value: string) => {
    const rate = parseFloat(value);
    if (!isNaN(rate) && rate >= 0) {
      setOptimizationTarget(targetItemId, rate);
    }
  };

  const handleRun = () => {
    runOptimization();
  };

  const handleClear = () => {
    clearOptimization();
  };

  const handleClose = () => {
    setIsExpanded(false);
  };

  // ─── Collapsed State ────────────────────────────────────────────────
  if (!isExpanded) {
    return (
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={() => setIsExpanded(true)}
          className={`
            group relative flex items-center gap-2 px-5 py-2.5
            bg-gradient-to-r from-sf-orange to-sf-orange-dark
            text-white font-bold text-sm rounded-lg
            shadow-lg shadow-sf-orange/25
            hover:shadow-xl hover:shadow-sf-orange/40
            hover:scale-105
            transition-all duration-300 ease-out
            ${hasCanvasNodes ? 'animate-pulse-subtle' : ''}
          `}
        >
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-sf-orange to-sf-orange-dark opacity-50 blur-md -z-10" />
          <Zap className="w-4 h-4 group-hover:rotate-12 transition-transform" />
          Optimize
        </button>
      </div>
    );
  }

  // ─── Expanded State ─────────────────────────────────────────────────
  return (
    <div className="absolute top-4 right-4 z-50 w-[380px]">
      <div
        className="
          bg-sf-bg-card/80 backdrop-blur-xl
          border border-sf-border rounded-xl
          shadow-2xl shadow-black/40
          overflow-hidden
          animate-panel-in
        "
      >
        {/* ─── Header ────────────────────────────────────────────── */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-sf-border bg-sf-bg/40">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-sf-orange" />
            <h3 className="text-sm font-bold text-sf-text tracking-wide">
              Production Optimizer
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="p-1 rounded hover:bg-sf-bg-hover text-sf-text-muted hover:text-sf-text transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ─── Body ──────────────────────────────────────────────── */}
        <div className="p-4 space-y-4 max-h-[calc(100vh-120px)] overflow-y-auto scrollbar-thin scrollbar-thumb-sf-border scrollbar-track-transparent">
          {/* ── Target Selection ───────────────────────────────── */}
          <div className="space-y-3">
            <SectionHeader icon={Cpu} title="Target Item" />

            {/* Item dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full flex items-center gap-2 bg-sf-bg border border-sf-border rounded-lg px-3 py-2 text-sm text-left hover:border-sf-orange/50 transition-colors"
              >
                {selectedItem ? (
                  <>
                    <span className="text-base">{selectedItem.icon}</span>
                    <span className="text-sf-text flex-1 truncate">
                      {selectedItem.name}
                    </span>
                  </>
                ) : (
                  <span className="text-sf-text-muted flex-1">
                    Select target item...
                  </span>
                )}
                <ChevronDown
                  className={`w-4 h-4 text-sf-text-muted transition-transform ${
                    isDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-sf-bg-card border border-sf-border rounded-lg shadow-xl z-10 overflow-hidden">
                  {/* Search within dropdown */}
                  <div className="p-2 border-b border-sf-border">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-sf-text-muted" />
                      <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Search items..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-sf-bg border border-sf-border rounded-md pl-8 pr-3 py-1.5 text-xs text-sf-text placeholder-sf-text-muted focus:outline-none focus:border-sf-orange transition-colors"
                      />
                    </div>
                  </div>
                  {/* Items list */}
                  <div className="max-h-56 overflow-y-auto scrollbar-thin scrollbar-thumb-sf-border scrollbar-track-transparent">
                    {filteredItems.length === 0 ? (
                      <div className="px-3 py-4 text-xs text-sf-text-muted text-center">
                        No items found
                      </div>
                    ) : (
                      filteredItems.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => handleSelectItem(item.id)}
                          className={`w-full flex items-center gap-2 px-3 py-1.5 text-xs text-left hover:bg-sf-bg-hover transition-colors ${
                            item.id === targetItemId
                              ? 'bg-sf-orange/10 text-sf-orange'
                              : 'text-sf-text'
                          }`}
                        >
                          <span className="text-sm">{item.icon}</span>
                          <span className="flex-1 truncate">{item.name}</span>
                          <span className="text-[10px] text-sf-text-muted capitalize">
                            {item.category}
                          </span>
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Rate input */}
            <div>
              <label className="block text-xs text-sf-text-dim mb-1">
                Target Rate (items/min)
              </label>
              <input
                type="number"
                min="0"
                step="1"
                value={targetRate || ''}
                onChange={(e) => handleRateChange(e.target.value)}
                placeholder="e.g. 60"
                className="w-full bg-sf-bg border border-sf-border rounded-lg px-3 py-2 text-sm text-sf-text placeholder-sf-text-muted focus:outline-none focus:border-sf-orange transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>

            {/* Run button */}
            <button
              onClick={handleRun}
              disabled={!canRun}
              className={`
                w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold transition-all duration-200
                ${
                  canRun
                    ? 'bg-gradient-to-r from-sf-orange to-sf-orange-dark text-white hover:shadow-lg hover:shadow-sf-orange/30 hover:scale-[1.02] active:scale-[0.98]'
                    : 'bg-sf-bg-hover text-sf-text-muted cursor-not-allowed'
                }
              `}
            >
              {isOptimizing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Calculating...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Run Optimization
                </>
              )}
            </button>
          </div>

          {/* ── Results ────────────────────────────────────────── */}
          {results && (
            <div className="space-y-4 pt-2 border-t border-sf-border">
              {/* Summary */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-sf-green" />
                  <h4 className="text-xs font-semibold text-sf-text uppercase tracking-wider">
                    Results
                  </h4>
                </div>
                <ResultsSummary results={results} />
              </div>

              {/* Buildings */}
              <BuildingsList results={results} />

              {/* Raw Resources */}
              <RawResources results={results} />

              {/* Bottlenecks */}
              <Bottlenecks bottlenecks={results.bottlenecks} />

              {/* Power */}
              <PowerConsumption totalPower={results.totalPower} />

              {/* Action buttons */}
              <div className="flex gap-2 pt-1">
                <button
                  onClick={handleClear}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-sf-bg border border-sf-border text-sf-text-dim hover:text-sf-red hover:border-sf-red/40 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Clear
                </button>
                <button
                  onClick={() => {
                    applyOptimizationToCanvas();
                    setIsExpanded(false);
                  }}
                  className="flex-[2] flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold bg-gradient-to-r from-sf-green/80 to-sf-green text-white hover:shadow-lg hover:shadow-sf-green/20 transition-all"
                >
                  <ArrowDownToLine className="w-3.5 h-3.5" />
                  Apply to Canvas
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
