// src/hooks/useSidebarState.ts
import { useState, useEffect } from 'react';
import useIsDesktop from './useIsDesktop'; // <-- Переконайтеся, що цей шлях правильний

interface SidebarState {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
    closeSidebar: () => void;
    openSidebar: () => void;
}

function useSidebarState(): SidebarState {
    const isDesktop = useIsDesktop(); // ВИКОРИСТОВУЄМО ВАШ ХУК useIsDesktop
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(() => {
        // Логіка ініціалізації:
        // На десктопі за замовчуванням відкритий, на мобайлі - закритий.
        // Перевіряємо localStorage для збереженого стану.
        if (typeof window === 'undefined') return false; // Для SSR
        const savedState = localStorage.getItem('isSidebarOpen');
        if (savedState !== null) {
            return JSON.parse(savedState);
        }
        return isDesktop; // Якщо немає збереженого стану, початковий стан залежить від isDesktop
    });

    useEffect(() => {
        // Цей ефект реагує на зміну isDesktop (розміру екрану)
        // та на зміну isSidebarOpen.

        // Якщо переходимо з десктопа на мобільний, і сайдбар відкритий, закриваємо його (для мобільної версії)
        if (!isDesktop && isSidebarOpen) {
            setIsSidebarOpen(false);
            localStorage.setItem('isSidebarOpen', JSON.stringify(false));
        }
        // Якщо переходимо з мобільного на десктоп, і сайдбар закритий, відкриваємо його (для десктопної версії)
        else if (isDesktop && !isSidebarOpen && localStorage.getItem('isSidebarOpen') === null) {
            // Якщо на десктопі, і стан не збережений або збережений як false, відкриваємо його.
            // Це для того, щоб він завжди був відкритий при першому завантаженні на десктопі.
            setIsSidebarOpen(true);
            localStorage.setItem('isSidebarOpen', JSON.stringify(true));
        } else {
            // Зберігаємо стан сайдбару при його зміні (наприклад, коли користувач вручну відкрив/закрив)
            localStorage.setItem('isSidebarOpen', JSON.stringify(isSidebarOpen));
        }
    }, [isDesktop, isSidebarOpen]); // Залежності: isDesktop та isSidebarOpen

    const toggleSidebar = () => {
        setIsSidebarOpen(prev => {
            const newState = !prev;
            localStorage.setItem('isSidebarOpen', JSON.stringify(newState));
            return newState;
        });
    };

    const closeSidebar = () => {
        if (isSidebarOpen) {
            setIsSidebarOpen(false);
            localStorage.setItem('isSidebarOpen', JSON.stringify(false));
        }
    };

    const openSidebar = () => {
        if (!isSidebarOpen) {
            setIsSidebarOpen(true);
            localStorage.setItem('isSidebarOpen', JSON.stringify(true));
        }
    };

    return { isSidebarOpen, toggleSidebar, closeSidebar, openSidebar };
}

export default useSidebarState;