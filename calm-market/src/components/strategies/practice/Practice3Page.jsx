import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Container, Button } from 'react-bootstrap';
import ScreenCaptureWrapper from './ScreenCaptureWrapper';

const MAX = 20;
const TOTAL_CHALLENGES = 5;

const generateTarget = () => Math.floor(Math.random() * (MAX - 1)) + 1;

const Practice3Page = ({ onBack }) => {
    const [target, setTarget] = useState(generateTarget);
    const [position, setPosition] = useState(0);
    const [challenge, setChallenge] = useState(1);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState(null); // null | 'correct' | 'close'
    const [done, setDone] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [animating, setAnimating] = useState(false);
    const trackRef = useRef(null);

    // Arrow key movement
    useEffect(() => {
        const handleKey = (e) => {
            if (feedback || done) return;
            if (e.key === 'ArrowRight') setPosition(p => Math.min(p + 1, MAX));
            if (e.key === 'ArrowLeft') setPosition(p => Math.max(p - 1, 0));
            if (e.key === 'Enter') checkAnswer();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [position, feedback, done]);

    const checkAnswer = useCallback(() => {
        if (feedback) return;
        if (position === target) {
            setFeedback('correct');
            setScore(s => s + 1);
            playJumpAnim();
            setTimeout(nextChallenge, 1600);
        } else {
            setFeedback('close');
            setTimeout(() => setFeedback(null), 1200);
        }
    }, [position, target, feedback]);

    const playJumpAnim = () => {
        setAnimating(true);
        setTimeout(() => setAnimating(false), 600);
    };

    const nextChallenge = () => {
        if (challenge >= TOTAL_CHALLENGES) {
            setDone(true);
        } else {
            setChallenge(c => c + 1);
            setTarget(generateTarget());
            setPosition(0);
            setFeedback(null);
        }
    };

    // Mouse drag on number line track
    const handleTrackClick = (e) => {
        if (!trackRef.current || feedback) return;
        const rect = trackRef.current.getBoundingClientRect();
        const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        setPosition(Math.round(ratio * MAX));
    };

    const handleTrackMouseMove = (e) => {
        if (!isDragging || !trackRef.current || feedback) return;
        const rect = trackRef.current.getBoundingClientRect();
        const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        setPosition(Math.round(ratio * MAX));
    };

    const markerPercent = (position / MAX) * 100;
    const targetPercent = (target / MAX) * 100;

    const restart = () => {
        setChallenge(1); setScore(0); setPosition(0);
        setTarget(generateTarget()); setFeedback(null); setDone(false);
    };

    return (
        <ScreenCaptureWrapper label="Capture Number Line Score">
            <Container className="py-4" style={{ maxWidth: 680 }}>
                <div className="mb-4" style={{ borderLeft: '6px solid #FFD3B6', paddingLeft: 16 }}>
                    <h2 className="fw-bold" style={{ color: '#5D5C61' }}>📏 Practice 3 – Number Line Slider</h2>
                    <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>
                        Move the marker to the target number! &nbsp;
                        <kbd>←</kbd> / <kbd>→</kbd> arrow keys move by 1. &nbsp;
                        Click or drag on the track. &nbsp; <kbd>Enter</kbd> = Check. &nbsp; <kbd>S</kbd> = Screenshot.
                    </p>
                </div>

                {done ? (
                    <div className="text-center p-5 rounded" style={{ backgroundColor: '#fff8f0', border: '4px solid #FFD3B6', borderRadius: 24 }}>
                        <div style={{ fontSize: '5rem' }}>{score >= 4 ? '🌈' : score >= 2 ? '⭐' : '💪'}</div>
                        <h2 className="fw-bold mt-2" style={{ color: '#5D5C61' }}>
                            {score >= 4 ? 'Superstar!' : score >= 2 ? 'Well done!' : 'Keep going!'}
                        </h2>
                        <p style={{ fontSize: '1.4rem' }}>Score: <strong>{score} / {TOTAL_CHALLENGES}</strong></p>
                        <p className="text-muted" style={{ fontSize: '0.9rem' }}>Press <kbd>S</kbd> to capture your result!</p>
                        <div className="d-flex gap-3 justify-content-center mt-3">
                            <Button onClick={restart} style={{ backgroundColor: '#FFD3B6', border: '3px solid #5D5C61', borderRadius: 12, color: '#5D5C61', fontWeight: 'bold', boxShadow: '4px 4px 0 #5D5C61' }}>
                                🔄 Try Again
                            </Button>
                            <Button variant="outline-secondary" style={{ borderRadius: 12 }} onClick={onBack}>← Back</Button>
                        </div>
                    </div>
                ) : (
                    <div>
                        {/* Stats Bar */}
                        <div className="d-flex justify-content-between mb-4 p-2 rounded" style={{ backgroundColor: '#fff8f0', border: '2px solid #FFD3B6', borderRadius: 12 }}>
                            <span>Challenge <strong>{challenge}</strong> / {TOTAL_CHALLENGES}</span>
                            <span>Score: <strong style={{ color: '#27ae60' }}>{score} ⭐</strong></span>
                        </div>

                        {/* Target display */}
                        <div className="text-center mb-5">
                            <p className="text-muted mb-1">Move the marker to:</p>
                            <div style={{ fontSize: '5rem', fontWeight: 'bold', color: '#5D5C61', lineHeight: 1 }}>
                                {target}
                            </div>
                        </div>

                        {/* Number Line Track */}
                        <div className="position-relative mb-2" style={{ userSelect: 'none' }}>
                            {/* Target flag */}
                            <div style={{
                                position: 'absolute',
                                left: `${targetPercent}%`,
                                top: -28,
                                transform: 'translateX(-50%)',
                                fontSize: '1.3rem',
                                transition: 'left 0.2s',
                            }}>🚩</div>

                            {/* Track */}
                            <div
                                ref={trackRef}
                                onClick={handleTrackClick}
                                onMouseMove={handleTrackMouseMove}
                                onMouseDown={() => setIsDragging(true)}
                                onMouseUp={() => setIsDragging(false)}
                                onMouseLeave={() => setIsDragging(false)}
                                style={{
                                    height: 18, borderRadius: 9,
                                    background: `linear-gradient(to right, #FFD3B6 ${markerPercent}%, #eee ${markerPercent}%)`,
                                    border: '3px solid #5D5C61',
                                    cursor: feedback ? 'default' : 'pointer',
                                    position: 'relative',
                                    boxShadow: '2px 2px 0 #5D5C61',
                                }}
                            >
                                {/* Marker */}
                                <div
                                    className={`nl-marker ${animating ? 'bounce-coin' : ''}`}
                                    style={{
                                        position: 'absolute',
                                        left: `${markerPercent}%`,
                                        top: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        width: 32, height: 32, borderRadius: '50%',
                                        backgroundColor: feedback === 'correct' ? '#A8E6CF' : '#FFD700',
                                        border: '4px solid #5D5C61',
                                        boxShadow: '2px 2px 0 #5D5C61',
                                        cursor: 'grab',
                                        transition: feedback ? 'background-color 0.3s' : 'left 0.05s',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '0.75rem', fontWeight: 'bold', color: '#5D5C61',
                                    }}
                                >
                                    {position}
                                </div>
                            </div>

                            {/* Tick marks */}
                            <div className="d-flex justify-content-between mt-1 px-1">
                                {[0, 5, 10, 15, 20].map(n => (
                                    <span key={n} style={{ fontSize: '0.78rem', color: '#5D5C61', fontWeight: 'bold' }}>{n}</span>
                                ))}
                            </div>
                        </div>

                        {/* Feedback */}
                        {feedback === 'correct' && (
                            <div className="text-center mt-3 p-2 rounded" style={{ backgroundColor: '#A8E6CF', border: '3px solid #5D5C61', borderRadius: 12 }}>
                                ✅ <strong>Perfect!</strong> You landed on {target}!
                            </div>
                        )}
                        {feedback === 'close' && (
                            <div className="text-center mt-3 p-2 rounded shake" style={{ backgroundColor: '#FFDDC1', border: '3px solid #FFD3B6', borderRadius: 12 }}>
                                {position > target ? `🔴 Too high! Go left. (You: ${position})` : `🟠 Too low! Go right. (You: ${position})`}
                            </div>
                        )}

                        {/* Controls */}
                        <div className="d-flex justify-content-center gap-3 mt-4">
                            <Button
                                onClick={() => setPosition(p => Math.max(p - 1, 0))}
                                disabled={!!feedback}
                                style={{ fontSize: '1.4rem', borderRadius: 12, border: '3px solid #5D5C61', backgroundColor: '#FFD3B6', color: '#5D5C61', boxShadow: '3px 3px 0 #5D5C61', minWidth: 52 }}
                            >←</Button>
                            <Button
                                onClick={checkAnswer}
                                disabled={!!feedback}
                                style={{ backgroundColor: '#A8E6CF', border: '3px solid #5D5C61', borderRadius: 12, color: '#5D5C61', fontWeight: 'bold', boxShadow: '4px 4px 0 #5D5C61', padding: '10px 28px', fontSize: '1rem' }}
                            >
                                ✔ Check
                            </Button>
                            <Button
                                onClick={() => setPosition(p => Math.min(p + 1, MAX))}
                                disabled={!!feedback}
                                style={{ fontSize: '1.4rem', borderRadius: 12, border: '3px solid #5D5C61', backgroundColor: '#FFD3B6', color: '#5D5C61', boxShadow: '3px 3px 0 #5D5C61', minWidth: 52 }}
                            >→</Button>
                        </div>
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

export default Practice3Page;
