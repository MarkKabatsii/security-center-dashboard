import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import Button from '../../components/ui/Button';

interface ErrorState {
    reason?: string;
}

const ErrorBlockedPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state as ErrorState;
    const errorMessage = state?.reason || "Your request could not be processed or was blocked. Please try again or contact support if the issue persists.";

    return (
        <div
            className="flex flex-col items-center justify-center min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text p-4">
            <svg
                className="w-16 h-16 text-light-error dark:text-dark-error mb-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.332 16c-.77 1.333.192 3 1.732 3z"
                ></path>
            </svg>
            <h1 className="text-3xl font-bold text-light-error dark:text-dark-error mb-4 text-center">Request
                Blocked!</h1>
            <p className="text-lg text-light-text dark:text-dark-text mb-6 text-center max-w-xl">
                {errorMessage}
            </p>
            <div className="flex space-x-4">
                <Button onClick={() => navigate('/')} variant="primary">
                    Go to Home Page
                </Button>
                {/* Можна додати кнопку "Contact Support" */}
                <Button onClick={() => alert("Please contact support at support@example.com")} variant="secondary">
                    Contact Support
                </Button>
            </div>
        </div>
    );
};

export default ErrorBlockedPage;