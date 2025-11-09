import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Message, Source } from '../types';

const UserIcon: React.FC = () => (
    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-slate-500">
            <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.095a1.23 1.23 0 00.41-1.412A9.99 9.99 0 0010 12c-2.31 0-4.438.784-6.131 2.095z" />
        </svg>
    </div>
);

const ModelIcon: React.FC = () => (
    <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0 shadow-md shadow-green-500/20">
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
            <path d="M12 2.25c-3.866 0-7 3.134-7 7 0 2.23.953 4.254 2.473 5.682A.75.75 0 017.5 15.62v.13A4.502 4.502 0 0012 20.25a4.502 4.502 0 004.5-4.5v-.13a.75.75 0 01.027-.528A6.993 6.993 0 0019 9.25c0-3.866-3.134-7-7-7zm0 1.5a5.5 5.5 0 015.5 5.5c0 1.62-.647 3.103-1.748 4.185-.145.144-.22.343-.22.548v.292a3 3 0 01-3 3 3 3 0 01-3-3v-.292c0-.205-.075-.404-.22-.548A5.484 5.484 0 016.5 9.25a5.5 5.5 0 015.5-5.5z" />
            <path d="M12 20.25a.75.75 0 01.75.75v.5a.75.75 0 01-1.5 0v-.5a.75.75 0 01.75-.75zM8.25 21a.75.75 0 01.75.75v.5a.75.75 0 01-1.5 0v-.5a.75.75 0 01.75-.75zM15 21a.75.75 0 01.75.75v.5a.75.75 0 01-1.5 0v-.5a.75.75 0 01.75-.75z" />
        </svg>
    </div>
);

const MonetizedLinkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" {...props}>
      <path d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14ZM8 3.5a.75.75 0 0 1 .75.75v1.512c.412.07.784.188 1.127.352a.75.75 0 0 1-.5 1.362A3.992 3.992 0 0 0 8.75 7.5v1.19a.75.75 0 0 1-1.5 0V8a.75.75 0 0 1 .75-.75h.313a2.494 2.494 0 0 1 0-1.5H8.75A.75.75 0 0 1 8 5V3.5ZM8.5 10.5a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-1.5 0V11a.75.75 0 0 1 .75-.75Z" />
    </svg>
);

const DownloadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
    <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
  </svg>
);


