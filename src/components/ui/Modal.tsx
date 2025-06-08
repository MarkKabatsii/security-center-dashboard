// src/components/ui/Modal.tsx
import React, { type ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import Button from './Button';

/**
 * @interface ModalProps
 * @description Props for the Modal component.
 * @property {boolean} isOpen - Controls the visibility of the modal.
 * @property {() => void} onClose - Callback function to be called when the modal should be closed.
 * @property {ReactNode} children - The content to be displayed inside the modal.
 * @property {string} [title] - Optional title for the modal header.
 * @property {string} [className] - Additional CSS classes for the modal content area.
 * @property {string} [overlayClassName] - Additional CSS classes for the modal overlay.
 */
// UA: Властивості компонента Modal.
// EN: Props for the Modal component.
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    title?: string;
    className?: string;
    overlayClassName?: string;
}

/**
 * @component Modal
 * @description A reusable modal component that renders its content into a portal.
 * Handles opening, closing, and allows for custom content.
 * @param {ModalProps} props - The component's props.
 */
// UA: Багаторазовий компонент модального вікна, який рендерить свій вміст у портал.
// Обробляє відкриття, закриття та дозволяє користувацький вміст.
// EN: A reusable modal component that renders its content into a portal.
// Handles opening, closing, and allows for custom content.
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title, className, overlayClassName }) => {
    const modalRoot = document.getElementById('modal-root') || document.body;
    const modalRef = useRef<HTMLDivElement>(null);

    // Close modal on escape key press
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
        }
        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    // Click outside to close - UA: Закриття при кліку поза модальним вікном
    // EN: Click outside to close
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return createPortal(
        <div
            className={classNames(
                'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50',
                'transition-opacity duration-300',
                overlayClassName
            )}
            onClick={handleOverlayClick}
        >
            <div
                ref={modalRef}
                className={classNames(
                    'bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg mx-4 p-6',
                    'transform transition-all duration-300 scale-100 opacity-100', // For transition effects
                    className
                )}
            >
                <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                    {title && <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{title}</h3>}
                    <Button variant="ghost" onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300">
                        &times;
                    </Button>
                </div>
                <div className="text-gray-700 dark:text-gray-300">
                    {children}
                </div>
            </div>
        </div>,
        modalRoot
    );
};

export default Modal;