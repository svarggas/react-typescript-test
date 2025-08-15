import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import './style.css';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

// Error Boundary class component (required as React doesn't have functional error boundaries yet)
class ErrorBoundaryClass extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });

    // You can also log the error to an error reporting service here
    // Example: errorReportingService.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }

    return this.props.children;
  }
}

const ErrorFallback = () => {
  return (
    <div className="error-boundary">
      <div className="error-container">
        <h1 className="error-title">Oops! Something went wrong</h1>
        <p className="error-message">
          We're sorry, but something unexpected happened.
        </p>
      </div>
    </div>
  );
};

const ErrorBoundary = ({ children }: Props) => {
  return <ErrorBoundaryClass>{children}</ErrorBoundaryClass>;
};

export default ErrorBoundary;
