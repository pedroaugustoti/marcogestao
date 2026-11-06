"use client"
import Link from "next/link";
import { ChartPolar, Lightbulb, TrendUp } from "@phosphor-icons/react";

export default function Home() {
  return (
    <main className="min-h-screen w-full flex flex-col md:flex-row font-sans">
      
      {/* LADO ESQUERDO: Conteúdo e Ações (Clean & Minimalist) */}
      <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 bg-[#F4F5F7] relative z-10 min-h-screen md:min-h-0 py-12 md:py-0">
        
        <div className="flex flex-col items-center md:items-start max-w-lg mx-auto md:mx-0 w-full mt-auto md:mt-0 mb-auto md:mb-0">
          
          {/* Logo / Ícone */}
          <div className="w-16 h-16 bg-[#1E2B50] rounded-xl flex justify-center items-center shadow-lg mb-8">
            <ChartPolar weight="bold" className="text-white text-3xl" />
          </div>

          {/* Título Principal */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1E2B50] text-center md:text-left tracking-tight leading-tight mb-6">
            Inteligência <br className="hidden md:block" />
            <span className="text-blue-600">que gera lucro.</span>
          </h1>

          {/* Subtítulo */}
          <p className="text-[#64748B] text-center md:text-left text-base md:text-lg font-medium mb-12 leading-relaxed">
            A primeira plataforma que cruza dados locais, clima e calendário para prever as vendas do seu negócio de forma simples e direta.
          </p>

          {/* Botões */}
          <div className="w-full flex flex-col sm:flex-row gap-4">
            <Link
              href="/login"
              className="flex-1 bg-[#1E2B50] text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-blue-900/20 text-center hover:bg-blue-900 transition-all hover:-translate-y-1"
            >
              Acessar conta
            </Link>
            
            <Link
              href="/registro"
              className="flex-1 bg-white text-[#1E2B50] font-bold py-4 px-6 rounded-xl text-center border-2 border-[#1E2B50]/10 hover:border-[#1E2B50]/30 hover:bg-gray-50 transition-all"
            >
              Cadastre-se
            </Link>
          </div>
        </div>

      </div>

      {/* LADO DIREITO: Foco no Benefício (Compreensível para qualquer idade) */}
      <div className="hidden md:flex flex-1 bg-[#1E2B50] relative overflow-hidden items-center justify-center p-12">
        
        {/* Fundo escuro limpo com gradiente sutil */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E2B50] to-[#0f172a]"></div>
        
        {/* Card de Notificação - Interface Amigável e Familiar */}
        <div className="relative z-10 bg-white p-8 rounded-3xl shadow-2xl max-w-sm w-full transform transition-transform hover:scale-105 duration-500">
          
          {/* Cabeçalho do Card */}
          <div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center shrink-0">
              <Lightbulb className="text-yellow-600 text-2xl" weight="fill" />
            </div>
            <div>
              <h3 className="text-[#1E2B50] font-extrabold text-lg">Dica do Marco</h3>
              <p className="text-gray-400 text-sm font-medium">Hoje, 08:30</p>
            </div>
          </div>
          
          {/* Mensagem simples e direta (Sem jargões técnicos) */}
          <p className="text-gray-600 text-base leading-relaxed mb-6">
            Previsão de <strong className="text-[#1E2B50]">chuva forte</strong> para amanhã à tarde no seu bairro. 
            Historicamente, o movimento na loja cai, mas os pedidos online aumentam.
          </p>

          {/* Ação / Resultado */}
          <div className="bg-green-50 p-4 rounded-2xl border border-green-100 flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-lg shrink-0">
              <TrendUp className="text-green-600 text-xl" weight="bold" />
            </div>
            <p className="text-green-800 font-semibold text-sm">
              Sugestão: Reforce a equipe de delivery para amanhã.
            </p>
          </div>

        </div>

      </div>
      
    </main>
  );
}