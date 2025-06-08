// src/contexts/DataContext.tsx
import React, { createContext, useContext, useState, useEffect, type ReactNode, useCallback, useMemo } from 'react';
import { apiService } from '../services/api';
import type {
    StatisticCard,
    RecentEvent,
    LogEntry,
    Rule,
    User,
    SettingsData,
    ProxyServiceStatus,
    PaginatedResponse,
    SystemEvent,
} from '../types';

interface FetchLogOptions {
    page?: number;
    limit?: number;
    filter?: string;
    sortBy?: keyof LogEntry;
    sortOrder?: 'asc' | 'desc';
}

interface FetchPageOptions {
    page?: number;
    limit?: number;
}

interface DataContextType {
    proxyServiceStatus: ProxyServiceStatus;
    statistics: StatisticCard[];
    recentEvents: RecentEvent[];
    logEntries: LogEntry[];
    totalLogEntries: number;
    rules: Rule[];
    totalRules: number;
    users: User[];
    totalUsers: number;
    settings: SettingsData | null;
    isLoading: boolean;
    error: string | null;
    fetchProxyServiceStatus: () => Promise<void>;
    toggleProxyService: () => Promise<void>;
    fetchDashboardStatistics: () => Promise<void>;
    fetchRecentEvents: () => Promise<void>;
    fetchLogEntries: (options?: FetchLogOptions) => Promise<void>;
    fetchRules: (options?: FetchPageOptions) => Promise<void>;
    addRule: (newRule: Omit<Rule, 'id'>) => Promise<void>;
    updateRule: (updatedRule: Rule) => Promise<void>;
    deleteRule: (id: string) => Promise<void>;
    fetchUsers: (options?: FetchPageOptions) => Promise<void>;
    addUser: (newUser: Omit<User, 'id'>) => Promise<void>;
    updateUser: (updatedUser: User) => Promise<void>;
    deleteUser: (id: string) => Promise<void>;
    fetchSettings: () => Promise<void>;
    updateSettings: (newSettings: Partial<SettingsData>) => Promise<void>;
    fetchEvents: (options?: FetchPageOptions) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [proxyServiceStatus, setProxyServiceStatus] = useState<ProxyServiceStatus>('OFF');
    const [statistics, setStatistics] = useState<StatisticCard[]>([]);
    const [recentEvents, setRecentEvents] = useState<RecentEvent[]>([]);
    const [logEntries, setLogEntries] = useState<LogEntry[]>([]);
    const [totalLogEntries, setTotalLogEntries] = useState<number>(0);
    const [rules, setRules] = useState<Rule[]>([]);
    const [totalRules, setTotalRules] = useState<number>(0);
    const [users, setUsers] = useState<User[]>([]);
    const [totalUsers, setTotalUsers] = useState<number>(0);
    const [settings, setSettings] = useState<SettingsData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchDataWrapper = useCallback(
        async <T,>(
            apiCallFn: () => Promise<T | PaginatedResponse<T>>,
            setData: (data: T[] | T) => void,
            setTotal?: (total: number) => void
        ) => {
            setIsLoading(true);
            setError(null);
            try {
                const result = await apiCallFn();
                if (typeof result === 'object' && result !== null && 'data' in result && 'total' in result && Array.isArray((result as PaginatedResponse<T>).data)) {
                    setData((result as PaginatedResponse<T>).data);
                    if (setTotal) {
                        setTotal((result as PaginatedResponse<T>).total);
                    }
                } else {
                    setData(result as T);
                }
            } catch (err) {
                console.error('API call failed in DataContext:', err);
                setError(err instanceof Error ? err.message : 'An unknown error occurred during data fetch');
            } finally {
                setIsLoading(false);
            }
        },
        []
    );

