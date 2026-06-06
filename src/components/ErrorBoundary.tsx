import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private reset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center p-8 md:p-12 bg-bg-card rounded-3xl border border-border-subtle max-w-lg mx-auto mt-12 shadow-xl animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 bg-error/10 rounded-2xl flex items-center justify-center mb-6">
            <AlertTriangle className="w-8 h-8 text-error" />
          </div>
          <h2 className="text-2xl font-bold text-text-main tracking-tight mb-3">Something went wrong</h2>
          <p className="text-base font-medium text-text-muted text-center mb-8 leading-relaxed">
            {this.state.error?.message || 'An unexpected error occurred while processing your request.'}
          </p>
          <button
            onClick={this.reset}
            className="flex items-center justify-center gap-2 w-full h-[48px] bg-bg-surface hover:bg-bg-hover transition-colors text-text-main rounded-xl border border-border-subtle text-sm font-semibold shadow-sm hover:border-border-strong"
          >
            <RefreshCcw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
