import React, { useState, useEffect } from 'react';
import { Play, Pause, ChevronRight, ChevronLeft } from 'lucide-react';

// --- Authentic Google Material Icons (SVGs) for UI ---
const MaterialChat = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
  </svg>
);
const MaterialVoice = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5-3c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
  </svg>
);
const MaterialVideo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
  </svg>
);
const MaterialTablet = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 16h-2v-2h2v2zm5-4H7V7h10v8z"/>
  </svg>
);
const MaterialLaptop = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-11 h-11">
    <path d="M20 18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z"/>
  </svg>
);
const MaterialAutoAwesome = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19 4.25L17.75 7L15 8.25L17.75 9.5L19 12.25L20.25 9.5L23 8.25L20.25 7L19 4.25ZM10.5 5L8 10.5L2.5 13L8 15.5L10.5 21L13 15.5L18.5 13L13 10.5L10.5 5Z"/>
  </svg>
);

// --- Real Azure & .NET SVG Icons ---
const AzureAPIMIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M 40 72 C 20 72 15 50 25 38 C 30 25 50 25 58 35 C 70 28 85 35 85 50 C 85 62 75 72 65 72" stroke="#00BFFF" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <circle cx="52" cy="72" r="11" fill="#A855F7" />
    <path d="M 38 72 Q 45 74 52 72" stroke="#00BFFF" strokeWidth="8" strokeLinecap="round" fill="none"/>
  </svg>
);
const FoundryIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 10 Q50 50 90 50 Q50 50 50 90 Q50 50 10 50 Q50 50 50 10 Z" fill="url(#sparkGrad)"/>
    <path d="M75 20 Q75 35 90 35 Q75 35 75 50 Q75 35 60 35 Q75 35 75 20 Z" fill="#50E6FF"/>
    <path d="M25 65 Q25 80 40 80 Q25 80 25 95 Q25 80 10 80 Q25 80 25 65 Z" fill="#A855F7"/>
    <defs>
      <linearGradient id="sparkGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#0078D4" />
        <stop offset="50%" stopColor="#A855F7" />
        <stop offset="100%" stopColor="#50E6FF" />
      </linearGradient>
    </defs>
  </svg>
);
const DotNetIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="20" fill="#512BD4"/>
    <text x="50" y="66" fill="white" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="34" textAnchor="middle">.NET</text>
  </svg>
);
const AKSIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
     <path d="M50 5 L88 27 L88 73 L50 95 L12 73 L12 27 Z" fill="#0078D4"/>
     <polygon points="50,22 72,32 78,55 62,78 38,78 22,55 28,32" fill="none" stroke="white" strokeWidth="4" strokeLinejoin="round"/>
     <circle cx="50" cy="50" r="10" fill="none" stroke="white" strokeWidth="4"/>
     <line x1="50" y1="40" x2="50" y2="22" stroke="white" strokeWidth="4" strokeLinecap="round"/>
     <line x1="58" y1="44" x2="72" y2="32" stroke="white" strokeWidth="4" strokeLinecap="round"/>
     <line x1="60" y1="52" x2="78" y2="55" stroke="white" strokeWidth="4" strokeLinecap="round"/>
     <line x1="56" y1="58" x2="62" y2="78" stroke="white" strokeWidth="4" strokeLinecap="round"/>
     <line x1="44" y1="58" x2="38" y2="78" stroke="white" strokeWidth="4" strokeLinecap="round"/>
     <line x1="40" y1="52" x2="22" y2="55" stroke="white" strokeWidth="4" strokeLinecap="round"/>
     <line x1="42" y1="44" x2="28" y2="32" stroke="white" strokeWidth="4" strokeLinecap="round"/>
  </svg>
);
const AzureSearchIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="25" y="15" width="40" height="50" rx="4" fill="#50E6FF" opacity="0.9"/>
    <line x1="35" y1="25" x2="55" y2="25" stroke="#005BA1" strokeWidth="4" strokeLinecap="round"/>
    <line x1="35" y1="35" x2="55" y2="35" stroke="#005BA1" strokeWidth="4" strokeLinecap="round"/>
    <line x1="35" y1="45" x2="45" y2="45" stroke="#005BA1" strokeWidth="4" strokeLinecap="round"/>
    <circle cx="60" cy="60" r="18" stroke="#0078D4" strokeWidth="8" fill="#111827"/>
    <line x1="72" y1="72" x2="90" y2="90" stroke="#005BA1" strokeWidth="10" strokeLinecap="round"/>
    <circle cx="60" cy="60" r="8" fill="#50E6FF"/>
  </svg>
);
const AzureSQLIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Base shadow */}
    <ellipse cx="50" cy="80" rx="35" ry="14" fill="#00437A"/>
    {/* Cylinder Body */}
    <path d="M15 25 V 75 C 15 85, 85 85, 85 75 V 25 Z" fill="url(#sqlBodyGrad)"/>
    {/* Horizontal Database Bands */}
    <path d="M15 40 C 15 50, 85 50, 85 40" stroke="#00437A" strokeWidth="3" fill="none" opacity="0.6"/>
    <path d="M15 55 C 15 65, 85 65, 85 55" stroke="#00437A" strokeWidth="3" fill="none" opacity="0.6"/>
    {/* Top Ellipse */}
    <ellipse cx="50" cy="25" rx="35" ry="14" fill="url(#sqlTopGrad)"/>
    {/* Top Inner Highlight */}
    <ellipse cx="50" cy="25" rx="28" ry="10" fill="#50E6FF" opacity="0.4"/>
    <defs>
      <linearGradient id="sqlBodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#005BA1" />
        <stop offset="50%" stopColor="#0078D4" />
        <stop offset="100%" stopColor="#005BA1" />
      </linearGradient>
      <linearGradient id="sqlTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#75C1FF" />
        <stop offset="100%" stopColor="#0078D4" />
      </linearGradient>
    </defs>
  </svg>
);
const AzureStorageIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Top Face */}
    <path d="M50 15 L85 35 L50 55 L15 35 Z" fill="#7EBC4F"/>
    {/* Left Face */}
    <path d="M15 35 V 70 L50 90 V 55 Z" fill="#5E9624"/>
    {/* Right Face */}
    <path d="M85 35 V 70 L50 90 V 55 Z" fill="#4B7A1C"/>
    {/* Server bands on Left Face */}
    <path d="M15 45 L50 65" stroke="#4B7A1C" strokeWidth="2" opacity="0.5"/>
    <path d="M15 55 L50 75" stroke="#4B7A1C" strokeWidth="2" opacity="0.5"/>
    <path d="M15 65 L50 85" stroke="#4B7A1C" strokeWidth="2" opacity="0.5"/>
    {/* Server bands on Right Face */}
    <path d="M85 45 L50 65" stroke="#375E14" strokeWidth="2" opacity="0.5"/>
    <path d="M85 55 L50 75" stroke="#375E14" strokeWidth="2" opacity="0.5"/>
    <path d="M85 65 L50 85" stroke="#375E14" strokeWidth="2" opacity="0.5"/>
    {/* Glow effect on top */}
    <path d="M50 20 L75 35 L50 50 L25 35 Z" fill="#A0D873" opacity="0.4"/>
  </svg>
);


