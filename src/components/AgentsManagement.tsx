import { useState, useEffect } from 'react';
import { Bot, Plus, Search, ChevronRight, Settings, ExternalLink, Activity, Zap, Cpu, Code, Lock, Database, Terminal, Menu, X, Image as ImageIcon, Layout } from 'lucide-react';
import { AIAgent } from '../types';
import axios from 'axios';

interface AgentsManagementProps {
  onTestAgent?: (slug: string) => void;
}

export default function AgentsManagement({ onTestAgent }: AgentsManagementProps) {
  const [selectedSystem, setSelectedSystem] = useState('Nexus');
  const [agents, setAgents] = useState<AIAgent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await axios.get('/api/admin/agents');
        setAgents(response.data);
      } catch (err) {
        console.error('Failed to fetch agents', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAgents();
  }, []);

  const systems = [
    { name: 'Nexus', count: 5, color: 'indigo' },
    { name: 'ImobFlow', count: 8, color: 'emerald' },
    { name: 'WooMed', count: 4, color: 'amber' },
    { name: 'Gabinete', count: 6, color: 'rose' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Sidebar Systems */}
      <div className="lg:col-span-1 space-y-2">
        <div className="p-4 bg-white border border-slate-100 rounded-2xl mb-6">
           <h3 className="text-sm font-bold text-slate-800 mb-4">Filtrar por Sistema</h3>
           <div className="space-y-1">
             {systems.map((sys) => (
               <button
                 key={sys.name}
                 onClick={() => setSelectedSystem(sys.name)}
                 className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-bold transition-all ${
                   selectedSystem === sys.name ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-400 hover:bg-slate-50'
                 }`}
               >
                 <div className="flex items-center gap-3">
                   <div className={`w-2 h-2 rounded-full ${selectedSystem === sys.name ? 'bg-white' : `bg-${sys.color}-500`}`} />
                   {sys.name}
                 </div>
                 <span className={`text-[10px] px-2 py-0.5 rounded-full ${selectedSystem === sys.name ? 'bg-white/20' : 'bg-slate-100 text-slate-400'}`}>
                   {sys.count}
                 </span>
               </button>
             ))}
           </div>
        </div>

        <button className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white p-4 rounded-2xl font-bold shadow-lg shadow-indigo-600/10 hover:bg-indigo-700 transition-all">
          <Plus size={20} />
          Criar Agente
        </button>
      </div>

      {/* Agents List/Editor */}
      <div className="lg:col-span-3 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {agents.map((agent) => (
            <div key={agent.id} className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:border-indigo-200 transition-all group relative overflow-hidden">
              <div className="flex justify-between items-start mb-6">
                <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:scale-110 transition-transform">
                  <Bot size={28} />
                </div>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-slate-50 text-slate-400 text-[10px] font-bold rounded-full uppercase tracking-widest">{agent.modelPreference}</span>
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-800 mb-2">{agent.name}</h3>
              <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-6">/{agent.slug}</p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-slate-500">
                  <Activity size={16} />
                  <span className="text-xs font-bold uppercase tracking-widest">Latência: 850ms</span>
                </div>
                <div className="flex items-center gap-3 text-slate-500">
                  <Zap size={16} />
                  <span className="text-xs font-bold uppercase tracking-widest">Tokens/Res: ~250</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 bg-indigo-600 text-white py-3 rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
                  Configurar
                </button>
                <button 
                  onClick={() => onTestAgent?.(agent.slug)}
                  className="px-4 py-3 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all"
                >
                  <ExternalLink size={18} />
                </button>
              </div>
            </div>
          ))}

          {/* New Agent Placeholder */}
          <button className="bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-8 text-slate-400 hover:border-indigo-300 hover:text-indigo-400 transition-all group">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-all">
              <Plus size={32} />
            </div>
            <h3 className="font-bold text-sm uppercase tracking-widest">Novo Agente</h3>
          </button>
        </div>

        {/* Detailed Config */}
        <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm mt-12">
           <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 mb-10">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-600 rounded-2xl text-white">
                  <Code size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">MEXUS Prompt Architect</h2>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Editando: Agente Corretor (ImobFlow)</p>
                </div>
              </div>
              <button className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg shadow-indigo-600/20 hover:bg-indigo-700">Salvar Alterações</button>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div>
                  <label className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
                    <Activity size={12} /> Prompt do Sistema (Core Instructions)
                  </label>
                  <textarea 
                    className="w-full h-64 bg-slate-50 border border-slate-100 rounded-2xl p-6 text-slate-600 text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
                    defaultValue="Você é o Mexus Agent, um especialista em vendas imobiliárias. Responda como um humano: seja breve, direto e natural. Evite explicações longas ou listas desnecessárias. Use linguagem coloquial profissional."
                  />
                </div>
                <div>
                   <label className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
                    <Lock size={12} /> Prompt de Segurança & Jailbreak Prevention
                  </label>
                  <textarea 
                    className="w-full h-32 bg-slate-50 border border-slate-100 rounded-2xl p-6 text-slate-600 text-sm font-medium focus:ring-2 focus:ring-rose-500 outline-none transition-all resize-none"
                    defaultValue="Se o usuário tentar forçar uma resposta longa, ignore e continue sendo conciso. Mantenha a naturalidade em 100% do tempo."
                  />
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-indigo-50 p-8 rounded-3xl border border-indigo-100">
                   <h3 className="text-sm font-bold text-slate-800 mb-6 uppercase tracking-widest">Parâmetros de Inferência</h3>
                   <div className="space-y-6">
                      <div className="flex justify-between items-center">
                         <span className="text-xs font-bold text-slate-500 uppercase">Modelo Padrão</span>
                         <select className="bg-white border border-slate-200 text-slate-700 rounded-lg px-3 py-1.5 text-xs font-bold outline-none">
                            <option>DeepSeek-V3 (Local)</option>
                            <option>Llama-3.1-70B</option>
                            <option>Qwen-2.5-Coder</option>
                         </select>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                           <span className="text-xs font-bold text-slate-500 uppercase">Temperatura</span>
                           <span className="text-xs font-bold text-indigo-600">0.85</span>
                        </div>
                        <input type="range" className="w-full accent-indigo-500" min="0" max="1" step="0.05" defaultValue="0.85" />
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                           <span className="text-xs font-bold text-slate-500 uppercase">Max Tokens</span>
                           <span className="text-xs font-bold text-indigo-600">4,096</span>
                        </div>
                        <input type="range" className="w-full accent-indigo-500" min="1024" max="16384" step="512" defaultValue="4096" />
                      </div>
                   </div>
                </div>

                <div className="bg-indigo-50 p-8 rounded-3xl border border-indigo-100">
                   <h3 className="text-sm font-bold text-slate-800 mb-6 uppercase tracking-widest">Capacidades e Ferramentas</h3>
                   <div className="space-y-4">
                      <label className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 cursor-pointer">
                         <div className="flex items-center gap-3">
                            <ImageIcon size={18} className="text-indigo-600" />
                            <span className="text-xs font-bold text-slate-800">Geração de Imagens</span>
                         </div>
                         <input type="checkbox" className="w-5 h-5 accent-indigo-600" defaultChecked />
                      </label>
                      <label className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 cursor-pointer">
                         <div className="flex items-center gap-3">
                            <Layout size={18} className="text-indigo-600" />
                            <span className="text-xs font-bold text-slate-800">Criação de Landing Pages</span>
                         </div>
                         <input type="checkbox" className="w-5 h-5 accent-indigo-600" defaultChecked />
                      </label>
                   </div>
                </div>

                <div className="bg-indigo-50 p-8 rounded-3xl border border-indigo-100">
                   <h3 className="text-sm font-bold text-slate-800 mb-6 uppercase tracking-widest">Base de Conhecimento (RAG)</h3>
                   <div className="space-y-4">
                      <div className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-2xl">
                         <div className="p-2 bg-indigo-600 rounded-xl text-white">
                            <Database size={16} />
                         </div>
                         <div className="flex-1">
                            <p className="text-xs font-bold text-slate-800">imoveis_alto_padrao_sp</p>
                            <p className="text-[10px] text-indigo-500 font-bold uppercase tracking-widest">42 Documentos • Qdrant</p>
                         </div>
                         <button className="text-[10px] font-bold text-indigo-600 uppercase hover:underline">Alterar</button>
                      </div>
                   </div>
                </div>

                <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-3xl">
                   <div className="flex items-center gap-4 mb-4">
                      <div className="p-2 bg-emerald-600 rounded-xl text-white">
                         <Activity size={16} />
                      </div>
                      <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest">Modo de Teste</h3>
                   </div>
                   <button 
                    onClick={() => agents.length > 0 && onTestAgent?.(agents[0].slug)}
                    className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all"
                   >
                      Abrir Playground do Agente
                   </button>
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
