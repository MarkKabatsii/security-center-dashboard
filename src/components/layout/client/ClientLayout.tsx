// src/components/layout/ClientLayout.tsx
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import ClientNavbar from './ClientNavbar.tsx';
import ClientSidebar from './ClientSidebar.tsx';
import classNames from 'classnames';
import useIsDesktop from "../../hooks/useIsDesktop.ts";

interface ClientLayoutProps {
    toggleTheme: () => void;
    isDarkMode: boolean;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ toggleTheme, isDarkMode }) => {
    const isDesktop = useIsDesktop();

    // isSidebarOpen: true = розгорнутий, false = згорнутий до іконок
    const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
        // За замовчуванням, якщо на десктопі, сайдбар має бути відкритий.
        // Перевіряємо localStorage тільки якщо користувач його згорнув.
        if (typeof window !== 'undefined' && window.innerWidth >= 768) { // Перевірка window.innerWidth на початковому рендері
            const savedState = localStorage.getItem('isSidebarOpen');
            // Якщо є збережений стан, використовуємо його. Якщо немає, або він false,
            // а ми на десктопі, то за замовчуванням відкриваємо (true).
            return savedState ? JSON.parse(savedState) : true;
        }
        return false; // За замовчуванням згорнутий на мобільних
    });

    // Ефект для адаптації сайдбару при зміні розміру вікна
    useEffect(() => {
        if (isDesktop) {
            // Якщо переходимо на десктоп:
            // Відновлюємо стан сайдбару з localStorage або встановлюємо true (розгорнутий)
            const savedState = localStorage.getItem('isSidebarOpen');
            setIsSidebarOpen(savedState ? JSON.parse(savedState) : true);
        } else {
            // Якщо переходимо на мобільний:
            // Сайдбар завжди повністю прихований (false)
            setIsSidebarOpen(false);
        }
    }, [isDesktop]); // Залежить від isDesktop

    const toggleSidebar = () => {
        setIsSidebarOpen((prev: boolean) => {
            const newState = !prev;
            if (isDesktop) { // Зберігаємо стан лише для десктопів
                localStorage.setItem('isSidebarOpen', JSON.stringify(newState));
            }
            // На мобільних (коли !isDesktop), toggleSidebar просто відкриває/закриває його,
            // localStorage для них не використовується.
            return newState;
        });
    };

    return (
        <div className="flex min-h-screen bg-light-bg dark:bg-dark-bg">
            <ClientSidebar
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
            />

            <div
                className={classNames(
                    "flex-1 flex flex-col transition-all duration-300 ease-in-out",
                    {
                        "ml-64": isSidebarOpen && isDesktop,
                        "ml-[4.5rem]": !isSidebarOpen && isDesktop,
                        "ml-0": !isDesktop
                    }
                )}
            >
                <ClientNavbar
                    toggleTheme={toggleTheme}
                    isDarkMode={isDarkMode}
                />
                <main className="flex-1 p-6">
                    <Outlet />
                </main>
            </div>
            {isSidebarOpen && !isDesktop && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={toggleSidebar}
                ></div>
            )}
        </div>
    );
};

export default ClientLayout;