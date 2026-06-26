import { Shield, LayoutDashboard, Database, Activity, RefreshCw, Layers, Zap, Cpu, Server, Terminal, Globe, Lock } from 'lucide-react';

export default function ModelsManagement() {
  const models = [
    { 
      id: 'm1', 
      name: 'Qwen 2.5 72B Instruct', 
      provider: 'Self-Hosted', 
      engine: 'vLLM', 
      endpoint: 'http://vllm-01:8000', 
      status: 'online', 
      context: '128k', 
      cost: 'R$ 0.02', 
      priority: 1 
    },
    { 
      id: 'm2', 
      name: 'DeepSeek-R1 (Zero)', 
      provider: 'Self-Hosted', 
      engine: 'SGLang', 
      endpoint: 'http://sglang-gpu-02:3000', 
      status: 'online', 
      context: '32k', 
      cost: 'R$ 0.05', 
      priority: 2 
    },
    { 
      id: 'm3', 
      name: 'Llama 3.1 8B', 
      provider: 'Edge Node', 
      engine: 'Ollama', 
      endpoint: 'http://office-pi:11434', 
      status: 'offline', 
      context: '8k', 
      cost: 'R$ 0.00', 
      priority: 3 
    },
    { 
      id: 'm4', 
      name: 'Gemini 1.5 Pro', 
      provider: 'Google Cloud', 
      engine: 'External', 
      endpoint: 'https://generativelanguage...', 
      status: 'online', 
      context: '1M', 
      cost: 'R$ 0.15', 
      priority: 10 
    },
  ];

  const engines = [
    { name: 'vLLM', icon: Cpu, status: 'Active', load: '65%', instances: 3, color: 'indigo' },
    { name: 'Ollama', icon: Server, status: 'Idle', load: '12%', instances: 1, color: 'emerald' },
    { name: 'SGLang', icon: Activity, status: 'Active', load: '84%', instances: 2, color: 'rose' },
    { name: 'llama.cpp', icon: Terminal, status: 'Active', load: '45%', instances: 1, color: 'amber' },
  ];

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center px-1">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Infraestrutura de Modelos</h2>
          <p className="text-sm text-slate-500 font-medium mt-1">Orquestração de motores de inferência MEXUS AI</p>
        </div>
        <div className="flex gap-3">
          <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-indigo-600 transition-all">
            <RefreshCw size={20} />
          </button>
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-indigo-700 transition-all">
            Adicionar Modelo
          </button>
        </div>
      </div>

      {/* Engine Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {engines.map((eng) => (
          <div key={eng.name} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm group">
            <div className="flex justify-between items-start mb-6">
               <div className={`p-4 bg-${eng.color}-50 text-${eng.color}-600 rounded-2xl group-hover:scale-110 transition-all shadow-sm`}>
                  <eng.icon size={24} />
               </div>
               <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                 eng.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'
               }`}>
                 {eng.status}
               </div>
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-4">{eng.name} Engine</h3>
            <div className="space-y-3">
               <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Carga GPU</span>
                  <span className="text-xs font-bold text-slate-700">{eng.load}</span>
               </div>
               <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className={`bg-${eng.color}-500 h-full rounded-full transition-all duration-1000`} style={{ width: eng.load }} />
               </div>
               <div className="flex justify-between items-center pt-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Instâncias</span>
                  <span className="text-xs font-bold text-slate-700">{eng.instances} Nodes</span>
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* Models Table */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex justify-between items-center">
           <h3 className="text-lg font-bold text-slate-800">Modelos Registrados</h3>
           <div className="flex gap-2">
              <button className="px-4 py-2 bg-slate-50 text-slate-400 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-indigo-50 hover:text-indigo-600 transition-all">Configurar Roteamento</button>
           </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-50">
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Modelo / ID</th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Provider / Engine</th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Endpoint</th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Status</th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {models.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50/50 transition-all group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl ${m.provider === 'Self-Hosted' ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-50 text-slate-400'}`}>
                        <Cpu size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{m.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{m.context} Contexto</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                       <span className="text-xs font-bold text-slate-700">{m.provider}</span>
                       <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mt-0.5">{m.engine}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <code className="text-[10px] font-bold text-slate-500 bg-slate-50 px-3 py-1 rounded-lg border border-slate-100">{m.endpoint}</code>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-all shadow-sm">
                       <div className={`w-2 h-2 rounded-full ${m.status === 'online' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
                       <span className={m.status === 'online' ? 'text-emerald-600' : 'text-slate-400'}>{m.status}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 bg-slate-50 text-slate-400 rounded-xl hover:bg-indigo-600 hover:text-white transition-all">
                      <Terminal size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Gateway Info */}
      <div className="bg-indigo-600 rounded-[3rem] p-12 text-white flex flex-col lg:flex-row items-center gap-12 relative overflow-hidden group">
         <div className="relative z-10 flex-1">
            <div className="flex items-center gap-4 mb-6">
               <div className="p-3 bg-white/20 rounded-2xl">
                  <Layers size={28} />
               </div>
               <h2 className="text-2xl font-bold">LiteLLM Unified Gateway</h2>
            </div>
            <p className="text-indigo-100 text-lg leading-relaxed mb-8 max-w-xl">
               Nossa arquitetura MEXUS utiliza o LiteLLM para prover uma única API compatível com OpenAI. Isso permite troca de modelos a quente e failover inteligente entre Ollama e vLLM.
            </p>
            <div className="flex gap-4">
               <button className="bg-white text-indigo-600 px-8 py-4 rounded-2xl font-bold shadow-2xl hover:bg-indigo-50 transition-all">
                  Configurar LiteLLM
               </button>
               <button className="bg-indigo-500/30 text-white px-8 py-4 rounded-2xl font-bold border border-indigo-400/30 hover:bg-indigo-500/50 transition-all">
                  Documentação API
               </button>
            </div>
         </div>
         <div className="relative z-10 w-full lg:w-96 bg-white rounded-[2.5rem] p-8 border border-indigo-100 shadow-3xl text-slate-800">
            <h3 className="text-sm font-bold text-slate-800 mb-6 uppercase tracking-widest flex items-center gap-3">
               <Lock size={16} className="text-indigo-600" />
               Endpoints Seguros
            </h3>
            <div className="space-y-4">
               <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Local Gateway</p>
                  <code className="text-xs text-indigo-600 font-bold">http://localhost:3200/chat</code>
               </div>
               <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">LiteLLM Proxy</p>
                  <code className="text-xs text-emerald-600 font-bold">http://localhost:4000/v1</code>
               </div>
               <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Embedding Node</p>
                  <code className="text-xs text-amber-600 font-bold">http://localhost:6333</code>
               </div>
            </div>
         </div>
         <Zap size={300} className="absolute -right-20 -bottom-20 text-white/5 group-hover:scale-105 transition-transform" />
      </div>
    </div>
  );
}
