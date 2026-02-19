import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';
import ScreenCaptureWrapper from './ScreenCaptureWrapper';

const SHOP_ITEMS = [
    { id: 1, name: 'Apple', price: 3, emoji: '🍎' },
    { id: 2, name: 'Milk', price: 5, emoji: '🥛' },
    { id: 3, name: 'Bread', price: 4, emoji: '🍞' },
    { id: 4, name: 'Banana', price: 2, emoji: '🍌' },
];

const COINS = [
    { value: 1, color: '#FFD700', border: '#B8860B', label: '1' },
    { value: 5, color: '#C0C0C0', border: '#808080', label: '5' },
    { value: 10, color: '#CD7F32', border: '#8B4513', label: '10' },
];

const Practice1Page = ({ onBack }) => {
    const [basket, setBasket] = useState([]);
    const [coins, setCoins] = useState(0);
    const [feedback, setFeedback] = useState(null); // null | 'correct' | 'over' | 'under'
    const [hoveredItem, setHoveredItem] = useState(null);
    const [hoveredCoin, setHoveredCoin] = useState(null);
    const [dragOver, setDragOver] = useState(false);
    const [shake, setShake] = useState(false);
    const basketRef = useRef(null);

    const basketTotal = basket.reduce((s, i) => s + i.price, 0);
    const diff = coins - basketTotal;

    // Keyboard shortcuts
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Enter') handlePay();
            if (e.key === 'Escape') { setBasket([]); setCoins(0); setFeedback(null); }
            if (e.key === '1') addCoin(1);
            if (e.key === '5') addCoin(5);
            if (e.key === '0') addCoin(10);
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [coins, basket, feedback]);

    const addToBasket = (item) => {
        if (feedback) return;
        setBasket(prev => [...prev, item]);
    };

    const addCoin = (val) => {
        if (feedback === 'correct') return;
        setCoins(prev => prev + val);
    };

    const handlePay = () => {
        if (basket.length === 0 || feedback === 'correct') return;
        if (coins === basketTotal) {
            setFeedback('correct');
        } else if (coins > basketTotal) {
            setFeedback('over');
            triggerShake();
        } else {
            setFeedback('under');
            triggerShake();
        }
    };

    const triggerShake = () => {
        setShake(true);
        setTimeout(() => setShake(false), 500);
    };

    const resetRound = () => {
        setBasket([]);
        setCoins(0);
        setFeedback(null);
    };

    // Drag events for basket zone
    const onDragStart = (e, item) => {
        e.dataTransfer.setData('itemId', item.id);
        e.dataTransfer.setData('itemName', item.name);
        e.dataTransfer.setData('itemPrice', item.price);
        e.dataTransfer.setData('itemEmoji', item.emoji);
    };

    const onDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        if (feedback) return;
        const item = {
            id: Date.now(),
            name: e.dataTransfer.getData('itemName'),
            price: parseInt(e.dataTransfer.getData('itemPrice')),
            emoji: e.dataTransfer.getData('itemEmoji'),
        };
        setBasket(prev => [...prev, item]);
    };

    return (
        <ScreenCaptureWrapper label="Capture My Shopping Result">
            <Container className="py-4">
                {/* Header */}
                <div className="mb-4" style={{ borderLeft: '6px solid #A8E6CF', paddingLeft: 16 }}>
                    <h2 className="fw-bold" style={{ color: '#5D5C61' }}>🛒 Practice 1 – Shopping Role-Play</h2>
                    <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>
                        Click or <strong>drag items</strong> into your basket, then click coins to pay. <br />
                        <kbd>Enter</kbd> = Pay &nbsp; <kbd>Esc</kbd> = Clear &nbsp; <kbd>1</kbd>/<kbd>5</kbd>/<kbd>0</kbd> = Add coin &nbsp; <kbd>S</kbd> = Screenshot
                    </p>
                </div>

                <Row className="g-4">
                    {/* Shop Shelf */}
                    <Col xs={12} md={6}>
                        <h5 className="fw-bold mb-3">🏪 Shop Shelf</h5>
                        <Row className="g-3">
                            {SHOP_ITEMS.map(item => (
                                <Col xs={6} key={item.id}>
                                    <div
                                        draggable
                                        onDragStart={(e) => onDragStart(e, item)}
                                        onClick={() => addToBasket(item)}
                                        onMouseEnter={() => setHoveredItem(item.id)}
                                        onMouseLeave={() => setHoveredItem(null)}
                                        className="text-center p-3 rounded"
                                        style={{
                                            border: `3px solid ${hoveredItem === item.id ? '#A8E6CF' : '#ddd'}`,
                                            borderRadius: 16,
                                            backgroundColor: hoveredItem === item.id ? '#f0faf5' : '#fff',
                                            cursor: 'grab',
                                            transform: hoveredItem === item.id ? 'scale(1.06) rotate(-1deg)' : 'scale(1)',
                                            transition: 'all 0.2s ease',
                                            boxShadow: hoveredItem === item.id ? '4px 4px 0 #A8E6CF' : '2px 2px 0 #eee',
                                        }}
                                    >
                                        <div style={{ fontSize: '2.8rem' }}>{item.emoji}</div>
                                        <div className="fw-bold" style={{ color: '#5D5C61' }}>{item.name}</div>
                                        <Badge style={{ backgroundColor: '#FFD700', color: '#5D5C61', border: '2px solid #B8860B', fontSize: '0.85rem' }}>
                                            🪙 {item.price}
                                        </Badge>
                                        {hoveredItem === item.id && (
                                            <div style={{ fontSize: '0.7rem', color: '#A8E6CF', marginTop: 4 }}>Click or drag me!</div>
                                        )}
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </Col>

                    {/* Basket + Payment */}
                    <Col xs={12} md={6}>
                        {/* Basket Drop Zone */}
                        <h5 className="fw-bold mb-2">🧺 Your Basket</h5>
                        <div
                            ref={basketRef}
                            onDrop={onDrop}
                            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                            onDragLeave={() => setDragOver(false)}
                            className="practice-basket mb-3"
                            style={{
                                minHeight: 80,
                                borderColor: dragOver ? '#A8E6CF' : '#ccc',
                                backgroundColor: dragOver ? '#f0fff8' : '#fffdf5',
                                transform: dragOver ? 'scale(1.01)' : 'scale(1)',
                                transition: 'all 0.2s',
                            }}
                        >
                            {basket.length === 0 ? (
                                <span className="text-muted">Drop items here or click them above ↑</span>
                            ) : (
                                <div className="d-flex flex-wrap gap-2 justify-content-center">
                                    {basket.map((item, i) => (
                                        <span key={i} style={{ fontSize: '1.8rem' }} title={`${item.name} – 🪙${item.price}`}>{item.emoji}</span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Basket Total */}
                        {basket.length > 0 && (
                            <div className="text-center mb-3 p-2 rounded" style={{ backgroundColor: '#FFF8E1', border: '2px dashed #FFD700', borderRadius: 12 }}>
                                <strong style={{ fontSize: '1.1rem' }}>Basket Total: 🪙 {basketTotal}</strong>
                            </div>
                        )}

                        {/* Coin Buttons */}
                        <h5 className="fw-bold mb-2">🪙 Pay with Coins</h5>
                        <div className="d-flex justify-content-center gap-3 mb-3">
                            {COINS.map(coin => (
                                <div
                                    key={coin.value}
                                    onClick={() => addCoin(coin.value)}
                                    onMouseEnter={() => setHoveredCoin(coin.value)}
                                    onMouseLeave={() => setHoveredCoin(null)}
                                    className="coin-quiz-btn"
                                    style={{
                                        width: 64, height: 64, borderRadius: '50%',
                                        backgroundColor: coin.color, border: `4px solid ${coin.border}`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '1.3rem', fontWeight: 'bold', color: '#fff',
                                        textShadow: '1px 1px 0 rgba(0,0,0,0.3)',
                                        boxShadow: hoveredCoin === coin.value ? `0 6px 0 ${coin.border}` : `0 4px 0 ${coin.border}`,
                                        transform: hoveredCoin === coin.value ? 'translateY(-3px)' : 'translateY(0)',
                                        transition: 'all 0.15s ease', cursor: 'pointer',
                                    }}
                                >
                                    {coin.label}
                                </div>
                            ))}
                        </div>

                        {/* Coin total bar */}
                        <div className={`text-center mb-3 p-2 rounded ${shake ? 'shake' : ''}`} style={{ backgroundColor: '#fff', border: '2px dashed #ccc', borderRadius: 12 }}>
                            <span className="fw-bold">Coins in hand: 🪙 {coins}</span>
                            {basket.length > 0 && coins > 0 && (
                                <div style={{ fontSize: '0.85rem', color: diff > 0 ? '#e74c3c' : diff < 0 ? '#e67e22' : '#27ae60', marginTop: 4 }}>
                                    {diff > 0 ? `🔴 ${diff} too many` : diff < 0 ? `🟠 Need ${Math.abs(diff)} more` : '🟢 Exact! Press PAY'}
                                </div>
                            )}
                        </div>

                        {/* Feedback */}
                        {feedback === 'correct' && (
                            <div className="text-center p-3 mb-3 rounded" style={{ backgroundColor: '#A8E6CF', border: '3px solid #5D5C61', borderRadius: 16, fontSize: '1.3rem', fontWeight: 'bold' }}>
                                🎉 Correct! You paid exactly right!
                            </div>
                        )}
                        {(feedback === 'over' || feedback === 'under') && (
                            <div className="text-center p-3 mb-3 rounded" style={{ backgroundColor: '#FFE0E0', border: '3px solid #FFAAA5', borderRadius: 16 }}>
                                {feedback === 'over' ? '😅 Too much! Clear and try again.' : '🤔 Not enough! Add more coins.'}
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="d-flex gap-2 justify-content-center">
                            <Button
                                onClick={handlePay}
                                disabled={basket.length === 0 || feedback === 'correct'}
                                style={{ backgroundColor: '#A8E6CF', border: '3px solid #5D5C61', borderRadius: 12, color: '#5D5C61', fontWeight: 'bold', boxShadow: '4px 4px 0 #5D5C61', fontSize: '1.1rem', padding: '10px 28px' }}
                            >
                                PAY 💳
                            </Button>
                            <Button
                                variant="outline-warning"
                                onClick={resetRound}
                                style={{ borderRadius: 12, border: '3px solid #ccc' }}
                            >
                                Clear 🗑️
                            </Button>
                        </div>
                    </Col>
                </Row>

                <div className="text-center mt-4">
                    <Button variant="outline-secondary" style={{ borderRadius: 12, border: '3px solid #ccc' }} onClick={onBack}>
                        ← Back to Strategies
                    </Button>
                </div>
            </Container>
        </ScreenCaptureWrapper>
    );
};

export default Practice1Page;
