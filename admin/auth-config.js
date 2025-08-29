// Simple Google OAuth Configuration
// Google OAuth client ID for Keyword Tool Admin
const GOOGLE_CLIENT_ID = '950090373797-g22mhtkrfs9mjoqnred9vejg06qqtcec.apps.googleusercontent.com';

// Main admin account
const MAIN_ADMIN_EMAIL = 'luna@keywordtool.io';

// TEMPORARY: Enable bypass for immediate access while troubleshooting OAuth
const ENABLE_BYPASS = true;

// Export configuration
window.AUTH_CONFIG = {
    GOOGLE_CLIENT_ID,
    MAIN_ADMIN_EMAIL,
    ENABLE_BYPASS
};

// Debug logging
console.log('🔐 Auth Config Loaded:', window.AUTH_CONFIG);
console.log('🌐 Current domain:', window.location.origin);
console.log('📱 User agent:', navigator.userAgent);
console.log('⚠️  Bypass enabled:', ENABLE_BYPASS);
