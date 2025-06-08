// src/components/layout/Sidebar.tsx
import React, { type ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import {
    LayoutDashboard,      // Для 'Dashboard' (вже було)
    Users,                // Для 'User Management'
    Settings, Fingerprint, ShieldCheck, Database              // Для 'Settings'
} from 'lucide-react';

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

const navigation: NavItem[] = [
    { name: 'Dashboard', href: '/', icon: <LayoutDashboard className="h-5 w-5 stroke-1" /> },
    { name: 'Log Viewer', href: '/logs', icon: <Database className="h-5 w-5 stroke-1" /> },
    { name: 'Rule Management', href: '/rules', icon: <ShieldCheck className="h-5 w-5 stroke-1" /> },
    { name: 'User Management', href: '/users', icon: <Users className="h-5 w-5 stroke-1" /> },
    { name: 'Settings', href: '/settings', icon: <Settings className="h-5 w-5 stroke-1" /> },
];

/**
 * @component Sidebar
 * @description The left sidebar navigation component.
 * Uses `NavLink` from `react-router-dom` to highlight the active link.
 */
// UA: Компонент лівої бічної панелі навігації.
// Використовує `NavLink` з `react-router-dom` для виділення активного посилання.
// EN: The left sidebar navigation component.
// Uses `NavLink` from `react-router-dom` to highlight the active link.
const Sidebar: React.FC = () => {
    const linkClasses = ({ isActive }: { isActive: boolean }) =>
        classNames(
            // 'flex items-center px-4 py-2 text-base font-bold rounded-md',
            'flex items-center px-4 py-2 text-base rounded-md',
            'transition-colors duration-200',
            {
                'bg-indigo-700 text-white shadow-md': isActive,
                'font-thin text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700': !isActive,
            }
        );

    return (
        <div className="w-64 flex-shrink-0 bg-light-bg dark:bg-dark-bg border-r border-light-border dark:border-dark-border p-4 pt-8">
            <div className="flex items-center justify-center mb-8">
                <span className="mr-3 text-lg">{<Fingerprint color="#f90101" />}</span>

                <h1 className="text-xl font-medium text-light-text dark:text-dark-text">Security Center</h1>
            </div>
            <nav className="space-y-2">
                {navigation.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.href}
                        className={linkClasses}
                    >
                        <span className="mr-3 text-lg">{item.icon}</span>
                        {item.name}
                    </NavLink>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;