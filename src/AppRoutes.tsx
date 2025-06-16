// src/AppRoutes.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Імпортуємо Layout-и з їхніх існуючих шляхів у `layout/admin/` та `layout/Client/`
import ClientLayout from './components/layout/client/ClientLayout.tsx';
const AdminLayout = React.lazy(() => import('./components/layout/admin/AdminLayout.tsx'));

// Ліниве завантаження сторінок
const HomePage = React.lazy(() => import('./pages/client/HomePage'));
const HistoryPage = React.lazy(() => import('./pages/client/HistoryPage'));
const SettingsPage = React.lazy(() => import('./pages/client/SettingsPage'));
const ResponseViewPage = React.lazy(() => import('./pages/client/ResponseViewPage'));
const ErrorBlockedPage = React.lazy(() => import('./pages/client/ErrorBlockedPage'));

const AdminDashboardPage = React.lazy(() => import('./pages/admin/Dashboard.tsx'));
const LogViewerPage = React.lazy(() => import('./pages/admin/LogViewer.tsx'));
const RuleManagementPage = React.lazy(() => import('./pages/admin/RuleManagement.tsx'));
const UserManagementPage = React.lazy(() => import('./pages/admin/UserManagement.tsx'));
const AdminSettingsPage = React.lazy(() => import('./pages/admin/Settings.tsx'));

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<ClientLayout />}>
                <Route index element={<HomePage />} />
                <Route path="history" element={<HistoryPage />} />
                <Route path="response-view" element={<ResponseViewPage />} />
                <Route path="response-view/:id" element={<ResponseViewPage />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="blocked" element={<ErrorBlockedPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>

            <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboardPage />} />
                <Route path="logs" element={<LogViewerPage />} />
                <Route path="rules" element={<RuleManagementPage />} />
                <Route path="users" element={<UserManagementPage />} />
                <Route path="settings" element={<AdminSettingsPage />} />
                <Route path="*" element={<Navigate to="/admin" replace />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRoutes;