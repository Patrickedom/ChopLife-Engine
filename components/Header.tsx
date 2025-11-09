import React from 'react';

const LightbulbIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 2.25c-3.866 0-7 3.134-7 7 0 2.23.953 4.254 2.473 5.682A.75.75 0 017.5 15.62v.13A4.502 4.502 0 0012 20.25a4.502 4.502 0 004.5-4.5v-.13a.75.75 0 01.027-.528A6.993 6.993 0 0019 9.25c0-3.866-3.134-7-7-7zm0 1.5a5.5 5.5 0 015.5 5.5c0 1.62-.647 3.103-1.748 4.185-.145.144-.22.343-.22.548v.292a3 3 0 01-3 3 3 3 0 01-3-3v-.292c0-.205-.075-.404-.22-.548A5.484 5.484 0 016.5 9.25a5.5 5.5 0 015.5-5.5z" />
        <path d="M12 20.25a.75.75 0 01.75.75v.5a.75.75 0 01-1.5 0v-.5a.75.75 0 01.75-.75zM8.25 21a.75.75 0 01.75.75v.5a.75.75 0 01-1.5 0v-.5a.75.75 0 01.75-.75zM15 21a.75.75 0 01.75.75v.5a.75.75 0 01-1.5 0v-.5a.75.75 0 01.75-.75z" />
    </svg>
);

const UserCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
  </svg>
);


interface HeaderProps {
    onProfileClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onProfileClick }) => {
    return (
        <header className="bg-slate-50/80 backdrop-blur-sm sticky top-0 z-10 border-b border-slate-200/60">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-3">
                        <div className="bg-green-600 p-2 rounded-lg shadow-md shadow-green-500/20">
                            <LightbulbIcon className="h-6 w-6 text-white" />
                        </div>
                        <h1 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">ChopLife Engine</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-xs font-semibold text-green-700 bg-green-100 px-3 py-1 rounded-full hidden sm:inline-block">Powered by Gemini</span>
                        <button onClick={onProfileClick} className="text-slate-500 hover:text-green-600 transition-colors" aria-label="Open user profile">
                            <UserCircleIcon className="w-7 h-7" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
