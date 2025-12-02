import { useState, useEffect } from 'react';

export function useTypewriter(
    texts: string[],
    speed: number = 50,
    pauseTime: number = 2000,
    deleteSpeed: number = 30
) {
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(speed);

    useEffect(() => {
        const i = loopNum % texts.length;
        const fullText = texts[i];

        const handleTyping = () => {
            setDisplayText((current) => {
                if (isDeleting) {
                    return fullText.substring(0, current.length - 1);
                } else {
                    return fullText.substring(0, current.length + 1);
                }
            });

            setTypingSpeed(isDeleting ? deleteSpeed : speed);

            if (!isDeleting && displayText === fullText) {
                setTimeout(() => setIsDeleting(true), pauseTime);
            } else if (isDeleting && displayText === '') {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
            }
        };

        const timer = setTimeout(handleTyping, typingSpeed);

        return () => clearTimeout(timer);
    }, [displayText, isDeleting, loopNum, texts, speed, pauseTime, deleteSpeed]);

    return displayText;
}
