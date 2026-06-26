/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import DashboardOverview from './components/DashboardOverview';
import SystemsManagement from './components/SystemsManagement';
import ClientsList from './components/ClientsList';
import AgentsManagement from './components/AgentsManagement';
import ModelsManagement from './components/ModelsManagement';
import KnowledgeBase from './components/KnowledgeBase';
import BillingPlans from './components/BillingPlans';
import ChatPlayground from './components/ChatPlayground';
import LogsView from './components/LogsView';
import ImageStudio from './components/ImageStudio';
import VisualStudio from './components/VisualStudio';
import { adminApi } from './lib/api';
import { AISystem, AIAgent, Client } from './types';
import { Activity } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState<any>(null);
  const [testAgentSlug, setTestAgentSlug] = useState<string | null>(null);

  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'MEXUS Dashboard';
      case 'systems': return 'Ecossistema Multi-Tenant';
      case 'clients': return 'Gestão de Clientes';
      case 'agents': return 'Agentes Especializados';
      case 'models': return 'Infraestrutura LLM';
      case 'knowledge': return 'Base de Conhecimento RAG';
      case 'studio': return 'MEXUS Image Studio';
      case 'visual': return 'MEXUS Creative Studio';
      case 'billing': return 'Faturamento & Planos';
      case 'chat': return 'MEXUS Playground';
      case 'logs': return 'Logs de Auditoria';
      default: return 'MEXUS AI ADMIN';
    }
  };

  const handleTestAgent = (slug: string) => {
    setTestAgentSlug(slug);
    setActiveTab('chat');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex font-sans">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 lg:ml-72 min-h-screen flex flex-col pt-16 lg:pt-0">
        {/* Responsive Header */}
        <header className="hidden lg:flex h-24 bg-white/70 backdrop-blur-xl px-10 items-center justify-between sticky top-0 z-40 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-1.5 h-8 bg-indigo-600 rounded-full" />
            <div>
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight">{getPageTitle()}</h1>
              <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mt-1">MEXUS AI CORE • v4.2.0 • Build Stable</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-2xl border border-slate-100">
               <Activity size={14} className="text-emerald-500 animate-pulse" />
               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Latência Gateway: 42ms</span>
            </div>
            
            <div className="flex items-center gap-4 pl-6 border-l border-slate-100">
              <div className="text-right">
                <div className="text-sm font-bold text-slate-800">MEXUS Super Admin</div>
                <div className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Master Architect</div>
              </div>
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-600/20 ring-2 ring-white hover:scale-105 transition-transform cursor-pointer overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=MEXUS" alt="Avatar" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </header>

        <div className="p-4 lg:p-10 max-w-[1600px] mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {activeTab === 'dashboard' && <DashboardOverview />}
              {activeTab === 'systems' && <SystemsManagement />}
              {activeTab === 'clients' && <ClientsList clients={[]} />}
              {activeTab === 'agents' && <AgentsManagement onTestAgent={handleTestAgent} />}
              {activeTab === 'models' && <ModelsManagement />}
              {activeTab === 'knowledge' && <KnowledgeBase />}
              {activeTab === 'studio' && <ImageStudio />}
              {activeTab === 'visual' && <VisualStudio />}
              {activeTab === 'billing' && <BillingPlans />}
              {activeTab === 'chat' && <ChatPlayground initialAgentSlug={testAgentSlug} />}
              {activeTab === 'logs' && <LogsView />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
