import React, { useState, useEffect } from 'react';
import { Save, Sliders, Eye, ShieldAlert, Zap } from 'lucide-react';

export default function Settings() {
  const [preferences, setPreferences] = useState({
    aiPersona: 'friendly',
    sarcasmSensitivity: 50,
    reduceMotion: false,
    highContrast: false,
    triggerWords: '',
    emergencyContact: ''
  });

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    localStorage.setItem('asd_settings_draft', JSON.stringify(preferences));
  }, [preferences]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPreferences(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaved(true);
    console.log("Saving User Profile:", preferences);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    /* --- FIX START: Added h-full and overflow-y-auto wrapper --- */
    <div className="h-full w-full overflow-y-auto bg-[#f8f9fa]">
      
      <div className="max-w-3xl mx-auto p-6 sm:p-10 pb-20"> {/* Added pb-20 for extra bottom space */}
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-indigo-600 p-6 text-white flex items-center gap-3">
            <Sliders size={24} />
            <div>
              <h2 className="text-xl font-bold">Assistive Configuration</h2>
              <p className="text-indigo-100 text-sm opacity-90">Customize how the AI interprets social cues for you.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            
            {/* Section 1: AI Behavior */}
            <div className="space-y-4">
              <h3 className="text-md font-bold text-gray-800 flex items-center gap-2 border-b pb-2">
                <Zap size={18} className="text-amber-500" /> Interpretation Style
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">AI Persona</label>
                  <select
                    name="aiPersona"
                    value={preferences.aiPersona}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-shadow"
                  >
                    <option value="direct">Literal & Direct (No Metaphors)</option>
                    <option value="friendly">Friendly & Reassuring</option>
                    <option value="educational">Educational (Explains 'Why')</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Sarcasm Detection Sensitivity: <span className="text-indigo-600 font-bold">{preferences.sarcasmSensitivity}%</span>
                  </label>
                  <input
                    type="range"
                    name="sarcasmSensitivity"
                    min="0"
                    max="100"
                    value={preferences.sarcasmSensitivity}
                    onChange={handleChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>Strict</span>
                    <span>Loose</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Sensory & Accessibility */}
            <div className="space-y-4">
              <h3 className="text-md font-bold text-gray-800 flex items-center gap-2 border-b pb-2">
                <Eye size={18} className="text-blue-500" /> Sensory & Visual Comfort
              </h3>
              
              <div className="flex flex-col gap-3">
                <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    name="reduceMotion"
                    checked={preferences.reduceMotion}
                    onChange={handleChange}
                    className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                  />
                  <div>
                    <span className="block text-sm font-medium text-gray-700">Reduce Motion & Animations</span>
                    <span className="block text-xs text-gray-500">Minimizes popup effects for sensory sensitivity.</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    name="highContrast"
                    checked={preferences.highContrast}
                    onChange={handleChange}
                    className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                  />
                  <div>
                    <span className="block text-sm font-medium text-gray-700">High Contrast Text Mode</span>
                    <span className="block text-xs text-gray-500">Increases text legibility on cards.</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Section 3: Safety Guard */}
            <div className="space-y-4">
              <h3 className="text-md font-bold text-gray-800 flex items-center gap-2 border-b pb-2">
                <ShieldAlert size={18} className="text-red-500" /> Safety Triggers
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Personal Trigger Words (Comma separated)</label>
                <textarea
                  name="triggerWords"
                  value={preferences.triggerWords}
                  onChange={handleChange}
                  rows="2"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-200 outline-none"
                  placeholder="e.g., yell, stupid, idiot"
                ></textarea>
              </div>

               <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Emergency Guardian Email</label>
                  <input
                    type="email"
                    name="emergencyContact"
                    value={preferences.emergencyContact}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="parent@example.com"
                  />
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
              >
                <Save size={20} /> Apply Configurations
              </button>
            </div>

            {isSaved && (
              <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl text-center font-medium animate-in fade-in slide-in-from-bottom-2">
                ✅ Settings successfully updated! AI behavior adjusted.
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}