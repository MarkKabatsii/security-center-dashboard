// src/components/ui/Button.tsx
import React, { type ButtonHTMLAttributes } from 'react';
import classNames from 'classnames'; // Useful for conditionally joining class names

/**
 * @interface ButtonProps
 * @description Props for the Button component. Extends standard HTML button attributes.
 * @property {'primary' | 'secondary' | 'danger' | 'success' | 'info' | 'ghost'} [variant='primary'] - The visual style of the button.
 * @property {'small' | 'medium' | 'large'} [size='medium'] - The size of the button.
 * @property {boolean} [fullWidth=false] - If true, the button will take full width of its parent.
 * @property {boolean} [loading=false] - If true, displays a loading spinner and disables the button.
 * @property {string} [className] - Additional CSS classes to apply.
 */
// UA: Властивості компонента Button. Розширює стандартні атрибути HTML кнопки.
// EN: Props for the Button component. Extends standard HTML button attributes.
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'info' | 'ghost';
    size?: 'small' | 'medium' | 'large';
    fullWidth?: boolean;
    loading?: boolean;
}

/**
 * @component Button
 * @description A customizable button component with different variants, sizes, and loading state.
 * @param {ButtonProps} props - The component's props.
 */
// UA: Компонент кнопки, що налаштовується, з різними варіантами, розмірами та станом завантаження.
// EN: A customizable button component with different variants, sizes, and loading state.
const Button: React.FC<ButtonProps> = ({
                                           children,
                                           variant = 'primary',
                                           size = 'medium',
                                           fullWidth = false,
                                           loading = false,
                                           className,
                                           disabled,
                                           ...rest
                                       }) => {
    const baseStyles = 'font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-75 transition ease-in-out duration-150';

    const variantStyles = {
        primary: 'bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500',
        secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 focus:ring-gray-500',
        danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
        success: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500',
        info: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
        ghost: 'bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-gray-500',
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
            {...rest}
        >
            {loading ? (
                // Simple spinner - UA: Простий спінер
                // EN: Simple spinner
                <svg className="animate-spin h-5 w-5 text-white mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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