import { useState, useEffect } from 'react';

const useVoiceCommand = (onCommand) => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            console.warn("Speech Recognition not supported in this browser.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onresult = (event) => {
            const lastResult = event.results[event.results.length - 1];
            const text = lastResult[0].transcript.trim().toLowerCase();
            setTranscript(text);
            console.log("Voice Input:", text);

            // Simple keyword matching
            if (text.includes('pay')) onCommand('pay');
            if (text.includes('clear') || text.includes('reset')) onCommand('clear');
            if (text.includes('one') || text.includes('1')) onCommand('add', 1);
            if (text.includes('five') || text.includes('5')) onCommand('add', 5);
            if (text.includes('ten') || text.includes('10')) onCommand('add', 10);
        };

        recognition.onerror = (event) => {
            console.error("Speech Recognition Error:", event.error);
            setIsListening(false);
        };

        if (isListening) {
            recognition.start();
        } else {
            recognition.stop();
        }

        return () => recognition.stop();
    }, [isListening, onCommand]);

    return { isListening, setIsListening, transcript };
};

export default useVoiceCommand;
