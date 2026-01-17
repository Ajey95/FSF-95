import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [mode, setMode] = useState('math'); // 'math' or 'string'
  const [display, setDisplay] = useState('');

  // --- Helpers ---
  const safeEval = (str) => {
    try {
      // Note: direct eval is risky in production, but matches your original logic.
      // eslint-disable-next-line no-eval
      return String(eval(str));
    } catch {
      return 'Error';
    }
  };

  // --- Handlers ---
  const handleModeSwitch = (newMode) => {
    setMode(newMode);
    setDisplay('');
  };

  // Math Logic
  const appendNum = (char) => setDisplay(prev => prev + char);
  const clearDisplay = () => setDisplay('');
  const deleteChar = () => setDisplay(prev => prev.toString().slice(0, -1));
  
  const appendOp = (op) => {
    const lastChar = display.slice(-1);
    if ("+-*/%".includes(lastChar)) {
      setDisplay(prev => prev.slice(0, -1) + op);
    } else {
      setDisplay(prev => prev + op);
    }
  };

  const sciOp = (fn) => {
    let val = parseFloat(display);
    if (isNaN(val)) return;
    let res = 0;
    switch(fn) {
        case 'sin': res = Math.sin(val); break;
        case 'cos': res = Math.cos(val); break;
        case 'tan': res = Math.tan(val); break;
        case 'sqrt': res = Math.sqrt(val); break;
        case 'log': res = Math.log10(val); break;
        default: break;
    }
    setDisplay(String(res));
  };

  const calculate = () => setDisplay(safeEval(display));

  // String Logic
  const strOp = (operation) => {
    let text = display;
    if (!text) return;
    let res = '';

    switch(operation) {
        case 'reverse': res = text.split('').reverse().join(''); break;
        case 'upper': res = text.toUpperCase(); break;
        case 'lower': res = text.toLowerCase(); break;
        case 'length': res = "Length: " + text.length; break;
        case 'wordcount': res = "Words: " + text.trim().split(/\s+/).length; break;
        case 'vowels': 
            const m = text.match(/[aeiou]/gi);
            res = "Vowels: " + (m ? m.length : 0);
            break;
        case 'ascii': res = text.split('').map(c => c.charCodeAt(0)).join(' '); break;
        case 'binary': res = text.split('').map(c => c.charCodeAt(0).toString(2)).join(' '); break;
        case 'base64': 
            try { res = btoa(text); } catch(e) { res = "Error"; } 
            break;
        case 'base64dec': 
            try { res = atob(text); } catch(e) { res = "Error"; } 
            break;
        case 'palindrome':
            const clean = text.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
            const rev = clean.split('').reverse().join('');
            res = (clean === rev) ? "True (Palindrome)" : "False";
            break;
        default: break;
    }
    setDisplay(res);
  };

  return (
    <div className="calc-wrapper">
      <div className={`calculator ${mode === 'string' ? 'string-mode' : ''}`}>
        
        {/* Mode Switcher */}
        <div className="mode-switch">
          <button 
            className={`mode-btn ${mode === 'math' ? 'active math-active' : ''}`} 
            onClick={() => handleModeSwitch('math')}
          >
            Scientific
          </button>
          <button 
            className={`mode-btn ${mode === 'string' ? 'active str-active' : ''}`} 
            onClick={() => handleModeSwitch('string')}
          >
            String Ops
          </button>
        </div>

        {/* Display Screen */}
        <div className="display-container">
          <input 
            type="text" 
            className={`display-input ${mode === 'string' ? 'string-active-input' : ''}`}
            placeholder={mode === 'math' ? "0" : "Type text here..."}
            readOnly={mode === 'math'}
            value={display}
            onChange={(e) => mode === 'string' && setDisplay(e.target.value)}
          />
        </div>

        {/* Math Pad */}
        {mode === 'math' && (
          <div className="buttons-grid math-grid">
            <button className="btn-clear" onClick={clearDisplay}>AC</button>
            <button className="btn-clear" onClick={deleteChar}>DEL</button>
            <button className="btn-op" onClick={() => appendOp('%')}>%</button>
            <button className="btn-op" onClick={() => appendOp('/')}>÷</button>

            <button className="btn-op" onClick={() => sciOp('sin')}>sin</button>
            <button className="btn-op" onClick={() => sciOp('cos')}>cos</button>
            <button className="btn-op" onClick={() => sciOp('tan')}>tan</button>
            <button className="btn-op" onClick={() => appendOp('*')}>×</button>

            <button className="btn-op" onClick={() => sciOp('sqrt')}>√</button>
            <button className="btn-op" onClick={() => appendOp('**')}>^</button>
            <button className="btn-op" onClick={() => sciOp('log')}>log</button>
            <button className="btn-op" onClick={() => appendOp('-')}>-</button>

            <button onClick={() => appendNum('7')}>7</button>
            <button onClick={() => appendNum('8')}>8</button>
            <button onClick={() => appendNum('9')}>9</button>
            <button className="btn-op span-2-row" onClick={() => appendOp('+')}>+</button>

            <button onClick={() => appendNum('4')}>4</button>
            <button onClick={() => appendNum('5')}>5</button>
            <button onClick={() => appendNum('6')}>6</button>
            <button onClick={() => appendNum('1')}>1</button>
            <button onClick={() => appendNum('2')}>2</button>
            <button onClick={() => appendNum('3')}>3</button>
            <button className="btn-eq span-2-row" onClick={calculate}>=</button>

            <button onClick={() => appendNum('0')} className="span-2-col">0</button>
            <button onClick={() => appendNum('.')}>.</button>
          </div>
        )}

        {/* String Pad */}
        {mode === 'string' && (
          <div className="buttons-grid">
            <div style={{ gridColumn: 'span 4', fontSize: '0.8rem', color: '#888', textAlign: 'center', marginBottom: '5px' }}>
                Type text in the box above
            </div>
            
            <button className="btn-clear" onClick={clearDisplay}>Clear Text</button>
            <button className="btn-str-op" onClick={() => strOp('reverse')}>Reverse</button>
            <button className="btn-str-op" onClick={() => strOp('upper')}>UPPER</button>
            <button className="btn-str-op" onClick={() => strOp('lower')}>lower</button>

            <button className="btn-str-op" onClick={() => strOp('length')}>Length</button>
            <button className="btn-str-op" onClick={() => strOp('wordcount')}>Word Count</button>
            <button className="btn-str-op" onClick={() => strOp('vowels')}>Vowels</button>
            <button className="btn-str-op" onClick={() => strOp('ascii')}>To ASCII</button>

            <button className="btn-str-op" onClick={() => strOp('binary')}>To Binary</button>
            <button className="btn-str-op" onClick={() => strOp('base64')}>Base64 Enc</button>
            <button className="btn-str-op" onClick={() => strOp('base64dec')}>Base64 Dec</button>
            <button className="btn-str-op" onClick={() => strOp('palindrome')}>Palindrome?</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;