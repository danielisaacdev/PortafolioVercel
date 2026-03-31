import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    // Aquí puedes enviar el error a un servicio de logging
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-surface-container text-on-surface">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold mb-4">Algo salió mal</h1>
            <p className="mb-4">Lo sentimos, ha ocurrido un error inesperado.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-on-primary rounded-lg hover:bg-primary-container transition-colors"
            >
              Recargar página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;