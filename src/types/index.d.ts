/**
 * @interface StatisticCard
 * @description Represents the structure for a statistic card displayed on the dashboard.
 * @property {string} title - The title of the statistic card (e.g., "Total Requests").
 * @property {number} value - The numerical value displayed on the card.
 */
// Interface for a statistic card on the dashboard.
export interface StatisticCard {
    title: string;
    value: number;
}

/**
 * @interface RecentEvent
 * @description Represents the structure for a recent event or alert.
 * @property {string} message - The message describing the event.
 * @property {'warning' | 'info' | 'error'} type - The type of the event, influencing the icon displayed.
 * @property {string} timestamp - The timestamp of the event.
 * @property {string} id - Unique identifier for the event (додано для кращого використання key)
 */
// Interface for recent events and alerts.
export interface RecentEvent {
    message: string;
    type: 'warning' | 'info' | 'error'; // <--- Оновлено: додано 'error'
    timestamp: string;
    id: string; // <--- Додано для використання в key={event.id}
}

/**
 * @interface LogEntry
 * @description Represents a single entry in the log viewer table.
 * @property {string} id - Unique identifier for the log entry.
 * @property {string} dateTime - Timestamp of the log entry.
 * @property {string} user - The user associated with the log entry.
 * @property {string} request - The request or action performed.
 * @property {'Allowed' | 'Blocked' | 'Masked'} status - The status of the request.
 */
// Interface for a single entry in the log viewer table.
export interface LogEntry {
    id: string;
    dateTime: string;
    user: string;
    request: string;
    status: 'Allowed' | 'Blocked' | 'Masked';
}

/**
 * @interface Rule
 * @description Represents a single security rule.
 * @property {string} id - Unique identifier for the rule.
 * @property {string} name - The name of the rule.
 * @property {string} type - The type of check performed by the rule.
 * @property {'Block' | 'Mask'} action - The action taken when the rule is triggered.
 * @property {boolean} enabled - Indicates if the rule is currently active.
 */
// Interface for a single security rule.
export interface Rule {
    id: string;
    name: string;
    type: string;
    action: 'Block' | 'Mask';
    enabled: boolean;
}

/**
 * @interface User
 * @description Represents a system user.
 * @property {string} id - Unique identifier for the user.
 * @property {string} name - The user's full name.
 * @property {string} email - The user's email address.
 * @property {'Admin' | 'User'} role - The role of the user.
 * @property {'Active' | 'Inactive' | 'Pending'} status - The current status of the user account.
 */
// Interface for a system user.
export interface User {
    id: string;
    name: string;
    email: string;
    role: 'Admin' | 'User';
    status: 'Active' | 'Inactive' | 'Pending';
}

/**
 * @interface SystemEvent
 * @description Represents a generic system event, renamed from 'Event' to avoid conflict.
 * @property {string} id - Unique identifier for the event.
 * @property {string} timestamp - When the event occurred.
 * @property {string} category - The category of the event (e.g., 'security', 'system').
 * @property {string} description - A brief description of the event.
 */
// Interface for a generic system event, renamed from 'Event' to avoid avoidance of conflict.
export interface SystemEvent {
    id: string;
    timestamp: string;
    category: string;
    description: string;
}

/**
 * @interface ApiKeys
 * @description Represents the configuration for API keys.
 * @property {string} openai - The OpenAI API key.
 * @property {string} googleGemini - The Google Gemini API key.
 */
// Interface for API key configuration.
export interface ApiKeys {
    openai: string;
    googleGemini: string;
}

/**
 * @interface AlertConfiguration
 * @description Represents the configuration for alert notifications.
 * @property {boolean} emailNotificationsEnabled - True if email notifications are enabled.
 * @property {boolean} webhookAlertsEnabled - True if webhook alerts are enabled.
 * @property {string[]} recipientEmails - List of email addresses to send notifications.
 */
// Interface for alert notification configuration.
export interface AlertConfiguration {
    emailNotificationsEnabled: boolean;
    webhookAlertsEnabled: boolean;
    recipientEmails: string[];
}

/**
 * @interface AdditionalSettings
 * @description Represents additional system settings.
 * @property {string} systemLanguage - The configured system language.
 * @property {string} timezone - The configured timezone.
 * @property {number} maxLogRetentionDays - Maximum number of days to retain logs.
 */
// Interface for additional system settings.

export interface AdditionalSettings {
    systemLanguage: string;
    timezone: string;
}

/**
 * @interface SettingsData
 * @description Represents the overall structure for settings data.
 * @property {ApiKeys} apiKeys - API key settings.
 * @property {AlertConfiguration} alertConfig - Alert configuration settings.
 * @property {AdditionalSettings} additionalSettings - Additional system settings.
 */
// Interface for overall settings data structure.
export interface SettingsData {
    apiKeys: ApiKeys;
    alertConfig: AlertConfig;
    additionalSettings: AdditionalSettings;
    // Add any other top-level properties your settings object might have
}

/**
 * @type ProxyServiceStatus
 * @description Type for the status of the proxy service.
 * @property {'ON' | 'OFF'} status - The current status of the proxy service.
 */
// Type for proxy service status.
export type ProxyServiceStatus = 'ON' | 'OFF';
/**
 * @interface PaginatedResponse
 * @description Generic interface for a paginated API response.
 * @template T - The type of data contained in the 'data' array.
 * @property {T[]} data - An array of items of type T.
 * @property {number} total - The total number of items available (across all pages).
 */
// Generic interface for a paginated API response.
export interface PaginatedResponse<T> {
    data: T[];
    total: number;
}