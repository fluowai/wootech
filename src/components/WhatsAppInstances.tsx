import { MessageSquare, Signal, SignalLow, Power } from 'lucide-react';

export default function WhatsAppInstances() {
  const instances = [
    { id: 'inst_1', name: 'WhatsApp ImobFlow', status: 'connected', quality: 'high', mps: '2.5 msg/s' },
    { id: 'inst_2', name: 'WhatsApp WooMed', status: 'connected', quality: 'high', mps: '1.2 msg/s' },
    { id: 'inst_3', name: 'WhatsApp Gabinete', status: 'disconnected', quality: 'none', mps: '0 msg/s' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2 px-1">
        <h2 className="text-xl font-bold text-slate-800">Instâncias WhatsApp (WhatsMeow)</h2>
        <button className="bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm">
          Nova Instância
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {instances.map((inst) => (
          <div key={inst.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                <MessageSquare size={24} />
              </div>
              <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                inst.status === 'connected' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
              }`}>
                <div className={`w-1.5 h-1.5 rounded-full ${inst.status === 'connected' ? 'bg-emerald-500' : 'bg-rose-500'} animate-pulse`} />
                {inst.status === 'connected' ? 'Conectado' : 'Desconectado'}
              </div>
            </div>
            <h3 className="font-bold text-slate-800 mb-1">{inst.name}</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase mb-4">Velocidade: {inst.mps}</p>
            
            <div className="flex justify-between items-center pt-4 border-t border-slate-50">
              <div className="flex items-center gap-2">
                {inst.quality === 'high' ? <Signal size={16} className="text-emerald-500" /> : <SignalLow size={16} className="text-rose-500" />}
                <span className="text-[10px] font-bold text-slate-400 uppercase">Qualidade</span>
              </div>
              <button className={`p-2 rounded-lg transition-all ${
                inst.status === 'connected' ? 'bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white' : 'bg-emerald-50 text-emerald-500 hover:bg-emerald-500 hover:text-white'
              }`}>
                <Power size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
