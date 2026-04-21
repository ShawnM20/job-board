#!/bin/bash

# Quick Deployment Script for JobBoard
echo "JobBoard Deployment Script"
echo "=========================="

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Ask for domain
read -p "Enter your domain (or leave blank for localhost): " DOMAIN

# Update environment files
if [ ! -z "$DOMAIN" ]; then
    echo "Setting up for domain: $DOMAIN"
    
    # Update frontend .env.production
    sed -i "s|https://your-backend-domain.com/api|https://$DOMAIN/api|g" job-board-frontend/.env.production
    
    # Create production .env for backend
    cat > .env << EOF
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://admin:jobboard123@mongodb:27017/jobboard?authSource=admin
JWT_SECRET=jobboard-super-secret-jwt-key-$(date +%s)
EOF
else
    echo "Setting up for localhost"
    
    # Create development .env
    cat > .env << EOF
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://admin:jobboard123@mongodb:27017/jobboard?authSource=admin
JWT_SECRET=jobboard-super-secret-jwt-key-$(date +%s)
EOF
fi

# Build and deploy
echo "Building and deploying..."
docker-compose down
docker-compose build
docker-compose up -d

echo "Deployment complete!"
echo "==================="

if [ ! -z "$DOMAIN" ]; then
    echo "Your application is available at: https://$DOMAIN"
    echo "Backend API: https://$DOMAIN/api"
else
    echo "Your application is available at: http://localhost:5000"
    echo "Frontend: http://localhost:3000 (if running separately)"
fi

echo ""
echo "To view logs: docker-compose logs -f"
echo "To stop: docker-compose down"
echo "To restart: docker-compose restart"
