// src/pages/LogViewer.tsx
import React, { useState, useEffect, useCallback } from 'react';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Table, {type TableColumn } from '../components/ui/Table';
import Badge from '../components/ui/Badge';
import { useData } from '../contexts/DataContext';
import type {LogEntry} from '../types';

/**
 * @component LogViewer
 * @description Page for viewing and filtering system logs.
 * Includes a filter input and a paginated, sortable table of log entries.
 */
// UA: Сторінка для перегляду та фільтрації системних логів.
// Включає поле вводу для фільтра та таблицю записів логів з пагінацією та сортуванням.
// EN: Page for viewing and filtering system logs.
// Includes a filter input and a paginated, sortable table of log entries.
const LogViewer: React.FC = () => {
    const { logEntries, totalLogEntries, isLoading, error, fetchLogEntries } = useData();

    const [filter, setFilter] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);
    const [sortBy, setSortBy] = useState<keyof LogEntry>('dateTime');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    // Fetch logs based on current pagination and filter settings
    const getLogs = useCallback(() => {
        fetchLogEntries({
            page: currentPage,
            limit: itemsPerPage,
            filter: filter,
            sortBy: sortBy,
            sortOrder: sortOrder,
        });
    }, [currentPage, itemsPerPage, filter, sortBy, sortOrder, fetchLogEntries]);

    useEffect(() => {
        getLogs();
    }, [getLogs]); // Re-fetch logs when pagination/filter/sort changes

    /**
     * @function handleFilterChange
     * @description Handles changes in the filter input field, resetting to the first page.
     * @param {React.ChangeEvent<HTMLInputElement>} e - The change event from the input.
     */
        // UA: Обробляє зміни в полі вводу фільтра, скидаючи на першу сторінку.
        // EN: Handles changes in the filter input field, resetting to the first page.
    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setFilter(e.target.value);
            setCurrentPage(1); // Reset to first page on filter change
        };

    /**
     * @function getStatusBadgeVariant
     * @description Returns the appropriate badge variant for a log status.
     * @param {LogEntry['status']} status - The status of the log entry.
     * @returns {'success' | 'danger' | 'warning' | 'default'} The badge variant.
     */
        // UA: Повертає відповідний варіант бейджа для статусу логу.
        // EN: Returns the appropriate badge variant for a log status.
    const getStatusBadgeVariant = (status: LogEntry['status']) => {
            switch (status) {
                case 'Allowed':
                    return 'success';
                case 'Blocked':
                    return 'danger';
                case 'Masked':
                    return 'warning';
                default:
                    return 'default';
            }
        };

    // Define table columns - UA: Визначаємо колонки таблиці
    // EN: Define table columns
    const columns: TableColumn<LogEntry>[] = [
        {
            key: 'dateTime',
            header: 'Date/Time',
            sortable: true,
            className: 'font-mono text-gray-700 dark:text-gray-300'
        },
        {
            key: 'user',
            header: 'User',
            sortable: true,
            className: 'font-semibold'
        },
        {
            key: 'request',
            header: 'Request',
            sortable: true,
        },
        {
            key: 'status',
            header: 'Status',
            sortable: true,
            render: (row) => (
                <Badge variant={getStatusBadgeVariant(row.status)}>
                    {row.status}
                </Badge>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Log Viewer</h2>

            <Card>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Log Filter</h3>
                <Input
                    type="text"
                    placeholder="Filter by User or Status..."
                    value={filter}
                    onChange={handleFilterChange}
                    className="max-w-md"
                />
            </Card>

            <Card>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Log Entries</h3>
                {error && <p className="text-red-600 dark:text-red-400 mb-4">Error loading logs: {error}</p>}
                <Table<LogEntry>
                    columns={columns}
                    data={logEntries}
                    totalItems={totalLogEntries}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                    onItemsPerPageChange={(limit) => {
                        setItemsPerPage(limit);
                        setCurrentPage(1); // Reset to page 1 when items per page changes
                    }}
                    onSort={(key, order) => {
                        setSortBy(key as keyof LogEntry); // Type assertion is safe here as keys are defined
                        setSortOrder(order);
                        setCurrentPage(1); // Reset to page 1 on sort change
                    }}
                    currentSortBy={sortBy}
                    currentSortOrder={sortOrder}
                    isLoading={isLoading}
                    emptyMessage="No log entries found matching your criteria."
                />
            </Card>
        </div>
    );
};

export default LogViewer;