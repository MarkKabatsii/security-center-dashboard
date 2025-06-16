// src/AppContent.tsx
import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import AppRoutes from './AppRoutes';
import FallbackLoader from './components/ui/FallbackLoader';
import ErrorFallback from './components/ui/ErrorFallback';

const AppContent: React.FC = () => {
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<FallbackLoader />}>
                <AppRoutes />
            </Suspense>
        </ErrorBoundary>
    );
};

export default AppContent;