import { LayoutDashboard, Shield, Users, Bot, CreditCard, History, Settings, MessageCircle, Database, Terminal, Cpu, Zap, Activity, Menu, X, Wand2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'systems', label: 'Sistemas', icon: Shield },
    { id: 'clients', label: 'Clientes', icon: Users },
    { id: 'agents', label: 'Agentes', icon: Bot },
    { id: 'models', label: 'Modelos', icon: Cpu },
    { id: 'knowledge', label: 'Base RAG', icon: Database },
    { id: 'studio', label: 'Image Studio', icon: Wand2 },
    { id: 'visual', label: 'Creative Studio', icon: Zap },
    { id: 'billing', label: 'Planos', icon: CreditCard },
    { id: 'chat', label: 'Playground', icon: Terminal },
    { id: 'logs', label: 'Logs', icon: History },
  ];

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-100 px-6 flex items-center justify-between z-50">
        <div className="flex items-center gap-2">
          <Zap size={20} className="text-indigo-600" fill="currentColor" />
          <span className="font-bold text-slate-800 tracking-tight">MEXUS AI</span>
        </div>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-slate-500 hover:bg-slate-50 rounded-xl transition-all"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[60] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Content */}
      <div className={`
        fixed inset-y-0 left-0 w-72 bg-white flex flex-col border-r border-slate-100 z-[70] transition-transform duration-300 lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-8 hidden lg:flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <Zap size={24} fill="currentColor" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">MEXUS AI</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Core Intelligence</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-4 lg:py-0 space-y-1 overflow-y-auto mt-16 lg:mt-0">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all group ${
                activeTab === item.id
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-indigo-600'
              }`}
            >
              <item.icon size={20} className={activeTab === item.id ? 'text-white' : 'text-slate-400 group-hover:text-indigo-600'} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-50">
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <div className="flex items-center gap-3 mb-3">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Infra Online</span>
            </div>
            <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-2">
               <span>Tokens/Seg</span>
               <span className="text-indigo-600">842 t/s</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1">
              <div className="bg-indigo-500 h-1 rounded-full w-[65%]" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
