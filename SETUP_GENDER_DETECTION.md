# Setting Up Gender Detection

## Quick Fix (Temporary)
The app now defaults to "Male" in mock mode. To get accurate gender detection, follow the steps below.

## Proper Setup (Recommended)

### 1. Get Your Gemini API Key
1. Visit: https://aistudio.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key

### 2. Create .env File
Create a file named `.env` in the project root directory:

```bash
# In the styloglo directory
touch .env
```

### 3. Add Your API Key
Open the `.env` file and add:

```
GEMINI_API_KEY=your_actual_api_key_here
```

Replace `your_actual_api_key_here` with the key you copied from Google AI Studio.

### 4. Restart the Development Server
Stop the current server (Ctrl+C) and restart:

```bash
npm run dev
```

## How It Works

- **With API Key**: The app uses Google's Gemini AI to accurately analyze facial features and detect gender
- **Without API Key**: The app uses mock data (currently defaults to Male with generic recommendations)

## Verification

After adding the API key, you should see:
- Accurate gender detection
- Personalized style recommendations based on your actual features
- Real-time AI-powered image analysis
