import { Shield, Zap, Key, Activity, Trash2, Edit3, Plus, Globe } from 'lucide-react';

export default function SystemsManagement() {
  const systems = [
    { id: 'nexus', name: 'Nexus Core', slug: 'nexus', apiKey: 'sk_nexus_845...x92', status: 'active', clients: 142, usage: '8.4M tokens' },
    { id: 'imobflow', name: 'ImobFlow', slug: 'imobflow', apiKey: 'sk_imob_721...w41', status: 'active', clients: 85, usage: '12.1M tokens' },
    { id: 'woomed', name: 'WooMed AI', slug: 'woomed', apiKey: 'sk_med_102...k88', status: 'active', clients: 42, usage: '2.4M tokens' },
    { id: 'gabinete', name: 'Gabinete Digital', slug: 'gabinete', apiKey: 'sk_gab_334...m12', status: 'active', clients: 28, usage: '4.1M tokens' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center px-1">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Sistemas Conectados</h2>
          <p className="text-sm text-slate-500 font-medium mt-1">Gerencie instâncias MEXUS e suas chaves de API</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-600/10 hover:bg-indigo-700 transition-all">
          <Plus size={20} />
          Registrar Novo Sistema
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {systems.map((sys) => (
          <div key={sys.id} className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:border-indigo-200 transition-all group">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="flex items-center gap-6">
                 <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-3xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                    <Shield size={32} />
                 </div>
                 <div>
                    <h3 className="text-xl font-bold text-slate-800">{sys.name}</h3>
                    <div className="flex items-center gap-3 mt-1">
                       <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">Slug: {sys.slug}</span>
                       <div className="w-1 h-1 rounded-full bg-slate-300" />
                       <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Sistema Operacional</span>
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 flex-1 lg:max-w-2xl">
                 <div className="space-y-1">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">API Key</p>
                    <div className="flex items-center gap-2">
                       <code className="text-xs font-bold text-slate-600 bg-slate-50 px-2 py-1 rounded-lg">{sys.apiKey}</code>
                       <button className="text-slate-300 hover:text-indigo-600"><Key size={14} /></button>
                    </div>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Clientes</p>
                    <p className="text-sm font-bold text-slate-800">{sys.clients}</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Uso Acumulado</p>
                    <p className="text-sm font-bold text-slate-800">{sys.usage}</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Status</p>
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-emerald-500" />
                       <span className="text-xs font-bold text-slate-700 uppercase">Ativo</span>
                    </div>
                 </div>
              </div>

              <div className="flex items-center gap-3">
                 <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-all">
                    <Edit3 size={18} />
                 </button>
                 <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-rose-50 hover:text-rose-600 transition-all">
                    <Trash2 size={18} />
                 </button>
                 <button className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/10">
                    <Globe size={18} />
                 </button>
              </div>
            </div>
          </div>
        ))}

        <div className="bg-indigo-600 p-12 rounded-[3rem] text-white flex flex-col items-center justify-center text-center relative overflow-hidden group">
           <div className="relative z-10">
              <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-all">
                 <Zap size={36} fill="white" />
              </div>
              <h2 className="text-3xl font-bold mb-4">MEXUS Multi-Tenant Ready</h2>
              <p className="text-indigo-100 max-w-md mx-auto text-lg leading-relaxed">
                 Adicione novos ecossistemas em segundos. Chaves de API isoladas e billing independente por sistema.
              </p>
              <button className="mt-10 bg-white text-indigo-600 px-10 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:bg-indigo-50 transition-all">
                 Configurar Nova Instância
              </button>
           </div>
           <Activity size={240} className="absolute -right-20 -bottom-20 text-white/5 group-hover:scale-110 transition-all" />
        </div>
      </div>
    </div>
  );
}
