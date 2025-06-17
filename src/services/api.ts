import type { LogEntry, Rule, User, StatisticCard, RecentEvent, SettingsData, ProxyServiceStatus, PaginatedResponse, SystemEvent } from "../types";

// Commented out because the backend is not implemented.
// This is the function that will be used for actual HTTP requests to the backend.
/*
type ApiResponse<T> = T;

async function fetchJson<T>(url: string, options?: RequestInit): Promise<ApiResponse<T>> {
    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                ...(options?.headers || {}),
                'Accept': 'application/json',
                ...(options?.body && typeof options.body === 'string' && { 'Content-Type': 'application/json' }),
            },
        });

        if (!response.ok) {
            let errorText = `HTTP ${response.status}`;
            try {
                const errorData = await response.json();
                errorText += `: ${errorData.message || JSON.stringify(errorData)}`;
            } catch {
                errorText += `: ${await response.text()}`;
            }
            throw new Error(errorText);
        }

        const contentType = response.headers.get('Content-Type') || '';
        if (!contentType.includes('application/json')) {
            const text = await response.text();
            throw new Error(`Expected JSON, got: ${text.slice(0, 100)}...`);
        }

        const data = await response.json();
        return data;
    } catch (err) {
        console.error(`API Error (${url}):`, err);
        throw err;
    }
}

function buildQuery(params?: Record<string, string | number | boolean | undefined>): string {
    const query = new URLSearchParams();
    Object.entries(params || {}).forEach(([key, value]) => {
        if (value !== undefined) query.append(key, value.toString());
    });
    return query.toString();
}
*/

