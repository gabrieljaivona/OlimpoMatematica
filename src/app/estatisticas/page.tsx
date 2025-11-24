// src/app/estatisticas/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Users, BookOpen, Activity, Award, Search, Eye, Calendar, 
  Target, Star, Clock, X, ArrowLeft, LogOut
} from 'lucide-react';

export default function PaginaEstatisticas() {
  // --- MOCK USER (Simulando usuário logado) ---
  const usuarioAtual = {
    nome: 'Prof. Carlos',
    tipo: 'PROFESSOR'
  };

  // --- ESTADOS ---
  const [filtroNivel, setFiltroNivel] = useState('todos');
  const [filtroPeriodo, setFiltroPeriodo] = useState('mes');
  const [termoBusca, setTermoBusca] = useState('');
  const [alunoSelecionado, setAlunoSelecionado] = useState<any>(null);
  const [modalAberto, setModalAberto] = useState(false);

  // --- DADOS SIMULADOS (MOCK) ---
  const estatisticasGerais = {
    totalAlunos: 1247,
    alunosAtivos: 892,
    mediaNotas: 78.5,
    taxaConclusao: 65.2,
    materiaisTop: [
      { nome: 'Álgebra Fundamental', views: 2341, avaliacao: 4.8 },
      { nome: 'Geometria Plana', views: 1987, avaliacao: 4.7 },
      { nome: 'Combinatória Básica', views: 1654, avaliacao: 4.9 }
    ]
  };

  const listaAlunos = [
    {
      id: 1,
      nome: 'Ana Silva',
      email: 'ana@email.com',
      nivel: 'Nível 2',
      ultimoAcesso: '2024-10-10',
      cursosCompletos: 8,
      mediaGeral: 85.5,
      horasTotais: 42,
      materiaisAcessados: 15,
      avaliacoesFeitas: 12,
      postsForum: 5
    },
    {
      id: 2,
      nome: 'Carlos Santos',
      email: 'carlos@email.com',
      nivel: 'Nível 3',
      ultimoAcesso: '2024-10-09',
      cursosCompletos: 12,
      mediaGeral: 92.3,
      horasTotais: 68,
      materiaisAcessados: 22,
      avaliacoesFeitas: 18,
      postsForum: 12
    },
    {
      id: 3,
      nome: 'Maria Costa',
      email: 'maria@email.com',
      nivel: 'Nível 1',
      ultimoAcesso: '2024-10-11',
      cursosCompletos: 5,
      mediaGeral: 76.8,
      horasTotais: 28,
      materiaisAcessados: 10,
      avaliacoesFeitas: 8,
      postsForum: 3
    },
    {
      id: 4,
      nome: 'João Oliveira',
      email: 'joao@email.com',
      nivel: 'Nível 2',
      ultimoAcesso: '2024-10-08',
      cursosCompletos: 7,
      mediaGeral: 81.2,
      horasTotais: 35,
      materiaisAcessados: 13,
      avaliacoesFeitas: 10,
      postsForum: 7
    },
    {
      id: 5,
      nome: 'Beatriz Lima',
      email: 'beatriz@email.com',
      nivel: 'Nível 3',
      ultimoAcesso: '2024-10-11',
      cursosCompletos: 15,
      mediaGeral: 88.7,
      horasTotais: 75,
      materiaisAcessados: 28,
      avaliacoesFeitas: 22,
      postsForum: 15
    }
  ];

  // --- LÓGICA DE FILTRO ---
  const alunosFiltrados = listaAlunos.filter(aluno => {
    const correspondeBusca = aluno.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
                             aluno.email.toLowerCase().includes(termoBusca.toLowerCase());
    const correspondeNivel = filtroNivel === 'todos' || aluno.nivel === filtroNivel;
    
    return correspondeBusca && correspondeNivel;
  });

  // --- FUNÇÕES AUXILIARES ---
  const abrirDetalhesAluno = (aluno: any) => {
    setAlunoSelecionado(aluno);
    setModalAberto(true);
  };

  const formatarData = (dataString: string) => {
    return new Date(dataString).toLocaleDateString('pt-BR');
  };

  const pegarCorNivel = (nivel: string) => {
    switch (nivel) {
      case 'Nível 1': return 'bg-green-100 text-green-800';
      case 'Nível 2': return 'bg-yellow-100 text-yellow-800';
      case 'Nível 3': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const pegarCorNota = (nota: number) => {
    if (nota >= 90) return 'text-green-600';
    if (nota >= 80) return 'text-blue-600';
    if (nota >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] pb-8">
      
      {/* --- HEADER DA PÁGINA --- */}
      <header className="bg-[#283593] text-white shadow-lg py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Activity className="h-6 w-6 text-[#FF9800]" />
              Estatísticas e Progresso
            </h1>
            <p className="text-blue-200 text-sm mt-1">Acompanhe o desempenho dos alunos - {usuarioAtual.nome}</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center px-4 py-2 border border-white/30 rounded-lg hover:bg-white/10 transition-colors text-sm font-medium">
              <ArrowLeft className="h-4 w-4 mr-2" /> Voltar ao Início
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* --- FILTROS --- */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="w-full md:w-48">
            <select 
              value={filtroPeriodo} 
              onChange={(e) => setFiltroPeriodo(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#283593] bg-white cursor-pointer"
            >
              <option value="semana">Últimos 7 dias</option>
              <option value="mes">Último mês</option>
              <option value="trimestre">Último trimestre</option>
              <option value="ano">Último ano</option>
            </select>
          </div>
          
          <div className="w-full md:w-48">
            <select 
              value={filtroNivel} 
              onChange={(e) => setFiltroNivel(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#283593] bg-white cursor-pointer"
            >
              <option value="todos">Todos os níveis</option>
              <option value="Nível 1">Nível 1</option>
              <option value="Nível 2">Nível 2</option>
              <option value="Nível 3">Nível 3</option>
            </select>
          </div>
        </div>

        {/* --- CARDS DE ESTATÍSTICAS GERAIS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Alunos */}
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total de Alunos</p>
                <p className="text-2xl font-bold text-gray-900">{estatisticasGerais.totalAlunos}</p>
                <p className="text-xs text-green-600 font-medium">+12% este mês</p>
              </div>
            </div>
          </div>
          
          {/* Alunos Ativos */}
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full">
                <Activity className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Alunos Ativos</p>
                <p className="text-2xl font-bold text-gray-900">{estatisticasGerais.alunosAtivos}</p>
                <p className="text-xs text-green-600 font-medium">+8% este mês</p>
              </div>
            </div>
          </div>
          
          {/* Nota Média */}
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-500">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-full">
                <Target className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Nota Média</p>
                <p className="text-2xl font-bold text-gray-900">{estatisticasGerais.mediaNotas}%</p>
                <p className="text-xs text-green-600 font-medium">+2.3% este mês</p>
              </div>
            </div>
          </div>
          
          {/* Taxa de Conclusão */}
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-500">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Conclusão</p>
                <p className="text-2xl font-bold text-gray-900">{estatisticasGerais.taxaConclusao}%</p>
                <p className="text-xs text-green-600 font-medium">+5.1% este mês</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- MATERIAIS MAIS ACESSADOS --- */}
        <div className="bg-white rounded-xl shadow-md mb-8 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-bold text-[#283593] flex items-center">
              <BookOpen className="h-5 w-5 mr-2" /> Materiais Mais Acessados
            </h3>
          </div>
          <div className="p-6 space-y-4">
            {estatisticasGerais.materiaisTop.map((material, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center">
                  <div className="bg-[#FF9800] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 shadow-sm">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{material.nome}</h4>
                    <p className="text-sm text-gray-600">{material.views} visualizações</p>
                  </div>
                </div>
                <div className="flex items-center bg-white px-3 py-1 rounded-full shadow-sm border border-gray-200">
                  <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
                  <span className="font-bold text-gray-700">{material.avaliacao}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- TABELA DE ALUNOS --- */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <h3 className="text-lg font-bold text-[#283593] flex items-center">
              <Users className="h-5 w-5 mr-2" /> Lista de Alunos
            </h3>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar alunos..."
                value={termoBusca}
                onChange={(e) => setTermoBusca(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#283593]"
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-[#283593] text-sm">Nome</th>
                  <th className="text-left py-4 px-6 font-semibold text-[#283593] text-sm">Nível</th>
                  <th className="text-left py-4 px-6 font-semibold text-[#283593] text-sm">Último Acesso</th>
                  <th className="text-left py-4 px-6 font-semibold text-[#283593] text-sm">Cursos</th>
                  <th className="text-left py-4 px-6 font-semibold text-[#283593] text-sm">Nota Média</th>
                  <th className="text-left py-4 px-6 font-semibold text-[#283593] text-sm">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {alunosFiltrados.map((aluno) => (
                  <tr key={aluno.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-bold text-gray-900">{aluno.nome}</p>
                        <p className="text-xs text-gray-500">{aluno.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${pegarCorNivel(aluno.nivel)}`}>
                        {aluno.nivel}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center text-gray-600 text-sm">
                        <Calendar className="h-3 w-3 mr-2" />
                        {formatarData(aluno.ultimoAcesso)}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-semibold text-gray-700">{aluno.cursosCompletos}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`font-bold ${pegarCorNota(aluno.mediaGeral)}`}>
                        {aluno.mediaGeral}%
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => abrirDetalhesAluno(aluno)}
                        className="bg-[#FF9800] hover:bg-orange-600 text-white px-3 py-1.5 rounded-md text-sm flex items-center transition-colors shadow-sm"
                      >
                        <Eye className="h-3 w-3 mr-1" /> Detalhes
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* --- MODAL DE DETALHES DO ALUNO --- */}
      {modalAberto && alunoSelecionado && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            
            {/* Header do Modal */}
            <div className="bg-[#283593] p-6 flex justify-between items-start text-white">
              <div>
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Users className="h-5 w-5" /> {alunoSelecionado.nome}
                </h2>
                <p className="text-blue-200 text-sm mt-1">{alunoSelecionado.email}</p>
              </div>
              <button onClick={() => setModalAberto(false)} className="text-white/80 hover:text-white hover:bg-white/20 p-1 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>
            
            {/* Corpo do Modal */}
            <div className="p-6 space-y-6 bg-gray-50 max-h-[80vh] overflow-y-auto">
              
              {/* Info Básica */}
              <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <div>
                  <p className="text-sm text-gray-500">Nível Atual</p>
                  <span className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-bold ${pegarCorNivel(alunoSelecionado.nivel)}`}>
                    {alunoSelecionado.nivel}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Aproveitamento Geral</p>
                  <p className={`text-2xl font-bold ${pegarCorNota(alunoSelecionado.mediaGeral)}`}>
                    {alunoSelecionado.mediaGeral}%
                  </p>
                </div>
              </div>

              {/* Grid de Estatísticas */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-100 rounded-full text-blue-600"><Clock size={18} /></div>
                    <span className="text-gray-600 text-sm font-medium">Tempo de Estudo</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-800 ml-1">{alunoSelecionado.horasTotais}h</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-green-100 rounded-full text-green-600"><BookOpen size={18} /></div>
                    <span className="text-gray-600 text-sm font-medium">Materiais Vistos</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-800 ml-1">{alunoSelecionado.materiaisAcessados}</p>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-purple-100 rounded-full text-purple-600"><Target size={18} /></div>
                    <span className="text-gray-600 text-sm font-medium">Avaliações</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-800 ml-1">{alunoSelecionado.avaliacoesFeitas}</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-orange-100 rounded-full text-orange-600"><Users size={18} /></div>
                    <span className="text-gray-600 text-sm font-medium">Fórum</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-800 ml-1">{alunoSelecionado.postsForum} posts</p>
                </div>
              </div>

              {/* Barra de Progresso Visual */}
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <p className="text-sm font-medium text-gray-600 mb-2">Progresso da Trilha</p>
                <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
                  <div 
                    className="bg-[#FF9800] h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${alunoSelecionado.mediaGeral}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-right">Baseado em atividades concluídas</p>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}