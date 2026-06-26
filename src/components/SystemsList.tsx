import { Shield, ExternalLink, MoreVertical } from 'lucide-react';
import { AISystem } from '../types';

export default function SystemsList({ systems }: { systems: AISystem[] }) {
  return (
    <div className="space-y-4 pb-20 lg:pb-0">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2 px-1">
        <h2 className="text-xl font-bold text-slate-800">Sistemas Conectados</h2>
        <button className="w-full sm:w-auto bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-indigo-700 transition-all">
          Registrar Novo Sistema
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 text-slate-400 text-[10px] uppercase tracking-widest font-bold">
              <th className="px-6 py-5">Nome do Sistema</th>
              <th className="px-6 py-5">Status</th>
              <th className="px-6 py-5">Chave API</th>
              <th className="px-6 py-5 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {systems.map((system) => (
              <tr key={system.id} className="hover:bg-indigo-50/30 transition-colors">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                      <Shield size={18} />
                    </div>
                    <div>
                      <div className="font-bold text-slate-800">{system.name}</div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase">ID: {system.slug}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    system.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                  }`}>
                    {system.status === 'active' ? 'Ativo' : 'Inativo'}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <code className="text-xs bg-slate-100 px-3 py-1 rounded-lg text-slate-500 font-bold">
                    {system.apiKey.substring(0, 8)}••••
                  </code>
                </td>
                <td className="px-6 py-5 text-right">
                  <div className="flex justify-end gap-1">
                    <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                      <ExternalLink size={18} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List */}
      <div className="lg:hidden space-y-4">
        {systems.map((system) => (
          <div key={system.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                  <Shield size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">{system.name}</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">{system.slug}</p>
                </div>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                system.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
              }`}>
                {system.status === 'active' ? 'Ativo' : 'Inativo'}
              </span>
            </div>
            <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl">
              <code className="text-[10px] text-slate-500 font-bold">{system.apiKey.substring(0, 12)}••••</code>
              <button className="text-indigo-600 font-bold text-[10px] uppercase">Copiar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
