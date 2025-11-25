// src/app/avaliacoes/page.tsx
'use client';

import { useState } from 'react';
import { 
  Play, Clock, FileText, Award, Target, TrendingUp, 
  MessageCircle, Send, X 
} from 'lucide-react';

export default function PaginaAvaliacoes() {
  const [filtroNivel, setFiltroNivel] = useState('todos');
  const [filtroTipo, setFiltroTipo] = useState('todos');
  
  // Estados do Modal
  const [modalAberto, setModalAberto] = useState(false);
  const [avaliacaoSelecionada, setAvaliacaoSelecionada] = useState<any>(null);
  const [questaoSelecionada, setQuestaoSelecionada] = useState<any>(null);
  const [textoDuvida, setTextoDuvida] = useState('');

  // --- DADOS SIMULADOS (MOCK) ---
  const avaliacoes = [
    {
      id: 1,
      titulo: 'Quiz: Álgebra Básica',
      descricao: 'Teste seus conhecimentos em equações do primeiro e segundo grau',
      tipo: 'quiz',
      nivel: 'Nível 1',
      qtdQuestoes: 15,
      tempoLimite: 30,
      dificuldade: 'Fácil',
      tentativas: 3,
      melhorNota: 85,
      ultimaTentativa: '2024-10-10',
      concluido: true,
      categoria: 'Álgebra',
      listaQuestoes: [
        { id: 1, texto: 'Resolva a equação: 2x + 5 = 13' },
        { id: 2, texto: 'Qual é o valor de x² quando x = 3?' },
        { id: 3, texto: 'Fatore: x² - 9' }
      ]
    },
    {
      id: 2,
      titulo: 'Simulado OBMEP - Nível 2',
      descricao: 'Simulado completo baseado em provas anteriores da OBMEP',
      tipo: 'simulado',
      nivel: 'Nível 2',
      qtdQuestoes: 25,
      tempoLimite: 120,
      dificuldade: 'Médio',
      tentativas: 1,
      melhorNota: null,
      ultimaTentativa: null,
      concluido: false,
      categoria: 'Geral',
      listaQuestoes: [
        { id: 1, texto: 'Um triângulo tem lados de comprimento 3, 4 e 5. Qual é sua área?' },
        { id: 2, texto: 'Quantas maneiras diferentes existem para escolher 3 pessoas de um grupo de 10?' }
      ]
    },
    {
      id: 3,
      titulo: 'Quiz: Geometria Plana',
      descricao: 'Questões sobre triângulos, quadriláteros e círculos',
      tipo: 'quiz',
      nivel: 'Nível 2',
      qtdQuestoes: 12,
      tempoLimite: 25,
      dificuldade: 'Médio',
      tentativas: 2,
      melhorNota: 92,
      ultimaTentativa: '2024-10-09',
      concluido: true,
      categoria: 'Geometria',
      listaQuestoes: [
        { id: 1, texto: 'Qual é a soma dos ângulos internos de um quadrilátero?' },
        { id: 2, texto: 'Calcule a área de um círculo com raio 5 cm' }
      ]
    }
  ];

  const estatisticasUsuario = {
    totalAvaliacoes: 6,
    concluidas: 4,
    notaMedia: 80.5,
    tempoTotal: 245,
    melhorCategoria: 'Geometria',
    taxaMelhoria: 15.2
  };

  // --- FILTROS ---
  const avaliacoesFiltradas = avaliacoes.filter(avaliacao => {
    const correspondeNivel = filtroNivel === 'todos' || avaliacao.nivel === filtroNivel;
    const correspondeTipo = filtroTipo === 'todos' || avaliacao.tipo === filtroTipo;
    return correspondeNivel && correspondeTipo;
  });

  // --- FUNÇÕES AUXILIARES ---
  const formatarTempo = (minutos: number) => {
    const horas = Math.floor(minutos / 60);
    const mins = minutos % 60;
    if (horas > 0) return `${horas}h ${mins}min`;
    return `${mins}min`;
  };

  const formatarData = (dataString: string | null) => {
    if (!dataString) return 'Nunca';
    return new Date(dataString).toLocaleDateString('pt-BR');
  };

  const pegarCorDificuldade = (dificuldade: string) => {
    switch (dificuldade) {
      case 'Fácil': return 'bg-green-100 text-green-800';
      case 'Médio': return 'bg-yellow-100 text-yellow-800';
      case 'Difícil': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const pegarCorNivel = (nivel: string) => {
    switch (nivel) {
      case 'Nível 1': return 'bg-blue-100 text-blue-800';
      case 'Nível 2': return 'bg-purple-100 text-purple-800';
      case 'Nível 3': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const pegarCorNota = (nota: number) => {
    if (nota >= 90) return 'text-green-600';
    if (nota >= 80) return 'text-blue-600';
    if (nota >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  // --- AÇÕES DE DÚVIDA ---
  const abrirModalDuvida = (avaliacao: any, questao: any) => {
    setAvaliacaoSelecionada(avaliacao);
    setQuestaoSelecionada(questao);
    setModalAberto(true);
  };

  const enviarDuvida = () => {
    if (textoDuvida.trim()) {
      alert('Dúvida enviada com sucesso! Um professor responderá em breve.');
      setTextoDuvida('');
      setModalAberto(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- HEADER E ESTATÍSTICAS --- */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#283593] mb-6">Avaliações e Simulados</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-white p-6 rounded-xl shadow-sm flex items-center border border-gray-100">
              <div className="bg-blue-100 p-3 rounded-full mr-4"><FileText className="text-blue-600" /></div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Feitas</p>
                <p className="text-2xl font-bold text-gray-800">{estatisticasUsuario.concluidas}/{estatisticasUsuario.totalAvaliacoes}</p>
              </div>
            </div>
            {/* Card 2 */}
            <div className="bg-white p-6 rounded-xl shadow-sm flex items-center border border-gray-100">
              <div className="bg-green-100 p-3 rounded-full mr-4"><Target className="text-green-600" /></div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Nota Média</p>
                <p className="text-2xl font-bold text-gray-800">{estatisticasUsuario.notaMedia}%</p>
              </div>
            </div>
            {/* Card 3 */}
            <div className="bg-white p-6 rounded-xl shadow-sm flex items-center border border-gray-100">
              <div className="bg-purple-100 p-3 rounded-full mr-4"><Clock className="text-purple-600" /></div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Tempo Total</p>
                <p className="text-2xl font-bold text-gray-800">{formatarTempo(estatisticasUsuario.tempoTotal)}</p>
              </div>
            </div>
            {/* Card 4 */}
            <div className="bg-white p-6 rounded-xl shadow-sm flex items-center border border-gray-100">
              <div className="bg-orange-100 p-3 rounded-full mr-4"><TrendingUp className="text-orange-600" /></div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Melhoria</p>
                <p className="text-2xl font-bold text-gray-800">+{estatisticasUsuario.taxaMelhoria}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- FILTROS --- */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
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
          
          <div className="w-full md:w-48">
            <select 
              value={filtroTipo} 
              onChange={(e) => setFiltroTipo(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#283593] bg-white cursor-pointer"
            >
              <option value="todos">Todos os tipos</option>
              <option value="quiz">Quizzes</option>
              <option value="simulado">Simulados</option>
            </select>
          </div>
        </div>

        {/* --- LISTA DE AVALIAÇÕES --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {avaliacoesFiltradas.map((avaliacao) => (
            <div 
              key={avaliacao.id} 
              className={`bg-white rounded-xl shadow-md overflow-hidden border-l-4 ${avaliacao.concluido ? 'border-l-green-500' : 'border-l-[#FF9800]'} transition-all hover:shadow-lg`}
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#283593] mb-1">{avaliacao.titulo}</h3>
                  <p className="text-sm text-gray-600 mb-3">{avaliacao.descricao}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${pegarCorNivel(avaliacao.nivel)}`}>
                      {avaliacao.nivel}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${pegarCorDificuldade(avaliacao.dificuldade)}`}>
                      {avaliacao.dificuldade}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-gray-100 text-gray-600 border border-gray-200 uppercase">
                      {avaliacao.tipo}
                    </span>
                  </div>
                </div>
                
                {avaliacao.concluido && avaliacao.melhorNota !== null && (
                  <div className="text-right">
                    <p className={`text-2xl font-bold ${pegarCorNota(avaliacao.melhorNota)}`}>
                      {avaliacao.melhorNota}%
                    </p>
                    <p className="text-xs text-gray-500">Melhor nota</p>
                  </div>
                )}
              </div>
              
              <div className="p-6 pt-4">
                {/* Detalhes da Avaliação */}
                <div className="grid grid-cols-3 gap-4 text-sm mb-4 bg-gray-50 p-3 rounded-lg">
                  <div className="text-center">
                    <p className="text-gray-500 text-xs uppercase font-bold mb-1">Questões</p>
                    <p className="font-bold text-gray-800">{avaliacao.qtdQuestoes}</p>
                  </div>
                  <div className="text-center border-x border-gray-200">
                    <p className="text-gray-500 text-xs uppercase font-bold mb-1">Tempo</p>
                    <p className="font-bold text-gray-800">{formatarTempo(avaliacao.tempoLimite)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-500 text-xs uppercase font-bold mb-1">Tentativas</p>
                    <p className="font-bold text-gray-800">{avaliacao.tentativas}</p>
                  </div>
                </div>

                {avaliacao.concluido && (
                  <p className="text-xs text-gray-500 mb-4 text-center">
                    Última tentativa: {formatarData(avaliacao.ultimaTentativa)}
                  </p>
                )}

                {/* Lista de Questões (Preview) */}
                {avaliacao.listaQuestoes && avaliacao.listaQuestoes.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs font-bold text-gray-500 uppercase mb-2">Exemplos de Questões:</p>
                    <div className="space-y-2">
                      {avaliacao.listaQuestoes.map((questao) => (
                        <div key={questao.id} className="flex items-start justify-between bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                          <p className="text-sm text-gray-700 flex-1 pr-2 line-clamp-1">
                            <span className="font-bold mr-2 text-[#283593]">Q{questao.id}:</span>
                            {questao.texto}
                          </p>
                          <button
                            onClick={() => abrirModalDuvida(avaliacao, questao)}
                            className="text-[#FF9800] hover:bg-orange-50 p-1 rounded transition-colors"
                            title="Tenho dúvida nesta questão"
                          >
                            <MessageCircle size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <button 
                  className="w-full bg-[#283593] hover:bg-blue-800 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md"
                >
                  <Play size={18} />
                  {avaliacao.concluido ? 'Tentar Novamente' : 'Iniciar Avaliação'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* --- MODAL DE DÚVIDA (Pop-up) --- */}
        {modalAberto && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl w-full max-w-lg shadow-2xl animate-in fade-in zoom-in duration-200 overflow-hidden">
              
              <div className="bg-[#283593] p-4 flex justify-between items-center text-white">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <MessageCircle size={20} /> Dúvida na Questão
                </h3>
                <button onClick={() => setModalAberto(false)} className="hover:bg-white/20 p-1 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6">
                <div className="bg-blue-50 p-3 rounded-lg mb-4 border border-blue-100">
                  <p className="text-xs text-blue-600 font-bold uppercase mb-1">Avaliação</p>
                  <p className="text-sm font-medium text-blue-900">{avaliacaoSelecionada?.titulo}</p>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg mb-4 border border-gray-200">
                  <p className="text-xs text-gray-500 font-bold uppercase mb-1">Questão</p>
                  <p className="text-sm font-medium text-gray-800">{questaoSelecionada?.texto}</p>
                </div>

                <label className="block text-sm font-bold text-gray-700 mb-2">Qual é sua dúvida?</label>
                <textarea 
                  className="w-full border border-gray-300 rounded-lg p-3 min-h-[120px] mb-4 focus:outline-none focus:ring-2 focus:ring-[#283593] focus:border-transparent resize-none placeholder-gray-400"
                  placeholder="Explique o que você não entendeu..."
                  value={textoDuvida}
                  onChange={(e) => setTextoDuvida(e.target.value)}
                />
                
                <div className="flex gap-3 justify-end">
                  <button 
                    onClick={() => setModalAberto(false)} 
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors"
                  >
                    Cancelar
                  </button>
                  <button 
                    onClick={enviarDuvida} 
                    disabled={!textoDuvida.trim()}
                    className="px-4 py-2 bg-[#FF9800] text-white font-bold rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors shadow-sm"
                  >
                    <Send size={16}/> Enviar Dúvida
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}