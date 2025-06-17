import { type ReactNode} from "react";
import classNames from 'classnames';
import Button from './Button'; // Assuming Button component exists

/**
 * @interface TableColumn
 * @description Defines the structure of a column in the Table component.
 * @template T - The type of data object for each row.
 * @property {keyof T | string} key - The key of the data property to display, or a unique string for custom content.
 * @property {string} header - The display header for the column.
 * @property {boolean} [sortable=false] - If true, allows sorting by this column.
 * @property {(row: T) => ReactNode} [render] - Optional render function for custom cell content.
 * Receives the full row object.
 * @property {string} [className] - Optional CSS class for the column header and cells.
 */
// Defines the structure of a column in the Table component.
export interface TableColumn<T> {
    key: keyof T | string;
    header: string;
    sortable?: boolean;
    render?: (row: T) => ReactNode;
    className?: string;
}

/**
 * @interface TableProps
 * @description Props for the Table component.
 * @template T - The type of data object for each row.
 * @property {TableColumn<T>[]} columns - An array defining the table columns.
 * @property {T[]} data - An array of data objects to display as rows.
 * @property {number} [totalItems=0] - Total number of items (for pagination).
 * @property {number} [itemsPerPage=10] - Number of items to display per page.
 * @property {number} [currentPage=1] - The current active page.
 * @property {(page: number) => void} [onPageChange] - Callback when the page changes.
 * @property {(itemsPerPage: number) => void} [onItemsPerPageChange] - Callback when items per page changes.
 * @property {(sortBy: keyof T | string, sortOrder: 'asc' | 'desc') => void} [onSort] - Callback when sorting parameters change.
 * @property {keyof T | string} [currentSortBy] - The currently sorted column key.
 * @property {'asc' | 'desc'} [currentSortOrder] - The current sort order.
 * @property {string} [emptyMessage="No data available."] - Message to display when no data is present.
 * @property {boolean} [isLoading=false] - If true, displays a loading indicator.
 */
// Props for the Table component.
interface TableProps<T> {
    columns: TableColumn<T>[];
    data: T[];
    totalItems?: number;
    itemsPerPage?: number;
    currentPage?: number;
    onPageChange?: (page: number) => void;
    onItemsPerPageChange?: (itemsPerPage: number) => void;
    onSort?: (sortBy: keyof T | string, sortOrder: 'asc' | 'desc') => void;
    currentSortBy?: keyof T | string;
    currentSortOrder?: 'asc' | 'desc';
    emptyMessage?: string;
    isLoading?: boolean;
}

/**
 * @component Table
 * @description A generic, reusable table component with sorting and pagination capabilities.
 * @template T - The type of data object for each row.
 * @param {TableProps<T>} props - The component's props.
 */
// A generic, reusable table component with sorting and pagination capabilities.
function Table<T extends { id?: string | number }>({
                                                       columns,
                                                       data,
                                                       totalItems = 0,
                                                       itemsPerPage = 10,
                                                       currentPage = 1,
                                                       onPageChange,
                                                       onItemsPerPageChange,
                                                       onSort,
                                                       currentSortBy,
                                                       currentSortOrder,
                                                       emptyMessage = 'No data available.',
                                                       isLoading = false,
                                                   }: TableProps<T>) {
    const totalPages = itemsPerPage === -1 ? 1 : Math.ceil(totalItems / itemsPerPage);
    const paginationOptions = [5, 10, 25, totalItems === 0 ? 0 : -1].filter(option => option <= totalItems || option === -1);

    const handleSort = (columnKey: keyof T | string, sortable?: boolean) => {
        if (!sortable || !onSort) return;

        let newSortOrder: 'asc' | 'desc' = 'asc';
        if (currentSortBy === columnKey) {
            newSortOrder = currentSortOrder === 'asc' ? 'desc' : 'asc';
        }
        onSort(columnKey, newSortOrder);
    };

    return (
        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                    {columns.map((column) => (
                        <th
                            key={String(column.key)}
                            scope="col"
                            className={classNames(
                                'px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider',
                                { 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600': column.sortable },
                                column.className
                            )}
                            onClick={() => handleSort(column.key, column.sortable)}
                        >
                            <div className="flex items-center">
                                {column.header}
                                {column.sortable && currentSortBy === column.key && (
                                    <span className="ml-2">
                      {currentSortOrder === 'asc' ? '▲' : '▼'}
                    </span>
                                )}
                            </div>
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {isLoading ? (
                    <tr>
                        <td colSpan={columns.length} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                            Loading data...
                        </td>
                    </tr>
                ) : data.length === 0 ? (
                    <tr>
                        <td colSpan={columns.length} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                            {emptyMessage}
                        </td>
                    </tr>
                ) : (
                    data.map((row) => (
                        <tr key={row.id}>
                            {columns.map((column) => (
                                <td
                                    key={`${String(column.key)}-${row.id}`}
                                    className={classNames('px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200', column.className)}
                                >
                                    {column.render ? column.render(row) : String(row[column.key as keyof T])}
                                </td>
                            ))}
                        </tr>
                    ))
                )}
                </tbody>
            </table>

            {totalItems > 0 && (
                <div className="flex items-center justify-between px-6 py-3 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center">
                        <span className="text-sm text-gray-700 dark:text-gray-300 mr-2">Items per page:</span>
                        <select
                            value={itemsPerPage}
                            onChange={(e) => onItemsPerPageChange && onItemsPerPageChange(Number(e.target.value))}
                            className="form-select block w-full pl-3 pr-10 py-1.5 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
                        >
                            {paginationOptions.map(option => (
                                <option key={option} value={option}>
                                    {option === -1 ? 'All' : option}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center">
            <span className="text-sm text-gray-700 dark:text-gray-300 mr-2">
              Page {currentPage} of {totalPages}
            </span>
                        <Button
                            variant="secondary"
                            size="small"
                            onClick={() => onPageChange && onPageChange(currentPage - 1)}
                            disabled={currentPage === 1 || isLoading}
                            className="mr-2"
                        >
                            Previous
                        </Button>
                        <Button
                            variant="secondary"
                            size="small"
                            onClick={() => onPageChange && onPageChange(currentPage + 1)}
                            disabled={currentPage === totalPages || isLoading || itemsPerPage === -1}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Table;