# JobBoard Deployment Guide

This guide will help you deploy your JobBoard application so anyone can use it.

## Overview

Your JobBoard application consists of:
- **Backend**: Node.js/Express API with MongoDB database
- **Frontend**: React/Vite application with professional UI

## Deployment Options

### Option 1: Docker Deployment (Recommended)

#### Prerequisites
- Docker and Docker Compose installed
- Domain name (optional, but recommended)

#### Steps

1. **Prepare Environment Variables**
   
   Create a `.env` file in the backend directory:
   ```env
   NODE_ENV=production
   MONGODB_URI=mongodb://admin:yourpassword@mongodb:27017/jobboard?authSource=admin
   JWT_SECRET=your-super-secret-jwt-key
   PORT=5000
   ```

2. **Update Frontend API URL**
   
   Edit `job-board-frontend/.env.production`:
   ```env
   VITE_API_URL=https://your-domain.com/api
   ```

3. **Build and Deploy**
   
   ```bash
   # In the backend directory
   docker-compose up -d
   ```

4. **Set up Reverse Proxy (Optional)**
   
   Use Nginx or Caddy to handle HTTPS and serve both frontend and backend.

#### Docker Commands
```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Update application
git pull
docker-compose build
docker-compose up -d
```

### Option 2: Cloud Platform Deployment

#### Frontend Deployment Options

**Vercel (Easiest)**
```bash
# Install Vercel CLI
npm i -g vercel

# In frontend directory
cd job-board-frontend
vercel --prod
```

**Netlify**
```bash
# Build frontend
cd job-board-frontend
npm run build

# Deploy dist folder to Netlify
```

**AWS S3 + CloudFront**
- Upload `dist` folder to S3 bucket
- Configure CloudFront distribution
- Set up custom domain

#### Backend Deployment Options

**Heroku**
```bash
# Install Heroku CLI
heroku create your-app-name

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your-mongodb-connection-string
heroku config:set JWT_SECRET=your-jwt-secret

# Deploy
git push heroku main
```

**DigitalOcean**
```bash
# Create Droplet with Docker
# Use docker-compose.yml file
docker-compose up -d
```

**AWS EC2**
```bash
# Launch EC2 instance
# Install Docker
# Deploy using docker-compose
```

### Option 3: VPS Deployment

#### Server Setup
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Clone repository
git clone your-repo-url
cd job-board-backend

# Deploy
docker-compose up -d
```

#### SSL Certificate Setup
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d your-domain.com
```

## Environment Configuration

### Backend Environment Variables
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://username:password@host:port/database
JWT_SECRET=your-super-secret-jwt-key
```

### Frontend Environment Variables
```env
VITE_API_URL=https://your-backend-domain.com/api
```

## Database Setup

### MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Get connection string
4. Update environment variables

### Self-hosted MongoDB
```bash
# Using Docker
docker run -d -p 27017:27017 --name mongodb mongo:6.0

# Or using docker-compose
docker-compose up mongodb
```

## Security Considerations

1. **Use HTTPS**: Always use SSL certificates
2. **Environment Variables**: Never commit secrets to git
3. **Database Security**: Use strong passwords and network restrictions
4. **API Security**: Implement rate limiting and input validation
5. **CORS**: Configure CORS properly for your domain

## Monitoring and Maintenance

### Health Checks
Add health check endpoint to backend:
```javascript
// server.js
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});
```

### Logging
```javascript
// Add logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});
```

### Backup Strategy
```bash
# MongoDB backup
mongodump --uri="your-mongodb-uri" --out=/backup/$(date +%Y%m%d)

# Automated backup script
#!/bin/bash
BACKUP_DIR="/backup/$(date +%Y%m%d)"
mkdir -p $BACKUP_DIR
mongodump --uri="$MONGODB_URI" --out=$BACKUP_DIR
```

## Performance Optimization

### Frontend
- Enable gzip compression
- Use CDN for static assets
- Implement caching strategies
- Optimize images and fonts

### Backend
- Use connection pooling for database
- Implement caching (Redis)
- Use load balancer for scaling
- Monitor resource usage

## Domain and DNS Setup

1. **Purchase Domain**: Get domain from registrar
2. **DNS Configuration**: Point A record to your server IP
3. **SSL Certificate**: Use Let's Encrypt (free) or purchase
4. **Email Setup**: Configure professional email (optional)

## Troubleshooting

### Common Issues

**Frontend not loading API**
- Check CORS configuration
- Verify API URL in environment variables
- Check network connectivity

**Database connection issues**
- Verify MongoDB URI
- Check network connectivity
- Ensure database is running

**Deployment failures**
- Check logs for errors
- Verify environment variables
- Ensure all dependencies are installed

### Useful Commands
```bash
# Check Docker containers
docker ps

# View container logs
docker logs container-name

# Restart services
docker-compose restart

# Check server resources
htop
df -h
free -h
```

## Cost Estimation

### Free Options
- Frontend: Vercel/Netlify (free tier)
- Backend: Heroku (free tier) or VPS ($5-10/month)
- Database: MongoDB Atlas (free tier)

### Paid Options
- VPS: $5-50/month depending on specs
- Managed Database: $9-100/month
- CDN: $0-20/month

## Next Steps

1. Choose deployment option based on your needs and budget
2. Set up domain and SSL certificates
3. Configure environment variables
4. Deploy application
5. Set up monitoring and backups
6. Test thoroughly
7. Launch to users!

## Support

If you encounter issues:
1. Check logs for error messages
2. Verify all configurations
3. Test individual components
4. Consult documentation for specific platforms

Remember to start with a simple deployment and scale as your user base grows!
