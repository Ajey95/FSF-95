import React from 'react';
import { Image } from 'react-bootstrap';

const Shopkeeper = ({ message }) => {
    return (
        <div className="d-flex flex-column align-items-center mb-4">
            {/* Speech Bubble */}
            <div className="speech-bubble text-center fw-bold" style={{ minWidth: '200px' }}>
                {message}
            </div>

            {/* Shopkeeper Image */}
            <div style={{ width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden', border: 'var(--cartoon-border)', backgroundColor: '#fff' }}>
                <img src="/assets/items/shopkeeper_bear_cartoon.png" alt="Shopkeeper Bear" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
        </div>
    );
};

export default Shopkeeper;
