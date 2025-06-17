import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Select from '../../components/ui/Select';
import mockHistoryData, {type HistoryEntry} from '../../data/historyData';

const HistoryPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Declare queryParams here so it is available
    const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);

    // Now initialFilterType can safely use queryParams
    const initialFilterType = queryParams.get('type') || 'All';

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filterType, setFilterType] = useState<string>(initialFilterType);
    const [sortBy, setSortBy] = useState<string>('timestamp-desc');
    const [filteredHistory, setFilteredHistory] = useState<HistoryEntry[]>([]);
    // Getting unique types for a filter
    // We use useCallback to avoid unnecessary recalculation
    const uniqueTypes = React.useMemo(() => {
        return ['All', ...new Set(mockHistoryData.map(entry => entry.type))];
    }, []); // Dependencies on mockHistoryData (if it can change, which is unlikely for mocks)

    // useCallback for filtering and sorting function
    const applyFiltersAndSort = useCallback(() => {
        let currentHistory = [...mockHistoryData];

        // 1. Filtering by type (from the sidebar or select)
        if (filterType !== 'All') {
            currentHistory = currentHistory.filter(entry => entry.type === filterType);
        }

        // 2. Search by term
        if (searchTerm) {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            currentHistory = currentHistory.filter(entry =>
                entry.promptSummary.toLowerCase().includes(lowerCaseSearchTerm) ||
                entry.originalPrompt.toLowerCase().includes(lowerCaseSearchTerm) ||
                entry.aiResponse.toLowerCase().includes(lowerCaseSearchTerm)
            );
        }

        // 3. Sorting
        currentHistory.sort((a, b) => {
            if (sortBy === 'timestamp-desc') {
                return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
            } else if (sortBy === 'timestamp-asc') {
                return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
            }
            return 0;
        });

        setFilteredHistory(currentHistory);
    }, [searchTerm, filterType, sortBy]); // Dependencies for useCallback

    // Effect for applying filters and sorting when changing the corresponding states
    useEffect(() => {
        applyFiltersAndSort();
    }, [applyFiltersAndSort]);

    // Effect for updating the type filter when the URL changes (e.g. from a sidebar click)
    useEffect(() => {
        const newFilter = queryParams.get('type') || 'All';
        if (newFilter !== filterType) {
            setFilterType(newFilter);
        }
    }, [location.search, filterType, queryParams]);


    const handleViewDetails = (entry: HistoryEntry) => {
        // Navigating to the details page by record ID
        navigate(`/response-view/${entry.id}`);
    };

    const getStatusBadgeVariant = (status: HistoryEntry['status']) => {
        switch (status) {
            case 'Success':
                return 'success';
            case 'Failed':
                return 'danger';
            case 'Blocked':
                return 'warning';
            default:
                return 'default';
        }
    };

    const formatTimestamp = (isoString: string) => {
        const date = new Date(isoString);
        return date.toLocaleString(); // Date and time formatting
    };

    return (
        <div className="bg-light-bg dark:bg-dark-bg p-4 md:p-8 min-h-screen">
            <h1 className="text-3xl font-bold text-light-text dark:text-dark-text mb-6">History</h1>
            {/* Filter and search panel */}
            <div
                className="flex flex-col md:flex-row gap-4 mb-8 p-4 bg-light-surface dark:bg-dark-surface rounded-lg shadow-md border border-light-border dark:border-dark-border">
                <div className="flex-1">
                    <Input
                        type="text"
                        placeholder="Search prompts, responses..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full"
                    />
                </div>
                <div className="w-full md:w-auto md:min-w-[150px]">
                    <Select
                        options={uniqueTypes.map(type => ({value: type, label: type}))}
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="w-full"
                    />
                </div>
                <div className="w-full md:w-auto md:min-w-[150px]">
                    <Select
                        options={[
                            {value: 'timestamp-desc', label: 'Newest First'},
                            {value: 'timestamp-asc', label: 'Oldest First'},
                        ]}
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full"
                    />
                </div>
            </div>

            {/* History list */}
            <div className="space-y-6">
                {filteredHistory.length > 0 ? (
                    filteredHistory.map((entry) => (
                        <div
                            key={entry.id}
                            className="bg-light-surface dark:bg-dark-surface p-6 rounded-lg shadow-md border border-light-border dark:border-dark-border flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                        >
                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-light-muted dark:text-dark-muted mb-1">
                                    {formatTimestamp(entry.timestamp)}
                                </p>
                                <h3 className="text-lg font-semibold text-light-text dark:text-dark-text truncate mb-2">
                                    {entry.promptSummary}
                                </h3>
                                <div
                                    className="flex items-center space-x-2 flex-wrap">
                                    <Badge variant="default"
                                           className="capitalize mb-1 md:mb-0">{entry.modelUsed}</Badge>
                                    <Badge variant={getStatusBadgeVariant(entry.status)}
                                           className="mb-1 md:mb-0">{entry.status}</Badge>
                                    {entry.statusReason && (
                                        <span
                                            className="text-sm text-light-error dark:text-dark-error ml-2 mt-1 md:mt-0">({entry.statusReason})</span>
                                    )}
                                </div>
                            </div>
                            <div
                                className="flex flex-wrap gap-2 md:flex-none mt-4 md:mt-0">
                                <Button
                                    onClick={() => handleViewDetails(entry)}
                                    variant="primary"
                                    size="small"
                                >
                                    View
                                </Button>
                                <Button
                                    onClick={() => alert(`Downloading: ${entry.id}`)}
                                    variant="secondary"
                                    size="small"
                                >
                                    Download
                                </Button>
                                <Button
                                    onClick={() => {
                                        if (window.confirm('Are you sure you want to delete this entry?')) alert(`Deleting: ${entry.id}`)
                                    }}
                                    variant="danger"
                                    size="small"
                                >
                                    Delete
                                </Button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-light-muted dark:text-dark-muted py-10">
                        <p className="text-lg">No history entries found matching your criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HistoryPage;