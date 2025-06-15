// src/components/ui/TextArea.tsx
import React from 'react';
import classNames from 'classnames';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    error?: string; // Validation error message
    size?: 'small' | 'medium' | 'large'; // Optional size variants
}

const TextArea: React.FC<TextAreaProps> = ({ className, ...props }) => {
    const baseStyles = 'w-full p-3 border rounded-md resize-y focus:outline-none';
    const themeStyles = 'bg-light-surface text-light-text border-light-border ' +
        'dark:bg-dark-surface dark:text-dark-text dark:border-dark-border ' +
        'focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent';

    return (
        <textarea
            className={classNames(baseStyles, themeStyles, className)}
            {...props}
        />
    );
};

export default TextArea;