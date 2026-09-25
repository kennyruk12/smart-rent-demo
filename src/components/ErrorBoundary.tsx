import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Suppress third-party extension errors
    const msg = error?.message || '';
    if (
      msg.toLowerCase().includes('metamask') ||
      msg.toLowerCase().includes('ethereum') ||
      msg.toLowerCase().includes('wallet')
    ) {
      this.setState({ hasError: false, error: null });
      return;
    }
    console.error('Uncaught application error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-white rounded-3xl border border-black/[0.08] shadow-lg p-8 space-y-4">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-700 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-[#1C1C1E]">Something went wrong</h2>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              An unexpected display error occurred. Please reload the page to continue browsing rental homes.
            </p>
            <div className="pt-2">
              <button
                onClick={this.handleReset}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#102A43] hover:bg-[#0d2135] text-white text-xs font-semibold rounded-full cursor-pointer transition-transform active:scale-95"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reload page</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
