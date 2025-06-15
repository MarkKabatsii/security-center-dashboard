// src/components/layout/sidebar/SidebarFooter.tsx
import React from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

interface SidebarFooterProps {
    isSidebarOpen: boolean;
    isDesktop: boolean;
    toggleSidebar: () => void;
}

const SidebarFooter: React.FC<SidebarFooterProps> = ({
                                                         isSidebarOpen,
                                                         isDesktop,
                                                         toggleSidebar,
                                                     }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userPreferences');
        localStorage.setItem('isSidebarOpen', JSON.stringify(true));
        navigate('/login');
        alert('Goodbye!');
        if (!isDesktop && isSidebarOpen) toggleSidebar();
    };

    const tooltipId = "sidebar-tooltip";

    return (
        <div className="mt-auto py-4 border-t border-light-border dark:border-dark-border">
            <button
                onClick={handleLogout}
                className={classNames(
                    "flex items-center py-2 text-sm font-normal transition-colors duration-200 whitespace-nowrap overflow-hidden" +
                    "flex items-center w-full text-left py-2 rounded-full text-sm font-normal transition-colors duration-200 whitespace-nowrap overflow-hidden",
                    "px-6", // Фіксований padding-x
                    {
                        "text-light-muted dark:text-dark-muted hover:bg-light-accent hover:text-light-text dark:hover:bg-dark-bg dark:hover:text-dark-text": true,
                        // Ширина кнопки коли сайдбар розгорнутий (повна ширина мінус 16px з кожного боку)
                        "w-100%": isSidebarOpen, // 100% - (pl-4 + pr-2 батьківського Aside) = 100% - 24px
                        // ml-3 (12px) щоб вирівняти з кнопкою New Chat
                    }
                )}
                data-tooltip-id={tooltipId}
                data-tooltip-content="Logout"
                data-tooltip-place="right"
                data-tooltip-delay-show={0}
                data-tooltip-delay-hide={0}
            >
                {/* Обгортка для іконки: ЗАВЖДИ ОДНАКОВЕ ПОЛОЖЕННЯ */}
                <div className="flex-shrink-0 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"
                         className="lucide lucide-log-out-icon lucide-log-out">
                        <path d="m16 17 5-5-5-5"/>
                        <path d="M21 12H9"/>
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    </svg>
                </div>
                {/* Текст: плавне зникнення/поява */}
                <span className={classNames("flex-1 ml-3", { // ml-3 для відступу від іконки
                    "opacity-100 transition-opacity duration-200": isSidebarOpen,
                    "opacity-0": !isSidebarOpen // При згортанні текст зникає
                })}>
                    Logout
                </span>
            </button>
        </div>
    );
};

export default SidebarFooter;