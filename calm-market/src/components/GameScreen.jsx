import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import ShopItem from './ShopItem';
import CoinBar from './MathVisuals/CoinBar';
import NumberLine from './MathVisuals/NumberLine';
import Shopkeeper from './Shopkeeper';

// AI Hooks & Logic
import AdaptiveLogic from '../ai/AdaptiveLogic';
import useVoiceCommand from '../ai/useVoiceCommand';
import ObjectHunter from '../ai/ObjectHunter';
import MoodGuardian from '../ai/MoodGuardian';

// Game Items Data
const SHOP_ITEMS = [
    { id: 1, name: 'Apple', price: 3, imageName: 'apple_cartoon' },
    { id: 2, name: 'Milk', price: 5, imageName: 'milk_cartoon' },
    { id: 3, name: 'Bread', price: 4, imageName: 'bread_cartoon' },
    { id: 4, name: 'Banana', price: 2, imageName: 'banana_cartoon' },
    { id: 5, name: 'Candy', price: 1, imageName: 'candy_cartoon' },
    { id: 6, name: 'Toy Car', price: 7, imageName: 'toy_car_cartoon' },
    { id: 7, name: 'Book', price: 6, imageName: 'book_cartoon' },
    { id: 8, name: 'Crayon', price: 8, imageName: 'crayon_cartoon' },
];

