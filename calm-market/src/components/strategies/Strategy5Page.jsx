import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

const designPrinciples = [
    { icon: '🌿', label: 'Low Sensory', color: '#C3B1E1', desc: 'Cream background with subtle dot grid. No flashing ads, blinking banners, or sudden loud sounds. Every animation is gentle and purposeful.' },
    { icon: '🎮', label: 'Game-Based Motivation', color: '#C3B1E1', desc: 'Level progression, coins, and shopkeeper praise turn practice sessions into a rewarding loop—improving accuracy and motivation.' },
    { icon: '🐢', label: 'Self-Paced', color: '#C3B1E1', desc: 'No countdown timers in core gameplay. Child pays when ready. Adaptive logic tracks speed, not the child consciously.' },
    { icon: '🎨', label: 'Visual Richness (Not Clutter)', color: '#C3B1E1', desc: 'Cartoon art style and friendly stickers add visual interest without overwhelming the working area. Items and coins remain focal.' },
    { icon: '📈', label: 'Adaptive Difficulty', color: '#C3B1E1', desc: 'AI Adaptive Logic module tracks correct/incorrect answers and adjusts hints and difficulty between rounds automatically.' },
    { icon: '📊', label: 'Progress Tracking', color: '#C3B1E1', desc: 'Stats Screen logs every attempt with timestamps and accuracy, enabling caregivers and educators to review growth over time.' },
];

const research = [
    'Interactive, visually rich digital activities improve accuracy and response time for learners with intellectual and developmental disabilities.',
    'Technology-mediated interventions generate higher motivation than conventional paper tasks when structured carefully.',
    'Avoiding cluttered screens and sudden stimuli is key for autistic learners—aligned with Calm Market\'s minimal-distraction design.',
    'Allowing learner-controlled pacing boosts on-task time and reduces task-related anxiety.',
];

const Strategy5Page = ({ onBack }) => {
    return (
        <Container className="py-5">
            <div className="strategy-page-header mb-5" style={{ borderLeft: '6px solid #C3B1E1', paddingLeft: 20 }}>
                <span className="badge mb-2" style={{ backgroundColor: '#C3B1E1', color: '#5D5C61' }}>Paragraph 5 – Technology Interventions</span>
                <h1 className="fw-bold" style={{ color: '#5D5C61' }}>🎮 Calm, Game-Based Digital Interventions</h1>
                <p className="lead text-muted">
                    Research shows that <strong>interactive, visually rich digital activities</strong> can improve accuracy, motivation and response time—provided they are carefully structured and not overstimulating.
                </p>
            </div>

            {/* Design principles grid */}
            <h4 className="fw-bold mb-3" style={{ color: '#5D5C61' }}>Calm Market's Evidence-Informed Design</h4>
            <Row className="g-4 mb-5">
                {designPrinciples.map((p, i) => (
                    <Col key={i} xs={12} sm={6} md={4}>
                        <Card className="h-100 text-center p-3" style={{ border: `3px solid ${p.color}`, borderRadius: 16, backgroundColor: '#fffdf5' }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: 8 }}>{p.icon}</div>
                            <h6 className="fw-bold" style={{ color: '#5D5C61' }}>{p.label}</h6>
                            <p className="text-muted mb-0" style={{ fontSize: '0.875rem' }}>{p.desc}</p>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Research highlights */}
            <div className="p-4 mb-4 rounded" style={{ backgroundColor: '#f5f0ff', border: '3px solid #C3B1E1', borderRadius: 16 }}>
                <h4 className="fw-bold mb-3" style={{ color: '#5D5C61' }}>📄 Key Research Findings</h4>
                <ul className="mb-0" style={{ lineHeight: 2.2 }}>
                    {research.map((r, i) => (
                        <li key={i} className="text-muted" style={{ fontSize: '0.95rem' }}>{r}</li>
                    ))}
                </ul>
            </div>

            {/* AI Features summary */}
            <div className="p-4 mb-4 rounded" style={{ backgroundColor: '#fffdf5', border: '3px solid #C3B1E1', borderRadius: 16 }}>
                <h5 className="fw-bold mb-3" style={{ color: '#5D5C61' }}>🤖 AI Features Supporting These Findings</h5>
                <Row className="g-2 text-center">
                    {[
                        { icon: '🧠', label: 'Adaptive Logic', desc: 'Auto-adjusts difficulty' },
                        { icon: '🎤', label: 'Voice Commands', desc: 'Hands-free interaction' },
                        { icon: '📷', label: 'Object Hunter', desc: 'Real-world object link' },
                        { icon: '😌', label: 'Mood Guardian', desc: 'Emotion-aware pacing' },
                    ].map((ai, i) => (
                        <Col key={i} xs={6} md={3}>
                            <div className="p-2 rounded" style={{ backgroundColor: '#f0ebff', border: '2px solid #C3B1E1', borderRadius: 12 }}>
                                <div style={{ fontSize: '1.6rem' }}>{ai.icon}</div>
                                <strong style={{ fontSize: '0.85rem' }}>{ai.label}</strong>
                                <div className="text-muted" style={{ fontSize: '0.78rem' }}>{ai.desc}</div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>

            <div className="p-3 rounded text-muted" style={{ backgroundColor: '#fffdf5', border: '2px dashed #ccc', fontSize: '0.85rem' }}>
                <strong>Citation:</strong> Rehabilitation Journals – <a href="https://www.rehabilitationjournals.com/intellectual-disability-Journal/article/30/4-1-5-361.pdf" target="_blank" rel="noreferrer">Technology-Mediated Math Interventions for IDD</a>
            </div>

            <div className="text-center mt-4">
                <Button variant="outline-secondary" style={{ borderRadius: 12, border: '3px solid #ccc' }} onClick={onBack}>
                    ← Back to Strategies
                </Button>
            </div>
        </Container>
    );
};

export default Strategy5Page;
