import { useState } from 'react';
import { Database, Upload, FileText, CheckCircle2, Clock, AlertCircle, Search, Plus, Trash2, ArrowLeft, Zap, Sparkles, Brain, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function KnowledgeBase() {
  const [selectedKb, setSelectedKb] = useState<any>(null);

  const kbs = [
    { id: 'kb1', name: 'Documentação Técnica Nexus', system: 'Nexus', docs: 124, status: 'synced', size: '1.2GB' },
    { id: 'kb2', name: 'Imóveis Luxo SP', system: 'ImobFlow', docs: 850, status: 'syncing', size: '4.8GB' },
    { id: 'kb3', name: 'Protocolos Clínicos', system: 'WooMed', docs: 45, status: 'synced', size: '250MB' },
    { id: 'kb4', name: 'Leis Municipais', system: 'Gabinete', docs: 2100, status: 'error', size: '8.4GB' },
  ];

  if (selectedKb) {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center gap-6 mb-10">
          <button 
            onClick={() => setSelectedKb(null)}
            className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all shadow-sm"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">{selectedKb.name}</h2>
            <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mt-1">/{selectedKb.id} • {selectedKb.system}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 space-y-8">
              {/* Upload Area */}
              <div className="bg-white p-12 rounded-[2.5rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center group hover:border-indigo-300 hover:bg-indigo-50/10 transition-all cursor-pointer">
                 <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all">
                    <Upload size={36} />
                 </div>
                 <h3 className="text-xl font-bold text-slate-800 mb-2">Arraste seus documentos</h3>
                 <p className="text-sm text-slate-500 max-w-sm font-medium">Suporta PDF, DOCX, TXT, CSV, Áudios (Whisper) e Imagens (OCR GOT).</p>
                 <button className="mt-8 bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg shadow-indigo-600/20">Selecionar Arquivos</button>
              </div>

              {/* Docs List */}
              <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                 <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                    <h3 className="font-bold text-slate-800">Arquivos Indexados</h3>
                    <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl">
                       <Search size={16} className="text-slate-400" />
                       <input type="text" placeholder="Buscar no índice..." className="bg-transparent text-xs font-bold outline-none w-48" />
                    </div>
                 </div>
                 <div className="divide-y divide-slate-50">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-all">
                         <div className="flex items-center gap-4">
                            <div className="p-3 bg-slate-50 text-slate-400 rounded-xl">
                               <FileText size={20} />
                            </div>
                            <div>
                               <p className="text-sm font-bold text-slate-800">tabela_precos_v2024_{i}.pdf</p>
                               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">PDF • 1.2MB • {i}h atrás</p>
                            </div>
                         </div>
                         <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold uppercase">
                               <CheckCircle2 size={12} />
                               Indexado
                            </div>
                            <button className="text-slate-300 hover:text-rose-500 transition-all">
                               <Trash2 size={18} />
                            </button>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           <div className="space-y-8">
              {/* RAG Preview / Test */}
              <div className="bg-slate-900 rounded-[2.5rem] p-8 border border-slate-800 shadow-2xl">
                 <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 bg-indigo-600 rounded-xl text-white">
                       <Brain size={20} />
                    </div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-widest">Teste de Recuperação</h3>
                 </div>
                 <div className="space-y-6">
                    <textarea 
                      placeholder="Faça uma pergunta para a base..."
                      className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-4 text-white text-sm outline-none h-32 focus:ring-2 focus:ring-indigo-500"
                    />
                    <button className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-sm shadow-lg shadow-indigo-600/20 hover:bg-indigo-700">
                       Simular Busca Semântica
                    </button>
                    
                    <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
                       <div className="flex items-center gap-2 mb-3">
                          <Activity size={14} className="text-indigo-400" />
                          <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Score de Relevância</span>
                       </div>
                       <div className="text-xs text-slate-400 font-medium italic leading-relaxed">
                          Aguardando entrada para buscar no Qdrant...
                       </div>
                    </div>
                 </div>
              </div>

              <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                 <h3 className="text-sm font-bold text-slate-800 mb-6 uppercase tracking-widest">Estatísticas do Banco Vetorial</h3>
                 <div className="space-y-6">
                    <div className="flex justify-between items-center">
                       <span className="text-xs font-bold text-slate-400 uppercase">Motor</span>
                       <span className="text-xs font-bold text-indigo-600 uppercase">Qdrant Cloud</span>
                    </div>
                    <div className="flex justify-between items-center">
                       <span className="text-xs font-bold text-slate-400 uppercase">Embeddings</span>
                       <span className="text-xs font-bold text-slate-700">BGE-M3 (1024d)</span>
                    </div>
                    <div className="flex justify-between items-center">
                       <span className="text-xs font-bold text-slate-400 uppercase">Total de Chunks</span>
                       <span className="text-xs font-bold text-slate-700">12.450</span>
                    </div>
                    <div className="flex justify-between items-center">
                       <span className="text-xs font-bold text-slate-400 uppercase">Latência RAG</span>
                       <span className="text-xs font-bold text-emerald-500">42ms</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center px-1">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Base de Conhecimento RAG</h2>
          <p className="text-sm text-slate-500 font-medium mt-1">Gerencie corpora de documentos e vetores MEXUS</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-600/10 hover:bg-indigo-700 transition-all">
          <Plus size={20} />
          Criar Nova Base
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kbs.map((kb) => (
          <div 
            key={kb.id} 
            onClick={() => setSelectedKb(kb)}
            className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:border-indigo-300 transition-all cursor-pointer group"
          >
            <div className="flex justify-between items-start mb-8">
               <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:scale-110 transition-all">
                  <Database size={24} />
               </div>
               <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                 kb.status === 'synced' ? 'bg-emerald-50 text-emerald-600' : 
                 kb.status === 'syncing' ? 'bg-amber-50 text-amber-600 animate-pulse' : 
                 'bg-rose-50 text-rose-600'
               }`}>
                 {kb.status === 'synced' ? 'Sincronizado' : kb.status === 'syncing' ? 'Indexando' : 'Erro'}
               </span>
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2 leading-tight">{kb.name}</h3>
            <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-6">{kb.system}</p>
            
            <div className="flex justify-between items-center pt-6 border-t border-slate-50">
               <div>
                 <p className="text-[10px] text-slate-400 font-bold uppercase">Documentos</p>
                 <p className="text-sm font-bold text-slate-700">{kb.docs}</p>
               </div>
               <div>
                 <p className="text-[10px] text-slate-400 font-bold uppercase">Tamanho</p>
                 <p className="text-sm font-bold text-slate-700 text-right">{kb.size}</p>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
