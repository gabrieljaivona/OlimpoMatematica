// src/components/FeaturedMaterials.tsx
import Link from 'next/link';
import { BookOpen, Clock, Star, Download, ArrowRight } from 'lucide-react';

export default function FeaturedMaterials() {
  const materials = [
    {
      id: 1,
      title: "Álgebra Fundamental",
      description: "Conceitos básicos de álgebra com exercícios práticos e resoluções detalhadas para iniciantes.",
      level: "Nível 1",
      duration: "2h 30min",
      rating: 4.8,
      downloads: 1250,
      category: "Álgebra",
      difficulty: "Básico",
      color: "bg-blue-500"
    },
    {
      id: 2,
      title: "Geometria Plana Avançada",
      description: "Teoremas e propriedades da geometria plana com aplicações em problemas olímpicos.",
      level: "Nível 2",
      duration: "3h 15min",
      rating: 4.9,
      downloads: 980,
      category: "Geometria",
      difficulty: "Intermediário",
      color: "bg-green-500"
    },
    {
      id: 3,
      title: "Combinatória e Probabilidade",
      description: "Análise combinatória e cálculo de probabilidades com foco em questões da OBMEP.",
      level: "Nível 3",
      duration: "4h 10min",
      rating: 4.7,
      downloads: 756,
      category: "Combinatória",
      difficulty: "Avançado",
      color: "bg-purple-500"
    },
    {
      id: 4,
      title: "Teoria dos Números",
      description: "Propriedades dos números inteiros, divisibilidade e congruências para competições.",
      level: "Nível 3",
      duration: "3h 45min",
      rating: 4.9,
      downloads: 892,
      category: "Números",
      difficulty: "Avançado",
      color: "bg-orange-500"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Básico': return 'bg-green-100 text-green-800';
      case 'Intermediário': return 'bg-yellow-100 text-yellow-800';
      case 'Avançado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section className="py-16 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Header da Seção --- */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#283593] mb-4">
            Materiais em Destaque
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore nossa seleção de materiais de estudo cuidadosamente elaborados 
            para maximizar seu desempenho na OBMEP.
          </p>
        </div>

        {/* --- Grid de Cards --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {materials.map((material) => (
            // Card Container (substituindo <Card>)
            <div 
              key={material.id} 
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden flex flex-col"
            >
              {/* Card Header */}
              <div className="p-6 pb-3">
                <div className="flex items-center justify-between mb-2">
                  {/* Badge Nível */}
                  <span className="bg-[#283593] text-white px-2.5 py-0.5 rounded-full text-xs font-bold">
                    {material.level}
                  </span>
                  {/* Badge Dificuldade */}
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(material.difficulty)}`}>
                    {material.difficulty}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-[#283593] line-clamp-2 mb-2">
                  {material.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {material.description}
                </p>
              </div>
              
              {/* Card Content */}
              <div className="p-6 pt-0 mt-auto">
                <div className="space-y-3">
                  
                  {/* Categoria */}
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${material.color}`}></div>
                    <span className="text-sm font-medium text-[#BF8841]">{material.category}</span>
                  </div>

                  {/* Estatísticas */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{material.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span>{material.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Download className="h-4 w-4" />
                      <span>{material.downloads} downloads</span>
                    </div>
                  </div>

                  {/* Botão de Ação (Link) */}
                  <Link 
                    href="/materiais"
                    className="w-full flex items-center justify-center bg-[#FF9800] hover:bg-orange-600 text-white mt-4 py-2 rounded-md font-semibold text-sm transition-colors duration-200"
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    Acessar Material
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- Call to Action (Botão Final) --- */}
        <div className="text-center">
          <Link 
            href="/materiais"
            className="inline-flex items-center bg-[#283593] hover:bg-blue-800 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Ver Todos os Materiais
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>

      </div>
    </section>
  );
}