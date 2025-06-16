// src/components/layout/sidebar/types.ts
import { type ReactNode } from 'react';

export interface NavItem {
    name: string;
    href: string;
    icon: ReactNode;
    end?: boolean; // Для exact match у NavLink
}