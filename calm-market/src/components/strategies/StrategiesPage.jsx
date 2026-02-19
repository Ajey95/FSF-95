import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const strategies = [
    {
        id: 1,
        emoji: '🛒',
        title: 'Shopping Role-Play & Concrete Materials',
        subtitle: 'Paragraph 1 – Evidence-Based Approach',
        color: '#A8E6CF',
        desc: 'Using real-life shopping simulations, pretend coins, and visual task cards to build money-math skills.',
        view: 'strategy1',
        practiceView: 'practice1',
    },
    {
        id: 2,
        emoji: '🪙',
        title: 'Coin ID → Counting → Purchasing',
        subtitle: 'Paragraph 2 – ABA Progression',
        color: '#DCEDC1',
        desc: 'ABA-based task chaining: identify coins → match value → use coins in mock store transactions.',
        view: 'strategy2',
        practiceView: 'practice2',
    },
    {
        id: 3,
        emoji: '📏',
        title: 'Visual Supports & Number Lines',
        subtitle: 'Paragraph 3 – Manipulatives',
        color: '#FFD3B6',
        desc: 'Coin pictures, colour-coding, digital manipulatives and number-line animations to build concrete-to-abstract bridges.',
        view: 'strategy3',
        practiceView: 'practice3',
    },
    {
        id: 4,
        emoji: '📋',
        title: 'Structured Routines & Task Chaining',
        subtitle: 'Paragraph 4 – Predictable Sequences',
        color: '#FFAAA5',
        desc: 'Fixed, predictable round sequences that reduce anxiety and scaffold executive-function during money practice.',
        view: 'strategy4',
        practiceView: 'practice4',
    },
    {
        id: 5,
        emoji: '🎮',
        title: 'Calm, Game-Based Digital Interventions',
        subtitle: 'Paragraph 5 – Tech-Mediated Learning',
        color: '#C3B1E1',
        desc: 'Low-sensory, visually rich interactive games improve accuracy, motivation and reduce stress for autistic learners.',
        view: 'strategy5',
        practiceView: 'practice5',
    },
];

const StrategiesPage = ({ onNavigate, onBack }) => {
    return (
        <Container className="py-5">
            <div className="text-center mb-5">
                <h1 className="display-4 fw-bold" style={{ color: '#5D5C61' }}>
                    🧠 Autism-Informed Teaching Strategies
                </h1>
                <p className="lead text-muted" style={{ maxWidth: 680, margin: '0 auto' }}>
                    Calm Market is grounded in five evidence-based strategies for teaching
                    money &amp; math concepts to autistic children. Explore each one below.
                </p>
            </div>

            <Row className="g-4 justify-content-center">
                {strategies.map((s) => (
                    <Col key={s.id} xs={12} md={6} lg={4}>
                        <Card
                            className="h-100 card-calm strategy-card"
                            style={{ borderTop: `6px solid ${s.color}`, cursor: 'pointer' }}
                            onClick={() => onNavigate(s.view)}
                        >
                            <Card.Body className="d-flex flex-column p-4">
                                <div className="strategy-emoji mb-3">{s.emoji}</div>
                                <span className="badge mb-2" style={{ backgroundColor: s.color, color: '#5D5C61', fontSize: '0.75rem', width: 'fit-content' }}>
                                    {s.subtitle}
                                </span>
                                <Card.Title className="fw-bold" style={{ color: '#5D5C61' }}>
                                    {s.title}
                                </Card.Title>
                                <Card.Text className="text-muted flex-grow-1" style={{ fontSize: '0.95rem' }}>
                                    {s.desc}
                                </Card.Text>
                                <div className="d-flex gap-2 mt-3">
                                    <Button
                                        className="btn-calm-primary flex-grow-1"
                                        style={{ fontSize: '0.9rem', padding: '8px 10px' }}
                                        onClick={(e) => { e.stopPropagation(); onNavigate(s.view); }}
                                    >
                                        📖 Learn
                                    </Button>
                                    <Button
                                        className="flex-grow-1"
                                        style={{
                                            fontSize: '0.9rem', padding: '8px 10px',
                                            backgroundColor: s.color, border: '3px solid #5D5C61',
                                            borderRadius: 12, color: '#5D5C61', fontWeight: 'bold',
                                            boxShadow: '4px 4px 0 #5D5C61',
                                        }}
                                        onClick={(e) => { e.stopPropagation(); onNavigate(s.practiceView); }}
                                    >
                                        🎮 Practice
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <div className="text-center mt-5">
                <Button variant="outline-secondary" size="lg" style={{ borderRadius: 12, border: '3px solid #ccc' }} onClick={onBack}>
                    ← Back to Home
                </Button>
            </div>

            <div className="mt-5 p-4 rounded" style={{ backgroundColor: '#fffdf5', border: '3px solid #eee', borderRadius: 16 }}>
                <h5 className="fw-bold mb-2" style={{ color: '#5D5C61' }}>📚 Research References</h5>
                <ul className="text-muted mb-0" style={{ fontSize: '0.9rem', lineHeight: 1.8 }}>
                    <li><a href="https://theautismhelper.com/table-top-money-math/" target="_blank" rel="noreferrer">The Autism Helper – Money Math</a></li>
                    <li><a href="https://www.magnetaba.com/blog/aba-approaches-for-teaching-money-skills" target="_blank" rel="noreferrer">MagnetABA – ABA Approaches for Teaching Money Skills</a></li>
                    <li><a href="https://www.eu-jer.com/the-impacts-of-mathematics-instructional-strategy-on-students-with-autism-a-systematic-literature-review" target="_blank" rel="noreferrer">EU-JER – Math Instructional Strategies (Systematic Review)</a></li>
                    <li><a href="https://www.skillbuildersaba.com/blog/aba-approaches-for-teaching-money-skills" target="_blank" rel="noreferrer">Skill Builders ABA – Structured Routines &amp; Task Analysis</a></li>
                    <li><a href="https://www.rehabilitationjournals.com/intellectual-disability-Journal/article/30/4-1-5-361.pdf" target="_blank" rel="noreferrer">Rehabilitation Journals – Technology-Mediated Math Interventions</a></li>
                </ul>
            </div>
        </Container>
    );
};

export default StrategiesPage;
