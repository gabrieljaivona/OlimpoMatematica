// src/app/admin/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Eye, Calendar, FileText, AlertTriangle, User, ExternalLink, 
  CheckCircle, XCircle, BarChart3, ArrowRight, Plus, LogOut, 
  Zap, AlertCircle, MessageCircle, X
} from 'lucide-react';

export default function PainelAdmin() {
  // --- MOCK USER ---
  const usuarioAtual = {
    nome: 'Admin Sistema',
  };

  // --- ESTADOS ---
  const [materiaisPendentes, setMateriaisPendentes] = useState([
    {
      id: 1,
      titulo: 'Introdução à Álgebra Linear',
      descricao: 'Material completo sobre conceitos básicos de álgebra linear, incluindo vetores, matrizes e sistemas lineares.',
      nivel: 'Nível 2',
      categoria: 'Álgebra',
      dificuldade: 'Intermediário',
      autor: 'João Silva',
      dataEnvio: '2024-10-05',
      link: '#'
    },
    {
      id: 2,
      titulo: 'Problemas de Combinatória',
      descricao: 'Coleção de problemas resolvidos sobre análise combinatória com diferentes níveis de dificuldade.',
      nivel: 'Nível 3',
      categoria: 'Combinatória',
      dificuldade: 'Difícil',
      autor: 'Maria Santos',
      dataEnvio: '2024-10-04',
      link: '#'
    },
    {
      id: 3,
      titulo: 'Geometria Plana Básica',
      descricao: 'Fundamentos de geometria plana com exercícios práticos e demonstrações visuais.',
      nivel: 'Nível 1',
      categoria: 'Geometria',
      dificuldade: 'Fácil',
      autor: 'Pedro Costa',
      dataEnvio: '2024-10-03',
      link: '#'
    }
  ]);

  const [materialSelecionado, setMaterialSelecionado] = useState<any>(null);
  const [modalRevisaoAberto, setModalRevisaoAberto] = useState(false);
  const [modalRejeicaoAberto, setModalRejeicaoAberto] = useState(false);
  const [modalCriacaoAberto, setModalCriacaoAberto] = useState(false); // Opcional, se quiser manter o modal de criação aqui
  const [feedback, setFeedback] = useState('');

  // --- FUNÇÕES AUXILIARES ---

  const pegarBadgeDificuldade = (dificuldade: string) => {
    switch (dificuldade) {
      case 'Fácil': return { icon: CheckCircle, classe: 'bg-green-100 text-green-800' };
      case 'Intermediário': return { icon: AlertCircle, classe: 'bg-yellow-100 text-yellow-800' };
      case 'Difícil': return { icon: Zap, classe: 'bg-red-100 text-red-800' };
      default: return { icon: CheckCircle, classe: 'bg-gray-100 text-gray-800' };
    }
  };

  const pegarCorNivel = (nivel: string) => {
    switch (nivel) {
      case 'Nível 1': return 'bg-green-100 text-green-800';
      case 'Nível 2': return 'bg-yellow-100 text-yellow-800';
      case 'Nível 3': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatarData = (dataString: string) => {
    return new Date(dataString).toLocaleDateString('pt-BR');
  };

  // --- AÇÕES ---

  const abrirRevisao = (material: any) => {
    setMaterialSelecionado(material);
    setModalRevisaoAberto(true);
  };

  const aprovarMaterial = () => {
    setMateriaisPendentes(materiaisPendentes.filter(m => m.id !== materialSelecionado.id));
    setModalRevisaoAberto(false);
    setMaterialSelecionado(null);
    alert("Material aprovado com sucesso!");
  };

  const iniciarRejeicao = () => {
    setModalRevisaoAberto(false);
    setModalRejeicaoAberto(true);
  };

  const confirmarRejeicao = () => {
    setMateriaisPendentes(materiaisPendentes.filter(m => m.id !== materialSelecionado.id));
    setModalRejeicaoAberto(false);
    setMaterialSelecionado(null);
    setFeedback('');
    alert("Material rejeitado e feedback enviado ao autor.");
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] ">
      
      {/* --- HEADER DO DASHBOARD --- */}
      <div className="bg-[#283593] text-white shadow-lg py-6 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Painel de Administração</h1>
            <p className="text-blue-200 text-sm">Bem-vindo, {usuarioAtual.nome}</p>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/estatisticas"
              className="flex items-center px-4 py-2 border border-white/30 rounded-lg hover:bg-white/10 transition-colors text-sm"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Estatísticas
            </Link>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- CARDS DE ESTATÍSTICAS RÁPIDAS --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm text-center border border-gray-100">
            <AlertTriangle className="h-8 w-8 text-[#FF9800] mx-auto mb-2" />
            <div className="text-2xl font-bold text-[#283593]">{materiaisPendentes.length}</div>
            <div className="text-sm text-gray-600">Materiais Pendentes</div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm text-center border border-gray-100">
            <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-[#283593]">47</div>
            <div className="text-sm text-gray-600">Materiais Aprovados</div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm text-center border border-gray-100">
            <User className="h-8 w-8 text-[#BF8841] mx-auto mb-2" />
            <div className="text-2xl font-bold text-[#283593]">156</div>
            <div className="text-sm text-gray-600">Usuários Ativos</div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm text-center border border-gray-100">
            <FileText className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-[#283593]">89</div>
            <div className="text-sm text-gray-600">Downloads Hoje</div>
          </div>
        </div>

        {/* --- AÇÕES RÁPIDAS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Criar Material (Link para a página de novo material) */}
          <Link href="/materiais/novo" className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100 group text-center">
            <Plus className="h-12 w-12 text-[#FF9800] mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold text-[#283593] mb-2">Criar Novo Material</h3>
            <p className="text-gray-600 text-sm mb-4">Adicione um novo material de estudo à plataforma.</p>
            <span className="inline-flex items-center justify-center w-full bg-[#FF9800] hover:bg-orange-600 text-white py-2 rounded-lg font-medium transition-colors">
              Criar Material <ArrowRight className="h-4 w-4 ml-2" />
            </span>
          </Link>

          {/* Ver Dúvidas */}
          <Link href="/duvidas-avaliacoes" className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100 group text-center">
            <MessageCircle className="h-12 w-12 text-[#FF9800] mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold text-[#283593] mb-2">Dúvidas das Avaliações</h3>
            <p className="text-gray-600 text-sm mb-4">Responda às dúvidas dos alunos sobre questões.</p>
            <span className="inline-flex items-center justify-center w-full bg-[#FF9800] hover:bg-orange-600 text-white py-2 rounded-lg font-medium transition-colors">
              Ver Dúvidas <ArrowRight className="h-4 w-4 ml-2" />
            </span>
          </Link>
        </div>

        {/* --- LISTA DE MATERIAIS PENDENTES --- */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          <div className="p-6 border-b border-gray-100 bg-gray-50">
            <h3 className="text-lg font-bold text-[#283593] flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-yellow-600" />
              Materiais Pendentes de Aprovação
            </h3>
          </div>
          
          <div className="p-6">
            {materiaisPendentes.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900">Nenhum material pendente</h3>
                <p className="text-gray-500">Todos os materiais foram revisados!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {materiaisPendentes.map((material) => {
                  const badgeDificuldade = pegarBadgeDificuldade(material.dificuldade);
                  const IconeDificuldade = badgeDificuldade.icon;
                  
                  return (
                    <div key={material.id} className="border-l-4 border-l-[#FF9800] bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-[#283593] mb-2">{material.titulo}</h3>
                          <p className="text-gray-600 mb-4 text-sm">{material.descricao}</p>

                          <div className="flex flex-wrap gap-2 mb-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${pegarCorNivel(material.nivel)}`}>
                              {material.nivel}
                            </span>
                            <span className="px-2 py-1 rounded-full text-xs font-medium border border-gray-200 text-gray-600">
                              {material.categoria}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${badgeDificuldade.classe}`}>
                              <IconeDificuldade className="w-3 h-3" /> {material.dificuldade}
                            </span>
                          </div>

                          <div className="flex items-center text-sm text-gray-500 space-x-4">
                            <div className="flex items-center">
                              <User className="h-4 w-4 mr-1" />
                              <span>Por: {material.autor}</span>
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>Enviado em: {formatarData(material.dataEnvio)}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 min-w-[120px]">
                          <button
                            onClick={() => abrirRevisao(material)}
                            className="bg-[#283593] hover:bg-blue-800 text-white py-2 px-4 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                          >
                            <Eye className="h-4 w-4" /> Revisar
                          </button>
                          
                          <a
                            href={material.link}
                            target="_blank"
                            className="border border-[#BF8841] text-[#BF8841] hover:bg-[#BF8841] hover:text-white py-2 px-4 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                          >
                            <ExternalLink className="h-4 w-4" /> Abrir
                          </a>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* --- MODAL DE REVISÃO --- */}
      {modalRevisaoAberto && materialSelecionado && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-[#283593] p-4 flex justify-between items-center text-white">
              <h3 className="text-lg font-bold">Revisar Material</h3>
              <button onClick={() => setModalRevisaoAberto(false)} className="hover:bg-white/20 p-1 rounded-full"><X size={20}/></button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <h3 className="font-bold text-xl text-gray-800">{materialSelecionado.titulo}</h3>
                <p className="text-gray-600 mt-2">{materialSelecionado.descricao}</p>
              </div>

              <div className="flex gap-2">
                <span className="bg-gray-100 px-2 py-1 rounded text-sm font-medium">{materialSelecionado.nivel}</span>
                <span className="bg-gray-100 px-2 py-1 rounded text-sm font-medium">{materialSelecionado.categoria}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <User size={16}/> Autor: {materialSelecionado.autor}
              </div>

              <div className="flex gap-4 pt-4 border-t mt-4">
                <button
                  onClick={aprovarMaterial}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <CheckCircle className="h-5 w-5" /> Aprovar Material
                </button>
                
                <button
                  onClick={iniciarRejeicao}
                  className="flex-1 border border-red-500 text-red-600 hover:bg-red-50 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <XCircle className="h-5 w-5" /> Rejeitar Material
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL DE REJEIÇÃO (MOTIVO) --- */}
      {modalRejeicaoAberto && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="p-6">
              <h3 className="text-lg font-bold text-red-600 mb-2">Rejeitar Material</h3>
              <p className="text-sm text-gray-600 mb-4">Por favor, forneça um feedback para o autor sobre o motivo da rejeição.</p>
              
              <textarea
                className="w-full border border-gray-300 rounded-lg p-3 min-h-[100px] mb-4 focus:ring-2 focus:ring-red-500 outline-none"
                placeholder="Explique o motivo..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />

              <div className="flex gap-3">
                <button 
                  onClick={() => setModalRejeicaoAberto(false)}
                  className="flex-1 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button 
                  onClick={confirmarRejeicao}
                  disabled={!feedback.trim()}
                  className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold disabled:opacity-50"
                >
                  Confirmar Rejeição
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}