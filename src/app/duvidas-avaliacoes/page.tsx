// src/app/duvidas-avaliacoes/page.tsx
'use client';

import { useState } from 'react';
import { MessageCircle, CheckCircle, AlertCircle, User, Reply, Send } from 'lucide-react';

export default function PaginaDuvidasAvaliacoes() {
  const [filtroStatus, setFiltroStatus] = useState('pendente'); // 'pendente' ou 'respondida'
  const [modalAberto, setModalAberto] = useState(false);
  const [duvidaSelecionada, setDuvidaSelecionada] = useState<any>(null);
  const [textoResposta, setTextoResposta] = useState('');

  // --- DADOS SIMULADOS (MOCK) ---
  const listaDuvidas = [
    {
      id: 1,
      aluno: 'João Silva',
      avaliacao: 'Quiz: Álgebra Básica',
      questao: 'Resolva a equação: 2x + 5 = 13',
      duvida: 'Não entendi como isolar o x. O 5 passa subtraindo?',
      data: '2024-10-15',
      status: 'pendente'
    },
    {
      id: 2,
      aluno: 'Maria Santos',
      avaliacao: 'Simulado Nível 2',
      questao: 'Qual a área do triângulo...',
      duvida: 'Esqueci a fórmula da área. É base vezes altura?',
      data: '2024-10-14',
      status: 'respondida',
      respostaProfessor: 'Isso mesmo, Maria! Base x Altura dividido por 2.'
    }
  ];

  // Filtra as dúvidas baseado no botão que o professor clicou
  const duvidasFiltradas = listaDuvidas.filter(d => 
    filtroStatus === 'todas' || d.status === filtroStatus
  );

  const abrirModalResponder = (duvida: any) => {
    setDuvidaSelecionada(duvida);
    setModalAberto(true);
  };

  const enviarResposta = () => {
    alert(`Resposta enviada para ${duvidaSelecionada.aluno}: ${textoResposta}`);
    setModalAberto(false);
    setTextoResposta('');
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] py-8">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Cabeçalho da Página */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#283593] mb-2">Dúvidas das Avaliações</h1>
          <p className="text-gray-600">Responda aos alunos que solicitaram ajuda em questões específicas de provas.</p>
        </div>

        {/* Cards de Resumo (Estatísticas Rápidas) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm flex items-center border border-gray-100">
            <div className="bg-orange-100 p-3 rounded-full mr-4"><AlertCircle className="text-orange-600"/></div>
            <div><p className="text-gray-500 text-sm font-medium">Pendentes</p><p className="text-2xl font-bold text-gray-800">1</p></div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm flex items-center border border-gray-100">
            <div className="bg-green-100 p-3 rounded-full mr-4"><CheckCircle className="text-green-600"/></div>
            <div><p className="text-gray-500 text-sm font-medium">Respondidas</p><p className="text-2xl font-bold text-gray-800">1</p></div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm flex items-center border border-gray-100">
             <div className="bg-blue-100 p-3 rounded-full mr-4"><MessageCircle className="text-blue-600"/></div>
             <div><p className="text-gray-500 text-sm font-medium">Total</p><p className="text-2xl font-bold text-gray-800">2</p></div>
          </div>
        </div>

        {/* Botões de Filtro */}
        <div className="flex gap-2 mb-6">
          <button 
            onClick={() => setFiltroStatus('pendente')} 
            className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${filtroStatus === 'pendente' ? 'bg-[#FF9800] text-white shadow-sm' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
          >
            Pendentes
          </button>
          <button 
            onClick={() => setFiltroStatus('respondida')} 
            className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${filtroStatus === 'respondida' ? 'bg-green-600 text-white shadow-sm' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
          >
            Respondidas
          </button>
        </div>

        {/* Lista de Dúvidas */}
        <div className="space-y-4">
          {duvidasFiltradas.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm">
              <p className="text-gray-500">Nenhuma dúvida encontrada com este filtro.</p>
            </div>
          ) : (
            duvidasFiltradas.map((item) => (
              <div 
                key={item.id} 
                className={`bg-white p-6 rounded-xl shadow-sm border-l-4 ${item.status === 'pendente' ? 'border-[#FF9800]' : 'border-green-600'}`}
              >
                {/* Cabeçalho do Card */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="font-bold text-gray-900">{item.aluno}</span>
                    <span className="text-sm text-gray-400">• {item.data}</span>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${item.status === 'pendente' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'}`}>
                    {item.status === 'pendente' ? 'PENDENTE' : 'RESPONDIDA'}
                  </span>
                </div>

                {/* Contexto da Questão */}
                <div className="bg-blue-50 p-4 rounded-lg mb-4 border border-blue-100">
                  <p className="text-xs text-blue-600 font-bold uppercase mb-1 tracking-wide">Contexto ({item.avaliacao})</p>
                  <p className="text-blue-900 font-medium">{item.questao}</p>
                </div>

                {/* A Dúvida do Aluno */}
                <div className="mb-4">
                  <span className="font-bold text-gray-900 block mb-1">Dúvida do Aluno:</span>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100 italic">"{item.duvida}"</p>
                </div>

                {/* Se já foi respondida, mostra a resposta */}
                {item.status === 'respondida' && (
                   <div className="mb-2">
                   <span className="font-bold text-green-700 block mb-1">Sua Resposta:</span>
                   <p className="text-gray-700 bg-green-50 p-3 rounded-lg border border-green-100">{item.respostaProfessor}</p>
                 </div>
                )}

                {/* Botão de Ação (Só aparece se estiver pendente) */}
                {item.status === 'pendente' && (
                  <button 
                    onClick={() => abrirModalResponder(item)}
                    className="w-full bg-[#283593] hover:bg-blue-800 text-white py-2.5 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors shadow-sm mt-2"
                  >
                    <Reply size={18} /> Responder Aluno
                  </button>
                )}
              </div>
            ))
          )}
        </div>

        {/* MODAL DE RESPOSTA (Pop-up) */}
        {modalAberto && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-2xl animate-in fade-in zoom-in duration-200">
              <h3 className="text-xl font-bold text-[#283593] mb-4">Responder Dúvida</h3>
              
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-1">Aluno:</p>
                <p className="font-bold text-gray-900">{duvidaSelecionada?.aluno}</p>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-1">Dúvida:</p>
                <p className="bg-gray-100 p-3 rounded-lg text-sm italic text-gray-700 border-l-4 border-gray-300">
                  "{duvidaSelecionada?.duvida}"
                </p>
              </div>
              
              <textarea 
                className="w-full border border-gray-300 rounded-lg p-3 min-h-[150px] mb-4 focus:outline-none focus:ring-2 focus:ring-[#283593] focus:border-transparent resize-none placeholder-gray-400"
                placeholder="Digite sua explicação aqui..."
                value={textoResposta}
                onChange={(e) => setTextoResposta(e.target.value)}
              />
              
              <div className="flex gap-3 justify-end">
                <button 
                  onClick={() => setModalAberto(false)} 
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  onClick={enviarResposta} 
                  disabled={!textoResposta.trim()}
                  className="px-4 py-2 bg-[#FF9800] text-white font-bold rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors shadow-sm"
                >
                  <Send size={16}/> Enviar Resposta
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}