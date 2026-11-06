"use client"
import { useState, useEffect } from "react";
import { 
  ChartPolar, TrendUp, Package, UsersThree, ChartLineUp, 
  Plus, CloudSun, ClockCounterClockwise, Receipt, Wallet, 
  ArrowUpRight, Target, Lightning, Fire, Warning, CurrencyDollar
} from "@phosphor-icons/react";
import { Modal } from "../../components/ui/Modal";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { supabase } from "../../lib/supabase";
import { toast } from "sonner";

// Função auxiliar para calcular tempo decorrido (ex: "Há 5 min")
function tempoDecorrido(dataString: string) {
  const agora = new Date();
  const data = new Date(dataString);
  const diffMs = agora.getTime() - data.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  
  if (diffMin < 1) return "Agora mesmo";
  if (diffMin < 60) return `Há ${diffMin} min`;
  const diffHoras = Math.floor(diffMin / 60);
  return `Há ${diffHoras} h`;
}

export default function VisaoGeral() {
  const [modalVendaAberto, setModalVendaAberto] = useState(false);
  const [dataAtual, setDataAtual] = useState("");

  // Estados dos Dados Reais do Dashboard
  const [faturamentoHoje, setFaturamentoHoje] = useState(0);
  const [pedidosHoje, setPedidosHoje] = useState(0);
  const [ultimasVendas, setUltimasVendas] = useState<any[]>([]);
  const [loadingDados, setLoadingDados] = useState(true);

  // Estados do Formulário de Nova Venda
  const [loadingVenda, setLoadingVenda] = useState(false);
  const [valor, setValor] = useState("");
  const [pagamento, setPagamento] = useState("pix");
  const [descricao, setDescricao] = useState("");

  // Função para ir buscar os dados reais ao Supabase
  const carregarDadosDashboard = async () => {
    try {
      setLoadingDados(true);
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data: perfil } = await supabase
        .from("perfis")
        .select("empresa_id")
        .eq("id", session.user.id)
        .single();

      if (!perfil) return;

      // Definir o início do dia de hoje para o filtro (00:00:00)
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);

      // Buscar as vendas de hoje da empresa
      const { data: vendas, error } = await supabase
        .from("vendas")
        .select("*")
        .eq("empresa_id", perfil.empresa_id)
        .gte("criado_em", hoje.toISOString())
        .order("criado_em", { ascending: false });

      if (error) throw error;

      if (vendas) {
        // Calcular Faturamento Total
        const total = vendas.reduce((acc, venda) => acc + Number(venda.valor_total), 0);
        setFaturamentoHoje(total);
        setPedidosHoje(vendas.length);
        // Guardar apenas as 3 vendas mais recentes para o Feed
        setUltimasVendas(vendas.slice(0, 3));
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setLoadingDados(false);
    }
  };

  useEffect(() => {
    const dataFormatada = new Intl.DateTimeFormat('pt-BR', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'short' 
    }).format(new Date());
    
    setDataAtual(dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1));
    
    // Carregar os dados reais assim que entra na página
    carregarDadosDashboard();
  }, []);

  // Envio da Venda Real para o Supabase
  const handleNovaVenda = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingVenda(true);

    try {
      const valorNumerico = parseFloat(valor.replace(",", "."));
      if (isNaN(valorNumerico) || valorNumerico <= 0) throw new Error("Valor inválido");

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Sessão expirada");

      const { data: perfil } = await supabase
        .from("perfis")
        .select("empresa_id")
        .eq("id", session.user.id)
        .single();

      if (!perfil) throw new Error("Perfil não encontrado");

      const { error: erroVenda } = await supabase
        .from("vendas")
        .insert({
          empresa_id: perfil.empresa_id,
          vendedor_id: session.user.id,
          valor_total: valorNumerico,
          forma_pagamento: pagamento,
          descricao: descricao || null,
          clima_no_momento: "Ensolarado"
        });

      if (erroVenda) throw erroVenda;

      setModalVendaAberto(false);
      setValor("");
      setDescricao("");
      setPagamento("pix");

      toast.success("Venda registada com sucesso!", {
        description: "O valor já está contabilizado no seu sistema.",
      });

      // ATUALIZA O DASHBOARD IMEDIATAMENTE APÓS A VENDA
      carregarDadosDashboard();

    } catch (err: any) {
      toast.error("Não foi possível registar a venda", {
        description: err.message === "Valor inválido" 
          ? "Digite um valor numérico válido maior que zero." 
          : "Verifique sua conexão ou tente novamente.",
      });
    } finally {
      setLoadingVenda(false);
    }
  };

  // Cálculos de formatação visual
  const ticketMedio = pedidosHoje > 0 ? (faturamentoHoje / pedidosHoje) : 0;
  const faturamentoFormatado = faturamentoHoje.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const faturamentoReais = faturamentoFormatado.split(',')[0];
  const faturamentoCentavos = faturamentoFormatado.split(',')[1];
  const ticketMedioFormatado = ticketMedio.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  
  // Progresso da meta diária (Meta fictícia de R$ 5000 para demonstração)
  const metaDiaria = 5000;
  const porcentagemMeta = Math.min(Math.round((faturamentoHoje / metaDiaria) * 100), 100);

  return (
    <div className="max-w-[1400px] mx-auto animate-fade-in pb-12">
      
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#1E2B50] tracking-tight">Visão Geral</h1>
          <p className="text-gray-500 text-sm mt-1 font-medium capitalize-first flex items-center gap-2">
            {dataAtual || "Carregando data..."} <span className="w-1 h-1 bg-gray-300 rounded-full"></span> Tempo Real
          </p>
        </div>
        <div className="hidden md:flex items-center gap-3 bg-white px-4 py-2.5 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-default">
          <CloudSun weight="duotone" className="text-blue-500 text-2xl" />
          <div className="flex flex-col">
            <span className="text-sm font-bold text-[#1E2B50] leading-none">28°C Local</span>
            <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mt-1">Cenário Ideal</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8">
        
        <div className="xl:col-span-2 space-y-6 md:space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="bg-gradient-to-br from-[#1E2B50] to-[#0f172a] p-6 md:p-8 rounded-3xl shadow-xl text-white relative overflow-hidden group">
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-blue-200 text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                    <Wallet weight="bold" className="text-lg" /> Faturamento Hoje
                  </h3>
                  <span className="bg-teal-500/20 text-teal-300 text-xs font-bold px-2.5 py-1 rounded-lg border border-teal-500/30 flex items-center gap-1">
                    <TrendUp weight="bold" /> +12%
                  </span>
                </div>
                
                <div>
                  <p className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                    <span className="text-blue-300/50 text-2xl mr-1">R$</span>{faturamentoReais}<span className="text-xl text-blue-200">,{faturamentoCentavos}</span>
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-medium text-blue-200">
                      <span className="flex items-center gap-1"><Target weight="fill" /> Meta diária: R$ 5.000</span>
                      <span>{porcentagemMeta}%</span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-teal-400 rounded-full transition-all duration-1000 ease-out relative" style={{ width: `${porcentagemMeta}%` }}>
                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
              <h3 className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-6 flex items-center gap-2">
                <Receipt weight="bold" className="text-lg" /> Desempenho
              </h3>
              
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-gray-500 font-medium mb-1">Ticket Médio</p>
                  <div className="flex items-end gap-3">
                    <p className="text-2xl font-bold text-[#1E2B50]">R$ {ticketMedioFormatado}</p>
                    {ticketMedio > 0 && (
                      <span className="text-green-600 text-sm font-bold flex items-center mb-1">
                        <ArrowUpRight weight="bold" /> 5%
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="w-full h-[1px] bg-gray-100"></div>
                
                <div>
                  <p className="text-sm text-gray-500 font-medium mb-1">Pedidos Realizados</p>
                  <div className="flex items-end gap-3">
                    <p className="text-2xl font-bold text-[#1E2B50]">{pedidosHoje}</p>
                    <span className="text-gray-400 text-sm font-medium mb-1">Hoje</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[#1E2B50] font-bold text-lg flex items-center gap-2">
                <Fire weight="duotone" className="text-orange-500 text-xl" />
                Previsão de Movimento
              </h3>
              <span className="text-xs font-bold text-orange-600 bg-orange-50 border border-orange-100 px-2 py-1 rounded-md">Pico às 18h</span>
            </div>
            
            <div className="flex items-end justify-between h-32 gap-2 mt-4">
              {[
                { hora: '08h', altura: 'h-1/4', cor: 'bg-gray-200' },
                { hora: '10h', altura: 'h-2/4', cor: 'bg-blue-200' },
                { hora: '12h', altura: 'h-3/4', cor: 'bg-teal-400' },
                { hora: '14h', altura: 'h-2/4', cor: 'bg-blue-200' },
                { hora: '16h', altura: 'h-4/5', cor: 'bg-orange-400' },
                { hora: '18h', altura: 'h-full', cor: 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)]' },
                { hora: '20h', altura: 'h-2/4', cor: 'bg-blue-200' },
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center w-full group cursor-default">
                  <div className={`w-full max-w-[2.5rem] ${item.altura} ${item.cor} rounded-t-lg transition-all duration-300 group-hover:opacity-80`}></div>
                  <span className="text-xs text-gray-400 font-medium mt-2">{item.hora}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#1E2B50] mb-4">Ações Rápidas</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              <button 
                onClick={() => setModalVendaAberto(true)}
                className="flex flex-col items-center text-center gap-3 p-5 bg-white border border-gray-100 rounded-3xl hover:border-teal-500 hover:shadow-lg hover:shadow-teal-500/10 transition-all group relative overflow-hidden"
              >
                <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center group-hover:bg-teal-500 group-hover:scale-110 transition-all duration-300">
                  <Plus weight="bold" className="text-teal-600 group-hover:text-white text-2xl" />
                </div>
                <span className="text-sm font-bold text-[#1E2B50]">Nova Venda</span>
              </button>
              <button className="flex flex-col items-center text-center gap-3 p-5 bg-white border border-gray-100 rounded-3xl hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 transition-all group relative overflow-hidden">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center group-hover:bg-blue-500 group-hover:scale-110 transition-all duration-300">
                  <Package weight="duotone" className="text-blue-600 group-hover:text-white text-2xl" />
                </div>
                <span className="text-sm font-bold text-[#1E2B50]">Add Estoque</span>
              </button>
              <button className="flex flex-col items-center text-center gap-3 p-5 bg-white border border-gray-100 rounded-3xl hover:border-orange-500 hover:shadow-lg hover:shadow-orange-500/10 transition-all group relative overflow-hidden">
                <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center group-hover:bg-orange-500 group-hover:scale-110 transition-all duration-300">
                  <UsersThree weight="duotone" className="text-orange-600 group-hover:text-white text-2xl" />
                </div>
                <span className="text-sm font-bold text-[#1E2B50]">Ver Escala</span>
              </button>
              <button className="flex flex-col items-center text-center gap-3 p-5 bg-white border border-gray-100 rounded-3xl hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/10 transition-all group relative overflow-hidden">
                <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center group-hover:bg-purple-500 group-hover:scale-110 transition-all duration-300">
                  <ChartLineUp weight="duotone" className="text-purple-600 group-hover:text-white text-2xl" />
                </div>
                <span className="text-sm font-bold text-[#1E2B50]">Relatórios</span>
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6 md:space-y-8 flex flex-col">
          
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-blue-500"></div>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-[#1E2B50] rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform duration-300">
                <ChartPolar weight="fill" className="text-teal-400 text-2xl" />
              </div>
              <div>
                <h3 className="text-[#1E2B50] font-bold text-lg">Marco IA</h3>
                <div className="flex items-center gap-1 text-xs font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-md w-max">
                  <Lightning weight="fill" /> Analisando dados...
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <p className="text-[#1E2B50] font-medium text-sm leading-relaxed">
                "Aumente a produção de salgados em 15% hoje. A combinação de clima ensolarado e sexta-feira aumenta a demanda histórica entre 16h e 18h no seu bairro."
              </p>
            </div>
          </div>

          <div className="bg-red-50 p-6 md:p-8 rounded-3xl shadow-sm border border-red-100 relative overflow-hidden group">
            <div className="flex items-center gap-3 mb-4">
              <Warning weight="duotone" className="text-red-500 text-2xl" />
              <h3 className="text-red-900 font-bold text-lg">Estoque Crítico</h3>
            </div>
            <div className="bg-white/60 p-4 rounded-2xl border border-red-200 backdrop-blur-sm">
              <div className="flex justify-between items-start mb-2">
                <p className="text-red-900 font-bold text-sm">Coca-Cola 2L</p>
                <span className="text-xs font-bold bg-red-100 text-red-600 px-2 py-1 rounded-md">Restam 3</span>
              </div>
              <p className="text-red-700 text-xs font-medium">Previsão da IA: Vai esgotar até as 15h se o ritmo continuar.</p>
            </div>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 flex-1 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[#1E2B50] font-bold text-lg">Últimas Vendas</h3>
              <button className="text-teal-600 text-sm font-bold hover:underline">Ver tudo</button>
            </div>
            
            <div className="space-y-5">
              {loadingDados ? (
                <p className="text-gray-400 text-sm">A carregar vendas...</p>
              ) : ultimasVendas.length === 0 ? (
                <p className="text-gray-400 text-sm">Nenhuma venda registada hoje.</p>
              ) : (
                ultimasVendas.map((venda, i) => (
                  <div key={venda.id || i} className="flex items-center justify-between group cursor-pointer hover:bg-gray-50 p-2 -mx-2 rounded-xl transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-gray-100 group-hover:border-teal-500 group-hover:shadow-sm transition-all">
                        <Receipt weight="bold" className="text-gray-400 group-hover:text-teal-600 transition-colors" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#1E2B50]">
                          {venda.forma_pagamento.toUpperCase()}
                        </p>
                        <p className="text-xs text-gray-400 flex items-center gap-1">
                          <ClockCounterClockwise /> {tempoDecorrido(venda.criado_em)}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-[#1E2B50] group-hover:text-teal-600 transition-colors">
                      R$ {venda.valor_total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>

      <Modal 
        isOpen={modalVendaAberto} 
        onClose={() => !loadingVenda && setModalVendaAberto(false)} 
        title="Registrar Venda"
      >
        <form className="space-y-5" onSubmit={handleNovaVenda}>
          
          <div>
            <label className="block text-sm font-bold text-[#1E2B50] mb-2">Valor da Venda</label>
            <Input 
              required 
              type="text" 
              inputMode="decimal"
              placeholder="Ex: 45.50" 
              value={valor}
              onChange={(e) => {
                const regex = /^[0-9.,]*$/;
                if (regex.test(e.target.value)) setValor(e.target.value);
              }}
              icon={<CurrencyDollar className="text-gray-400 text-lg" />} 
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-[#1E2B50] mb-2">Forma de Pagamento</label>
            <select 
              required 
              value={pagamento}
              onChange={(e) => setPagamento(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="pix">PIX</option>
              <option value="cartao_credito">Cartão de Crédito</option>
              <option value="cartao_debito">Cartão de Débito</option>
              <option value="dinheiro">Dinheiro</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-[#1E2B50] mb-2">Descrição (Opcional)</label>
            <Input 
              type="text" 
              placeholder="Ex: 2x Refrigerante Cola, 1x Salgado" 
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>

          <div className="pt-4">
            <Button type="submit" variant="primary" loading={loadingVenda}>
              Confirmar Recebimento
            </Button>
          </div>
        </form>
      </Modal>

    </div>
  );
}