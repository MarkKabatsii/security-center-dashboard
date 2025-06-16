// src/components/ui/FallbackLoader.tsx
import React from 'react';

const FallbackLoader: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text">
            <p>Loading application content...</p>
            {/* Можна додати красивий спінер тут */}
            {/* <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-light-accent dark:border-dark-accent"></div> */}
        </div>
    );
};

export default FallbackLoader;