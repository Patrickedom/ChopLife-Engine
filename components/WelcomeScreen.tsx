import React from 'react';

interface WelcomeScreenProps {
  onSuggestionClick: (query: string) => void;
}

const conversationStarters = [
  "Social Media Management",
  "Content Writing",
  "Graphic Design",
  "Affiliate Marketing",
  "Online Tutoring",
  "Dropshipping"
];

const WelcomeIllustration: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor: '#10b981', stopOpacity:1}} />
            <stop offset="100%" style={{stopColor: '#34d399', stopOpacity:1}} />
        </linearGradient>
    </defs>
    
    <g transform="translate(100 110)">
      <path d="M-30,-20 C-30,-40 30,-40 30,-20 L30,30 C30,50 -30,50 -30,30 Z" fill="#4B3B2B"/>
      <circle cx="0" cy="-45" r="25" fill="#1E1E1E"/>
      <circle cx="0" cy="-45" r="22" fill="#292929"/>
      <rect x="-40" y="10" width="80" height="50" rx="5" fill="#e2e8f0"/>
      <rect x="-38" y="12" width="76" height="38" rx="3" fill="url(#grad1)"/>
      <rect x="-45" y="60" width="90" height="5" rx="2" fill="#94a3b8"/>
    </g>

    <g className="animate-float-1" style={{ transformOrigin: '50% 50%' }}>
      <text x="30" y="50" fontFamily="sans-serif" fontSize="24" fill="#059669" fontWeight="bold">₦</text>
    </g>
    
    <g className="animate-float-2" style={{ transformOrigin: '50% 50%' }}>
      <path d="M160,40 C180,40 180,70 160,70 C140,70 140,40 160,40 M150,55 a3,3 0 1,0 6,0 a3,3 0 1,0 -6,0 M160,48 a3,3 0 1,0 6,0 a3,3 0 1,0 -6,0 M170,55 a3,3 0 1,0 6,0 a3,3 0 1,0 -6,0" fill="#f59e0b"/>
    </g>
    
    <g className="animate-float-3" style={{ transformOrigin: '50% 50%' }}>
      <text x="35" y="160" fontFamily="monospace" fontSize="20" fill="#3b82f6" fontWeight="bold">&lt;/&gt;</text>
    </g>
    
    <g className="animate-float-1" style={{ transformOrigin: '50% 50%', animationDirection: 'reverse' }}>
      <path d="M150,130 q0,-10 10,-10 h10 q10,0 10,10 v10 q0,10 -10,10 h-10 l-5,5 v-5 q-10,0 -10,-10 z" fill="#8b5cf6"/>
    </g>
  </svg>
);


export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onSuggestionClick }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="grid md:grid-cols-2 items-center">
        <div className="p-8 lg:p-12 order-2 md:order-1">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Your Journey to <span className="text-green-600">Financial Freedom</span> Starts Here.
          </h2>
          <p className="mt-4 text-slate-600 max-w-xl leading-relaxed">
            I'm your personal financial mentor, ready to guide you towards practical and ethical ways to earn money. Explore some ideas or tell me what you're interested in.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {conversationStarters.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => onSuggestionClick(suggestion)}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-medium rounded-full hover:bg-green-100 hover:text-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 transform hover:scale-105"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
        <div className="order-1 md:order-2 bg-green-50 p-6 flex items-center justify-center h-full min-h-[250px] md:min-h-0">
            <WelcomeIllustration className="w-full max-w-xs sm:max-w-sm h-auto" />
        </div>
      </div>
    </div>
  );
};