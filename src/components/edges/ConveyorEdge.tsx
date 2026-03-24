import { memo } from 'react';
import {
  getBezierPath,
  EdgeLabelRenderer,
  type EdgeProps,
  type Edge,
} from '@xyflow/react';
import type { ConnectionData } from '../../types';
import { getBeltById, getItemById } from '../../data';

function getEdgeColor(utilization: number): string {
  if (utilization <= 0) return '#5a6a7a'; // gray
  if (utilization < 0.8) return '#4caf50'; // green
  if (utilization < 0.95) return '#ffeb3b'; // yellow
  return '#ef5350'; // red
}

function getStrokeWidth(utilization: number): number {
  if (utilization <= 0) return 1.5;
  return 1.5 + utilization * 2;
}

function ConveyorEdgeComponent(props: EdgeProps<Edge<ConnectionData>>) {
  const {
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    data,
    selected,
  } = props;

  const utilization = data?.utilization ?? 0;
  const isBottleneck = data?.isBottleneck ?? false;
  const isOptimized = data?.isOptimized ?? false;
  const actualRate = data?.actualRate ?? 0;
  const beltId = data?.beltId ?? 'belt-mk1';

  const belt = getBeltById(beltId);
  const item = data?.itemId ? getItemById(data.itemId) : null;

  const color = getEdgeColor(utilization);
  const strokeWidth = getStrokeWidth(utilization);

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  return (
    <>
      {/* Glow layer for bottleneck or optimized */}
      {(isBottleneck || isOptimized) && (
        <path
          d={edgePath}
          fill="none"
          stroke={isBottleneck ? '#ef5350' : '#f5a623'}
          strokeWidth={strokeWidth + 6}
          strokeOpacity={0.25}
          className={isBottleneck ? 'optimize-highlight' : ''}
        />
      )}

      {/* Main edge path */}
      <path
        id={id}
        d={edgePath}
        fill="none"
        stroke={isOptimized ? '#f5a623' : color}
        strokeWidth={strokeWidth}
        className={actualRate > 0 ? 'animated-edge' : ''}
        style={{
          filter: selected ? `drop-shadow(0 0 4px ${color})` : undefined,
        }}
      />

      {/* Arrow marker at end */}
      <path
        d={edgePath}
        fill="none"
        stroke={isOptimized ? '#f5a623' : color}
        strokeWidth={strokeWidth}
        markerEnd={`url(#arrow-${id})`}
        style={{ strokeDasharray: 'none' }}
        opacity={0}
      />

      {/* Inline arrow SVG */}
      <defs>
        <marker
          id={`arrow-${id}`}
          viewBox="0 0 10 10"
          refX="10"
          refY="5"
          markerWidth={6}
          markerHeight={6}
          orient="auto-start-reverse"
        >
          <path
            d="M 0 0 L 10 5 L 0 10 z"
            fill={isOptimized ? '#f5a623' : color}
          />
        </marker>
      </defs>

      {/* Visible path with arrow */}
      <path
        d={edgePath}
        fill="none"
        stroke="transparent"
        strokeWidth={Math.max(strokeWidth, 12)}
        style={{ cursor: 'pointer' }}
      />
      <path
        d={edgePath}
        fill="none"
        stroke={isOptimized ? '#f5a623' : color}
        strokeWidth={strokeWidth}
        markerEnd={`url(#arrow-${id})`}
        className={actualRate > 0 ? 'animated-edge' : ''}
      />

      {/* Label */}
      <EdgeLabelRenderer>
        <div
          className="nodrag nopan pointer-events-auto"
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
          }}
        >
          <div
            className={`
              flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium
              border backdrop-blur-sm
              ${selected
                ? 'bg-sf-bg-card/95 border-sf-orange text-sf-text'
                : 'bg-sf-bg-card/80 border-sf-border text-sf-text-dim'
              }
            `}
          >
            {item && <span>{item.icon}</span>}
            <span>{Math.round(actualRate * 10) / 10}/m</span>
            {belt && (
              <span className="text-sf-text-muted text-[9px]">
                {belt.name.replace('Conveyor Belt ', '')}
              </span>
            )}
          </div>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

export const ConveyorEdge = memo(ConveyorEdgeComponent);
