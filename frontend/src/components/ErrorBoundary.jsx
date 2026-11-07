import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    localStorage.removeItem('ilm_articles');
    localStorage.removeItem('ilm_quizzes');
    localStorage.removeItem('ilm_products');
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          textAlign: 'center',
          background: '#faf8f5',
          color: '#1e293b',
          fontFamily: 'Inter, sans-serif'
        }}>
          <div style={{ fontSize: '3.5rem', color: '#e11d48', marginBottom: '16px' }}>
            <i className="fas fa-exclamation-triangle"></i>
          </div>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>Xatolik yuz berdi</h2>
          <p style={{ color: '#64748b', maxWidth: '500px', marginBottom: '24px' }}>
            Sahifani yuklashda vaqtinchalik xatolik paydo bo'ldi. Quyidagi tugmani bosib keshlarni tozalang va qayta yuklang.
          </p>
          <button
            onClick={this.handleReset}
            style={{
              padding: '12px 28px',
              borderRadius: '10px',
              border: 'none',
              background: '#0d9488',
              color: '#fff',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '1rem',
              boxShadow: '0 4px 12px rgba(13, 148, 136, 0.3)'
            }}
          >
            <i className="fas fa-sync-alt" style={{ marginRight: '8px' }}></i> Qayta yuklash
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
