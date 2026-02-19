import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import ScreenCaptureWrapper from './ScreenCaptureWrapper';

const CORRECT_ORDER = [
    { id: 'step1', icon: '👀', label: 'Look at the Item', detail: 'See the item card with a clear picture' },
    { id: 'step2', icon: '🏷️', label: 'Check the Price', detail: 'Read the price shown in big numbers' },
    { id: 'step3', icon: '🪙', label: 'Count Your Coins', detail: 'Click coin buttons to reach the total' },
    { id: 'step4', icon: '✅', label: 'Pay & Get Feedback', detail: 'Press PAY and hear the shopkeeper!' },
];

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

const Practice4Page = ({ onBack }) => {
    const [cards, setCards] = useState(() => shuffle(CORRECT_ORDER));
    const [draggedId, setDraggedId] = useState(null);
    const [dragOverId, setDragOverId] = useState(null);
    const [checked, setChecked] = useState(false);
    const [result, setResult] = useState(null); // null | 'correct' | 'wrong'
    const [correctMask, setCorrectMask] = useState([]); // which indices are correct
    const [focusedIdx, setFocusedIdx] = useState(null);
    const [pickedUpIdx, setPickedUpIdx] = useState(null); // for keyboard drag

    // Keyboard: Tab to focus, Space to pick/drop
    useEffect(() => {
        const handleKey = (e) => {
            if (checked) return;
            if (e.key === 'Tab') {
                e.preventDefault();
                setFocusedIdx(prev => (prev === null ? 0 : (prev + 1) % cards.length));
            }
            if (e.key === 'Space' || e.key === ' ') {
                e.preventDefault();
                if (focusedIdx === null) return;
                if (pickedUpIdx === null) {
                    setPickedUpIdx(focusedIdx);
                } else {
                    // Swap picked-up card with focused card
                    const newCards = [...cards];
                    [newCards[pickedUpIdx], newCards[focusedIdx]] = [newCards[focusedIdx], newCards[pickedUpIdx]];
                    setCards(newCards);
                    setPickedUpIdx(null);
                }
            }
            if (e.key === 'Enter') checkOrder();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [focusedIdx, pickedUpIdx, cards, checked]);

    // Drag events
    const onDragStart = (e, id) => {
        setDraggedId(id);
        e.dataTransfer.effectAllowed = 'move';
    };
    const onDragOver = (e, id) => {
        e.preventDefault();
        setDragOverId(id);
    };
    const onDrop = (e, targetId) => {
        e.preventDefault();
        if (!draggedId || draggedId === targetId) { setDragOverId(null); return; }
        const from = cards.findIndex(c => c.id === draggedId);
        const to = cards.findIndex(c => c.id === targetId);
        const newCards = [...cards];
        [newCards[from], newCards[to]] = [newCards[to], newCards[from]];
        setCards(newCards);
        setDraggedId(null);
        setDragOverId(null);
    };

    const checkOrder = () => {
        const mask = cards.map((c, i) => c.id === CORRECT_ORDER[i].id);
        setCorrectMask(mask);
        setChecked(true);
        setResult(mask.every(Boolean) ? 'correct' : 'wrong');
    };

    const reset = () => {
        setCards(shuffle(CORRECT_ORDER));
        setChecked(false); setResult(null);
        setCorrectMask([]); setFocusedIdx(null); setPickedUpIdx(null);
    };

    return (
        <ScreenCaptureWrapper label="Capture My Sequence">
            <Container className="py-4" style={{ maxWidth: 620 }}>
                <div className="mb-4" style={{ borderLeft: '6px solid #FFAAA5', paddingLeft: 16 }}>
                    <h2 className="fw-bold" style={{ color: '#5D5C61' }}>📋 Practice 4 – Sequence Builder</h2>
                    <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>
                        Drag the steps into the correct order! <br />
                        <kbd>Tab</kbd> to focus · <kbd>Space</kbd> to pick up / place · <kbd>Enter</kbd> to check · <kbd>S</kbd> to screenshot
                    </p>
                </div>

                {/* Instruction */}
                <div className="text-center mb-4 p-2 rounded" style={{ backgroundColor: '#fff8f8', border: '2px dashed #FFAAA5', borderRadius: 12 }}>
                    <strong>Put the 4 Calm Market steps in the right order ↓</strong>
                </div>

                {/* Card stack */}
                <div className="d-flex flex-column gap-3 mb-4">
                    {cards.map((card, idx) => {
                        const isCorrect = checked && correctMask[idx];
                        const isWrong = checked && !correctMask[idx];
                        const isFocused = focusedIdx === idx;
                        const isPickedUp = pickedUpIdx === idx;
                        const isDragTarget = dragOverId === card.id;

                        return (
                            <div
                                key={card.id}
                                draggable={!checked}
                                onDragStart={(e) => onDragStart(e, card.id)}
                                onDragOver={(e) => onDragOver(e, card.id)}
                                onDrop={(e) => onDrop(e, card.id)}
                                onDragEnd={() => { setDraggedId(null); setDragOverId(null); }}
                                tabIndex={0}
                                onClick={() => {
                                    if (checked) return;
                                    if (pickedUpIdx === null) setPickedUpIdx(idx);
                                    else {
                                        const newCards = [...cards];
                                        [newCards[pickedUpIdx], newCards[idx]] = [newCards[idx], newCards[pickedUpIdx]];
                                        setCards(newCards); setPickedUpIdx(null);
                                    }
                                    setFocusedIdx(idx);
                                }}
                                className={`seq-card ${isPickedUp ? 'seq-picked' : ''}`}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: 16,
                                    padding: '14px 20px', borderRadius: 16,
                                    border: `3px solid ${isCorrect ? '#A8E6CF' : isWrong ? '#FFAAA5' : isDragTarget ? '#A8E6CF' : isFocused ? '#C3B1E1' : '#ddd'}`,
                                    backgroundColor: isCorrect ? '#f0fff8' : isWrong ? '#fff5f5' : isDragTarget ? '#f5fff8' : isPickedUp ? '#f0ebff' : '#fffdf5',
                                    cursor: checked ? 'default' : 'grab',
                                    transform: isDragTarget ? 'scale(1.02)' : isPickedUp ? 'scale(1.03) rotate(-1deg)' : 'scale(1)',
                                    boxShadow: isFocused ? '0 0 0 3px #C3B1E1' : '2px 2px 0 #eee',
                                    transition: 'all 0.2s ease',
                                    outline: 'none',
                                    opacity: draggedId === card.id ? 0.4 : 1,
                                }}
                            >
                                {/* Step number */}
                                <div style={{
                                    minWidth: 36, height: 36, borderRadius: '50%',
                                    backgroundColor: isCorrect ? '#A8E6CF' : isWrong ? '#FFAAA5' : '#eee',
                                    border: '2px solid #5D5C61',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontWeight: 'bold', fontSize: '0.9rem', color: '#5D5C61',
                                }}>
                                    {idx + 1}
                                </div>
                                <span style={{ fontSize: '1.8rem' }}>{card.icon}</span>
                                <div className="flex-grow-1">
                                    <div className="fw-bold" style={{ color: '#5D5C61' }}>{card.label}</div>
                                    <div className="text-muted" style={{ fontSize: '0.82rem' }}>{card.detail}</div>
                                </div>
                                {checked && (
                                    <span style={{ fontSize: '1.4rem' }}>{isCorrect ? '✅' : '❌'}</span>
                                )}
                                {!checked && (
                                    <span style={{ fontSize: '1.2rem', color: '#ccc' }}>⠿</span>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Feedback */}
                {result === 'correct' && (
                    <div className="text-center p-4 mb-3 rounded" style={{ backgroundColor: '#A8E6CF', border: '3px solid #5D5C61', borderRadius: 16 }}>
                        <div style={{ fontSize: '3rem' }}>🎉</div>
                        <h4 className="fw-bold mt-1">Perfect sequence!</h4>
                        <p className="mb-0 text-muted">You know the Calm Market routine by heart! Press <kbd>S</kbd> to save.</p>
                    </div>
                )}
                {result === 'wrong' && (
                    <div className="text-center p-3 mb-3 rounded" style={{ backgroundColor: '#fff5f0', border: '3px solid #FFAAA5', borderRadius: 16 }}>
                        <p className="mb-0">🤔 Not quite — some steps are out of order. Try again!</p>
                    </div>
                )}

                {/* Buttons */}
                <div className="d-flex gap-3 justify-content-center">
                    {!checked
                        ? <Button onClick={checkOrder} style={{ backgroundColor: '#FFAAA5', border: '3px solid #5D5C61', borderRadius: 12, color: '#5D5C61', fontWeight: 'bold', boxShadow: '4px 4px 0 #5D5C61', padding: '10px 24px' }}>✔ Check Order</Button>
                        : <Button onClick={reset} style={{ backgroundColor: '#A8E6CF', border: '3px solid #5D5C61', borderRadius: 12, color: '#5D5C61', fontWeight: 'bold', boxShadow: '4px 4px 0 #5D5C61' }}>🔄 Shuffle & Retry</Button>
                    }
                    <Button variant="outline-secondary" style={{ borderRadius: 12, border: '3px solid #ccc' }} onClick={onBack}>← Back</Button>
                </div>
            </Container>
        </ScreenCaptureWrapper>
    );
};

export default Practice4Page;
