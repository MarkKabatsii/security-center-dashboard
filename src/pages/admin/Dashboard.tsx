import React, {useEffect} from 'react';
import Card from '../../components/ui/Card.tsx';
import Button from '../../components/ui/Button.tsx';
import Badge from '../../components/ui/Badge.tsx';
import {useData} from '../../contexts/DataContext.tsx';
import type {RecentEvent} from '../../types';
import {Ban, CircleAlert, Info} from "lucide-react";

/**
 * @component Dashboard
 * @description The main dashboard page displaying security center overview:
 * Proxy Service Status, Statistics, and Recent Events & Alerts.
 */
// The main dashboard page displaying security center overview:
// Proxy Service Status, Statistics, and Recent Events & Alerts.
const Dashboard: React.FC = () => {
    const {
        proxyServiceStatus,
        statistics,
        recentEvents,
        isLoading,
        error,
        fetchProxyServiceStatus,
        toggleProxyService,
        fetchDashboardStatistics,
        fetchRecentEvents,
    } = useData();

    // Fetch data on component mount and periodically
    useEffect(() => {
        // Initial fetch
        fetchProxyServiceStatus();
        fetchDashboardStatistics();
        fetchRecentEvents();

        // Set up interval for dynamic data (e.g., every 5 seconds)
        const interval = setInterval(() => {
            fetchDashboardStatistics();
            fetchRecentEvents();
        }, 5000);

        // Cleanup interval on unmount
        return () => clearInterval(interval);
    }, [fetchProxyServiceStatus, fetchDashboardStatistics, fetchRecentEvents]);

    /**
     * @function getStatusBadgeVariant
     * @description Determines the badge variant based on the event type.
     * @param {'warning' | 'info' | 'error'} type - The type of the event.
     * @returns {'warning' | 'info' | 'error' | 'default'} The corresponding badge variant.
     */
        // Determines the badge variant based on the event type.
    const getStatusBadgeVariant = (type: RecentEvent['type']) => {
            switch (type) {
                case 'warning':
                    return 'warning';
                case 'info':
                    return 'info';
                case 'error':
                    return 'error';
                default:
                    return 'default';
            }
        };

    if (isLoading && !statistics.length && !recentEvents.length) {
        return <div className="text-center text-lg text-light-text dark:text-dark-text">Loading dashboard data...</div>;
    }

    if (error) {
        return <div className="text-center text-lg text-light-error dark:text-dark-error">Error: {error}</div>;
    }

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-light-text dark:text-dark-text mb-6">Dashboard</h2>
            {/* Proxy Service Status */}
            <Card>
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-light-text dark:text-dark-text">Proxy Service Status</h3>
                    <Button
                        variant={proxyServiceStatus === 'ON' ? 'success' : 'danger'}
                        onClick={toggleProxyService}
                        loading={isLoading}
                    >
                        {proxyServiceStatus === 'ON' ? 'ON' : 'OFF'}
                    </Button>
                </div>
            </Card>

            {/* Statistical Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {statistics.map((stat) => (
                    <Card key={stat.title}>
                        <h3 className="text-lg font-medium text-light-text dark:text-dark-text mb-2">{stat.title}</h3>
                        <p className="text-4xl font-bold text-light-accent dark:text-dark-accent">{stat.value.toLocaleString()}</p>
                    </Card>
                ))}
            </div>

            {/* Recent Events & Alerts */}
            <Card>
                <h3 className="text-xl font-semibold text-light-text dark:text-dark-text mb-4">Recent Events &
                    Alerts</h3>
                {recentEvents.length > 0 ? (
                    <ul className="space-y-3">
                        {recentEvents.map((event) => (
                            <li key={event.id} className="flex items-center space-x-3">
                                <Badge variant={getStatusBadgeVariant(event.type)} className="px-0 py-0 ">
                                    {event.type === 'warning' ? <CircleAlert
                                        className="h-5 w-5 text-light-bg dark:text-dark-bg"/> : event.type === 'error' ?
                                        <Ban className="h-5 w-5 text-light-bg dark:text-dark-bg"/> :
                                        <Info className="h-5 w-5 text-light-bg dark:text-dark-bg"/>}
                                </Badge>
                                <span className="text-light-text dark:text-dark-text">{event.message}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-light-muted dark:text-dark-muted">No recent events or alerts.</p>
                )}
            </Card>
        </div>
    );
};

export default Dashboard;