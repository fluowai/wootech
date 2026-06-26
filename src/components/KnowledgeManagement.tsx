import { useState, useEffect } from 'react';
import { Database, Upload, FileText, CheckCircle2, Clock, AlertCircle, Search, Plus, Trash2, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { KnowledgeBase, KnowledgeDocument } from '../types';
import { adminApi } from '../lib/api';

export default function KnowledgeManagement() {
  const [knowledgeBases, setKnowledgeBases] = useState<KnowledgeBase[]>([]);
  const [selectedKb, setSelectedKb] = useState<KnowledgeBase | null>(null);
  const [documents, setDocuments] = useState<KnowledgeDocument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi.getKnowledgeBases().then(data => {
      setKnowledgeBases(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (selectedKb) {
      setDocuments([]);
      adminApi.getKnowledgeDocuments(selectedKb.id).then(setDocuments);
    }
  }, [selectedKb]);

  if (loading) return <div className="p-8 text-center text-slate-400 font-medium">Carregando bases...</div>;

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      {!selectedKb ? (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-1">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Base de Conhecimento</h2>
              <p className="text-xs text-slate-500 font-medium">Gerencie o cérebro dos seus agentes RAG</p>
            </div>
            <button className="w-full sm:w-auto bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-indigo-700 transition-all flex items-center justify-center gap-2">
              <Plus size={18} />
              Nova Base
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {knowledgeBases.map((kb) => (
              <motion.div
                key={kb.id}
                whileHover={{ y: -4 }}
                onClick={() => setSelectedKb(kb)}
                className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm cursor-pointer group hover:border-indigo-200 transition-all"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                    <Database size={24} />
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Documentos</div>
                    <div className="text-xl font-bold text-slate-800">{kb.documentCount}</div>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{kb.name}</h3>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-6">
                  {kb.description}
                </p>
                <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-wider">
                    {kb.status}
                  </span>
                  <span className="text-indigo-600 text-xs font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Gerenciar <Plus size={14} />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center gap-4 mb-6">
            <button 
              onClick={() => setSelectedKb(null)}
              className="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h2 className="text-xl font-bold text-slate-800">{selectedKb.name}</h2>
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                <span>Coleção Qdrant: {selectedKb.id}</span>
                <span className="w-1 h-1 bg-slate-300 rounded-full" />
                <span className="text-emerald-500">Sincronizado</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                  <h3 className="font-bold text-slate-800">Documentos Indexados</h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <input 
                      type="text" 
                      placeholder="Buscar docs..." 
                      className="pl-9 pr-4 py-1.5 bg-white border border-slate-100 rounded-lg text-xs outline-none focus:ring-2 focus:ring-indigo-100"
                    />
                  </div>
                </div>
                <div className="divide-y divide-slate-50">
                  {documents.map((doc) => (
                    <div key={doc.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-xl ${doc.fileType === 'PDF' ? 'bg-rose-50 text-rose-500' : 'bg-blue-50 text-blue-500'}`}>
                          <FileText size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800">{doc.fileName}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">{doc.fileType} • {new Date(doc.createdAt).toLocaleDateString('pt-BR')}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          {doc.status === 'indexed' ? (
                            <>
                              <CheckCircle2 size={16} className="text-emerald-500" />
                              <span className="text-[10px] font-bold text-emerald-600 uppercase">Indexado</span>
                            </>
                          ) : (
                            <>
                              <Clock size={16} className="text-amber-500 animate-spin" />
                              <span className="text-[10px] font-bold text-amber-600 uppercase">Processando</span>
                            </>
                          )}
                        </div>
                        <button className="p-2 text-slate-300 hover:text-rose-500 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-indigo-600 p-8 rounded-3xl text-white shadow-lg shadow-indigo-100 relative overflow-hidden">
                <Upload className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10" />
                <h3 className="text-lg font-bold mb-2">Upload de Arquivos</h3>
                <p className="text-indigo-100 text-xs leading-relaxed mb-6">
                  Arraste PDFs ou TXTs para adicionar novos conhecimentos à base.
                </p>
                <div className="border-2 border-dashed border-indigo-400/50 rounded-2xl p-8 flex flex-col items-center justify-center bg-indigo-500/30 hover:bg-indigo-500/50 transition-all cursor-pointer">
                  <Upload size={32} className="mb-2" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Clique ou Arraste</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <AlertCircle size={18} className="text-indigo-500" />
                  Status do Qdrant
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-medium">Uptime</span>
                    <span className="font-bold text-slate-800">99.9%</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-medium">Vetores</span>
                    <span className="font-bold text-slate-800">45.2k</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-medium">Latência Busca</span>
                    <span className="font-bold text-emerald-500">12ms</span>
                  </div>
                  <div className="pt-2">
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-indigo-500 h-full w-[70%]" />
                    </div>
                    <div className="flex justify-between mt-2 text-[10px] font-bold text-slate-400 uppercase">
                      <span>Espaço em Disco</span>
                      <span>70%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
