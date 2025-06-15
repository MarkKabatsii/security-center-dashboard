// src/components/layout/ClientSidebar.tsx
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { Tooltip } from 'react-tooltip';

import useIsDesktop from '../../hooks/useIsDesktop.ts';
import MainNavigation from '../sidebar/MainNavigation.tsx';
import HistoryFilters from '../sidebar/HistoryFilters.tsx';
import SidebarFooter from '../sidebar/SidebarFooter.tsx';

interface ClientSidebarProps {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
}

const ClientSidebar: React.FC<ClientSidebarProps> = ({ isSidebarOpen, toggleSidebar }) => {
    const location = useLocation();
    const isDesktop = useIsDesktop();

    const isHistoryActive = location.pathname.startsWith('/history');

    useEffect(() => {
        if (isSidebarOpen && !isDesktop) {
            toggleSidebar();
        }
    }, [location.pathname, isDesktop, isSidebarOpen, toggleSidebar]);

    useEffect(() => {
        if (isSidebarOpen && !isDesktop) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isSidebarOpen, isDesktop]);

    // Фіксована ширина згорнутого сайдбару (як у Gemini)
    const collapsedWidthClass = 'w-[72px]'; // Приблизно 48px кнопка + 24px padding = 72px
    const expandedWidthClass = 'w-64'; // 256px

    return (
        <aside
            className={classNames(
                "bg-light-surface dark:bg-dark-surface py-4 shadow-lg border-r border-light-border dark:border-dark-border",
                "fixed inset-y-0 left-0 z-40",
                "transition-all duration-300 ease-in-out",
                "flex flex-col",
                {
                    [expandedWidthClass]: isSidebarOpen && isDesktop,
                    [collapsedWidthClass]: !isSidebarOpen && isDesktop,
                    "transform -translate-x-full": !isSidebarOpen && !isDesktop,
                    "translate-x-0": isSidebarOpen && !isDesktop
                }
            )}
        >
            {/* Верхня секція: Гамбургер-меню та "New Chat" */}
            <div className="flex items-center mb-6 pl-4 pr-2 relative h-12"> {/* Додано relative для позиціонування */}
                {/* Кнопка-гамбургер: завжди на фіксованій позиції */}
                <button
                    onClick={toggleSidebar}
                    className="p-2 rounded-full text-light-text dark:text-dark-text hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent"
                    aria-label="Toggle sidebar menu"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"
                         className="lucide lucide-menu-icon lucide-menu">
                        <path d="M4 12h16"/>
                        <path d="M4 18h16"/>
                        <path d="M4 6h16"/>
                    </svg>
                </button>
            </div>
            <nav className="flex-grow"> {/* Зменшив space-y для більш компактного вигляду */}
                <MainNavigation
                    isSidebarOpen={isSidebarOpen}
                    isDesktop={isDesktop}
                    toggleSidebar={toggleSidebar}
                />

                {isHistoryActive && (
                    <HistoryFilters
                        isSidebarOpen={isSidebarOpen}
                        isDesktop={isDesktop}
                        toggleSidebar={toggleSidebar}
                    />
                )}
            </nav>

            <SidebarFooter
                isSidebarOpen={isSidebarOpen}
                isDesktop={isDesktop}
                toggleSidebar={toggleSidebar}
            />

            {!isSidebarOpen && (
                <Tooltip
                    id="sidebar-tooltip"
                    opacity={1}
                    className="z-50 !bg-gray-700 !text-white !text-sm !px-2 !py-1 !rounded"
                />
            )}
        </aside>
    );
};

export default ClientSidebar;