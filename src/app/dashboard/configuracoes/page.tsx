"use client"
import { useState } from "react";
import { 
  Gear, Storefront, User, CreditCard, LockKey, 
  CheckCircle, WarningCircle, Sparkle, ShieldCheck
} from "@phosphor-icons/react";
import { Input } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";
import { toast } from "sonner";

export default function Configuracoes() {
  // Estado para controlar qual aba de configuração está ativa
  const [abaAtiva, setAbaAtiva] = useState("empresa");
  const [loading, setLoading] = useState(false);

  // Simula o salvamento de dados
  const handleSalvar = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Configurações atualizadas!", {
        description: "As suas alterações foram salvas com sucesso."
      });
    }, 1000);
  };

  return (
    <div className="max-w-[1200px] mx-auto animate-fade-in pb-12">
      
      {/* CABEÇALHO */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#1E2B50] tracking-tight flex items-center gap-3">
          Configurações <Gear weight="fill" className="text-gray-400" />
        </h1>
        <p className="text-gray-500 text-sm mt-1 font-medium">
          Gerencie os dados do seu negócio, preferências e a sua assinatura.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* MENU LATERAL DE CONFIGURAÇÕES */}
        <div className="md:w-64 shrink-0 space-y-2">
          <button 
            onClick={() => setAbaAtiva("empresa")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
              abaAtiva === "empresa" 
                ? "bg-teal-50 text-teal-700 border border-teal-100 shadow-sm" 
                : "text-gray-500 hover:bg-gray-50 hover:text-[#1E2B50]"
            }`}
          >
            <Storefront weight={abaAtiva === "empresa" ? "fill" : "bold"} className="text-lg" />
            Minha Empresa
          </button>

          <button 
            onClick={() => setAbaAtiva("perfil")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
              abaAtiva === "perfil" 
                ? "bg-teal-50 text-teal-700 border border-teal-100 shadow-sm" 
                : "text-gray-500 hover:bg-gray-50 hover:text-[#1E2B50]"
            }`}
          >
            <User weight={abaAtiva === "perfil" ? "fill" : "bold"} className="text-lg" />
            Meu Perfil
          </button>

          <button 
            onClick={() => setAbaAtiva("assinatura")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
              abaAtiva === "assinatura" 
                ? "bg-teal-50 text-teal-700 border border-teal-100 shadow-sm" 
                : "text-gray-500 hover:bg-gray-50 hover:text-[#1E2B50]"
            }`}
          >
            <CreditCard weight={abaAtiva === "assinatura" ? "fill" : "bold"} className="text-lg" />
            Assinatura & Planos
          </button>

          <button 
            onClick={() => setAbaAtiva("seguranca")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
              abaAtiva === "seguranca" 
                ? "bg-teal-50 text-teal-700 border border-teal-100 shadow-sm" 
                : "text-gray-500 hover:bg-gray-50 hover:text-[#1E2B50]"
            }`}
          >
            <LockKey weight={abaAtiva === "seguranca" ? "fill" : "bold"} className="text-lg" />
            Segurança
          </button>
        </div>

        {/* ÁREA DE CONTEÚDO DINÂMICO */}
        <div className="flex-1 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-gray-100 min-h-[500px]">
          
          {/* ABA: MINHA EMPRESA */}
          {abaAtiva === "empresa" && (
            <div className="animate-fade-in">
              <h2 className="text-xl font-bold text-[#1E2B50] mb-6 border-b border-gray-100 pb-4">Dados do Estabelecimento</h2>
              <form onSubmit={handleSalvar} className="space-y-6 max-w-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-[#1E2B50] mb-2">Nome Fantasia</label>
                    <Input type="text" defaultValue="Padaria do Zezim" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#1E2B50] mb-2">CNPJ</label>
                    <Input type="text" defaultValue="00.000.000/0001-00" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-[#1E2B50] mb-2">Nicho de Mercado</label>
                  <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all">
                    <option value="padaria">Padaria / Delicatessen</option>
                    <option value="mercado">Mercadinho / Mercearia</option>
                    <option value="conveniencia">Loja de Conveniência</option>
                  </select>
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-end">
                  <Button type="submit" variant="primary" loading={loading}>
                    Salvar Alterações
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* ABA: MEU PERFIL */}
          {abaAtiva === "perfil" && (
            <div className="animate-fade-in">
              <h2 className="text-xl font-bold text-[#1E2B50] mb-6 border-b border-gray-100 pb-4">Informações Pessoais</h2>
              <form onSubmit={handleSalvar} className="space-y-6 max-w-2xl">
                
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-20 h-20 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold text-3xl shadow-md border-4 border-teal-100">
                    P
                  </div>
                  <div>
                    <Button type="button" variant="outline" className="mb-2">Alterar Foto</Button>
                    <p className="text-xs text-gray-500">JPG, GIF ou PNG. Máximo de 2MB.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-[#1E2B50] mb-2">Nome Completo</label>
                    <Input type="text" defaultValue="Pedro Augusto" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#1E2B50] mb-2">Telemóvel / WhatsApp</label>
                    <Input type="text" placeholder="(00) 00000-0000" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#1E2B50] mb-2">E-mail Profissional</label>
                  <Input type="email" defaultValue="pedroaugusto.nogueiraa@gmail.com" disabled />
                  <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                    <WarningCircle weight="bold" /> Para alterar o e-mail de acesso, contate o suporte.
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-end">
                  <Button type="submit" variant="primary" loading={loading}>
                    Salvar Perfil
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* ABA: ASSINATURA E PLANOS */}
          {abaAtiva === "assinatura" && (
            <div className="animate-fade-in max-w-3xl">
              <h2 className="text-xl font-bold text-[#1E2B50] mb-6 border-b border-gray-100 pb-4">Plano Atual</h2>
              
              <div className="bg-gradient-to-br from-[#1E2B50] to-[#0f172a] p-8 rounded-3xl text-white shadow-xl relative overflow-hidden mb-8">
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkle weight="fill" className="text-teal-400 text-xl" />
                      <span className="font-bold tracking-widest text-teal-400 uppercase text-xs">Plano Premium</span>
                    </div>
                    <h3 className="text-3xl font-extrabold mb-1">R$ 97<span className="text-lg text-blue-300 font-medium">/mês</span></h3>
                    <p className="text-blue-200 text-sm">Próxima cobrança em 05 de Dezembro, 2026.</p>
                  </div>
                  
                  <div className="flex flex-col gap-3 min-w-[200px]">
                    <Button type="button" variant="primary" className="w-full bg-teal-500 hover:bg-teal-400 border-none text-[#1E2B50] font-extrabold shadow-lg shadow-teal-500/30">
                      Fazer Upgrade Anual
                    </Button>
                    <button className="text-blue-300 hover:text-white text-sm font-bold transition-colors">
                      Cancelar Assinatura
                    </button>
                  </div>
                </div>
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
              </div>

              <h3 className="font-bold text-[#1E2B50] mb-4">Forma de Pagamento</h3>
              <div className="flex items-center justify-between p-5 border border-gray-200 rounded-2xl bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center shadow-sm">
                    {/* Placeholder para logo da Mastercard/Visa */}
                    <CreditCard className="text-[#1E2B50] text-xl" />
                  </div>
                  <div>
                    <p className="font-bold text-[#1E2B50]">Mastercard terminando em 4242</p>
                    <p className="text-xs text-gray-500">Expira em 12/28</p>
                  </div>
                </div>
                <button className="text-teal-600 font-bold text-sm hover:underline">Editar</button>
              </div>
            </div>
          )}

          {/* ABA: SEGURANÇA */}
          {abaAtiva === "seguranca" && (
            <div className="animate-fade-in max-w-2xl">
              <h2 className="text-xl font-bold text-[#1E2B50] mb-6 border-b border-gray-100 pb-4">Segurança da Conta</h2>
              
              <div className="bg-green-50 p-4 rounded-xl border border-green-100 flex items-start gap-3 mb-8">
                <ShieldCheck className="text-green-600 text-2xl shrink-0" weight="fill" />
                <p className="text-green-800 text-sm font-medium leading-relaxed">
                  Sua conta está protegida pelas regras de segurança RLS (Row Level Security) do banco de dados. Seus dados financeiros estão invisíveis para outros usuários.
                </p>
              </div>

              <form onSubmit={handleSalvar} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-[#1E2B50] mb-2">Senha Atual</label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-[#1E2B50] mb-2">Nova Senha</label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#1E2B50] mb-2">Confirmar Nova Senha</label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-end">
                  <Button type="submit" variant="primary" loading={loading}>
                    Atualizar Senha
                  </Button>
                </div>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}