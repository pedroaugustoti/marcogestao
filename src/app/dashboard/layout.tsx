"use client"
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../lib/supabase";
import { 
  ChartPolar, House, ChartLineUp, Users, Gear, SignOut, 
  CircleNotch, Bell
} from "@phosphor-icons/react";
import { toast } from "sonner";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("Empreendedor");

  useEffect(() => {
    async function checkUser() {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error || !session) {
        toast.error("Acesso restrito", { description: "Faça login para acessar o painel." });
        router.push("/login");
        return;
      }

      const nomeCompleto = session.user.user_metadata?.nome_completo;
      if (nomeCompleto) {
        setUserName(nomeCompleto.split(" ")[0]);
      }

      setLoading(false);
    }
    checkUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[#F4F5F7] flex flex-col items-center justify-center">
        <CircleNotch weight="bold" className="animate-spin text-[#1E2B50] text-4xl mb-4" />
        <p className="text-gray-500 font-medium">Validando credenciais...</p>
      </div>
    );
  }

  // Função para marcar ícones ativos
  const linkAtivo = (caminho: string) => pathname === caminho;

  return (
    <div className="min-h-screen w-full bg-[#F4F5F7] flex font-sans overflow-hidden">
      
      {/* MENU LATERAL - EXCLUSIVO PARA DESKTOP */}
      <aside className="hidden md:flex flex-col w-64 bg-[#1E2B50] text-white p-6 shadow-xl z-20 shrink-0">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
            <ChartPolar weight="bold" className="text-white text-xl" />
          </div>
          <span className="font-bold text-xl tracking-tight">Marco Gestão</span>
        </div>

        <nav className="flex-1 space-y-2">
          <Link href="/dashboard" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${linkAtivo("/dashboard") ? "bg-white/10 text-white" : "text-gray-400 hover:text-white hover:bg-white/5"}`}>
            <House weight={linkAtivo("/dashboard") ? "fill" : "bold"} className="text-lg" />
            Visão Geral
          </Link>
          <Link href="/dashboard/previsoes" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${linkAtivo("/dashboard/previsoes") ? "bg-white/10 text-white" : "text-gray-400 hover:text-white hover:bg-white/5"}`}>
            <ChartLineUp weight={linkAtivo("/dashboard/previsoes") ? "fill" : "bold"} className="text-lg" />
            Previsões IA
          </Link>
          <Link href="/dashboard/equipe" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${linkAtivo("/dashboard/equipe") ? "bg-white/10 text-white" : "text-gray-400 hover:text-white hover:bg-white/5"}`}>
            <Users weight={linkAtivo("/dashboard/equipe") ? "fill" : "bold"} className="text-lg" />
            Equipe
          </Link>
        </nav>

        <div className="pt-4 border-t border-white/10 mt-auto">
          <Link href="/dashboard/configuracoes" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors mb-2 ${linkAtivo("/dashboard/configuracoes") ? "bg-white/10 text-white" : "text-gray-400 hover:text-white hover:bg-white/5"}`}>
            <Gear weight={linkAtivo("/dashboard/configuracoes") ? "fill" : "bold"} className="text-lg" />
            Configurações
          </Link>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-xl font-medium transition-colors">
            <SignOut weight="bold" className="text-lg" />
            Sair
          </button>
        </div>
      </aside>

      {/* ÁREA PRINCIPAL */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        
        {/* CABEÇALHO GLOBAL (Mobile e Desktop) */}
        <header className="bg-white px-4 md:px-8 py-4 shadow-sm flex justify-between items-center z-10 shrink-0 border-b border-gray-100">
          <div className="flex items-center gap-3">
            {/* Logo apenas no Mobile para branding */}
            <div className="md:hidden w-10 h-10 bg-[#1E2B50] rounded-lg flex items-center justify-center shadow-sm">
               <ChartPolar weight="bold" className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold text-[#1E2B50]">Olá, {userName} 👋</h1>
              <p className="text-gray-500 text-xs mt-0.5">Resumo de hoje.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center text-gray-600 transition-colors relative">
              <Bell weight="bold" />
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
            </button>
            <div className="hidden md:flex w-10 h-10 bg-teal-500 rounded-full items-center justify-center text-white font-bold border-2 border-teal-600 shadow-sm uppercase shrink-0">
              {userName.charAt(0)}
            </div>
          </div>
        </header>

        {/* CONTEÚDO DAS ABAS (Com padding inferior no celular para a barra não cobrir) */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 md:pb-8">
          {children}
        </div>

        {/* BOTTOM NAVIGATION BAR - EXCLUSIVO PARA CELULAR (PWA) */}
        <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 flex justify-around items-center h-16 z-50 px-2 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
          <Link href="/dashboard" className={`flex flex-col items-center gap-1 p-2 w-16 ${linkAtivo("/dashboard") ? "text-[#1E2B50]" : "text-gray-400"}`}>
            <House weight={linkAtivo("/dashboard") ? "fill" : "regular"} className="text-2xl" />
            <span className="text-[10px] font-medium">Início</span>
          </Link>
          <Link href="/dashboard/previsoes" className={`flex flex-col items-center gap-1 p-2 w-16 ${linkAtivo("/dashboard/previsoes") ? "text-[#1E2B50]" : "text-gray-400"}`}>
            <ChartLineUp weight={linkAtivo("/dashboard/previsoes") ? "fill" : "regular"} className="text-2xl" />
            <span className="text-[10px] font-medium">Previsões</span>
          </Link>
          <Link href="/dashboard/equipe" className={`flex flex-col items-center gap-1 p-2 w-16 ${linkAtivo("/dashboard/equipe") ? "text-[#1E2B50]" : "text-gray-400"}`}>
            <Users weight={linkAtivo("/dashboard/equipe") ? "fill" : "regular"} className="text-2xl" />
            <span className="text-[10px] font-medium">Equipe</span>
          </Link>
          <Link href="/dashboard/configuracoes" className={`flex flex-col items-center gap-1 p-2 w-16 ${linkAtivo("/dashboard/configuracoes") ? "text-[#1E2B50]" : "text-gray-400"}`}>
            <Gear weight={linkAtivo("/dashboard/configuracoes") ? "fill" : "regular"} className="text-2xl" />
            <span className="text-[10px] font-medium">Ajustes</span>
          </Link>
        </nav>

      </main>
    </div>
  );
}