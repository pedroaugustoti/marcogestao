"use client"
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChartPolar, LockKey, CheckCircle } from "@phosphor-icons/react";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { supabase } from "../../lib/supabase";
import { toast } from "sonner";

export default function ResetarSenha() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [sucesso, setSucesso] = useState(false);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validações de UX antes de chamar o banco
    if (senha.length < 6) {
      toast.error("Senha muito curta", { 
        description: "A nova senha deve ter no mínimo 6 caracteres para sua segurança." 
      });
      return;
    }

    if (senha !== confirmarSenha) {
      toast.error("As senhas não coincidem", { 
        description: "Verifique se digitou exatamente a mesma senha nos dois campos." 
      });
      return;
    }

    setLoading(true);

    try {
      // Como o link do e-mail já autenticou temporariamente o usuário,
      // basta pedir ao Supabase para atualizar o usuário atual.
      const { error } = await supabase.auth.updateUser({
        password: senha
      });

      if (error) throw error;

      setSucesso(true);
      toast.success("Senha atualizada!", {
        description: "Sua senha foi alterada com sucesso.",
      });

      // Aguarda 2 segundos para o lojista ler a mensagem verde e manda para o sistema
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);

    } catch (err: any) {
      // Se o Supabase reclamar que a senha é igual à antiga
      if (err.message && err.message.includes("different from the old password")) {
        toast.error("Escolha uma senha nova", {
          description: "Por motivos de segurança, a nova senha não pode ser igual à sua senha atual.",
        });
      } else {
        // Para outros erros (link expirado, token inválido, etc.)
        toast.error("Erro ao atualizar senha", {
          description: "O link pode ter expirado ou ser inválido. Tente solicitar a recuperação novamente.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full bg-white md:bg-[#F4F5F7] flex items-center justify-center md:p-8 font-sans">
      <div className="max-w-4xl w-full bg-white md:rounded-3xl md:shadow-xl overflow-hidden flex flex-col md:flex-row relative min-h-screen md:min-h-[500px]">
        
        {/* LADO ESQUERDO: Branding */}
        <div className="md:w-5/12 bg-[#1E2B50] p-10 text-white flex flex-col justify-between relative overflow-hidden hidden md:flex">
          <div className="relative z-10">
            <Link href="/" className="inline-block mb-12">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex justify-center items-center hover:bg-white/20 transition-colors">
                <ChartPolar weight="bold" className="text-white text-2xl" />
              </div>
            </Link>
            <h2 className="text-3xl font-bold mb-4 leading-tight">Segurança em primeiro lugar.</h2>
            <p className="text-blue-200 text-sm font-medium leading-relaxed">
              Crie uma nova senha forte para proteger os dados e as previsões financeiras do seu negócio.
            </p>
          </div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
        </div>

        {/* LADO DIREITO: Formulário */}
        <div className="w-full md:w-7/12 p-8 pt-12 md:p-14 relative flex flex-col justify-center">
          
          <div className="md:hidden flex flex-col items-center mb-8 mt-4">
             <div className="w-16 h-16 bg-[#1E2B50] rounded-2xl flex justify-center items-center shadow-lg mb-4">
                <ChartPolar weight="bold" className="text-white text-3xl" />
             </div>
          </div>

          {!sucesso ? (
            <>
              <div className="mb-8 text-center md:text-left">
                <h1 className="text-2xl font-bold text-[#1E2B50] mb-2">Criar nova senha</h1>
                <p className="text-gray-500 text-sm">Digite a sua nova senha abaixo.</p>
              </div>

              <form className="space-y-6" onSubmit={handleUpdatePassword}>
                <div className="space-y-4">
                  <Input 
                    required 
                    type="password" 
                    placeholder="Nova senha (mínimo 6 dígitos)" 
                    value={senha} 
                    onChange={(e) => setSenha(e.target.value)} 
                    icon={<LockKey className="text-gray-400 text-lg" />} 
                  />
                  <Input 
                    required 
                    type="password" 
                    placeholder="Confirme a nova senha" 
                    value={confirmarSenha} 
                    onChange={(e) => setConfirmarSenha(e.target.value)} 
                    icon={<LockKey className="text-gray-400 text-lg" />} 
                  />
                </div>
                
                <Button type="submit" loading={loading} variant="primary">
                  Atualizar Senha
                </Button>
              </form>
            </>
          ) : (
            // Feedback de Sucesso Elegante
            <div className="text-center md:text-left flex flex-col items-center md:items-start animate-fade-in">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle weight="fill" className="text-teal-600 text-4xl" />
              </div>
              <h1 className="text-2xl font-bold text-[#1E2B50] mb-3">Senha atualizada!</h1>
              <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                A sua senha foi alterada com sucesso. Você já está autenticado no sistema.
                Redirecionando para o seu painel...
              </p>
              <Button type="button" loading={true} variant="primary">
                Entrando no sistema...
              </Button>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}