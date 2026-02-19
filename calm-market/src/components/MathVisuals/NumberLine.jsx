import React from 'react';

const NumberLine = ({ current, target, max = 10 }) => {
    const numbers = Array.from({ length: max + 1 }, (_, i) => i);

    return (
        <div className="d-flex justify-content-between align-items-center position-relative my-4 px-2" style={{ height: '60px' }}>
            {/* The Line */}
            <div className="position-absolute w-100" style={{ height: '4px', backgroundColor: '#e0e0e0', zIndex: 0, top: '50%', transform: 'translateY(-50%)' }}></div>

            {numbers.map((num) => {
                let bgColor = '#fff';
                let borderColor = '#ccc';
                let scale = 1;

                if (num === current) {
                    bgColor = 'var(--calm-blue)';
                    borderColor = 'var(--calm-green)';
                    scale = 1.3;
                } else if (num === target) {
                    borderColor = 'var(--calm-pink)';
                }

                return (
                    <div key={num} className="d-flex flex-column align-items-center position-relative" style={{ zIndex: 1 }}>
                        <div
                            style={{
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%',
                                backgroundColor: bgColor,
                                border: `2px solid ${borderColor}`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 'bold',
                                color: '#555',
                                transform: `scale(${scale})`,
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {num}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default NumberLine;
