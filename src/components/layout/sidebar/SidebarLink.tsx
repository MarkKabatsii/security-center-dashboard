import React from 'react';
import {NavLink} from 'react-router-dom';
import classNames from 'classnames';

interface SidebarLinkProps {
    to: string;
    icon: React.ElementType;
    label: string;
    isSidebarOpen: boolean;
    isDesktop: boolean;
    toggleSidebar: () => void;
    isActive?: boolean;
    end?: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
                                                     to,
                                                     icon: IconComponent,
                                                     label,
                                                     isSidebarOpen,
                                                     isDesktop,
                                                     toggleSidebar,
                                                     isActive,
                                                     end,
                                                 }) => {
    const linkPaddingX = 'px-6';

    const getNavLinkClasses = ({isActive: defaultIsActive}: { isActive: boolean }) =>
        classNames(
            "flex items-center py-4 text-sm font-normal transition-colors duration-200 whitespace-nowrap overflow-hidden",
            linkPaddingX,
            {
                // Styles for active/inactive state
                "bg-light-focus text-light-accent dark:bg-dark-accent shadow-lg": isActive !== undefined ? isActive : defaultIsActive,
                "text-light-muted dark:text-dark-muted hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-light-text dark:hover:text-dark-text": isActive !== undefined ? !isActive : !defaultIsActive,

                "w-100%": isSidebarOpen,
            }
        );

    const handleLinkClick = () => {
        if (!isDesktop) {
            toggleSidebar();
        }
    };

    const tooltipId = "sidebar-tooltip";

    return (
        <li>
            <NavLink
                to={to}
                end={end}
                className={getNavLinkClasses}
                onClick={handleLinkClick}
                data-tooltip-id={tooltipId}
                data-tooltip-content={label}
                data-tooltip-place="right"
                data-tooltip-delay-show={0}
                data-tooltip-delay-hide={0}
            >
                <div className="flex-shrink-0 flex items-center">
                    <IconComponent className="w-5 h-5"/>
                </div>
                <span className={classNames("flex-1 ml-3",
                    {
                        "opacity-100 transition-opacity duration-200": isSidebarOpen,
                        "opacity-0": !isSidebarOpen
                    })}>
                    {label}
                </span>
            </NavLink>
        </li>
    );
};

export default SidebarLink;