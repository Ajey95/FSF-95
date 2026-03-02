import React, { useState, useEffect } from 'react';
import { Container, Button, Navbar, Nav } from 'react-bootstrap';
import GameScreen from './components/GameScreen';
import StatsScreen from './components/StatsScreen';
import StrategiesPage from './components/strategies/StrategiesPage';
import Strategy1Page from './components/strategies/Strategy1Page';
import Strategy2Page from './components/strategies/Strategy2Page';
import Strategy3Page from './components/strategies/Strategy3Page';
import Strategy4Page from './components/strategies/Strategy4Page';
import Strategy5Page from './components/strategies/Strategy5Page';
import Practice1Page from './components/strategies/practice/Practice1Page';
import Practice2Page from './components/strategies/practice/Practice2Page';
import Practice3Page from './components/strategies/practice/Practice3Page';
import Practice4Page from './components/strategies/practice/Practice4Page';
import Practice5Page from './components/strategies/practice/Practice5Page';
import './App.css';

// Fridge Stickers Data
const STICKERS = [
  { src: '/assets/stickers/cat.png', x: '5%', y: '15%', rot: '-15deg' },
  { src: '/assets/stickers/dog.png', x: '88%', y: '10%', rot: '15deg' },
  { src: '/assets/stickers/elephant.png', x: '2%', y: '75%', rot: '10deg' },
  { src: '/assets/stickers/monkey.png', x: '85%', y: '70%', rot: '-10deg' },
  { src: '/assets/stickers/mouse.png', x: '45%', y: '90%', rot: '20deg' },
  { src: '/assets/stickers/rabbit.png', x: '2%', y: '40%', rot: '-20deg' },
  { src: '/assets/stickers/pet.png', x: '80%', y: '30%', rot: '12deg' },
  { src: '/assets/stickers/deadpool.png', x: '15%', y: '85%', rot: '-15deg' },
  { src: '/assets/stickers/camera.png', x: '70%', y: '5%', rot: '8deg' },
];

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [sessionData, setSessionData] = useState([]);
  const [gameLevel, setGameLevel] = useState(1); // persists across nav to Stats/back

  // Clear stale stats on mount so every refresh starts fresh
  useEffect(() => {
    localStorage.removeItem('calmMarketStats');
  }, []);

  // Save session data in case it's needed during the session
  useEffect(() => {
    localStorage.setItem('calmMarketStats', JSON.stringify(sessionData));
  }, [sessionData]);

  const handleAddStat = (stat) => {
    setSessionData([...sessionData, { ...stat, date: new Date().toISOString() }]);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'game':
        return <GameScreen level={gameLevel} onLevelChange={setGameLevel} onEndGame={() => setCurrentView('stats')} onAddStat={handleAddStat} />;
      case 'stats':
        return <StatsScreen onBack={() => setCurrentView('home')} sessionData={sessionData} />;
      case 'strategies':
        return <StrategiesPage onNavigate={setCurrentView} onBack={() => setCurrentView('home')} />;
      case 'strategy1':
        return <Strategy1Page onBack={() => setCurrentView('strategies')} />;
      case 'strategy2':
        return <Strategy2Page onBack={() => setCurrentView('strategies')} />;
      case 'strategy3':
        return <Strategy3Page onBack={() => setCurrentView('strategies')} />;
      case 'strategy4':
        return <Strategy4Page onBack={() => setCurrentView('strategies')} />;
      case 'strategy5':
        return <Strategy5Page onBack={() => setCurrentView('strategies')} />;
      case 'practice1':
        return <Practice1Page onBack={() => setCurrentView('strategies')} />;
      case 'practice2':
        return <Practice2Page onBack={() => setCurrentView('strategies')} />;
      case 'practice3':
        return <Practice3Page onBack={() => setCurrentView('strategies')} />;
      case 'practice4':
        return <Practice4Page onBack={() => setCurrentView('strategies')} />;
      case 'practice5':
        return <Practice5Page onBack={() => setCurrentView('strategies')} />;
      case 'home':
      default:
        return (
          <Container className="text-center mt-5 position-relative" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

            {/* Stickers moved to Global Layout */}

            <div style={{ position: 'relative', zIndex: 1, backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '40px', borderRadius: '30px', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)', backdropFilter: 'blur(4px)' }}>
              <h1 className="display-3 fw-bold mb-4" style={{ color: '#5D5C61' }}>Calm Market</h1>
              <p className="lead mb-5">Practice counting and shopping in a relaxing world.</p>
              <div className="d-grid gap-3 col-md-6 mx-auto">
                <Button variant="calm-primary" size="lg" className="btn-calm-primary" onClick={() => { setGameLevel(1); setCurrentView('game'); }}>
                  Start Shopping 🛍️
                </Button>
                <Button variant="outline-secondary" size="lg" style={{ borderRadius: '12px', border: '3px solid #ccc' }} onClick={() => setCurrentView('stats')}>
                  See Progress 📊
                </Button>
                <Button variant="outline-secondary" size="lg" style={{ borderRadius: '12px', border: '3px solid #C3B1E1', color: '#5D5C61' }} onClick={() => setCurrentView('strategies')}>
                  Learn Our Strategies 🧠
                </Button>
              </div>
            </div>
          </Container>
        );
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column" style={{
      backgroundColor: '#fdfbfb',
      backgroundImage: 'radial-gradient(#dde1e7 2px, transparent 2px)',
      backgroundSize: '24px 24px'
    }}>
      <Navbar expand="lg" className="mb-0 shadow-sm" style={{ backgroundColor: '#fff', borderBottom: '3px solid #eee' }}>
        <Container>
          <Navbar.Brand href="#" onClick={() => setCurrentView('home')} style={{ color: 'var(--calm-text)', fontWeight: 'bold', fontSize: '1.5rem' }}>
            🛒 Calm Market
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto" style={{ fontSize: '1.1rem' }}>
              <Nav.Link onClick={() => setCurrentView('home')} className={currentView === 'home' ? 'active' : ''}>Home</Nav.Link>
              <Nav.Link onClick={() => setCurrentView('game')} className={currentView === 'game' ? 'active' : ''}>Play</Nav.Link>
              <Nav.Link onClick={() => setCurrentView('stats')} className={currentView === 'stats' ? 'active' : ''}>Stats</Nav.Link>
              <Nav.Link onClick={() => setCurrentView('strategies')} className={['strategies', 'strategy1', 'strategy2', 'strategy3', 'strategy4', 'strategy5'].includes(currentView) ? 'active' : ''}>Strategies 🧠</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <main className="flex-grow-1 position-relative overflow-hidden">
        {/* Fridge Stickers (Global Decoration) */}
        {STICKERS.map((sticker, index) => (
          <img
            key={index}
            src={sticker.src}
            alt="sticker"
            className="d-none d-md-block position-absolute"
            style={{
              left: sticker.x,
              top: sticker.y,
              transform: `rotate(${sticker.rot})`,
              width: '100px',
              height: 'auto',
              opacity: 0.8, // Slightly more transparent to not interfere with game text
              zIndex: 0,
              filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.2))',
              pointerEvents: 'none' // Ensure they don't block clicks
            }}
          />
        ))}

        <div style={{ position: 'relative', zIndex: 1, minHeight: '80vh' }}>
          {renderContent()}
        </div>
      </main>

      <footer className="text-center py-3 text-muted" style={{ backgroundColor: '#fff', borderTop: '3px solid #eee' }}>
        <small>© 2026 Calm Market • Learning Made Gentle</small>
      </footer>
    </div>
  );
}

export default App;
