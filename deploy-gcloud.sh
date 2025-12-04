#!/bin/bash

# StyloGlo - Google Cloud Run Deployment Script
# This script automates the deployment process to Google Cloud Run

set -e  # Exit on error

echo "🚀 StyloGlo - Google Cloud Run Deployment"
echo "=========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Configuration
SERVICE_NAME="styloglo"
REGION="us-central1"
PLATFORM="managed"
PORT=8080
MEMORY="512Mi"
CPU=1
MIN_INSTANCES=0
MAX_INSTANCES=10

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo -e "${RED}❌ Error: gcloud CLI is not installed${NC}"
    echo "Please install it from: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

echo -e "${GREEN}✓ gcloud CLI found${NC}"

# Check if user is logged in
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" &> /dev/null; then
    echo -e "${YELLOW}⚠️  Not logged in to Google Cloud${NC}"
    echo "Logging in..."
    gcloud auth login
fi

# Get current project
PROJECT_ID=$(gcloud config get-value project 2>/dev/null)

if [ -z "$PROJECT_ID" ]; then
    echo -e "${YELLOW}⚠️  No project set${NC}"
    echo "Please enter your Google Cloud Project ID:"
    read -r PROJECT_ID
    gcloud config set project "$PROJECT_ID"
fi

echo -e "${GREEN}✓ Using project: $PROJECT_ID${NC}"
echo ""

# Ask for Gemini API key
echo "Do you want to set/update the GEMINI_API_KEY? (y/n)"
read -r SET_API_KEY

if [ "$SET_API_KEY" = "y" ] || [ "$SET_API_KEY" = "Y" ]; then
    echo "Enter your Gemini API Key:"
    read -r GEMINI_API_KEY
    ENV_VARS="--update-env-vars GEMINI_API_KEY=$GEMINI_API_KEY"
else
    ENV_VARS=""
fi

echo ""
echo "📦 Deployment Configuration:"
echo "   Service Name: $SERVICE_NAME"
echo "   Region: $REGION"
echo "   Memory: $MEMORY"
echo "   CPU: $CPU"
echo "   Min Instances: $MIN_INSTANCES"
echo "   Max Instances: $MAX_INSTANCES"
echo ""

echo "Proceed with deployment? (y/n)"
read -r CONFIRM

if [ "$CONFIRM" != "y" ] && [ "$CONFIRM" != "Y" ]; then
    echo "Deployment cancelled."
    exit 0
fi

echo ""
echo "🔧 Enabling required APIs..."
gcloud services enable cloudbuild.googleapis.com --quiet
gcloud services enable run.googleapis.com --quiet
echo -e "${GREEN}✓ APIs enabled${NC}"

echo ""
echo "🏗️  Building and deploying to Cloud Run..."
echo "This may take a few minutes..."
echo ""

# Deploy to Cloud Run
if gcloud run deploy "$SERVICE_NAME" \
    --source . \
    --platform "$PLATFORM" \
    --region "$REGION" \
    --allow-unauthenticated \
    --port "$PORT" \
    --memory "$MEMORY" \
    --cpu "$CPU" \
    --min-instances "$MIN_INSTANCES" \
    --max-instances "$MAX_INSTANCES" \
    $ENV_VARS; then
    
    echo ""
    echo -e "${GREEN}✅ Deployment successful!${NC}"
    echo ""
    
    # Get service URL
    SERVICE_URL=$(gcloud run services describe "$SERVICE_NAME" \
        --region "$REGION" \
        --format 'value(status.url)')
    
    echo "🌐 Your app is live at:"
    echo -e "${GREEN}$SERVICE_URL${NC}"
    echo ""
    
    echo "📊 View logs:"
    echo "   gcloud run services logs read $SERVICE_NAME --region $REGION"
    echo ""
    
    echo "🔧 Update environment variables:"
    echo "   gcloud run services update $SERVICE_NAME --update-env-vars KEY=VALUE --region $REGION"
    echo ""
    
    echo "🗑️  Delete service:"
    echo "   gcloud run services delete $SERVICE_NAME --region $REGION"
    echo ""
    
    # Ask to open in browser
    echo "Open in browser? (y/n)"
    read -r OPEN_BROWSER
    
    if [ "$OPEN_BROWSER" = "y" ] || [ "$OPEN_BROWSER" = "Y" ]; then
        open "$SERVICE_URL" || xdg-open "$SERVICE_URL" || echo "Please open: $SERVICE_URL"
    fi
    
else
    echo ""
    echo -e "${RED}❌ Deployment failed${NC}"
    echo "Check the logs above for error details"
    exit 1
fi