const GameScreen = ({ level, onLevelChange, onEndGame, onAddStat }) => {

    // Gameplay State
    const [currentItems, setCurrentItems] = useState([]); // Array of items
    const [targetPrice, setTargetPrice] = useState(0);
    const [currentCoins, setCurrentCoins] = useState(0);
    const [feedback, setFeedback] = useState(''); // '', 'correct', 'incorrect'
    const [shopkeeperMsg, setShopkeeperMsg] = useState('Welcome! Click coins to buy.');
    const [startTime, setStartTime] = useState(Date.now());

    // AI Settings State
    const [showAISettings, setShowAISettings] = useState(false);
    const [useAdaptive, setUseAdaptive] = useState(true);
    const [useVoice, setUseVoice] = useState(false);
    const [useObjectHunter, setUseObjectHunter] = useState(false);
    const [useMood, setUseMood] = useState(false);

    // AI Feedback State
    const [voiceActive, setVoiceActive] = useState(false);

    // Object Hunter Mode
    const [isHunting, setIsHunting] = useState(false);

    // (Level is intentionally NOT persisted — always starts fresh at 1)

    // Start new round
    useEffect(() => {
        AdaptiveLogic.startLevel();
        startRound();
    }, []);

    const startRound = () => {
        // Determine number of items based on level (Simple progression)
        // Level 1-3: 1 Item
        // Level 4+: 50% chance of 2 Items
        const numItems = (level > 3 && Math.random() > 0.5) ? 2 : 1;

        const newItems = [];
        let total = 0;

        for (let i = 0; i < numItems; i++) {
            const randomItem = SHOP_ITEMS[Math.floor(Math.random() * SHOP_ITEMS.length)];
            newItems.push(randomItem);
            total += randomItem.price;
        }

        setCurrentItems(newItems);
        setTargetPrice(total);
        setCurrentCoins(0);
        setFeedback('');
        setStartTime(Date.now()); // Reset timer

        if (numItems === 1) {
            setShopkeeperMsg(`That ${newItems[0].name} costs ${total} coins.`);
        } else {
            setShopkeeperMsg(`A ${newItems[0].name} and ${newItems[1].name}! Total is ${total} coins.`);
        }
    };

    const handleAddCoin = (value) => {
        if (feedback === 'correct') return;
        setCurrentCoins(prev => prev + value);
    };

    const handleClearCoins = () => {
        if (feedback === 'correct') return;
        setCurrentCoins(0);
    };

    const handlePay = () => {
        if (feedback === 'correct') return;

        // Adaptive Logic
        const isCorrect = currentCoins === targetPrice;
        if (useAdaptive) AdaptiveLogic.recordAttempt(isCorrect);

        // Calculate Time Taken
        const timeTaken = (Date.now() - startTime) / 1000;

        if (isCorrect) {
            handleSuccess(timeTaken);
        } else {
            handleFailure(timeTaken);
        }
    };

    const handleFailure = (timeTaken) => {
        setFeedback('incorrect');

        const diff = currentCoins - targetPrice;
        let msg = "Not quite right. Try again!";
        if (diff > 0) msg = "That's too much money!";
        if (diff < 0) msg = "That's not enough money!";

        setShopkeeperMsg(msg);

        // Adaptive Hint
        if (useAdaptive) {
            const suggestion = AdaptiveLogic.getSuggestion();
            if (suggestion === 'decrease') {
                setShopkeeperMsg(msg + " (Try counting one by one!)");
            }
        }

        onAddStat({
            type: 'purchase_attempt',
            items: currentItems.map(i => i.name).join(', '),
            target: targetPrice,
            actual: currentCoins,
            correct: false,
            timeTaken: timeTaken,
            timestamp: Date.now()
        });

        setTimeout(() => {
            setFeedback('');
            // Restore original message
            if (currentItems.length === 1) {
                setShopkeeperMsg(`That ${currentItems[0].name} costs ${targetPrice} coins.`);
            } else {
                setShopkeeperMsg(`Total for ${currentItems[0].name} and ${currentItems[1].name} is ${targetPrice}.`);
            }
        }, 2500);
    };

    const handleSuccess = (timeTaken) => {
        setFeedback('correct');
        setShopkeeperMsg('Great job! Here are your items!');

        // Adaptive Logic
        if (useAdaptive) {
            const suggestion = AdaptiveLogic.getSuggestion();
            if (suggestion === 'increase') console.log("AI Suggests: Increase Difficulty!");
        }

        onAddStat({
            type: 'purchase_success',
            items: currentItems.map(i => i.name).join(', '),
            target: targetPrice,
            actual: currentCoins,
            correct: true,
            timeTaken: timeTaken,
            timestamp: Date.now()
        });

        setTimeout(() => {
            onLevelChange(l => l + 1);
            AdaptiveLogic.startLevel();
            startRound();
        }, 2500);
    };

    // AI Voice Hook
    const { isListening, setIsListening, transcript } = useVoiceCommand((cmd, val) => {
        if (!useVoice) return;

        // Visual Feedback trigger
        setVoiceActive(true);
        setTimeout(() => setVoiceActive(false), 500);

        if (cmd === 'pay') handlePay();
        if (cmd === 'clear') handleClearCoins();
        if (cmd === 'add' && val) handleAddCoin(val);
    });

    // Toggle Voice on setting change
    useEffect(() => {
        setIsListening(useVoice);
    }, [useVoice, setIsListening]);

    // Object Hunter Callback
    const handleObjectFound = (detectedClass) => {
        setShopkeeperMsg(`I see a ${detectedClass}! Wow!`);
        // For demo, we treat any detection as a "Trade" for a discount or coin
        handleAddCoin(1);
        setIsHunting(false);
    };

    if (currentItems.length === 0) return <div>Loading...</div>;

    return (
        <Container className="mt-4 position-relative">

            {/* Mood Guardian (Invisible logic) */}
            {useMood && <MoodGuardian onMoodChange={(mood) => setShopkeeperMsg("Take a deep breath... You are doing great!")} />}

            {/* Header: Level + Buttons aligned */}
            <Row className="mb-3 align-items-center">
                <Col xs={4}>
                    <h4 className="m-0">Level {level}</h4>
                    {useVoice && (
                        <span className={`badge ${voiceActive ? 'bg-success' : 'bg-danger'} transition-all`} style={{ transition: 'background-color 0.3s' }}>
                            🎤 {voiceActive ? 'Heard!' : 'Listening...'} {transcript && `(${transcript})`}
                        </span>
                    )}
                </Col>
                <Col xs={8} className="text-end dflex justify-content-end gap-2">
                    <Button variant="outline-info" size="sm" className="me-2" onClick={() => setShowAISettings(true)}>🤖 AI Settings</Button>
                    <Button variant="danger" size="sm" onClick={onEndGame}>Exit Game</Button>
                </Col>
            </Row>

            {/* Shopkeeper Area */}
            <Row className="align-items-center mb-3">
                <Col md={5} className="text-center d-none d-md-block">
                    {/* Market Awning Decoration (Fills empty space) */}
                    <img
                        src="/assets/items/market_awning.png"
                        alt="Market Stand"
                        style={{
                            width: '100%',
                            maxWidth: '350px',
                            filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.2))',
                            transform: 'rotate(-2deg)'
                        }}
                    />
                </Col>
                <Col md={7}>
                    <Shopkeeper message={shopkeeperMsg} />
                </Col>
            </Row>

            {/* Main Game Area */}
            <Row className="justify-content-center align-items-center mt-3">

                {/* Item Display Area */}
                <Col md={5} className="mb-4 text-center text-center">
                    {isHunting ? (
                        <ObjectHunter
                            targetObject={currentItems[0]?.name}
                            onFound={handleObjectFound}
                            onCancel={() => setIsHunting(false)}
                        />
                    ) : (
                        <div style={{ transform: feedback === 'correct' ? 'scale(1.1)' : 'scale(1)', transition: 'all 0.5s', paddingTop: '10px' }} className="d-flex justify-content-center align-items-center gap-2">
                            {currentItems.map((item, idx) => (
                                <div key={idx} className="position-relative">
                                    <ShopItem item={item} />
                                    {idx < currentItems.length - 1 && (
                                        <div className="position-absolute top-50 start-100 translate-middle" style={{ zIndex: 10, fontSize: '3rem', fontWeight: 'bold', color: '#5D5C61', textShadow: '2px 2px 0 #fff' }}>
                                            +
                                        </div>
                                    )}
                                </div>
                            ))}

                            {useObjectHunter && (
                                <div className="position-absolute bottom-0 start-50 translate-middle-x mb-n4" style={{ zIndex: 20 }}>
                                    <Button variant="info" size="sm" onClick={() => setIsHunting(true)}>📷 Scan Real Item</Button>
                                </div>
                            )}
                        </div>
                    )}
                </Col>

                {/* Interaction Area */}
                < Col md={7} >
                    <NumberLine current={currentCoins} target={targetPrice} max={20} />

                    <div className="my-3 text-center p-2 rounded" style={{ backgroundColor: '#fff', border: '2px dashed #ccc' }}>
                        <h5 className="mb-2">Total Paid: {currentCoins}</h5>
                        <div className="d-flex justify-content-center gap-2 flex-wrap" style={{ minHeight: '30px' }}>
                            {Array.from({ length: Math.min(currentCoins, 25) }).map((_, i) => (
                                <div key={i} style={{
                                    width: '15px', height: '15px', borderRadius: '50%', backgroundColor: '#FFD700', border: '1px solid #B8860B'
                                }}></div>
                            ))}
                            {currentCoins > 25 && <span>...</span>}
                        </div>
                    </div>

                    <div className="text-center mt-3 p-3 rounded card-calm" style={{ backgroundColor: '#FFF8E1' }}>
                        <Row className="align-items-center">
                            <Col className="d-flex justify-content-center gap-4 mb-3">
                                <CoinButton value={1} onClick={() => handleAddCoin(1)} color="#FFD700" label="1" />
                                <CoinButton value={5} onClick={() => handleAddCoin(5)} color="#C0C0C0" label="5" />
                                <CoinButton value={10} onClick={() => handleAddCoin(10)} color="#CD7F32" label="10" />
                            </Col>

                            <Col xs={12} className="d-flex justify-content-center gap-3">
                                <Button variant="warning" onClick={handleClearCoins} disabled={feedback === 'correct'}>Clear</Button>
                                <Button variant="success" size="lg" onClick={handlePay} disabled={feedback === 'correct'} className="px-5 btn-calm-primary">PAY NOW</Button>
                            </Col>
                        </Row>
                    </div>
                </Col >
            </Row >

            {/* AI Settings Modal */}
            < Modal show={showAISettings} onHide={() => setShowAISettings(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>🤖 AI Features Settings</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Check
                            type="switch"
                            label="🧠 Adaptive Difficulty (Smart AI)"
                            checked={useAdaptive}
                            onChange={(e) => setUseAdaptive(e.target.checked)}
                            className="mb-3"
                        />
                        <Form.Check
                            type="switch"
                            label="🎤 Voice Commands ('Pay', 'Five')"
                            checked={useVoice}
                            onChange={(e) => setUseVoice(e.target.checked)}
                            className="mb-3"
                        />
                        <Form.Check
                            type="switch"
                            label="📷 Object Hunter (Use Camera)"
                            checked={useObjectHunter}
                            onChange={(e) => setUseObjectHunter(e.target.checked)}
                            className="mb-3"
                        />
                        <Form.Check
                            type="switch"
                            label="😌 Mood Guardian (Emotion AI)"
                            checked={useMood}
                            onChange={(e) => setUseMood(e.target.checked)}
                            className="mb-3"
                        />
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAISettings(false)}>Close</Button>
                </Modal.Footer>
            </Modal >

        </Container >
    );
};

// Helper for Coin Buttons
const CoinButton = ({ value, onClick, color, label }) => (
    <div
        onClick={onClick}
        className="coin-btn"
        style={{
            width: '70px', height: '70px', backgroundColor: color, borderRadius: '50%', border: '4px solid rgba(0,0,0,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold',
            color: '#fff', textShadow: '1px 1px 0 rgba(0,0,0,0.3)', boxShadow: '0 4px 0 rgba(0,0,0,0.2)', cursor: 'pointer', userSelect: 'none'
        }}
    >
        {label}
    </div>
);

export default GameScreen;
