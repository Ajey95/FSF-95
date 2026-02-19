import React, { useState, useRef, useCallback } from 'react';
import { ScreenCapture } from 'react-screen-capture';
import { Button, Modal } from 'react-bootstrap';

/**
 * ScreenCaptureWrapper
 *
 * Wraps any page with a floating "📸 Capture" button.
 * Keyboard shortcut: press `S` (when not in an input) to trigger capture.
 * Captured image appears in a modal with a download link.
 */
const ScreenCaptureWrapper = ({ children, label = 'Capture My Achievement' }) => {
    const [capturedImage, setCapturedImage] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const triggerRef = useRef(null);

    // Keyboard shortcut: S key
    React.useEffect(() => {
        const handleKey = (e) => {
            if (
                e.key === 's' || e.key === 'S' &&
                document.activeElement.tagName !== 'INPUT' &&
                document.activeElement.tagName !== 'TEXTAREA'
            ) {
                triggerRef.current?.click();
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, []);

    const handleCapture = useCallback((image) => {
        if (!image) return;
        setCapturedImage(image);
        setShowModal(true);
    }, []);

    const handleDownload = () => {
        const a = document.createElement('a');
        a.href = capturedImage;
        a.download = `calm-market-achievement-${Date.now()}.png`;
        a.click();
    };

    return (
        <ScreenCapture onEndCapture={handleCapture}>
            {({ onStartCapture }) => (
                <div style={{ position: 'relative' }}>
                    {children}

                    {/* Floating Capture Button */}
                    <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                        <Button
                            ref={triggerRef}
                            onClick={onStartCapture}
                            style={{
                                backgroundColor: '#C3B1E1',
                                border: '3px solid #5D5C61',
                                borderRadius: 50,
                                width: 64,
                                height: 64,
                                fontSize: '1.6rem',
                                boxShadow: '4px 4px 0 #5D5C61',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'transform 0.15s ease'
                            }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                            title={`${label} (Press S)`}
                        >
                            📸
                        </Button>
                        <span style={{ fontSize: '0.65rem', color: '#5D5C61', fontWeight: 'bold', backgroundColor: 'rgba(255,255,255,0.9)', padding: '2px 6px', borderRadius: 8, border: '1px solid #eee' }}>
                            Press S
                        </span>
                    </div>

                    {/* Capture Preview Modal */}
                    <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
                        <Modal.Header closeButton style={{ borderBottom: '3px solid #eee' }}>
                            <Modal.Title>🏆 Achievement Captured!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="text-center p-3">
                            {capturedImage && (
                                <img
                                    src={capturedImage}
                                    alt="Captured screen"
                                    style={{ maxWidth: '100%', borderRadius: 12, border: '3px solid #A8E6CF', boxShadow: '4px 4px 0 #5D5C61' }}
                                />
                            )}
                            <p className="text-muted mt-3 mb-0" style={{ fontSize: '0.9rem' }}>
                                Great work! Download your achievement to share with your teacher or parent.
                            </p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                onClick={handleDownload}
                                style={{ backgroundColor: '#A8E6CF', border: '3px solid #5D5C61', borderRadius: 12, color: '#5D5C61', fontWeight: 'bold', boxShadow: '4px 4px 0 #5D5C61' }}
                            >
                                ⬇️ Download
                            </Button>
                            <Button variant="outline-secondary" style={{ borderRadius: 12 }} onClick={() => setShowModal(false)}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            )}
        </ScreenCapture>
    );
};

export default ScreenCaptureWrapper;
