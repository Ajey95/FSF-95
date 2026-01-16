# PROJECT: ASD Communication Assistant (React Lab Edition)

## 1. OVERVIEW

The ASD Communication Assistant is a React-based web application designed to aid individuals with Autism Spectrum Disorder (ASD) in navigating digital communication. It simulates a WhatsApp Web interface and provides real-time AI analysis of messages to detect emotional tone, hidden sarcasm, and safety risks.

This project features a "Hybrid AI Architecture" that seamlessly switches between Cloud Intelligence (Google Gemini) and Offline Local NLP if the internet fails.

---

## 2. KEY FEATURES

### Hybrid AI Intelligence

- **Primary**: Google Gemini 2.5 Flash (Cloud) for deep context awareness.
- **Fallback**: Local NLP (Sentiment.js + Compromise) for offline reliability.

### Contextual Analysis

- Detects Sarcasm, Anger, and Passive-Aggressive tones.
- Simplifies complex social cues into literal, easy-to-understand language.

### Safety & Risk Detection

- Flags manipulative language, scams, and bullying.
- Highlights keywords like `"password"`, `"money"`, or `"secret"`.

### Inline Smart Assistant

- "Analyze Intent" button integrated directly into chat bubbles.
- Glass-morphic popup cards show analysis without leaving the chat flow.

### Chatbot Companion (Sidebar)

- A slide-out AI assistant that can summarize the entire conversation history.
- Answer questions like "Why is this person angry?" based on chat context.

---

## 3. TECH STACK

- **Frontend Framework**: React.js (Vite)
- **Styling**: Tailwind CSS v4 (Glassmorphism & Responsive Design)
- **AI Integration**: Google Generative AI SDK (`@google/generative-ai`)
- **Local NLP**: `Sentiment.js`, `Compromise.js`
- **Icons**: Lucide React

---

## 4. INSTALLATION & SETUP

### Prerequisites

Node.js (v18 or higher)

### Step 1: Clone or Download the Project
```bash
git clone <repository-url>
cd asd-assistant-lab
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables

1. Create a file named `.env` in the root directory.
2. Add your Google Gemini API Key:
```env
VITE_GEMINI_API_KEY=your_actual_api_key_here
```

**Note:** *If you don't have a key, the app will auto-switch to Offline Mode.*

### Step 4: Start the Development Server
```bash
npm run dev
```

Open the URL shown (usually `http://localhost:5173`).

---

## 5. HOW TO TEST THE FEATURES (DEMO GUIDE)

### Testing Cloud AI (Normal Mode)

1. Ensure `.env` has a valid API Key.
2. Click "Analyze Intent" on any incoming message.
3. Verify the badge says "CLOUD INTELLIGENCE" (Blue).

### Testing Offline Fallback (Resiliency)

1. Go to `.env` and corrupt the key (e.g., delete the last letter).
2. Restart the server (`npm run dev`).
3. Click "Analyze Intent".
4. Verify the badge says "OFFLINE MODE" (Orange) and analysis still works.

### Testing the Chatbot

1. Click the "ASD Assistant Active" badge in the top header.
2. The sidebar will slide open.
3. It will automatically summarize the chat history (if Cloud is active).

---

## 6. FILE STRUCTURE EXPLANATION
```
/src
  ├── /services          # Business Logic (API calls & NLP processing)
  │   ├── geminiService.js    # Cloud AI logic
  │   └── localNlpService.js  # Offline fallback logic
  ├── /hooks             # Custom React Hooks
  │   └── useMessageAnalysis.js # Decides which service to use (Cloud vs Local)
  ├── /components        # UI Components
  │   ├── ChatBubble.jsx      # Message display + Analyze trigger
  │   ├── AnalysisCard.jsx    # The popup result card
  │   └── ChatbotSidebar.jsx  # The slide-out assistant
  └── App.jsx            # Main layout and state management
```

---

## 7. ARCHITECTURE OVERVIEW

### Hybrid Intelligence Flow
```
User Message → useMessageAnalysis Hook
    ↓
Cloud Available? 
    ├─ YES → geminiService.js (Gemini 2.5 Flash)
    └─ NO  → localNlpService.js (Sentiment + Compromise)
    ↓
Analysis Result → AnalysisCard.jsx (Display)
```

### Key Components

