// src/components/ui/ErrorFallback.tsx
import React from 'react';
import type { FallbackProps } from 'react-error-boundary';

const ErrorFallback: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
    return (
        <div
            role="alert"
            className="flex flex-col items-center justify-center min-h-screen bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 p-4 text-center"
        >
            <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
            <p className="mb-4">{error.message}</p>
            <pre className="bg-red-200 dark:bg-red-800 p-4 rounded text-sm overflow-auto max-w-full mb-4">
                {error.stack}
            </pre>
            <button
                onClick={resetErrorBoundary}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
            >
                Try again
            </button>
            <p className="mt-4 text-sm">
                If the problem persists, please contact support.
            </p>
        </div>
    );
};

export default ErrorFallback;