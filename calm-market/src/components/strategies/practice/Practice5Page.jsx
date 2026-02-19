import React, { useState, useEffect, useRef } from 'react';
import { Container, Button } from 'react-bootstrap';
import ScreenCaptureWrapper from './ScreenCaptureWrapper';

const CHALLENGES = [
    { question: 'An apple costs 3 coins and a banana costs 2 coins. Total?', answer: 5, hint: '3 + 2 = ?' },
    { question: 'You have 10 coins. You spend 6. How many are left?', answer: 4, hint: '10 − 6 = ?' },
    { question: 'A book costs 8 coins. You pay with 10 coins. Change received?', answer: 2, hint: '10 − 8 = ?' },
];

const Practice5Page = ({ onBack }) => {
    const [breathPhase, setBreathPhase] = useState('in'); // 'in' | 'out'
    const [breathSize, setBreathSize] = useState(80);
    const [revealedCount, setRevealedCount] = useState(0);
    const [answers, setAnswers] = useState(Array(CHALLENGES.length).fill(''));
    const [graded, setGraded] = useState(false);
    const [showHints, setShowHints] = useState(false);
    const [hoveredHint, setHoveredHint] = useState(null);
    const [score, setScore] = useState(0);
    const scrollRef = useRef(null);

    // Breathing animation
    useEffect(() => {
        const interval = setInterval(() => {
            setBreathPhase(p => p === 'in' ? 'out' : 'in');
            setBreathSize(s => s === 80 ? 140 : 80);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Scroll-reveal: reveal challenges as user scrolls
    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        const handleScroll = () => {
            const scrolled = el.scrollTop + el.clientHeight;
            const total = el.scrollHeight;
            const pct = scrolled / total;
            if (pct > 0.35 && revealedCount < 1) setRevealedCount(1);
            if (pct > 0.60 && revealedCount < 2) setRevealedCount(2);
            if (pct > 0.85 && revealedCount < 3) setRevealedCount(3);
        };
        el.addEventListener('scroll', handleScroll);
        return () => el.removeEventListener('scroll', handleScroll);
    }, [revealedCount]);

    // Keyboard: H = hints, C = capture (handled by wrapper via S key)
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'h' || e.key === 'H') setShowHints(h => !h);
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, []);

    const handleAnswerChange = (idx, val) => {
        const updated = [...answers];
        updated[idx] = val;
        setAnswers(updated);
    };

    const handleSubmit = () => {
        const s = answers.filter((a, i) => parseInt(a) === CHALLENGES[i].answer).length;
        setScore(s);
        setGraded(true);
        setRevealedCount(3); // ensure all visible
    };

    const reset = () => {
        setAnswers(Array(CHALLENGES.length).fill(''));
        setGraded(false); setScore(0); setRevealedCount(0); setShowHints(false);
    };

    return (
        <ScreenCaptureWrapper label="Save My Work">
            {/* Scrollable page */}
            <div ref={scrollRef} style={{ height: '100vh', overflowY: 'auto' }}>
                <Container className="py-4" style={{ maxWidth: 640 }}>

                    {/* Header */}
                    <div className="mb-4" style={{ borderLeft: '6px solid #C3B1E1', paddingLeft: 16 }}>
                        <h2 className="fw-bold" style={{ color: '#5D5C61' }}>🎮 Practice 5 – Calm Focus Session</h2>
                        <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>
                            Breathe first, then solve 3 calm coin challenges. <br />
                            <kbd>H</kbd> = Toggle hints · <kbd>S</kbd> = Screenshot your work
                        </p>
                    </div>

                    {/* Breathing Section */}
                    <div className="text-center mb-5 p-4 rounded" style={{ backgroundColor: '#f5f0ff', border: '3px solid #C3B1E1', borderRadius: 20 }}>
                        <h5 className="fw-bold mb-3" style={{ color: '#5D5C61' }}>🌬️ Breathe First</h5>
                        <div style={{
                            width: breathSize,
                            height: breathSize,
                            borderRadius: '50%',
                            margin: '0 auto',
                            background: 'radial-gradient(circle, #C3B1E1, #9B89C4)',
                            border: '4px solid #5D5C61',
                            boxShadow: breathPhase === 'in' ? '0 0 40px rgba(195,177,225,0.8)' : '0 0 10px rgba(195,177,225,0.3)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'all 3s ease-in-out',
                            color: '#fff', fontWeight: 'bold', fontSize: '0.9rem',
                            className: 'breathe',
                        }}>
                            {breathPhase === 'in' ? '↑ IN' : '↓ OUT'}
                        </div>
                        <p className="text-muted mt-3 mb-0" style={{ fontSize: '0.85rem' }}>
                            {breathPhase === 'in' ? 'Breathe in slowly...' : 'Breathe out gently...'}
                        </p>
                    </div>

                    {/* Scroll-down prompt */}
                    {revealedCount < 1 && (
                        <div className="text-center mb-4 p-3 rounded" style={{ backgroundColor: '#fffdf5', border: '2px dashed #C3B1E1', borderRadius: 12 }}>
                            <p className="mb-0 text-muted">🔽 Scroll down to reveal your challenges</p>
                        </div>
                    )}

                    {/* Hint toggle bar */}
                    {revealedCount >= 1 && (
                        <div className="d-flex justify-content-between align-items-center mb-3 p-2 rounded" style={{ backgroundColor: '#f5f0ff', border: '2px solid #C3B1E1', borderRadius: 12 }}>
                            <span style={{ fontSize: '0.9rem', color: '#5D5C61', fontWeight: 'bold' }}>
                                💡 Hints are {showHints ? 'ON' : 'OFF'}
                            </span>
                            <Button
                                size="sm"
                                onClick={() => setShowHints(h => !h)}
                                style={{ backgroundColor: showHints ? '#C3B1E1' : '#fff', border: '2px solid #C3B1E1', borderRadius: 10, color: '#5D5C61', fontWeight: 'bold', fontSize: '0.8rem' }}
                            >
                                {showHints ? 'Hide Hints (H)' : 'Show Hints (H)'}
                            </Button>
                        </div>
                    )}

                    {/* Challenges — revealed by scroll */}
                    <div className="d-flex flex-column gap-4 mb-4">
                        {CHALLENGES.map((ch, i) => {
                            const visible = i <= revealedCount - 1 + (graded ? 3 : 0);
                            const userAns = parseInt(answers[i]);
                            const isCorrect = graded && userAns === ch.answer;
                            const isWrong = graded && !isNaN(userAns) && userAns !== ch.answer;

                            return (
                                <div
                                    key={i}
                                    className={visible ? 'challenge-reveal' : ''}
                                    style={{
                                        opacity: visible ? 1 : 0,
                                        transform: visible ? 'translateY(0)' : 'translateY(20px)',
                                        transition: 'all 0.5s ease',
                                        pointerEvents: visible ? 'all' : 'none',
                                    }}
                                >
                                    <div
                                        onMouseEnter={() => setHoveredHint(i)}
                                        onMouseLeave={() => setHoveredHint(null)}
                                        className="p-4 rounded position-relative"
                                        style={{
                                            border: `3px solid ${isCorrect ? '#A8E6CF' : isWrong ? '#FFAAA5' : '#C3B1E1'}`,
                                            borderRadius: 16,
                                            backgroundColor: isCorrect ? '#f0faf5' : isWrong ? '#fff5f5' : '#fffdf5',
                                            transition: 'all 0.2s',
                                        }}
                                    >
                                        <div className="d-flex align-items-start gap-3">
                                            <div style={{ minWidth: 36, height: 36, borderRadius: '50%', backgroundColor: '#C3B1E1', border: '2px solid #5D5C61', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#5D5C61' }}>
                                                {i + 1}
                                            </div>
                                            <div className="flex-grow-1">
                                                <p className="mb-2 fw-bold" style={{ color: '#5D5C61', fontSize: '1rem' }}>{ch.question}</p>
                                                <div className="d-flex align-items-center gap-2">
                                                    <input
                                                        type="number"
                                                        value={answers[i]}
                                                        onChange={(e) => handleAnswerChange(i, e.target.value)}
                                                        disabled={graded}
                                                        placeholder="Your answer"
                                                        min={0} max={30}
                                                        style={{
                                                            width: 110, padding: '6px 12px',
                                                            border: `3px solid ${isCorrect ? '#A8E6CF' : isWrong ? '#FFAAA5' : '#C3B1E1'}`,
                                                            borderRadius: 10, fontSize: '1.1rem', fontWeight: 'bold',
                                                            outline: 'none', textAlign: 'center',
                                                            backgroundColor: isCorrect ? '#f0faf5' : isWrong ? '#fff0f0' : '#fff',
                                                        }}
                                                    />
                                                    {graded && <span style={{ fontSize: '1.4rem' }}>{isCorrect ? '✅' : `❌ (${ch.answer})`}</span>}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Hover hint tooltip */}
                                        {(showHints || hoveredHint === i) && !graded && (
                                            <div style={{
                                                marginTop: 10,
                                                padding: '6px 12px',
                                                backgroundColor: '#f5f0ff',
                                                border: '2px dashed #C3B1E1',
                                                borderRadius: 8,
                                                fontSize: '0.85rem',
                                                color: '#5D5C61',
                                                animation: 'fadeIn 0.3s',
                                            }}>
                                                💡 Hint: <strong>{ch.hint}</strong>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Submit / Result */}
                    {revealedCount >= 1 && !graded && (
                        <div className="text-center mb-4">
                            <Button
                                onClick={handleSubmit}
                                disabled={answers.some(a => a === '')}
                                style={{ backgroundColor: '#C3B1E1', border: '3px solid #5D5C61', borderRadius: 12, color: '#5D5C61', fontWeight: 'bold', boxShadow: '4px 4px 0 #5D5C61', padding: '12px 32px', fontSize: '1.1rem' }}
                            >
                                Submit Answers ✔
                            </Button>
                        </div>
                    )}

                    {graded && (
                        <div className="text-center p-4 mb-4 rounded" style={{ backgroundColor: '#f5f0ff', border: '4px solid #C3B1E1', borderRadius: 20 }}>
                            <div style={{ fontSize: '4rem' }}>{score === 3 ? '🏆' : score === 2 ? '🌟' : '💪'}</div>
                            <h3 className="fw-bold mt-2" style={{ color: '#5D5C61' }}>{score} / 3 correct!</h3>
                            <p className="text-muted mb-3">{score === 3 ? 'Perfect! You are amazing!' : 'Good effort! Try again to beat your score.'}</p>
                            <p style={{ fontSize: '0.9rem', color: '#5D5C61' }}>
                                <kbd>S</kbd> to screenshot · or click the 📸 button in the corner
                            </p>
                            <div className="d-flex gap-3 justify-content-center mt-2">
                                <Button onClick={reset} style={{ backgroundColor: '#A8E6CF', border: '3px solid #5D5C61', borderRadius: 12, color: '#5D5C61', fontWeight: 'bold', boxShadow: '4px 4px 0 #5D5C61' }}>
                                    🔄 Try Again
                                </Button>
                                <Button variant="outline-secondary" style={{ borderRadius: 12 }} onClick={onBack}>← Back</Button>
                            </div>
                        </div>
                    )}

                    <div className="text-center mt-2 pb-5">
                        <Button variant="outline-secondary" style={{ borderRadius: 12, border: '3px solid #ccc' }} onClick={onBack}>
                            ← Back to Strategies
                        </Button>
                    </div>

                </Container>
            </div>
        </ScreenCaptureWrapper>
    );
};

export default Practice5Page;
