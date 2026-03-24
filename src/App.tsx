import { ReactFlowProvider } from '@xyflow/react';
import { Sidebar } from './components/sidebar/Sidebar';
import { Canvas } from './components/canvas/Canvas';
import { OptimizePanel } from './components/optimization/OptimizePanel';
import { NodeDetailPanel } from './components/nodes/NodeDetailPanel';
import { useStore } from './store/useStore';

export default function App() {
  const selectedNodeId = useStore((s) => s.canvas.selectedNodeId);

  return (
    <ReactFlowProvider>
      <div className="flex h-screen w-screen overflow-hidden bg-sf-bg">
        <Sidebar />
        <div className="flex-1 relative">
          <Canvas />
          <OptimizePanel />
          {selectedNodeId && <NodeDetailPanel />}
        </div>
      </div>
    </ReactFlowProvider>
  );
}
