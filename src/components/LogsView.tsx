import { useState } from 'react';
import { History, Search, Filter, MessageSquare, Cpu, Zap, Activity, Clock, ChevronDown, ExternalLink, Bot, Globe } from 'lucide-react';

export default function LogsView() {
  const [searchTerm, setSearchTerm] = useState('');

  const logs = [
    { 
      id: 'log_1', 
      user: 'João Silva', 
      client: 'Imobiliária Silva', 
      system: 'ImobFlow', 
      agent: 'Corretor Digital', 
      model: 'DeepSeek-V3', 
      tokens: 850, 
      credits: 3, 
      latency: '1.2s', 
      time: '2 min atrás',
      message: 'Gostaria de saber o preço do imóvel no Itaim Bibi...'
    },
    { 
      id: 'log_2', 
      user: 'Maria Costa', 
      client: 'Clínica Saúde', 
      system: 'WooMed', 
      agent: 'Agendamento', 
      model: 'Qwen-2.5', 
      tokens: 420, 
      credits: 1, 
      latency: '0.8s', 
      time: '15 min atrás',
      message: 'Qual o horário disponível para amanhã?'
    },
    { 
      id: 'log_3', 
      user: 'Carlos Alberto', 
      client: 'Prefeitura SP', 
      system: 'Gabinete', 
      agent: 'Jurídico', 
      model: 'Llama-3.1', 
      tokens: 1840, 
      credits: 6, 
      latency: '2.4s', 
      time: '1h atrás',
      message: 'Resuma os pontos principais do projeto de lei 123/24...'
    },
  ];

  return (
    <div className="space-y-8">
      {/* Filters Bar */}
      <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col lg:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
           <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
           <input 
             type="text" 
             placeholder="Buscar nos logs (cliente, mensagem, modelo)..." 
             className="w-full pl-12 pr-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-medium outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
           />
        </div>
        <div className="flex gap-3 w-full lg:w-auto">
           <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-4 bg-slate-50 text-slate-500 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-slate-100 transition-all">
              <Filter size={16} />
              Filtros
           </button>
           <button className="flex-1 lg:flex-none px-6 py-4 bg-slate-900 text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10">
              Exportar CSV
           </button>
        </div>
      </div>

      {/* Logs List */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-50">
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Evento / Tempo</th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Origem</th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Agente / Modelo</th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Consumo</th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/50 transition-all group">
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-800 truncate max-w-[300px]">"{log.message}"</span>
                      <div className="flex items-center gap-2 mt-1">
                         <Clock size={12} className="text-slate-300" />
                         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{log.time}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-700">{log.client}</span>
                      <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">{log.system}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                        <Bot size={16} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-700">{log.agent}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{log.model}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col items-center">
                       <div className="flex items-center gap-2 text-[10px] font-bold text-indigo-500 uppercase">
                          <Cpu size={12} />
                          {log.tokens} tkn
                       </div>
                       <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-500 uppercase mt-1">
                          <Zap size={12} />
                          {log.credits} cr
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 bg-slate-50 text-slate-400 rounded-xl hover:bg-indigo-600 hover:text-white transition-all opacity-0 group-hover:opacity-100">
                      <ExternalLink size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-8 border-t border-slate-50 flex justify-between items-center bg-slate-50/20">
           <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Mostrando 1-20 de 12,842 eventos</p>
           <div className="flex gap-2">
              <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-400 hover:bg-slate-50 transition-all">Anterior</button>
              <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all">Próximo</button>
           </div>
        </div>
      </div>
    </div>
  );
}
