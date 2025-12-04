# 🎨 Try On Feature - Setup Guide

## Why "Try On" Button Isn't Working

The **Try On** feature uses Google's Gemini AI to apply style transformations to your photo. This requires a **free API key** from Google AI Studio.

## ✅ Quick Setup (5 Minutes)

### Step 1: Get Your Free API Key

1. Visit: **https://aistudio.google.com/app/apikey**
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Copy the generated key (starts with `AIza...`)

### Step 2: Create .env File

In your project root directory (`/Users/sateeshkumar/Desktop/styloglo`), create a file named `.env`:

```bash
# In terminal, run:
cd /Users/sateeshkumar/Desktop/styloglo
touch .env
```

### Step 3: Add Your API Key

Open the `.env` file and add:

```
GEMINI_API_KEY=AIzaSy...your_actual_key_here
```

**Important**: Replace `AIzaSy...your_actual_key_here` with your actual API key from Step 1.

### Step 4: Restart Development Server

Stop the current server (press `Ctrl+C` in terminal) and restart:

```bash
npm run dev
```

## 🎯 How Try On Works

Once configured, the Try On feature will:

1. **Analyze Your Photo**: Face structure, skin tone, and features
2. **Apply AI Transformation**: Based on the selected style recommendation
3. **Generate New Image**: Photorealistic transformation matching your features

### Examples of What You Can Try:

- **Hair Styles**: "Crew Cut", "Long Layers", "Bob Cut"
- **Makeup**: "Red Lipstick", "Smokey Eye"
- **Beard Styles**: "Full Beard", "Goatee", "Stubble"
- **Accessories**: Sunglasses, earrings, tattoos
- **Colors**: Different outfit colors matching your skin tone

## 🔒 Privacy & Security

- Your API key is stored locally in `.env` (never committed to git)
- Images are processed by Google's Gemini AI
- No data is stored permanently
- You control your API usage

## 💰 Cost

- **Free Tier**: 60 requests per minute
- **More than enough** for personal use
- No credit card required

## ❌ Troubleshooting

### Error: "API Key Required"
- Make sure `.env` file exists in project root
- Check that `GEMINI_API_KEY` is spelled correctly
- Verify your API key is valid (no extra spaces)
- Restart the dev server after creating `.env`

### Error: "Failed to generate image"
- Check your internet connection
- Verify API key is active at https://aistudio.google.com/app/apikey
- Try a simpler prompt
- Check API quota limits

### Image Doesn't Change
- Wait for the transformation to complete (shows loading animation)
- Check browser console for errors (F12)
- Ensure the original image is clear and well-lit

## 📝 Example .env File

```bash
# Google Gemini AI API Key
# Get yours at: https://aistudio.google.com/app/apikey
GEMINI_API_KEY=AIzaSyDxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Optional: Add other environment variables below
# NODE_ENV=development
```

## 🚀 Testing the Feature

After setup:

1. Upload or capture a photo
2. Wait for face analysis to complete
3. Browse style recommendations
4. Click **"TRY ON"** on any style
5. Watch the AI transformation happen!
6. Use **UNDO** or **RESET** if needed

## 📞 Need Help?

If you're still having issues:

1. Check the browser console (F12) for error messages
2. Verify `.env` file is in the correct location
3. Make sure you restarted the dev server
4. Try a different photo (clear, well-lit, front-facing)

---

**Ready to try it?** Get your API key now: https://aistudio.google.com/app/apikey
