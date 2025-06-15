// src/components/ui/Button.tsx
import React, { type ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';

/**
 * @interface ButtonProps
 * @description Props for the Button component. Extends standard HTML button attributes.
 * @property {'primary' | 'secondary' | 'danger' | 'success' | 'info' | 'ghost'} [variant='primary'] - The visual style of the button.
 * @property {'small' | 'medium' | 'large'} [size='medium'] - The size of the button.
 * @property {boolean} [fullWidth=false] - If true, the button will take full width of its parent.
 * @property {boolean} [loading=false] - If true, displays a loading spinner and disables the button.
 * @property {string} [className] - Additional CSS classes to apply.
 */
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'info' | 'ghost';
    size?: 'small' | 'medium' | 'large';
    fullWidth?: boolean;
    loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
                                           children,
                                           variant = 'primary',
                                           size = 'medium',
                                           fullWidth = false,
                                           loading = false,
                                           className,
                                           disabled,
                                           // Деструктуризуємо 'variant', 'size', 'fullWidth', 'loading' з 'rest'
                                           // щоб вони не передавалися до нативного елемента button.
                                           // 'rest' тепер міститиме лише стандартні HTML-атрибути.
                                           ...rest // Цей 'rest' тепер БЕЗ 'variant', 'size', 'fullWidth', 'loading'
                                       }) => {
    const baseStyles = 'font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-75 transition ease-in-out duration-150';

    const variantStyles = {
        primary: 'bg-light-accent hover:bg-blue-600 text-white ' +
            'dark:bg-dark-accent dark:hover:bg-blue-400 ' +
            'focus:ring-light-accent dark:focus:ring-dark-accent',
        secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 ' +
            'dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 ' +
            'focus:ring-gray-500 dark:focus:ring-gray-400',
        danger: 'bg-light-error hover:bg-red-700 text-white ' +
            'dark:bg-dark-error dark:hover:bg-red-700 ' +
            'focus:ring-light-error dark:focus:ring-dark-error',
        success: 'bg-light-success hover:bg-green-700 text-white ' +
            'dark:bg-dark-success dark:hover:bg-green-700 ' +
            'focus:ring-light-success dark:focus:ring-dark-success',
        info: 'bg-light-accent hover:bg-blue-600 text-white ' +
            'dark:bg-dark-accent dark:hover:bg-blue-400 ' +
            'focus:ring-light-accent dark:focus:ring-dark-accent',
        ghost: 'bg-transparent text-light-muted dark:text-dark-muted ' +
            'hover:bg-light-surface dark:hover:bg-dark-surface ' +
            'focus:ring-light-accent dark:focus:ring-dark-accent',
    };

    const sizeStyles = {
        small: 'px-2.5 py-1.5 text-xs',
        medium: 'px-4 py-2 text-sm',
        large: 'px-6 py-3 text-base',
    };

    const disabledStyles = 'opacity-50 cursor-not-allowed';
    const fullWidthStyles = fullWidth ? 'w-full' : '';

    const buttonClasses = classNames(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        fullWidthStyles,
        { [disabledStyles]: disabled || loading },
        className
    );

    return (
        <button
            className={buttonClasses}
            disabled={disabled || loading}
            {...rest} // Тепер 'rest' містить лише валідні HTML-атрибути
        >
            {loading ? (
                <svg className="animate-spin h-5 w-5 text-current mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            ) : (
                children
            )}
        </button>
    );
};

export default Button;