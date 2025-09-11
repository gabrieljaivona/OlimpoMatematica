// src/components/Header.tsx
'use client'; // Necessário para a interatividade (useState) da barra de notificação

import Link from 'next/link';
import { useState } from 'react';



// --- Componente Principal do Header ---
export default function Header() {
  const navLinks = [
    { href: '/', label: 'Início'},
    { href: '/olimpiadas', label: 'Olimpíadas'},
    { href: '/cursos', label: 'Cursos' },
    { href: '/materiais-de-estudos', label: 'Materiais' },
    { href: '/minhas-atividades', label: 'Minhas Atividades' },
    { href: '/curiosidades-matematicas', label: 'Curiosidades Matemáticas' },
    { href: '/progresso', label: 'Progresso ' },
    { href: '/jogos', label: 'Jogos' },
    { href: '/duvidas', label: 'Dúvidas' },
  ];

  return (
    <header className="shadow-md border-b-2 border-[#FF9800]">
      
      <div className="bg-[#283593] text-[#F5F5F5] px-8 py-4 flex items-center justify-between">
        {/* Lado Esquerdo: Logo e Navegação */}
        <div className="flex items-center gap-10">
          <Link href="/" className="text-2xl font-bold">
            OlimpoMatemático
          </Link>
        </div>

        {/* Lado Direito: Navegação e Perfil */}


        <div className="flex items-center gap-4">

            <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="font-medium hover:text-[#FF9800] transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>

          <Link href="/auth" className="bg-[#FF9800] font-bold py-2 px-4 rounded-md hover:opacity-90 transition-opacity">
            Login / Casdastrar
          </Link>
          <Link href="/meu-perfil" aria-label="Meu Perfil" className="hidden sm:block">
             
          </Link>
        </div>

      </div>
    </header>
  );
}