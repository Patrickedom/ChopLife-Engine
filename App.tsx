import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { ChatDisplay } from './components/ResultsDisplay';
import { WelcomeScreen } from './components/WelcomeScreen';
import { ErrorDisplay } from './components/ErrorDisplay';
import { UserProfile as UserProfileModal } from './components/UserProfile';
import { sendMessage } from './services/geminiService';
import type { Message, UserProfile } from './types';

const App: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile>({ name: '', location: '', skills: '', goals: '' });
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [lastFailedQuery, setLastFailedQuery] = useState<string | null>(null);

  const handleContentUpdate = useCallback((contentChunk: string) => {
    setMessages(prevMessages => {
        const lastMessage = prevMessages[prevMessages.length - 1];
        if (lastMessage && lastMessage.role === 'model') {
            const updatedLastMessage = {
                ...lastMessage,
                content: lastMessage.content + contentChunk,
            };
            return [...prevMessages.slice(0, -1), updatedLastMessage];
        }
        return prevMessages;
    });
  }, []);
  
  const handleQuickActionsUpdate = useCallback((actions: string[]) => {
    setMessages(prevMessages => {
      const lastMessage = prevMessages[prevMessages.length - 1];
      if (lastMessage && lastMessage.role === 'model') {
        const updatedLastMessage = { ...lastMessage, quickActions: actions };
        return [...prevMessages.slice(0, -1), updatedLastMessage];
      }
      return prevMessages;
    });
  }, []);

  const handleSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery || isLoading) return;

    setIsLoading(true);
    setError(null);
    setLastFailedQuery(null);

    const userMessage: Message = { role: 'user', content: searchQuery };
    const conversationHistory = [...messages, userMessage];

    const modelMessagePlaceholder: Message = { role: 'model', content: '', sources: [], quickActions: [] };
    setMessages(prev => [...prev, userMessage, modelMessagePlaceholder]);

    try {
      const { sources } = await sendMessage(conversationHistory, userProfile, handleContentUpdate, handleQuickActionsUpdate);
      setMessages(prevMessages => {
        const lastMessage = prevMessages[prevMessages.length - 1];
        if (lastMessage && lastMessage.role === 'model') {
            const updatedLastMessage = { ...lastMessage, sources };
            return [...prevMessages.slice(0, -1), updatedLastMessage];
        }
        return prevMessages;
      });
    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred. Please try again.";
      setError(errorMessage);
      setLastFailedQuery(searchQuery);
      setMessages(prevMessages => prevMessages.slice(0, -2));
    } finally {
      setIsLoading(false);
      setQuery('');
    }
  }, [isLoading, handleContentUpdate, handleQuickActionsUpdate, messages, userProfile]);
  
  const handleSaveProfile = (profile: UserProfile) => {
    setUserProfile(profile);
    setIsProfileModalOpen(false);
  };
  
  const handleRetry = useCallback(() => {
    if (lastFailedQuery) {
      handleSearch(lastFailedQuery);
    }
  }, [lastFailedQuery, handleSearch]);

  const renderContent = () => {
    if (error) {
      return <ErrorDisplay message={error} onRetry={handleRetry} />;
    }
    
    if (messages.length > 0) {
      return <ChatDisplay messages={messages} isLoading={isLoading} onQuickActionClick={(action) => handleSearch(action)} />;
    }
    
    return <WelcomeScreen onSuggestionClick={(q) => { setQuery(q); handleSearch(q); }} />;
  };

  return (
    <div className="h-screen flex flex-col antialiased">
      <Header onProfileClick={() => setIsProfileModalOpen(true)} />
      {isProfileModalOpen && (
        <UserProfileModal 
          profile={userProfile} 
          onSave={handleSaveProfile} 
          onClose={() => setIsProfileModalOpen(false)} 
        />
      )}
      <main className="flex-grow flex items-center justify-center p-2 sm:p-4">
        <div className="w-[95%] md:w-full md:max-w-4xl h-[85vh] md:h-[700px] flex flex-col bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden">
            {/* Chat Messages Area */}
            <div className="flex-grow overflow-y-auto p-4 sm:p-6 lg:p-8">
              {renderContent()}
            </div>
            
            {/* Search Bar Area */}
            <div className="flex-shrink-0 p-4 border-t border-slate-200 bg-white">
              <div className="max-w-4xl mx-auto">
                 <SearchBar
                  query={query}
                  setQuery={setQuery}
                  onSearch={handleSearch}
                  isLoading={isLoading}
                />
              </div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default App;