// Google OAuth Configuration
// IMPORTANT: You MUST replace this with your actual Google OAuth client ID
// The current value is a placeholder and will NOT work
const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID_HERE';

// Domain restriction
const ALLOWED_DOMAIN = 'keywordtool.io';

// Export configuration
window.AUTH_CONFIG = {
    GOOGLE_CLIENT_ID,
    ALLOWED_DOMAIN
};

console.log('🔐 Auth Config Loaded:', window.AUTH_CONFIG);
console.log('⚠️  IMPORTANT: You need to set up Google OAuth in auth-config.js');
