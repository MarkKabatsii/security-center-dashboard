// src/components/ui/Select.tsx
import React from 'react';
import classNames from 'classnames';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options: { value: string; label: string }[];
    // Можливо, додати варіанти для помилок, розмірів тощо
}

const Select: React.FC<SelectProps> = ({ options, className, ...props }) => {
    const baseStyles = 'w-full px-3 py-2 border rounded-md appearance-none cursor-pointer focus:outline-none';
    const themeStyles = 'bg-light-surface text-light-text border-light-border ' +
        'dark:bg-dark-surface dark:text-dark-text dark:border-dark-border ' +
        'focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent';
    // Додаємо стиль для стрілочки
    const arrowStyles = 'bg-no-repeat bg-[right_0.75rem_center] bg-[length:16px_12px] ' +
        'bg-chevron-down dark:bg-chevron-down-dark'; // Потрібно визначити іконки в Tailwind config

    return (
        <div className="relative">
            <select
                className={classNames(baseStyles, themeStyles, arrowStyles, className)}
                {...props}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {/* Можна додати кастомну іконку стрілочки, якщо "appearance-none" не спрацює красиво */}
        </div>
    );
};

export default Select;