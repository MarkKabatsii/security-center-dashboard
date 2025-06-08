// src/components/ui/Card.tsx
import React, {type ReactNode, type HTMLAttributes } from 'react';
import classNames from 'classnames';

/**
 * @interface CardProps
 * @description Props for the Card component. Extends standard HTML div attributes.
 * @property {ReactNode} children - The content to be rendered inside the card.
 * @property {string} [className] - Additional CSS classes to apply to the card.
 */
// UA: Властивості компонента Card. Розширює стандартні атрибути HTML div.
// EN: Props for the Card component. Extends standard HTML div attributes.
interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    className?: string;
}

/**
 * @component Card
 * @description A generic card component with a default shadow and background.
 * @param {CardProps} props - The component's props.
 */
// UA: Загальний компонент картки зі стандартною тінню та фоном.
// EN: A generic card component with a default shadow and background.
const Card: React.FC<CardProps> = ({ children, className, ...rest }) => {
    const cardClasses = classNames(
        // 'bg-white dark:bg-gray-800 rounded-lg shadow-md p-6',
        'bg-light-bg dark:bg-dark-bg rounded-lg border border-light-border dark:border-dark-border p-6',
        className
    );

    return (
        <div className={cardClasses} {...rest}>
            {children}
        </div>
    );
};

export default Card;