// src/pages/Settings.tsx
import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Modal from '../components/ui/Modal';
import { useData } from '../contexts/DataContext';
// import { SettingsData } from '../types'

/**
 * @component Settings
 * @description Page for managing system settings, including API configuration,
 * alert configuration, and additional settings like language and timezone.
 */
// UA: Сторінка для управління системними налаштуваннями, включаючи конфігурацію API,
// конфігурацію сповіщень та додаткові налаштування, такі як мова та часовий пояс.
// EN: Page for managing system settings, including API configuration,
// alert configuration, and additional settings like language and timezone.
const Settings: React.FC = () => {
    const { settings, isLoading, error, fetchSettings, updateSettings } = useData();

    const [isApiModalOpen, setIsApiModalOpen] = useState(false);
    const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
    const [isAdditionalSettingsModalOpen, setIsAdditionalSettingsModalOpen] = useState(false);

    const [apiForm, setApiForm] = useState({ openai: '', googleGemini: '' });
    const [alertForm, setAlertForm] = useState({ emailNotificationsEnabled: false, webhookAlertsEnabled: false });
    const [additionalForm, setAdditionalForm] = useState({ systemLanguage: '', timezone: '' });

    // Load settings into form when data is available
    useEffect(() => {
        if (settings) {
            setApiForm({
                openai: settings.apiKeys.openai,
                googleGemini: settings.apiKeys.googleGemini,
            });
            setAlertForm({
                emailNotificationsEnabled: settings.alertConfig.emailNotificationsEnabled,
                webhookAlertsEnabled: settings.alertConfig.webhookAlertsEnabled,
            });
            setAdditionalForm({
                systemLanguage: settings.additionalSettings.systemLanguage,
                timezone: settings.additionalSettings.timezone,
            });
        }
    }, [settings]);

    /**
     * @function handleApiFormChange
     * @description Handles changes in API key input fields.
     * @param {React.ChangeEvent<HTMLInputElement>} e - The change event.
     */
        // UA: Обробляє зміни в полях вводу ключів API.
        // EN: Handles changes in API key input fields.
    const handleApiFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setApiForm(prev => ({ ...prev, [name]: value }));
        };

    /**
     * @function handleAlertFormChange
     * @description Handles changes in alert configuration checkboxes.
     * @param {React.ChangeEvent<HTMLInputElement>} e - The change event.
     */
        // UA: Обробляє зміни у прапорцях конфігурації сповіщень.
        // EN: Handles changes in alert configuration checkboxes.
    const handleAlertFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, checked } = e.target;
            setAlertForm(prev => ({ ...prev, [name]: checked }));
        };

    /**
     * @function handleAdditionalFormChange
     * @description Handles changes in additional settings input/select fields.
     * @param {React.ChangeEvent<HTMLInputElement | HTMLSelectElement>} e - The change event.
     */
        // UA: Обробляє зміни в полях вводу/вибору додаткових налаштувань.
        // EN: Handles changes in additional settings input/select fields.
    const handleAdditionalFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            const { name, value } = e.target;
            setAdditionalForm(prev => ({ ...prev, [name]: value }));
        };

    /**
     * @function handleSaveApiSettings
     * @description Saves the updated API key settings.
     * @param {React.FormEvent} e - The form submission event.
     */
        // UA: Зберігає оновлені налаштування ключів API.
        // EN: Saves the updated API key settings.
    const handleSaveApiSettings = async (e: React.FormEvent) => {
            e.preventDefault();
            await updateSettings({ apiKeys: apiForm });
            setIsApiModalOpen(false);
        };

    /**
     * @function handleSaveAlertSettings
     * @description Saves the updated alert configuration settings.
     * @param {React.FormEvent} e - The form submission event.
     */
        // UA: Зберігає оновлені налаштування конфігурації сповіщень.
        // EN: Saves the updated alert configuration settings.
    const handleSaveAlertSettings = async (e: React.FormEvent) => {
            e.preventDefault();
            await updateSettings({ alertConfig: alertForm });
            setIsAlertModalOpen(false);
        };

    /**
     * @function handleSaveAdditionalSettings
     * @description Saves the updated additional system settings.
     * @param {React.FormEvent} e - The form submission event.
     */
        // UA: Зберігає оновлені додаткові системні налаштування.
        // EN: Saves the updated additional system settings.
    const handleSaveAdditionalSettings = async (e: React.FormEvent) => {
            e.preventDefault();
            await updateSettings({ additionalSettings: additionalForm });
            setIsAdditionalSettingsModalOpen(false);
        };

    if (isLoading && !settings) {
        return <div className="text-center text-lg text-gray-700 dark:text-gray-300">Loading settings...</div>;
    }

    if (error) {
        return <div className="text-center text-lg text-red-600 dark:text-red-400">Error: {error}</div>;
    }

    if (!settings) {
        return <div className="text-center text-lg text-gray-500 dark:text-gray-400">No settings data available.</div>;
    }

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Settings</h2>

            {/* API Configuration */}
            <Card>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">API Configuration</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-gray-700 dark:text-gray-300">OpenAI API Key:</span>
                        <span className="font-mono text-gray-900 dark:text-gray-100">
              {settings.apiKeys.openai ? '************************************' : 'Not Set'}
            </span>
                        <Button variant="secondary" size="small" onClick={() => setIsApiModalOpen(true)}>
                            Change
                        </Button>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-gray-700 dark:text-gray-300">Google Gemini Key:</span>
                        <span className="font-mono text-gray-900 dark:text-gray-100">
              {settings.apiKeys.googleGemini ? '************************************' : 'Not Set'}
            </span>
                        <Button variant="secondary" size="small" onClick={() => setIsApiModalOpen(true)}>
                            {settings.apiKeys.googleGemini ? 'Change' : 'Set Up'}
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Alert Configuration */}
            <Card>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Alert Configuration</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-gray-700 dark:text-gray-300">Email Notifications:</span>
                        <span className={`font-semibold ${settings.alertConfig.emailNotificationsEnabled ? 'text-green-600' : 'text-red-600'}`}>
              {settings.alertConfig.emailNotificationsEnabled ? 'Enabled' : 'Disabled'}
            </span>
                        <Button variant="secondary" size="small" onClick={() => setIsAlertModalOpen(true)}>
                            Edit
                        </Button>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-gray-700 dark:text-gray-300">Webhook Alerts:</span>
                        <span className={`font-semibold ${settings.alertConfig.webhookAlertsEnabled ? 'text-green-600' : 'text-red-600'}`}>
              {settings.alertConfig.webhookAlertsEnabled ? 'Enabled' : 'Disabled'}
            </span>
                        <Button variant="secondary" size="small" onClick={() => setIsAlertModalOpen(true)}>
                            {settings.alertConfig.webhookAlertsEnabled ? 'Disable' : 'Enable'}
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Additional Settings */}
            <Card>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Additional Settings</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-gray-700 dark:text-gray-300">System Language:</span>
                        <span className="font-semibold text-gray-900 dark:text-gray-100">{settings.additionalSettings.systemLanguage}</span>
                        <Button variant="secondary" size="small" onClick={() => setIsAdditionalSettingsModalOpen(true)}>
                            Change
                        </Button>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-gray-700 dark:text-gray-300">Timezone:</span>
                        <span className="font-semibold text-gray-900 dark:text-gray-100">{settings.additionalSettings.timezone}</span>
                        <Button variant="secondary" size="small" onClick={() => setIsAdditionalSettingsModalOpen(true)}>
                            Change
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Modals for editing settings */}
            <Modal isOpen={isApiModalOpen} onClose={() => setIsApiModalOpen(false)} title="Edit API Keys">
                <form onSubmit={handleSaveApiSettings}>
                    <Input
                        label="OpenAI API Key"
                        name="openai"
                        type="password" // Mask the input
                        value={apiForm.openai}
                        onChange={handleApiFormChange}
                        placeholder="sk-************************************"
                    />
                    <Input
                        label="Google Gemini Key"
                        name="googleGemini"
                        type="password" // Mask the input
                        value={apiForm.googleGemini}
                        onChange={handleApiFormChange}
                        placeholder="AIza*********************************"
                    />
                    <div className="flex justify-end space-x-2 mt-6">
                        <Button type="button" variant="secondary" onClick={() => setIsApiModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary" loading={isLoading}>
                            Save API Keys
                        </Button>
                    </div>
                </form>
            </Modal>

            <Modal isOpen={isAlertModalOpen} onClose={() => setIsAlertModalOpen(false)} title="Edit Alert Configuration">
                <form onSubmit={handleSaveAlertSettings}>
                    <div className="flex items-center mb-4">
                        <input
                            id="emailNotifications"
                            name="emailNotificationsEnabled"
                            type="checkbox"
                            checked={alertForm.emailNotificationsEnabled}
                            onChange={handleAlertFormChange}
                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <label htmlFor="emailNotifications" className="ml-2 block text-sm text-gray-900 dark:text-gray-100">
                            Email Notifications
                        </label>
                    </div>
                    <div className="flex items-center mb-4">
                        <input
                            id="webhookAlerts"
                            name="webhookAlertsEnabled"
                            type="checkbox"
                            checked={alertForm.webhookAlertsEnabled}
                            onChange={handleAlertFormChange}
                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <label htmlFor="webhookAlerts" className="ml-2 block text-sm text-gray-900 dark:text-gray-100">
                            Webhook Alerts
                        </label>
                    </div>
                    <div className="flex justify-end space-x-2 mt-6">
                        <Button type="button" variant="secondary" onClick={() => setIsAlertModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary" loading={isLoading}>
                            Save Alert Settings
                        </Button>
                    </div>
                </form>
            </Modal>

            <Modal isOpen={isAdditionalSettingsModalOpen} onClose={() => setIsAdditionalSettingsModalOpen(false)} title="Edit Additional Settings">
                <form onSubmit={handleSaveAdditionalSettings}>
                    <div className="mb-4">
                        <label htmlFor="systemLanguage" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            System Language
                        </label>
                        <select
                            id="systemLanguage"
                            name="systemLanguage"
                            value={additionalForm.systemLanguage}
                            onChange={handleAdditionalFormChange}
                            className="block w-full px-3 py-2 border rounded-md shadow-sm bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="English">English</option>
                            <option value="Ukrainian">Ukrainian</option>
                            <option value="Spanish">Spanish</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Timezone
                        </label>
                        <select
                            id="timezone"
                            name="timezone"
                            value={additionalForm.timezone}
                            onChange={handleAdditionalFormChange}
                            className="block w-full px-3 py-2 border rounded-md shadow-sm bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="GMT+2">GMT+2 (Kyiv)</option>
                            <option value="GMT+0">GMT+0 (London)</option>
                            <option value="GMT-5">GMT-5 (New York)</option>
                            <option value="GMT+9">GMT+9 (Tokyo)</option>
                        </select>
                    </div>
                    <div className="flex justify-end space-x-2 mt-6">
                        <Button type="button" variant="secondary" onClick={() => setIsAdditionalSettingsModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary" loading={isLoading}>
                            Save Settings
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Settings;