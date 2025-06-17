import React, {useState, Suspense} from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import ClientLayout from './components/layout/client/ClientLayout.tsx';
import {DataProvider} from "./contexts/DataContext.tsx";

const HomePage = React.lazy(() => import('./pages/client/HomePage'));
const HistoryPage = React.lazy(() => import('./pages/client/HistoryPage'));
const SettingsPage = React.lazy(() => import('./pages/client/SettingsPage'));
const ResponseViewPage = React.lazy(() => import('./pages/client/ResponseViewPage'));
const ErrorBlockedPage = React.lazy(() => import('./pages/client/ErrorBlockedPage'));
const Dashboard = React.lazy(() => import('./pages/admin/Dashboard.tsx'));
const LogViewer = React.lazy(() => import('./pages/admin/LogViewer.tsx'));
const RuleManagement = React.lazy(() => import('./pages/admin/RuleManagement.tsx'));
const UserManagement = React.lazy(() => import('./pages/admin/UserManagement.tsx'));
const Settings = React.lazy(() => import('./pages/admin/Settings.tsx'));
const AdminLayout = React.lazy(() => import('./components/layout/admin/AdminLayout.tsx'));


const App: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Function to switch theme if passed to ClientLayout
    const toggleTheme = () => {
        setIsDarkMode(prevMode => !prevMode);
        document.documentElement.classList.toggle('dark', !isDarkMode);
    };

    return (
        <Router>
            <Suspense fallback={
                <div
                    className="flex items-center justify-center min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text">
                    <p>Loading...</p> {/* Or a spinner, a skeleton loader */}
                </div>
            }>
                <Routes>
                    {/* Routes for the client side */}
                    {/* Pass toggleTheme and isDarkMode to ClientLayout if they are needed there */}
                    <Route path="/" element={
                        <DataProvider>
                            <ClientLayout toggleTheme={toggleTheme} isDarkMode={isDarkMode}/>
                        </DataProvider>
                    }>
                        <Route index element={<HomePage/>}/>
                        <Route path="history" element={<HistoryPage/>}/>
                        {/* Changed routes for ResponseViewPage to allow ID */}
                        {/* This route is for new replies (without ID) */}
                        <Route path="response-view" element={<ResponseViewPage/>}/>
                        {/* This route is for viewing replies from history (with ID) */}
                        <Route path="response-view/:id" element={<ResponseViewPage/>}/>

                        <Route path="settings" element={<SettingsPage/>}/>
                        <Route path="blocked" element={<ErrorBlockedPage/>}/>
                        {/* Route to redirect unknown paths to the client's home page */}
                        <Route path="*" element={<Navigate to="/" replace/>}/>
                    </Route>

                    {/* Example routes for the admin panel (commented, like in your example) */}
                    <Route path="/admin" element={
                        <DataProvider>
                            <AdminLayout toggleTheme={toggleTheme} isDarkMode={isDarkMode}/>
                        </DataProvider>
                    }>
                        <Route index element={<Dashboard/>}/>
                        <Route path="logs" element={<LogViewer/>}/>
                        <Route path="rules" element={<RuleManagement/>}/>
                        <Route path="users" element={<UserManagement/>}/>
                        <Route path="settings" element={<Settings/>}/>
                        <Route path="*" element={<Navigate to="/admin" replace/>}/>
                    </Route>
                </Routes>
            </Suspense>
        </Router>
    );
};

export default App;