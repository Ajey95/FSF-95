import React, { useMemo } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const StatsScreen = ({ onBack, sessionData }) => {
    // Calculate aggregated stats
    const stats = useMemo(() => {
        let totalAttempts = 0;
        let correct = 0;
        let incorrect = 0;

        sessionData.forEach(d => {
            if (d.type === 'purchase_success') {
                totalAttempts++;
                correct++;
            } else if (d.type === 'purchase_attempt' && d.correct === false) {
                totalAttempts++;
                incorrect++;
            }
        });

        return { totalAttempts, correct, incorrect };
    }, [sessionData]);

    const accuracy = stats.totalAttempts > 0
        ? Math.round((stats.correct / stats.totalAttempts) * 100)
        : 0;

    // Chart Data
    const data = [
        { name: 'Wins', value: stats.correct },
        { name: 'Oopsies', value: stats.incorrect },
    ];

    return (
        <Container className="mt-4">
            <div className="text-center mb-4">
                <h2 style={{
                    fontFamily: 'Fredoka, sans-serif',
                    fontSize: '3rem',
                    color: '#FFD700',
                    textShadow: '3px 3px 0px #000',
                    transform: 'rotate(-2deg)'
                }}>
                    YOUR GAME STATS!
                </h2>
            </div>

            <Row className="justify-content-center">
                {/* Score Card */}
                <Col md={5} className="mb-4">
                    <div
                        style={{
                            backgroundColor: '#fff',
                            border: '4px solid #000',
                            boxShadow: '8px 8px 0px #000',
                            borderRadius: '0px',
                            padding: '20px',
                            transform: 'rotate(1deg)',
                            transition: 'all 0.2s',
                            cursor: 'default'
                        }}
                        onMouseOver={(e) => { e.currentTarget.style.transform = 'translate(-4px, -4px) rotate(1deg)'; e.currentTarget.style.boxShadow = '12px 12px 0px #000'; }}
                        onMouseOut={(e) => { e.currentTarget.style.transform = 'translate(0px, 0px) rotate(1deg)'; e.currentTarget.style.boxShadow = '8px 8px 0px #000'; }}
                    >
                        <h3 className="fw-bold" style={{ color: '#000' }}>TOTAL SCORE</h3>
                        <div style={{ fontSize: '4rem', fontWeight: '900', color: '#4CAF50' }}>
                            {accuracy}%
                        </div>
                        <p className="lead fw-bold">ACCURACY</p>
                        <hr style={{ borderTop: '3px solid #000' }} />
                        <div className="d-flex justify-content-around fw-bold">
                            <span style={{ color: '#2196F3' }}>WINS: {stats.correct}</span>
                            <span style={{ color: '#F44336' }}>OOPS: {stats.incorrect}</span>
                        </div>
                    </div>
                </Col>

                {/* Chart Panel */}
                <Col md={7} className="mb-4">
                    <div
                        style={{
                            backgroundColor: '#FFF8E1',
                            border: '4px solid #000',
                            boxShadow: '8px 8px 0px #000',
                            borderRadius: '20px',
                            padding: '20px',
                            transform: 'rotate(-1deg)',
                            transition: 'all 0.2s',
                            cursor: 'default'
                        }}
                        onMouseOver={(e) => { e.currentTarget.style.transform = 'translate(-4px, -4px) rotate(-1deg)'; e.currentTarget.style.boxShadow = '12px 12px 0px #000'; }}
                        onMouseOut={(e) => { e.currentTarget.style.transform = 'translate(0px, 0px) rotate(-1deg)'; e.currentTarget.style.boxShadow = '8px 8px 0px #000'; }}
                    >
                        <h4 className="fw-bold text-center mb-3">ACTIVITY LOG</h4>
                        <Row>
                            <Col md={6} style={{ height: '200px' }}>
                                <h6 className="text-center">Win/Loss</h6>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={data}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" stroke="#000" tick={{ fontWeight: 'bold' }} />
                                        <YAxis stroke="#000" />
                                        <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ border: '2px solid #000', borderRadius: '10px' }} />
                                        <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                                            {data.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={index === 0 ? '#4CAF50' : '#F44336'} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </Col>
                            <Col md={6} style={{ height: '200px' }}>
                                <h6 className="text-center">Thinking Speed (sec)</h6>
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={sessionData.slice(-10).map((d, i) => ({ name: i + 1, time: Math.round(d.timeTaken || 0) }))}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" stroke="#000" />
                                        <YAxis stroke="#000" />
                                        <Tooltip contentStyle={{ border: '2px solid #000', borderRadius: '10px' }} />
                                        <Line
                                            type="monotone"
                                            dataKey="time"
                                            stroke="#2196F3"
                                            strokeWidth={4}
                                            dot={{ r: 6, fill: '#2196F3', stroke: '#000', strokeWidth: 2 }}
                                            activeDot={{ r: 8 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>

            <div className="text-center mt-3">
                <Button
                    className="px-5 py-2 fs-4 fw-bold"
                    style={{
                        backgroundColor: '#FF4081',
                        border: '4px solid #000',
                        boxShadow: '4px 4px 0px #000',
                        color: '#fff',
                        borderRadius: '50px',
                        transition: 'all 0.2s'
                    }}
                    onClick={onBack}
                    onMouseOver={(e) => { e.currentTarget.style.transform = 'translate(-2px, -2px)'; e.currentTarget.style.boxShadow = '6px 6px 0px #000'; }}
                    onMouseOut={(e) => { e.currentTarget.style.transform = 'translate(0px, 0px)'; e.currentTarget.style.boxShadow = '4px 4px 0px #000'; }}
                >
                    BACK TO HOME 🏠
                </Button>
            </div>
        </Container>
    );
};

export default StatsScreen;
