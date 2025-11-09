import React from 'react';

interface ErrorDisplayProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, onRetry }) => {
  return (
    <div className="bg-red-50 border border-red-200 text-red-900 p-6 rounded-xl shadow-sm max-w-2xl mx-auto" role="alert">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg className="h-6 w-6 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-5a1 1 0 102 0v-2a1 1 0 10-2 0v2zm0-4a1 1 0 00-1 1v1a1 1 0 102 0V9a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-4 flex-1">
          <h3 className="text-lg font-bold">Oops! Something went wrong.</h3>
          <p className="text-sm mt-2">{message}</p>
          <p className="text-sm mt-3 text-red-800/80">
            This could be a temporary issue with the connection or the AI service. Please check your network and try again.
          </p>
          {onRetry && (
            <div className="mt-5">
              <button
                onClick={onRetry}
                className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};