import { memo } from 'react';
import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import type { FactoryNodeData } from '../../types';
import {
  getBuildingById,
  getItemById,
  getRecipeById,
} from '../../data';

const statusColors: Record<FactoryNodeData['status'], string> = {
  running: 'bg-sf-green',
  bottleneck: 'bg-sf-red',
  overflow: 'bg-sf-yellow',
  idle: 'bg-sf-text-muted',
  starved: 'bg-sf-blue',
};

const statusLabels: Record<FactoryNodeData['status'], string> = {
  running: 'Running',
  bottleneck: 'Bottleneck',
  overflow: 'Overflow',
  idle: 'Idle',
  starved: 'Starved',
};

function FactoryNodeComponent({ data, selected, id: _id }: NodeProps<Node<FactoryNodeData>>) {
  const building = data.buildingId ? getBuildingById(data.buildingId) : null;
  const recipe = data.recipeId ? getRecipeById(data.recipeId) : null;

  // Determine handle counts
  const maxInputs = building?.maxInputs ?? (data.type === 'resource' ? 0 : 1);
  const maxOutputs = building?.maxOutputs ?? 1;

  // Collect input/output display info
  const inputEntries = Object.entries(data.requiredInputRates);
  const outputEntries = Object.entries(data.requiredOutputRates);

  const power = building?.powerConsumption ?? 0;
  const adjustedPower = power * (data.clockSpeed / 100);

  return (
    <div
      className={`
        relative rounded-lg border-2 transition-all duration-200
        min-w-[220px] max-w-[260px]
        ${selected
          ? 'border-sf-node-selected shadow-[0_0_16px_rgba(245,166,35,0.4)]'
          : data.isOptimized
            ? 'border-sf-orange-dark optimize-highlight'
            : 'border-sf-node-border'
        }
        bg-sf-node-bg
      `}
    >
      {/* Input handles */}
      {Array.from({ length: maxInputs }).map((_, i) => {
        const topPercent =
          maxInputs === 1 ? 50 : 20 + (60 / (maxInputs - 1)) * i;
        return (
          <Handle
            key={`in-${i}`}
            type="target"
            position={Position.Left}
            id={`in-${i}`}
            style={{
              top: `${topPercent}%`,
              width: 10,
              height: 10,
              background: '#4a9eff',
              border: '2px solid #2a3a52',
            }}
          />
        );
      })}

      {/* Output handles */}
      {Array.from({ length: maxOutputs }).map((_, i) => {
        const topPercent =
          maxOutputs === 1 ? 50 : 20 + (60 / (maxOutputs - 1)) * i;
        return (
          <Handle
            key={`out-${i}`}
            type="source"
            position={Position.Right}
            id={`out-${i}`}
            style={{
              top: `${topPercent}%`,
              width: 10,
              height: 10,
              background: '#f5a623',
              border: '2px solid #2a3a52',
            }}
          />
        );
      })}

      {/* Header: icon + name */}
      <div className="flex items-center gap-2 px-3 pt-3 pb-1">
        <span
          className={`text-2xl ${data.status === 'running' ? 'spin-slow inline-block' : ''}`}
        >
          {data.icon}
        </span>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-sf-text truncate">
            {data.label}
          </div>
          {recipe && (
            <div className="text-xs text-sf-text-dim truncate">
              {recipe.name}
            </div>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="mx-3 my-1 border-t border-sf-border" />

      {/* Rates */}
      <div className="px-3 pb-1 space-y-0.5">
        {inputEntries.map(([itemId, rate]) => {
          const item = getItemById(itemId);
          const actualRate = data.inputRates[itemId] ?? 0;
          const isUnderSupplied = actualRate < rate * 0.95 && actualRate > 0;
          return (
            <div key={itemId} className="flex items-center gap-1 text-xs">
              <span className="text-sf-text-muted">IN:</span>
              <span>{item?.icon ?? '?'}</span>
              <span
                className={
                  isUnderSupplied ? 'text-sf-yellow' : 'text-sf-text-dim'
                }
              >
                {Math.round(rate * 100) / 100}/min
              </span>
            </div>
          );
        })}
        {outputEntries.map(([itemId, rate]) => {
          const item = getItemById(itemId);
          return (
            <div key={itemId} className="flex items-center gap-1 text-xs">
              <span className="text-sf-text-muted">OUT:</span>
              <span>{item?.icon ?? '?'}</span>
              <span className="text-sf-green">
                {Math.round(rate * (data.clockSpeed / 100) * 100) / 100}/min
              </span>
            </div>
          );
        })}
      </div>

      {/* Footer: power + clock + status */}
      <div className="px-3 pb-2 pt-1 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          {power !== 0 && (
            <span className="text-sf-text-muted">
              {power < 0 ? '+' : ''}
              {Math.abs(Math.round(adjustedPower * 10) / 10)} MW
            </span>
          )}
          {data.clockSpeed !== 100 && (
            <span className="text-sf-orange">
              {data.clockSpeed}%
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className={`w-2 h-2 rounded-full ${statusColors[data.status]}`}
          />
          <span className="text-sf-text-muted">
            {statusLabels[data.status]}
          </span>
        </div>
      </div>
    </div>
  );
}

export const FactoryNode = memo(FactoryNodeComponent);
