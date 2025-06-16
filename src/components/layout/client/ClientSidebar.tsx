// src/components/layout/Client/ClientSidebar.tsx
import React from 'react';

import classNames from 'classnames';
import {Menu} from 'lucide-react';
import useIsDesktop from "../../hooks/useIsDesktop";
import MainNavigation from '../sidebar/MainNavigation';

interface ClientSidebarProps {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
}

const ClientSidebar: React.FC<ClientSidebarProps> = ({isSidebarOpen, toggleSidebar}) => {
    const isDesktop = useIsDesktop(); // Отримуємо стан isDesktop

    return (
        <>
            <aside
                className={classNames(
                    "fixed top-0 left-0 h-full bg-light-surface dark:bg-dark-surface border-r border-light-border dark:border-dark-border z-40 transition-all duration-300 ease-in-out",
                    {
                        "w-64": isSidebarOpen && isDesktop, // Відкрито на десктопі
                        "w-[4.5rem]": !isSidebarOpen && isDesktop, // Згорнуто на десктопі
                        "w-64 transform -translate-x-full": !isSidebarOpen && !isDesktop, // Закрито на мобільному (приховано)
                        "w-64 transform translate-x-0": isSidebarOpen && !isDesktop, // Відкрито на мобільному
                    }
                )}
            >
                <div className="flex items-center justify-between h-16 px-4">
                    {/* Кнопка-гамбургер для перемикання сайдбару */}
                    {isDesktop ? (
                        // На десктопі кнопка завжди видима, але може змінювати позицію
                        <button
                            onClick={toggleSidebar}
                            className={classNames(
                                "p-2 rounded-full text-light-text dark:text-dark-text hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent",
                                {
                                    "ml-auto": isSidebarOpen, // Переміщуємо вправо, якщо відкритий
                                    "ml-0": !isSidebarOpen, // Без ml, якщо згорнутий (для центрування іконки)
                                }
                            )}
                            aria-label="Toggle sidebar menu"
                        >
                            <Menu size={20} strokeWidth={1.8}/>
                        </button>
                    ) : (
                        // На мобільному кнопка з'являється лише коли сайдбар відкритий
                        isSidebarOpen && (
                            <button
                                onClick={toggleSidebar}
                                className="p-2 rounded-full text-light-text dark:text-dark-text hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent ml-auto"
                                aria-label="Toggle sidebar menu"
                            >
                                <Menu size={20} strokeWidth={1.8}/>
                            </button>
                        )
                    )}
                </div>

                <nav className="flex-1 px-4 py-6 overflow-y-auto">
                    <MainNavigation
                        isSidebarOpen={isSidebarOpen}
                        isDesktop={isDesktop}
                        toggleSidebar={toggleSidebar}
                    />
                </nav>
            </aside>

            {/* Оверлей для мобільної версії, коли сайдбар відкритий */}
            {isSidebarOpen && !isDesktop && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={toggleSidebar} // При кліку на оверлей сайдбар закривається
                    role="presentation"
                    aria-hidden="true"
                ></div>
            )}
        </>
    );
};

export default ClientSidebar;