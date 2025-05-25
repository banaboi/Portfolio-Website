import React, { useEffect, useState, memo } from 'react';

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
}

const PerformanceMonitor: React.FC = memo(() => {
  const [metrics, setMetrics] = useState<Partial<PerformanceMetrics>>({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const measurePerformance = () => {
      // Get navigation timing
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
      const renderTime = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;

      setMetrics(prev => ({
        ...prev,
        loadTime,
        renderTime
      }));

      // Measure Web Vitals
      if ('web-vitals' in window) {
        // This would need the web-vitals library
        // For now, we'll use Performance Observer
      }

      // Use Performance Observer for paint metrics
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            if (entry.name === 'first-contentful-paint') {
              setMetrics(prev => ({ ...prev, fcp: entry.startTime }));
            }
            if (entry.name === 'largest-contentful-paint') {
              setMetrics(prev => ({ ...prev, lcp: entry.startTime }));
            }
          });
        });

        try {
          observer.observe({ entryTypes: ['paint', 'largest-contentful-paint'] });
        } catch (e) {
          console.log('Performance Observer not fully supported');
        }
      }
    };

    // Measure after initial load
    if (document.readyState === 'complete') {
      measurePerformance();
    } else {
      window.addEventListener('load', measurePerformance);
    }

    return () => {
      window.removeEventListener('load', measurePerformance);
    };
  }, []);

  // Only show in development
  useEffect(() => {
    setIsVisible(process.env.NODE_ENV === 'development');
  }, []);

  if (!isVisible || Object.keys(metrics).length === 0) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '10px',
        right: '10px',
        background: 'rgba(0, 0, 0, 0.8)',
        color: 'var(--accent-primary)',
        padding: '10px',
        borderRadius: '5px',
        fontSize: '12px',
        fontFamily: 'monospace',
        zIndex: 9999,
        border: '1px solid var(--border-color)',
        minWidth: '200px'
      }}
    >
      <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
        ⚡ Performance Metrics
      </div>
      {metrics.loadTime && (
        <div>Load: {metrics.loadTime.toFixed(2)}ms</div>
      )}
      {metrics.renderTime && (
        <div>Render: {metrics.renderTime.toFixed(2)}ms</div>
      )}
      {metrics.fcp && (
        <div>FCP: {metrics.fcp.toFixed(2)}ms</div>
      )}
      {metrics.lcp && (
        <div>LCP: {metrics.lcp.toFixed(2)}ms</div>
      )}
      <div style={{ marginTop: '5px', fontSize: '10px', opacity: 0.7 }}>
        Dev mode only
      </div>
    </div>
  );
});

PerformanceMonitor.displayName = 'PerformanceMonitor';

export default PerformanceMonitor;
