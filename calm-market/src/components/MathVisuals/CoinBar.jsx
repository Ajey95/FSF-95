import React from 'react';
import { ProgressBar } from 'react-bootstrap';

const CoinBar = ({ currentCoins, requiredCoins }) => {
    const percentage = Math.min((currentCoins / requiredCoins) * 100, 100);

    // Choose color based on progress
    let variant = "info";
    if (currentCoins === requiredCoins) variant = "success";
    if (currentCoins > requiredCoins) variant = "warning";

    return (
        <div className="my-3">
            <div className="d-flex justify-content-between mb-1">
                <span>Coins Paid: {currentCoins}</span>
                <span>Price: {requiredCoins}</span>
            </div>
            <ProgressBar
                now={percentage}
                variant={variant}
                style={{ height: '25px', borderRadius: '15px' }}
                animated={currentCoins < requiredCoins}
            />
        </div>
    );
};

export default CoinBar;
