# Admin Authentication Setup

This admin interface is protected by Google OAuth authentication and only allows users with `@keywordtool.io` email addresses to access it.

## Setup Instructions

### 1. Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Choose "Web application" as the application type
6. Add authorized JavaScript origins:
   - `https://ktutorial.netlify.app`
   - `http://localhost:3000` (for local development)
7. Copy the Client ID

### 2. Configure Authentication

1. Open `admin/auth-config.js`
2. Replace `YOUR_GOOGLE_CLIENT_ID` with your actual Google OAuth client ID:

```javascript
const GOOGLE_CLIENT_ID = '123456789-abcdefghijklmnop.apps.googleusercontent.com';
```

### 3. Deploy Changes

1. Commit and push your changes:
   ```bash
   git add .
   git commit -m "Add Google OAuth authentication"
   git push
   ```

2. Deploy to Netlify:
   ```bash
   netlify deploy --prod
   ```

## How It Works

- Users must sign in with their Google account
- Only accounts with `@keywordtool.io` email addresses are allowed
- Authentication state is stored in localStorage
- Users can logout using the logout button in the top bar

## Security Features

- Domain restriction: Only `@keywordtool.io` emails allowed
- JWT token validation
- Automatic logout on token expiration
- Secure credential handling

## Troubleshooting

- **"Configuration Required" error**: Update `auth-config.js` with your Google OAuth client ID
- **"Access denied" error**: User's email domain is not `@keywordtool.io`
- **Login not working**: Check browser console for errors and verify OAuth configuration
