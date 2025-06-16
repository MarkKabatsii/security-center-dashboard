// src/components/layout/sidebar/NavItemLink.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { type NavItem } from './types';

interface NavItemLinkProps {
    item: NavItem;
    isSidebarOpen: boolean;
    isDesktop: boolean;
    onClick?: () => void;
}

const NavItemLink: React.FC<NavItemLinkProps> = ({ item, isSidebarOpen, isDesktop, onClick }) => {
    return (
        <NavLink
            to={item.href}
            end={item.end}
            className={({ isActive }) =>
                classNames(
                    'flex items-center p-2 rounded-md transition-colors duration-200',
                    'hover:bg-light-accent-hover dark:hover:bg-dark-accent-hover',
                    {
                        'bg-light-accent dark:bg-dark-accent text-white': isActive,
                        'text-light-text dark:text-dark-text': !isActive,
                        // Вирівнювання та ширина залежать від isSidebarOpen та isDesktop
                        'justify-start': isSidebarOpen, // Вирівняти за лівим краєм, якщо відкритий
                        'justify-center': !isSidebarOpen && isDesktop, // Центрувати, якщо згорнутий і на десктопі
                    }
                )
            }
            onClick={onClick}
        >
            <span
                className={classNames('shrink-0', {
                    'mr-3': isSidebarOpen, // Відступ, якщо сайдбар відкритий (показується текст)
                    '': !isSidebarOpen, // Без відступу, якщо сайдбар згорнутий (тільки іконка)
                })}
            >
                {item.icon}
            </span>
            {isSidebarOpen && <span className="whitespace-nowrap">{item.name}</span>} {/* Показати текст, тільки якщо сайдбар відкритий */}
        </NavLink>
    );
};

export default NavItemLink;