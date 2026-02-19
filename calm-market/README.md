# 🛒 Calm Market - Learning Made Gentle

**Calm Market** is a serene, interactive web application designed to help autistic children and learners practice essential math and social skills in a stress-free environment.

## 🌟 Overview
Built with **React** and **Vite**, this application combines gamified learning with advanced AI features. It provides a safe space for users to practice shopping, counting currency, and identifying real-world objects, all without time pressure or anxiety-inducing feedback.

## ✨ Key Features

### 🛍️ Interactive Shopping Game
- **Math Practice:** Calculate total costs and manage a budget in a playful market setting.
- **Gentle Feedback:** Encouraging responses for both correct and incorrect answers.
- **No Timers:** Learn at your own pace.

### 📷 AI Object Hunter
- **Real-World Connection:** Uses **TensorFlow.js** and your webcam to find real-life objects (e.g., "Find a Cup!").
- **Computer Vision:** Instant feedback when the correct object is detected.
- **Interactive Fun:** Bridges the gap between digital learning and physical exploration.

### 📊 Progress Tracking
- **Visual Stats:** Beautiful charts powered by **Recharts** to track progress over time.
- **Thinking Speed:** Monitors response times to help track cognitive fluency improvements.
- **Session History:** Detailed logs of game sessions and accuracy.

### 🧠 Structured Learning Strategies
- **5 Evaluation Strategies:** Step-by-step guides helping users learn specific math concepts.
- **Practice Modes:** Dedicated practice exercises for each strategy.
- **Visual Aids:** Clear instructions and supportive UI.

## 🛠️ Tech Stack
- **Frontend Framework:** React 18+ (Vite)
- **Styling:** Bootstrap 5, Custom CSS
- **AI/ML:** TensorFlow.js (COCO-SSD model)
- **Data Visualization:** Recharts
- **Icons:** React Icons / Bootstrap Icons

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/calm-market.git
   cd calm-market
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App
Start the development server:
```bash
npm run dev
```
Open your browser and navigate to the local URL (usually `http://localhost:5173`).

### Building for Production
To create a production build:
```bash
npm run build
```
The output will be in the `dist` folder.

## 📂 Project Structure
```
src/
├── ai/                 # AI & Computer Vision components (ObjectHunter)
├── components/         # Core UI components
│   ├── strategies/     # Learning strategy pages & practice modes
│   ├── GameScreen.jsx  # Main shopping game logic
│   └── StatsScreen.jsx # Progress tracking & visualization
├── assets/             # Static assets (images, stickers)
└── App.jsx             # Main application layout & routing
```

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License
This project is open-source and available under the simple learning license.
