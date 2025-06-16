// src/App.tsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppProviders from './providers/AppProviders'; // Шлях до об'єднаних провайдерів
import AppContent from './AppContent';             // Шлях до AppContent

const App: React.FC = () => {
    return (
        <Router>
            <AppProviders>
                <AppContent />
            </AppProviders>
        </Router>
    );
};

export default App;