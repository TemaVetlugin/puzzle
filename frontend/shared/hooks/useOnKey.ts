import { useEffect } from 'react';

export function useOnKey(callback: () => void, key = 'Enter') {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.code === key) {
                event.preventDefault();
                callback();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [callback, key]);
}
