// src/app/materiais/page.tsx
'use client';

import { useState, useCallback } from 'react';
import { BookOpen, Clock, Star, Download, FileText, Video, Layers, Search } from 'lucide-react';
import SearchAndFilterBar from '@/components/SearchAndFilterBar'; // Este componente ainda está em inglês

// --- MOCK DATA (Dados Simulados) ---
// Enquanto o backend não fica pronto, usamos isso para ver a página funcionando
const materiaisSimulados = [
  {
    id: 1,
    title: "Álgebra Fundamental - Apostila Completa",
    description: "Conceitos básicos de álgebra com 50 exercícios práticos e resoluções detalhadas para iniciantes.",
    level: "1",
    type: "pdf",
    difficulty: "facil",
    pages_or_duration: "45 pág",
    url_arquivo: "#", // Link falso por enquanto
    topics: ["Álgebra", "Equações", "Problemas"]
  },
  {
    id: 2,
    title: "Geometria Plana Avançada - Videoaula",
    description: "Teoremas e propriedades da geometria plana com aplicações em problemas olímpicos da segunda fase.",
    level: "2",
    type: "video",
    difficulty: "medio",
    pages_or_duration: "45 min",
    url_arquivo: "#",
    topics: ["Geometria", "Triângulos", "Círculos"]
  },
  {
    id: 3,
    title: "Combinatória e Probabilidade - Lista",
    description: "Lista de exercícios focada em análise combinatória e cálculo de probabilidades.",
    level: "3",
    type: "pdf",
    difficulty: "dificil",
    pages_or_duration: "12 pág",
    url_arquivo: "#",
    topics: ["Combinatória", "Probabilidade"]
  },
  {
    id: 4,
    title: "Teoria dos Números - Resumo",
    description: "Resumo prático sobre divisibilidade, números primos e congruência modular.",
    level: "2",
    type: "pdf",
    difficulty: "medio",
    pages_or_duration: "8 pág",
    url_arquivo: "#",
    topics: ["Números", "Aritmética"]
  },
  {
    id: 5,
    title: "Lógica Matemática - Quiz Interativo",
    description: "Desafios de lógica para treinar o raciocínio rápido.",
    level: "1",
    type: "quiz", // Tipo inventado para exemplo
    difficulty: "facil",
    pages_or_duration: "20 questões",
    url_arquivo: "#",
    topics: ["Lógica", "Raciocínio"]
  }
];

export default function PaginaMateriais() {
  // Estados para os filtros
  const [materiaisFiltrados, setMateriaisFiltrados] = useState(materiaisSimulados);
  const [carregando, setCarregando] = useState(false);

  // Função que recebe os filtros do componente SearchAndFilterBar
  // Envolvemos com useCallback para evitar o loop infinito
  const lidarComMudancaDeFiltro = useCallback((filtros: { searchTerm: string; type: string; level: string }) => {
    setCarregando(true);
    
    // Simula um pequeno delay para parecer que está buscando
    setTimeout(() => {
      const resultados = materiaisSimulados.filter(material => {
        // Filtro de Busca (Texto)
        const correspondeABusca = material.title.toLowerCase().includes(filtros.searchTerm.toLowerCase()) ||
                              material.description.toLowerCase().includes(filtros.searchTerm.toLowerCase());
        
        // Filtro de Tipo
        const correspondeAoTipo = filtros.type === 'all' || material.type === filtros.type;
        
        // Filtro de Nível
        const correspondeAoNivel = filtros.level === 'all' || material.level === filtros.level;

        return correspondeABusca && correspondeAoTipo && correspondeAoNivel;
      });

      setMateriaisFiltrados(resultados);
      setCarregando(false);
    }, 300); // 300ms de delay
  }, []); // <--- O array vazio [] significa: "Nunca recrie esta função"

  // Função auxiliar para ícone do arquivo
  const pegarIconeArquivo = (tipo: string) => {
    switch (tipo) {
      case 'pdf': return <FileText className="h-5 w-5 text-red-500" />;
      case 'video': return <Video className="h-5 w-5 text-blue-500" />;
      default: return <BookOpen className="h-5 w-5 text-gray-500" />;
    }
  };

  // Função auxiliar para cor da dificuldade
  const pegarCorDificuldade = (dificuldade: string) => {
    switch (dificuldade) {
      case 'facil': return 'bg-green-100 text-green-800';
      case 'medio': return 'bg-yellow-100 text-yellow-800';
      case 'dificil': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Header da Página --- */}
        <div className="mb-8">
          <h1 className="flex flex-col justify-center items-center text-3xl font-bold text-[#283593] mb-2">Materiais de Estudo</h1>
          <p className="text-gray-600 m-auto">
            Explore nossa biblioteca completa de recursos para a OBMEP. Use os filtros abaixo para encontrar o que precisa.
          </p>
        </div>

        {/* --- Barra de Filtros (Componente Reutilizável) --- */}
        <div className="mb-8">
          <SearchAndFilterBar 
            onFilterChange={lidarComMudancaDeFiltro}
            placeholder="Pesquisar por título, assunto..."
          />
        </div>

        {/* --- Lista de Resultados --- */}
        {carregando ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#283593]"></div>
            <p className="ml-4 text-[#283593] font-medium">Buscando materiais...</p>
          </div>
        ) : materiaisFiltrados.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">Nenhum material encontrado</h3>
            <p className="text-gray-500">Tente ajustar seus filtros ou buscar por outros termos.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {materiaisFiltrados.map((material) => (
              <div key={material.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col border border-gray-100">
                
                {/* Card Header */}
                <div className="p-5 border-b border-gray-50 flex justify-between items-start">
                  <h3 className="text-lg font-bold text-[#283593] line-clamp-2 flex-1 pr-2">
                    {material.title}
                  </h3>
                  <div className="p-2 bg-gray-50 rounded-lg shrink-0">
                    {pegarIconeArquivo(material.type)}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col">
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-1">
                    {material.description}
                  </p>

                  {/* Tags de Informação */}
                  <div className="flex flex-wrap gap-3 mb-4 text-xs font-medium text-gray-500">
                    <div className="flex items-center bg-gray-100 px-2 py-1 rounded">
                      <Layers className="h-3 w-3 mr-1 text-[#BF8841]" />
                      Nível {material.level}
                    </div>
                    <div className={`flex items-center px-2 py-1 rounded ${pegarCorDificuldade(material.difficulty)}`}>
                      <Star className="h-3 w-3 mr-1" />
                      <span className="capitalize">{material.difficulty}</span>
                    </div>
                    <div className="flex items-center bg-gray-100 px-2 py-1 rounded">
                      <Clock className="h-3 w-3 mr-1 text-[#BF8841]" />
                      {material.pages_or_duration}
                    </div>
                  </div>

                  {/* Tópicos */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {material.topics.map((topico, index) => (
                      <span key={index} className="bg-blue-50 text-[#283593] text-[10px] px-2 py-1 rounded-full font-semibold">
                        {topico}
                      </span>
                    ))}
                  </div>

                  {/* Botão de Download */}
                  <a 
                    href={material.url_arquivo} 
                    className="w-full flex items-center justify-center bg-[#FF9800] hover:bg-orange-600 text-white py-2.5 rounded-lg font-bold text-sm transition-colors shadow-sm mt-auto"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Acessar Material
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}