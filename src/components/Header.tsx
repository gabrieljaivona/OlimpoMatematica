// src/components/Header.tsx
'use client'; 

import Link from 'next/link';
import { User, LogOut } from 'lucide-react'; // Importei ícones para o perfil e logout

// --- (INÍCIO) SIMULAÇÃO DE AUTENTICAÇÃO ---
// No projeto real, você vai REMOVER este bloco e usar o hook useSession
// Ex: import { useSession } from 'next-auth/react'; 

// Definição dos nossos tipos de usuário
type UserRole = 'ALUNO' | 'PROFESSOR' | 'ESTAGIARIO' | 'ADMIN' | 'PUBLIC';

// 🛑 IMPORTANTE: TROQUE OS VALORES AQUI PARA TESTAR 🛑
const mockSession = {
  // status: 'loading', // Descomente para testar o estado de carregamento
  // status: 'unauthenticated', // Descomente para testar como "visitante" (não logado)
  
  status: 'authenticated', // Mantenha este para testar os usuários logados
  data: {
    user: {
      name: 'Bob (Aluno)', // Nome do usuário
      role: 'ALUNO' as UserRole, // ⬅️ TROQUE AQUI para 'PROFESSOR', 'ESTAGIARIO', 'ADMIN'
    }
  }
};
// --- (FIM) SIMULAÇÃO DE AUTENTICAÇÃO ---


// --- (INÍCIO) DEFINIÇÃO DOS LINKS E PERMISSÕES ---
type NavLink = {
  href: string;
  label: string;
  roles: UserRole[]; // Lista de funções que podem ver este link
};

// Esta é nossa lista MESTRA de todos os links com suas permissões
const allNavLinks: NavLink[] = [
  // 1. Links Públicos
  { href: '/', label: 'Início', roles: ['PUBLIC', 'ALUNO', 'PROFESSOR', 'ESTAGIARIO', 'ADMIN'] },
  { href: '/materiais', label: 'Materiais', roles: ['PUBLIC', 'ALUNO', 'PROFESSOR', 'ESTAGIARIO', 'ADMIN'] },
  { href: '/sobre', label: 'Sobre', roles: ['PUBLIC', 'ALUNO', 'PROFESSOR', 'ESTAGIARIO', 'ADMIN'] },
  
  // 2. Links de Aluno
  { href: '/forum', label: 'Fórum', roles: ['ALUNO', 'PROFESSOR', 'ADMIN'] },
  { href: '/avaliacoes', label: 'Avaliações', roles: ['ALUNO', 'ADMIN'] },
  
  // 3. Link de Estagiário
  { href: '/meus-envios', label: 'Meus Envios', roles: ['ESTAGIARIO', 'ADMIN'] },
  
  // 4. Links de Professor
  { href: '/estatisticas', label: 'Estatísticas/Progresso', roles: ['PROFESSOR', 'ADMIN'] },
  { href: '/revisar-conteudo', label: 'Revisar Conteúdo', roles: ['PROFESSOR', 'ADMIN'] },
  
  // 5. Link de Perfil (Para todos logados)
  { href: '/perfil', label: 'Perfil', roles: ['ALUNO', 'PROFESSOR', 'ESTAGIARIO', 'ADMIN'] }
];
// --- (FIM) DEFINIÇÃO DOS LINKS ---


// --- Componente Principal do Header ---
export default function Header() {
  
  // --- (INÍCIO) LÓGICA DE AUTENTICAÇÃO ---
  // No projeto real, você vai descomentar a linha abaixo:
  // const { data: session, status } = useSession();
  
  // E apagar estas duas linhas de mock:
  const { data: session, status } = mockSession;

  // 1. Determina a função (role) atual do usuário
  const userRole: UserRole = session?.user?.role || 'PUBLIC';
  // --- (FIM) LÓGICA DE AUTENTICAÇÃO ---


  // --- (INÍCIO) LÓGICA DE FILTRO DE LINKS ---
  // 2. Filtra a lista mestra para mostrar apenas os links que o usuário atual pode ver
  const availableLinks = allNavLinks.filter(link => 
    link.roles.includes(userRole)
  );
  // --- (FIM) LÓGICA DE FILTRO DE LINKS ---

  return (
    <header className="shadow-md border-b-2 border-[#FF9800]">
      <div className="bg-[#283593] text-[#F5F5F5] px-8 py-4 flex items-center justify-between">
        
        {/* Lado Esquerdo: Logo */}
        <div className="flex items-center gap-10">
          <Link href="/" className="text-2xl font-bold">
            OlimpoMatemático
          </Link>
        </div>

        {/* Lado Direito: Navegação Dinâmica e Ações do Usuário */}
        <div className="flex items-center gap-6">

          {/* 1. Navegação Principal (Agora filtrada) */}
          <nav className="hidden md:flex items-center gap-6">
            {availableLinks.map((link) => (
              <Link key={link.href} href={link.href} className="font-medium hover:text-[#FF9800] transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* 2. Ações do Usuário (Login / Perfil / Logout) */}
          <div className="flex items-center gap-4">
            
            {/* Estado de Carregamento */}
            {status === 'loading' && (
              <div className="h-8 w-24 bg-slate-500 rounded-md animate-pulse"></div>
            )}
            
            {/* Estado Não Logado (Público) */}
            {status === 'unauthenticated' && (
              <Link href="/auth" className="bg-[#FF9800] text-[#283593] font-bold py-2 px-4 rounded-md hover:opacity-90 transition-opacity">
                Login / Cadastrar
              </Link>
            )}

            {/* Estado Logado (Autenticado) */}
            {status === 'authenticated' && (
              <>
                {/* O link de "Perfil" já está no menu de navegação,
                  mas manter um ícone de atalho é uma boa prática 
                */}
                <Link href="/perfil" aria-label="Meu Perfil">
                  <User className="hover:text-[#FF9800] transition-colors" />
                </Link>
                <button 
                  onClick={() => { /* Lógica de Logout (ex: signOut()) */ }}
                  aria-label="Sair"
                  className="hover:text-[#FF9800] transition-colors"
                >
                  <LogOut size={22} />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}