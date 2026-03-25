import { useCallback, useRef } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
  useReactFlow,
  type Node,
} from '@xyflow/react';
import { useStore } from '../../store/useStore';
import { FactoryNode } from '../nodes/FactoryNode';
import { ConveyorEdge } from '../edges/ConveyorEdge';
import {
  getBuildingById,
  getItemById,
  getRecipesForBuilding,
} from '../../data';
import type { FactoryNodeData } from '../../types';

const nodeTypes = { factory: FactoryNode };
const edgeTypes = { conveyor: ConveyorEdge };

function createNodeFromDragData(
  item: { type: string; id: string },
  position: { x: number; y: number },
): Node<FactoryNodeData> | null {
  const id = `node-${Date.now()}`;

  if (item.type === 'building') {
    const building = getBuildingById(item.id);
    if (!building) return null;

    const buildingRecipes = getRecipesForBuilding(building.id);
    const firstRecipe = buildingRecipes[0];

    const requiredInputRates: Record<string, number> = {};
    const requiredOutputRates: Record<string, number> = {};

    if (firstRecipe) {
      for (const input of firstRecipe.inputs) {
        requiredInputRates[input.itemId] = input.perMinute;
      }
      for (const output of firstRecipe.outputs) {
        requiredOutputRates[output.itemId] = output.perMinute;
      }
    }

    return {
      id,
      type: 'factory',
      position,
      data: {
        type: 'building',
        buildingId: building.id,
        recipeId: firstRecipe?.id,
        label: building.name,
        icon: building.icon,
        clockSpeed: 100,
        inputRates: {},
        outputRates: {},
        requiredInputRates,
        requiredOutputRates,
        status: 'idle',
      },
    };
  } else if (item.type === 'item') {
    const itemData = getItemById(item.id);
    if (!itemData) return null;

    return {
      id,
      type: 'factory',
      position,
      data: {
        type: 'resource',
        itemId: itemData.id,
        label: itemData.name,
        icon: itemData.icon,
        clockSpeed: 100,
        inputRates: {},
        outputRates: { [itemData.id]: 60 },
        requiredInputRates: {},
        requiredOutputRates: { [itemData.id]: 60 },
        status: 'running',
      },
    };
  }

  return null;
}

export function Canvas() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { screenToFlowPosition } = useReactFlow();

  const nodes = useStore((s) => s.nodes);
  const edges = useStore((s) => s.edges);
  const onNodesChange = useStore((s) => s.onNodesChange);
  const onEdgesChange = useStore((s) => s.onEdgesChange);
  const onConnect = useStore((s) => s.onConnect);
  const addNode = useStore((s) => s.addNode);
  const setSelectedNode = useStore((s) => s.setSelectedNode);
  const setSelectedEdge = useStore((s) => s.setSelectedEdge);
  const setDraggedItem = useStore((s) => s.setDraggedItem);
  const simulateFlows = useStore((s) => s.simulateFlows);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      // Read drag data from the event itself, not from store state
      const jsonData = event.dataTransfer.getData('application/json');
      if (!jsonData) return;

      let parsed: { type: string; id: string };
      try {
        parsed = JSON.parse(jsonData);
      } catch {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const node = createNodeFromDragData(parsed, position);
      if (!node) return;

      addNode(node);
      setDraggedItem(null);
      setTimeout(() => simulateFlows(), 0);
    },
    [screenToFlowPosition, addNode, setDraggedItem, simulateFlows],
  );

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
    setSelectedEdge(null);
  }, [setSelectedNode, setSelectedEdge]);

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      setSelectedNode(node.id);
    },
    [setSelectedNode],
  );

  const onEdgeClick = useCallback(
    (_: React.MouseEvent, edge: { id: string }) => {
      setSelectedEdge(edge.id);
    },
    [setSelectedEdge],
  );

  return (
    <div ref={reactFlowWrapper} className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onPaneClick={onPaneClick}
        onNodeClick={onNodeClick}
        onEdgeClick={onEdgeClick}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultEdgeOptions={{
          type: 'conveyor',
          data: {
            beltId: 'belt-mk1',
            actualRate: 0,
            maxRate: 60,
            utilization: 0,
            isBottleneck: false,
          },
        }}
        fitView
        proOptions={{ hideAttribution: true }}
        className="bg-sf-bg"
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="#1a2744"
        />
        <MiniMap
          nodeStrokeColor="#2a3f5f"
          nodeColor="#141e30"
          maskColor="rgba(10, 14, 23, 0.85)"
          style={{
            backgroundColor: '#111827',
          }}
        />
        <Controls />
      </ReactFlow>
    </div>
  );
}
