// src/app/perfil/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, User, GraduationCap, Shield, BookOpen, MessageSquare, 
  Award, Calendar, Clock, Star, TrendingUp, Target, CheckCircle, 
  Eye, ThumbsUp 
} from 'lucide-react';

export default function PaginaPerfil() {
  
  // --- CONTROLE DE SIMULAÇÃO (MOCK) ---
  // Mude o ID abaixo para 1, 2 ou 3 para ver como a página muda!
  const ID_USUARIO_SIMULADO = 3; 

  const dadosUsuarios = {
    1: {
      id: 1,
      nome: 'Prof. Maria Santos',
      email: 'maria@olimpo.com',
      tipo: 'PROFESSOR',
      dataEntrada: '2024-01-15',
      bio: 'Professora de Matemática com 15 anos de experiência em preparação para olimpíadas. Especialista em Álgebra e Geometria.',
      estatisticas: {
        materiaisCriados: 24,
        perguntasRespondidas: 156,
        respostasUteis: 142,
        reputacao: 4.9,
        alunosAjudados: 89
      }
    },
    2: {
      id: 2,
      nome: 'João Silva',
      email: 'joao@olimpo.com',
      tipo: 'ALUNO', // 'student'
      dataEntrada: '2024-03-10',
      bio: 'Estudante do 2º ano do Ensino Médio, apaixonado por matemática e preparando para a OBMEP.',
      estatisticas: {
        avaliacoesFeitas: 12,
        notaMedia: 85,
        perguntasFeitas: 8,
        melhorCategoria: 'Geometria',
        horasEstudo: 45
      }
    },
    3: {
      id: 3,
      nome: 'Admin Sistema',
      email: 'admin@olimpo.com',
      tipo: 'ADMIN',
      dataEntrada: '2024-01-01',
      bio: 'Administrador da plataforma Olimpo Matemático, responsável pela gestão geral do sistema.',
      estatisticas: {
        materiaisAprovados: 156,
        usuariosGerenciados: 234,
        tempoSistemaOnline: 99.9,
        totalUsuarios: 234,
        idadePlataforma: 10
      }
    }
  };

  // @ts-ignore (Ignora erro de tipagem no mock para simplificar)
  const usuarioExibido: any = dadosUsuarios[ID_USUARIO_SIMULADO as 1 | 2 | 3];

  const atividadesRecentes = [
    {
      id: 1,
      tipo: 'resposta',
      titulo: 'Respondeu: Como resolver equações do 2º grau?',
      data: '2024-10-15',
      votos: 12,
      aceita: true
    },
    {
      id: 2,
      tipo: 'pergunta',
      titulo: 'Perguntou: Dúvida sobre teorema de Pitágoras',
      data: '2024-10-14',
      votos: 5,
      respostas: 3
    },
    {
      id: 3,
      tipo: 'material',
      titulo: 'Criou material: Funções Quadráticas Avançadas',
      data: '2024-10-13',
      downloads: 89
    }
  ];

  // --- FUNÇÕES AUXILIARES ---

  const pegarSeloUsuario = (tipo: string) => {
    switch (tipo) {
      case 'ADMIN':
        return { icone: Shield, texto: 'Administrador', classe: 'bg-[#BF8841] text-white' };
      case 'PROFESSOR':
        return { icone: GraduationCap, texto: 'Professor', classe: 'bg-[#283593] text-white' };
      case 'ESTAGIARIO':
        return { icone: BookOpen, texto: 'Estagiário', classe: 'bg-blue-600 text-white' };
      default:
        return { icone: User, texto: 'Aluno', classe: 'bg-gray-500 text-white' };
    }
  };

  const pegarIniciais = (nome: string) => {
    return nome.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  const formatarData = (dataString: string) => {
    return new Date(dataString).toLocaleDateString('pt-BR');
  };

  const pegarIconeAtividade = (tipo: string) => {
    switch (tipo) {
      case 'resposta': case 'pergunta': return MessageSquare;
      case 'material': return BookOpen;
      default: return Star;
    }
  };

  const selo = pegarSeloUsuario(usuarioExibido.tipo);
  const IconeSelo = selo.icone;

  return (
    <div className="min-h-screen bg-[#F5F5F5] py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Botão Voltar */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Link>
        </div>

        {/* --- CABEÇALHO DO PERFIL --- */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              
              {/* Avatar */}
              <div className="h-24 w-24 rounded-full bg-[#283593] text-white flex items-center justify-center text-2xl font-bold border-4 border-white shadow-lg shrink-0">
                {pegarIniciais(usuarioExibido.nome)}
              </div>

              {/* Informações do Usuário */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-[#283593]">{usuarioExibido.nome}</h1>
                  
                  {/* Badge de Função */}
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${selo.classe}`}>
                    <IconeSelo className="h-4 w-4 mr-2" />
                    {selo.texto}
                  </span>
                </div>

                {/* Bio */}
                <p className="text-gray-600 mb-4 max-w-2xl leading-relaxed">
                  {usuarioExibido.bio}
                </p>

                {/* Data de Entrada */}
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Membro desde {formatarData(usuarioExibido.dataEntrada)}</span>
                </div>
              </div>

              {/* Ações (Editar/Sair) */}
              <div className="flex gap-3 mt-4 md:mt-0">
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors">
                  Editar Perfil
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* --- CARDS DE ESTATÍSTICAS (Muda conforme o tipo de usuário) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          
          {/* VISÃO DE PROFESSOR */}
          {usuarioExibido.tipo === 'PROFESSOR' && (
            <>
              <CardEstatistica icone={BookOpen} cor="blue" valor={usuarioExibido.estatisticas.materiaisCriados} label="Materiais Criados" />
              <CardEstatistica icone={MessageSquare} cor="green" valor={usuarioExibido.estatisticas.perguntasRespondidas} label="Perguntas Respondidas" />
              <CardEstatistica icone={ThumbsUp} cor="yellow" valor={usuarioExibido.estatisticas.respostasUteis} label="Respostas Úteis" />
              <CardEstatistica icone={Star} cor="purple" valor={usuarioExibido.estatisticas.reputacao} label="Reputação" />
            </>
          )}

          {/* VISÃO DE ALUNO */}
          {usuarioExibido.tipo === 'ALUNO' && (
            <>
              <CardEstatistica icone={Target} cor="blue" valor={usuarioExibido.estatisticas.avaliacoesFeitas} label="Avaliações Feitas" />
              <CardEstatistica icone={TrendingUp} cor="green" valor={`${usuarioExibido.estatisticas.notaMedia}%`} label="Nota Média" />
              <CardEstatistica icone={Award} cor="yellow" valor={usuarioExibido.estatisticas.melhorCategoria} label="Melhor Categoria" />
              <CardEstatistica icone={Clock} cor="purple" valor={`${usuarioExibido.estatisticas.horasEstudo}h`} label="Horas de Estudo" />
            </>
          )}

          {/* VISÃO DE ADMIN */}
          {usuarioExibido.tipo === 'ADMIN' && (
            <>
              <CardEstatistica icone={CheckCircle} cor="blue" valor={usuarioExibido.estatisticas.materiaisAprovados} label="Materiais Aprovados" />
              <CardEstatistica icone={User} cor="green" valor={usuarioExibido.estatisticas.totalUsuarios} label="Usuários Totais" />
              <CardEstatistica icone={TrendingUp} cor="yellow" valor={`${usuarioExibido.estatisticas.tempoSistemaOnline}%`} label="Uptime do Sistema" />
              <CardEstatistica icone={Calendar} cor="purple" valor={usuarioExibido.estatisticas.idadePlataforma} label="Meses Online" />
            </>
          )}
        </div>

        {/* --- FEED DE ATIVIDADE RECENTE --- */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-bold text-[#283593] flex items-center">
              <Star className="h-5 w-5 mr-2" />
              Atividades Recentes
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {atividadesRecentes.map((atividade) => {
                const IconeAtividade = pegarIconeAtividade(atividade.tipo);
                
                return (
                  <div key={atividade.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="bg-[#283593] p-2.5 rounded-full shrink-0">
                      <IconeAtividade className="h-5 w-5 text-white" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{atividade.titulo}</p>
                      <div className="flex flex-wrap items-center gap-4 mt-1 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatarData(atividade.data)}
                        </span>
                        
                        {atividade.votos !== undefined && (
                          <span className="flex items-center">
                            <ThumbsUp className="h-3 w-3 mr-1" />
                            {atividade.votos} votos
                          </span>
                        )}
                        
                        {atividade.aceita && (
                          <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full flex items-center font-medium">
                            <CheckCircle className="h-3 w-3 mr-1" /> Aceita
                          </span>
                        )}
                        
                        {atividade.downloads !== undefined && (
                          <span className="flex items-center">
                            <Eye className="h-3 w-3 mr-1" />
                            {atividade.downloads} downloads
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// --- SUB-COMPONENTE PARA OS CARDS ---
// (Fica no mesmo arquivo para simplificar)
function CardEstatistica({ icone: Icone, cor, valor, label }: any) {
  const cores: any = {
    blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
    green: { bg: 'bg-green-100', text: 'text-green-600' },
    yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
  };
  
  const estilo = cores[cor] || cores.blue;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="flex items-center">
        <div className={`${estilo.bg} p-3 rounded-full`}>
          <Icone className={`h-6 w-6 ${estilo.text}`} />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{valor}</p>
        </div>
      </div>
    </div>
  );
}