#!/bin/bash

# StyloGlo - Quick Setup Script for Try On Feature
# This script helps you set up the Gemini API key

echo "🎨 StyloGlo - Try On Feature Setup"
echo "=================================="
echo ""

# Check if .env already exists
if [ -f ".env" ]; then
    echo "⚠️  .env file already exists!"
    echo ""
    read -p "Do you want to update it? (y/n): " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Setup cancelled."
        exit 0
    fi
fi

echo ""
echo "📝 To use the Try On feature, you need a free Gemini API key."
echo ""
echo "Step 1: Get your API key"
echo "   Visit: https://aistudio.google.com/app/apikey"
echo "   Sign in and click 'Create API Key'"
echo ""
echo "Step 2: Enter your API key below"
echo ""

# Prompt for API key
read -p "Enter your Gemini API Key (starts with AIza...): " api_key

# Validate API key format
if [[ ! $api_key =~ ^AIza ]]; then
    echo ""
    echo "❌ Invalid API key format. Keys should start with 'AIza'"
    echo "   Please get your key from: https://aistudio.google.com/app/apikey"
    exit 1
fi

# Create .env file
echo "# Google Gemini AI API Key" > .env
echo "# Generated on: $(date)" >> .env
echo "GEMINI_API_KEY=$api_key" >> .env

echo ""
echo "✅ Success! .env file created with your API key."
echo ""
echo "📋 Next steps:"
echo "   1. Restart your dev server (Ctrl+C, then 'npm run dev')"
echo "   2. Upload a photo in the app"
echo "   3. Click 'TRY ON' on any style recommendation"
echo ""
echo "🎉 You're all set! Enjoy the Try On feature!"
echo ""
