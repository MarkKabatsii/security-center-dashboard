// src/components/layout/sidebar/HistoryFilters.tsx
import React from 'react';
import {useLocation} from 'react-router-dom';
import SidebarLink from './SidebarLink';

interface HistoryFiltersProps {
    isSidebarOpen: boolean;
    isDesktop: boolean;
    toggleSidebar: () => void;
}

const HistoryFilters: React.FC<HistoryFiltersProps> = ({
                                                           isSidebarOpen,
                                                           isDesktop,
                                                           toggleSidebar,
                                                       }) => {
    const location = useLocation();

    const historyItems = [
        {
            name: 'Sales Data Analysis',
            type: 'Sales Data Analysis',
            path: '/history?type=Sales Data Analysis',
            icon: () => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                              stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"
                              className="lucide lucide-chart-area-icon lucide-chart-area">
                <path d="M3 3v16a2 2 0 0 0 2 2h16"/>
                <path
                    d="M7 11.207a.5.5 0 0 1 .146-.353l2-2a.5.5 0 0 1 .708 0l3.292 3.292a.5.5 0 0 0 .708 0l4.292-4.292a.5.5 0 0 1 .854.353V16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1z"/>
            </svg>)
        },
        {
            name: 'Marketing Plan', type: 'Marketing Plan', path: '/history?type=Marketing Plan', icon: () => (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"
                     className="lucide lucide-file-terminal-icon lucide-file-terminal">
                    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
                    <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
                    <path d="m8 16 2-2-2-2"/>
                    <path d="M12 18h4"/>
                </svg>)
        },
        {
            name: 'Weekly Summary', type: 'Weekly Summary', path: '/history?type=Weekly Summary', icon: () => (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"
                     className="lucide lucide-file-clock-icon lucide-file-clock">
                    <path d="M16 22h2a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3"/>
                    <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
                    <circle cx="8" cy="16" r="6"/>
                    <path d="M9.5 17.5 8 16.25V14"/>
                </svg>)
        },
        {
            name: 'PII Data Check', type: 'PII Data Check', path: '/history?type=PII Data Check', icon: () => (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"
                     className="lucide lucide-file-warning-icon lucide-file-warning">
                    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
                    <path d="M12 9v4"/>
                    <path d="M12 17h.01"/>
                </svg>)
        },
    ];

    const isAllHistoryActiveByDefault = location.pathname === '/history' && location.search === '';

    return (
        <div className="mt-8 py-4 border-t border-light-border dark:border-dark-border">
            <ul>
                <SidebarLink
                    to="/history"
                    icon={() => (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"
                             className="lucide lucide-paperclip-icon lucide-paperclip">
                            <path
                                d="m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551"/>
                        </svg>)}
                    label="All History"
                    isSidebarOpen={isSidebarOpen}
                    isDesktop={isDesktop}
                    toggleSidebar={toggleSidebar}
                    end
                    isActive={isAllHistoryActiveByDefault}
                />
                {historyItems.map((item) => {
                    const isCurrentItemActive = location.pathname === '/history' && location.search === `?type=${encodeURIComponent(item.type)}`;
                    return (
                        <SidebarLink
                            key={item.name}
                            to={item.path}
                            icon={item.icon}
                            label={item.name}
                            isSidebarOpen={isSidebarOpen}
                            isDesktop={isDesktop}
                            toggleSidebar={toggleSidebar}
                            isActive={isCurrentItemActive}
                        />
                    );
                })}
            </ul>
        </div>
    );
};

export default HistoryFilters;