// Simple Google OAuth Configuration
// IMPORTANT: Replace this with your actual Google OAuth client ID from Google Cloud Console
// For now, using a bypass authentication so you can access the admin panel immediately
const GOOGLE_CLIENT_ID = 'BYPASS_AUTH_FOR_NOW';

// Main admin account
const MAIN_ADMIN_EMAIL = 'luna@keywordtool.io';

// Export configuration
window.AUTH_CONFIG = {
    GOOGLE_CLIENT_ID,
    MAIN_ADMIN_EMAIL
};

// TEMPORARY: This bypasses Google OAuth so you can access the admin panel
// Remove this bypass once you set up your real Google OAuth client ID
