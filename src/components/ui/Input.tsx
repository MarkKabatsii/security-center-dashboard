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
const Input: React.FC<InputProps> = ({ label, error, className, labelClassName, ...rest }) => {
    const inputClasses = classNames(
        'block w-full px-3 py-2 border rounded-md shadow-sm',
        'focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent',
        'focus:border-light-accent dark:focus:border-dark-accent',
        'bg-light-surface text-light-text',
        'dark:bg-dark-surface dark:text-dark-text',
        {
            'border-light-border dark:border-dark-border': !error,
            'border-light-error dark:border-dark-error': error,
        },
        className
    );

    return (
        <div className="mb-4">
            {label && (
                <label
                    htmlFor={rest.id}
                    className={classNames(
                        'block text-sm font-medium text-light-muted dark:text-dark-muted mb-1',
                        labelClassName
                    )}
                >
                    {label}
                </label>
            )}
            <input
                className={inputClasses}
                {...rest}
            />
            {error && (
                <p className="mt-1 text-sm text-light-error dark:text-dark-error">
                    {error}
                </p>
            )}
        </div>
    );
};

export default Input;