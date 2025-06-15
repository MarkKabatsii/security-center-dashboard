// src/App.tsx
import React, {useState, Suspense} from 'react'; // Додано useState
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import ClientLayout from './components/layout/client/ClientLayout.tsx';
import {DataProvider} from "./contexts/DataContext.tsx";
// Використовуємо React.lazy для "лінивого" завантаження сторінок
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
    // Додайте стан для теми, якщо ClientLayout його очікує
    // Якщо ClientLayout має власну логіку керування темою, цей стан може бути непотрібним тут
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Функція для перемикання теми, якщо вона передається до ClientLayout
    const toggleTheme = () => {
        setIsDarkMode(prevMode => !prevMode);
        document.documentElement.classList.toggle('dark', !isDarkMode);
    };

    return (
        <Router>
            {/* Suspense обгортає маршрути, які можуть бути ліниво завантажені */}
            <Suspense fallback={
                <div
                    className="flex items-center justify-center min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text">
                    <p>Loading...</p> {/* Або спінер, скелетон-лоадер */}
                </div>
            }>
                <Routes>
                    {/* Маршрути для клієнтської частини */}
                    {/* Передаємо toggleTheme та isDarkMode до ClientLayout, якщо вони там потрібні */}
                    <Route path="/" element={
                        <DataProvider>
                            <ClientLayout toggleTheme={toggleTheme} isDarkMode={isDarkMode}/>
                        </DataProvider>
                    }>
                        <Route index element={<HomePage/>}/>
                        <Route path="history" element={<HistoryPage/>}/>
                        {/* Змінено маршрути для ResponseViewPage, щоб дозволити ID */}
                        {/* Цей маршрут для нових відповідей (без ID) */}
                        <Route path="response-view" element={<ResponseViewPage/>}/>
                        {/* Цей маршрут для перегляду відповідей з історії (з ID) */}
                        <Route path="response-view/:id" element={<ResponseViewPage/>}/>

                        <Route path="settings" element={<SettingsPage/>}/>
                        <Route path="blocked" element={<ErrorBlockedPage/>}/>
                        {/* Маршрут для перенаправлення невідомих шляхів на головну сторінку клієнта */}
                        <Route path="*" element={<Navigate to="/" replace/>}/>
                    </Route>

                    {/* Приклад маршрутів для адмін-панелі (закоментовано, як у вашому прикладі) */}
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