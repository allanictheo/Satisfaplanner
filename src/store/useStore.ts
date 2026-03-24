import { create } from 'zustand';
import {
  type Node,
  type Edge,
  type Connection,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  type NodeChange,
  type EdgeChange,
} from '@xyflow/react';
import type { FactoryNodeData, ConnectionData } from '../types';
import { getBeltById } from '../data';
import {
  calculateNodeRates,
  determineNodeStatus,
  calculateEdgeUtilization,
} from '../utils/simulation';
import { optimizeProductionChain } from '../utils/optimization';

interface SidebarState {
  searchQuery: string;
  selectedCategory: string | null;
  expandedGroups: Set<string>;
  selectedTier: number | null;
}

interface CanvasState {
  selectedNodeId: string | null;
  selectedEdgeId: string | null;
}

interface OptimizationState {
  isOptimizing: boolean;
  targetItemId: string | null;
  targetRate: number;
  results: any | null;
  optimizedNodeIds: Set<string>;
  optimizedEdgeIds: Set<string>;
}

interface AppStore {
  // React Flow state
  nodes: Node<FactoryNodeData>[];
  edges: Edge<ConnectionData>[];
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;

  // Node operations
  addNode: (node: Node<FactoryNodeData>) => void;
  updateNodeData: (nodeId: string, data: Partial<FactoryNodeData>) => void;
  removeNode: (nodeId: string) => void;
  duplicateNode: (nodeId: string) => void;

  // Edge operations
  updateEdgeData: (edgeId: string, data: Partial<ConnectionData>) => void;
  removeEdge: (edgeId: string) => void;

  // Sidebar state
  sidebar: SidebarState;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string | null) => void;
  toggleGroup: (group: string) => void;
  setSelectedTier: (tier: number | null) => void;

  // Canvas state
  canvas: CanvasState;
  setSelectedNode: (nodeId: string | null) => void;
  setSelectedEdge: (edgeId: string | null) => void;

  // Optimization
  optimization: OptimizationState;
  setOptimizationTarget: (itemId: string | null, rate?: number) => void;
  runOptimization: () => void;
  clearOptimization: () => void;

  // Simulation
  simulateFlows: () => void;

  // Drag state
  draggedItem: { type: string; id: string } | null;
  setDraggedItem: (item: { type: string; id: string } | null) => void;
}

