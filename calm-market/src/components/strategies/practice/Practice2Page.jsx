import React, { useState, useEffect, useCallback } from 'react';
import { Container, Button, ProgressBar } from 'react-bootstrap';
import ScreenCaptureWrapper from './ScreenCaptureWrapper';

const COINS = [
    { value: 1, color: '#FFD700', border: '#B8860B', rimColor: '#DAA520', label: 'Gold Coin', size: 100, key: '1', symbol: '①' },
    { value: 5, color: '#D8D8D8', border: '#909090', rimColor: '#B0B0B0', label: 'Silver Coin', size: 120, key: '5', symbol: '⑤' },
    { value: 10, color: '#CD7F32', border: '#8B4513', rimColor: '#A0522D', label: 'Bronze Coin', size: 140, key: '0', symbol: '⑩' },
];

const TOTAL_ROUNDS = 5;
const generateRound = () => COINS[Math.floor(Math.random() * COINS.length)];

// Color legend entries (shown as a guide at top)
const ColorGuide = ({ visible }) => (
    <div style={{
        display: 'flex', gap: 12, justifyContent: 'center', alignItems: 'center',
        padding: '10px 16px', borderRadius: 14,
        backgroundColor: '#fffdf5', border: '2px dashed #DCEDC1',
        marginBottom: 20,
        opacity: visible ? 1 : 0, transition: 'opacity 0.5s ease',
        pointerEvents: 'none',
    }}>
        <span style={{ fontSize: '0.8rem', color: '#5D5C61', fontWeight: 'bold' }}>Coin guide →</span>
        {COINS.map(c => (
            <div key={c.value} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{
                    width: 28, height: 28, borderRadius: '50%',
                    backgroundColor: c.color, border: `3px solid ${c.border}`,
                    boxShadow: `inset 0 2px 4px rgba(255,255,255,0.5)`,
                }} />
                <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#5D5C61' }}>= {c.value}</span>
            </div>
        ))}
    </div>
);

