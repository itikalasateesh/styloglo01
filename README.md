# 🎨 StyloGlo - AI-Powered Style Transformation

## ⚠️ Try On Feature Setup Required

The **Try On** button requires a **free Google Gemini API key** to work.

### 🚀 Quick Setup (Choose One)

#### Option 1: Interactive Script (Easiest)
```bash
./setup-api-key.sh
```

#### Option 2: Manual Setup
```bash
# 1. Get your free API key
open https://aistudio.google.com/app/apikey

# 2. Create .env file
echo "GEMINI_API_KEY=your_key_here" > .env

# 3. Restart server
npm run dev
```

### 📚 Detailed Guides

- **Setup Guide**: See `TRY_ON_SETUP_GUIDE.md` for step-by-step instructions
- **Fix Summary**: See `TRY_ON_FIX_SUMMARY.md` for technical details

---

## ✨ Features

### 1. **Face Analysis** 
- AI-powered gender detection
- Face shape analysis
- Skin tone identification
- Personalized recommendations

### 2. **Style Recommendations**
- **Hair**: Gender-specific hairstyles
- **Makeup**: Lipstick, eyeshadow, eyelashes (Female)
- **Beard**: Styles for different face shapes (Male)
- **Accessories**: Sunglasses, earrings, tattoos
- **Colors**: Outfit colors matching skin tone

### 3. **Try On Feature** (Requires API Key)
- AI-powered image transformation
- Apply any recommended style to your photo
- See realistic previews before committing
- Undo/Reset functionality

### 4. **Social Sharing**
- WhatsApp integration
- Instagram sharing
- Custom share messages

### 5. **Shopping Integration**
- Amazon product search
- Find nearby salons/barbers
- Location-based recommendations

---

## 🎯 How to Use

1. **Login/Sign Up** on the home screen
2. **Upload Photo** or use camera
3. **Wait for AI Analysis** (enhanced 3D scanning)
4. **Browse Recommendations** by category
5. **Click "TRY ON"** to see styles on your photo
6. **Share** your look on WhatsApp or Instagram

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS
- **AI**: Google Gemini 2.5 Flash
- **Image Processing**: Base64 encoding

---

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser
open http://localhost:3000
```

---

## 🔑 Environment Variables

Create a `.env` file in the project root:

```bash
# Required for Try On feature
GEMINI_API_KEY=your_gemini_api_key_here

# Get your free key at:
# https://aistudio.google.com/app/apikey
```

---

## 🎨 Recent Updates

### ✅ Enhanced 3D Scanning
- Clearer, more visible scanning beams
- Precise facial landmark detection (8 points)
- Auto-stop after scan completes
- Progressive status updates

### ✅ Gender-Specific UI
- Dynamic outfit icons (👔 for men, 👗 for women)
- Gender-appropriate recommendations
- Tailored style suggestions

### ✅ Social Sharing
- WhatsApp button with pre-filled message
- Instagram integration
- Easy sharing workflow

### ✅ Try On Fix
- Clear error messages when API key missing
- One-click link to get API key
- Better error handling
- Setup scripts and guides

---

## 📝 Project Structure

```
styloglo/
├── components/
│   ├── AnalysisResult.tsx    # Style recommendations
│   ├── Scanner.tsx            # 3D face scanning
│   ├── StyleEditor.tsx        # Try On feature
│   ├── LoginPage.tsx          # Authentication
│   └── ...
├── services/
│   └── geminiService.ts       # AI integration
├── types/
│   └── index.ts               # TypeScript types
├── .env                       # API keys (create this)
├── setup-api-key.sh          # Setup helper script
└── TRY_ON_SETUP_GUIDE.md     # Detailed guide
```

---

## 🐛 Troubleshooting

### Try On Button Not Working?
1. Check if `.env` file exists
2. Verify `GEMINI_API_KEY` is set correctly
3. Restart the dev server
4. See `TRY_ON_SETUP_GUIDE.md` for details

### Blank Screen After Upload?
1. Check browser console (F12)
2. Ensure image is clear and well-lit
3. Try a different photo
4. Refresh the page

### Gender Detection Wrong?
1. Add your Gemini API key for accurate detection
2. Without API key, it defaults to "Male"
3. See `SETUP_GENDER_DETECTION.md`

---

## 📞 Support

For issues or questions:
1. Check the guides in the project root
2. Review browser console for errors
3. Ensure all dependencies are installed
4. Verify API key is valid

---

## 🎉 Ready to Start?

```bash
# 1. Set up your API key
./setup-api-key.sh

# 2. Start the app
npm run dev

# 3. Open in browser
# http://localhost:3000

# 4. Upload a photo and try it out!
```

---

**Made with ❤️ using Google Gemini AI**