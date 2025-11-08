import React from 'react';

// Simple Error Boundary to catch render-time exceptions and show a friendly message.
// Use by wrapping parts of the tree: <ErrorBoundary><YourApp /></ErrorBoundary>
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // You could log the error to an external service here
    this.setState({ info });
    // console.error(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{padding: '2rem'}}>
          <h2>Something went wrong.</h2>
          <p>{this.state.error && this.state.error.toString()}</p>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.info && this.state.info.componentStack}
          </details>
          <button onClick={() => window.location.reload()}>Reload page</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
