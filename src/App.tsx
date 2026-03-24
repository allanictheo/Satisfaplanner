import { Component, type ReactNode } from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import { Sidebar } from './components/sidebar/Sidebar';
import { Canvas } from './components/canvas/Canvas';
import { OptimizePanel } from './components/optimization/OptimizePanel';
import { NodeDetailPanel } from './components/nodes/NodeDetailPanel';
import { useStore } from './store/useStore';

class ErrorBoundary extends Component<
  { children: ReactNode },
  { error: Error | null }
> {
  state: { error: Error | null } = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 40, color: '#e8edf5', background: '#0a0e17', minHeight: '100vh' }}>
          <h1 style={{ color: '#f5a623' }}>Something went wrong</h1>
          <pre style={{ color: '#ef5350', whiteSpace: 'pre-wrap', marginTop: 16 }}>
            {this.state.error.message}
          </pre>
          <pre style={{ color: '#8899aa', whiteSpace: 'pre-wrap', marginTop: 8, fontSize: 12 }}>
            {this.state.error.stack}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

function AppContent() {
  const selectedNodeId = useStore((s) => s.canvas.selectedNodeId);

  return (
    <ReactFlowProvider>
      <div className="flex h-screen w-screen overflow-hidden bg-sf-bg">
        <Sidebar />
        <div className="flex-1 relative" style={{ height: '100vh' }}>
          <Canvas />
          <OptimizePanel />
          {selectedNodeId && <NodeDetailPanel />}
        </div>
      </div>
    </ReactFlowProvider>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
}
