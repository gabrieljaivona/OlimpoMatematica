// src/app/forum/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Plus, Search, MessageSquare, ThumbsUp, Clock, User, Tag, 
  Eye, GraduationCap, Shield, BookOpen, Star, CheckCircle 
} from 'lucide-react';

export default function PaginaForum() {
  const [termoBusca, setTermoBusca] = useState('');
  const [ordenarPor, setOrdenarPor] = useState('recente');
  const [filtroTag, setFiltroTag] = useState('todas');

  // --- DADOS SIMULADOS (MOCK) ---
  const perguntasIniciais = [
    {
      id: 1,
      titulo: 'Como resolver equações do segundo grau com discriminante negativo?',
      conteudo: 'Estou com dificuldade para entender o que acontece quando o discriminante é negativo...',
      autor: 'Ana Silva',
      tipoAutor: 'ALUNO',
      dataCriacao: '2024-10-11T10:30:00',
      tags: ['álgebra', 'nível-2', 'equações'],
      votos: 15,
      respostas: 8,
      visualizacoes: 142,
      temRespostaVerificada: true,
      ultimaAtividade: '2024-10-11T14:20:00',
      ultimaRespostaPor: 'Prof. Maria Santos',
      tipoUltimaResposta: 'PROFESSOR'
    },
    {
      id: 2,
      titulo: 'Dúvida sobre o teorema de Pitágoras em triângulos não retângulos',
      conteudo: 'É possível aplicar o teorema de Pitágoras em triângulos que não são retângulos?',
      autor: 'Carlos Santos',
      tipoAutor: 'ALUNO',
      dataCriacao: '2024-10-11T09:15:00',
      tags: ['geometria', 'nível-1', 'teoremas'],
      votos: 23,
      respostas: 12,
      visualizacoes: 256,
      temRespostaVerificada: true,
      ultimaAtividade: '2024-10-11T13:45:00',
      ultimaRespostaPor: 'Admin Sistema',
      tipoUltimaResposta: 'ADMIN'
    },
    {
      id: 3,
      titulo: 'Combinações vs Permutações - quando usar cada uma?',
      conteudo: 'Sempre me confundo na hora de decidir se devo usar combinação ou permutação...',
      autor: 'Maria Costa',
      tipoAutor: 'ALUNO',
      dataCriacao: '2024-10-11T08:00:00',
      tags: ['combinatória', 'nível-3', 'probabilidade'],
      votos: 31,
      respostas: 15,
      visualizacoes: 389,
      temRespostaVerificada: false,
      ultimaAtividade: '2024-10-11T12:30:00',
      ultimaRespostaPor: 'João Silva',
      tipoUltimaResposta: 'ALUNO'
    }
  ];

  const tagsDisponiveis = ['todas', 'álgebra', 'geometria', 'combinatória', 'funções', 'nível-1', 'nível-2', 'nível-3'];

  // Lógica de Filtro
  const perguntasFiltradas = perguntasIniciais.filter(pergunta => {
    const correspondeBusca = pergunta.titulo.toLowerCase().includes(termoBusca.toLowerCase()) ||
                             pergunta.conteudo.toLowerCase().includes(termoBusca.toLowerCase());
    const correspondeTag = filtroTag === 'todas' || pergunta.tags.includes(filtroTag);
    return correspondeBusca && correspondeTag;
  });

  // Lógica de Ordenação
  const perguntasOrdenadas = [...perguntasFiltradas].sort((a, b) => {
    switch (ordenarPor) {
      case 'votos': return b.votos - a.votos;
      case 'respostas': return b.respostas - a.respostas;
      case 'visualizacoes': return b.visualizacoes - a.visualizacoes;
      case 'recente': default: return new Date(b.ultimaAtividade).getTime() - new Date(a.ultimaAtividade).getTime();
    }
  });

  // Função auxiliar para selos
  const getSeloUsuario = (tipo: string) => {
    switch (tipo) {
      case 'ADMIN': return { icon: Shield, classe: 'bg-[#BF8841] text-white', label: 'Admin' };
      case 'PROFESSOR': return { icon: GraduationCap, classe: 'bg-[#283593] text-white', label: 'Professor' };
      case 'ESTAGIARIO': return { icon: BookOpen, classe: 'bg-blue-600 text-white', label: 'Estagiário' };
      default: return { icon: User, classe: 'bg-gray-500 text-white', label: 'Aluno' };
    }
  };

  // Função auxiliar para data
  const formatarData = (dataString: string) => {
    const date = new Date(dataString);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      
      {/* --- Header da Página do Fórum --- */}
      <div className="bg-[#283593] text-white py-10 shadow-md">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Fórum de Dúvidas</h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Compartilhe conhecimento, tire suas dúvidas sobre a OBMEP e aprenda com a comunidade.
          </p>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-8">
        
        {/* --- Barra de Controle (Busca e Filtros) --- */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8 bg-white p-4 rounded-xl shadow-sm">
          
          {/* Busca */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Buscar perguntas..."
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#283593]"
            />
          </div>

          {/* Filtros */}
          <div className="flex flex-col sm:flex-row gap-3">
            <select 
              value={ordenarPor} 
              onChange={(e) => setOrdenarPor(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#283593] cursor-pointer"
            >
              <option value="recente">Mais recentes</option>
              <option value="votos">Mais votadas</option>
              <option value="respostas">Mais respondidas</option>
              <option value="visualizacoes">Mais visualizadas</option>
            </select>

            <select 
              value={filtroTag} 
              onChange={(e) => setFiltroTag(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#283593] cursor-pointer"
            >
              {tagsDisponiveis.map(tag => (
                <option key={tag} value={tag} className="capitalize">
                  {tag === 'todas' ? 'Todas as tags' : tag}
                </option>
              ))}
            </select>

            {/* Botão Nova Pergunta */}
            <Link
              href="/forum/nova-pergunta" // Criaremos essa página depois se quiser
              className="bg-[#FF9800] hover:bg-orange-600 text-white font-bold px-6 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <Plus className="h-5 w-5" />
              Nova Pergunta
            </Link>
          </div>
        </div>

        {/* --- Lista de Perguntas --- */}
        <div className="space-y-4">
          {perguntasOrdenadas.map((pergunta) => {
            const seloAutor = getSeloUsuario(pergunta.tipoAutor);
            const IconeAutor = seloAutor.icon;
            
            const seloUltimaResposta = getSeloUsuario(pergunta.tipoUltimaResposta);
            const IconeUltima = seloUltimaResposta.icon;
            
            return (
              <Link 
                key={pergunta.id} 
                href={`/forum/pergunta`} // Apontando para a página de detalhes que já criamos
                className="block bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 overflow-hidden group"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1 pr-4">
                      <h3 className="text-lg font-bold text-[#283593] mb-2 group-hover:text-[#FF9800] transition-colors">
                        {pergunta.titulo}
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {pergunta.conteudo}
                      </p>

                      {/* Autor e Data */}
                      <div className="flex items-center flex-wrap gap-3 text-sm text-gray-500">
                        <div className="flex items-center gap-1.5">
                          <User className="h-4 w-4" />
                          <span className="font-medium text-gray-900">{pergunta.autor}</span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 ${seloAutor.classe}`}>
                            <IconeAutor size={10} /> {seloAutor.label}
                          </span>
                        </div>
                        <span>•</span>
                        <span>{formatarData(pergunta.dataCriacao)}</span>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mt-3">
                        {pergunta.tags.map((tag, index) => (
                          <span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium flex items-center">
                            <Tag className="h-3 w-3 mr-1" /> {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Estatísticas Laterais */}
                    <div className="flex flex-col items-end gap-2 min-w-[100px]">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex flex-col items-center">
                          <span className="font-bold text-lg text-gray-700">{pergunta.votos}</span>
                          <span className="text-xs">votos</span>
                        </div>
                        <div className={`flex flex-col items-center ${pergunta.temRespostaVerificada ? 'text-green-600' : ''}`}>
                          <span className="font-bold text-lg">{pergunta.respostas}</span>
                          <span className="text-xs">respostas</span>
                        </div>
                      </div>

                      {pergunta.temRespostaVerificada && (
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full flex items-center mt-2 font-medium">
                          <CheckCircle className="h-3 w-3 mr-1" /> Resolvida
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Rodapé do Card (Última Atividade) */}
                  {pergunta.respostas > 0 && (
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-2">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        <span>Última atividade: {formatarData(pergunta.ultimaAtividade)}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-gray-500">por</span>
                        <span className="font-medium text-gray-700">{pergunta.ultimaRespostaPor}</span>
                        
                        {/* Se for professor ou admin, mostra estrela */}
                        {(pergunta.tipoUltimaResposta === 'PROFESSOR' || pergunta.tipoUltimaResposta === 'ADMIN') && (
                          <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </Link>
            )
          })}
        </div>

        {/* Estado Vazio */}
        {perguntasOrdenadas.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-100">
            <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhuma pergunta encontrada
            </h3>
            <p className="text-gray-500 mb-4">
              Tente ajustar os filtros ou seja o primeiro a perguntar!
            </p>
          </div>
        )}
      </main>
    </div>
  );
}