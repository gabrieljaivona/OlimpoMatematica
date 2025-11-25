// src/app/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogIn, UserPlus, AlertCircle, CheckCircle } from 'lucide-react';

export default function PaginaLogin() {
  const router = useRouter();
  const [abaAtiva, setAbaAtiva] = useState('login');
  
  const [dadosLogin, setDadosLogin] = useState({ email: '', senha: '' });
  
  const [dadosCadastro, setDadosCadastro] = useState({ 
    tipo: 'ALUNO', 
    nome: '', 
    email: '', 
    senha: '',
    dataNascimento: '',
    escola: '',
    nivel: '',
    cpf: '',
    nomeResponsavel: '' // <--- Novo campo
  });
  
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  // --- FUNÇÃO PARA CALCULAR IDADE ---
  const verificarMenorDeIdade = (dataString: string) => {
    if (!dataString) return false;
    
    const hoje = new Date();
    const nascimento = new Date(dataString);
    
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    
    // Ajusta a idade se ainda não fez aniversário este ano
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    
    return idade < 18;
  };

  // Variável que diz se é menor de idade baseada no estado atual
  const ehMenor = verificarMenorDeIdade(dadosCadastro.dataNascimento);

  // --- FUNÇÕES DE FORMULÁRIO ---
  const lidarComLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);
    setErro('');

    setTimeout(() => {
      setCarregando(false);
      if (dadosLogin.email && dadosLogin.senha) {
        router.push('/');
      } else {
        setErro('Preencha todos os campos.');
      }
    }, 1500);
  };

  const lidarComCadastro = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);
    setErro('');
    setSucesso('');

    // Validação extra para menor de idade
    if (ehMenor && !dadosCadastro.nomeResponsavel) {
      setErro('É necessário informar o nome do responsável para menores de 18 anos.');
      setCarregando(false);
      return;
    }

    setTimeout(() => {
      setCarregando(false);
      setSucesso('Conta criada com sucesso! Faça login para continuar.');
      setDadosCadastro({ 
        tipo: dadosCadastro.tipo, 
        nome: '', email: '', senha: '', 
        dataNascimento: '', escola: '', nivel: '', cpf: '', nomeResponsavel: '' 
      });
      setAbaAtiva('login');
    }, 1500);
  };

  const atualizarCadastro = (campo: string, valor: string) => {
    setDadosCadastro(prev => ({ ...prev, [campo]: valor }));
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        
        <div className="text-center">
          <div className="text-6xl mb-4">🏛️</div>
          <h2 className="text-3xl font-bold text-[#283593]">Olimpo Matemático</h2>
          <p className="mt-2 text-gray-600">Entre na sua conta ou crie uma nova</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          
          <div className="flex border-b">
            <button
              onClick={() => setAbaAtiva('login')}
              className={`flex-1 py-4 text-center font-medium transition-colors ${
                abaAtiva === 'login' ? 'text-[#283593] border-b-2 border-[#283593] bg-blue-50/50' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Entrar
            </button>
            <button
              onClick={() => setAbaAtiva('cadastro')}
              className={`flex-1 py-4 text-center font-medium transition-colors ${
                abaAtiva === 'cadastro' ? 'text-[#283593] border-b-2 border-[#283593] bg-blue-50/50' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Cadastrar
            </button>
          </div>

          <div className="p-8">
            
            {/* LOGIN (Sem alterações) */}
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#283593] focus:outline-none text-gray-900 placeholder-gray-500"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#283593] focus:outline-none text-gray-900 placeholder-gray-500"
                      required
                    />
                  </div>

                  {erro && (
                    <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm flex items-center gap-2">
                      <AlertCircle size={16} /> {erro}
                    </div>
                  )}

                  <button type="submit" disabled={carregando} className="w-full bg-[#283593] hover:bg-blue-800 text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-70">
                    {carregando ? 'Entrando...' : 'Entrar'}
                  </button>
                </form>
              </div>
            )}

            {/* CADASTRO */}
            {abaAtiva === 'cadastro' && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="flex items-center gap-2 mb-6 text-[#283593]">
                  <UserPlus className="w-5 h-5" />
                  <h3 className="font-bold text-xl">Criar Conta</h3>
                </div>

                <form onSubmit={lidarComCadastro} className="space-y-4">
                  
                  {/* Tipo de Usuário */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Eu sou:</label>
                    <select
                      value={dadosCadastro.tipo}
                      onChange={(e) => atualizarCadastro('tipo', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#283593] focus:outline-none bg-white text-gray-900"
                    >
                      <option value="ALUNO">Estudante</option>
                      <option value="PROFESSOR">Professor</option>
                      <option value="ESTAGIARIO">Estagiário</option>
                    </select>
                  </div>

                  {/* Campos Condicionais */}
                  {(dadosCadastro.tipo === 'ALUNO' || dadosCadastro.tipo === 'PROFESSOR') && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                        <input
                          type="text"
                          placeholder="Seu nome"
                          value={dadosCadastro.nome}
                          onChange={(e) => atualizarCadastro('nome', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#283593] focus:outline-none text-gray-900 placeholder-gray-500"
                          required
                        />
                      </div>

                      {/* Data de Nascimento (Que ativa o campo de responsável) */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Data de Nascimento</label>
                        <input
                          type="date"
                          value={dadosCadastro.dataNascimento}
                          onChange={(e) => atualizarCadastro('dataNascimento', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#283593] focus:outline-none text-gray-900 placeholder-gray-500"
                          required
                        />
                      </div>

                      {/* --- CAMPO DO RESPONSÁVEL (Condicional) --- */}
                      {ehMenor && (
                        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                          <label className="block text-sm font-bold text-[#283593] mb-1">
                            Nome Completo do Responsável <span className="text-xs font-normal text-gray-500">(Obrigatório para menores)</span>
                          </label>
                          <input
                            type="text"
                            placeholder="Nome do pai, mãe ou responsável"
                            value={dadosCadastro.nomeResponsavel}
                            onChange={(e) => atualizarCadastro('nomeResponsavel', e.target.value)}
                            className="w-full px-4 py-2 border border-[#283593] bg-blue-50 rounded-lg focus:ring-2 focus:ring-[#283593] focus:outline-none text-gray-900 placeholder-gray-500"
                            required={ehMenor} // Torna obrigatório se for menor
                          />
                        </div>
                      )}
                    </>
                  )}

                  {dadosCadastro.tipo === 'PROFESSOR' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CPF</label>
                      <input
                        type="text"
                        placeholder="000.000.000-00"
                        value={dadosCadastro.cpf}
                        onChange={(e) => atualizarCadastro('cpf', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#283593] focus:outline-none text-gray-900 placeholder-gray-500"
                        required
                      />
                    </div>
                  )}

                  {(dadosCadastro.tipo === 'ALUNO' || dadosCadastro.tipo === 'PROFESSOR') && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Escola</label>
                      <input
                        type="text"
                        placeholder="Ex: Escola Estadual..."
                        value={dadosCadastro.escola}
                        onChange={(e) => atualizarCadastro('escola', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#283593] focus:outline-none text-gray-900 placeholder-gray-500"
                        required
                      />
                    </div>
                  )}

                  {dadosCadastro.tipo === 'ALUNO' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nível OBMEP</label>
                      <select
                        value={dadosCadastro.nivel}
                        onChange={(e) => atualizarCadastro('nivel', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#283593] focus:outline-none bg-white text-gray-900"
                        required
                      >
                        <option value="">Selecione o nível</option>
                        <option value="1">Nível 1 (6º e 7º anos)</option>
                        <option value="2">Nível 2 (8º e 9º anos)</option>
                        <option value="3">Nível 3 (Ensino Médio)</option>
                      </select>
                    </div>
                  )}

                  {/* Campos Comuns */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      placeholder="seu@email.com"
                      value={dadosCadastro.email}
                      onChange={(e) => atualizarCadastro('email', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#283593] focus:outline-none text-gray-900 placeholder-gray-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
                    <input
                      type="password"
                      placeholder="Crie uma senha forte"
                      value={dadosCadastro.senha}
                      onChange={(e) => atualizarCadastro('senha', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#283593] focus:outline-none text-gray-900 placeholder-gray-500"
                      required
                    />
                  </div>

                  {erro && (
                    <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm flex items-center gap-2">
                      <AlertCircle size={16} /> {erro}
                    </div>
                  )}

                  {sucesso && (
                    <div className="p-3 bg-green-50 text-green-700 rounded-lg text-sm flex items-center gap-2">
                      <CheckCircle size={16} /> {sucesso}
                    </div>
                  )}

                  <button type="submit" disabled={carregando} className="w-full bg-[#283593] hover:bg-blue-800 text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-70">
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