- **ChatBubble.jsx**: Renders individual messages with "Analyze Intent" button
- **AnalysisCard.jsx**: Glass-morphic popup displaying tone, emotion, and safety flags
- **ChatbotSidebar.jsx**: Conversational assistant for contextual questions
- **useMessageAnalysis.js**: Smart hook that handles fallback logic automatically

---

## 8. API INTEGRATION DETAILS

### Google Gemini Configuration
```javascript
// geminiService.js structure
- Model: gemini-2.0-flash-exp
- Temperature: 0.7 (balanced creativity)
- Max Tokens: 500
- Prompt Engineering: Specialized for ASD communication needs
```

### Local NLP Capabilities
```javascript
// localNlpService.js features
- Sentiment Analysis: Positive/Negative/Neutral scoring
- Keyword Detection: Safety-related terms
- Pattern Recognition: Basic sarcasm and question detection
```

---

## 9. CUSTOMIZATION GUIDE

### Modifying Analysis Prompts

Edit the prompt in `geminiService.js`:
```javascript
const prompt = `Analyze this message for someone with ASD...`;
```

### Adding New Safety Keywords

Update `localNlpService.js`:
```javascript
const dangerKeywords = ['password', 'money', 'secret', 'your-new-keyword'];
```

### Styling Adjustments

All styles use Tailwind CSS. Modify `tailwind.config.js` for theme changes:
```javascript
theme: {
  extend: {
    colors: {
      'asd-primary': '#your-color',
    }
  }
}
```

---

## 10. TROUBLESHOOTING

### Issue: "API Key Invalid" Error

**Solution**: Verify your `.env` file contains the correct key format:
```env
VITE_GEMINI_API_KEY=AIzaSy...
```

### Issue: Analysis Not Working

**Solution**: 
1. Check browser console for errors
2. Verify both services are properly imported in `useMessageAnalysis.js`
3. Test with a simple message first

### Issue: Sidebar Not Opening

**Solution**: Check that the header badge onClick handler is properly connected to the sidebar state.

---

## 11. FUTURE ENHANCEMENTS

- [ ] Multi-language support
- [ ] Voice message analysis
- [ ] Emoji emotion decoder
- [ ] Parent/caregiver monitoring dashboard
- [ ] Custom safety keyword configuration UI
- [ ] Conversation history export
- [ ] Integration with real messaging platforms (via APIs)

---

## 12. ACCESSIBILITY FEATURES

- High contrast mode support
- Screen reader compatible
- Keyboard navigation enabled
- ARIA labels on all interactive elements
- Focus indicators for all clickable items

---

## 13. PRIVACY & SECURITY

- No message data is stored on external servers
- Cloud API calls are encrypted via HTTPS
- API keys are environment-based (never hardcoded)
- Offline mode operates entirely client-side
- No third-party tracking or analytics

---

## 14. PERFORMANCE OPTIMIZATION

- Lazy loading for sidebar components
- Debounced API calls to prevent rate limiting
- Memoized analysis results
- Efficient re-rendering with React.memo
- Code splitting for faster initial load

---

## 15. TESTING CHECKLIST

- [ ] Cloud AI responds correctly to test messages
- [ ] Offline mode activates when API key is invalid
- [ ] Sidebar opens and closes smoothly
- [ ] Analysis cards display proper color coding
- [ ] Safety warnings trigger on risk keywords
- [ ] Responsive design works on mobile devices
- [ ] No console errors in production build

---

## 16. DEPLOYMENT

### Build for Production
```bash
npm run build
```

### Deploy to Vercel/Netlify

1. Connect your repository
2. Add environment variables in the hosting dashboard
3. Deploy with default Vite settings

### Environment Variables for Production
```env
VITE_GEMINI_API_KEY=your_production_api_key
```

---

## 17. CONTRIBUTING

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 18. LICENSE

MIT License - See LICENSE file for details

---

## 19. ACKNOWLEDGMENTS

- Google Generative AI team for Gemini API
- Autism research community for UX guidelines
- Open-source NLP libraries (Sentiment.js, Compromise.js)

---

## 20. CONTACT & SUPPORT

For questions, bug reports, or feature requests:
- Open an issue on GitHub
- Email: [your-email@example.com]
- Documentation: [project-wiki-url]

---

**Built with ❤️ to make digital communication accessible for everyone**