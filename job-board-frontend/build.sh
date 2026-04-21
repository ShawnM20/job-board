#!/bin/bash

# Build script for production deployment
echo "Building JobBoard Frontend for Production..."

# Install dependencies
echo "Installing dependencies..."
npm install

# Build for production
echo "Building for production..."
npm run build

echo "Build complete! The dist folder contains your production-ready files."
echo "You can now deploy the dist folder to your hosting service."
