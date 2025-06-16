// src/components/layout/sidebar/AdminNavigation.tsx
import React from 'react';
import NavItemLink from './NavItemLink';
import type { NavItem } from './types';

// Імпортуйте іконки, які використовуються для адмінської навігації
import {
    LayoutDashboard,
    Database, // Наприклад, для Logs
    ShieldCheck, // Наприклад, для Rules
    Users,       // Наприклад, для Users
    Settings,
    // Додайте інші іконки, якщо потрібно
} from 'lucide-react';

interface AdminNavigationProps {
    isSidebarOpen: boolean;
    isDesktop: boolean;
    toggleSidebar: () => void;
}

// Визначення пунктів навігації для адмін-панелі
const navigationItems: NavItem[] = [
    { name: 'Dashboard', href: '/admin', icon: <LayoutDashboard className="h-5 w-5" />, end: true },
    { name: 'Logs', href: '/admin/logs', icon: <Database className="h-5 w-5" /> },
    { name: 'Rules', href: '/admin/rules', icon: <ShieldCheck className="h-5 w-5" /> },
    { name: 'Users', href: '/admin/users', icon: <Users className="h-5 w-5" /> },
    { name: 'Settings', href: '/admin/settings', icon: <Settings className="h-5 w-5" /> },
    // Додайте інші пункти меню адміна тут
];

const AdminNavigation: React.FC<AdminNavigationProps> = ({ isSidebarOpen, isDesktop, toggleSidebar }) => {
    return (
        <div className="space-y-1">
            {navigationItems.map((item) => (
                <NavItemLink
                    key={item.name}
                    item={item}
                    isSidebarOpen={isSidebarOpen}
                    isDesktop={isDesktop}
                    onClick={() => { if (!isDesktop) toggleSidebar(); }} // Додайте, якщо потрібно
                />
            ))}
        </div>
    );
};

export default AdminNavigation;