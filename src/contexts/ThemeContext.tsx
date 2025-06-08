import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

/**
 * @interface ThemeContextType
 * @description Defines the shape of the theme context.
 * @property {boolean} isDarkMode - True if the dark mode is currently active.
 * @property {() => void} toggleTheme - Function to switch between dark and light themes.
 */
// UA: Визначає структуру контексту теми.
// EN: Defines the shape of the theme context.
interface ThemeContextType {
    isDarkMode: boolean;
    toggleTheme: () => void;
}

// Create the context with a default undefined value - UA: Створюємо контекст зі значенням за замовчуванням
// EN: Create the context with a default undefined value
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * @component ThemeProvider
 * @description Provides theme-related state and functions to its children components.
 * Manages dark/light mode and applies the 'dark' class to the document's root element.
 * @param {object} props - The component's props.
 * @param {ReactNode} props.children - The child components to be rendered within the provider's scope.
 */
// UA: Надає стан та функції, пов'язані з темою, дочірнім компонентам.
// Управляє темним/світлим режимом та застосовує клас 'dark' до кореневого елемента документа.
// EN: Provides theme-related state and functions to its children components.
// Manages dark/light mode and applies the 'dark' class to the document's root element.
export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Initialize dark mode based on localStorage or system preference - UA: Ініціалізуємо темний режим
    // EN: Initialize dark mode based on localStorage or system preference
    const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme === 'dark';
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    // Apply or remove 'dark' class to the html element - UA: Застосовуємо або видаляємо клас 'dark'
    // EN: Apply or remove 'dark' class to the html element
    useEffect(() => {
        const root = window.document.documentElement;
        if (isDarkMode) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    /**
     * @function toggleTheme
     * @description Toggles the theme between dark and light modes.
     */
        // UA: Перемикає тему між темним та світлим режимами.
        // EN: Toggles the theme between dark and light modes.
    const toggleTheme = () => {
            setIsDarkMode(prevMode => !prevMode);
        };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

/**
 * @function useTheme
 * @description Custom hook to easily access the theme context.
 * @returns {ThemeContextType} The theme context value.
 * @throws {Error} If `useTheme` is used outside of a `ThemeProvider`.
 */
// UA: Кастомний хук для легкого доступу до контексту теми.
// EN: Custom hook to easily access the theme context.
export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};