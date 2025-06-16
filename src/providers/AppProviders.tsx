// src/providers/AppProviders.tsx
import React, { type ReactNode } from 'react';
import { ThemeProvider } from '../contexts/ThemeContext'; // <-- Правильний шлях до ThemeProvider
import { DataProvider } from '../contexts/DataContext';   // <-- Правильний шлях до DataProvider

interface AppProvidersProps {
    children: ReactNode;
}

const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
    return (
        <ThemeProvider>
            <DataProvider>
                {/* Додайте тут інші глобальні провайдери, якщо вони з'являться */}
                {children}
            </DataProvider>
        </ThemeProvider>
    );
};

export default AppProviders;