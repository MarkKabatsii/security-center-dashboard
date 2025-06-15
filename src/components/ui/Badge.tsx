// src/components/ui/Badge.tsx
import React, { type ReactNode } from 'react';
import classNames from 'classnames';

/**
 * @interface BadgeProps
 * @description Props for the Badge component.
 * @property {ReactNode} children - The content to be displayed inside the badge.
 * @property {'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default'} [variant='default'] - The visual style/color of the badge.
 * @property {string} [className] - Additional CSS classes to apply to the badge.
 */
// UA: Властивості компонента Badge.
// EN: Props for the Badge component.
interface BadgeProps {
    children: ReactNode;
    variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default';
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

    // Оновлені стилі для варіантів, що використовують кастомні кольори з tailwind.config.js
    const variantStyles = {
        // Primary: Використовуємо акцентні кольори теми
        primary: 'bg-light-accent text-white dark:bg-dark-accent dark:text-gray-900',
        // Success: Кольори успіху
        success: 'bg-light-success text-white dark:bg-dark-success dark:text-gray-900',
        // Warning: Кольори попереджень
        warning: 'bg-light-warning text-gray-900 dark:bg-dark-warning dark:text-gray-900',
        // Danger: Кольори помилок (об'єднує попередні 'danger' та 'error')
        danger: 'bg-light-error text-white dark:bg-dark-error dark:text-gray-900',
        // Info: Можна використовувати інший синій/блакитний з вашого config.blue або як primary
        info: 'bg-blue-500 text-white dark:bg-blue-400 dark:text-gray-900',
        // Default: Нейтральні кольори поверхні та приглушеного тексту
        default: 'bg-light-surface text-light-muted dark:bg-dark-surface dark:text-dark-muted',
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