// Dynamic Content Updater for Live Site
class DynamicUpdater {
    constructor() {
        this.contentCache = {};
        this.updateQueue = [];
        this.isUpdating = false;
        this.init();
    }

    init() {
        // Listen for content changes
        this.setupContentListeners();
        // Setup real-time update system
        this.setupRealTimeUpdates();
    }

    setupContentListeners() {
        // Listen for changes in the visual editor
        document.addEventListener('contentChanged', (e) => {
            this.queueUpdate(e.detail);
        });
    }

    setupRealTimeUpdates() {
        // Check for content updates every 5 seconds
        setInterval(() => {
            this.checkForUpdates();
        }, 5000);
    }

    queueUpdate(changeData) {
        this.updateQueue.push(changeData);
        if (!this.isUpdating) {
            this.processUpdates();
        }
    }

    async processUpdates() {
        if (this.updateQueue.length === 0) return;
        
        this.isUpdating = true;
        
        while (this.updateQueue.length > 0) {
            const update = this.updateQueue.shift();
            await this.applyUpdate(update);
        }
        
        this.isUpdating = false;
    }

    async applyUpdate(update) {
        try {
            // Update local storage
            this.contentCache[update.field] = update.value;
            localStorage.setItem('dynamic_content', JSON.stringify(this.contentCache));
            
            // Try to update live site if possible
            await this.updateLiveSite(update);
            
            // Show success feedback
            this.showUpdateFeedback(update, true);
            
        } catch (error) {
            console.error('Update failed:', error);
            this.showUpdateFeedback(update, false);
        }
    }

    async updateLiveSite(update) {
        // Method 1: Try to update via iframe if on same domain
        if (this.canUpdateViaIframe()) {
            return this.updateViaIframe(update);
        }
        
        // Method 2: Update via localStorage sync
        return this.updateViaLocalStorage(update);
    }

    canUpdateViaIframe() {
        try {
            return window.location.hostname === 'ktutorial.netlify.app' || 
                   window.location.hostname === 'localhost';
        } catch {
            return false;
        }
    }

    updateViaIframe(update) {
        // Create hidden iframe to update live site
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = '../index.html';
        
        iframe.onload = () => {
            try {
                const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                const targetElement = iframeDoc.querySelector(`[data-field="${update.field}"]`);
                
                if (targetElement) {
                    targetElement.textContent = update.value;
                    // Trigger any necessary re-renders
                    iframe.contentWindow.dispatchEvent(new CustomEvent('contentUpdated', {
                        detail: update
                    }));
                }
            } catch (error) {
                console.log('Iframe update not possible:', error);
            }
        };
        
        document.body.appendChild(iframe);
        
        // Clean up after update
        setTimeout(() => {
            document.body.removeChild(iframe);
        }, 1000);
    }

    updateViaLocalStorage(update) {
        // Store update for cross-tab sync
        const updates = JSON.parse(localStorage.getItem('live_site_updates') || '[]');
        updates.push({
            ...update,
            timestamp: Date.now()
        });
        localStorage.setItem('live_site_updates', JSON.stringify(updates));
        
        // Broadcast to other tabs
        this.broadcastUpdate(update);
    }

    broadcastUpdate(update) {
        // Send message to other tabs
        if (window.BroadcastChannel) {
            const channel = new BroadcastChannel('content_updates');
            channel.postMessage(update);
        }
        
        // Also try localStorage event
        localStorage.setItem('last_update', JSON.stringify(update));
    }

    checkForUpdates() {
        // Check for updates from other sources
        const lastUpdate = localStorage.getItem('last_update');
        if (lastUpdate) {
            try {
                const update = JSON.parse(lastUpdate);
                this.applyUpdate(update);
                localStorage.removeItem('last_update');
            } catch (error) {
                console.error('Failed to parse update:', error);
            }
        }
    }

    showUpdateFeedback(update, success) {
        // Create floating notification
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg z-50 transition-all duration-300 ${
            success ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`;
        
        notification.innerHTML = `
            <div class="flex items-center gap-2">
                <span>${success ? '✅' : '❌'}</span>
                <span>${success ? 'Updated' : 'Update failed'}: ${update.field}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Public method to update content
    updateContent(field, value) {
        const update = { field, value };
        this.queueUpdate(update);
        
        // Dispatch custom event for other components
        document.dispatchEvent(new CustomEvent('contentChanged', {
            detail: update
        }));
    }

    // Get current content
    getContent(field) {
        return this.contentCache[field] || '';
    }

    // Get all content
    getAllContent() {
        return { ...this.contentCache };
    }
}

// Initialize dynamic updater
const dynamicUpdater = new DynamicUpdater();

// Export for use in other files
window.DynamicUpdater = DynamicUpdater;
window.dynamicUpdater = dynamicUpdater;
