# 🔐 Simple Google OAuth Setup

This admin panel is protected by Google OAuth and only allows `luna@keywordtool.io` as the main admin.

## Quick Setup

### 1. Get Google OAuth Client ID
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Go to Credentials → Create Credentials → OAuth 2.0 Client IDs
5. Choose "Web application"
6. Add authorized origins: `https://ktutorial.netlify.app`
7. Copy the client ID

### 2. Update Config
Open `admin/auth-config.js` and replace:
```javascript
const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID_HERE';
```
With your actual client ID.

### 3. Deploy
```bash
git add .
git commit -m "Add Google OAuth client ID"
git push
netlify deploy --prod
```

## How It Works
- Only `luna@keywordtool.io` can access the admin panel
- Simple Google Sign-In button
- Clean, straightforward authentication
- Ready for future team member invitations

## Current Status
- ✅ Authentication system ready
- ❌ Needs your Google OAuth client ID
- ❌ Deploy after configuration
