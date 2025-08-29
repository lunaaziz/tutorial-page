# 🔐 Google OAuth Setup Guide for Admin Authentication

## 🚨 Current Issue
You're seeing "Missing required parameter: client_id" because the Google OAuth client ID is not configured yet.

## 📋 Step-by-Step Setup

### Step 1: Go to Google Cloud Console
1. Visit [https://console.cloud.google.com/](https://console.cloud.google.com/)
2. Sign in with your `luna@keywordtool.io` account

### Step 2: Create or Select Project
1. Click on the project dropdown at the top
2. Click "New Project" or select an existing one
3. Give it a name like "Keyword Tool Admin" or "Tutorial CMS"

### Step 3: Enable Google+ API
1. In the left sidebar, click "APIs & Services" → "Library"
2. Search for "Google+ API" or "Google Identity"
3. Click on it and click "Enable"

### Step 4: Create OAuth 2.0 Credentials
1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth 2.0 Client IDs"
3. If prompted, configure the OAuth consent screen first:
   - User Type: External
   - App name: "Keyword Tool Admin"
   - User support email: `luna@keywordtool.io`
   - Developer contact email: `luna@keywordtool.io`

### Step 5: Configure OAuth Client ID
1. Application type: **Web application**
2. Name: "Keyword Tool Admin CMS"
3. **Authorized JavaScript origins** (add these):
   ```
   https://ktutorial.netlify.app
   http://localhost:3000
   http://localhost:5000
   ```
4. **Authorized redirect URIs** (add these):
   ```
   https://ktutorial.netlify.app/admin/
   http://localhost:3000/admin/
   http://localhost:5000/admin/
   ```
5. Click "Create"

### Step 6: Copy the Client ID
1. You'll see a popup with your client ID
2. It looks like: `123456789-abcdefghijklmnop.apps.googleusercontent.com`
3. Copy this entire string

### Step 7: Update Your Config File
1. Open `admin/auth-config.js`
2. Replace `'YOUR_GOOGLE_CLIENT_ID_HERE'` with your actual client ID:

```javascript
const GOOGLE_CLIENT_ID = '123456789-abcdefghijklmnop.apps.googleusercontent.com';
```

### Step 8: Deploy the Changes
```bash
git add .
git commit -m "Configure Google OAuth client ID"
git push
netlify deploy --prod
```

## 🔍 Testing the Setup

1. **Visit** `https://ktutorial.netlify.app/admin/`
2. **You should see** the Google Sign-In button
3. **Click it** → Google account picker should appear
4. **Select** your `luna@keywordtool.io` account
5. **Access granted** → You'll see the admin interface

## 🚨 Common Issues & Solutions

### Issue: "Missing required parameter: client_id"
- **Solution**: Make sure you've updated `auth-config.js` with the real client ID
- **Check**: Open browser console, look for "Auth Config Loaded" message

### Issue: "Access blocked: Authorization Error"
- **Solution**: Check that your domain `ktutorial.netlify.app` is in authorized origins
- **Check**: Verify the client ID is correct

### Issue: "Access denied. Only @keywordtool.io accounts are allowed"
- **Solution**: Make sure you're using your `luna@keywordtool.io` account, not a personal Gmail

### Issue: Google account picker doesn't show
- **Solution**: Clear browser cache, check console for errors
- **Check**: Verify the OAuth API is enabled in Google Cloud Console

## 📞 Need Help?

If you're still having issues:
1. Check the browser console for error messages
2. Verify your Google Cloud Console settings
3. Make sure you're using the correct Google account
4. Check that the client ID is properly copied (no extra spaces)

## ✅ Success Checklist

- [ ] Google Cloud Console project created
- [ ] Google+ API enabled
- [ ] OAuth 2.0 Client ID created
- [ ] Authorized origins added
- [ ] Client ID copied to `auth-config.js`
- [ ] Changes deployed to Netlify
- [ ] Can sign in with `luna@keywordtool.io`
- [ ] Admin interface accessible
