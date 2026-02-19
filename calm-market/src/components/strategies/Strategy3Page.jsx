import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

const visuals = [
    { icon: '🖼️', label: 'Coin Picture Cards', color: '#FFD3B6', desc: 'Each coin denomination displayed as a colourful, labelled icon. Children associate visual appearance with numerical value before counting.' },
    { icon: '📏', label: 'Number Line', color: '#FFD3B6', desc: 'A number-line animation shows a marker jumping from zero toward the target price as coins are added—making addition concrete and spatial.' },
    { icon: '🎨', label: 'Colour-Coding', color: '#FFD3B6', desc: 'Gold = 1 coin, Silver = 5 coins, Bronze = 10 coins. Consistent colour mapping reduces cognitive load and speeds coin recognition.' },
    { icon: '📱', label: 'Digital Manipulatives', color: '#FFD3B6', desc: 'Each click/drag of a coin icon is a digital version of physically placing a coin—bridging the concrete-to-abstract gap described in research.' },
    { icon: '↕️', label: 'Dot Representation', color: '#FFD3B6', desc: 'A row of golden dots below the total panel gives a one-to-one concrete representation of the coin count, reinforcing cardinality.' },
    { icon: '✅', label: 'Immediate Feedback', color: '#FFD3B6', desc: 'Green glow on correct answers / gentle red on wrong ones. Visual difference (not relying on sound alone) supports diverse sensory needs.' },
];

const Strategy3Page = ({ onBack }) => {
    return (
        <Container className="py-5">
            <div className="strategy-page-header mb-5" style={{ borderLeft: '6px solid #FFD3B6', paddingLeft: 20 }}>
                <span className="badge mb-2" style={{ backgroundColor: '#FFD3B6', color: '#5D5C61' }}>Paragraph 3 – Visual Supports & Manipulatives</span>
                <h1 className="fw-bold" style={{ color: '#5D5C61' }}>📏 Visual Supports & Number Lines</h1>
                <p className="lead text-muted">
                    Research shows that combining <strong>explicit counting strategies with visual representations and concrete objects</strong> is the most effective approach for teaching math to autistic learners.
                </p>
            </div>

            {/* Feature grid */}
            <h4 className="fw-bold mb-3" style={{ color: '#5D5C61' }}>Visual Strategies in Calm Market</h4>
            <Row className="g-4 mb-5">
                {visuals.map((v, i) => (
                    <Col key={i} xs={12} sm={6} md={4}>
                        <Card className="h-100 text-center p-3" style={{ border: `3px solid ${v.color}`, borderRadius: 16, backgroundColor: '#fffdf5' }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: 8 }}>{v.icon}</div>
                            <h6 className="fw-bold" style={{ color: '#5D5C61' }}>{v.label}</h6>
                            <p className="text-muted mb-0" style={{ fontSize: '0.875rem' }}>{v.desc}</p>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Concrete → Abstract Bridge */}
            <div className="p-4 mb-4 rounded" style={{ backgroundColor: '#fff8f0', border: '3px solid #FFD3B6', borderRadius: 16 }}>
                <h4 className="fw-bold mb-3" style={{ color: '#5D5C61' }}>🧱 Concrete → Representational → Abstract (CRA)</h4>
                <div className="d-flex flex-column flex-md-row gap-3 text-center">
                    {[
                        { label: 'Concrete', icon: '🪙', desc: 'Click physical-looking coin icons to add real amounts.' },
                        { label: 'Representational', icon: '📏', desc: 'Number line jumps show what addition looks like spatially.' },
                        { label: 'Abstract', icon: '🔢', desc: 'Numeric total updates in real-time — the symbolic equation.' },
                    ].map((c, i) => (
                        <div key={i} className="flex-1 p-3 rounded" style={{ flex: 1, border: '2px dashed #FFD3B6', borderRadius: 12, backgroundColor: '#fff' }}>
                            <div style={{ fontSize: '2rem' }}>{c.icon}</div>
                            <strong>{c.label}</strong>
                            <p className="text-muted mb-0 mt-1" style={{ fontSize: '0.85rem' }}>{c.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="p-3 rounded text-muted" style={{ backgroundColor: '#fffdf5', border: '2px dashed #ccc', fontSize: '0.85rem' }}>
                <strong>Citation:</strong> EU-JER – <a href="https://www.eu-jer.com/the-impacts-of-mathematics-instructional-strategy-on-students-with-autism-a-systematic-literature-review" target="_blank" rel="noreferrer">Mathematics Instructional Strategy for Students with Autism (Systematic Review)</a>
            </div>

            <div className="text-center mt-4">
                <Button variant="outline-secondary" style={{ borderRadius: 12, border: '3px solid #ccc' }} onClick={onBack}>
                    ← Back to Strategies
                </Button>
            </div>
        </Container>
    );
};

export default Strategy3Page;
