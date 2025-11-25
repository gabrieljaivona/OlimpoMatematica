// src/components/BoxWelcome.tsx
import Link from 'next/link';
import { ArrowRight, Star, Target, Users } from 'lucide-react';

export default function BoxWelcome() {
  return (
    <section className="bg-gradient-to-br from-[#283593] to-blue-700 text-white py-12 px-4 md:py-20 shadow-2xl overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* --- Lado Esquerdo: Conteúdo Principal --- */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Conquiste a
                <span className="text-[#FF9800] block mt-2">OBMEP</span>
                com Excelência
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed">
                Prepare-se para a Olimpíada Brasileira de Matemática com materiais de qualidade, 
                exercícios práticos e metodologia comprovada. Transforme seu potencial em resultados.
              </p>
            </div>

            {/* Estatísticas */}
            <div className="flex flex-wrap gap-6">
              
              {/* Item 1 */}
              <div className="flex items-center space-x-3 bg-white/10 p-3 rounded-xl backdrop-blur-sm">
                <div className="bg-[#FF9800] p-2 rounded-full">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-lg">1000+</p>
                  <p className="text-xs text-blue-200 uppercase font-semibold">Estudantes</p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex items-center space-x-3 bg-white/10 p-3 rounded-xl backdrop-blur-sm">
                <div className="bg-[#BF8841] p-2 rounded-full">
                  <Target className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-lg">500+</p>
                  <p className="text-xs text-blue-200 uppercase font-semibold">Exercícios</p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex items-center space-x-3 bg-white/10 p-3 rounded-xl backdrop-blur-sm">
                <div className="bg-[#FF9800] p-2 rounded-full">
                  <Star className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-lg">95%</p>
                  <p className="text-xs text-blue-200 uppercase font-semibold">Aprovação</p>
                </div>
              </div>
            </div>

            {/* Botão de Ação (Transformado em Link) */}
            <div className="pt-4">
              <Link 
                href="/auth"
                className="inline-flex items-center justify-center bg-[#FF9800] hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Começar a Estudar
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* --- Lado Direito: Área Visual (Cards de Níveis) --- */}
          <div className="relative mt-8 lg:mt-0">
            {/* Efeito de brilho no fundo */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[#FF9800] to-[#BF8841] rounded-full opacity-20 blur-3xl animate-pulse"></div>
            
            <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
              <div className="space-y-8">
                <div className="text-center">
                  <div className="bg-[#FF9800] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Target className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Níveis OBMEP</h3>
                  <p className="text-blue-100">Preparação completa para todos os níveis</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Nível 1 */}
                  <div className="bg-white/10 rounded-xl p-4 text-center hover:bg-white/20 transition-colors cursor-default border border-white/10">
                    <div className="text-2xl font-bold text-[#FF9800]">Nível 1</div>
                    <div className="text-sm text-blue-100 font-medium mt-1">6º e 7º anos</div>
                  </div>
                  {/* Nível 2 */}
                  <div className="bg-white/10 rounded-xl p-4 text-center hover:bg-white/20 transition-colors cursor-default border border-white/10">
                    <div className="text-2xl font-bold text-[#FF9800]">Nível 2</div>
                    <div className="text-sm text-blue-100 font-medium mt-1">8º e 9º anos</div>
                  </div>
                  {/* Nível 3 */}
                  <div className="bg-white/10 rounded-xl p-4 text-center hover:bg-white/20 transition-colors cursor-default border border-white/10">
                    <div className="text-2xl font-bold text-[#FF9800]">Nível 3</div>
                    <div className="text-sm text-blue-100 font-medium mt-1">Ensino Médio</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}