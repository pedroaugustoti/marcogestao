"use client"
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ChartPolar, EnvelopeSimple, LockKey, ArrowLeft 
} from "@phosphor-icons/react";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { supabase } from "../../lib/supabase";
import { toast } from "sonner";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password: senha,
      });

      if (error) throw error;

      toast.success("Bem-vindo de volta!", {
        description: "Preparando o seu painel de controle...",
      });
      router.push("/dashboard");

    } catch (err: any) {
      toast.error("Acesso negado", {
        description: "E-mail ou senha incorretos. Verifique e tente novamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    // No mobile o fundo é branco, no desktop é cinza
    <main className="min-h-screen w-full bg-white md:bg-[#F4F5F7] flex items-center justify-center md:p-8 font-sans">
      
      {/* No mobile ocupa 100% da altura, no desktop vira um card */}
      <div className="max-w-4xl w-full bg-white md:rounded-3xl md:shadow-xl overflow-hidden flex flex-col md:flex-row relative min-h-screen md:min-h-[600px]">
        
        {/* LADO ESQUERDO: Branding Premium (Oculto no mobile) */}
        <div className="md:w-5/12 bg-[#1E2B50] p-10 text-white flex flex-col justify-between relative overflow-hidden hidden md:flex">
          <div className="relative z-10">
            <Link href="/" className="inline-block mb-12">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex justify-center items-center hover:bg-white/20 transition-colors">
                <ChartPolar weight="bold" className="text-white text-2xl" />
              </div>
            </Link>
            <h2 className="text-3xl font-bold mb-4 leading-tight">Bem-vindo de volta.</h2>
            <p className="text-blue-200 text-sm font-medium leading-relaxed">
              O Marco analisou novos dados da sua região enquanto você esteve fora. Acesse para ver as previsões.
            </p>
          </div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
        </div>

        {/* LADO DIREITO: Formulário */}
        <div className="w-full md:w-7/12 p-8 pt-12 md:p-14 relative flex flex-col justify-center">
          
          <Link href="/" className="absolute top-6 left-6 md:top-8 md:left-8 inline-flex items-center gap-2 text-gray-500 hover:text-[#1E2B50] font-medium text-sm transition-colors">
            <ArrowLeft weight="bold" />
            Voltar
          </Link>

          {/* BRANDING MOBILE (Aparece apenas no celular para dar cara de App) */}
          <div className="md:hidden flex flex-col items-center mb-8 mt-8">
             <div className="w-16 h-16 bg-[#1E2B50] rounded-2xl flex justify-center items-center shadow-lg mb-4">
                <ChartPolar weight="bold" className="text-white text-3xl" />
             </div>
          </div>

          <div className="mb-8 text-center md:text-left">
            <h1 className="text-2xl font-bold text-[#1E2B50] mb-2">Acesse sua conta</h1>
            <p className="text-gray-500 text-sm">Insira seus dados para continuar lucrando.</p>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="space-y-5">
              <Input required type="email" placeholder="Seu e-mail profissional" value={email} onChange={(e) => setEmail(e.target.value)} icon={<EnvelopeSimple className="text-gray-400 text-lg" />} />
              
              <div className="relative">
                <Input required type="password" placeholder="Sua senha" value={senha} onChange={(e) => setSenha(e.target.value)} icon={<LockKey className="text-gray-400 text-lg" />} />
                <div className="flex justify-end mt-2">
                  {/* Link atualizado apontando para a nova tela */}
                  <Link href="/recuperar" className="text-xs font-bold text-teal-600 hover:text-teal-700 transition-colors">
                    Esqueceu a senha?
                  </Link>
                </div>
              </div>
            </div>

            <Button type="submit" loading={loading} variant="primary" className="mt-2">
              Entrar no Sistema
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-10 mb-4 md:mb-0">
            Ainda não tem uma conta? <Link href="/registro" className="text-[#1E2B50] font-bold hover:underline">Cadastre-se grátis</Link>
          </p>

        </div>
      </div>
    </main>
  );
}