const useStore = create<AppStore>((set, get) => ({
  // ─── React Flow State ──────────────────────────────────────────────

  nodes: [],
  edges: [],

  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes) as Node<FactoryNodeData>[],
    });
  },

  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges) as Edge<ConnectionData>[],
    });
  },

  onConnect: (connection: Connection) => {
    const defaultData: ConnectionData = {
      beltId: 'belt-mk1',
      actualRate: 0,
      maxRate: 60,
      utilization: 0,
      isBottleneck: false,
    };

    const newEdge: Edge<ConnectionData> = {
      ...connection,
      id: `edge-${connection.source}-${connection.sourceHandle ?? 'out'}-${connection.target}-${connection.targetHandle ?? 'in'}`,
      data: defaultData,
    };

    set({
      edges: addEdge(newEdge, get().edges) as Edge<ConnectionData>[],
    });
  },

  // ─── Node Operations ──────────────────────────────────────────────

  addNode: (node: Node<FactoryNodeData>) => {
    set({ nodes: [...get().nodes, node] });
  },

  updateNodeData: (nodeId: string, data: Partial<FactoryNodeData>) => {
    set({
      nodes: get().nodes.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, ...data } }
          : node,
      ),
    });
  },

  removeNode: (nodeId: string) => {
    set({
      nodes: get().nodes.filter((n) => n.id !== nodeId),
      edges: get().edges.filter(
        (e) => e.source !== nodeId && e.target !== nodeId,
      ),
    });
  },

  duplicateNode: (nodeId: string) => {
    const node = get().nodes.find((n) => n.id === nodeId);
    if (!node) return;

    const newNode: Node<FactoryNodeData> = {
      ...node,
      id: `${node.id}-copy-${Date.now()}`,
      position: {
        x: (node.position?.x ?? 0) + 50,
        y: (node.position?.y ?? 0) + 50,
      },
      data: { ...node.data },
      selected: false,
    };

    set({ nodes: [...get().nodes, newNode] });
  },

  // ─── Edge Operations ──────────────────────────────────────────────

  updateEdgeData: (edgeId: string, data: Partial<ConnectionData>) => {
    set({
      edges: get().edges.map((edge) =>
        edge.id === edgeId
          ? { ...edge, data: { ...edge.data!, ...data } }
          : edge,
      ),
    });
  },

  removeEdge: (edgeId: string) => {
    set({ edges: get().edges.filter((e) => e.id !== edgeId) });
  },

  // ─── Sidebar State ────────────────────────────────────────────────

  sidebar: {
    searchQuery: '',
    selectedCategory: null,
    expandedGroups: new Set<string>(),
    selectedTier: null,
  },

  setSearchQuery: (query: string) => {
    set({
      sidebar: { ...get().sidebar, searchQuery: query },
    });
  },

  setSelectedCategory: (category: string | null) => {
    set({
      sidebar: { ...get().sidebar, selectedCategory: category },
    });
  },

  toggleGroup: (group: string) => {
    const current = get().sidebar.expandedGroups;
    const next = new Set(current);
    if (next.has(group)) {
      next.delete(group);
    } else {
      next.add(group);
    }
    set({
      sidebar: { ...get().sidebar, expandedGroups: next },
    });
  },

  setSelectedTier: (tier: number | null) => {
    set({
      sidebar: { ...get().sidebar, selectedTier: tier },
    });
  },

  // ─── Canvas State ─────────────────────────────────────────────────

  canvas: {
    selectedNodeId: null,
    selectedEdgeId: null,
  },

  setSelectedNode: (nodeId: string | null) => {
    set({
      canvas: { ...get().canvas, selectedNodeId: nodeId, selectedEdgeId: null },
    });
  },

  setSelectedEdge: (edgeId: string | null) => {
    set({
      canvas: { ...get().canvas, selectedEdgeId: edgeId, selectedNodeId: null },
    });
  },

  // ─── Optimization ─────────────────────────────────────────────────

  optimization: {
    isOptimizing: false,
    targetItemId: null,
    targetRate: 0,
    results: null,
    optimizedNodeIds: new Set<string>(),
    optimizedEdgeIds: new Set<string>(),
  },

  setOptimizationTarget: (itemId: string | null, rate: number = 0) => {
    set({
      optimization: {
        ...get().optimization,
        targetItemId: itemId,
        targetRate: rate,
      },
    });
  },

  runOptimization: () => {
    const { optimization } = get();
    if (!optimization.targetItemId || optimization.targetRate <= 0) return;

    set({
      optimization: { ...optimization, isOptimizing: true },
    });

    const results = optimizeProductionChain(
      optimization.targetItemId,
      optimization.targetRate,
    );

    // Identify which existing nodes and edges are part of the optimized chain
    const optimizedNodeIds = new Set<string>();
    const optimizedEdgeIds = new Set<string>();

    // Match optimization nodes to existing canvas nodes by recipeId and buildingId
    const { nodes, edges } = get();
    for (const optNode of results.nodes) {
      for (const node of nodes) {
        if (
          node.data.recipeId === optNode.recipeId &&
          node.data.buildingId === optNode.buildingId
        ) {
          optimizedNodeIds.add(node.id);
        }
      }
    }

    // Mark edges connecting optimized nodes
    for (const edge of edges) {
      if (optimizedNodeIds.has(edge.source) && optimizedNodeIds.has(edge.target)) {
        optimizedEdgeIds.add(edge.id);
      }
    }

    set({
      optimization: {
        ...get().optimization,
        isOptimizing: false,
        results,
        optimizedNodeIds,
        optimizedEdgeIds,
      },
      // Mark nodes as optimized
      nodes: get().nodes.map((node) => ({
        ...node,
        data: {
          ...node.data,
          isOptimized: optimizedNodeIds.has(node.id),
        },
      })),
      // Mark edges as optimized
      edges: get().edges.map((edge) => ({
        ...edge,
        data: {
          ...edge.data!,
          isOptimized: optimizedEdgeIds.has(edge.id),
        },
      })),
    });
  },

  clearOptimization: () => {
    set({
      optimization: {
        isOptimizing: false,
        targetItemId: null,
        targetRate: 0,
        results: null,
        optimizedNodeIds: new Set<string>(),
        optimizedEdgeIds: new Set<string>(),
      },
      // Clear optimized flags
      nodes: get().nodes.map((node) => ({
        ...node,
        data: { ...node.data, isOptimized: false },
      })),
      edges: get().edges.map((edge) => ({
        ...edge,
        data: { ...edge.data!, isOptimized: false },
      })),
    });
  },

  // ─── Simulation ───────────────────────────────────────────────────

  simulateFlows: () => {
    const { nodes, edges } = get();

    // First pass: calculate required and expected rates for every node
    const nodeRatesMap = new Map<
      string,
      { requiredInputs: Record<string, number>; expectedOutputs: Record<string, number> }
    >();

    for (const node of nodes) {
      nodeRatesMap.set(node.id, calculateNodeRates(node));
    }

    // Second pass: update edge actual rates based on source node outputs
    const updatedEdges = edges.map((edge) => {
      const sourceRates = nodeRatesMap.get(edge.source);
      const edgeData = edge.data!;
      const itemId = edgeData.itemId;

      let actualRate = 0;
      if (sourceRates && itemId && sourceRates.expectedOutputs[itemId] !== undefined) {
        // Distribute output across all edges from this source for this item
        const sameItemEdges = edges.filter(
          (e) => e.source === edge.source && e.data?.itemId === itemId,
        );
        const share = sameItemEdges.length > 0 ? 1 / sameItemEdges.length : 1;
        actualRate = sourceRates.expectedOutputs[itemId] * share;
      }

      // Get belt max rate
      const belt = getBeltById(edgeData.beltId);
      const maxRate = belt ? belt.maxRate : edgeData.maxRate;

      // Clamp actual rate to belt capacity
      const clampedRate = Math.min(actualRate, maxRate);
      const utilization = calculateEdgeUtilization(clampedRate, maxRate);

      return {
        ...edge,
        data: {
          ...edgeData,
          actualRate: Math.round(clampedRate * 1000) / 1000,
          maxRate,
          utilization: Math.round(utilization * 1000) / 1000,
          isBottleneck: actualRate > maxRate,
        },
      };
    });

    // Third pass: update node input/output rates and determine status
    const updatedNodes = nodes.map((node) => {
      const rates = nodeRatesMap.get(node.id);
      if (!rates) return node;

      const incomingEdges = updatedEdges.filter((e) => e.target === node.id);
      const outgoingEdges = updatedEdges.filter((e) => e.source === node.id);

      // Compute actual input rates from incoming edges
      const inputRates: Record<string, number> = {};
      for (const edge of incomingEdges) {
        const itemId = edge.data?.itemId;
        if (itemId) {
          inputRates[itemId] = (inputRates[itemId] ?? 0) + (edge.data?.actualRate ?? 0);
        }
      }

      // Compute actual output rates from outgoing edges
      const outputRates: Record<string, number> = {};
      for (const edge of outgoingEdges) {
        const itemId = edge.data?.itemId;
        if (itemId) {
          outputRates[itemId] = (outputRates[itemId] ?? 0) + (edge.data?.actualRate ?? 0);
        }
      }

      const status = determineNodeStatus(
        { ...node, data: { ...node.data, inputRates, outputRates } },
        incomingEdges,
        outgoingEdges,
      );

      return {
        ...node,
        data: {
          ...node.data,
          inputRates,
          outputRates,
          requiredInputRates: rates.requiredInputs,
          requiredOutputRates: rates.expectedOutputs,
          status,
        },
      };
    });

    set({
      nodes: updatedNodes,
      edges: updatedEdges,
    });
  },

  // ─── Drag State ───────────────────────────────────────────────────

  draggedItem: null,

  setDraggedItem: (item: { type: string; id: string } | null) => {
    set({ draggedItem: item });
  },
}));

export default useStore;
export { useStore };
