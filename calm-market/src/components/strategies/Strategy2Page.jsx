import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

const steps = [
    { step: '01', label: 'Identify Coins', icon: '🔍', desc: 'Child learns to recognise each coin by its size, colour, and denomination label. Calm Market shows clearly labelled coin icons: 1, 5, and 10.' },
    { step: '02', label: 'Match Value', icon: '🔢', desc: 'Child counts out coins to match a given price, bridging visual recognition and numerical understanding.' },
    { step: '03', label: 'Simple Transaction', icon: '💳', desc: 'Child "pays" for one item, confirming the total matches the displayed price tag—the core loop of Calm Market.' },
    { step: '04', label: 'Multi-Item Purchase', icon: '🧮', desc: 'At higher levels, two items appear. Child must add prices mentally or use the on-screen number line before paying.' },
];

const Strategy2Page = ({ onBack }) => {
    return (
        <Container className="py-5">
            <div className="strategy-page-header mb-5" style={{ borderLeft: '6px solid #DCEDC1', paddingLeft: 20 }}>
                <span className="badge mb-2" style={{ backgroundColor: '#DCEDC1', color: '#5D5C61' }}>Paragraph 2 – ABA Progression</span>
                <h1 className="fw-bold" style={{ color: '#5D5C61' }}>🪙 Coin ID → Counting → Purchasing</h1>
                <p className="lead text-muted">
                    ABA guides recommend <strong>starting with coin identification, then slowly moving to counting amounts and making purchases</strong>—exactly the progression used in Calm Market's levelled gameplay.
                </p>
            </div>

            {/* Step-by-step chain */}
            <h4 className="fw-bold mb-4" style={{ color: '#5D5C61' }}>Task Chaining – Step by Step</h4>
            <div className="d-flex flex-column gap-3 mb-5">
                {steps.map((s, i) => (
                    <div key={i} className="d-flex align-items-start gap-3 p-3 rounded" style={{ backgroundColor: '#fffdf5', border: '3px solid #DCEDC1', borderRadius: 16 }}>
                        <div style={{ minWidth: 52, height: 52, borderRadius: '50%', backgroundColor: '#DCEDC1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.1rem', color: '#5D5C61', border: '3px solid #5D5C61' }}>
                            {s.step}
                        </div>
                        <div>
                            <span style={{ fontSize: '1.4rem', marginRight: 6 }}>{s.icon}</span>
                            <strong>{s.label}</strong>
                            <p className="text-muted mb-0 mt-1" style={{ fontSize: '0.9rem' }}>{s.desc}</p>
                        </div>
                        {i < steps.length - 1 && (
                            <div style={{ position: 'absolute', left: 46, marginTop: 60, fontSize: '1.5rem', color: '#DCEDC1' }}>↓</div>
                        )}
                    </div>
                ))}
            </div>

            {/* How Calm Market applies it */}
            <div className="p-4 mb-4 rounded" style={{ backgroundColor: '#f4fae8', border: '3px solid #DCEDC1', borderRadius: 16 }}>
                <h4 className="fw-bold mb-3" style={{ color: '#5D5C61' }}>🎮 Level Progression in Calm Market</h4>
                <Row>
                    <Col md={6}>
                        <p style={{ fontSize: '0.95rem' }}><strong>Levels 1–3 (1 item):</strong> Single item with a price ≤ 10 coins. Child clicks coin buttons to reach the exact total. Low cognitive load with clear visual price tag.</p>
                    </Col>
                    <Col md={6}>
                        <p style={{ fontSize: '0.95rem' }}><strong>Levels 4+ (1–2 items):</strong> A 50% chance of two items requiring addition. Shopkeeper pronounces the combined total, giving an audio cue alongside the visual price.</p>
                    </Col>
                </Row>
                <p className="mb-0 text-muted" style={{ fontSize: '0.9rem' }}>Adaptive Logic monitors accuracy and suggests increasing/decreasing difficulty, embodying the ABA principle of mastery-before-advancement.</p>
            </div>

            <div className="p-3 rounded text-muted" style={{ backgroundColor: '#fffdf5', border: '2px dashed #ccc', fontSize: '0.85rem' }}>
                <strong>Citation:</strong> MagnetABA – <a href="https://www.magnetaba.com/blog/aba-approaches-for-teaching-money-skills" target="_blank" rel="noreferrer">ABA Approaches for Teaching Money Skills</a>
            </div>

            <div className="text-center mt-4">
                <Button variant="outline-secondary" style={{ borderRadius: 12, border: '3px solid #ccc' }} onClick={onBack}>
                    ← Back to Strategies
                </Button>
            </div>
        </Container>
    );
};

export default Strategy2Page;
