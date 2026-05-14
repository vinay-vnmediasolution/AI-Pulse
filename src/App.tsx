import { Zap, FlaskConical, Bookmark, Network, Search, UserCircle, Share2, BookmarkPlus, Bolt, Clock, ArrowRight, Verified, LayoutGrid, BrainCircuit, Layers, Gauge, Lock, CheckCircle2, ChevronRight, Trophy, Download, Loader2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { fetchLiveNews, fetchIntelligenceHub, fetchLabs, analyzePulse, fetchDailyBriefing, NewsItem, IntelligenceHubItem, LabItem, DailyBriefing } from './services/geminiService';

// --- Types ---
type Screen = 'pulse' | 'lab' | 'saved' | 'sources' | 'achievement' | 'briefing';

// --- Components ---

const NavBar = ({ activeScreen, setScreen }: { activeScreen: Screen, setScreen: (s: Screen) => void }) => {
  const items = [
    { id: 'pulse', icon: Zap, label: 'Pulse' },
    { id: 'briefing', icon: LayoutGrid, label: 'Briefing' },
    { id: 'lab', icon: FlaskConical, label: 'Lab' },
    { id: 'saved', icon: Bookmark, label: 'Saved' },
    { id: 'sources', icon: Network, label: 'Sources' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full h-20 bg-[#0a0f1e]/90 backdrop-blur-2xl border-t border-cyan-900/30 flex justify-around items-center px-4 pb-2 z-50 rounded-t-2xl shadow-[0_-4px_24px_rgba(0,0,0,0.6)]">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => setScreen(item.id as Screen)}
          className={`flex flex-col items-center justify-center transition-all duration-200 active:scale-90 ${
            activeScreen === item.id ? 'text-primary-container drop-shadow-[0_0_12px_rgba(6,182,212,0.6)]' : 'text-slate-500 opacity-60 hover:opacity-100 hover:text-cyan-400'
          }`}
        >
          <item.icon className="w-5 h-5 mb-1" fill={activeScreen === item.id ? 'currentColor' : 'none'} />
          <span className="text-[9px] font-bold uppercase tracking-[0.15em]">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

const Header = ({ setScreen }: { setScreen: (s: Screen) => void }) => (
  <header className="fixed top-0 left-0 w-full h-16 bg-[#0a0f1e]/80 backdrop-blur-xl border-b border-cyan-900/40 flex justify-between items-center px-6 z-50 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
    <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setScreen('pulse')}>
      <div className="w-8 h-8 rounded bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.4)] group-hover:scale-110 transition-transform">
        <Zap className="w-5 h-5 text-white" fill="currentColor" />
      </div>
      <h1 className="font-display text-lg font-black tracking-[0.1em] text-cyan-50 group-hover:text-primary-container transition-colors uppercase">AI PULSE</h1>
    </div>
    <div className="flex items-center gap-6">
      <div className="hidden md:flex gap-6 text-[10px] font-bold tracking-widest text-slate-500 uppercase">
        <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span> SYNC</div>
        <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> SECURE</div>
      </div>
      <div className="flex items-center gap-4 border-l border-white/10 pl-6">
        <button className="text-slate-400 hover:text-cyan-400 transition-colors">
          <Search className="w-5 h-5" />
        </button>
        <button className="text-slate-400 hover:text-cyan-400 transition-colors" onClick={() => setScreen('achievement')}>
          <UserCircle className="w-6 h-6" />
        </button>
      </div>
    </div>
  </header>
);

// --- Screen Components ---

const BriefingScreen = ({ briefing, loading }: { briefing: DailyBriefing | null, loading: boolean }) => {
  if (loading || !briefing) {
    return (
      <div className="flex flex-col items-center justify-center py-40 space-y-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="w-16 h-16 text-cyan-400" />
        </motion.div>
        <div className="text-center space-y-2">
          <p className="text-cyan-400 text-xs font-black uppercase tracking-[0.4em] animate-pulse">Tuning to Frontier Signals</p>
          <p className="text-slate-600 text-[10px] font-mono italic">Scanning 14 high-density social and research streams...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f2f2ef] text-[#1a1a1a] p-8 md:p-16 shadow-2xl rounded-sm font-serif border border-[#d1d1cf] animate-in fade-in zoom-in-95 duration-1000 mb-20 min-h-[1000px] max-w-5xl mx-auto">
      {/* Header */}
      <div className="border-b-4 border-black pb-6 mb-10 text-center">
        <div className="flex flex-col md:flex-row items-center justify-between text-[10px] uppercase font-black tracking-widest border-b border-black/10 pb-3 mb-6">
          <span>VOL. IV - NO. 112 • SYRACUSE, NY</span>
          <span className="my-2 md:my-0">Neural Intelligence Hub</span>
          <span>{new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-serif font-black uppercase tracking-tighter leading-none mb-4 decoration-black/5 hover:decoration-black transition-all">
          The Daily Specialist
        </h1>
        <p className="text-base md:text-xl italic font-serif opacity-80 border-y border-black/10 py-4 max-w-xl mx-auto">
          "A curated neural synthesis for Vinay Tripath • High-priority operational signals and strategic intelligence leaks."
        </p>
      </div>

      {/* Top 3 Actions Banner */}
      <div className="bg-[#1a1a1a] text-[#f2f2ef] p-10 my-12 rounded-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl group-hover:bg-cyan-500/20 transition-all"></div>
        <h3 className="text-sm font-black uppercase tracking-[0.25em] mb-8 border-b border-white/20 pb-2 inline-block">
          Top 3 Actions for Vinay Today
        </h3>
        <ul className="space-y-6 font-serif italic text-2xl md:text-3xl leading-snug">
          {briefing.topActions.map((action, i) => (
            <li key={i} className="flex gap-6 items-start">
              <span className="font-black text-cyan-400 not-italic shrink-0">{i + 1}.</span>
              <span className="opacity-95">{action}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Grid Layout */}
      <div className="md:columns-2 gap-12 py-4">
        {briefing.items.map((item, i) => (
          <article key={i} className="break-inside-avoid mb-16 border-b border-black/10 pb-12 last:border-0 relative">
            <div className="flex items-center gap-3 mb-6">
              <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase text-white shadow-sm ${
                item.priority === 'High' ? 'bg-red-600' : item.priority === 'Medium' ? 'bg-amber-600' : 'bg-slate-700'
              }`}>
                {item.priority} Priority
              </span>
              <span className="text-xs font-black uppercase tracking-tight text-slate-500 border-l border-black/10 pl-3">{item.section}</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-serif font-bold leading-[1.1] mb-5 group">
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:underline decoration-1 underline-offset-4">
                {item.headline}
              </a>
            </h2>
            
            <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
                    <UserCircle className="w-4 h-4 text-white" />
                </div>
                <p className="text-[11px] font-black uppercase tracking-[0.1em] text-slate-500">{item.source}</p>
            </div>

            <div className="space-y-8 text-lg font-serif leading-relaxed text-[#1a1a1a]">
              <p className="font-bold first-letter:text-5xl first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-black">
                {item.summary}
              </p>
              
              <div className="border-t border-black/5 pt-6">
                <span className="font-black uppercase text-[11px] block mb-3 text-cyan-800 tracking-widest">Impact for Builders:</span>
                <p className="text-slate-700 opacity-90">{item.builderImpact}</p>
              </div>

              <div className="p-6 bg-black/[0.03] border-l-4 border-black/40 italic rounded-r-lg">
                <span className="font-black uppercase text-xs block mb-2 not-italic tracking-widest">Investment Signal:</span>
                <p className="opacity-85">"{item.investmentSignal}"</p>
              </div>

              <div className="pt-4">
                 <a 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:text-cyan-800 transition-colors"
                >
                  View Original Post <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="border-t-4 border-black pt-8 mt-20 text-center">
        <div className="text-[12px] font-black uppercase tracking-[0.5em] opacity-40 mb-2">
          End of Intelligence Briefing
        </div>
        <p className="text-[10px] font-serif italic text-slate-500">
          "Neural transmission terminated. Authorized access only. SYRACUSE PROTOCOL ACTIVE."
        </p>
      </div>
    </div>
  );
};

const PulseScreen = ({ news, loading, onViewArticle }: { news: NewsItem[], loading: boolean, onViewArticle: (item: any) => void }) => (
  <div className="space-y-8 animate-in fade-in duration-700">
    {/* Featured News Hero */}
    <section>
      <div 
        onClick={() => news[0] && onViewArticle(news[0])}
        className="glass-card rounded-xl overflow-hidden relative group cursor-pointer border-cyan-500/30 shadow-[0_0_30px_rgba(34,211,238,0.1)]"
      >
        <div className="aspect-video md:aspect-[21/9] relative overflow-hidden">
          <img 
            alt="Intelligence Feed" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            src={news[0]?.img || "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2000"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-transparent to-transparent opacity-80"></div>
        </div>
        <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full bg-gradient-to-t from-[#0a101d] to-transparent">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded border border-cyan-500/40 text-[9px] font-black uppercase tracking-[0.2em]">Featured Source</span>
            <span className="text-slate-500 text-[10px] font-bold tracking-widest uppercase">5 min read</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-light text-cyan-50 mb-2 leading-tight max-w-3xl tracking-tight">
            {news[0]?.title || "GPT-5 Architecture Leaked: Multi-Modal Reasoning Breakthrough"}
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl line-clamp-2 opacity-80">
            {news[0]?.desc || "OpenAI's next generation model reportedly utilizes a revolutionary 'State-Space' hybrid architecture, enabling human-like deductive logic."}
          </p>
        </div>
      </div>
    </section>

    {/* Feed Section */}
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-8 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">The Pulse Feed</h3>
          <div className="flex items-center gap-2">
            <span className="text-primary-container text-xs font-bold tracking-widest">{loading ? "SYNCING..." : "LIVE"}</span>
            <div className={`w-2 h-2 rounded-full bg-primary-container ${loading ? "animate-spin border-b-2 border-white" : "animate-pulse"}`}>
              {loading && <Loader2 className="w-2 h-2 animate-spin text-white" />}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {news.length > 0 ? news.slice(1).map((item, i) => (
            <article 
              key={i} 
              onClick={() => onViewArticle(item)}
              className="glass-card rounded-xl p-5 flex gap-6 items-start transition-all hover:bg-cyan-500/5 hover:border-cyan-500/30 group cursor-pointer border-cyan-900/20"
            >
              <div className="w-24 h-24 rounded bg-slate-900 overflow-hidden flex-shrink-0 border border-white/5">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
              </div>
              <div className="flex-grow">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-cyan-400 text-[9px] font-black uppercase tracking-[0.2em]">{item.source}</span>
                  <span className="text-slate-800 text-[10px]">|</span>
                  <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{item.time}</span>
                </div>
                <h4 className="text-lg font-light text-cyan-50 mb-2 group-hover:text-cyan-400 transition-colors leading-snug tracking-tight">{item.title}</h4>
                <p className="text-slate-400 text-sm line-clamp-2 mb-4 opacity-70 leading-relaxed font-sans">{item.desc}</p>
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 px-4 py-2 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-black uppercase tracking-[0.15em] active:scale-95 transition-all hover:bg-cyan-500/20">
                    <Bolt className="w-3.5 h-3.5" />
                    Insight
                  </button>
                  <BookmarkPlus className="w-5 h-5 text-slate-600 hover:text-cyan-400 transition-colors" />
                  <Share2 className="w-5 h-5 text-slate-600 hover:text-cyan-400 transition-colors" />
                </div>
              </div>
            </article>
          )) : (
            [1, 2, 3].map((i) => (
              <div key={i} className="h-40 glass-card rounded-xl animate-pulse bg-white/5 border border-cyan-900/10" />
            ))
          )}
        </div>
      </div>

      <aside className="hidden lg:block lg:col-span-4 sticky top-24 space-y-6">
        <div className="bg-black/40 border border-cyan-900/40 rounded-xl p-6 shadow-xl">
          <h5 className="text-[9px] font-bold text-cyan-400 uppercase tracking-[0.2em] mb-5">Network Velocity</h5>
          <ul className="space-y-4">
            {[
              { tag: '#NvidiaH200', growth: '+42%', icon: Gauge },
              { tag: '#LLMReasoning', growth: '+18%', icon: BrainCircuit },
              { tag: '#AIRegulation', growth: '-4%', negative: true, icon: Lock },
              { tag: '#RoboticsGenAI', growth: '+124%', icon: Zap }
            ].map((trend, i) => (
              <li key={i} className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-3">
                  <trend.icon className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                  <span className="text-[11px] font-medium text-slate-300 group-hover:text-cyan-50 transition-colors">{trend.tag}</span>
                </div>
                <span className={`text-[10px] font-mono font-bold ${trend.negative ? 'text-slate-600' : 'text-cyan-400'}`}>{trend.growth}</span>
              </li>
            ))}
          </ul>
          <button className="w-full mt-6 py-2 bg-slate-900/40 hover:bg-slate-900/60 border border-white/5 rounded text-[9px] font-bold text-slate-500 uppercase tracking-widest transition-all">Expand Stream</button>
        </div>

        <div className="bg-[#0a101d] border border-cyan-900/30 rounded-xl p-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-3xl"></div>
          <h5 className="text-[9px] font-bold text-cyan-500 uppercase tracking-[0.2em] mb-4">Neural Stability</h5>
          <div className="flex items-end gap-1 mb-2">
            <span className="text-4xl font-light text-cyan-50 leading-none tracking-tighter">98.4</span>
            <span className="text-sm font-bold text-cyan-500 mb-1 tracking-widest">%</span>
          </div>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-6 opacity-60">High signal environment</p>
          <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: '98.4%' }} className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 shadow-[0_0_10px_#06b6d4]" />
          </div>
        </div>
      </aside>
    </section>
  </div>
);

const ConceptTester = ({ module }: { module: LabItem }) => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<any>(null);
  const [testing, setTesting] = useState(false);

  const handleTest = () => {
    setTesting(true);
    setTimeout(() => {
      setResult({
        tokens: input.length * 1.4,
        confidence: 0.85 + Math.random() * 0.1,
        latency: 45 + Math.random() * 100,
        logicPath: [
          "Tokenization Matrix",
          "Semantic Encoding",
          module.type.includes("Workflow") ? "DAG Execution" : "Vector Mapping",
          "Inference Synthesis"
        ]
      });
      setTesting(false);
    }, 1500);
  };

  return (
    <div className="glass-card p-6 rounded-xl border-cyan-500/20 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Neural Input Playground</h4>
        <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="text-[9px] font-bold text-slate-500 uppercase">Live Ready</span>
        </div>
      </div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a concept, prompt, or architectural thought..."
        className="w-full h-24 bg-black/40 border border-cyan-900/40 rounded-lg p-4 text-sm text-cyan-50 focus:border-cyan-400/60 outline-none transition-all placeholder:text-slate-700 font-mono"
      />
      <button 
        onClick={handleTest}
        disabled={!input || testing}
        className="w-full py-3 bg-cyan-600 text-white rounded font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-50 hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-cyan-900/20"
      >
        {testing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
        Execute Inference Test
      </button>

      {result && (
        <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 pt-4 border-t border-white/5"
        >
            <div className="grid grid-cols-3 gap-2">
                <div className="p-2 bg-white/5 rounded text-center border border-white/5">
                    <span className="block text-[8px] font-bold text-slate-500 uppercase">Confidence</span>
                    <span className="text-xs font-mono text-emerald-400">{(result.confidence * 100).toFixed(1)}%</span>
                </div>
                <div className="p-2 bg-white/5 rounded text-center border border-white/5">
                    <span className="block text-[8px] font-bold text-slate-500 uppercase">Latency</span>
                    <span className="text-xs font-mono text-cyan-400">{result.latency.toFixed(0)}ms</span>
                </div>
                <div className="p-2 bg-white/5 rounded text-center border border-white/5">
                    <span className="block text-[8px] font-bold text-slate-500 uppercase">Tokens</span>
                    <span className="text-xs font-mono text-blue-400">{result.tokens.toFixed(0)}</span>
                </div>
            </div>
            <div className="space-y-2">
                <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest block mb-1">Inference Pathing:</span>
                <div className="flex flex-wrap items-center gap-2">
                    {result.logicPath.map((step: string, i: number) => (
                        <div key={i} className="flex items-center gap-2">
                            <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono">{step}</span>
                            {i < result.logicPath.length - 1 && <ChevronRight className="w-3 h-3 text-slate-700" />}
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
      )}
    </div>
  );
};

const NeuralWorkbench = ({ module, onTerminate }: { module: LabItem, onTerminate: () => void }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [cognitiveLoad, setCognitiveLoad] = useState(65);
  const [inferenceDepth, setInferenceDepth] = useState(82);
  const [activeTab, setActiveTab] = useState<'console' | 'playground' | 'theory'>('console');

  useEffect(() => {
    const messages = [
      "Establishing secure tunnel to Neural Core...",
      "Syncing architectural nodes...",
      "Weight distribution: OPTIMAL",
      `Primary objective: ${module.label}`,
      "Running recursive inference loops...",
      "Deductive reasoning active.",
      "Buffer overflow protection: STABLE",
      "Intercepting signal noise...",
      "Cognitive expansion complete.",
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < messages.length) {
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${messages[i]}`]);
        i++;
      }
    }, 1200);

    return () => clearInterval(interval);
  }, [module.label]);

  return (
    <div className="space-y-6 animate-in slide-in-from-right-8 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <button onClick={onTerminate} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-slate-400 md:hidden">
            <ChevronRight className="w-6 h-6 rotate-180" />
          </button>
          <div className="space-y-1">
            <h2 className="text-2xl font-light text-cyan-50 tracking-tight">{module.label}</h2>
            <div className="flex items-center gap-4">
               <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Workbench Session Active</span>
               </div>
               <span className="hidden md:block text-[10px] text-slate-600 uppercase font-black">Ref: {module.type}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 p-1 bg-black/40 rounded-lg border border-white/5">
           {(['console', 'playground', 'theory'] as const).map(tab => (
             <button
               key={tab}
               onClick={() => setActiveTab(tab)}
               className={`px-4 py-2 rounded text-[10px] font-black uppercase tracking-widest transition-all ${
                 activeTab === tab ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/40' : 'text-slate-500 hover:text-cyan-400'
               }`}
             >
               {tab}
             </button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {activeTab === 'console' && (
            <div className="bg-black/80 border border-cyan-900/40 rounded-xl overflow-hidden shadow-2xl h-[400px] flex flex-col font-mono animate-in fade-in duration-500">
              <div className="bg-[#0f172a] px-4 py-2 border-b border-white/5 flex items-center justify-between">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/50"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50"></div>
                </div>
                <span className="text-[9px] text-slate-500 uppercase font-black tracking-widest">Neural_Sync_v4.2.log</span>
              </div>
              <div className="flex-1 p-6 overflow-y-auto space-y-2 text-[11px] leading-relaxed">
                {logs.map((log, i) => (
                  <div key={i} className="flex gap-4">
                    <span className="text-cyan-900 shrink-0">{i + 1}</span>
                    <span className={i === logs.length - 1 ? "text-cyan-400 animate-pulse" : "text-slate-400"}>{log}</span>
                  </div>
                ))}
                <div className="flex gap-2 text-cyan-400">
                  <span className="animate-pulse">_</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'playground' && (
            <div className="animate-in slide-in-from-bottom-4 duration-500 space-y-6">
               <ConceptTester module={module} />
               
               <div className="glass-card p-8 rounded-xl bg-gradient-to-br from-blue-900/20 to-transparent border-blue-500/20">
                  <h4 className="text-xs font-black text-blue-400 uppercase tracking-widest mb-4">Architectural Breakdown</h4>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    This module utilizes a {module.type === 'Workflow Engine' ? 'multi-agent orchestration' : 'latent space embedding'} technique. 
                    In this sandbox, you are observing how specific semantic vectors are processed through {module.label}'s specialized neural gates.
                  </p>
                  <div className="flex items-center gap-6">
                     <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded bg-blue-500/10 flex items-center justify-center text-blue-400">
                           <LayoutGrid className="w-5 h-5" />
                        </div>
                        <div className="text-[10px] uppercase font-black text-slate-500">Node Cluster</div>
                     </div>
                     <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                           <Network className="w-5 h-5" />
                        </div>
                        <div className="text-[10px] uppercase font-black text-slate-500">Synaptic Map</div>
                     </div>
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'theory' && (
            <div className="glass-card p-10 rounded-xl space-y-8 animate-in zoom-in-95 duration-500">
                <div className="max-w-2xl">
                    <h3 className="text-3xl font-light text-cyan-50 mb-6 tracking-tight">The {module.label} Thesis</h3>
                    <div className="space-y-6 text-slate-400 leading-relaxed font-serif italic text-lg opacity-80">
                        <p>
                            "Conceptualization in modern AI systems is no longer a static lookup. 
                            Through modules like {module.label}, we observe the emergence of dynamic reasoning chains."
                        </p>
                        <p>
                            When you initialize this node, you are effectively creating a temporary persistent state 
                            in the global latent web. The {module.type} architecture ensures that every inference 
                            is grounded in the verified data extracted from your Pulse feed.
                        </p>
                    </div>
                </div>
                <div className="h-[1px] w-full bg-white/5"></div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div>
                        <span className="block text-[8px] font-black text-slate-600 uppercase mb-1">Complexity</span>
                        <span className="text-cyan-400 text-xs font-mono">O(log n)</span>
                    </div>
                    <div>
                        <span className="block text-[8px] font-black text-slate-600 uppercase mb-1">Architecture</span>
                        <span className="text-cyan-400 text-xs font-mono">Transformer-XL</span>
                    </div>
                    <div>
                        <span className="block text-[8px] font-black text-slate-600 uppercase mb-1">Base Logic</span>
                        <span className="text-cyan-400 text-xs font-mono">Deductive</span>
                    </div>
                    <div>
                        <span className="block text-[8px] font-black text-slate-600 uppercase mb-1">Node Type</span>
                        <span className="text-cyan-400 text-xs font-mono">Inference</span>
                    </div>
                </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="glass-card p-6 rounded-xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Process Priority</span>
                  <span className="text-xs font-bold text-cyan-400">{cognitiveLoad}%</span>
                </div>
                <input 
                  type="range" 
                  value={cognitiveLoad} 
                  onChange={(e) => setCognitiveLoad(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500" 
                />
                <p className="text-[10px] text-slate-600 italic">Adjusting allocates additional neural threads to the current deductive task.</p>
             </div>
             <div className="glass-card p-6 rounded-xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Inference Depth</span>
                  <span className="text-xs font-bold text-blue-400">{inferenceDepth}μ</span>
                </div>
                <input 
                  type="range" 
                  value={inferenceDepth} 
                  onChange={(e) => setInferenceDepth(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500" 
                />
                <p className="text-[10px] text-slate-600 italic">Increasing depth provides more granular insights but increases compute cost.</p>
             </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-6 rounded-xl bg-[#0a101d]/60 border-cyan-400/20">
            <h4 className="text-xs font-black text-cyan-400 uppercase tracking-widest mb-6 border-b border-white/5 pb-2">Active Signal</h4>
            <div className="space-y-4">
              <div className="aspect-square relative rounded-lg overflow-hidden border border-white/10 group">
                <img src={module.img} className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#0a101d_120%)]"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-20 h-20 rounded-full border border-cyan-500/30 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                      <BrainCircuit className="w-10 h-10 text-cyan-400" />
                   </div>
                </div>
              </div>
              <div className="space-y-1">
                <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">Current Module</span>
                <span className="block text-sm text-cyan-50 font-light">{module.label}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
             <button className="w-full py-4 bg-cyan-600 text-white rounded font-black text-[11px] tracking-[0.2em] uppercase hover:brightness-110 shadow-lg shadow-cyan-900/20 transition-all active:scale-95 flex items-center justify-center gap-2">
                <Clock className="w-4 h-4" />
                Sync Status
             </button>
             <button 
              onClick={onTerminate}
              className="w-full py-4 bg-transparent border border-rose-900/40 text-rose-500/60 rounded font-black text-[11px] tracking-[0.2em] uppercase hover:bg-rose-500/5 hover:text-rose-500 transition-all"
             >
              Terminate Session
             </button>
          </div>
          
          <div className="p-4 rounded-lg bg-orange-500/5 border border-orange-500/20">
             <p className="text-[9px] text-orange-200/60 leading-relaxed font-mono">
                WARNING: High-load inference detected. Monitor neural temperature to avoid synaptic ghosting.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const LabScreen = ({ labs, loading, onInitialize, activeWorkbench, onTerminateWorkbench }: { labs: LabItem[], loading: boolean, onInitialize: (lab: LabItem) => void, activeWorkbench: LabItem | null, onTerminateWorkbench: () => void }) => {
  const [initializing, setInitializing] = useState<string | null>(null);

  const handleInit = (e: any, lab: LabItem) => {
    e.stopPropagation();
    setInitializing(lab.label);
    setTimeout(() => {
      setInitializing(null);
      onInitialize(lab);
    }, 2000);
  };

  if (activeWorkbench) {
    return <NeuralWorkbench module={activeWorkbench} onTerminate={onTerminateWorkbench} />;
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-8">
      <section className="glass-card rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden border-cyan-900/30 bg-[#0a101d]/60 shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[100px] -z-10"></div>
        <div className="space-y-3 text-center md:text-left">
          <span className="inline-block py-1 px-3 rounded bg-cyan-500/10 text-cyan-400 text-[9px] font-black border border-cyan-500/30 uppercase tracking-[0.2em]">Neural Architect Level 04</span>
          <h2 className="text-2xl md:text-3xl font-light text-cyan-50 tracking-tight">System Specialist Alpha</h2>
          <p className="text-slate-500 text-sm max-w-md opacity-80">You're in the top 5% of early adopters exploring agentic structures. Sync intelligence to create new modules.</p>
        </div>
        <div className="relative w-32 h-32 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-slate-900"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-cyan-500 border-r-cyan-500 border-b-cyan-500 rotate-[45deg] shadow-[0_0_10px_#06b6d4]"></div>
          <div className="text-center font-mono">
            <span className="block text-2xl font-bold text-white">78%</span>
            <span className="block text-[8px] font-bold text-slate-500 uppercase tracking-wider">Neural Sync</span>
          </div>
        </div>
      </section>

      <div className="flex items-center justify-between px-2">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <FlaskConical className="w-6 h-6 text-cyan-400" />
          Neural Module Feed
        </h3>
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{loading ? "SCANNING..." : `${labs.length} Nodes Active`}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {labs.length > 0 ? labs.map((lab, i) => (
          <div 
            key={i} 
            className="group relative"
          >
            <div className="glass-card rounded-xl overflow-hidden flex flex-col transition-all duration-500 border-cyan-900/20 bg-[#0a101d]/40 group-hover:border-cyan-400/40 hover:shadow-[0_0_40px_rgba(34,211,238,0.1)]">
              <div className="h-48 relative overflow-hidden border-b border-white/5">
                <img src={lab.img} alt={lab.label} className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110" />
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-black/60 text-[8px] font-black tracking-widest text-white border border-white/10 uppercase">{lab.status}</div>
                {initializing === lab.label && (
                   <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-6 text-center space-y-4">
                      <Loader2 className="w-10 h-10 text-cyan-400 animate-spin" />
                      <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest animate-pulse">Syncing Neural Core...</p>
                   </div>
                )}
              </div>
              <div className="p-6 space-y-3 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-cyan-400 text-[9px] font-black uppercase tracking-[0.2em] leading-none">
                  <BrainCircuit className="w-4 h-4 text-cyan-500" />
                  {lab.type}
                </div>
                <h4 className="text-xl font-light text-cyan-50 leading-tight tracking-tight">{lab.label}</h4>
                <p className="text-slate-400 text-sm flex-1 leading-relaxed opacity-70 mb-4">{lab.desc}</p>
                <button 
                  onClick={(e) => handleInit(e, lab)}
                  disabled={initializing !== null}
                  className="w-full py-4 rounded bg-gradient-to-r from-cyan-600 to-blue-700 text-white text-[11px] font-black tracking-[0.2em] flex items-center justify-center gap-2 hover:brightness-110 disabled:opacity-50 active:scale-95 transition-all uppercase shadow-lg shadow-blue-900/20"
                >
                  {initializing === lab.label ? "SYNCING..." : "Initialize Node"}
                  <Zap className={`w-3.5 h-3.5 fill-white ${initializing === lab.label ? 'animate-pulse' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        )) : (
          loading ? (
            [1, 2, 3].map((i) => (
              <div key={i} className="h-96 glass-card rounded-xl animate-pulse bg-white/5 border border-cyan-900/10" />
            ))
          ) : (
            <div className="col-span-full py-20 text-center glass-card rounded-xl border-dashed border-white/10 bg-white/2">
               <div className="max-w-xs mx-auto space-y-4">
                  <FlaskConical className="w-12 h-12 text-slate-700 mx-auto" />
                  <p className="text-slate-500 uppercase tracking-widest text-[10px] font-black">Laboratory Vacant</p>
                  <p className="text-slate-600 text-sm italic font-light leading-relaxed">Intelligence dossiers must be synced from the Pulse Feed to initialize research nodes.</p>
               </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const SavedScreen = () => (
  <div className="space-y-8 animate-in fade-in zoom-in duration-700">
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div>
        <h1 className="text-3xl font-bold text-primary-container mb-1 tracking-tight">Saved Insights</h1>
        <p className="text-on-surface-variant text-base">Your curated intelligence dossiers.</p>
      </div>
      <div className="relative w-full md:w-96">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
        <input 
          className="w-full bg-surface-container border border-outline-variant rounded-xl py-3 pl-12 pr-4 focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none text-sm transition-all shadow-inner" 
          placeholder="Search your dossiers..." 
          type="text"
        />
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        { 
          title: 'Quantum Advantage 2024', 
          desc: 'Analyzing the recent breakthrough in error correction and its impact on cryptographic standards.',
          insights: 12, tags: ['#TECH', '#SECURITY'], confidence: '98%'
        },
        { 
          title: 'Global Energy Transition', 
          desc: 'Economic mapping of renewable infrastructure adoption across emerging markets in SE Asia.',
          insights: 8, tags: ['#MACRO', '#ENERGY'], shift: 'MARKET SHIFT'
        },
        { 
          title: 'LLM Reasoning Benchmarks', 
          desc: 'New comparative data on chain-of-thought processing efficiency across models.',
          insights: 24, urgent: true, img: 'https://images.unsplash.com/photo-1620712946849-12e036ef5747?auto=format&fit=crop&q=80&w=600'
        }
      ].map((dossier, i) => (
        <div key={i} className="group relative active:scale-[0.98] transition-transform duration-200 cursor-pointer">
          <div className="absolute -top-3 left-0 w-32 h-6 bg-surface-container-high rounded-t-lg border-x border-t border-white/10 z-0 transition-colors group-hover:bg-primary-container/20 [clip-path:polygon(0_0,65%_0,75%_100%,0_100%)]"></div>
          <div className={`glass-card relative z-10 rounded-xl rounded-tl-none p-6 overflow-hidden shadow-2xl ${dossier.urgent ? 'border-primary-container/40' : 'border-cyan-900/20'}`}>
            {dossier.img && (
              <div className="h-32 -mx-6 -mt-6 mb-4 overflow-hidden relative border-b border-white/5">
                <img src={dossier.img} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container to-transparent opacity-60"></div>
              </div>
            )}
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-lg ${dossier.confidence ? 'bg-primary-container/10 text-primary-container' : 'bg-secondary/10 text-secondary'}`}>
                {dossier.confidence ? <BrainCircuit className="w-5 h-5" /> : <Layers className="w-5 h-5" />}
              </div>
              {dossier.confidence && <span className="text-[9px] font-bold px-2 py-1 bg-primary-container/20 text-primary-container rounded border border-primary-container/30 uppercase tracking-widest">{dossier.confidence} CONFIDENCE</span>}
              {dossier.shift && <span className="text-[9px] font-bold px-2 py-1 bg-secondary/20 text-secondary rounded border border-secondary/30 uppercase tracking-widest">{dossier.shift}</span>}
              {dossier.urgent && <span className="text-[9px] font-bold px-2 py-1 bg-primary-container/20 text-primary-container rounded border border-primary-container/30 uppercase tracking-widest">URGENT</span>}
            </div>
            <h3 className="text-xl font-bold mb-2">{dossier.title}</h3>
            <p className="text-on-surface-variant text-sm mb-6 line-clamp-2 leading-relaxed">{dossier.desc}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {dossier.tags?.map(tag => (
                <span key={tag} className="text-[10px] font-bold bg-surface-container-highest px-3 py-1 rounded text-outline/80 tracking-widest leading-none">{tag}</span>
              ))}
            </div>
            <div className="border-t border-white/5 pt-4 flex justify-between items-center">
              <span className="text-[10px] font-bold text-outline opacity-60 uppercase tracking-widest">{dossier.insights} INSIGHTS</span>
              <ArrowRight className="w-5 h-5 text-primary-container group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SourcesScreen = ({ dossiers, loading, onViewDossier }: { dossiers: IntelligenceHubItem[], loading: boolean, onViewDossier: (item: any) => void }) => (
  <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-primary">Intelligence Hub</h2>
        <span className="text-[10px] font-bold text-outline px-3 py-1 bg-surface-container-high rounded-full uppercase tracking-wider border border-white/5">
          {loading ? "SCANNING..." : `${dossiers.length + 9} ACTIVE SOURCES`}
        </span>
      </div>
      <div className="flex overflow-x-auto hide-scrollbar gap-4 pb-2">
        {[
          { name: 'OpenAI', active: true, icon: Zap },
          { name: 'Anthropic', icon: FlaskConical },
          { name: 'DeepMind', icon: Search },
          { name: 'NVIDIA', icon: Layers }
        ].map((source, i) => (
          <button key={i} className={`flex-shrink-0 flex items-center gap-4 px-6 py-4 rounded-xl transition-all border ${
            source.active 
              ? 'border-cyan-500/50 bg-cyan-500/10 shadow-[0_0_20px_rgba(6,182,212,0.2)] scale-105' 
              : 'bg-black/40 border-cyan-900/20 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 hover:border-cyan-500/30'
          }`}>
            <source.icon className={`w-5 h-5 ${source.active ? 'text-cyan-400' : 'text-slate-500'}`} />
            <span className={`text-[11px] font-black tracking-widest leading-none uppercase ${source.active ? 'text-cyan-400' : 'text-slate-400'}`}>{source.name}</span>
          </button>
        ))}
      </div>
    </section>

    <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <article 
          className="lg:col-span-8 group cursor-pointer h-full"
          onClick={() => dossiers[0] && onViewDossier(dossiers[0])}
        >
          <div className="relative h-full overflow-hidden rounded-xl bg-black/40 border border-cyan-900/40 hover:border-cyan-500/40 transition-all duration-500 min-h-[400px] shadow-2xl">
            <img 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
              src={dossiers[0]?.img || "https://images.unsplash.com/photo-1620121692029-d088224efc74?auto=format&fit=crop&q=80&w=1200"} 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-[#05070a]/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 w-full bg-gradient-to-t from-[#05070a] to-transparent">
              <div className="flex gap-2 mb-4">
                <span className="px-3 py-1 rounded bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 text-[9px] font-black uppercase tracking-[0.2em]">Primary Dossier</span>
                <span className="px-3 py-1 rounded bg-black/40 text-slate-500 text-[9px] font-bold uppercase tracking-[0.2em]">4 MIN READ</span>
              </div>
              <h3 className="text-3xl font-light text-cyan-50 mb-4 leading-tight tracking-tight">
                {dossiers[0]?.title || "Project Strawberry: Internal Testing Confirms Human-Level Reasoning"}
              </h3>
              <p className="text-slate-400 text-base max-w-2xl leading-relaxed opacity-80">
                {dossiers[0]?.desc || "OpenAI's latest breakthrough in synthetic data marks a paradigm shift in how frontier models solve proofs."}
              </p>
              <div className="mt-6 flex items-center gap-3 bg-cyan-500/5 w-fit px-4 py-2 rounded border border-cyan-500/20">
                 <Verified className="w-4 h-4 text-cyan-400" />
                 <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">98% Neural Confidence</span>
              </div>
            </div>
          </div>
        </article>

        <div className="lg:col-span-4 flex flex-col gap-6">
          {dossiers.length > 1 ? dossiers.slice(1).map((item, i) => (
            <article 
              key={i} 
              onClick={() => onViewDossier(item)}
              className="p-6 rounded-xl glass-card hover:border-white/20 transition-all cursor-pointer group"
            >
            <span className="text-[10px] font-bold text-outline block mb-2 uppercase tracking-widest">{item.time}</span>
            <h4 className="text-lg font-bold text-white mb-3 group-hover:text-primary-container transition-colors leading-tight">{item.title}</h4>
            <p className="text-sm text-on-surface-variant mb-4 leading-relaxed line-clamp-2">{item.desc}</p>
            <div className="flex justify-between items-center pt-2 border-t border-white/5">
              <span className="text-[10px] font-bold text-primary-container tracking-widest">{item.source}</span>
              <ArrowRight className="w-5 h-5 text-on-surface-variant group-hover:translate-x-1 transition-transform" />
            </div>
          </article>
        )) : (
          <>
            <div className="p-6 rounded-xl glass-card animate-pulse h-32 bg-white/5" />
            <div className="p-6 rounded-xl glass-card animate-pulse h-32 bg-white/5" />
          </>
        )}
      </div>
    </section>
  </div>
);

const AchievementScreen = () => (
  <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 flex flex-col items-center">
    <div className="relative w-full max-w-4xl bg-[#0a101d]/60 backdrop-blur-3xl rounded-3xl p-8 md:p-12 overflow-hidden shadow-2xl flex flex-col items-center text-center border border-cyan-900/30">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.08)_0%,_transparent_70%)]"></div>
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute -top-1/4 -right-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-[140px]"></div>
        <div className="absolute -bottom-1/4 -left-1/4 w-80 h-80 bg-blue-600 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded bg-cyan-500/10 border border-cyan-500/40">
        <Trophy className="w-4 h-4 text-cyan-400" />
        <span className="text-[10px] font-bold text-cyan-400 tracking-[0.2em] uppercase">Global Top 2%</span>
      </div>

      <div className="relative z-10 mb-8 group">
        <div className="absolute inset-0 bg-cyan-400/20 blur-[60px] rounded-full scale-125 group-hover:bg-cyan-400/30 transition-all"></div>
        <div className="relative flex items-center justify-center w-48 h-48 md:w-64 md:h-64 rounded-full border border-cyan-500/40 bg-black/40 overflow-hidden shadow-[0_0_30px_rgba(34,211,238,0.3)]">
          <img src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover scale-150 grayscale group-hover:grayscale-0 transition-all duration-1000" />
          <div className="absolute inset-0 flex items-center justify-center bg-cyan-950/40 backdrop-blur-md group-hover:backdrop-blur-none transition-all duration-500">
             <BrainCircuit className="w-20 h-20 text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
          </div>
        </div>
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-600 to-blue-700 text-white px-6 py-2 rounded border border-cyan-400/30 text-[10px] font-black uppercase tracking-[0.2em] shadow-xl whitespace-nowrap">
          LEVEL 04 ARCHITECT
        </div>
      </div>

      <div className="relative z-10 mb-10 w-full">
        <h2 className="text-4xl md:text-6xl font-display font-light text-cyan-50 tracking-tight leading-none mb-4 uppercase">Prompt Engineer</h2>
        <div className="flex items-center justify-center gap-6">
          <div className="h-[1px] w-12 bg-cyan-500/30"></div>
          <p className="text-xs md:text-sm font-bold text-cyan-400 tracking-[0.3em] uppercase opacity-80">System Specialist Alpha</p>
          <div className="h-[1px] w-12 bg-cyan-500/30"></div>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl mb-12">
        <div className="bg-black/40 border border-cyan-900/40 p-6 rounded-xl flex flex-col items-start gap-1 text-left">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Accumulated Data</span>
          <span className="text-2xl font-mono text-cyan-400">12,450 XP</span>
          <div className="w-full h-1 bg-slate-800 mt-3 rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: '85%' }} className="h-full bg-cyan-500 shadow-[0_0_8px_#06b6d4]" />
          </div>
        </div>
        <div className="bg-black/40 border border-cyan-900/40 p-6 rounded-xl flex flex-col items-start gap-1 text-left">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Neural Sync</span>
          <span className="text-2xl font-mono text-blue-400">MATCH: 100%</span>
          <div className="w-full h-1 bg-slate-800 mt-3 rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} className="h-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
          </div>
        </div>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row gap-4 w-full max-w-md">
        <button className="flex-1 py-4 bg-gradient-to-r from-cyan-600 to-blue-700 text-white rounded text-[11px] uppercase font-black tracking-[0.2em] shadow-lg shadow-blue-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
          <Share2 className="w-4 h-4" />
          Sync Achievement
        </button>
        <button className="flex-1 py-4 bg-black/40 border border-cyan-500/30 text-cyan-400 rounded text-[11px] uppercase font-bold tracking-[0.2em] hover:bg-cyan-500/10 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
          <Download className="w-4 h-4" />
          Extract Badge
        </button>
      </div>
    </div>
  </div>
);

// --- Main App ---

const IntelligenceModal = ({ item, onClose, onSync }: { item: any, onClose: () => void, onSync?: (item: any) => void }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
    onClick={onClose}
  >
    <motion.div 
      initial={{ scale: 0.9, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      className="w-full max-w-4xl bg-[#0a101d] border border-cyan-500/30 rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col md:flex-row"
      onClick={e => e.stopPropagation()}
    >
      <div className="w-full md:w-1/2 h-48 md:h-200 relative flex-shrink-0">
        <img src={item.img} className="w-full h-full object-cover" alt={item.title || item.label} />
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0a101d] to-transparent opacity-60"></div>
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 p-3 rounded-full bg-black/60 text-white hover:bg-cyan-500/40 hover:scale-110 transition-all z-10"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      <div className="w-full md:w-1/2 p-6 md:p-12 overflow-y-auto space-y-6 flex flex-col">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <span className="bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest border border-cyan-500/20">
            {item.source || item.type}
          </span>
          <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">{item.time || item.status}</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-light text-cyan-50 tracking-tight leading-tight">{item.title || item.label}</h2>
        
        <div className="space-y-6 text-slate-300 leading-relaxed text-lg font-light">
          {item.content ? (
            item.content.split('. ').map((paragraph: string, i: number) => (
              <p key={i} className="opacity-90">{paragraph}{paragraph.endsWith('.') ? '' : '.'}</p>
            ))
          ) : (
            <p className="opacity-90">{item.desc}</p>
          )}
          <p className="text-slate-500 text-sm italic border-l-2 border-cyan-500/30 pl-4 py-2 bg-white/5 rounded-r">
            Intelligence report verified via Signal-C protocols. Predictive confidence level: 94.2%. Neural extraction complete.
          </p>
        </div>

        <div className="flex gap-4 pt-8 sticky bottom-0 mt-auto bg-[#0a101d]/80 backdrop-blur-sm p-4 -mx-4 rounded-xl">
          {onSync && (
            <button 
              onClick={() => onSync(item)}
              className="flex-1 py-4 bg-cyan-600 text-white rounded font-black text-[11px] tracking-[0.2em] uppercase hover:brightness-110 shadow-lg shadow-cyan-900/40 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4" />
              Sync to Lab
            </button>
          )}
          <button className="px-6 py-4 bg-black/40 border border-cyan-900/40 text-slate-400 rounded hover:text-cyan-400 transition-colors group">
            <BookmarkPlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const AuthModal = ({ onClose, onLogin }: { onClose: () => void, onLogin: () => void }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
    onClick={onClose}
  >
    <motion.div 
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      className="w-full max-w-md bg-[#0a101d] border border-cyan-500/30 rounded-2xl p-8 text-center space-y-8 shadow-2xl relative"
      onClick={e => e.stopPropagation()}
    >
      <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white">
        <X className="w-5 h-5" />
      </button>
      <div className="mx-auto w-16 h-16 rounded bg-cyan-500/10 flex items-center justify-center border border-cyan-500/30">
        <Lock className="w-8 h-8 text-cyan-400" />
      </div>
      <div className="space-y-2">
        <h3 className="text-2xl font-light text-cyan-50 tracking-tight">System Authorization</h3>
        <p className="text-slate-500 text-sm">Access your curated neural feeds and dossier storage.</p>
      </div>
      <button 
        onClick={onLogin}
        className="w-full py-4 bg-white text-black rounded font-black text-[11px] tracking-[0.2em] uppercase hover:bg-cyan-50 transition-all flex items-center justify-center gap-3 active:scale-95"
      >
        <Search className="w-4 h-4" /> {/* Representing Google searching icon */}
        Authorize via Google
      </button>
      <p className="text-[10px] text-slate-600 uppercase tracking-widest leading-relaxed">Neural fingerprints and verified identities strictly enforced via System Specialist Protocols.</p>
    </motion.div>
  </motion.div>
);

export default function App() {
  const [screen, setScreen] = useState<Screen>('pulse');
  const [news, setNews] = useState<NewsItem[]>([]);
  const [dossiers, setDossiers] = useState<IntelligenceHubItem[]>([]);
  const [labs, setLabs] = useState<LabItem[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [loadingHub, setLoadingHub] = useState(true);
  const [loadingLabs, setLoadingLabs] = useState(true);
  const [activeItem, setActiveItem] = useState<any>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [analysisText, setAnalysisText] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [activeWorkbenchModule, setActiveWorkbenchModule] = useState<LabItem | null>(null);
  const [briefing, setBriefing] = useState<DailyBriefing | null>(null);
  const [loadingBriefing, setLoadingBriefing] = useState(true);

  useEffect(() => {
    // Fire all fetches in parallel
    const getNews = async () => {
      setLoadingNews(true);
      const data = await fetchLiveNews();
      if (data && data.length > 0) setNews(data);
      setLoadingNews(false);
    };

    const getHub = async () => {
      setLoadingHub(true);
      const data = await fetchIntelligenceHub();
      if (data && data.length > 0) setDossiers(data);
      setLoadingHub(false);
    };

    const getLabs = async () => {
      setLoadingLabs(true);
      const data = await fetchLabs();
      if (data && data.length > 0) setLabs(data);
      setLoadingLabs(false);
    };

    const getBriefing = async () => {
      setLoadingBriefing(true);
      const data = await fetchDailyBriefing();
      setBriefing(data);
      setLoadingBriefing(false);
    };

    getNews();
    getHub();
    getLabs();
    getBriefing();
  }, []);

  const handlePulseAnalyze = async () => {
    if (!news.length || analyzing) return;
    setAnalyzing(true);
    const result = await analyzePulse(news);
    setAnalysisText(result);
    setAnalyzing(false);
  };

  const handleSyncToLab = (item: any) => {
    const newLab: LabItem = {
      type: "Sync Insight",
      label: item.title,
      status: "SYNCED",
      desc: item.desc,
      img: item.img
    };
    setLabs([newLab, ...labs]);
    setActiveItem(null);
    setNotification(`Successfully synced "${item.title}" to Laboratory.`);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleInitializeModule = (lab: LabItem) => {
    setActiveWorkbenchModule(lab);
    setNotification(`Neural connection established: ${lab.label} is now active.`);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="min-h-screen bg-background text-on-surface font-sans selection:bg-primary-container/30">
      <Header setScreen={(s) => {
        if (s === 'achievement' && !isLoggedIn) {
          setShowAuth(true);
        } else {
          setScreen(s);
          setActiveWorkbenchModule(null);
        }
      }} />
      
      <main className="pt-24 pb-32 px-4 md:px-8 max-w-[1200px] mx-auto min-h-screen relative">
        <AnimatePresence mode="wait">
          <motion.div 
            key={screen + (activeWorkbenchModule ? '-workbench' : '')}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {screen === 'pulse' && <PulseScreen news={news} loading={loadingNews} onViewArticle={setActiveItem} />}
            {screen === 'briefing' && <BriefingScreen briefing={briefing} loading={loadingBriefing} />}
            {screen === 'lab' && (
              <LabScreen 
                labs={labs} 
                loading={loadingLabs} 
                onInitialize={handleInitializeModule} 
                activeWorkbench={activeWorkbenchModule}
                onTerminateWorkbench={() => setActiveWorkbenchModule(null)}
              />
            )}
            {screen === 'saved' && <SavedScreen />}
            {screen === 'sources' && <SourcesScreen dossiers={dossiers} loading={loadingHub} onViewDossier={setActiveItem} />}
            {screen === 'achievement' && <AchievementScreen />}
          </motion.div>
        </AnimatePresence>
      </main>

      <NavBar activeScreen={screen} setScreen={(s) => {
         if ((s === 'saved' || s === 'lab') && !isLoggedIn) {
           setShowAuth(true);
         } else {
           setScreen(s);
           setActiveWorkbenchModule(null);
         }
      }} />

      {/* Toast Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] bg-cyan-600 text-white px-6 py-3 rounded-full shadow-2xl border border-cyan-400/30 flex items-center gap-3"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-xs font-black uppercase tracking-widest">{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB - Contextual for Pulse */}
      {screen === 'pulse' && (
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="fixed bottom-24 right-6 z-[60]"
        >
          <button 
            onClick={handlePulseAnalyze}
            className={`w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.4)] active:scale-95 transition-transform hover:scale-110 border border-cyan-400/30 ${analyzing ? 'animate-pulse' : ''}`}
          >
            {analyzing ? <Loader2 className="w-7 h-7 animate-spin" /> : <BrainCircuit className="w-7 h-7 drop-shadow-lg" />}
          </button>
          
          <AnimatePresence>
            {analysisText && (
              <motion.div 
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                className="absolute bottom-20 right-0 w-72 p-6 glass-card border-cyan-500/50 bg-[#0a101d] shadow-2xl rounded-2xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Signal Synthesis</h4>
                  <button onClick={() => setAnalysisText(null)} className="text-slate-500">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed font-mono opacity-90">{analysisText}</p>
                <div className="mt-4 pt-4 border-t border-white/5 flex gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
                  <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest leading-none">Real-time Correlation ACTIVE</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      <AnimatePresence>
        {activeItem && <IntelligenceModal item={activeItem} onClose={() => setActiveItem(null)} onSync={handleSyncToLab} />}
        {showAuth && <AuthModal onClose={() => setShowAuth(false)} onLogin={() => {
          setIsLoggedIn(true);
          setShowAuth(false);
          setScreen('achievement');
        }} />}
      </AnimatePresence>
    </div>
  );
}
