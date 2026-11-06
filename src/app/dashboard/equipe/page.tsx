"use client"
import { useState } from "react";
import { 
  UsersThree, UserPlus, Clock, CalendarCheck, Medal, 
  CaretRight, CheckCircle, Warning, UserFocus, Phone,
  EnvelopeSimple, IdentificationBadge
} from "@phosphor-icons/react";
import { Button } from "../../../components/ui/Button";
import { Modal } from "../../../components/ui/Modal";
import { Input } from "../../../components/ui/Input";
import { toast } from "sonner";

// Dados simulados da equipe
const funcionarios = [
  { id: 1, nome: "Maria Silva", cargo: "Caixa Principal", turno: "08:00 - 16:00", status: "online", vendas: 2450 },
  { id: 2, nome: "João Pedro", cargo: "Padeiro", turno: "04:00 - 12:00", status: "offline", vendas: 0 },
  { id: 3, nome: "Ana Costa", cargo: "Atendente", turno: "14:00 - 22:00", status: "em_breve", vendas: 1800 },
];

export default function Equipe() {
  const [filtro, setFiltro] = useState("todos");
  
  // Estados do Modal de Novo Colaborador
  const [modalAberto, setModalAberto] = useState(false);
  const [loadingConvite, setLoadingConvite] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cargo, setCargo] = useState("vendedor");

  // Simula o envio do convite atrelando o funcionário à sua empresa
  const handleConvidarFuncionario = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingConvite(true);

    // Aqui entrará a função real (Supabase Admin API) que envia o convite
    // passando o SEU empresa_id ocultamente para atrelar a conta dele.
    setTimeout(() => {
      setLoadingConvite(false);
      setModalAberto(false);
      setNome("");
      setEmail("");
      
      toast.success("Convite enviado com sucesso!", {
        description: `Enviamos as instruções de acesso para ${email}. Ele já fará parte da sua equipe.`,
      });
    }, 1200);
  };

  return (
    <div className="max-w-[1400px] mx-auto animate-fade-in pb-12">
      
      {/* CABEÇALHO */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#1E2B50] tracking-tight flex items-center gap-3">
            Gestão da Equipe <UsersThree weight="fill" className="text-teal-500" />
          </h1>
          <p className="text-gray-500 text-sm mt-1 font-medium">
            Gerencie escalas, turnos e acompanhe o desempenho dos seus colaboradores.
          </p>
        </div>
        
        {/* Botão que aciona o Modal */}
        <Button 
          onClick={() => setModalAberto(true)}
          variant="primary" 
          className="w-full md:w-auto flex items-center justify-center gap-2 shadow-sm"
        >
          <UserPlus weight="bold" className="text-lg" />
          Novo Colaborador
        </Button>
      </div>

      {/* BENTO GRID LAYOUT */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8">
        
        {/* COLUNA PRINCIPAL (Esquerda - Escalas e Lista) */}
        <div className="xl:col-span-2 space-y-6 md:space-y-8">
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center">
                <CheckCircle weight="fill" className="text-green-500 text-2xl" />
              </div>
              <div>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-0.5">Em Turno Agora</p>
                <p className="text-2xl font-extrabold text-[#1E2B50]">2</p>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center">
                <Clock weight="fill" className="text-orange-500 text-2xl" />
              </div>
              <div>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-0.5">Próximo Turno</p>
                <p className="text-2xl font-extrabold text-[#1E2B50]">14h00</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
                <UserFocus weight="fill" className="text-blue-500 text-2xl" />
              </div>
              <div>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-0.5">Total Registrados</p>
                <p className="text-2xl font-extrabold text-[#1E2B50]">{funcionarios.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 md:p-8 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-[#1E2B50] font-bold text-lg flex items-center gap-2">
                <CalendarCheck weight="duotone" className="text-teal-500 text-xl" />
                Escala do Dia
              </h2>
              
              <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-200 w-max">
                <button 
                  onClick={() => setFiltro("todos")}
                  className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${filtro === "todos" ? "bg-white text-[#1E2B50] shadow-sm" : "text-gray-500 hover:text-[#1E2B50]"}`}
                >
                  Todos
                </button>
                <button 
                  onClick={() => setFiltro("ativos")}
                  className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${filtro === "ativos" ? "bg-white text-[#1E2B50] shadow-sm" : "text-gray-500 hover:text-[#1E2B50]"}`}
                >
                  No Turno
                </button>
              </div>
            </div>

            <div className="divide-y divide-gray-50">
              {funcionarios.map((func) => (
                <div key={func.id} className="p-6 hover:bg-gray-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-[#1E2B50] rounded-full flex items-center justify-center text-white font-bold text-lg border-2 border-transparent group-hover:border-teal-100 transition-colors">
                        {func.nome.charAt(0)}
                      </div>
                      <span className={`absolute bottom-0 right-0 w-3.5 h-3.5 border-2 border-white rounded-full ${
                        func.status === 'online' ? 'bg-green-500' : 
                        func.status === 'em_breve' ? 'bg-orange-400' : 'bg-gray-300'
                      }`}></span>
                    </div>
                    <div>
                      <h3 className="text-[#1E2B50] font-bold">{func.nome}</h3>
                      <p className="text-gray-500 text-xs font-medium">{func.cargo}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 md:gap-12">
                    <div className="hidden md:block text-right">
                      <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Horário</p>
                      <p className="text-[#1E2B50] font-medium text-sm flex items-center gap-1">
                        <Clock className="text-gray-400" /> {func.turno}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-teal-600 hover:border-teal-200 hover:bg-teal-50 transition-all shadow-sm">
                        <Phone weight="fill" />
                      </button>
                      <button className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:text-[#1E2B50] hover:bg-gray-200 transition-colors">
                        <CaretRight weight="bold" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* COLUNA SECUNDÁRIA (Direita - Desempenho e Alertas) */}
        <div className="space-y-6 md:space-y-8 flex flex-col">
          
          <div className="bg-gradient-to-br from-[#1E2B50] to-[#0f172a] p-6 md:p-8 rounded-3xl shadow-xl text-white relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <Medal weight="fill" className="text-yellow-400 text-3xl drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]" />
                <div>
                  <h3 className="font-bold text-lg leading-tight">Ranking de Vendas</h3>
                  <p className="text-blue-200 text-xs font-medium">Os melhores do dia</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {funcionarios
                  .filter(f => f.vendas > 0)
                  .sort((a, b) => b.vendas - a.vendas)
                  .map((func, index) => (
                    <div key={func.id} className="bg-white/10 p-4 rounded-2xl border border-white/10 flex items-center justify-between backdrop-blur-sm">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${index === 0 ? 'bg-yellow-400 text-yellow-900' : 'bg-white/20 text-white'}`}>
                          {index + 1}º
                        </div>
                        <div>
                          <p className="font-bold text-sm">{func.nome}</p>
                          <p className="text-blue-200 text-xs">{func.cargo}</p>
                        </div>
                      </div>
                      <span className="font-bold text-teal-300">
                        R$ {func.vendas.toLocaleString('pt-BR')}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
          </div>

          <div className="bg-orange-50 p-6 md:p-8 rounded-3xl shadow-sm border border-orange-100 relative overflow-hidden">
            <div className="flex items-center gap-3 mb-4">
              <Warning weight="duotone" className="text-orange-500 text-2xl" />
              <h3 className="text-orange-900 font-bold text-lg">Atenção Necessária</h3>
            </div>
            <div className="bg-white/60 p-4 rounded-2xl border border-orange-200 backdrop-blur-sm">
              <p className="text-orange-800 font-medium text-sm leading-relaxed">
                A escala de <strong>Sábado (Amanhã)</strong> está com defasagem de 1 funcionário no turno da tarde, período que a IA previu alta demanda.
              </p>
              <button className="mt-3 text-sm font-bold text-orange-700 hover:text-orange-900 hover:underline">
                Ajustar Escala Agora →
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* MODAL DE NOVO COLABORADOR */}
      <Modal 
        isOpen={modalAberto} 
        onClose={() => !loadingConvite && setModalAberto(false)} 
        title="Adicionar Colaborador"
      >
        <div className="mb-6 bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-start gap-3">
           <IdentificationBadge className="text-blue-600 text-2xl shrink-0" weight="duotone" />
           <p className="text-blue-800 text-sm font-medium leading-relaxed">
             O funcionário será adicionado <strong>exclusivamente à sua empresa</strong>. Enviaremos um e-mail para ele criar a senha de acesso ao sistema de PDV (Ponto de Venda).
           </p>
        </div>

        <form className="space-y-5" onSubmit={handleConvidarFuncionario}>
          <div>
            <label className="block text-sm font-bold text-[#1E2B50] mb-2">Nome Completo</label>
            <Input 
              required 
              type="text" 
              placeholder="Ex: Ana Costa" 
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-[#1E2B50] mb-2">E-mail do Funcionário</label>
            <Input 
              required 
              type="email" 
              placeholder="ana.costa@email.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<EnvelopeSimple className="text-gray-400 text-lg" />} 
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-[#1E2B50] mb-2">Nível de Acesso (Cargo)</label>
            <select 
              required 
              value={cargo}
              onChange={(e) => setCargo(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="vendedor">Vendedor / Caixa (Apenas registra vendas)</option>
              <option value="gerente">Gerente (Pode ver relatórios e equipe)</option>
            </select>
          </div>

          <div className="pt-4">
            <Button type="submit" variant="primary" loading={loadingConvite}>
              Enviar Convite de Acesso
            </Button>
          </div>
        </form>
      </Modal>

    </div>
  );
}