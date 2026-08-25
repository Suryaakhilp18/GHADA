import React, { Component, ErrorInfo, ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught Error in Ghada App:', error, errorInfo);
  }

  private handleReset = () => {
    localStorage.clear();
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-dark-bg text-ivory flex items-center justify-center p-6">
          <div className="max-w-md w-full p-8 rounded-3xl bg-dark-card border border-gold/30 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-gold/20 text-gold flex items-center justify-center mx-auto border border-gold/40 text-xl font-bold">
              ⚡
            </div>
            <h2 className="text-xl font-extrabold text-ivory">GHADA Prototype Engine</h2>
            <p className="text-xs text-ivory-dark leading-relaxed">
              An unexpected render state occurred. Click below to clear cached demo state and reload.
            </p>
            <div className="p-3 rounded-xl bg-dark-elevated border border-dark-border text-[11px] text-terracotta font-mono text-left overflow-x-auto">
              {this.state.error?.message || 'Unknown render exception'}
            </div>
            <button
              onClick={this.handleReset}
              className="w-full py-3 rounded-xl bg-gold text-dark-bg font-extrabold text-xs shadow-gold-sm hover:brightness-110"
            >
              Reset Demo State & Reload
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);
