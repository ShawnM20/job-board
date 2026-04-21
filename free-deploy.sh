#!/bin/bash

# Free Deployment Script for JobBoard
echo "JobBoard Free Deployment Setup"
echo "=============================="
echo ""

# Check for required tools
echo "Checking required tools..."

if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js first."
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "npm is not installed. Please install npm first."
    exit 1
fi

echo "Node.js and npm are installed!"

# Get user inputs
echo ""
echo "Please provide the following information:"
echo "======================================="

read -p "Enter your desired Heroku app name (e.g., my-jobboard): " HEROKU_APP_NAME
read -p "Enter your MongoDB password (save this!): " MONGO_PASSWORD
read -p "Enter your email (for Vercel): " EMAIL

# Update frontend .env.production
echo ""
echo "Updating frontend configuration..."
sed -i "s|https://your-backend-domain.com/api|https://$HEROKU_APP_NAME.herokuapp.com/api|g" job-board-frontend/.env.production

# Create MongoDB connection string
MONGO_URI="mongodb+srv://jobboard-admin:$MONGO_PASSWORD@jobboard-cluster.mongodb.net/jobboard"

echo ""
echo "MongoDB Connection String (copy this):"
echo "======================================="
echo "$MONGO_URI"
echo ""

# Create deployment instructions
cat > DEPLOY_INSTRUCTIONS.txt << EOF
Your Free Deployment Instructions
================================

1. MongoDB Atlas Setup:
   - Go to: https://www.mongodb.com/cloud/atlas
   - Create free account
   - Create free cluster named "jobboard-cluster"
   - Create database user: "jobboard-admin" with password: "$MONGO_PASSWORD"
   - Allow access from anywhere (0.0.0.0/0)
   - Use this connection string: $MONGO_URI

2. Backend Deployment (Heroku):
   commands:
   heroku create $HEROKU_APP_NAME
   heroku config:set NODE_ENV=production
   heroku config:set MONGODB_URI="$MONGO_URI"
   heroku config:set JWT_SECRET="jobboard-secret-$(date +%s)"
   git push heroku main

3. Frontend Deployment (Vercel):
   commands:
   cd job-board-frontend
   vercel login
   vercel --prod
   
   Then set environment variable in Vercel dashboard:
   Name: VITE_API_URL
   Value: https://$HEROKU_APP_NAME.herokuapp.com/api

4. Test your application:
   - Backend: https://$HEROKU_APP_NAME.herokuapp.com/api/jobs
   - Frontend: Your Vercel URL (shown after deployment)

Save this file for reference!
EOF

echo ""
echo "Setup complete! Here's what to do next:"
echo "======================================="
echo ""
echo "1. Follow the DEPLOY_INSTRUCTIONS.txt file"
echo "2. Set up MongoDB Atlas first"
echo "3. Deploy backend to Heroku"
echo "4. Deploy frontend to Vercel"
echo "5. Test your application"
echo ""
echo "Important URLs after deployment:"
echo "- Backend: https://$HEROKU_APP_NAME.herokuapp.com"
echo "- Frontend: Will be shown by Vercel after deployment"
echo ""
echo "Your MongoDB connection string has been saved to DEPLOY_INSTRUCTIONS.txt"
echo "Keep it secure!"