// --- Configuration & Dynamic Layout ---
const getNodes = (step) => {
  const isStart = step === 0;
  return {
    ui: { id: 'ui', title: 'User Input', subtitle: '', x: 500, y: isStart ? 450 : 200, w: 340, h: 340 },
    apim: { id: 'apim', title: 'API Management', subtitle: 'GATEWAY', x: 500, y: 550, w: 320, h: 140 },
    orch: { id: 'orch', title: 'Chat Orchestrator', subtitle: 'AKS • SESSION', x: 500, y: 750, w: 320, h: 140 },
    
    foundry: { id: 'foundry', title: 'Microsoft Foundry', subtitle: 'AI PLATFORM', x: 250, y: 950, w: 320, h: 140 },
    dotnet: { id: 'dotnet', title: '.NET + LLM', subtitle: 'INTELLIGENT LOGIC', x: 750, y: 950, w: 320, h: 140 },
    
    search: { id: 'search', title: 'Azure AI Search', subtitle: 'HYBRID VECTORS', x: 250, y: 1150, w: 320, h: 140 },
    sql: { id: 'sql', title: 'Azure SQL Database', subtitle: 'OPERATIONAL DATA', x: 750, y: 1150, w: 320, h: 140 },

    storage: { id: 'storage', title: 'Azure Storage Account', subtitle: 'BLOBS & DOCUMENTS', x: 250, y: 1350, w: 320, h: 140 }
  };
};

