// src/components/ui/Input.tsx
import React, { type InputHTMLAttributes } from 'react';
import classNames from 'classnames';

/**
 * @interface InputProps
 * @description Props for the Input component. Extends standard HTML input attributes.
 * @property {string} [label] - Optional label for the input field.
 * @property {string} [error] - Error message to display below the input.
 * @property {string} [className] - Additional CSS classes for the input element.
 * @property {string} [labelClassName] - Additional CSS classes for the label element.
 */
// UA: Властивості компонента Input. Розширює стандартні атрибути HTML input.
// EN: Props for the Input component. Extends standard HTML input attributes.
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    className?: string;
    labelClassName?: string;
}

/**
 * @component Input
 * @description A customizable input field component with optional label and error display.
 * @param {InputProps} props - The component's props.
 */
// UA: Компонент поля вводу, що налаштовується, з опціональною міткою та відображенням помилок.
// EN: A customizable input field component with optional label and error display.
const Input: React.FC<InputProps> = ({ label, error, className, labelClassName, ...rest }) => {
    const inputClasses = classNames(
        'block w-full px-3 py-2 border rounded-md shadow-sm',
        'focus:outline-none focus:ring-indigo-500 focus:border-indigo-500',
        'bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600',
        {
            'border-gray-300 dark:border-gray-600': !error,
            'border-red-500 dark:border-red-500': error,
        },
        className
    );

    return (
        <div className="mb-4">
            {label && (
                <label htmlFor={rest.id} className={classNames('block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1', labelClassName)}>
                    {label}
                </label>
            )}
            <input
                className={inputClasses}
                {...rest}
            />
            {error && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {error}
                </p>
            )}
        </div>
    );
};

export default Input;