import { getRecipesProducing, getBuildingById, getBeltForRate } from '../data';
import type { OptimizationResult, OptimizationNode, OptimizationConnection, Recipe } from '../types';
import { belts } from '../data/belts';

/**
 * Main optimization function: given a target item and desired rate (items/min),
 * compute the full production chain working backwards through recipes.
 */
export function optimizeProductionChain(
  targetItemId: string,
  targetRate: number,
): OptimizationResult {
  const nodes: OptimizationNode[] = [];
  const connections: OptimizationConnection[] = [];
  const bottlenecks: string[] = [];
  const visited = new Set<string>();

  calculateRequirements(targetItemId, targetRate, visited, nodes, connections, bottlenecks);

  // Calculate total power consumption
  let totalPower = 0;
  for (const node of nodes) {
    const building = getBuildingById(node.buildingId);
    if (building) {
      // Power scales with clock speed: P = P_base * (clockSpeed / 100) ^ 1.6
      const clockFactor = Math.pow(node.clockSpeed / 100, 1.6);
      totalPower += building.powerConsumption * node.count * clockFactor;
    }
  }

  // Calculate efficiency as the ratio of buildings running at 100% clock
  const totalBuildings = nodes.reduce((sum, n) => sum + n.count, 0);
  const efficiency =
    totalBuildings > 0
      ? nodes.reduce((sum, n) => {
          // Weighted efficiency: buildings at 100% are ideal
          return sum + n.count * Math.min(n.clockSpeed / 100, 1);
        }, 0) / totalBuildings
      : 0;

  return {
    targetItemId,
    targetRate,
    nodes,
    connections,
    bottlenecks,
    totalPower: Math.round(totalPower * 100) / 100,
    efficiency: Math.round(efficiency * 1000) / 1000,
  };
}

/**
 * Find the best (non-alternate first) recipe for producing an item.
 * Prefers standard recipes over alternates.
 */
function findBestRecipe(itemId: string): Recipe | null {
  const producing = getRecipesProducing(itemId);
  if (producing.length === 0) return null;

  // Prefer non-alternate recipes
  const standard = producing.find((r) => !r.isAlternate);
  return standard ?? producing[0];
}

/**
 * Recursively calculate requirements for producing a given item at a given rate.
 * Adds nodes and connections to the provided arrays.
 *
 * - Finds the recipe that produces the item
 * - Calculates how many buildings are needed
 * - Determines clock speed (uses full buildings at 100%, last one at remainder)
 * - For each input of the recipe, recurses
 * - Tracks bottlenecks where belt capacity is exceeded
 */
function calculateRequirements(
  itemId: string,
  rate: number,
  visited: Set<string>,
  nodes: OptimizationNode[],
  connections: OptimizationConnection[],
  bottlenecks: string[],
): void {
  // Guard against circular dependencies
  if (visited.has(itemId)) return;
  visited.add(itemId);

  const recipe = findBestRecipe(itemId);
  if (!recipe) {
    // This is a raw resource (ore, fluid) - no recipe needed
    return;
  }

  // Find the output entry for our target item in this recipe
  const outputEntry = recipe.outputs.find((o) => o.itemId === itemId);
  if (!outputEntry) return;

  // Calculate how many buildings we need at 100% clock speed
  const outputPerMinPerBuilding = outputEntry.perMinute;
  const rawBuildingCount = rate / outputPerMinPerBuilding;

  // Use whole buildings at 100%, with the last one underclocked if needed
  const fullBuildings = Math.floor(rawBuildingCount);
  const remainder = rawBuildingCount - fullBuildings;

  let buildingCount: number;
  let clockSpeed: number;

  if (remainder < 0.001) {
    // Exact fit
    buildingCount = Math.max(fullBuildings, 1);
    clockSpeed = 100;
  } else if (fullBuildings === 0) {
    // Less than one building needed - underclock a single building
    buildingCount = 1;
    clockSpeed = Math.round(remainder * 100 * 100) / 100;
  } else {
    // Use full buildings + 1 underclocked
    // Alternative: use all buildings at a uniform clock speed
    buildingCount = fullBuildings + 1;
    clockSpeed = Math.round((rawBuildingCount / buildingCount) * 100 * 100) / 100;
  }

  // Clamp clock speed
  clockSpeed = Math.min(clockSpeed, 250);

  const node: OptimizationNode = {
    buildingId: recipe.buildingId,
    recipeId: recipe.id,
    count: buildingCount,
    clockSpeed,
  };
  nodes.push(node);

  // Process each input of the recipe
  for (const input of recipe.inputs) {
    // Scale input rate by how much we're actually producing
    const requiredInputRate = (rate / outputPerMinPerBuilding) * input.perMinute;

    // Select appropriate belt
    const beltId = selectBelt(requiredInputRate);
    const belt = belts[beltId];

    // Check for bottleneck
    if (belt && requiredInputRate > belt.maxRate) {
      bottlenecks.push(
        `${input.itemId}: requires ${requiredInputRate.toFixed(1)}/min but best belt (${belt.name}) only supports ${belt.maxRate}/min`,
      );
    }

    const connection: OptimizationConnection = {
      fromNode: input.itemId,
      toNode: recipe.id,
      itemId: input.itemId,
      rate: Math.round(requiredInputRate * 1000) / 1000,
      beltId,
    };
    connections.push(connection);

    // Recurse for this input
    calculateRequirements(input.itemId, requiredInputRate, visited, nodes, connections, bottlenecks);
  }
}

/**
 * Select the cheapest belt tier that can handle the given rate.
 * Falls back to the highest tier belt if none can handle it.
 */
function selectBelt(rate: number): string {
  return getBeltForRate(rate).id;
}