// --- Mock data for use without a backend ---
const mockProxyServiceStatus: ProxyServiceStatus = 'ON';
const mockStatistics: StatisticCard[] = [
    { title: 'Total Requests', value: 25432 },
    { title: 'Blocked Requests', value: 789 },
    { title: 'Active Users', value: 5 },
];
const mockRecentEvents: RecentEvent[] = [
    { id: 'event1', message: 'Suspicious activity detected on user Joe.', type: 'warning', timestamp: '2025-06-08T10:30:00Z' },
    { id: 'event2', message: 'System update completed successfully.', type: 'info', timestamp: '2025-06-08T09:00:00Z' },
    { id: 'event3', message: 'Failed login attempt from 192.168.1.100.', type: 'error', timestamp: '2025-06-08T08:15:00Z' }, // <--- Додано 'error' тип
    { id: 'event4', message: 'New user registered: User4.', type: 'info', timestamp: '2025-06-08T07:00:00Z' },
];
const mockLogEntries: LogEntry[] = [
    { id: '1', dateTime: '2025-06-08T10:45:00Z', user: 'Admin', request: 'GET /api/users', status: 'Allowed' },
    { id: '2', dateTime: '2025-06-08T10:46:00Z', user: 'User1', request: 'POST /api/data', status: 'Blocked' },
    { id: '3', dateTime: '2025-06-08T10:47:00Z', user: 'User2', request: 'GET /api/sensitive', status: 'Masked' },
    { id: '4', dateTime: '2025-06-08T10:48:00Z', user: 'User3', request: 'GET /api/reports', status: 'Allowed' },
    { id: '5', dateTime: '2025-06-08T10:49:00Z', user: 'Admin', request: 'DELETE /api/rules/1', status: 'Allowed' },
];
const mockRules: Rule[] = [
    { id: 'rule1', name: 'SQL Injection Prevention', type: 'SQLI', action: 'Block', enabled: true },
    { id: 'rule2', name: 'XSS Detection', type: 'XSS', action: 'Mask', enabled: true },
    { id: 'rule3', name: 'Sensitive Data Masking', type: 'DLP', action: 'Mask', enabled: false },
];
const mockUsers: User[] = [
    { id: 'user1', name: 'John Doe', email: 'john.doe@example.com', role: 'Admin', status: 'Active' },
    { id: 'user2', name: 'Jane Smith', email: 'jane.smith@example.com', role: 'User', status: 'Active' },
    { id: 'user3', name: 'Peter Jones', email: 'peter.jones@example.com', role: 'User', status: 'Inactive' },
];
const mockSettings: SettingsData = {
    apiKeys: { openai: 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', googleGemini: 'AIzaSyxxxxxxxxxxxxxxxxxxxxxxxxxxxx' },
    alertConfig: { emailNotificationsEnabled: true, webhookAlertsEnabled: false, recipientEmails: ['admin@example.com'] },
    additionalSettings: { systemLanguage: 'en-US', timezone: 'UTC+2', maxLogRetentionDays: 30 },
};
const mockSystemEvents: SystemEvent[] = [
    { id: 'e1', timestamp: '2025-06-08T10:00:00Z', category: 'System', description: 'Server restarted' },
    { id: 'e2', timestamp: '2025-06-08T11:00:00Z', category: 'Security', description: 'Unauthorized access attempt' },
];

// Network latency simulation
const simulateNetworkDelay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

export const apiService = {
    // --- Dashboard related ---
    getProxyServiceStatus: async (): Promise<ProxyServiceStatus> => {
        // const data = await fetchJson<ProxyServiceStatus>('/api/proxy/status');
        // return data;
        await simulateNetworkDelay();
        return Promise.resolve(mockProxyServiceStatus);
    },

    toggleProxyServiceStatus: async (): Promise<ProxyServiceStatus> => {
        // const newStatus = await fetchJson<ProxyServiceStatus>('/api/proxy/toggle', { method: 'POST' });
        // return newStatus;
        await simulateNetworkDelay();
        // In real life, there will be a change in status here
        const currentStatus = mockProxyServiceStatus === 'ON' ? 'OFF' : 'ON'; // This is temporary, for imitation.
        return Promise.resolve(currentStatus);
    },

    getDashboardStatistics: async (): Promise<StatisticCard[]> => {
        // const data = await fetchJson<StatisticCard[]>('/api/dashboard/statistics');
        // return data;
        await simulateNetworkDelay();
        return Promise.resolve(mockStatistics); // WE ARE RETURNING NEW DATA
    },

    getRecentEvents: async (): Promise<RecentEvent[]> => {
        // const data = await fetchJson<RecentEvent[]>('/api/dashboard/recent-events');
        // return data;
        await simulateNetworkDelay();
        return Promise.resolve(mockRecentEvents);
    },

    // --- Log Viewer related ---
    getLogEntries: async (options?: { page?: number; limit?: number; filter?: string; sortBy?: keyof LogEntry; sortOrder?: 'asc' | 'desc' }): Promise<PaginatedResponse<LogEntry>> => {
        // const query = buildQuery(options);
        // const data = await fetchJson<PaginatedResponse<LogEntry>>(`/api/logs?${query}`);
        // return data;
        await simulateNetworkDelay();
        const page = options?.page || 1;
        const limit = options?.limit || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedData = mockLogEntries.slice(startIndex, endIndex);
        return Promise.resolve({ data: paginatedData, total: mockLogEntries.length });
    },

    // --- Rule Management related ---
    getRules: async (options?: { page?: number; limit?: number }): Promise<PaginatedResponse<Rule>> => {
        // const query = buildQuery(options);
        // const data = await fetchJson<PaginatedResponse<Rule>>(`/api/rules?${query}`);
        // return data;
        await simulateNetworkDelay();
        const page = options?.page || 1;
        const limit = options?.limit || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedData = mockRules.slice(startIndex, endIndex);
        return Promise.resolve({ data: paginatedData, total: mockRules.length });
    },

    addRule: async (newRule: Omit<Rule, 'id'>): Promise<Rule> => {
        // return await fetchJson<Rule>('/api/rules', { method: 'POST', body: JSON.stringify(newRule) });
        await simulateNetworkDelay();
        const addedRule = { ...newRule, id: `rule${mockRules.length + 1}` }; // Генеруємо тимчасовий ID
        // mockRules.push(addedRule); // Для імітації додавання, якщо треба
        console.log('Mock: Adding rule', addedRule);
        return Promise.resolve(addedRule);
    },

    updateRule: async (updatedRule: Rule): Promise<Rule> => {
        // if (!updatedRule.id) throw new Error('Rule ID is required for update');
        // return await fetchJson<Rule>(`/api/rules/${updatedRule.id}`, { method: 'PUT', body: JSON.stringify(updatedRule) });
        await simulateNetworkDelay();
        console.log('Mock: Updating rule', updatedRule);
        return Promise.resolve(updatedRule);
    },

    deleteRule: async (id: string): Promise<void> => {
        // await fetchJson<void>(`/api/rules/${id}`, { method: 'DELETE' });
        await simulateNetworkDelay();
        console.log('Mock: Deleting rule with ID', id);
        return Promise.resolve();
    },

    // --- User Management related ---
    getUsers: async (options?: { page?: number; limit?: number }): Promise<PaginatedResponse<User>> => {
        // const query = buildQuery(options);
        // const data = await fetchJson<PaginatedResponse<User>>(`/api/users?${query}`);
        // return data;
        await simulateNetworkDelay();
        const page = options?.page || 1;
        const limit = options?.limit || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedData = mockUsers.slice(startIndex, endIndex);
        return Promise.resolve({ data: paginatedData, total: mockUsers.length });
    },

    addUser: async (newUser: Omit<User, 'id'>): Promise<User> => {
        // return await fetchJson<User>('/api/users', { method: 'POST', body: JSON.stringify(newUser) });
        await simulateNetworkDelay();
        const addedUser = { ...newUser, id: `user${mockUsers.length + 1}` };
        console.log('Mock: Adding user', addedUser);
        return Promise.resolve(addedUser);
    },

    updateUser: async (updatedUser: User): Promise<User> => {
        // if (!updatedUser.id) throw new Error('User ID is required for update');
        // return await fetchJson<User>(`/api/users/${updatedUser.id}`, { method: 'PUT', body: JSON.stringify(updatedUser) });
        await simulateNetworkDelay();
        console.log('Mock: Updating user', updatedUser);
        return Promise.resolve(updatedUser);
    },

    deleteUser: async (id: string): Promise<void> => {
        // await fetchJson<void>(`/api/users/${id}`, { method: 'DELETE' });
        await simulateNetworkDelay();
        console.log('Mock: Deleting user with ID', id);
        return Promise.resolve();
    },

    // --- Event related ---
    getEvents: async (options?: { page?: number; limit?: number }): Promise<PaginatedResponse<SystemEvent>> => {
        // const query = buildQuery(options);
        // const data = await fetchJson<PaginatedResponse<SystemEvent>>(`/api/events?${query}`);
        // return data;
        await simulateNetworkDelay();
        const page = options?.page || 1;
        const limit = options?.limit || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedData = mockSystemEvents.slice(startIndex, endIndex);
        return Promise.resolve({ data: paginatedData, total: mockSystemEvents.length });
    },

    // --- Settings related ---
    getSettings: async (): Promise<SettingsData> => {
        // const data = await fetchJson<SettingsData>(`/api/settings`);
        // return data;
        await simulateNetworkDelay();
        return Promise.resolve(mockSettings);
    },

    updateSettings: async (newSettings: Partial<SettingsData>): Promise<SettingsData> => {
        // return await fetchJson<SettingsData>('/api/settings', { method: 'PUT', body: JSON.stringify(newSettings) });
        await simulateNetworkDelay();
        // In real life, there will be data updates here
        console.log('Mock: Updating settings', newSettings);
        return Promise.resolve({ ...mockSettings, ...newSettings });
    },
};