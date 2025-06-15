// src/components/layout/AdminSidebar.tsx
import React, {type ReactNode, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import classNames from 'classnames';
import SidebarFooter from "../sidebar/SidebarFooter.tsx";
import {Tooltip} from "react-tooltip";
import useIsDesktop from "../../hooks/useIsDesktop.ts";
import SidebarLink from '../sidebar/SidebarLink.tsx';

/**
 * @interface NavItem
 * @description Defines the structure for a navigation item in the sidebar.
 * @property {string} name - The display name of the navigation item.
 * @property {string} href - The path to navigate to.
 * @property {string} icon - A simple string representation for an icon (e.g., '📊'). In a real app, this would be an SVG component or similar.
 */
// UA: Визначає структуру елемента навігації в бічній панелі.
// EN: Defines the structure for a navigation item in the sidebar.
interface NavItem {
    name: string;
    href: string;
    icon: ReactNode; // Placeholder for icon
}

interface AdminSidebarProps {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
}

const navigation: NavItem[] = [
    {
        name: 'Dashboard',
        href: '/admin',
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                   className="lucide lucide-layout-dashboard-icon lucide-layout-dashboard">
            <rect width="7" height="9" x="3" y="3" rx="1"/>
            <rect width="7" height="5" x="14" y="3" rx="1"/>
            <rect width="7" height="9" x="14" y="12" rx="1"/>
            <rect width="7" height="5" x="3" y="16" rx="1"/>
        </svg>
    },
    {
        name: 'Log Viewer',
        href: '/admin/logs',
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                   className="lucide lucide-database-icon lucide-database">
            <ellipse cx="12" cy="5" rx="9" ry="3"/>
            <path d="M3 5V19A9 3 0 0 0 21 19V5"/>
            <path d="M3 12A9 3 0 0 0 21 12"/>
        </svg>
    },
    {
        name: 'Rule Management',
        href: '/admin/rules',
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                   className="lucide lucide-shield-check-icon lucide-shield-check">
            <path
                d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
            <path d="m9 12 2 2 4-4"/>
        </svg>
    },
    {
        name: 'User Management',
        href: '/admin/users',
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                   className="lucide lucide-user-cog-icon lucide-user-cog">
            <path d="M10 15H6a4 4 0 0 0-4 4v2"/>
            <path d="m14.305 16.53.923-.382"/>
            <path d="m15.228 13.852-.923-.383"/>
            <path d="m16.852 12.228-.383-.923"/>
            <path d="m16.852 17.772-.383.924"/>
            <path d="m19.148 12.228.383-.923"/>
            <path d="m19.53 18.696-.382-.924"/>
            <path d="m20.772 13.852.924-.383"/>
            <path d="m20.772 16.148.924.383"/>
            <circle cx="18" cy="15" r="3"/>
            <circle cx="9" cy="7" r="4"/>
        </svg>
    },
    {
        name: 'Settings',
        href: '/admin/settings',
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                   className="lucide lucide-settings-icon lucide-settings">
            <path
                d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
            <circle cx="12" cy="12" r="3"/>
        </svg>
    },
];
/**
 // UA: Компонент лівої бічної панелі навігації.
 // Використовує `NavLink` з `react-router-dom` для виділення активного посилання.
 // EN: The left sidebar navigation component.
 // Uses `NavLink` from `react-router-dom` to highlight the active link.
 **/
const AdminSidebar: React.FC<AdminSidebarProps> = ({isSidebarOpen, toggleSidebar}) => {
    const location = useLocation();
    const isDesktop = useIsDesktop();

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
            <nav className="flex-grow list-none">
                {navigation.map((item) => (
                    <SidebarLink
                        key={item.name}
                        to={item.href}
                        icon={() => (
                            item.icon
                        )}
                        label={item.name}
                        isSidebarOpen={isSidebarOpen}
                        isDesktop={isDesktop}
                        toggleSidebar={toggleSidebar}
                        end
                    />
                ))}
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

export default AdminSidebar;