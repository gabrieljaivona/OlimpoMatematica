// src/app/forum/pergunta/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, ThumbsUp, ThumbsDown, Clock, User, Tag, Eye, 
  Shield, GraduationCap, BookOpen, Send, Award 
} from 'lucide-react';

export default function PaginaDetalhesPergunta() {
  const [novaResposta, setNovaResposta] = useState('');
  
  // --- DADOS SIMULADOS DA PERGUNTA ---
  const pergunta = {
    id: 1,
    titulo: 'Como resolver equações do segundo grau com discriminante negativo?',
    conteudo: `Estou com dificuldade para entender o que acontece quando o discriminante (Δ = b² - 4ac) é negativo em uma equação do segundo grau.
    
    Sei que quando Δ > 0, temos duas raízes reais e distintas.
    Quando Δ = 0, temos uma raiz real.
    Mas e quando Δ < 0? O que isso significa matematicamente?`,
    autor: 'Ana Silva',
    tipoAutor: 'ALUNO', // Opções: ALUNO, PROFESSOR, ADMIN, ESTAGIARIO
    dataCriacao: 'Há 2 horas',
    tags: ['álgebra', 'nível-2', 'equações'],
    votos: 15,
    visualizacoes: 142
  };

  // --- DADOS SIMULADOS DAS RESPOSTAS ---
  const respostasIniciais = [
    {
      id: 1,
      conteudo: 'Quando o discriminante é negativo, a equação não possui raízes reais, mas possui raízes complexas! No ensino médio, costumamos dizer que não existe solução nos Reais.',
      autor: 'Prof. Carlos Mendes',
      tipoAutor: 'PROFESSOR',
      dataCriacao: 'Há 1 hora',
      votos: 23,
      verificado: true
    },
    {
      id: 2,
      conteudo: 'Dica para a OBMEP: Se cair algo assim, verifique se a questão pede o número de raízes reais. Nesse caso, a resposta é zero.',
      autor: 'Admin Sistema',
      tipoAutor: 'ADMIN',
      dataCriacao: 'Há 30 min',
      votos: 12,
      verificado: true
    }
  ];

  // Função para pegar o estilo visual (ícone e cor) baseado no tipo de usuário
  const obterSeloUsuario = (tipoUsuario: string) => {
    switch (tipoUsuario) {
      case 'ADMIN': 
        return { icone: Shield, classe: 'bg-[#BF8841] text-white', texto: 'Administrador' };
      case 'PROFESSOR': 
        return { icone: GraduationCap, classe: 'bg-[#283593] text-white', texto: 'Professor' };
      case 'ESTAGIARIO': 
        return { icone: BookOpen, classe: 'bg-blue-600 text-white', texto: 'Estagiário' };
      default: 
        return { icone: User, classe: 'bg-gray-500 text-white', texto: 'Aluno' };
    }
  };

  const enviarResposta = () => {
    alert(`Enviando resposta: ${novaResposta}`);
    setNovaResposta('');
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Botão de Voltar */}
        <Link href="/forum" className="inline-flex items-center text-gray-600 hover:text-[#283593] mb-6 font-medium transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar ao Fórum
        </Link>

        {/* --- CARD DA PERGUNTA PRINCIPAL --- */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8 border border-gray-100">
          <h1 className="text-2xl font-bold text-[#283593] mb-4">{pergunta.titulo}</h1>
          
          {/* Informações do Autor e Data */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-900">{pergunta.autor}</span>
              {/* Renderização do Selo */}
              {(() => {
                const selo = obterSeloUsuario(pergunta.tipoAutor);
                const Icone = selo.icone;
                return (
                  <span className={`flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${selo.classe}`}>
                    <Icone className="h-3 w-3 mr-1" /> {selo.texto}
                  </span>
                );
              })()}
            </div>
            <div className="flex items-center"><Clock className="h-4 w-4 mr-1" /> {pergunta.dataCriacao}</div>
            <div className="flex items-center"><Eye className="h-4 w-4 mr-1" /> {pergunta.visualizacoes} visualizações</div>
          </div>

          {/* Tags (Categorias) */}
          <div className="flex gap-2 mb-6">
            {pergunta.tags.map((tag, index) => (
              <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium flex items-center">
                <Tag className="h-3 w-3 mr-1" /> {tag}
              </span>
            ))}
          </div>

          {/* Conteúdo da Pergunta */}
          <p className="text-gray-700 whitespace-pre-line leading-relaxed mb-6">{pergunta.conteudo}</p>

          {/* Área de Votação */}
          <div className="flex items-center gap-4 border-t border-gray-100 pt-4">
            <button className="flex items-center gap-1 text-gray-500 hover:text-green-600 transition-colors">
              <ThumbsUp className="h-5 w-5" /> Útil
            </button>
            <span className="font-bold text-[#283593]">{pergunta.votos}</span>
            <button className="flex items-center gap-1 text-gray-500 hover:text-red-600 transition-colors">
              <ThumbsDown className="h-5 w-5" /> Não útil
            </button>
          </div>
        </div>

        {/* --- LISTA DE RESPOSTAS --- */}
        <h2 className="text-xl font-bold text-[#283593] mb-6">
          {respostasIniciais.length} Respostas
        </h2>
        
        <div className="space-y-6 mb-8">
          {respostasIniciais.map((resposta) => {
            const selo = obterSeloUsuario(resposta.tipoAutor);
            const Icone = selo.icone;
            // Verifica se é especialista para destacar a borda
            const ehEspecialista = resposta.tipoAutor === 'PROFESSOR' || resposta.tipoAutor === 'ADMIN';

            return (
              <div 
                key={resposta.id} 
                className={`bg-white rounded-xl shadow-sm p-6 ${ehEspecialista ? 'border-l-4 border-[#283593] bg-blue-50/30' : 'border border-gray-100'}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-gray-900">{resposta.autor}</span>
                    <span className={`flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${selo.classe}`}>
                      <Icone className="h-3 w-3 mr-1" /> {selo.texto}
                    </span>
                    {resposta.verificado && (
                      <span className="text-xs text-green-700 font-bold flex items-center bg-green-100 px-2 py-0.5 rounded-full border border-green-200">
                        <Award className="h-3 w-3 mr-1" /> Verificada
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">{resposta.dataCriacao}</span>
                </div>
                
                <p className="text-gray-700 mb-4 leading-relaxed">{resposta.conteudo}</p>
                
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <button className="hover:text-green-600 flex items-center gap-1 transition-colors">
                    <ThumbsUp className="h-4 w-4"/> {resposta.votos} votos
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* --- FORMULÁRIO DE NOVA RESPOSTA --- */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-[#283593] mb-4">Sua Resposta</h3>
          <textarea 
            className="w-full border border-gray-300 rounded-lg p-4 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-[#283593] focus:border-transparent mb-4 resize-y text-gray-700 placeholder-gray-400"
            placeholder="Escreva sua resposta aqui... Seja gentil, claro e use exemplos se possível!"
            value={novaResposta}
            onChange={(e) => setNovaResposta(e.target.value)}
          />
          <button 
            onClick={enviarResposta}
            disabled={!novaResposta.trim()}
            className="bg-[#FF9800] hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-2.5 px-6 rounded-lg flex items-center transition-colors shadow-sm"
          >
            <Send className="h-4 w-4 mr-2" /> Enviar Resposta
          </button>
        </div>

      </div>
    </div>
  );
}