// src/components/ui/Badge.tsx
import React, { type ReactNode } from 'react';
import classNames from 'classnames';

/**
 * @interface BadgeProps
 * @description Props for the Badge component.
 * @property {ReactNode} children - The content to be displayed inside the badge.
 * @property {'success' | 'warning' | 'danger' | 'info' | 'error' | 'default'} [variant='default'] - The visual style/color of the badge.
 * @property {string} [className] - Additional CSS classes to apply to the badge.
 */
// UA: Властивості компонента Badge.
// EN: Props for the Badge component.
interface BadgeProps {
    children: ReactNode;
    variant?: 'success' | 'warning' | 'danger' | 'info' | 'error' | 'default'; // <--- Додано 'error'
    className?: string;
}

/**
 * @component Badge
 * @description A small component to display status or labels with distinct background colors.
 * @param {BadgeProps} props - The component's props.
 */
// UA: Невеликий компонент для відображення статусу або міток з різними кольорами фону.
// EN: A small component to display status or labels with distinct background colors.
const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', className }) => {
    const baseStyles = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
    // const baseStyles = 'inline-flex items-center rounded-full text-xs font-medium';

    // Оновлені стилі для варіантів, що використовують кастомні кольори з tailwind.config.js
    const variantStyles = {
        success: 'bg-light-success text-white dark:bg-dark-success dark:text-white', // Використовуємо кастомні success кольори
        warning: 'bg-light-warning text-white dark:bg-dark-warning dark:text-white', // Використовуємо кастомні warning кольори
        danger: 'bg-light-error text-white dark:bg-dark-error dark:text-white',   // Варіант 'danger' тепер використовує 'error' кольори
        info: 'bg-light-accent text-white dark:bg-dark-accent dark:text-white',   // Варіант 'info' тепер використовує 'accent' кольори
        error: 'bg-light-error text-white dark:bg-dark-error dark:text-white',     // <--- Додано новий варіант 'error'
        default: 'bg-light-surface text-light-muted dark:bg-dark-surface dark:text-dark-muted', // Використовуємо кастомні surface/muted кольори
    };

    const badgeClasses = classNames(
        baseStyles,
        variantStyles[variant],
        className
    );

    return (
        <span className={badgeClasses}>
            {children}
        </span>
    );
};

export default Badge;