const ActionPlanBlock: React.FC<{ planText: string }> = ({ planText }) => {
    const handleDownload = () => {
        const blob = new Blob([planText], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'mini-action-plan.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="my-4 bg-green-50 border border-green-200 rounded-lg shadow-sm">
            <div className="px-4 py-3 border-b border-green-200">
                <h4 className="text-base font-semibold text-green-800">Mini Action Plan</h4>
            </div>
            <div className="p-4">
                <div className="prose prose-sm prose-slate max-w-none break-all">
                    <ReactMarkdown>{planText}</ReactMarkdown>
                </div>
            </div>
            <div className="px-4 py-3 bg-green-50/50 border-t border-green-200 rounded-b-lg">
                <button 
                    onClick={handleDownload}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                >
                    <DownloadIcon className="w-5 h-5" />
                    Download Plan
                </button>
            </div>
        </div>
    );
};

const SourceLink: React.FC<{ source: Source; index: number }> = ({ source, index }) => (
    <a 
        href={source.uri} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-xs bg-slate-100 text-slate-600 hover:bg-green-100 hover:text-green-800 rounded-md px-2.5 py-1.5 transition-all duration-200 block truncate"
        title={source.uri}
    >
        <span className="font-semibold">{index + 1}.</span> {source.title || new URL(source.uri).hostname}
    </a>
);


const ModelMessage: React.FC<{ message: Message; isLoading: boolean; onQuickActionClick: (action: string) => void; }> = ({ message, isLoading, onQuickActionClick }) => {
    const isTypingPlaceholder = isLoading && message.content === '';
    const hasFinished = !isLoading && message.content !== '';
    
    return (
        <div className="flex items-start gap-4">
            <ModelIcon />
            <div className="flex-1 pt-0.5">
                <div className="prose prose-slate max-w-none prose-p:my-2 prose-headings:my-3 text-slate-800 break-all">
                    <ReactMarkdown 
                        remarkPlugins={[remarkGfm]}
                        components={{
                            a: ({ node, ...props }) => {
                                const linkText = props.children?.[0];
                                if (typeof linkText === 'string') {
                                    const match = linkText.match(/\[MONETIZED: (.*?)\]\s*(.*)/);
                                    if (match) {
                                        const type = match[1];
                                        const cleanText = match[2];
                                        const tooltipText = `This is a${type.toLowerCase().includes('affiliate') ? 'n' : ''} ${type.toLowerCase()}. We may earn a commission if you sign up or purchase.`;
                                        return (
                                            <span className="inline-flex items-center gap-1.5">
                                                <a {...props} className="text-green-600 hover:text-green-700">{cleanText}</a>
                                                <span className="has-tooltip relative">
                                                    <MonetizedLinkIcon className="w-4 h-4 text-amber-500" />
                                                    <span className='tooltip absolute bottom-full mb-2 w-max max-w-[200px] p-2 bg-slate-800 text-white text-xs rounded-md shadow-lg opacity-0 pointer-events-none transition-opacity z-10'>
                                                        {tooltipText}
                                                    </span>
                                                </span>
                                            </span>
                                        );
                                    }
                                }
                                return <a {...props} className="text-green-600 hover:text-green-700">{props.children}</a>;
                            },
                             code({node, className, children, ...props}) {
                                const match = /language-(\w+)/.exec(className || '');
                                if (match && match[1] === 'action-plan') {
                                    return <ActionPlanBlock planText={String(children).replace(/\n$/, '')} />;
                                }
                                return <code className={`font-mono text-sm bg-slate-100 text-slate-800 rounded px-1 py-0.5 ${className}`} {...props}>{children}</code>;
                            }
                        }}
                    >
                        {message.content}
                    </ReactMarkdown>
                    {isLoading && !isTypingPlaceholder && <span className="inline-block w-2 h-4 bg-slate-600 animate-pulse ml-1" />}
                </div>
                {hasFinished && message.sources && message.sources.length > 0 && (
                    <div className="mt-4">
                        <h3 className="text-sm font-semibold text-slate-600 mb-2">Sources:</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                            {message.sources.map((source, index) => (
                                <SourceLink key={index} source={source} index={index} />
                            ))}
                        </div>
                    </div>
                )}
                 {isTypingPlaceholder && (
                    <div className="flex items-center space-x-2 mt-2">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                )}
                {hasFinished && message.quickActions && message.quickActions.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {message.quickActions.map((action, index) => (
                      <button
                        key={index}
                        onClick={() => onQuickActionClick(action)}
                        className="px-3 py-1.5 bg-slate-100 text-slate-700 text-sm font-medium rounded-full hover:bg-green-100 hover:text-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                )}
            </div>
        </div>
    );
};

const UserMessage: React.FC<{ message: Message }> = ({ message }) => (
    <div className="flex items-start gap-4">
        <UserIcon />
        <div className="flex-1 pt-1">
            <p className="font-semibold text-slate-800 break-all">{message.content}</p>
        </div>
    </div>
);

interface ChatDisplayProps {
    messages: Message[];
    isLoading: boolean;
    onQuickActionClick: (action: string) => void;
}

export const ChatDisplay: React.FC<ChatDisplayProps> = ({ messages, isLoading, onQuickActionClick }) => {
    const endOfMessagesRef = useRef<null | HTMLDivElement>(null);

    const scrollToBottom = () => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="w-full space-y-8">
            {messages.map((message, index) => {
                const isLastMessage = index === messages.length - 1;
                if (message.role === 'user') {
                    return <UserMessage key={index} message={message} />;
                }
                if (message.role === 'model') {
                    return <ModelMessage key={index} message={message} isLoading={isLastMessage && isLoading} onQuickActionClick={onQuickActionClick} />;
                }
                return null;
            })}
            <div ref={endOfMessagesRef} />
        </div>
    );
};