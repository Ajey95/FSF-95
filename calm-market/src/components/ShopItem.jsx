import React from 'react';
import { Card } from 'react-bootstrap';

const ShopItem = ({ item }) => {
    return (
        <Card className="text-center card-calm mx-auto" style={{ width: '14rem', backgroundColor: '#fff' }}>
            <div className="p-3">
                <img
                    src={`/assets/items/${item.imageName}.png`}
                    alt={item.name}
                    className="shop-item-icon"
                />
            </div>
            <Card.Body className="pt-0">
                <Card.Title style={{ fontSize: '1.5rem' }}>{item.name}</Card.Title>
                <Card.Text className="fw-bold" style={{ color: 'var(--calm-green)', fontSize: '1.8rem' }}>
                    {item.price} Coins
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default ShopItem;
