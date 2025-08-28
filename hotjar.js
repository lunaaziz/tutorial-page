// Hotjar Tracking Code
// Replace 'XXXXXXXXXX' with your actual Hotjar Site ID

(function(h,o,t,j,a,r){
    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
    h._hjSettings={hjid:XXXXXXXXXX,hjsv:6}; // Replace with your Hotjar Site ID
    a=o.getElementsByTagName('head')[0];
    r=o.createElement('script');r.async=1;
    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
    a.appendChild(r);
})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');

// Enhanced Hotjar tracking for tutorial pages
document.addEventListener('DOMContentLoaded', function() {
    // Track custom events for tutorial interactions
    if (typeof hj !== 'undefined') {
        // Track tutorial page views
        hj('event', 'tutorial_page_view', {
            page_name: document.title,
            page_url: window.location.href
        });
        
        // Track navigation clicks
        const navLinks = document.querySelectorAll('nav a, .navigation a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hj('event', 'navigation_click', {
                    link_text: this.textContent.trim(),
                    link_url: this.getAttribute('href')
                });
            });
        });
        
        // Track CTA button clicks
        const ctaButtons = document.querySelectorAll('.cta, .btn-primary, .action-button');
        ctaButtons.forEach(button => {
            button.addEventListener('click', function() {
                hj('event', 'cta_click', {
                    button_text: this.textContent.trim(),
                    button_location: this.closest('section')?.className || 'unknown'
                });
            });
        });
    }
}); 