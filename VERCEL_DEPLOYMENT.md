# Vercel Deployment Guide for JobBoard

## Quick Setup Guide

### Prerequisites
- Vercel account (free)
- GitHub account
- MongoDB Atlas account (free)

## Step 1: Setup MongoDB Atlas
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user with password
4. Get your connection string
5. Add your IP to whitelist (or use 0.0.0.0/0 for all)

## Step 2: Deploy Backend

### 2.1 Push Backend to GitHub
```bash
cd job-board-backend
git init
git add .
git commit -m "Initial backend deployment"
git branch -M main
git remote add origin https://github.com/yourusername/job-board-backend.git
git push -u origin main
```

### 2.2 Deploy to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your backend GitHub repository
4. Vercel will auto-detect Node.js
5. Add environment variables:
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A strong random string (use: `openssl rand -base64 32`)
6. Click "Deploy"

### 2.3 Get Backend URL
After deployment, Vercel will give you a URL like:
`https://job-board-backend-xyz.vercel.app`

## Step 3: Deploy Frontend

### 3.1 Update API Configuration
The frontend is already configured to use environment variables. Just need to set the production URL.

### 3.2 Push Frontend to GitHub
```bash
cd job-board-frontend
git init
git add .
git commit -m "Initial frontend deployment"
git branch -M main
git remote add origin https://github.com/yourusername/job-board-frontend.git
git push -u origin main
```

### 3.3 Deploy to Vercel
1. Go to Vercel Dashboard
2. Click "New Project"
3. Import your frontend GitHub repository
4. Vercel will auto-detect React/Vite
5. Add environment variable:
   - `VITE_API_URL`: Your backend URL (e.g., `https://job-board-backend-xyz.vercel.app`)
6. Click "Deploy"

## Step 4: Post-Deployment Testing

### Test Your Application
1. **Backend Health Check**: Visit `https://your-backend.vercel.app/api/jobs`
2. **Frontend Loading**: Visit `https://your-frontend.vercel.app`
3. **User Registration**: Create a new user account
4. **Company Registration**: Create a company account
5. **Job Posting**: Post a test job
6. **Applications**: Apply to a job
7. **Profile Management**: Test profile updates
8. **Bookmarking**: Test job bookmarking

## Environment Variables Summary

### Backend Environment Variables
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/jobboard
JWT_SECRET=your-super-secret-jwt-key-here
```

### Frontend Environment Variables
```env
VITE_API_URL=https://your-backend-url.vercel.app
```

## Common Issues & Solutions

### Issue: CORS Errors
**Solution**: Backend CORS is already configured, but ensure frontend URL is allowed
```javascript
// In server.js - already configured
const cors = require('cors');
app.use(cors({
  origin: ['https://your-frontend.vercel.app', 'http://localhost:5173'],
  credentials: true
}));
```

### Issue: Database Connection
**Solution**: Check MongoDB URI format and IP whitelist
- Ensure URI includes database name
- Add Vercel IPs to MongoDB whitelist
- Use `mongodb+srv://` for Atlas

### Issue: File Uploads Not Working
**Solution**: Vercel serverless has size limits
- Keep profile pictures under 4.5MB
- Use image compression before upload

### Issue: 404 Errors
**Solution**: Check API routes and Vercel configuration
- Backend routes are configured in `vercel.json`
- Frontend routes are handled by React Router

## Deployment Commands

### Local Testing Before Deploy
```bash
# Backend
cd job-board-backend
npm install
npm run dev

# Frontend  
cd job-board-frontend
npm install
npm run dev
```

### Production Build Test
```bash
# Frontend build test
cd job-board-frontend
npm run build
npm run preview
```

## Vercel Configuration Files

Your projects already have the correct configuration:

### Backend vercel.json ✅
```json
{
  "version": 2,
  "name": "job-board-backend",
  "builds": [{"src": "server.js", "use": "@vercel/node"}],
  "routes": [{"src": "/api/(.*)", "dest": "/server.js"}],
  "env": {
    "MONGO_URI": "@mongo_uri",
    "JWT_SECRET": "@jwt_secret"
  }
}
```

### Frontend vercel.json ✅
```json
{
  "version": 2,
  "builds": [{"src": "package.json", "use": "@vercel/static-build"}],
  "routes": [{"src": "/(.*)", "dest": "/index.html"}],
  "env": {"VITE_API_URL": "@api_url"}
}
```

## Quick Deployment Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Backend deployed to Vercel
- [ ] Backend environment variables set
- [ ] Frontend deployed to Vercel  
- [ ] Frontend environment variables set
- [ ] User registration works
- [ ] Company registration works
- [ ] Job posting works
- [ ] Job applications work
- [ ] Profile management works
- [ ] Bookmarking works
- [ ] File uploads work

## URLs After Deployment

Your live URLs will be:
- **Backend**: `https://job-board-backend-[random].vercel.app`
- **Frontend**: `https://job-board-frontend-[random].vercel.app`

You can also connect custom domains in Vercel dashboard for professional URLs.

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify environment variables are set correctly
3. Test individual API endpoints
4. Check MongoDB Atlas connection
5. Review Vercel function logs

Your JobBoard will be live and ready for users! 🚀
