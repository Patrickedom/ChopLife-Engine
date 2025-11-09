import React from 'react';

const SendIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path d="M3.105 3.105a.75.75 0 01.814-.102l14.25 5.25a.75.75 0 010 1.392l-14.25 5.25a.75.75 0 01-.916-.986L5.08 10 3.007 4.09A.75.75 0 013.105 3.105z" />
    </svg>
);


interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ query, setQuery, onSearch, isLoading }) => {
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };
  
  return (
    <form onSubmit={handleFormSubmit} className="relative w-full max-w-4xl">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask me anything about making money online..."
        className="w-full pl-5 pr-28 py-4 text-base bg-white border border-slate-300 rounded-lg shadow-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-shadow duration-200 placeholder:text-slate-400"
        disabled={isLoading}
        aria-label="Ask a question about making money"
      />
      <button
        type="submit"
        disabled={isLoading || !query}
        className="absolute inset-y-0 right-0 flex items-center justify-center w-24 m-1.5 font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-slate-400 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
        aria-label={isLoading ? "Sending message" : "Send message"}
      >
        {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true"></div>
        ) : (
            <SendIcon className="h-5 w-5" aria-hidden="true" />
        )}
      </button>
    </form>
  );
};