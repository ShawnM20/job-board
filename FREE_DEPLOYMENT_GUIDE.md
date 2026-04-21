# Free JobBoard Deployment Guide

This guide will help you deploy your JobBoard application completely free so users and companies can start using it immediately.

## Overview

**Total Cost: $0/month**
- Frontend: Vercel (Free)
- Backend: Heroku (Free)
- Database: MongoDB Atlas (Free)

## Step 1: Set Up MongoDB Atlas (Free Database)

### 1.1 Create Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Try Free" and create an account
3. Verify your email

### 1.2 Create Free Cluster
1. Click "Build a Database"
2. Select "FREE" plan (M0 Sandbox)
3. Choose cloud provider: AWS
4. Choose region closest to you
5. Cluster name: `jobboard-cluster`
6. Click "Create Cluster"

### 1.3 Create Database User
1. Go to "Database Access" in left menu
2. Click "Add New Database User"
3. Username: `jobboard-admin`
4. Password: Generate a strong password (save it!)
5. Click "Create User"

### 1.4 Configure Network Access
1. Go to "Network Access" in left menu
2. Click "Add IP Address"
3. Select "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

### 1.5 Get Connection String
1. Go to "Database" section
2. Click "Connect" for your cluster
3. Select "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your actual password
6. Save this string - you'll need it later

## Step 2: Deploy Backend to Heroku (Free)

### 2.1 Install Heroku CLI
```bash
# Windows
# Download from: https://devcenter.heroku.com/articles/heroku-cli

# Mac
brew install heroku/brew/heroku

# Linux
sudo snap install heroku --classic
```

### 2.2 Login to Heroku
```bash
heroku login
```

### 2.3 Prepare Backend
```bash
# In your backend directory
cd job-board-backend

# Initialize git if not already done
git init
git add .
git commit -m "Initial commit"

# Create Heroku app
heroku create your-jobboard-name

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI="your-mongodb-connection-string"
heroku config:set JWT_SECRET="your-super-secret-jwt-key-here"

# Deploy to Heroku
git push heroku main
```

### 2.4 Test Backend
1. Open your Heroku app: `heroku open`
2. Test API endpoints:
   - `https://your-app-name.herokuapp.com/api/jobs`
   - Should return empty array `[]`

## Step 3: Deploy Frontend to Vercel (Free)

### 3.1 Install Vercel CLI
```bash
npm i -g vercel
```

### 3.2 Prepare Frontend
```bash
# In frontend directory
cd job-board-frontend

# Update production API URL
# Edit .env.production file:
VITE_API_URL=https://your-heroku-app-name.herokuapp.com/api

# Install dependencies
npm install

# Build locally to test
npm run build
```

### 3.3 Deploy to Vercel
```bash
# Login to Vercel
vercel login

# Deploy
vercel --prod

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? jobboard-frontend
# - Directory? . (current)
# - Override settings? No
```

### 3.4 Configure Environment Variables
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Find your project
3. Go to Settings > Environment Variables
4. Add variable:
   - Name: `VITE_API_URL`
   - Value: `https://your-heroku-app-name.herokuapp.com/api`
5. Redeploy: `vercel --prod`

## Step 4: Final Setup and Testing

### 4.1 Update CORS Settings
Make sure your backend allows requests from your Vercel domain:

```javascript
// In your server.js or main backend file
const cors = require('cors');

app.use(cors({
  origin: ['https://your-vercel-app.vercel.app', 'http://localhost:3000'],
  credentials: true
}));
```

### 4.2 Test Complete Application
1. Visit your Vercel frontend URL
2. Test registration/login
3. Test posting a job
4. Test applying for a job
5. Test viewing applications

## Quick Commands Reference

### Backend (Heroku)
```bash
# View logs
heroku logs --tail

# Restart app
heroku restart

# Open app in browser
heroku open

# Set new environment variable
heroku config:set VAR_NAME=value

# View all config variables
heroku config
```

### Frontend (Vercel)
```bash
# Deploy new version
vercel --prod

# View deployment logs
vercel logs

# Open project in browser
vercel open
```

## Troubleshooting

### Common Issues

**CORS Error**
```bash
# Fix: Add your Vercel domain to CORS origins
heroku config:set CORS_ORIGIN=https://your-app.vercel.app
```

**Database Connection Error**
```bash
# Check MongoDB URI format
# Should be: mongodb+srv://username:password@cluster.mongodb.net/database
```

**Build Fails**
```bash
# Check for missing dependencies
npm install

# Check for syntax errors
npm run build
```

**App Not Loading**
```bash
# Check Heroku logs
heroku logs --tail

# Check environment variables
heroku config
```

## What You Get

### Features Available
- User registration and login
- Job posting and management
- Job applications with file uploads
- Professional UI/UX
- Mobile responsive design
- Real-time updates

### Limitations (Free Tier)
- **Heroku**: Sleeps after 30 minutes inactivity (takes ~10 seconds to wake up)
- **MongoDB Atlas**: 512MB storage limit
- **Vercel**: Unlimited bandwidth, 100GB bandwidth/month

### When to Upgrade
- More than 100 active users
- Need faster response times
- Need more storage
- Want custom domain

## Next Steps

1. **Share your app**: Send the Vercel URL to users
2. **Monitor usage**: Check Heroku logs regularly
3. **Gather feedback**: Ask users for improvement suggestions
4. **Consider upgrade**: When you need more performance

## Support

If you run into issues:
1. Check the logs (Heroku/Vercel)
2. Verify environment variables
3. Test API endpoints directly
4. Check MongoDB connection

Your JobBoard is now live and ready for users! The free tiers are generous enough for a small to medium-sized job board application.
