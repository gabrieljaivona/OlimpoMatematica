// src/app/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Hook para redirecionar
import { LogIn, UserPlus, AlertCircle, CheckCircle } from 'lucide-react';

export default function PaginaLogin() {
  const router = useRouter();
  const [abaAtiva, setAbaAtiva] = useState('login'); // 'login' ou 'cadastro'
  
  // --- ESTADOS ---
  const [dadosLogin, setDadosLogin] = useState({ email: '', senha: '' });
  const [dadosCadastro, setDadosCadastro] = useState({ 
    nome: '', email: '', senha: '', tipo: 'ALUNO' 
  });
  
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  // --- FUNÇÕES DE LOGIN ---
  const lidarComLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);
    setErro('');

    // Simulação de delay da API
    setTimeout(() => {
      setCarregando(false);
      
      // Validação Falsa (apenas para exemplo)
      if (dadosLogin.email && dadosLogin.senha) {
        // Sucesso!
        // Aqui você salvaria o token no localStorage ou Contexto
        alert('Login realizado com sucesso! (Simulação)');
        router.push('/'); // Redireciona para a Home
      } else {
        setErro('Preencha todos os campos.');
      }
    }, 1500);
  };

  // --- FUNÇÕES DE CADASTRO ---
  const lidarComCadastro = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);
    setErro('');
    setSucesso('');

    setTimeout(() => {
      setCarregando(false);
      // Sucesso simulado
      setSucesso('Conta criada com sucesso! Faça login para continuar.');
      setDadosCadastro({ nome: '', email: '', senha: '', tipo: 'ALUNO' });
      setAbaAtiva('login'); // Muda para a aba de login automaticamente
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        
        {/* Logo e Título */}
        <div className="text-center">
          <div className="text-6xl mb-4">🏛️</div>
          <h2 className="text-3xl font-bold text-[#283593]">Olimpo Matemático</h2>
          <p className="mt-2 text-gray-600">Entre na sua conta ou crie uma nova</p>
        </div>

        {/* Card Principal */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          
          {/* Abas (Login / Cadastro) */}
          <div className="flex border-b">
            <button
              onClick={() => setAbaAtiva('login')}
              className={`flex-1 py-4 text-center font-medium transition-colors ${
                abaAtiva === 'login' 
                  ? 'text-[#283593] border-b-2 border-[#283593] bg-blue-50/50' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Entrar
            </button>
            <button
              onClick={() => setAbaAtiva('cadastro')}
              className={`flex-1 py-4 text-center font-medium transition-colors ${
                abaAtiva === 'cadastro' 
                  ? 'text-[#283593] border-b-2 border-[#283593] bg-blue-50/50' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Cadastrar
            </button>
          </div>

          {/* Conteúdo */}
          <div className="p-8">
            
            {/* --- FORMULÁRIO DE LOGIN --- */}
            {abaAtiva === 'login' && (
              <div className="animate-in fade-in slide-in-from-left-4 duration-300">
                <div className="flex items-center gap-2 mb-6 text-[#283593]">
                  <LogIn className="w-5 h-5" />
                  <h3 className="font-bold text-xl">Fazer Login</h3>
                </div>
                
                <form onSubmit={lidarComLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      placeholder="seu@email.com"
                      value={dadosLogin.email}
                      onChange={(e) => setDadosLogin({ ...dadosLogin, email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#283593] focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
                    <input
                      type="password"
                      placeholder="Sua senha"
                      value={dadosLogin.senha}
                      onChange={(e) => setDadosLogin({ ...dadosLogin, senha: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#283593] focus:outline-none"
                      required
                    />
                  </div>

                  {erro && (
                    <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm flex items-center gap-2">
                      <AlertCircle size={16} /> {erro}
                    </div>
                  )}

                  <button 
                    type="submit" 
                    disabled={carregando}
                    className="w-full bg-[#283593] hover:bg-blue-800 text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-70"
                  >
                    {carregando ? 'Entrando...' : 'Entrar'}
                  </button>
                </form>
              </div>
            )}

            {/* --- FORMULÁRIO DE CADASTRO --- */}
            {abaAtiva === 'cadastro' && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="flex items-center gap-2 mb-6 text-[#283593]">
                  <UserPlus className="w-5 h-5" />
                  <h3 className="font-bold text-xl">Criar Conta</h3>
                </div>

                <form onSubmit={lidarComCadastro} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                    <input
                      type="text"
                      placeholder="Seu nome"
                      value={dadosCadastro.nome}
                      onChange={(e) => setDadosCadastro({ ...dadosCadastro, nome: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#283593] focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      placeholder="seu@email.com"
                      value={dadosCadastro.email}
                      onChange={(e) => setDadosCadastro({ ...dadosCadastro, email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#283593] focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
                    <input
                      type="password"
                      placeholder="Crie uma senha forte"
                      value={dadosCadastro.senha}
                      onChange={(e) => setDadosCadastro({ ...dadosCadastro, senha: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#283593] focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Usuário</label>
                    <select
                      value={dadosCadastro.tipo}
                      onChange={(e) => setDadosCadastro({ ...dadosCadastro, tipo: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#283593] focus:outline-none bg-white"
                    >
                      <option value="ALUNO">Estudante</option>
                      <option value="PROFESSOR">Professor</option>
                      <option value="ESTAGIARIO">Estagiário</option>
                    </select>
                  </div>

                  {sucesso && (
                    <div className="p-3 bg-green-50 text-green-700 rounded-lg text-sm flex items-center gap-2">
                      <CheckCircle size={16} /> {sucesso}
                    </div>
                  )}

                  <button 
                    type="submit" 
                    disabled={carregando}
                    className="w-full bg-[#FF9800] hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-70"
                  >
                    {carregando ? 'Criando...' : 'Criar Conta'}
                  </button>
                </form>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}