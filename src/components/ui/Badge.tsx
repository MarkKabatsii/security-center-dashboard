import React, { type ReactNode } from 'react';
import classNames from 'classnames';

/**
 * @interface BadgeProps
 * @description Props for the Badge component.
 * @property {ReactNode} children - The content to be displayed inside the badge.
 * @property {'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default'} [variant='default'] - The visual style/color of the badge.
 * @property {string} [className] - Additional CSS classes to apply to the badge.
 */
// Props for the Badge component.
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
// A small component to display status or labels with distinct background colors.
const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', className }) => {
    const baseStyles = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';

    // Updated styles for variants using custom colors from tailwind.config.js
    const variantStyles = {
        primary: 'bg-light-accent text-white dark:bg-dark-accent dark:text-gray-900',
        success: 'bg-light-success text-white dark:bg-dark-success dark:text-gray-900',
        warning: 'bg-light-warning text-gray-900 dark:bg-dark-warning dark:text-gray-900',
        danger: 'bg-light-error text-white dark:bg-dark-error dark:text-gray-900',
        info: 'bg-blue-500 text-white dark:bg-blue-400 dark:text-gray-900',
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