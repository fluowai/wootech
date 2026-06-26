import { Users, UserPlus, Search, Shield, Zap, Lock, MoreVertical, Edit2, Ban } from 'lucide-react';

interface ClientsListProps {
  clients: any[];
}

export default function ClientsList({ clients: propClients }: ClientsListProps) {
  const clients = [
    { id: 'cli_1', name: 'Imobiliária Silva', system: 'ImobFlow', credits: 42500, status: 'active', plan: 'Professional', joined: 'Mar 2024' },
    { id: 'cli_2', name: 'Clínica Saúde Total', system: 'WooMed', credits: 12800, status: 'active', plan: 'Basic', joined: 'Jan 2024' },
    { id: 'cli_3', name: 'Prefeitura de SP', system: 'Gabinete', credits: 85400, status: 'active', plan: 'Enterprise', joined: 'Abr 2024' },
    { id: 'cli_4', name: 'Nexus Solutions', system: 'Nexus', credits: 0, status: 'blocked', plan: 'Basic', joined: 'Dez 2023' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center px-1">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Gestão de Clientes</h2>
          <p className="text-sm text-slate-500 font-medium mt-1">Vincule clientes a sistemas e controle saldos de créditos</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-600/10 hover:bg-indigo-700 transition-all">
          <UserPlus size={20} />
          Novo Cliente
        </button>
      </div>

      <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col lg:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
           <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
           <input 
             type="text" 
             placeholder="Buscar por nome, documento ou sistema..." 
             className="w-full pl-12 pr-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-medium outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
           />
        </div>
        <div className="flex gap-3 w-full lg:w-auto">
           <select className="px-6 py-4 bg-slate-50 text-slate-500 rounded-2xl font-bold text-xs uppercase tracking-widest outline-none border-r-8 border-transparent">
              <option>Todos os Sistemas</option>
              <option>Nexus</option>
              <option>ImobFlow</option>
           </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {clients.map((client) => (
          <div key={client.id} className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:border-indigo-200 transition-all group">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="flex items-center gap-6">
                 <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-3xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm font-bold text-xl">
                    {client.name[0]}
                 </div>
                 <div>
                    <h3 className="text-xl font-bold text-slate-800">{client.name}</h3>
                    <div className="flex items-center gap-3 mt-1">
                       <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">{client.system}</span>
                       <div className="w-1 h-1 rounded-full bg-slate-300" />
                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Desde {client.joined}</span>
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 flex-1 lg:max-w-2xl">
                 <div className="space-y-1">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Plano Atual</p>
                    <span className="text-sm font-bold text-slate-800">{client.plan}</span>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Saldo Créditos</p>
                    <div className="flex items-center gap-2">
                       <Zap size={14} className={client.credits > 0 ? 'text-amber-500' : 'text-slate-300'} />
                       <span className={`text-sm font-bold ${client.credits > 1000 ? 'text-emerald-600' : client.credits > 0 ? 'text-slate-800' : 'text-rose-600'}`}>
                          {client.credits.toLocaleString()}
                       </span>
                    </div>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Uso 30d</p>
                    <p className="text-sm font-bold text-slate-800">~ R$ 1.250</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Status Billing</p>
                    <div className="flex items-center gap-2">
                       <div className={`w-2 h-2 rounded-full ${client.status === 'active' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                       <span className={`text-xs font-bold uppercase ${client.status === 'active' ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {client.status === 'active' ? 'Em dia' : 'Bloqueado'}
                       </span>
                    </div>
                 </div>
              </div>

              <div className="flex items-center gap-3">
                 <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-all">
                    <Edit2 size={18} />
                 </button>
                 <button className={`p-3 rounded-xl transition-all ${client.status === 'active' ? 'bg-slate-50 text-slate-400 hover:bg-rose-50 hover:text-rose-600' : 'bg-rose-600 text-white'}`}>
                    <Ban size={18} />
                 </button>
                 <button className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/10">
                    <MoreVertical size={18} />
                 </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
