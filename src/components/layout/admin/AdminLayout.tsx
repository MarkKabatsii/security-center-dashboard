// src/components/layout/AdminLayout.tsx
import React, { useState, useEffect } from 'react';
import AdminSidebar from './AdminSidebar.tsx';
import AdminHeader from './AdminHeader.tsx';
import useIsDesktop from "../../hooks/useIsDesktop.ts";
import classNames from "classnames";
import {Outlet} from "react-router-dom";
/**
 * @interface AdminLayoutProps
 * @description Props for the AdminLayout component.
 */
// UA: Властивості компонента AdminLayout.
// EN: Props for the AdminLayout component.
interface AdminLayoutProps {
    toggleTheme: () => void;
    isDarkMode: boolean;
}
// UA: Основний компонент макета програми, що включає бічну панель та заголовок.
// Він надає загальну структуру для сторінок програми.
// EN: The main application layout component, including the sidebar and header.
// It provides the overall structure for the application pages.
const AdminLayout: React.FC<AdminLayoutProps> = ({ toggleTheme, isDarkMode }) => {
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
        // <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-900">
        <div className="flex h-screen overflow-hidden bg-light-bg dark:bg-dark-bg">
            <AdminSidebar
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
            />
            <div className={classNames(
                "flex-1 flex flex-col transition-all duration-300 ease-in-out",
                {
                    "ml-64": isSidebarOpen && isDesktop,
                    "ml-[4.5rem]": !isSidebarOpen && isDesktop,
                    "ml-0": !isDesktop
                }
            )}>
                <AdminHeader toggleTheme={toggleTheme}
                             isDarkMode={isDarkMode}/>
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

export default AdminLayout;