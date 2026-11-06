"use client"
import { useState } from "react";
import Link from "next/link";
import { ChartPolar, EnvelopeSimple, ArrowLeft } from "@phosphor-icons/react";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { supabase } from "../../lib/supabase";
import { toast } from "sonner";

export default function RecuperarSenha() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [enviado, setEnviado] = useState(false);

  const handleRecuperar = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Chama o Supabase para enviar o e-mail de redefinição
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/resetar-senha`, // Rota futura para digitar a nova senha
      });

      if (error) throw error;

      setEnviado(true);
      toast.success("E-mail enviado!", {
        description: "Verifique sua caixa de entrada para criar uma nova senha.",
      });

    } catch (err: any) {
      toast.error("Falha ao enviar", {
        description: "Verifique se o e-mail está correto ou tente novamente mais tarde.",
      });
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
            <h2 className="text-3xl font-bold mb-4 leading-tight">Esqueceu a senha?</h2>
            <p className="text-blue-200 text-sm font-medium leading-relaxed">
              Não se preocupe. Acontece com os melhores empreendedores. Vamos ajudar a recuperar o acesso ao seu negócio.
            </p>
          </div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
        </div>

        {/* LADO DIREITO: Formulário */}
        <div className="w-full md:w-7/12 p-8 pt-12 md:p-14 relative flex flex-col justify-center">
          
          <Link href="/login" className="absolute top-6 left-6 md:top-8 md:left-8 inline-flex items-center gap-2 text-gray-500 hover:text-[#1E2B50] font-medium text-sm transition-colors">
            <ArrowLeft weight="bold" />
            Voltar ao Login
          </Link>

          <div className="md:hidden flex flex-col items-center mb-8 mt-8">
             <div className="w-16 h-16 bg-[#1E2B50] rounded-2xl flex justify-center items-center shadow-lg mb-4">
                <ChartPolar weight="bold" className="text-white text-3xl" />
             </div>
          </div>

          {!enviado ? (
            <>
              <div className="mb-8 text-center md:text-left">
                <h1 className="text-2xl font-bold text-[#1E2B50] mb-2">Recuperar Acesso</h1>
                <p className="text-gray-500 text-sm">Digite o e-mail cadastrado e enviaremos um link de recuperação.</p>
              </div>

              <form className="space-y-6" onSubmit={handleRecuperar}>
                <Input required type="email" placeholder="Seu e-mail profissional" value={email} onChange={(e) => setEmail(e.target.value)} icon={<EnvelopeSimple className="text-gray-400 text-lg" />} />
                
                <Button type="submit" loading={loading} variant="primary">
                  Enviar link de recuperação
                </Button>
              </form>
            </>
          ) : (
            // Feedback de sucesso direto na tela
            <div className="text-center md:text-left flex flex-col items-center md:items-start">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <EnvelopeSimple weight="fill" className="text-green-600 text-3xl" />
              </div>
              <h1 className="text-2xl font-bold text-[#1E2B50] mb-3">E-mail enviado!</h1>
              <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                Enviamos as instruções de recuperação para <strong className="text-gray-800">{email}</strong>. 
                Por favor, verifique a sua caixa de entrada e também a pasta de spam.
              </p>
              <Button type="button" variant="outline" onClick={() => setEnviado(false)}>
                Tentar outro e-mail
              </Button>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}