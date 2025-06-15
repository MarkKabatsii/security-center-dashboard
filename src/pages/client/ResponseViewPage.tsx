// src/pages/client/ResponseViewPage.tsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom'; // Додано useParams
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import mockHistoryData, { type HistoryEntry } from '../../data/historyData'; // Імпортуємо мокові дані історії

// Тип для стану, який може бути переданий через useLocation
interface LocationState {
    originalPrompt?: string;
    aiResponse?: string;
    modelUsed?: string;
}

const ResponseViewPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>(); // Отримуємо ID з URL-параметрів
    const [displayData, setDisplayData] = useState<HistoryEntry | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadResponseData = () => {
            setIsLoading(true);
            setError(null);

            // Спроба отримати дані зі стану (для нових запитів)
            const state = location.state as LocationState;
            if (state?.originalPrompt && state?.aiResponse) {
                // Якщо дані є в стані, використовуємо їх
                setDisplayData({
                    id: 'new-response', // Для нових відповідей ID може бути тимчасовим
                    timestamp: new Date().toISOString(),
                    type: 'New Prompt', // Або можна вивести 'Dynamic'
                    promptSummary: state.originalPrompt.substring(0, 50) + '...', // Короткий опис
                    originalPrompt: state.originalPrompt,
                    aiResponse: state.aiResponse,
                    modelUsed: state.modelUsed || 'Unknown Model',
                    status: 'Success', // Припускаємо успіх, якщо є відповідь
                });
                setIsLoading(false);
                return;
            }

            // Якщо ID є в URL (для записів історії)
            if (id) {
                // В реальному проекті тут буде API-запит
                const foundEntry = mockHistoryData.find(entry => entry.id === id);
                if (foundEntry) {
                    setDisplayData(foundEntry);
                } else {
                    setError('Response not found.');
                }
                setIsLoading(false);
                return;
            }

            // Якщо ні state, ні ID не були надані
            setError('No response data or ID provided.');
            setIsLoading(false);
        };

        loadResponseData();
    }, [location.state, id]); // Залежність від state та ID для перезавантаження

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text p-4">
                <p className="text-xl">Loading response...</p>
            </div>
        );
    }

    if (error || !displayData) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text p-4">
                <h1 className="text-2xl font-bold mb-4">Error</h1>
                <p className="mb-6 text-center">{error || "Something went wrong. Please try again."}</p>
                <Button onClick={() => navigate('/')} variant="primary">
                    Go to Home Page
                </Button>
            </div>
        );
    }

    // Якщо все добре, відображаємо дані
    const { originalPrompt, aiResponse, modelUsed, status, statusReason, type, timestamp } = displayData;

    const getStatusBadgeVariant = (s: HistoryEntry['status']) => {
        switch (s) {
            case 'Success': return 'success';
            case 'Failed': return 'danger';
            case 'Blocked': return 'warning';
            default: return 'default';
        }
    };

    const formatTimestamp = (isoString: string) => {
        const date = new Date(isoString);
        return date.toLocaleString();
    };

    return (
        <div className="flex flex-col space-y-8 bg-light-bg dark:bg-dark-bg p-4 md:p-8">
            <h1 className="text-3xl font-bold text-light-text dark:text-dark-text mb-6">AI Response</h1>

            {/* Додаткова інформація про запис історії */}
            {id && ( // Показуємо цей блок тільки якщо це запис з історії (тобто є ID)
                <div className="bg-light-surface dark:bg-dark-surface p-4 rounded-lg shadow-md border border-light-border dark:border-dark-border text-sm flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div className="mb-2 sm:mb-0">
                        <span className="font-semibold text-light-text dark:text-dark-text mr-2">Type:</span>
                        <Badge variant="default" className="capitalize">{type}</Badge>
                        <span className="font-semibold text-light-text dark:text-dark-text ml-4 mr-2">Status:</span>
                        <Badge variant={getStatusBadgeVariant(status)}>{status}</Badge>
                        {statusReason && (
                            <span className="text-sm text-light-error dark:text-dark-error ml-2">({statusReason})</span>
                        )}
                    </div>
                    <div className="text-light-muted dark:text-dark-muted">
                        <span className="font-semibold text-light-text dark:text-dark-text mr-2">Date:</span>
                        {formatTimestamp(timestamp)}
                    </div>
                </div>
            )}

            {/* Блок Original Prompt */}
            <div className="bg-light-surface dark:bg-dark-surface p-6 rounded-lg shadow-md border border-light-border dark:border-dark-border">
                <h2 className="text-xl font-semibold text-light-text dark:text-dark-text mb-4">Original Prompt</h2>
                <div className="bg-light-bg dark:bg-dark-bg p-4 rounded-md border border-light-border dark:border-dark-border text-light-text dark:text-dark-text whitespace-pre-wrap">
                    {originalPrompt}
                </div>
            </div>

            {/* Блок AI Response */}
            <div className="bg-light-surface dark:bg-dark-surface p-6 rounded-lg shadow-md border border-light-border dark:border-dark-border">
                <h2 className="text-xl font-semibold text-light-text dark:text-dark-text mb-4">AI Response</h2>
                <div className="bg-light-bg dark:bg-dark-bg p-4 rounded-md border border-light-border dark:border-dark-border text-light-text dark:text-dark-text whitespace-pre-wrap">
                    {aiResponse}
                </div>
                <div className="mt-4 flex items-center text-sm">
                    <span className="text-light-muted dark:text-dark-muted mr-2">Model Used:</span>
                    <Badge variant="primary">{modelUsed}</Badge>
                </div>
            </div>

            {/* Кнопки дій */}
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-end mt-4">
                {/* Кнопка "Save to History" має сенс лише для нових відповідей */}
                {!id && (
                    <Button
                        onClick={() => alert('This response has been saved to history!') /* simulate save */}
                        variant="secondary"
                        size="medium"
                    >
                        Save to History
                    </Button>
                )}
                <Button
                    onClick={() => navigate('/')}
                    variant="primary"
                    size="medium"
                >
                    Send New Prompt
                </Button>
            </div>
        </div>
    );
};

export default ResponseViewPage;