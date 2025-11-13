// src/components/Header.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Hook para saber em qual página estamos
import { 
  Trophy, 
  Home, 
  BookOpen, 
  MessageSquare, 
  FileText,
  BarChart3,
  User,
  Info,
  PenTool // Ícone para "Meus Envios"
} from 'lucide-react';

// --- (INÍCIO) SIMULAÇÃO DE DADOS (MOCK) ---
// Mude estas variáveis para testar os diferentes perfis!
const STATUS_ATUAL = 'authenticated'; // 'authenticated' ou 'unauthenticated'

// Tipos: 'ALUNO' | 'PROFESSOR' | 'ESTAGIARIO' | 'ADMIN'
const USUARIO_ATUAL = {
  id: '1',
  name: 'Reaper',
  role: 'ADMIN', // <--- TROQUE AQUI PARA TESTAR
};
// --- (FIM) SIMULAÇÃO ---

export default function Header() {
  const pathname = usePathname(); // Pega a URL atual para destacar o botão ativo

  // Função auxiliar para verificar permissão
  const temPermissao = (cargosPermitidos: string[]) => {
    if (STATUS_ATUAL !== 'authenticated') return false;
    return cargosPermitidos.includes(USUARIO_ATUAL.role);
  };

  // Definição dos itens de navegação
  const navItems = [
    { 
      id: 'home', 
      href: '/', 
      label: 'Início', 
      icon: Home,
      visible: true // Sempre visível
    },
    { 
      id: 'materials', 
      href: '/materiais', 
      label: 'Materiais', 
      icon: BookOpen,
      visible: true 
    },
    { 
      id: 'about', 
      href: '/sobre', 
      label: 'Sobre', 
      icon: Info,
      visible: true 
    },
    { 
      id: 'forum', 
      href: '/forum', 
      label: 'Fórum', 
      icon: MessageSquare,
      visible: temPermissao(['ALUNO', 'PROFESSOR', 'ADMIN']) 
    },
    { 
      id: 'evaluations', 
      href: '/avaliacoes', 
      label: 'Avaliações', 
      icon: FileText,
      visible: temPermissao(['ALUNO', 'ADMIN']) 
    },
    {
      id: 'my-uploads',
      href: '/meus-envios',
      label: 'Meus Envios',
      icon: PenTool,
      visible: temPermissao(['ESTAGIARIO', 'ADMIN'])
    },
    { 
      id: 'stats', 
      href: '/estatisticas', 
      label: 'Estatísticas', 
      icon: BarChart3,
      visible: temPermissao(['PROFESSOR', 'ADMIN']) 
    }
  ];

  // Filtra apenas os itens visíveis para o usuário atual
  const visibleNavItems = navItems.filter(item => item.visible);

  // Função para decidir para onde o botão "Minha Área" leva
  const getDashboardLink = () => {
    switch (USUARIO_ATUAL.role) {
      case 'PROFESSOR': return '/revisar-conteudo';
      case 'ESTAGIARIO': return '/meus-envios';
      case 'ADMIN': return '/admin';
      default: return '/perfil';
    }
  };

  return (
    <header className="bg-[#283593] text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          
          {/* --- LOGO --- */}
          <Link href="/" className="flex items-center cursor-pointer hover:opacity-80 transition-opacity group">
            <div className="bg-[#BF8841] p-2 rounded-lg mr-3 group-hover:bg-[#d4984a] transition-colors">
              <Trophy className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold leading-tight">Olimpo Matemático</h1>
              <p className="text-blue-200 text-xs uppercase tracking-wider font-semibold">Preparação OBMEP</p>
            </div>
          </Link>

          {/* --- NAVEGAÇÃO (Desktop) --- */}
          <nav className="hidden lg:flex items-center space-x-2">
            {visibleNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-lg transition-all duration-200 font-medium ${
                    isActive 
                      ? 'bg-blue-700 text-white shadow-sm' 
                      : 'text-blue-200 hover:text-white hover:bg-blue-800'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* --- AÇÕES DO USUÁRIO --- */}
          <div className="flex items-center space-x-4">
            {STATUS_ATUAL === 'authenticated' ? (
              <div className="flex items-center space-x-4 pl-4 border-l border-blue-700">
                
                {/* Info do Usuário - Clicável */}
                <Link href="/perfil" className="hidden sm:block text-right cursor-pointer hover:opacity-80 transition-opacity">
                  <p className="text-white font-medium text-sm">{USUARIO_ATUAL.name}</p>
                  <p className="text-[#FF9800] text-xs font-bold uppercase">
                    {USUARIO_ATUAL.role}
                  </p>
                </Link>

                {/* Botão Minha Área */}
                <Link
                  href={getDashboardLink()}
                  className="flex items-center border border-blue-400 text-blue-100 hover:bg-white hover:text-[#283593] px-4 py-2 rounded-md transition-colors font-medium text-sm"
                >
                  <User className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Minha Área</span>
                </Link>
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-[#FF9800] hover:bg-[#e68a00] text-white font-bold px-6 py-2 rounded-md shadow-md transition-transform hover:scale-105 active:scale-95"
              >
                Login / Cadastrar
              </Link>
            )}
          </div>
        </div>

        {/* --- NAVEGAÇÃO MOBILE (Aparece em telas pequenas) --- */}
        <div className="lg:hidden border-t border-blue-800 pt-4 pb-4">
          <div className="flex flex-wrap gap-2">
            {visibleNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                    isActive 
                      ? 'bg-blue-700 text-white' 
                      : 'text-blue-200 hover:text-white hover:bg-blue-800'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}