    const fetchProxyServiceStatus = useCallback(() => fetchDataWrapper(() => apiService.getProxyServiceStatus(), setProxyServiceStatus), [fetchDataWrapper]);
    const toggleProxyService = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const newStatus = await apiService.toggleProxyServiceStatus();
            setProxyServiceStatus(newStatus);
        } catch (err) {
            console.error('Failed to toggle proxy service:', err);
            setError(err instanceof Error ? err.message : 'Failed to toggle proxy service');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const fetchDashboardStatistics = useCallback(() => fetchDataWrapper(() => apiService.getDashboardStatistics(), setStatistics), [fetchDataWrapper]);
    const fetchRecentEvents = useCallback(() => fetchDataWrapper(() => apiService.getRecentEvents(), setRecentEvents), [fetchDataWrapper]);

    const fetchLogEntries = useCallback((options?: FetchLogOptions) =>
            fetchDataWrapper(() => apiService.getLogEntries(options), setLogEntries, setTotalLogEntries),
        [fetchDataWrapper]
    );
    const fetchRules = useCallback((options?: FetchPageOptions) =>
            fetchDataWrapper(() => apiService.getRules(options), setRules, setTotalRules),
        [fetchDataWrapper]
    );

    const addRule = useCallback(async (newRule: Omit<Rule, 'id'>) => {
        setIsLoading(true);
        setError(null);
        try {
            await apiService.addRule(newRule);
            await fetchRules();
        } catch (err) {
            console.error('Failed to add rule:', err);
            setError(err instanceof Error ? err.message : 'Failed to add rule');
        } finally {
            setIsLoading(false);
        }
    }, [fetchRules]);

    const updateRule = useCallback(async (updatedRule: Rule) => {
        setIsLoading(true);
        setError(null);
        try {
            await apiService.updateRule(updatedRule);
            await fetchRules();
        } catch (err) {
            console.error('Failed to update rule:', err);
            setError(err instanceof Error ? err.message : 'Failed to update rule');
        } finally {
            setIsLoading(false);
        }
    }, [fetchRules]);

    const deleteRule = useCallback(async (id: string) => {
        setIsLoading(true);
        setError(null);
        try {
            await apiService.deleteRule(id);
            await fetchRules();
        } catch (err) {
            console.error('Failed to delete rule:', err);
            setError(err instanceof Error ? err.message : 'Failed to delete rule');
        } finally {
            setIsLoading(false);
        }
    }, [fetchRules]);

    const fetchUsers = useCallback((options?: FetchPageOptions) =>
            fetchDataWrapper(() => apiService.getUsers(options), setUsers, setTotalUsers),
        [fetchDataWrapper]
    );

    const addUser = useCallback(async (newUser: Omit<User, 'id'>) => {
        setIsLoading(true);
        setError(null);
        try {
            await apiService.addUser(newUser);
            await fetchUsers();
        } catch (err) {
            console.error('Failed to add user:', err);
            setError(err instanceof Error ? err.message : 'Failed to add user');
        } finally {
            setIsLoading(false);
        }
    }, [fetchUsers]);

    const updateUser = useCallback(async (updatedUser: User) => {
        setIsLoading(true);
        setError(null);
        try {
            await apiService.updateUser(updatedUser);
            await fetchUsers();
        } catch (err) {
            console.error('Failed to update user:', err);
            setError(err instanceof Error ? err.message : 'Failed to update user');
        } finally {
            setIsLoading(false);
        }
    }, [fetchUsers]);

    const deleteUser = useCallback(async (id: string) => {
        setIsLoading(true);
        setError(null);
        try {
            await apiService.deleteUser(id);
            await fetchUsers();
        } catch (err) {
            console.error('Failed to delete user:', err);
            setError(err instanceof Error ? err.message : 'Failed to delete user');
        } finally {
            setIsLoading(false);
        }
    }, [fetchUsers]);

    const fetchSettings = useCallback(() => fetchDataWrapper(() => apiService.getSettings(), setSettings), [fetchDataWrapper]);
    const updateSettings = useCallback(async (newSettings: Partial<SettingsData>) => {
        setIsLoading(true);
        setError(null);
        try {
            const updated = await apiService.updateSettings(newSettings);
            setSettings(updated);
        } catch (err) {
            console.error('Failed to update settings:', err);
            setError(err instanceof Error ? err.message : 'Failed to update settings');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const fetchEvents = useCallback((options?: FetchPageOptions) =>
            fetchDataWrapper(() => apiService.getEvents(options), (data: SystemEvent[]) => { /* Обробка даних подій */ }, (total: number) => { /* Встановити загальну кількість подій */ }),
        [fetchDataWrapper]
    );

    useEffect(() => {
        fetchProxyServiceStatus();
        fetchDashboardStatistics();
        fetchRecentEvents();
        fetchLogEntries();
        fetchRules();
        fetchUsers();
        fetchSettings();
        fetchEvents();
    }, [fetchProxyServiceStatus, fetchDashboardStatistics, fetchRecentEvents, fetchLogEntries, fetchRules, fetchUsers, fetchSettings, fetchEvents]);

    const contextValue = useMemo(() => ({
        proxyServiceStatus,
        statistics,
        recentEvents,
        logEntries,
        totalLogEntries,
        rules,
        totalRules,
        users,
        totalUsers,
        settings,
        isLoading,
        error,
        fetchProxyServiceStatus,
        toggleProxyService,
        fetchDashboardStatistics,
        fetchRecentEvents,
        fetchLogEntries,
        fetchRules,
        addRule,
        updateRule,
        deleteRule,
        fetchUsers,
        addUser,
        updateUser,
        deleteUser,
        fetchSettings,
        updateSettings,
        fetchEvents,
    }), [
        proxyServiceStatus,
        statistics,
        recentEvents,
        logEntries,
        totalLogEntries,
        rules,
        totalRules,
        users,
        totalUsers,
        settings,
        isLoading,
        error,
        fetchProxyServiceStatus,
        toggleProxyService,
        fetchDashboardStatistics,
        fetchRecentEvents,
        fetchLogEntries,
        fetchRules,
        addRule,
        updateRule,
        deleteRule,
        fetchUsers,
        addUser,
        updateUser,
        deleteUser,
        fetchSettings,
        updateSettings,
        fetchEvents,
    ]);


    return (
        <DataContext.Provider value={contextValue}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = (): DataContextType => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};