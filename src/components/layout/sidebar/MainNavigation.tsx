// src/components/layout/sidebar/MainNavigation.tsx
import React from 'react';
import NavItemLink from './NavItemLink';
import type { NavItem } from './types';

// Імпортуйте іконки, які використовуються для клієнтської навігації
import {
    LayoutDashboard, // Наприклад, для 'Dashboard'
    History,         // Для 'History'
    Eye,             // Для 'Response View'
    Settings,        // Для 'Settings'
    // Додайте інші іконки, якщо потрібно
} from 'lucide-react';

interface MainNavigationProps {
    isSidebarOpen: boolean;
    isDesktop: boolean;
    toggleSidebar: () => void;
}

// Визначення пунктів навігації для клієнтської частини
const navigationItems: NavItem[] = [
    { name: 'Dashboard', href: '/', icon: <LayoutDashboard className="h-5 w-5" />, end: true },
    { name: 'History', href: '/history', icon: <History className="h-5 w-5" /> },
    { name: 'Response View', href: '/response-view', icon: <Eye className="h-5 w-5" /> },
    { name: 'Settings', href: '/settings', icon: <Settings className="h-5 w-5" /> },
    // Додайте інші пункти меню клієнта тут
];

const MainNavigation: React.FC<MainNavigationProps> = ({ isSidebarOpen, isDesktop, toggleSidebar }) => {
    return (
        <div className="space-y-1">
            {navigationItems.map((item) => (
                <NavItemLink
                    key={item.name}
                    item={item}
                    isSidebarOpen={isSidebarOpen}
                    isDesktop={isDesktop}
                    onClick={() => {
                        // Закрити сайдбар на мобільних при натисканні на посилання
                        if (!isDesktop) toggleSidebar();
                    }}
                />
            ))}
        </div>
    );
};

export default MainNavigation;