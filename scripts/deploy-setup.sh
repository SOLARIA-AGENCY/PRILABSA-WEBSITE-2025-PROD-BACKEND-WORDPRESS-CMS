#!/bin/bash

# 🚀 PRILABSA-WEBSITE-2025 - Deployment Setup Script
# Este script automatiza la configuración inicial para Netlify

set -e  # Exit on any error

echo "🚀 PRILABSA-WEBSITE-2025 Deployment Setup"
echo "========================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -f "netlify.toml" ]; then
    print_error "Please run this script from the PRILABSA-WEBSITE-2025 root directory"
    exit 1
fi

print_status "Directory check passed"

# Check Node.js version
NODE_VERSION=$(node --version)
print_info "Node.js version: $NODE_VERSION"

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    print_info "Installing dependencies..."
    npm install
    print_status "Dependencies installed"
else
    print_status "Dependencies already installed"
fi

# Build project to verify everything works
print_info "Building project to verify setup..."
npm run build

if [ $? -eq 0 ]; then
    print_status "Build successful"
else
    print_error "Build failed - please fix errors before deployment"
    exit 1
fi

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    print_warning "Netlify CLI not found. Installing globally..."
    npm install -g netlify-cli
    print_status "Netlify CLI installed"
else
    print_status "Netlify CLI already installed"
fi

# Create environment file if it doesn't exist
if [ ! -f ".env" ]; then
    print_info "Creating .env file from template..."
    cp env.example .env
    print_warning "Please edit .env file with your specific values"
else
    print_status ".env file already exists"
fi

echo ""
print_info "=========================================="
print_info "🎯 NEXT STEPS:"
print_info "=========================================="
echo ""
print_info "1. Login to Netlify:"
echo "   netlify login"
echo ""
print_info "2. Initialize Netlify project:"
echo "   netlify init"
echo ""
print_info "3. Deploy to staging:"
echo "   netlify deploy --build"
echo ""
print_info "4. Deploy to production:"
echo "   netlify deploy --prod"
echo ""
print_info "5. Configure environment variables in Netlify dashboard:"
echo "   - VITE_SITE_URL"
echo "   - VITE_CONTACT_EMAIL"
echo "   - VITE_WHATSAPP_NUMBER"
echo ""
print_info "=========================================="
print_status "Setup completed successfully!"
print_info "Review DEPLOYMENT_PLAN.md for detailed instructions" 