const Practice2Page = ({ onBack }) => {
    const [round, setRound] = useState(1);
    const [current, setCurrent] = useState(generateRound);
    const [score, setScore] = useState(0);
    const [answered, setAnswered] = useState(null);
    const [selectedVal, setSelectedVal] = useState(null);
    const [hoveredBtn, setHoveredBtn] = useState(null);
    const [done, setDone] = useState(false);
    const [animClass, setAnimClass] = useState('');
    const [showGuide, setShowGuide] = useState(true); // guide fades after round 2

    // Hide guide after round 2 to increase challenge
    useEffect(() => {
        if (round > 2) setShowGuide(false);
    }, [round]);

    // Keyboard: 1 → 1, 5 → 5, 0 → 10
    useEffect(() => {
        const handleKey = (e) => {
            if (answered || done) return;
            if (e.key === '1') answer(1);
            if (e.key === '5') answer(5);
            if (e.key === '0') answer(10);
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [answered, done, current]);

    const answer = useCallback((val) => {
        if (answered) return;
        setSelectedVal(val);
        const isCorrect = val === current.value;
        setAnswered(isCorrect ? 'correct' : 'wrong');
        if (isCorrect) { setScore(s => s + 1); setAnimClass('bounce-coin'); }
        else { setAnimClass('shake'); }

        setTimeout(() => {
            setAnimClass('');
            if (round >= TOTAL_ROUNDS) {
                setDone(true);
            } else {
                setRound(r => r + 1);
                setCurrent(generateRound());
                setAnswered(null);
                setSelectedVal(null);
            }
        }, 1600);
    }, [answered, current, round]);

    const restart = () => {
        setRound(1); setScore(0); setAnswered(null);
        setSelectedVal(null); setDone(false);
        setCurrent(generateRound()); setShowGuide(true);
    };

    const progressPercent = Math.round(((round - 1) / TOTAL_ROUNDS) * 100);

    return (
        <ScreenCaptureWrapper label="Capture Quiz Score">
            <Container className="py-4" style={{ maxWidth: 600 }}>

                {/* Header */}
                <div className="mb-3" style={{ borderLeft: '6px solid #DCEDC1', paddingLeft: 16 }}>
                    <h2 className="fw-bold" style={{ color: '#5D5C61' }}>🪙 Practice 2 – Coin ID Quiz</h2>
                    <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>
                        Look at the coin's <strong>colour</strong> and <strong>size</strong> to identify its value!<br />
                        Keys: <kbd>1</kbd> = one coin · <kbd>5</kbd> = five · <kbd>0</kbd> = ten · <kbd>S</kbd> = screenshot
                    </p>
                </div>

                {/* Progress bar */}
                <div className="mb-3">
                    <div className="d-flex justify-content-between mb-1">
                        <span className="text-muted" style={{ fontSize: '0.9rem' }}>Round {Math.min(round, TOTAL_ROUNDS)} / {TOTAL_ROUNDS}</span>
                        <span className="fw-bold" style={{ color: '#27ae60' }}>Score: {score} ⭐</span>
                    </div>
                    <ProgressBar now={progressPercent} style={{ height: 12, borderRadius: 8, border: '2px solid #DCEDC1' }} variant="success" />
                </div>

                {done ? (
                    /* ── Final Score ── */
                    <div className="text-center p-5 rounded" style={{ backgroundColor: '#f4fae8', border: '4px solid #DCEDC1', borderRadius: 24 }}>
                        <div style={{ fontSize: '5rem' }}>{score >= 4 ? '🏆' : score >= 2 ? '🌟' : '💪'}</div>
                        <h2 className="fw-bold mt-2" style={{ color: '#5D5C61' }}>
                            {score >= 4 ? 'Amazing!' : score >= 2 ? 'Good job!' : 'Keep practising!'}
                        </h2>
                        <p style={{ fontSize: '1.4rem' }}>You scored <strong>{score} / {TOTAL_ROUNDS}</strong></p>
                        <p className="text-muted" style={{ fontSize: '0.9rem' }}>Press <kbd>S</kbd> to screenshot your score!</p>
                        <div className="d-flex gap-3 justify-content-center mt-3">
                            <Button onClick={restart} style={{ backgroundColor: '#DCEDC1', border: '3px solid #5D5C61', borderRadius: 12, color: '#5D5C61', fontWeight: 'bold', boxShadow: '4px 4px 0 #5D5C61' }}>
                                🔄 Play Again
                            </Button>
                            <Button variant="outline-secondary" style={{ borderRadius: 12 }} onClick={onBack}>← Back</Button>
                        </div>
                    </div>
                ) : (
                    /* ── Quiz Card ── */
                    <div>
                        {/* Color guide — always visible rounds 1-2, fades after */}
                        <ColorGuide visible={showGuide} />
                        {!showGuide && (
                            <p className="text-center text-muted mb-3" style={{ fontSize: '0.8rem' }}>
                                💡 Tip: <strong>Gold = 1 · Silver = 5 · Bronze = 10</strong>
                            </p>
                        )}

                        {/* ── Big coin ── */}
                        <div className="text-center mb-4">
                            <div
                                className={animClass}
                                style={{
                                    width: current.size + 40,
                                    height: current.size + 40,
                                    borderRadius: '50%',
                                    backgroundColor: current.color,
                                    border: `12px solid ${current.border}`,
                                    margin: '0 auto 8px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    flexDirection: 'column',
                                    boxShadow: `0 10px 0 ${current.border}, 0 14px 32px rgba(0,0,0,0.22), inset 0 5px 10px rgba(255,255,255,0.45)`,
                                    transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
                                    position: 'relative', overflow: 'hidden',
                                }}
                            >
                                {/* Inner ring */}
                                <div style={{
                                    position: 'absolute',
                                    width: current.size - 10,
                                    height: current.size - 10,
                                    borderRadius: '50%',
                                    border: '4px solid rgba(255,255,255,0.3)',
                                    top: '50%', left: '50%',
                                    transform: 'translate(-50%,-50%)',
                                }} />
                                {/* Shine streak */}
                                <div style={{
                                    position: 'absolute', top: 18, left: 30,
                                    width: 22, height: 56,
                                    background: 'rgba(255,255,255,0.28)',
                                    borderRadius: 12, transform: 'rotate(-30deg)',
                                }} />
                                {/* "?" in center */}
                                <span style={{ fontSize: '2.8rem', color: '#fff', textShadow: '2px 2px 0 rgba(0,0,0,0.3)', zIndex: 2 }}>?</span>
                            </div>

                            {/* Coin size label */}
                            <p className="text-muted" style={{ fontSize: '0.8rem' }}>
                                Coin size: <strong>{current.size === 100 ? 'Small' : current.size === 120 ? 'Medium' : 'Large'}</strong>
                                &nbsp;· Colour: <strong style={{ color: current.border }}>{current.label}</strong>
                            </p>
                            <p className="fw-bold" style={{ color: '#5D5C61', fontSize: '1.1rem' }}>What is the value of this coin?</p>
                        </div>

                        {/* ── Answer buttons ── */}
                        <div className="d-flex justify-content-center gap-3 flex-wrap mb-4">
                            {COINS.map(coin => {
                                let bgColor = '#fff';
                                if (answered && selectedVal === coin.value)
                                    bgColor = answered === 'correct' ? '#A8E6CF' : '#FFAAA5';
                                if (answered && coin.value === current.value && answered !== 'correct')
                                    bgColor = '#A8E6CF'; // show real answer on wrong

                                const isHovered = hoveredBtn === coin.value && !answered;

                                return (
                                    <div
                                        key={coin.value}
                                        onClick={() => answer(coin.value)}
                                        onMouseEnter={() => setHoveredBtn(coin.value)}
                                        onMouseLeave={() => setHoveredBtn(null)}
                                        className="coin-quiz-btn"
                                        style={{
                                            width: 100, height: 100, borderRadius: '50%',
                                            backgroundColor: answered ? bgColor : (isHovered ? '#f9f9f9' : '#fff'),
                                            border: `5px solid ${coin.border}`,
                                            display: 'flex', flexDirection: 'column',
                                            alignItems: 'center', justifyContent: 'center',
                                            cursor: answered ? 'default' : 'pointer',
                                            boxShadow: isHovered ? `4px 4px 0 ${coin.border}` : `2px 2px 0 #ddd`,
                                            transform: isHovered ? 'translateY(-4px) scale(1.06)' : 'none',
                                            transition: 'all 0.15s ease',
                                            gap: 2,
                                        }}
                                    >
                                        {/* Mini coin swatch */}
                                        <div style={{
                                            width: 24, height: 24, borderRadius: '50%',
                                            backgroundColor: coin.color, border: `3px solid ${coin.border}`,
                                            boxShadow: `inset 0 2px 4px rgba(255,255,255,0.5)`,
                                        }} />
                                        <span style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#5D5C61', lineHeight: 1 }}>
                                            {coin.value}
                                        </span>
                                        <span style={{ fontSize: '0.6rem', color: '#aaa' }}>
                                            {coin.value === 10 ? 'press 0' : `press ${coin.key}`}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Feedback */}
                        {answered && (
                            <div className="p-3 rounded text-center" style={{
                                backgroundColor: answered === 'correct' ? '#f0faf5' : '#fff5f5',
                                border: `3px solid ${answered === 'correct' ? '#A8E6CF' : '#FFAAA5'}`,
                                borderRadius: 16,
                            }}>
                                <span style={{ fontSize: '1.4rem' }}>
                                    {answered === 'correct'
                                        ? `✅ Correct! It's a ${current.label} worth ${current.value}. 🌟`
                                        : `❌ That's actually a ${current.label} worth ${current.value}. Remember: ${current.label} = ${current.value}!`}
                                </span>
                            </div>
                        )}
                    </div>
                )}

                <div className="text-center mt-4">
                    <Button variant="outline-secondary" style={{ borderRadius: 12, border: '3px solid #ccc' }} onClick={onBack}>
                        ← Back to Strategies
                    </Button>
                </div>
            </Container>
        </ScreenCaptureWrapper>
    );
};

export default Practice2Page;