const PATHS = [
  { id: 'ui-apim', start: 'ui', end: 'apim', color: '#8ab4f8' },
  { id: 'apim-orch', start: 'apim', end: 'orch', color: '#c58af9' },
  { id: 'orch-foundry', start: 'orch', end: 'foundry', color: '#81c995' },
  { id: 'orch-dotnet', start: 'orch', end: 'dotnet', color: '#fde293' },
  { id: 'foundry-search', start: 'foundry', end: 'search', color: '#81c995' },
  { id: 'search-storage', start: 'search', end: 'storage', color: '#81c995' },
  { id: 'dotnet-sql', start: 'dotnet', end: 'sql', color: '#fde293' }
];

const NODE_COLORS = {
  foundry: '#81c995', orch: '#c58af9', dotnet: '#fde293',
  search: '#81c995', apim: '#8ab4f8', storage: '#81c995', sql: '#fde293'
};

const STORY_STEPS = [
  { id: 0, title: "Awaiting Interaction", description: "The system is idle, awaiting user interaction. Users can seamlessly engage through Chat, Voice, or Video across both iPad and Web platforms.", visibleNodes: ['ui'], activeNodes: ['ui'], activePaths: [] },
  { id: 1, title: "1. The User Request", description: "A user submits a query via iPad or Web. The request securely flows into Azure API Management.", visibleNodes: ['ui', 'apim'], activeNodes: ['apim'], activePaths: ['ui-apim'] },
  { id: 2, title: "2. Chat Orchestrator", description: "API Management securely routes the authenticated request to our Chat Orchestrator running on Azure Kubernetes Service (AKS).", visibleNodes: ['ui', 'apim', 'orch'], activeNodes: ['orch'], activePaths: ['apim-orch'] },
  { id: 3, title: "3. Parallel Routing", description: "The Orchestrator intelligently splits the request: sending it to Microsoft Foundry for AI grounding, and to .NET + LLM for tool processing.", visibleNodes: ['ui', 'apim', 'orch', 'foundry', 'dotnet'], activeNodes: ['foundry', 'dotnet'], activePaths: ['orch-foundry', 'orch-dotnet'] },
  { id: 4, title: "4a. Microsoft Foundry", description: "Microsoft Foundry takes the lead on context generation, invoking Azure AI Search to find relevant enterprise data.", visibleNodes: ['ui', 'apim', 'orch', 'foundry', 'dotnet', 'search'], activeNodes: ['search'], activePaths: ['foundry-search'] },
  { id: 5, title: "5a. Storage Retrieval", description: "Azure AI Search queries the Azure Storage Account to retrieve document text, images, and embedded blobs for grounding.", visibleNodes: ['ui', 'apim', 'orch', 'foundry', 'dotnet', 'search', 'storage'], activeNodes: ['storage'], activePaths: ['search-storage'] },
  { id: 6, title: "4b/5b. .NET & Live SQL", description: "Simultaneously, the .NET + LLM node executes operational logic, securely fetching and receiving live business data from Azure SQL Databases.", visibleNodes: ['ui', 'apim', 'orch', 'foundry', 'dotnet', 'search', 'storage', 'sql'], activeNodes: ['sql'], activePaths: ['dotnet-sql'] },
  { id: 7, title: "End-to-End Success", description: "Synthesized data from both Azure Storage and SQL Databases is combined to deliver an instant, highly-accurate response back to the user.", visibleNodes: ['ui', 'apim', 'orch', 'foundry', 'dotnet', 'search', 'storage', 'sql'], activeNodes: ['ui', 'apim', 'orch', 'foundry', 'dotnet', 'search', 'storage', 'sql'], activePaths: ['ui-apim', 'apim-orch', 'orch-foundry', 'orch-dotnet', 'foundry-search', 'search-storage', 'dotnet-sql'] }
];

