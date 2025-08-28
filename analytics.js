// Google Analytics 4 Setup
// Replace 'G-XXXXXXXXXX' with your actual Google Analytics Measurement ID

// Google Analytics 4 (GA4) tracking code
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-XXXXXXXXXX'); // Replace with your GA4 Measurement ID

// Enhanced tracking for tutorial pages
document.addEventListener('DOMContentLoaded', function() {
    // Track page views
    gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href
    });
    
    // Track button clicks
    const buttons = document.querySelectorAll('button, .btn, a[href]');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            gtag('event', 'click', {
                event_category: 'engagement',
                event_label: this.textContent.trim() || this.getAttribute('href'),
                value: 1
            });
        });
    });
    
    // Track form submissions
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function() {
            gtag('event', 'form_submit', {
                event_category: 'engagement',
                event_label: form.getAttribute('action') || 'contact_form',
                value: 1
            });
        });
    });
    
    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', function() {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
            if (maxScroll % 25 === 0) { // Track at 25%, 50%, 75%, 100%
                gtag('event', 'scroll', {
                    event_category: 'engagement',
                    event_label: maxScroll + '%',
                    value: maxScroll
                });
            }
        }
    });
}); 