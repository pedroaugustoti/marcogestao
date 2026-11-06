"use client"
import { 
  Sparkle, ChartLineUp, CloudRain, Sun, 
  ArrowUpRight, ArrowDownRight, Info, CalendarBlank
} from "@phosphor-icons/react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

// Dados simulados misturando passado (real) e futuro (previsão)
const dadosPrevisao = [
  { dia: 'Seg', real: 3200, previsao: 3100 },
  { dia: 'Ter', real: 2800, previsao: 2900 },
  { dia: 'Qua', real: 3500, previsao: 3400 },
  { dia: 'Qui', real: 4200, previsao: 4300 },
  { dia: 'Sex', real: 4250, previsao: 4100 }, // Hoje
  { dia: 'Sáb', real: null, previsao: 6200 }, // Futuro
  { dia: 'Dom', real: null, previsao: 5800 }, // Futuro
];

// Componente customizado para o Tooltip do Gráfico (Deixa o visual premium)
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1E2B50] p-4 rounded-xl shadow-xl border border-blue-900/50">
        <p className="text-white font-bold mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm mt-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></div>
            <span className="text-gray-300">{entry.name}:</span>
            <span className="text-white font-bold">R$ {entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function PrevisoesIA() {
  return (
    <div className="max-w-[1400px] mx-auto animate-fade-in pb-12">
      
      {/* CABEÇALHO */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#1E2B50] tracking-tight flex items-center gap-3">
            Previsões IA <Sparkle weight="fill" className="text-teal-500" />
          </h1>
          <p className="text-gray-500 text-sm mt-1 font-medium">
            Projeções de faturamento baseadas no seu histórico e clima.
          </p>
        </div>
        <div className="hidden md:flex items-center gap-2 bg-teal-50 text-teal-700 px-4 py-2.5 rounded-2xl border border-teal-100 font-bold text-sm">
          <ChartLineUp weight="bold" className="text-lg" />
          Modelo Preditivo Ativo
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8">
        
        {/* COLUNA DO GRÁFICO (Ocupa 2/3 do espaço) */}
        <div className="xl:col-span-2 bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h2 className="text-[#1E2B50] font-bold text-lg">Projeção da Semana</h2>
              <p className="text-gray-400 text-sm">Faturamento Real vs. Previsão da IA</p>
            </div>
            
            {/* Legenda customizada */}
            <div className="flex items-center gap-4 text-sm font-medium">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-gray-600">Realizado</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-teal-400 border-2 border-dashed border-teal-600"></div>
                <span className="text-gray-600">Previsão</span>
              </div>
            </div>
          </div>

          {/* ÁREA DO GRÁFICO RECHARTS */}
          <div className="h-[300px] md:h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dadosPrevisao} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  {/* Gradiente para a linha Real */}
                  <linearGradient id="colorReal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  {/* Gradiente para a linha Previsão */}
                  <linearGradient id="colorPrevisao" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="dia" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} tickFormatter={(value) => `R$ ${value}`} />
                <Tooltip content={<CustomTooltip />} />
                
                {/* Linha 1: Previsão (Renderizada por baixo, com linha tracejada) */}
                <Area 
                  type="monotone" 
                  dataKey="previsao" 
                  name="Previsão IA" 
                  stroke="#2dd4bf" 
                  strokeWidth={3}
                  strokeDasharray="5 5"
                  fillOpacity={1} 
                  fill="url(#colorPrevisao)" 
                />
                
                {/* Linha 2: Real (Renderizada por cima) */}
                <Area 
                  type="monotone" 
                  dataKey="real" 
                  name="Realizado" 
                  stroke="#3b82f6" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorReal)" 
                  activeDot={{ r: 6, fill: "#1E2B50", stroke: "#3b82f6", strokeWidth: 3 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* COLUNA LATERAL (Insights e Impactos) */}
        <div className="space-y-6 md:space-y-8">
          
          {/* Card de Insight Principal */}
          <div className="bg-gradient-to-br from-[#1E2B50] to-[#0f172a] p-6 md:p-8 rounded-3xl shadow-xl text-white relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <Sparkle weight="fill" className="text-teal-400 text-2xl" />
                <h3 className="font-bold text-lg">Insight do Fim de Semana</h3>
              </div>
              <p className="text-blue-100 text-sm leading-relaxed mb-6">
                O modelo preditivo aponta um <strong>aumento de 45%</strong> nas vendas para este Sábado em comparação à média da semana.
              </p>
              
              <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
                <p className="text-xs text-blue-200 uppercase tracking-wider font-bold mb-1">Ação Recomendada</p>
                <p className="text-white font-medium text-sm">
                  Reforçar o estoque de bebidas geladas e acionar 1 funcionário extra para o turno da tarde (14h - 20h).
                </p>
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
          </div>

          {/* Card: Impacto do Clima */}
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-[#1E2B50] font-bold text-lg mb-6 flex items-center gap-2">
              <CloudRain weight="duotone" className="text-blue-500 text-xl" />
              Impacto Climático
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                <div className="flex items-center gap-3">
                  <Sun weight="fill" className="text-orange-400 text-2xl" />
                  <div>
                    <p className="text-sm font-bold text-[#1E2B50]">Dias de Sol</p>
                    <p className="text-xs text-gray-500">Histórico de faturamento</p>
                  </div>
                </div>
                <span className="text-green-600 font-bold text-sm flex items-center gap-1">
                  <ArrowUpRight weight="bold" /> +18%
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                <div className="flex items-center gap-3">
                  <CloudRain weight="fill" className="text-blue-400 text-2xl" />
                  <div>
                    <p className="text-sm font-bold text-[#1E2B50]">Dias de Chuva</p>
                    <p className="text-xs text-gray-500">Histórico de faturamento</p>
                  </div>
                </div>
                <span className="text-red-500 font-bold text-sm flex items-center gap-1">
                  <ArrowDownRight weight="bold" /> -12%
                </span>
              </div>
            </div>

            <div className="mt-6 flex items-start gap-2 text-xs text-gray-500 bg-blue-50 p-3 rounded-xl border border-blue-100">
              <Info weight="fill" className="text-blue-500 shrink-0 text-base" />
              <p>O Marco ajusta automaticamente as previsões cruzando a previsão do tempo com o histórico da sua padaria.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}