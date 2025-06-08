import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { DataProvider } from './contexts/DataContext';
import Dashboard from './pages/Dashboard';
import LogViewer from './pages/LogViewer';
import RuleManagement from './pages/RuleManagement';
import UserManagement from './pages/UserManagement';
import Settings from './pages/Settings';
import Layout from './components/layout/Layout';

function App() {
    return (
        <ThemeProvider>
            <DataProvider>
                <Router>
                    <Layout>
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/logs" element={<LogViewer />} />
                            <Route path="/rules" element={<RuleManagement />} />
                            <Route path="/users" element={<UserManagement />} />
                            <Route path="/settings" element={<Settings />} />
                        </Routes>
                    </Layout>
                </Router>
            </DataProvider>
        </ThemeProvider>
    );
}

export default App;