import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, MessageSquare, Users, Cpu, DollarSign, Activity, Zap, TrendingUp, AlertCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

const tokenData = [
  { time: '08:00', tokens: 12000, cost: 0.12 },
  { time: '09:00', tokens: 18500, cost: 0.18 },
  { time: '10:00', tokens: 24200, cost: 0.24 },
  { time: '11:00', tokens: 21000, cost: 0.21 },
  { time: '12:00', tokens: 32000, cost: 0.32 },
  { time: '13:00', tokens: 28500, cost: 0.28 },
  { time: '14:00', tokens: 36000, cost: 0.36 },
  { time: '15:00', tokens: 42000, cost: 0.42 },
  { time: '16:00', tokens: 39500, cost: 0.39 },
  { time: '17:00', tokens: 48000, cost: 0.48 },
  { time: '18:00', tokens: 52000, cost: 0.52 },
  { time: '19:00', tokens: 45000, cost: 0.45 },
];

const systemUsage = [
  { name: 'Nexus', value: 45, color: '#6366f1' },
  { name: 'ImobFlow', value: 30, color: '#10b981' },
  { name: 'WooMed', value: 15, color: '#f59e0b' },
  { name: 'Gabinete', value: 10, color: '#ef4444' },
];

export default function DashboardOverview() {
  return (
    <div className="space-y-8 pb-12">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <KpiCard title="Mensagens Totais" value="1.2M" trend="+12.5%" icon={MessageSquare} color="bg-indigo-600" />
        <KpiCard title="Tokens Processados" value="845.2M" trend="+8.2%" icon={Cpu} color="bg-emerald-600" />
        <KpiCard title="Créditos Consumidos" value="142.5k" trend="+15.1%" icon={Zap} color="bg-amber-500" />
        <KpiCard title="Custo Interno Est." value="R$ 4.250" trend="-2.4%" icon={DollarSign} color="bg-rose-500" />
        <KpiCard title="Lucro Estimado" value="R$ 12.840" trend="+22.1%" icon={TrendingUp} color="bg-indigo-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Consumption Chart */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Consumo de Tokens (Global)</h2>
              <p className="text-xs text-slate-400 font-medium mt-1">Tráfego agregado de todos os sistemas MEXUS</p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-xs font-bold uppercase tracking-wider">24 Horas</button>
              <button className="px-4 py-2 bg-slate-50 text-slate-400 rounded-xl text-xs font-bold uppercase tracking-wider">7 Dias</button>
            </div>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={tokenData}>
                <defs>
                  <linearGradient id="colorTokens" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="time" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '20px', 
                    border: 'none', 
                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                    padding: '12px 16px'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="tokens" 
                  stroke="#6366f1" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#colorTokens)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* System Distribution */}
        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
          <h2 className="text-xl font-bold text-slate-800 mb-8">Uso por Sistema</h2>
          <div className="h-64 mb-8">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={systemUsage}>
                <XAxis dataKey="name" hide />
                <YAxis hide />
                <Bar dataKey="value" radius={[10, 10, 10, 10]}>
                  {systemUsage.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-4">
            {systemUsage.map((sys) => (
              <div key={sys.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: sys.color }} />
                  <span className="text-sm font-bold text-slate-700">{sys.name}</span>
                </div>
                <span className="text-sm font-bold text-slate-400">{sys.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Active Clients */}
        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-slate-800">Top Clientes (Consumo)</h2>
            <button className="text-indigo-600 text-xs font-bold uppercase hover:underline">Ver Todos</button>
          </div>
          <div className="space-y-6">
            {[
              { name: 'Imobiliária Silva', system: 'ImobFlow', credits: '42.500', trend: 'up' },
              { name: 'Clínica Saúde Total', system: 'WooMed', credits: '28.100', trend: 'down' },
              { name: 'Gabinete Dep. João', system: 'Gabinete', credits: '19.400', trend: 'up' },
              { name: 'Nexus Solutions', system: 'Nexus', credits: '15.200', trend: 'up' },
            ].map((client) => (
              <div key={client.name} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center font-bold text-slate-500">
                    {client.name[0]}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">{client.name}</h3>
                    <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">{client.system}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-slate-800">{client.credits} cr</div>
                  <div className={`text-[10px] font-bold uppercase flex items-center justify-end gap-1 ${
                    client.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'
                  }`}>
                    {client.trend === 'up' ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                    {client.trend === 'up' ? 'Crescendo' : 'Estável'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real-time Alerts */}
        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
           <h2 className="text-xl font-bold text-slate-800 mb-8">Alertas de Infraestrutura</h2>
           <div className="space-y-4">
             <AlertItem 
                type="error" 
                title="vLLM GPU Overload" 
                desc="Instância vLLM-01 atingiu 98% de memória VRAM. Iniciando fallback para Ollama." 
                time="2 min atrás"
             />
             <AlertItem 
                type="warning" 
                title="Limite de Créditos" 
                desc="Cliente 'Imobiliária Silva' atingiu 90% do limite mensal." 
                time="15 min atrás"
             />
             <AlertItem 
                type="info" 
                title="Novo Modelo Registrado" 
                desc="DeepSeek-R1 agora está disponível para roteamento em produção." 
                time="1h atrás"
             />
           </div>
        </div>
      </div>
    </div>
  );
}

function KpiCard({ title, value, trend, icon: Icon, color }: any) {
  return (
    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden group">
      <div className="relative z-10">
        <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
          <Icon size={20} />
        </div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{title}</p>
        <div className="flex items-baseline gap-2">
          <h3 className="text-xl font-bold text-slate-800">{value}</h3>
          <span className={`text-[10px] font-bold ${trend.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>{trend}</span>
        </div>
      </div>
    </div>
  );
}

function AlertItem({ type, title, desc, time }: any) {
  const colors = {
    error: 'bg-rose-50 text-rose-600 border-rose-100',
    warning: 'bg-amber-50 text-amber-600 border-amber-100',
    info: 'bg-indigo-50 text-indigo-600 border-indigo-100'
  };
  
  return (
    <div className={`p-4 rounded-2xl border ${colors[type as keyof typeof colors]} flex gap-4`}>
      <div className="mt-1">
        <AlertCircle size={18} />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start mb-1">
          <h4 className="text-sm font-bold">{title}</h4>
          <span className="text-[10px] font-bold uppercase opacity-60 tracking-widest">{time}</span>
        </div>
        <p className="text-xs opacity-80 leading-relaxed font-medium">{desc}</p>
      </div>
    </div>
  );
}
