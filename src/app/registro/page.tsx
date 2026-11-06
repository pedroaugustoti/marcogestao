"use client"
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ChartPolar, User, EnvelopeSimple, LockKey, 
  Storefront, Tag, MapPin, ArrowLeft, WarningCircle, Buildings
} from "@phosphor-icons/react";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { supabase } from "../../lib/supabase"; // Importando o banco
import { toast } from "sonner";

export default function Registro() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  
  // Estados para capturar os dados do formulário
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [comercio, setComercio] = useState("");
  const [nicho, setNicho] = useState("");
  const [cep, setCep] = useState("");
  const [cidade, setCidade] = useState("");

  const handleCepBlur = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const cepLimpo = e.target.value.replace(/\D/g, '');
    setCep(cepLimpo);

    if (cepLimpo.length === 8) {
      try {
        const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
        const data = await res.json();
        if (!data.erro) {
          setCidade(data.localidade);
          setErro(null);
        } else {
          setErro("CEP não encontrado. Verifique os números.");
          setCidade("");
        }
      } catch (err) {
        setErro("Falha ao buscar o CEP.");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErro(null);
    
    try {
      // Chamada real para o Supabase
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: senha,
        options: {
          data: {
            nome_completo: nome,
            nome_comercio: comercio,
            nicho: nicho,
            cep: cep,
            cidade: cidade
          }
        }
      });

      if (error) {
        throw error;
      }

      // 2. Substitua o alert("Cadastro realizado...") por isto:
      toast.success("Conta criada com sucesso!", {
        description: "Bem-vindo ao Marco Gestão.",
      });
      router.push("/login");

    } catch (err: any) {
      if (err.message.includes("already registered")) {
        toast.error("Este e-mail já está em uso.");
      } else {
        toast.error("Erro ao criar a conta. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full bg-[#F4F5F7] flex items-center justify-center p-4 md:p-8 font-sans">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row relative">
        
        {/* LADO ESQUERDO */}
        <div className="md:w-5/12 bg-[#1E2B50] p-10 text-white flex flex-col justify-between relative overflow-hidden hidden md:flex">
          <div className="relative z-10">
            <Link href="/" className="inline-block mb-12">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex justify-center items-center hover:bg-white/20 transition-colors">
                <ChartPolar weight="bold" className="text-white text-2xl" />
              </div>
            </Link>
            <h2 className="text-3xl font-bold mb-4 leading-tight">O primeiro passo para prever suas vendas.</h2>
            <p className="text-blue-200 text-sm font-medium leading-relaxed">Leva menos de 1 minuto. Precisamos apenas de alguns dados para o Marco começar a trabalhar pelo seu comércio.</p>
          </div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
        </div>

        {/* LADO DIREITO: Formulário */}
        <div className="md:w-7/12 p-8 md:p-14 relative">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#1E2B50] font-medium text-sm mb-8 transition-colors">
            <ArrowLeft weight="bold" />
            Voltar ao início
          </Link>

          <div className="mb-6">
            <h1 className="text-2xl font-bold text-[#1E2B50] mb-2">Cadastre seu negócio</h1>
            <p className="text-gray-500 text-sm">Preencha os dados abaixo para começar.</p>
          </div>

          {erro && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl flex items-start gap-3 animate-pulse">
              <WarningCircle weight="bold" className="text-red-500 text-xl shrink-0 mt-0.5" />
              <p className="text-sm text-red-800 font-medium">{erro}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">1. Seus Dados de Acesso</h3>
              <Input required type="text" placeholder="Seu nome completo" value={nome} onChange={(e) => setNome(e.target.value)} icon={<User className="text-gray-400 text-lg" />} />
              <Input required type="email" placeholder="E-mail profissional" value={email} onChange={(e) => setEmail(e.target.value)} icon={<EnvelopeSimple className="text-gray-400 text-lg" />} />
              <Input required minLength={6} type="password" placeholder="Crie uma senha (mínimo 6 dígitos)" value={senha} onChange={(e) => setSenha(e.target.value)} icon={<LockKey className="text-gray-400 text-lg" />} />
            </div>

            <hr className="border-gray-100" />

            <div className="space-y-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">2. Sobre o seu comércio</h3>
              <Input required type="text" placeholder="Nome do Comércio (Ex: Padaria do Zé)" value={comercio} onChange={(e) => setComercio(e.target.value)} icon={<Storefront className="text-gray-400 text-lg" />} />
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Tag className="text-gray-400 text-lg" /></div>
                <select required value={nicho} onChange={(e) => setNicho(e.target.value)} className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:bg-white focus:ring-2 focus:ring-[#1E2B50]/20 focus:border-[#1E2B50] outline-none transition-all appearance-none">
                  <option value="" disabled>Selecione o nicho de atuação</option>
                  <option value="padaria">Padaria / Delicatessen</option>
                  <option value="minimercado">Minimercado / Mercearia</option>
                  <option value="restaurante">Bar / Restaurante</option>
                  <option value="vestuario">Loja de Vestuário</option>
                  <option value="outro">Outro segmento</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <div className="flex-1 w-full">
                  <Input required type="text" placeholder="CEP do local" maxLength={9} value={cep} onChange={handleCepBlur} icon={<MapPin className="text-gray-400 text-lg" />} />
                </div>
                <div className="flex-1 w-full">
                  <Input required readOnly type="text" placeholder="Cidade" value={cidade} icon={<Buildings className="text-gray-400 text-lg" />} className="bg-gray-200 text-gray-600 cursor-not-allowed" />
                </div>
              </div>
            </div>

            <Button type="submit" loading={loading} variant="primary" className="mt-4">
              Concluir Cadastro
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-8">
            Já tem uma conta? <Link href="/login" className="text-[#1E2B50] font-bold hover:underline">Faça Login aqui</Link>
          </p>
        </div>
      </div>
    </main>
  );
}