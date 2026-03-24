import type { Node, Edge } from '@xyflow/react';
import type { FactoryNodeData, ConnectionData } from '../types';
import { getRecipeById } from '../data';

/**
 * Calculate actual production rates for a node based on its recipe and clock speed.
 * Returns the required input rates and expected output rates scaled by clock speed.
 */
export function calculateNodeRates(node: Node<FactoryNodeData>): {
  requiredInputs: Record<string, number>;
  expectedOutputs: Record<string, number>;
} {
  const requiredInputs: Record<string, number> = {};
  const expectedOutputs: Record<string, number> = {};

  const data = node.data;
  if (!data || !data.recipeId) {
    return { requiredInputs, expectedOutputs };
  }

  const recipe = getRecipeById(data.recipeId);
  if (!recipe) {
    return { requiredInputs, expectedOutputs };
  }

  const clockMultiplier = (data.clockSpeed ?? 100) / 100;

  for (const input of recipe.inputs) {
    requiredInputs[input.itemId] = input.perMinute * clockMultiplier;
  }

  for (const output of recipe.outputs) {
    expectedOutputs[output.itemId] = output.perMinute * clockMultiplier;
  }

  return { requiredInputs, expectedOutputs };
}

/**
 * Determine node status based on actual vs required rates from connected edges.
 *
 * - 'idle': no recipe assigned
 * - 'running': all inputs satisfied and outputs can flow
 * - 'starved': at least one input is insufficient
 * - 'bottleneck': at least one output edge is at capacity
 * - 'overflow': producing more than output belts can carry
 */
export function determineNodeStatus(
  node: Node<FactoryNodeData>,
  incomingEdges: Edge<ConnectionData>[],
  outgoingEdges: Edge<ConnectionData>[],
): FactoryNodeData['status'] {
  const data = node.data;
  if (!data || !data.recipeId) {
    return 'idle';
  }

  const { requiredInputs, expectedOutputs } = calculateNodeRates(node);

  // Check if node is a resource/extractor node (no inputs required)
  const hasRequiredInputs = Object.keys(requiredInputs).length > 0;

  if (hasRequiredInputs) {
    // Sum up actual incoming rates per item
    const actualInputs: Record<string, number> = {};
    for (const edge of incomingEdges) {
      const edgeData = edge.data;
      if (edgeData && edgeData.itemId) {
        actualInputs[edgeData.itemId] =
          (actualInputs[edgeData.itemId] ?? 0) + edgeData.actualRate;
      }
    }

    // Check if any required input is not sufficiently supplied
    for (const [itemId, required] of Object.entries(requiredInputs)) {
      const actual = actualInputs[itemId] ?? 0;
      if (actual < required * 0.99) {
        // Allow 1% tolerance for floating point
        return 'starved';
      }
    }
  }

  // Check output capacity
  if (Object.keys(expectedOutputs).length > 0 && outgoingEdges.length > 0) {
    // Sum up max capacity of outgoing edges per item
    const outgoingCapacity: Record<string, number> = {};
    for (const edge of outgoingEdges) {
      const edgeData = edge.data;
      if (edgeData && edgeData.itemId) {
        outgoingCapacity[edgeData.itemId] =
          (outgoingCapacity[edgeData.itemId] ?? 0) + edgeData.maxRate;
      }
    }

    for (const [itemId, expected] of Object.entries(expectedOutputs)) {
      const capacity = outgoingCapacity[itemId];
      if (capacity !== undefined) {
        if (expected > capacity * 1.01) {
          return 'overflow';
        }
        if (expected > capacity * 0.95) {
          return 'bottleneck';
        }
      }
    }
  }

  return 'running';
}

/**
 * Calculate edge utilization as a ratio from 0 to 1.
 */
export function calculateEdgeUtilization(
  actualRate: number,
  maxRate: number,
): number {
  if (maxRate <= 0) return 0;
  return Math.min(actualRate / maxRate, 1);
}

/**
 * Check if adding an edge from source to target would create a cycle in the graph.
 * Uses depth-first search from target to see if source is reachable.
 */
export function wouldCreateCycle(
  edges: Edge[],
  source: string,
  target: string,
): boolean {
  // If source === target, it's a self-loop
  if (source === target) return true;

  // Build adjacency list from existing edges
  const adjacency = new Map<string, string[]>();
  for (const edge of edges) {
    const neighbors = adjacency.get(edge.source);
    if (neighbors) {
      neighbors.push(edge.target);
    } else {
      adjacency.set(edge.source, [edge.target]);
    }
  }

  // DFS from target to see if we can reach source
  // (because we're about to add source -> target, a cycle exists if target -> ... -> source)
  const visited = new Set<string>();
  const stack = [target];

  while (stack.length > 0) {
    const current = stack.pop()!;
    if (current === source) return true;
    if (visited.has(current)) continue;
    visited.add(current);

    const neighbors = adjacency.get(current);
    if (neighbors) {
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          stack.push(neighbor);
        }
      }
    }
  }

  return false;
}
