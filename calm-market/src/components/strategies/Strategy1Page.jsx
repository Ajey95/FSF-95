import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

const points = [
    { icon: '🛍️', title: 'Mock Grocery Store', desc: 'Children role-play buying groceries using a pretend market setup. Calm Market turns this into a digital experience so it is always available.' },
    { icon: '🃏', title: 'Task Cards with Prices', desc: 'Visual cards showing item pictures alongside their prices help learners connect real-world objects to their monetary value before attempting to pay.' },
    { icon: '💰', title: 'Real or Pretend Coins', desc: 'Repeated physical or digital coin handling builds familiarity with denominations. Calm Market uses visual coin icons that children click to accumulate totals.' },
    { icon: '📱', title: 'Technology-Assisted Learning', desc: 'Game-like structure with visual steps improves engagement and accuracy, especially when problems are presented in small chunks with immediate feedback.' },
];

const Strategy1Page = ({ onBack }) => {
    return (
        <Container className="py-5">
            <div className="strategy-page-header mb-5" style={{ borderLeft: '6px solid #A8E6CF', paddingLeft: 20 }}>
                <span className="badge mb-2" style={{ backgroundColor: '#A8E6CF', color: '#5D5C61' }}>Paragraph 1 – Overall Evidence</span>
                <h1 className="fw-bold" style={{ color: '#5D5C61' }}>🛒 Shopping Role-Play & Concrete Materials</h1>
                <p className="lead text-muted">
                    Researchers recommend teaching money and basic math to autistic children using <strong>real-life shopping role-play, concrete materials, and visual supports</strong>—not only abstract worksheets.
                </p>
            </div>

            <Row className="g-4 mb-5">
                {points.map((p, i) => (
                    <Col key={i} xs={12} sm={6} lg={3}>
                        <Card className="h-100 card-calm text-center p-3">
                            <div style={{ fontSize: '3rem', marginBottom: 12 }}>{p.icon}</div>
                            <h6 className="fw-bold">{p.title}</h6>
                            <p className="text-muted" style={{ fontSize: '0.9rem' }}>{p.desc}</p>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* How Calm Market applies it */}
            <div className="p-4 mb-4 rounded" style={{ backgroundColor: '#f0faf5', border: '3px solid #A8E6CF', borderRadius: 16 }}>
                <h4 className="fw-bold mb-3" style={{ color: '#5D5C61' }}>🎮 How Calm Market Applies This</h4>
                <ul style={{ lineHeight: 2.2, fontSize: '1rem' }}>
                    <li>The <strong>Game Screen</strong> is a digital shop where children "buy" items by dragging or clicking coin icons.</li>
                    <li>Each round presents a clear <strong>visual item card</strong> with its price—mimicking a task card in a real classroom.</li>
                    <li>Immediate, friendly shopkeeper feedback replaces teacher prompts during role-play.</li>
                    <li>Adaptive difficulty gradually increases complexity, matching the learner's current ability.</li>
                </ul>
            </div>

            <div className="p-3 rounded text-muted" style={{ backgroundColor: '#fffdf5', border: '2px dashed #ccc', fontSize: '0.85rem' }}>
                <strong>Citation:</strong> The Autism Helper – <a href="https://theautismhelper.com/table-top-money-math/" target="_blank" rel="noreferrer">Table Top Money Math</a>
            </div>

            <div className="text-center mt-4">
                <Button variant="outline-secondary" style={{ borderRadius: 12, border: '3px solid #ccc' }} onClick={onBack}>
                    ← Back to Strategies
                </Button>
            </div>
        </Container>
    );
};

export default Strategy1Page;
