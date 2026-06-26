import { CreditCard, Zap, Check, Shield, Users, ArrowUpRight, TrendingUp, AlertCircle, Activity } from 'lucide-react';

export default function BillingPlans() {
  const plans = [
    {
      name: 'Basic',
      price: 'R$ 499',
      credits: '10.000',
      features: ['5 Agentes', '100 Documentos', 'Nexus integration', 'Suporte E-mail'],
      color: 'bg-slate-800'
    },
    {
      name: 'Professional',
      price: 'R$ 1.299',
      credits: '50.000',
      features: ['20 Agentes', '1.000 Documentos', 'Todas integrações', 'Suporte Priority', 'RAG Otimizado'],
      color: 'bg-indigo-600',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'R$ 4.999',
      credits: '250.000',
      features: ['Agentes Ilimitados', 'Docs Ilimitados', 'Dedicated GPU', 'SLA 99.9%', 'Custom Models'],
      color: 'bg-slate-900'
    }
  ];

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center px-1">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Planos & Faturamento</h2>
          <p className="text-sm text-slate-500 font-medium mt-1">Configuração de créditos MEXUS e limites multi-tenant</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-600/10 hover:bg-indigo-700 transition-all">
          <Zap size={20} />
          Recarregar Créditos
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-6">
           <div className="p-4 bg-indigo-50 text-indigo-600 rounded-3xl">
              <TrendingUp size={24} />
           </div>
           <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Receita Mensal (MRR)</p>
              <h3 className="text-2xl font-bold text-slate-800">R$ 124.500</h3>
           </div>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-6">
           <div className="p-4 bg-emerald-50 text-emerald-600 rounded-3xl">
              <Shield size={24} />
           </div>
           <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Churn Rate</p>
              <h3 className="text-2xl font-bold text-slate-800">2.4%</h3>
           </div>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-6">
           <div className="p-4 bg-amber-50 text-amber-600 rounded-3xl">
              <Users size={24} />
           </div>
           <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">ARPU Médio</p>
              <h3 className="text-2xl font-bold text-slate-800">R$ 1.840</h3>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div key={plan.name} className={`bg-white rounded-[3rem] p-10 border shadow-sm relative flex flex-col group transition-all hover:-translate-y-2 ${plan.popular ? 'border-indigo-600' : 'border-slate-100'}`}>
            {plan.popular && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
                Mais Popular
              </div>
            )}
            
            <div className="mb-10">
              <div className={`w-14 h-14 ${plan.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-xl group-hover:scale-110 transition-transform`}>
                <Zap size={28} />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1">
                 <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                 <span className="text-slate-400 font-bold text-sm">/mês</span>
              </div>
            </div>

            <div className="flex-1 space-y-6 mb-10">
               <div className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Créditos Inclusos</span>
                  <span className="text-sm font-bold text-indigo-600">{plan.credits}</span>
               </div>
               <div className="space-y-4">
                 {plan.features.map(f => (
                   <div key={f} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
                         <Check size={12} strokeWidth={4} />
                      </div>
                      <span className="text-sm font-medium text-slate-600">{f}</span>
                   </div>
                 ))}
               </div>
            </div>

            <button className={`w-full py-4 rounded-2xl font-bold text-sm transition-all shadow-lg ${
              plan.popular 
                ? 'bg-indigo-600 text-white shadow-indigo-600/20 hover:bg-indigo-700' 
                : 'bg-slate-900 text-white shadow-slate-900/10 hover:bg-slate-800'
            }`}>
              Assinar Plano {plan.name}
            </button>
          </div>
        ))}
      </div>

      {/* Credit Mechanics Info */}
      <div className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden group">
         <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
               <h2 className="text-3xl font-bold mb-6">Mecânica de Créditos MEXUS</h2>
               <p className="text-slate-400 text-lg leading-relaxed mb-8">
                  Nossa economia de tokens é baseada no custo computacional de cada engine local (Ollama/vLLM).
               </p>
               <div className="grid grid-cols-2 gap-6">
                  <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                     <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-2">Mensagem Simples</p>
                     <p className="text-xl font-bold">1 Crédito</p>
                  </div>
                  <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                     <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-2">Resposta com RAG</p>
                     <p className="text-xl font-bold">3 Créditos</p>
                  </div>
                  <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                     <p className="text-[10px] font-bold text-amber-400 uppercase tracking-widest mb-2">Análise de Doc</p>
                     <p className="text-xl font-bold">10 Créditos</p>
                  </div>
                  <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                     <p className="text-[10px] font-bold text-rose-400 uppercase tracking-widest mb-2">Geração de Imagem</p>
                     <p className="text-xl font-bold">20 Créditos</p>
                  </div>
               </div>
            </div>
            <div className="hidden lg:block">
               <div className="bg-indigo-600/20 border border-indigo-500/30 p-10 rounded-[3rem] backdrop-blur-sm">
                  <div className="flex items-center gap-4 mb-8">
                     <AlertCircle size={32} className="text-indigo-400" />
                     <h3 className="text-xl font-bold">Automação de Bloqueio</h3>
                  </div>
                  <p className="text-slate-300 mb-8 leading-relaxed">
                     Ao atingir o limite de créditos do plano, os sistemas Nexus e ImobFlow são notificados automaticamente via Webhook para interromper a inferência.
                  </p>
                  <button className="flex items-center gap-2 text-indigo-400 font-bold hover:text-indigo-300 transition-all">
                     Configurar Webhooks de Billing
                     <ArrowUpRight size={20} />
                  </button>
               </div>
            </div>
         </div>
         <Activity size={300} className="absolute -left-20 -bottom-20 text-white/5 group-hover:scale-105 transition-transform" />
      </div>
    </div>
  );
}
