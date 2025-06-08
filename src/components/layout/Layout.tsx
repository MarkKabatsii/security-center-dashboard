// src/components/layout/Layout.tsx
import React, {type ReactNode } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

/**
 * @interface LayoutProps
 * @description Props for the Layout component.
 * @property {ReactNode} children - The main content of the page to be rendered within the layout.
 */
// UA: Властивості компонента Layout.
// EN: Props for the Layout component.
interface LayoutProps {
    children: ReactNode;
}

/**
 * @component Layout
 * @description The main application layout component, including the sidebar and header.
 * It provides the overall structure for the application pages.
 * @param {LayoutProps} props - The component's props.
 */
// UA: Основний компонент макета програми, що включає бічну панель та заголовок.
// Він надає загальну структуру для сторінок програми.
// EN: The main application layout component, including the sidebar and header.
// It provides the overall structure for the application pages.
const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        // <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-900">
        <div className="flex h-screen overflow-hidden bg-light-bg dark:bg-dark-bg">
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-y-auto">
                <Header />
                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;