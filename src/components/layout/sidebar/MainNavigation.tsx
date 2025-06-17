import React from 'react';
import SidebarLink from './SidebarLink';

interface MainNavigationProps {
    isSidebarOpen: boolean;
    isDesktop: boolean;
    toggleSidebar: () => void;
}

const MainNavigation: React.FC<MainNavigationProps> = ({
                                                           isSidebarOpen,
                                                           isDesktop,
                                                           toggleSidebar,
                                                       }) => {


    return (
        <div>
            <ul>
                <SidebarLink
                    to="/"
                    icon={() => (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"
                             className="lucide lucide-square-pen-icon lucide-square-pen">
                            <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path
                                d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/>
                        </svg>
                    )}
                    label="New Chat"
                    isSidebarOpen={isSidebarOpen}
                    isDesktop={isDesktop}
                    toggleSidebar={toggleSidebar}
                    end
                />
                <SidebarLink
                    to="/history"
                    icon={() => (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"
                             className="lucide lucide-history-icon lucide-history">
                            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                            <path d="M3 3v5h5"/>
                            <path d="M12 7v5l4 2"/>
                        </svg>)}
                    label="History"
                    isSidebarOpen={isSidebarOpen}
                    isDesktop={isDesktop}
                    toggleSidebar={toggleSidebar}
                />
            </ul>
        </div>
    );
};

export default MainNavigation;