// --- Custom CSS for Orbits & Flows ---
const customStyles = `
  @keyframes flow { to { stroke-dashoffset: -12; } }
  .animate-flow { animation: flow 0.6s linear infinite; }
  
  /* Modal Orbits */
  @keyframes orbit-chat { 0% { transform: rotate(0deg) translateX(130px) rotate(0deg); } 100% { transform: rotate(360deg) translateX(130px) rotate(-360deg); } }
  @keyframes orbit-voice { 0% { transform: rotate(120deg) translateX(130px) rotate(-120deg); } 100% { transform: rotate(480deg) translateX(130px) rotate(-480deg); } }
  @keyframes orbit-video { 0% { transform: rotate(240deg) translateX(130px) rotate(-240deg); } 100% { transform: rotate(600deg) translateX(130px) rotate(-600deg); } }
  .animate-orbit-chat { animation: orbit-chat 16s linear infinite; }
  .animate-orbit-voice { animation: orbit-voice 16s linear infinite; }
  .animate-orbit-video { animation: orbit-video 16s linear infinite; }
  
  /* Generic Node Orbits */
  @keyframes orbit-node { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
  .animate-orbit-node { animation: orbit-node 3s linear infinite; }
`;

// --- UI Components ---

const DiagramNode = ({ node, isVisible, isActive }) => {
  // Massive Center Node (UI)
  if (node.id === 'ui') {
    return (
      <div 
        className={`absolute flex items-center justify-center rounded-full transition-all duration-1000 ease-in-out z-20
          ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'}
          ${isActive ? 'bg-[#292a2d] shadow-[0_0_50px_rgba(138,180,248,0.15)]' : 'bg-[#202124]'}
        `}
        style={{ width: node.w, height: node.h, left: node.x - node.w / 2, top: node.y - node.h / 2, border: isActive ? '2px solid rgba(138,180,248,0.4)' : '2px solid #3c4043' }}
      >
        <div className="absolute -top-5 bg-[#202124] px-5 py-1.5 text-[11px] text-[#8ab4f8] font-bold tracking-widest uppercase rounded-full border border-[#3c4043] shadow-lg">
          Interaction Modalities
        </div>
        <div className="absolute inset-0 rounded-full border border-[#e8eaed]/5 m-[3rem] pointer-events-none"></div>

        <div className="relative z-10 flex gap-5 items-center justify-center bg-[#202124] border border-[#3c4043] p-7 rounded-3xl shadow-2xl">
          <div className="flex flex-col items-center gap-2">
            <div className="text-[#e8eaed]"><MaterialTablet /></div>
            <span className="text-[10px] text-[#9aa0a6] font-bold uppercase tracking-widest">iPad</span>
          </div>
          <div className="w-px h-12 bg-[#3c4043]"></div>
          <div className="flex flex-col items-center gap-2">
            <div className="text-[#e8eaed]"><MaterialLaptop /></div>
            <span className="text-[10px] text-[#9aa0a6] font-bold uppercase tracking-widest">Web</span>
          </div>
        </div>

        <div className="absolute top-1/2 left-1/2 w-0 h-0">
          <div className="absolute top-[-24px] left-[-24px] w-12 h-12 rounded-full bg-[#4285F4] flex items-center justify-center text-white shadow-[0_4px_15px_rgba(66,133,244,0.5)] animate-orbit-chat border border-white/20"><MaterialChat /></div>
          <div className="absolute top-[-24px] left-[-24px] w-12 h-12 rounded-full bg-[#EA4335] flex items-center justify-center text-white shadow-[0_4px_15px_rgba(234,67,53,0.5)] animate-orbit-voice border border-white/20"><MaterialVoice /></div>
          <div className="absolute top-[-24px] left-[-24px] w-12 h-12 rounded-full bg-[#34A853] flex items-center justify-center text-white shadow-[0_4px_15px_rgba(52,168,83,0.5)] animate-orbit-video border border-white/20"><MaterialVideo /></div>
        </div>
      </div>
    );
  }

  // Derived styling for architecture nodes
  const activeColor = NODE_COLORS[node.id] || '#8ab4f8';
  
  const getIcon = () => {
    const iconClass = `w-10 h-10 transition-all duration-500 ${isActive ? 'scale-110 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]' : 'opacity-60 grayscale-[50%]'}`;
    switch(node.id) {
      case 'apim': return <AzureAPIMIcon className={iconClass} />;
      case 'orch': return <div className="flex gap-1"><DotNetIcon className="w-8 h-8"/><AKSIcon className="w-8 h-8"/></div>;
      case 'foundry': return <FoundryIcon className={iconClass} />;
      case 'dotnet': return (
        <div className={`flex gap-1 items-center justify-center transition-all duration-500 ${isActive ? 'scale-110 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]' : 'opacity-60 grayscale-[50%]'}`}>
          <DotNetIcon className="w-9 h-9" />
          <MaterialAutoAwesome className="w-6 h-6 text-[#fde293]" />
        </div>
      );
      case 'search': return <AzureSearchIcon className={iconClass} />;
      case 'sql': return <AzureSQLIcon className={iconClass} />;
      case 'storage': return <AzureStorageIcon className={iconClass} />;
      default: return null;
    }
  };

  return (
    <div 
      className={`absolute flex flex-col items-center justify-center border rounded-[2rem] transition-all duration-700 ease-in-out backdrop-blur-md z-10 shadow-xl
        ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
        ${isActive ? 'bg-[#292a2d]' : 'bg-[#202124] border-[#3c4043]'}
      `}
      style={{ 
        width: node.w, height: node.h, 
        left: node.x - node.w / 2, top: node.y - node.h / 2,
        borderColor: isActive ? `${activeColor}60` : '#3c4043',
        boxShadow: isActive ? `0 0 40px ${activeColor}25` : 'none'
      }}
    >
      <div className="relative w-16 h-16 rounded-full flex items-center justify-center mb-3">
        {/* Rings & Orbits */}
        <div className="absolute inset-0 rounded-full border border-gray-600/30"></div>
        <div className={`absolute -inset-3 rounded-full border transition-colors duration-500`} style={{ borderColor: isActive ? `${activeColor}40` : 'transparent' }}></div>
        {isActive && (
          <div className="absolute -inset-3 rounded-full animate-orbit-node">
            <div 
              className="w-2 h-2 rounded-full absolute -top-1 left-1/2 -translate-x-1/2"
              style={{ backgroundColor: activeColor, boxShadow: `0 0 10px ${activeColor}` }}
            ></div>
          </div>
        )}
        {/* Center SVG Content */}
        <div className="z-10 flex items-center justify-center">
          {getIcon()}
        </div>
      </div>

      <h3 className="text-[#e8eaed] font-bold text-[14px] tracking-wide text-center px-2">{node.title}</h3>
      <p className="text-[#9aa0a6] text-[9px] tracking-[0.2em] font-semibold uppercase mt-1">
        {node.subtitle}
      </p>
    </div>
  );
};

