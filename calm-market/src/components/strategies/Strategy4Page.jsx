import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const sequence = [
    { num: 1, icon: '👀', label: 'Look at Item', detail: 'Item card appears with a clear picture and price tag. No distractions—one focus at a time.' },
    { num: 2, icon: '🏷️', label: 'Check Price', detail: 'Price shown in large, bold numerals. Shopkeeper reads the price aloud (if voice enabled).' },
    { num: 3, icon: '🪙', label: 'Drag Coins', detail: 'Child clicks coin buttons to accumulate the correct total. Number line updates on each coin click.' },
    { num: 4, icon: '✅', label: 'Get Feedback', detail: 'Instant, calm feedback: green glow + shopkeeper praise (correct) or gentle hint (incorrect).' },
];

const benefits = [
    { icon: '🧩', label: 'Reduces Cognitive Load', desc: 'Breaking the task into 4 predictable micro-steps means only one decision is needed at a time.' },
    { icon: '🗓️', label: 'Routine & Predictability', desc: 'Every round follows the same sequence, helping autistic children anticipate what comes next and reducing anxiety.' },
    { icon: '🧠', label: 'Executive Function Support', desc: 'The fixed order scaffolds planning and task sequencing — skills that are often challenging for autistic learners.' },
    { icon: '😌', label: 'Reduced Anxiety', desc: 'Visual sequence + calm aesthetic ensures learners never feel surprised or overwhelmed between steps.' },
];

const Strategy4Page = ({ onBack }) => {
    return (
        <Container className="py-5">
            <div className="strategy-page-header mb-5" style={{ borderLeft: '6px solid #FFAAA5', paddingLeft: 20 }}>
                <span className="badge mb-2" style={{ backgroundColor: '#FFAAA5', color: '#5D5C61' }}>Paragraph 4 – Structured Routines</span>
                <h1 className="fw-bold" style={{ color: '#5D5C61' }}>📋 Structured Routines & Task Chaining</h1>
                <p className="lead text-muted">
                    Teaching guides stress that autistic students learn math better in <strong>structured, predictable routines</strong>, with tasks broken into clearly sequenced small steps—reducing anxiety and supporting executive function.
                </p>
            </div>

            {/* The 4-step sequence */}
            <h4 className="fw-bold mb-4" style={{ color: '#5D5C61' }}>🔁 Calm Market's Fixed Round Sequence</h4>
            <div className="d-flex flex-column gap-3 mb-5">
                {sequence.map((s, i) => (
                    <div key={i} className="d-flex align-items-center gap-4 p-3 rounded" style={{ backgroundColor: '#fff8f8', border: '3px solid #FFAAA5', borderRadius: 16 }}>
                        <div style={{ minWidth: 52, height: 52, borderRadius: '50%', backgroundColor: '#FFAAA5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', border: '3px solid #5D5C61', flexShrink: 0 }}>
                            {s.icon}
                        </div>
                        <div>
                            <strong style={{ color: '#5D5C61' }}>Step {s.num}: {s.label}</strong>
                            <p className="text-muted mb-0 mt-1" style={{ fontSize: '0.9rem' }}>{s.detail}</p>
                        </div>
                        {i < sequence.length - 1 && (
                            <div className="ms-auto" style={{ fontSize: '1.5rem', color: '#FFAAA5', flexShrink: 0 }}>→</div>
                        )}
                    </div>
                ))}
            </div>

            {/* Benefits grid */}
            <h4 className="fw-bold mb-3" style={{ color: '#5D5C61' }}>Why Structured Routines Help</h4>
            <Row className="g-3 mb-5">
                {benefits.map((b, i) => (
                    <Col key={i} xs={12} sm={6}>
                        <div className="p-3 h-100 rounded" style={{ backgroundColor: '#fffdf5', border: '3px solid #FFAAA5', borderRadius: 16 }}>
                            <span style={{ fontSize: '1.8rem', marginRight: 8 }}>{b.icon}</span>
                            <strong>{b.label}</strong>
                            <p className="text-muted mb-0 mt-1" style={{ fontSize: '0.9rem' }}>{b.desc}</p>
                        </div>
                    </Col>
                ))}
            </Row>

            <div className="p-3 rounded text-muted" style={{ backgroundColor: '#fffdf5', border: '2px dashed #ccc', fontSize: '0.85rem' }}>
                <strong>Citation:</strong> Skill Builders ABA – <a href="https://www.skillbuildersaba.com/blog/aba-approaches-for-teaching-money-skills" target="_blank" rel="noreferrer">ABA Approaches for Teaching Money Skills</a>
            </div>

            <div className="text-center mt-4">
                <Button variant="outline-secondary" style={{ borderRadius: 12, border: '3px solid #ccc' }} onClick={onBack}>
                    ← Back to Strategies
                </Button>
            </div>
        </Container>
    );
};

export default Strategy4Page;
