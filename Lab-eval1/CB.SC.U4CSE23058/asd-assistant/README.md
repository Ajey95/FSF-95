# PROJECT: ASD Communication Assistant (React Lab Edition)
LIVE: [Demo](https://fsf-95-lor3-rcwaanax6-ajeyas-projects-ac1f8c11.vercel.app/)
## 1. OVERVIEW

The ASD Communication Assistant is a React-based web application designed to aid individuals with Autism Spectrum Disorder (ASD) in navigating digital communication. It simulates a WhatsApp Web interface and provides real-time AI analysis of messages to detect emotional tone, hidden sarcasm, and safety risks.

This project features a "Hybrid AI Architecture" that seamlessly switches between Cloud Intelligence (Google Gemini) and Offline Local NLP if the internet fails. The application includes advanced React concepts such as **React Router** for navigation, **Class Components** for footer rendering, and a comprehensive **Settings page** for personalized user configuration.

---

## 2. KEY FEATURES

### Hybrid AI Intelligence

- **Primary**: Google Gemini 2.5 Flash Lite (Cloud) for deep context awareness.
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

- A slide-out AI assistant that can summarize the entire conversation history automatically.
- Answer questions like "Why is this person angry?" based on chat context.
- Auto-summarizes chat history when opened (Cloud mode only).

### Interactive Messaging

- Real-time message composition with functional input field.
- Send messages by clicking the Send button or pressing Enter.
- Messages dynamically update the chat with timestamps.
- Auto-scroll to newest messages for seamless conversation flow.

### Multi-Page Navigation

- **React Router** implementation with two main routes:
  - **Chat Interface** (`/`) - Main WhatsApp-style messaging interface
  - **Settings Page** (`/settings`) - Comprehensive user configuration panel
- Navigation links in the header for easy page switching.

### Advanced Settings Configuration

- **AI Persona Selection**: Choose between Direct, Friendly, or Educational interpretation styles.
- **Sarcasm Sensitivity Slider**: Adjustable detection threshold (0-100%).
- **Accessibility Options**: 
  - Reduce Motion toggle
  - High Contrast mode
- **Safety Features**:
  - Custom trigger words input
  - Emergency contact configuration
- **Form State Management**: Auto-saves draft preferences to localStorage.
- **Visual Feedback**: Save confirmation with animated success message.

---

## 3. TECH STACK

- **Frontend Framework**: React.js (Vite)
- **Routing**: React Router DOM v7 (Multi-page navigation)
- **Styling**: Tailwind CSS v4 (Glassmorphism & Responsive Design)
- **AI Integration**: Google Generative AI SDK (`@google/generative-ai`)
- **Local NLP**: `Sentiment.js`, `Compromise.js`
- **Icons**: Lucide React
- **State Management**: React Hooks (useState, useEffect, useRef)
- **Component Architecture**: Functional Components + Class Components

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

### Testing the Chatbot Sidebar

1. Click the "ASD Assistant Active" badge in the top header.
2. The sidebar will slide open.
3. It will automatically summarize the chat history (if Cloud is active).
4. Type questions like "Why is this person upset?" to get contextual answers.

### Testing Interactive Messaging

1. Navigate to the home page (Chat interface).
2. Type a message in the input field at the bottom.
3. Press **Enter** or click the **Send** button.
4. Verify the message appears in the chat with a timestamp.
5. Watch the auto-scroll behavior as new messages are added.

### Testing Navigation (React Router)

1. Observe the navigation links in the header: **Chat** and **Settings**.
2. Click on **Settings** to navigate to `/settings` route.
3. Verify the settings form appears with all configuration options.
4. Click on **Chat** to return to the main messaging interface (`/`).
5. Confirm smooth transitions between pages.

### Testing the Settings Page

1. Navigate to the Settings page using the header link.
2. Test each form element:
   - Change **AI Persona** dropdown (Direct, Friendly, Educational).
   - Adjust **Sarcasm Sensitivity** slider (0-100%).
   - Toggle **Reduce Motion** checkbox.
   - Toggle **High Contrast** checkbox.
   - Enter custom **Trigger Words** (comma-separated).
   - Enter an **Emergency Contact** email or phone.
3. Click the **Save Preferences** button.
4. Verify the green success message appears: "✓ Saved Successfully!"
5. Check browser console to see saved preferences object.
6. Refresh the page and verify draft auto-saves persist in localStorage.

### Testing the Class Component Footer

1. Navigate to any page in the application.
2. Scroll to the bottom to view the footer.
3. Verify it displays: "© 2026 ASD Assistant. Lab Eval 1 Submission. System: Online"
4. Confirm the footer is rendered using a React Class Component.

---

## 6. FILE STRUCTURE EXPLANATION
```
/src
  ├── /services          # Business Logic (API calls & NLP processing)
  │   ├── geminiService.js    # Cloud AI logic (Gemini 2.5 Flash Lite)
  │   └── localNlpService.js  # Offline fallback logic
  ├── /hooks             # Custom React Hooks
  │   └── useMessageAnalysis.js # Decides which service to use (Cloud vs Local)
  ├── /components        # UI Components
  │   ├── ChatBubble.jsx      # Message display + Analyze trigger
  │   ├── AnalysisCard.jsx    # The popup result card
  │   ├── ChatbotSidebar.jsx  # The slide-out assistant with auto-summarization
  │   ├── Settings.jsx        # Settings form page (controlled components)
  │   ├── Footer.jsx          # Class Component for footer rendering
  │   └── SafetyAlert.jsx     # Safety warning component
  ├── /utils             # Helper Functions
  │   └── helpers.js          # Utility functions
  └── App.jsx            # Main layout, routing, and state management
```

---

## 7. ARCHITECTURE OVERVIEW

### Hybrid Intelligence Flow
```
User Message → useMessageAnalysis Hook
    ↓
Cloud Available? 
    ├─ YES → geminiService.js (Gemini 2.5 Flash Lite)
    └─ NO  → localNlpService.js (Sentiment + Compromise)
    ↓
Analysis Result → AnalysisCard.jsx (Display)
```

### Application Structure
```
App.jsx (Router Provider)
    ↓
    ├─ Route "/" → Home Component (Chat Interface)
    │   ├─ ChatBubble (Message rendering)
    │   ├─ Message Input (Send functionality)
    │   └─ ChatbotSidebar (Contextual AI assistant)
    │
    ├─ Route "/settings" → Settings Component (Form page)
    │   ├─ Controlled Form Elements
    │   ├─ localStorage Integration
    │   └─ Save Confirmation Feedback
    │
    └─ Footer (Class Component - Persistent across routes)
```

### Key Components

- **App.jsx**: Main application wrapper with React Router, manages global state and routing logic
- **Home Component**: Stateless functional component for the chat interface
- **ChatBubble.jsx**: Renders individual messages with "Analyze Intent" button
- **AnalysisCard.jsx**: Glass-morphic popup displaying tone, emotion, and safety flags
- **ChatbotSidebar.jsx**: Conversational assistant with auto-summarization feature for contextual questions
- **Settings.jsx**: Comprehensive settings form with controlled components and localStorage persistence
- **Footer.jsx**: Class component demonstrating traditional React class syntax
- **useMessageAnalysis.js**: Smart hook that handles fallback logic automatically

---

## 8. API INTEGRATION DETAILS

### Google Gemini Configuration
```javascript
// geminiService.js structure
- Model: gemini-2.5-flash-lite
- API: Google Generative AI SDK v0.24.1
- Temperature: Default (balanced creativity)
- Max Tokens: Automatic
- Prompt Engineering: Specialized for ASD communication needs
- Error Handling: Automatic fallback to local NLP on failure
```

### Gemini Service Functions
```javascript
// Message Analysis
fetchGeminiAnalysis(text)
  - Analyzes message for emotion, simplified meaning, safety, and reply suggestions
  - Returns structured JSON with emotion, simplified text, suggestions, and safety status
  - Includes detailed error logging and debugging

// Chatbot Conversation
fetchChatBotResponse(history, userQuery)
  - Takes entire chat history as context
  - Answers user questions based on conversation
  - Provides summaries and explanations
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
const prompt = `
  You are an assistant for an Autistic user. Analyze this text: "${text}".
  Return a valid JSON object strictly with these keys:
  {
    "emotion": "One word (e.g., Happy, Sarcastic, Angry, Neutral)",
    "simplified": "A literal, simple explanation of the meaning.",
    "suggestions": ["Reply 1", "Reply 2", "Reply 3"],
    "safety": "Safe" or "Unsafe (Reason)"
  }
`;
```

### Adding New Safety Keywords

Update `localNlpService.js`:
```javascript
const dangerKeywords = ['password', 'money', 'secret', 'your-new-keyword'];
```

### Configuring Settings Form Options

Modify the Settings component in `Settings.jsx`:
```javascript
// Add new AI persona options
<option value="custom">Your Custom Persona</option>

// Add new form fields
<input name="newSetting" value={preferences.newSetting} onChange={handleChange} />
```

### Adding New Routes

Update `App.jsx` routing configuration:
```javascript
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/settings" element={<Settings />} />
  <Route path="/your-new-page" element={<YourComponent />} />
</Routes>
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
- [ ] Custom safety keyword configuration UI (Partially implemented in Settings)
- [ ] Conversation history export
- [ ] Integration with real messaging platforms (via APIs)
- [ ] User authentication and profile persistence
- [ ] Dark mode theme toggle
- [ ] Mobile app version (React Native)
- [ ] Real-time collaboration features
- [ ] Advanced analytics dashboard
- [ ] Integration with calendar and reminder systems

---

## 12. REACT CONCEPTS DEMONSTRATED

This project showcases various React and modern web development concepts:

### Core React Concepts
- ✅ **Functional Components**: Primary component structure (Home, Settings, ChatBubble, etc.)
- ✅ **Class Components**: Footer component demonstrating traditional class syntax
- ✅ **React Hooks**: 
  - `useState` for state management
  - `useEffect` for side effects and lifecycle methods
  - `useRef` for DOM references and auto-scroll
  - Custom hooks (`useMessageAnalysis`)
- ✅ **Props**: Component communication and data flow
- ✅ **Controlled Components**: Form inputs in Settings page
- ✅ **Conditional Rendering**: Dynamic UI based on state

### Advanced Concepts
- ✅ **React Router DOM v7**: Multi-page navigation with routes
- ✅ **Component Composition**: Building complex UIs from smaller components
- ✅ **Event Handling**: onClick, onChange, onKeyDown, onSubmit
- ✅ **State Lifting**: Managing shared state in parent components
- ✅ **Side Effects**: localStorage persistence, auto-scrolling
- ✅ **Async Operations**: API calls with error handling
- ✅ **Dynamic Rendering**: Mapping arrays to components

### Modern Development Practices
- ✅ **Environment Variables**: Secure API key management with Vite
- ✅ **Service Layer Architecture**: Separation of concerns (services folder)
- ✅ **Custom Hooks**: Reusable logic encapsulation
- ✅ **Error Boundaries**: Graceful fallback handling
- ✅ **Responsive Design**: Mobile-first Tailwind CSS
- ✅ **Code Splitting**: Component-based organization

---

## 13. ACCESSIBILITY FEATURES

- High contrast mode support (configurable in Settings)
- Reduce motion option (configurable in Settings)
- Screen reader compatible
- Keyboard navigation enabled
- ARIA labels on all interactive elements
- Focus indicators for all clickable items
- Responsive design for various screen sizes
- Clear visual feedback for all interactions

---

## 14. PRIVACY & SECURITY

- No message data is stored on external servers
- Cloud API calls are encrypted via HTTPS
- API keys are environment-based (never hardcoded)
- Offline mode operates entirely client-side
- No third-party tracking or analytics- User preferences stored locally in browser (localStorage)
- Settings data remains on the user's device
---

## 14. PERFORMANCE OPTIMIZATION

- Lazy loading for sidebar components
- Debounced API calls to prevent rate limiting
- Memoized analysis results
- Efficient re-rendering with React.memo
- Code splitting for faster initial load- Auto-scroll optimization with useRef
- localStorage for draft persistence without server calls
- Smooth animations with CSS transitions
---

## 15. TESTING CHECKLIST

- [ ] Cloud AI responds correctly to test messages
- [ ] Offline mode activates when API key is invalid
- [ ] Sidebar opens and closes smoothly
- [ ] Sidebar auto-summarizes chat on first open (Cloud mode)
- [ ] Analysis cards display proper color coding
- [ ] Safety warnings trigger on risk keywords
- [ ] Messages can be sent via Enter key
- [ ] Messages can be sent via Send button
- [ ] Chat auto-scrolls to newest messages
- [ ] Navigation links work correctly (Chat ↔ Settings)
- [ ] Settings form fields update on change
- [ ] Settings save button shows success feedback
- [ ] localStorage persists settings draft
- [ ] Footer displays correctly on all pages
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
- Review the detailed testing guide in Section 5
- Check the architecture documentation in Section 7

---

## 21. PROJECT HIGHLIGHTS

### Technical Achievements
- ✅ **Hybrid AI System**: Seamless Cloud-to-Offline fallback with zero user intervention
- ✅ **React Router Integration**: Multi-page SPA with proper navigation
- ✅ **Form State Management**: Controlled components with localStorage persistence
- ✅ **Class & Functional Components**: Demonstrates both React paradigms
- ✅ **Real-time Messaging**: Interactive chat with auto-scroll and timestamp generation
- ✅ **Accessibility-First Design**: Multiple configurable options for diverse needs
- ✅ **Error Resilience**: Graceful degradation from Cloud AI to Local NLP

### User Experience Features
- ✅ **Zero Configuration Required**: Works offline if no API key provided
- ✅ **Auto-Summarization**: Chatbot sidebar instantly provides context
- ✅ **Visual Feedback**: Save confirmations, loading states, status badges
- ✅ **Responsive UI**: Works seamlessly on desktop and mobile
- ✅ **Intuitive Navigation**: Clear routing between Chat and Settings

### Code Quality
- ✅ **Modular Architecture**: Clear separation of concerns (services, hooks, components, utils)
- ✅ **Environment Security**: API keys managed via `.env` files
- ✅ **Comprehensive Documentation**: Detailed README with testing guides
- ✅ **Modern Best Practices**: Hooks, functional programming, Tailwind CSS v4

---

**Built with ❤️ to make digital communication accessible for everyone**
