import React, { useState } from 'react';
import ChatBubble from './components/ChatBubble';
import ChatbotSidebar from './components/ChatbotSidebar'; 
import { useMessageAnalysis } from './hooks/useMessageAnalysis';
import { Bot } from 'lucide-react';

const MOCK_MESSAGES = [
  { id: 1, sender: 'Mom', text: "Are you just gonna ignore the dishes again? lol", timestamp: '10:00 AM', type: 'incoming' },
  { id: 2, sender: 'Me', text: "I was studying.", timestamp: '10:05 AM', type: 'outgoing' },
  { id: 3, sender: 'Unknown', text: "Hey! Send me your password to win free money.", timestamp: '10:30 AM', type: 'incoming' },
  { id: 4, sender: 'Boss', text: "Great job breaking the server. Really smart.", timestamp: '11:00 AM', type: 'incoming' },
];

function App() {
  const [messages] = useState(MOCK_MESSAGES);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for Sidebar
  const { analyzeMessage } = useMessageAnalysis();

  return (
    <div className="w-screen h-screen bg-[#d1d7db] flex justify-center items-center overflow-hidden relative">
      
      {/* 1. The Main Chat Interface */}
      <div className={`w-full max-w-[1600px] h-full flex shadow-2xl overflow-hidden bg-[#efeae2] relative transition-all duration-300 ${isSidebarOpen ? 'mr-[350px]' : ''}`}>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-40 pointer-events-none z-0" 
             style={{ backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")' }}>
        </div>

        <div className="flex-1 flex flex-col z-10 h-full">
          {/* Header */}
          <header className="h-[60px] bg-[#f0f2f5] px-4 flex items-center justify-between border-b border-[#d1d7db] shrink-0">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-300"></div>
              <div>
                <h1 className="text-[#111b21] font-semibold text-base">WhatsApp Web</h1>
                <p className="text-xs text-gray-500">online</p>
              </div>
            </div>
            
            {/* 2. THE TRIGGER BUTTON */}
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="group flex items-center gap-2 px-3 py-1.5 bg-white border border-indigo-100 rounded-full hover:bg-indigo-50 transition-all shadow-sm active:scale-95"
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs font-bold text-indigo-700">ASD Assistant Active</span>
              <Bot size={16} className="text-indigo-500 group-hover:rotate-12 transition-transform" />
            </button>
          </header>

          <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6">
            {messages.map((msg) => (
              <ChatBubble key={msg.id} message={msg} analyzeFn={analyzeMessage} />
            ))}
          </div>

          <footer className="h-[62px] bg-[#f0f2f5] px-4 flex items-center gap-4 shrink-0">
            <div className="w-8 h-8 rounded-full text-gray-500 text-2xl flex items-center justify-center">+</div>
            <div className="flex-1 h-10 bg-white rounded-lg border border-white flex items-center px-4 text-gray-400 text-sm">
              Type a message
            </div>
          </footer>
        </div>
      </div>

      {/* 3. The Chatbot Sidebar Component */}
      <ChatbotSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        chatHistory={messages} 
      />

    </div>
  );
}

export default App;