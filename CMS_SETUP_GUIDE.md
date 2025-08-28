# Content Management System Setup Guide

## 🎯 **What You've Got**

I've set up **Netlify CMS** (now called Decap CMS) for your tutorial website. This will allow you to:

- ✅ Add/edit/delete tutorials without touching code
- ✅ Manage site settings (title, logo, contact info)
- ✅ Update navigation menu
- ✅ Upload images and media
- ✅ Preview changes before publishing
- ✅ Automatic deployment when you save changes

## 🔧 **Setup Steps**

### 1. Enable Netlify Identity

1. Go to your Netlify dashboard: https://app.netlify.com/projects/keyword-tool-tutorial
2. Go to **Site settings** → **Identity**
3. Click **Enable Identity**
4. Under **Registration preferences**, select "Invite only" for security
5. Under **External providers**, you can enable GitHub, Google, etc. (optional)

### 2. Enable Git Gateway

1. Still in the Identity section
2. Scroll down to **Services** → **Git Gateway**
3. Click **Enable Git Gateway**
4. This allows the CMS to commit changes to your GitHub repository

### 3. Invite Yourself as an Admin

1. In the Identity section, click **Invite users**
2. Enter your email address
3. Select **Admin** role
4. Click **Send invite**
5. Check your email and follow the link to set up your password

### 4. Access Your CMS

Once setup is complete, you can access your CMS at:
**https://keyword-tool-tutorial.netlify.app/admin/**

## 📝 **How to Use the CMS**

### Creating New Tutorials

1. Go to `/admin/`
2. Login with your credentials
3. Click **New Tutorial**
4. Fill out the form:
   - **Title**: Tutorial name
   - **Description**: Brief summary
   - **Category**: Choose from dropdown (Basics, Find Keywords, etc.)
   - **Difficulty**: Beginner/Intermediate/Advanced
   - **Duration**: How long it takes (e.g., "5 minutes")
   - **Body**: Write your tutorial content in Markdown
   - **Tags**: Add relevant tags
   - **Featured Image**: Upload tutorial screenshot/image

### Editing Existing Content

1. In the CMS, click on **Tutorials**, **Pages**, or **Settings**
2. Select the item you want to edit
3. Make your changes
4. Click **Save** → **Publish**
5. Changes will automatically deploy to your live site!

### Managing Site Settings

1. Go to **Site Settings** → **General Settings**
2. Update:
   - Site title and description
   - Logo image
   - Contact email
   - Social media links

### Updating Navigation

1. Go to **Navigation** → **Main Navigation**
2. Add, remove, or reorder menu items
3. Each item needs:
   - Title (display name)
   - URL (page link)
   - Icon (Ionicon name)
   - Category (for grouping)

## 📁 **File Structure**

```
tutorial-page/
├── admin/
│   ├── index.html          # CMS interface
│   └── config.yml          # CMS configuration
├── _tutorials/             # Tutorial markdown files
├── _data/                  # Site settings and navigation
├── assets/uploads/         # CMS uploaded images
└── [existing HTML files]   # Your current pages
```

## 🔄 **Workflow**

1. **Create/Edit**: Use the CMS interface at `/admin/`
2. **Preview**: See changes in the CMS preview
3. **Publish**: Click publish - changes go live automatically
4. **Git Integration**: All changes are saved to your GitHub repo

## 🛠️ **Content Types Available**

### Tutorials
- Full markdown editor
- Category organization
- Difficulty levels
- Featured images
- Video URLs
- Tags and metadata

### Pages
- Homepage content editing
- Featured tutorial selection

### Settings
- Site branding
- Contact information
- Social media links

### Navigation
- Menu structure
- Icons and categories
- URL management

## 📱 **Features**

- **Rich Text Editor**: WYSIWYG markdown editor
- **Media Library**: Upload and manage images
- **Preview Mode**: See changes before publishing
- **Editorial Workflow**: Draft → Review → Publish
- **User Management**: Multiple admin users
- **Git-based**: All changes version controlled

## 🚀 **Next Steps**

1. Complete the Netlify Identity setup
2. Access your CMS at `/admin/`
3. Create your first tutorial
4. Customize site settings
5. Invite team members if needed

## 🆘 **Troubleshooting**

**Can't access `/admin/`?**
- Make sure Netlify Identity is enabled
- Check that you've accepted the invite email
- Clear browser cache and try again

**Changes not appearing?**
- Check the deploy status in Netlify dashboard
- Wait a few minutes for deployment
- Check browser cache

**Login issues?**
- Make sure you're using the correct email
- Try password reset if needed
- Check spam folder for invite emails

---

**Your CMS is now ready to use! No more editing HTML files - manage everything through the user-friendly interface at `/admin/`**
