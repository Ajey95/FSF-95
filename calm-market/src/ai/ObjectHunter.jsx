import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';
import { Button, Spinner } from 'react-bootstrap';

const ObjectHunter = ({ targetObject, onFound, onCancel }) => {
    const webcamRef = useRef(null);
    const [model, setModel] = useState(null);
    const [prediction, setPrediction] = useState('');
    const [loading, setLoading] = useState(true);

    // Load Model
    useEffect(() => {
        const loadModel = async () => {
            try {
                const loadedModel = await cocoSsd.load();
                setModel(loadedModel);
                setLoading(false);
            } catch (err) {
                console.error("Failed to load model", err);
                setLoading(false);
            }
        };
        loadModel();
    }, []);

    // Run Detection Loop
    useEffect(() => {
        let interval;
        if (model && !loading) {
            interval = setInterval(async () => {
                if (webcamRef.current && webcamRef.current.video.readyState === 4) {
                    const video = webcamRef.current.video;
                    const predictions = await model.detect(video);

                    if (predictions.length > 0) {
                        // Get highest confidence prediction
                        const best = predictions.reduce((prev, current) => (prev.score > current.score) ? prev : current);
                        setPrediction(`${best.class} (${Math.round(best.score * 100)}%)`);

                        // Check if matches target (loose matching)
                        if (targetObject && best.class.toLowerCase().includes(targetObject.toLowerCase())) {
                            onFound(best.class);
                        }
                    } else {
                        setPrediction('Looking...');
                    }
                }
            }, 1000); // Check every second
        }
        return () => clearInterval(interval);
    }, [model, loading, targetObject, onFound]);

    return (
        <div className="text-center p-3" style={{ border: '4px dashed #5D5C61', borderRadius: '20px', backgroundColor: '#fff' }}>
            <h5>📷 Find a {targetObject || 'Object'}!</h5>

            {loading ? (
                <div className="my-4">
                    <Spinner animation="border" variant="calm-primary" />
                    <p>Loading AI Vision...</p>
                </div>
            ) : (
                <div className="position-relative d-inline-block">
                    <Webcam
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        width={320}
                        height={240}
                        style={{ borderRadius: '15px' }}
                    />
                    <div className="mt-2 fw-bold text-primary">I see: {prediction}</div>
                </div>
            )}

            <div className="mt-3">
                <Button variant="outline-secondary" onClick={onCancel}>Stop Camera</Button>
            </div>
        </div>
    );
};

export default ObjectHunter;
