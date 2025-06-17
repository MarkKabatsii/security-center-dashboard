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
                    "px-6",
                    {
                        "text-light-muted dark:text-dark-muted hover:bg-light-accent hover:text-light-text dark:hover:bg-dark-bg dark:hover:text-dark-text": true,
                        // The width of the button when the sidebar is expanded (full width minus 16px on each side)
                        "w-100%": isSidebarOpen, // 100% - (pl-4 + pr-2 parent Aside) = 100% - 24px
                        // ml-3 (12px) to align with the button New Chat
                    }
                )}
                data-tooltip-id={tooltipId}
                data-tooltip-content="Logout"
                data-tooltip-place="right"
                data-tooltip-delay-show={0}
                data-tooltip-delay-hide={0}
            >
                {/* Icon Wrapper: ALWAYS THE SAME POSITION */}
                <div className="flex-shrink-0 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"
                         className="lucide lucide-log-out-icon lucide-log-out">
                        <path d="m16 17 5-5-5-5"/>
                        <path d="M21 12H9"/>
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    </svg>
                </div>
                {/* Text: fade in/out */}
                <span className={classNames("flex-1 ml-3", { // ml-3 для відступу від іконки
                    "opacity-100 transition-opacity duration-200": isSidebarOpen,
                    "opacity-0": !isSidebarOpen // Text disappears when collapsed
                })}>
                    Logout
                </span>
            </button>
        </div>
    );
};

export default SidebarFooter;