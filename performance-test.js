// Performance Monitoring Script
// Tracks Core Web Vitals and other performance metrics

class PerformanceMonitor {
    constructor() {
        this.metrics = {};
        this.init();
    }
    
    init() {
        // Track page load performance
        window.addEventListener('load', () => {
            this.captureLoadMetrics();
        });
        
        // Track Core Web Vitals
        this.trackCoreWebVitals();
        
        // Track user interactions
        this.trackUserInteractions();
    }
    
    captureLoadMetrics() {
        const navigation = performance.getEntriesByType('navigation')[0];
        const paint = performance.getEntriesByType('paint');
        
        this.metrics = {
            // Page load times
            domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
            loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
            totalLoadTime: navigation.loadEventEnd - navigation.fetchStart,
            
            // Paint times
            firstPaint: paint.find(entry => entry.name === 'first-paint')?.startTime || 0,
            firstContentfulPaint: paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0,
            
            // Resource loading
            resourceCount: performance.getEntriesByType('resource').length,
            resourceSize: performance.getEntriesByType('resource').reduce((total, resource) => total + resource.transferSize, 0)
        };
        
        // Log metrics to console (replace with your analytics service)
        console.log('Performance Metrics:', this.metrics);
        
        // Send to analytics if available
        if (typeof gtag !== 'undefined') {
            gtag('event', 'performance_metrics', {
                event_category: 'performance',
                value: Math.round(this.metrics.totalLoadTime),
                custom_map: {
                    'metric1': 'dom_content_loaded',
                    'metric2': 'first_contentful_paint',
                    'metric3': 'resource_count'
                },
                metric1: Math.round(this.metrics.domContentLoaded),
                metric2: Math.round(this.metrics.firstContentfulPaint),
                metric3: this.metrics.resourceCount
            });
        }
    }
    
    trackCoreWebVitals() {
        // Largest Contentful Paint (LCP)
        if ('PerformanceObserver' in window) {
            const lcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                const lcp = lastEntry.startTime;
                
                console.log('LCP:', lcp);
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'core_web_vital', {
                        event_category: 'web_vital',
                        event_label: 'LCP',
                        value: Math.round(lcp)
                    });
                }
            });
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
            
            // First Input Delay (FID)
            const fidObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    const fid = entry.processingStart - entry.startTime;
                    console.log('FID:', fid);
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'core_web_vital', {
                            event_category: 'web_vital',
                            event_label: 'FID',
                            value: Math.round(fid)
                        });
                    }
                });
            });
            fidObserver.observe({ entryTypes: ['first-input'] });
            
            // Cumulative Layout Shift (CLS)
            let clsValue = 0;
            const clsObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                    }
                });
                console.log('CLS:', clsValue);
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'core_web_vital', {
                        event_category: 'web_vital',
                        event_label: 'CLS',
                        value: Math.round(clsValue * 1000) / 1000
                    });
                }
            });
            clsObserver.observe({ entryTypes: ['layout-shift'] });
        }
    }
    
    trackUserInteractions() {
        // Track time to first interaction
        let firstInteraction = false;
        const interactionEvents = ['click', 'keydown', 'scroll', 'touchstart'];
        
        interactionEvents.forEach(eventType => {
            document.addEventListener(eventType, () => {
                if (!firstInteraction) {
                    firstInteraction = true;
                    const timeToFirstInteraction = performance.now();
                    console.log('Time to first interaction:', timeToFirstInteraction);
                    
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'first_interaction', {
                            event_category: 'user_experience',
                            event_label: eventType,
                            value: Math.round(timeToFirstInteraction)
                        });
                    }
                }
            }, { once: true });
        });
    }
}

// Initialize performance monitoring
document.addEventListener('DOMContentLoaded', () => {
    new PerformanceMonitor();
}); 