const FlowLine = ({ path, nodes, isRevealed, isActive }) => {
  const startNode = nodes[path.start];
  const endNode = nodes[path.end];

  return (
    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
      {/* Base dim path */}
      <path 
        d={`M ${startNode.x} ${startNode.y} L ${endNode.x} ${endNode.y}`} 
        stroke="#3c4043" 
        strokeWidth="2" 
        strokeDasharray="6 6" 
        fill="none"
        className={`transition-all duration-1000 ${isRevealed ? 'opacity-100' : 'opacity-0'}`} 
      />
      {/* Bright active path */}
      <path 
        d={`M ${startNode.x} ${startNode.y} L ${endNode.x} ${endNode.y}`} 
        stroke={path.color} 
        strokeWidth="3" 
        strokeDasharray="6 6" 
        fill="none"
        className={`transition-all duration-500 animate-flow ${isActive ? 'opacity-100' : 'opacity-0'}`} 
      />
    </svg>
  );
};

// --- Main Application ---
export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const dashboardHref = import.meta.env.PROD ? "../../../index.html" : "/index.html";

  const stepData = STORY_STEPS[currentStep];
  const currentNodes = getNodes(currentStep);

  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setTimeout(() => {
        if (currentStep < STORY_STEPS.length - 1) {
          setCurrentStep(prev => prev + 1);
        } else {
          setIsPlaying(false);
        }
      }, 4500); 
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep]);

  const revealedPaths = new Set();
  for (let i = 0; i <= currentStep; i++) {
    STORY_STEPS[i].activePaths.forEach(p => revealedPaths.add(p));
  }

  return (
    <div className="min-h-screen bg-[#171717] text-gray-100 font-sans flex flex-col overflow-hidden selection:bg-[#8ab4f8]/30">
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      
      {/* Header & Embedded Narrative */}
      <header className="flex-none p-4 lg:p-6 border-b border-[#3c4043] bg-[#202124] flex flex-col lg:flex-row items-stretch lg:items-start gap-4 lg:gap-6 z-30 shadow-md">
        <div className="w-full lg:flex-1 lg:min-w-0 bg-[#171717] rounded-xl border border-[#3c4043] p-4 md:px-6 shadow-inner flex flex-col justify-center">
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
            <div className="flex items-center gap-2 shrink-0">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#8ab4f8]/10 border border-[#8ab4f8]/30 text-[#8ab4f8] text-xs font-semibold">
                {currentStep}
              </span>
              <span className="uppercase tracking-wider text-xs text-[#8ab4f8] font-semibold">Sequence Step</span>
            </div>
            <div className="hidden md:block w-px h-5 bg-[#3c4043]"></div>
            <h2 className="text-lg font-bold text-[#e8eaed] leading-tight">
              {stepData.title}
            </h2>
          </div>
          
          <p className="text-sm text-[#9aa0a6] mb-3 line-clamp-2 md:line-clamp-none">
            {stepData.description}
          </p>

          <div className="flex gap-1.5 w-full mt-auto">
            {STORY_STEPS.map((step, idx) => (
              <div 
                key={step.id} 
                className={`h-1.5 flex-grow rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentStep ? 'bg-[#8ab4f8]' : idx < currentStep ? 'bg-[#8ab4f8]/30' : 'bg-[#3c4043]'
                }`}
                onClick={() => {
                  setCurrentStep(idx);
                  setIsPlaying(false);
                }}
                title={`Go to step ${idx}: ${step.title}`}
              />
            ))}
          </div>
        </div>

        <div className="w-full lg:w-[300px] xl:w-[340px] shrink-0">
          <h1 className="text-2xl font-bold text-[#e8eaed]">
            Kinexus Assistant
          </h1>
          <p className="text-sm text-[#9aa0a6] mt-1">Orbital Design & Microsoft Integrations</p>
          <a
            className="inline-flex mt-3 px-3 py-1 rounded-lg border border-[#3c4043] text-xs text-[#8ab4f8] hover:bg-[#3c4043] transition-colors"
            href={dashboardHref}
          >
            Return to Dashboard
          </a>
        </div>
      </header>

      <main className="flex-grow relative overflow-hidden bg-[#171717]">
        {/* Interactive Diagram Area */}
        <div className="absolute inset-0 overflow-auto p-8 flex items-start justify-center pb-32">
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSwyNTUsMjU1LDI1NSwwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] z-0 min-h-[1600px] min-w-[1100px] pointer-events-none"></div>

          {/* Canvas Container */}
          <div className="relative w-[1000px] h-[1500px] shrink-0 z-10 scale-90 md:scale-100 transform origin-top transition-all">
            
            {/* Draw Path SVG Lines Behind Nodes */}
            {PATHS.map(path => (
              <FlowLine 
                key={path.id} 
                path={path} 
                nodes={currentNodes}
                isRevealed={revealedPaths.has(path.id)} 
                isActive={stepData.activePaths.includes(path.id)} 
              />
            ))}

            {/* Draw Nodes over Lines */}
            {Object.values(currentNodes).map(node => (
              <DiagramNode 
                key={node.id} 
                node={node} 
                isVisible={stepData.visibleNodes.includes(node.id)}
                isActive={stepData.activeNodes.includes(node.id)}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Floating Bottom Navigation Dock */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-[#202124]/85 backdrop-blur-xl p-3 rounded-2xl border border-[#3c4043] z-50 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <button 
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} 
          disabled={currentStep === 0}
          className="p-3 rounded-xl hover:bg-[#3c4043] disabled:opacity-30 disabled:hover:bg-transparent transition-colors text-[#e8eaed]"
        >
          <ChevronLeft size={24} />
        </button>
        
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors ${
            isPlaying ? 'bg-[#fde293]/20 text-[#fde293] border border-[#fde293]/50' : 'bg-[#8ab4f8] hover:bg-[#aecbfa] text-[#171717] shadow-lg shadow-[#8ab4f8]/20'
          }`}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          {isPlaying ? 'Pause Story' : 'Auto-Play'}
        </button>
        
        <button 
          onClick={() => setCurrentStep(Math.min(STORY_STEPS.length - 1, currentStep + 1))} 
          disabled={currentStep === STORY_STEPS.length - 1}
          className="p-3 rounded-xl hover:bg-[#3c4043] disabled:opacity-30 disabled:hover:bg-transparent transition-colors text-[#e8eaed]"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}