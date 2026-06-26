import { useState, useRef, useEffect } from 'react';
import { Send, User as UserIcon, Sparkles, Cpu, Zap, Activity, Bot, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { AIAgent, LLMModel } from '../types';

export default function ChatPlayground({ initialAgentSlug }: { initialAgentSlug?: string | null }) {
  const [messages, setMessages] = useState<any[]>([
    { role: 'assistant', content: 'Bem-vindo ao MEXUS AI CORE. Selecione um Agente e um Modelo para testar a integração em tempo real.' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [agents, setAgents] = useState<AIAgent[]>([]);
  const [models, setModels] = useState<LLMModel[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('');
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [agentsRes, modelsRes] = await Promise.all([
          axios.get('/api/admin/agents'),
          axios.get('/api/admin/models')
        ]);
        setAgents(agentsRes.data);
        setModels(modelsRes.data);
        
        if (initialAgentSlug) {
          setSelectedAgent(initialAgentSlug);
          const agent = agentsRes.data.find((a: AIAgent) => a.slug === initialAgentSlug);
          if (agent && agent.modelPreference) {
             setSelectedModel(agent.modelPreference);
          } else if (modelsRes.data.length > 0) {
             setSelectedModel(modelsRes.data[0].id);
          }
        } else {
          if (agentsRes.data.length > 0) setSelectedAgent(agentsRes.data[0].slug);
          if (modelsRes.data.length > 0) setSelectedModel(modelsRes.data[0].id);
        }
      } catch (err) {
        console.error('Failed to load playground data', err);
      }
    };
    fetchData();
  }, [initialAgentSlug]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsTyping(true);

    try {
      // Chamada real ao gateway MEXUS
      const response = await axios.post('/api/ai/chat', {
        client_id: 'cli_123', // Cliente de teste (Imobiliária Silva)
        message: userMsg,
        agent: selectedAgent,
        model: selectedModel
      }, {
        headers: {
          'x-api-key': 'sk_imob_721' // API Key do sistema ImobFlow
        }
      });

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: response.data.response,
        usage: response.data.usage
      }]);
    } catch (error: any) {
      console.error('MEXUS Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `Falha na infraestrutura MEXUS: ${error.response?.data?.error || 'Erro desconhecido'}` 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] lg:h-[calc(100vh-16rem)] bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
      {/* Top Bar - Configurações de Teste */}
      <div className="p-6 border-b border-slate-50 bg-slate-50/50 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-100">
            <Cpu size={24} />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">Terminal de Testes MEXUS</h3>
            <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">Gateway AI Ativo (Ambiente de Produção)</p>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
          {/* Seletor de Agente */}
          <div className="flex-1 lg:flex-none min-w-[200px]">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Agente</label>
            <div className="relative">
              <Bot size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <select 
                value={selectedAgent}
                onChange={(e) => setSelectedAgent(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm appearance-none"
              >
                {agents.map(a => (
                  <option key={a.id} value={a.slug}>{a.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Seletor de Modelo */}
          <div className="flex-1 lg:flex-none min-w-[200px]">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Modelo LLM</label>
            <div className="relative">
              <Layers size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <select 
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm appearance-none"
              >
                {models.map(m => (
                  <option key={m.id} value={m.id}>{m.name} ({m.provider})</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth bg-white">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-4 max-w-[85%] lg:max-w-[70%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm font-bold ${
                  msg.role === 'user' ? 'bg-slate-100 text-slate-600' : 'bg-indigo-600 text-white'
                }`}>
                  {msg.role === 'user' ? <UserIcon size={20} /> : <Sparkles size={20} />}
                </div>
                <div className="flex flex-col gap-3">
                  <div className={`p-5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-slate-100 text-slate-800 rounded-tr-none' 
                      : 'bg-indigo-50 text-slate-800 border border-indigo-100 rounded-tl-none shadow-sm'
                  }`}>
                    {msg.content}
                  </div>
                  {msg.usage && (
                    <div className="flex flex-wrap items-center gap-4 px-2">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-indigo-500 uppercase tracking-widest bg-indigo-50 px-2 py-1 rounded-md">
                        <Activity size={10} />
                        {msg.usage.tokens} Tokens
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-amber-600 uppercase tracking-widest bg-amber-50 px-2 py-1 rounded-md">
                        <Zap size={10} />
                        {msg.usage.credits} MEXUS Credits
                      </div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border border-slate-100 px-2 py-1 rounded-md">
                        {msg.usage.model} via {msg.usage.provider}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isTyping && (
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-sm">
              <Sparkles size={20} />
            </div>
            <div className="bg-indigo-50 p-5 rounded-2xl rounded-tl-none border border-indigo-100 flex gap-2 items-center">
              <span className="text-[10px] font-bold text-indigo-400 uppercase mr-2 tracking-widest">Inference engine active...</span>
              <div className="w-1.5 h-1.5 bg-indigo-300 rounded-full animate-bounce" />
              <div className="w-1.5 h-1.5 bg-indigo-300 rounded-full animate-bounce delay-100" />
              <div className="w-1.5 h-1.5 bg-indigo-300 rounded-full animate-bounce delay-200" />
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-6 bg-slate-50/50 border-t border-slate-50">
        <div className="relative flex items-center max-w-4xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            disabled={isTyping}
            placeholder={isTyping ? "Aguardando resposta da LLM..." : "Digite uma mensagem para testar o agente em produção..."}
            className="w-full pl-6 pr-16 py-5 bg-white border border-slate-200 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-indigo-100 outline-none transition-all shadow-sm disabled:opacity-50"
          />
          <button
            onClick={handleSend}
            disabled={isTyping}
            className="absolute right-3 p-3.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 disabled:bg-slate-300"
          >
            <Send size={24} />
          </button>
        </div>
        <div className="flex justify-center items-center gap-8 mt-4">
           <div className="flex items-center gap-1.5">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
             <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Gateway Prod Ativo</span>
           </div>
           <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
             Latência Estimada: ~240ms
           </div>
           <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
             Custo: 1 Crédito / 100 Tokens
           </div>
        </div>
      </div>
    </div>
  );
}
