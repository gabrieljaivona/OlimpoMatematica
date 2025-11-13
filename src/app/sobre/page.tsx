// src/app/sobre/page.tsx
'use client';

import Link from 'next/link';
import { 
  Trophy, Target, Users, BookOpen, MessageSquare, BarChart3, 
  Heart, Star, Award, Lightbulb, Globe, Zap, CheckCircle, 
  ArrowRight, GraduationCap 
} from 'lucide-react';

export default function SobrePage() {
  
  // --- SIMULAÇÃO DE USUÁRIO (Igual ao Header) ---
  // Mude para true para ver como fica a versão logada
  const isUserLoggedIn = false; 

  const features = [
    {
      icon: BookOpen,
      title: 'Materiais de Estudo',
      description: 'Conteúdo de alta qualidade criado por professores especializados em olimpíadas de matemática.',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: MessageSquare,
      title: 'Fórum Comunitário',
      description: 'Espaço colaborativo para tirar dúvidas, compartilhar conhecimento e conectar-se com outros estudantes.',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: BarChart3,
      title: 'Avaliações e Simulados',
      description: 'Sistema completo de quizzes e simulados para testar conhecimentos e acompanhar o progresso.',
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  const stats = [
    { number: '1000+', label: 'Alunos Ativos', icon: Users },
    { number: '500+', label: 'Materiais Disponíveis', icon: BookOpen },
    { number: '50+', label: 'Professores Especialistas', icon: GraduationCap },
    { number: '95%', label: 'Taxa de Satisfação', icon: Star }
  ];

  const levels = [
    {
      level: 'Nível 1',
      description: 'Para alunos do 6º e 7º anos do Ensino Fundamental',
      topics: ['Aritmética básica', 'Geometria plana', 'Problemas lógicos']
    },
    {
      level: 'Nível 2', 
      description: 'Para alunos do 8º e 9º anos do Ensino Fundamental',
      topics: ['Álgebra elementar', 'Geometria euclidiana', 'Combinatória básica']
    },
    {
      level: 'Nível 3',
      description: 'Para alunos do Ensino Médio',
      topics: ['Funções avançadas', 'Geometria analítica', 'Teoria dos números']
    }
  ];

  return (
    <main className="w-full bg-[#F5F5F5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-[#283593] p-4 rounded-full shadow-lg">
              <Trophy className="h-12 w-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-[#283593] mb-6">
            Sobre o Olimpo Matemático
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Democratizando o acesso à preparação de qualidade para a Olimpíada Brasileira 
            de Matemática das Escolas Públicas (OBMEP) e outras competições matemáticas.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-16">
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-[#283593] mb-6 flex items-center">
                  <Heart className="h-8 w-8 mr-3 text-[#FF9800]" />
                  Nossa Missão
                </h2>
                
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  O <strong>Olimpo Matemático</strong> nasceu da necessidade de tornar a preparação 
                  para olimpíadas de matemática mais acessível e democrática. Acreditamos que todo 
                  estudante, independentemente de sua origem socioeconômica, deve ter acesso a 
                  materiais de qualidade e orientação especializada.
                </p>
                
                <p className="text-lg text-gray-700 leading-relaxed">
                  Nossa plataforma conecta estudantes talentosos com professores experientes, 
                  criando uma comunidade colaborativa focada na excelência matemática e no 
                  desenvolvimento do pensamento lógico-científico.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-[#283593] to-[#FF9800] p-8 rounded-xl text-white shadow-lg">
                <div className="space-y-6">
                  <div className="flex items-center">
                    <Target className="h-8 w-8 mr-4" />
                    <span className="font-semibold text-lg">Excelência Educacional</span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="h-8 w-8 mr-4" />
                    <span className="font-semibold text-lg">Acesso Democrático</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-8 w-8 mr-4" />
                    <span className="font-semibold text-lg">Comunidade Colaborativa</span>
                  </div>
                  <div className="flex items-center">
                    <Zap className="h-8 w-8 mr-4" />
                    <span className="font-semibold text-lg">Inovação Pedagógica</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* OBMEP Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-16">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-3xl font-bold text-[#283593] flex items-center">
              <Award className="h-8 w-8 mr-3 text-[#BF8841]" />
              O que é a OBMEP?
            </h2>
          </div>
          <div className="p-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  A <strong>Olimpíada Brasileira de Matemática das Escolas Públicas (OBMEP)</strong> é 
                  uma realização do Instituto de Matemática Pura e Aplicada (IMPA) e tem como objetivo 
                  estimular o estudo da matemática e revelar talentos na área.
                </p>
                
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Criada em 2005, a OBMEP é dirigida aos alunos do 6º ao 9º ano do Ensino Fundamental 
                  e aos alunos do Ensino Médio das escolas públicas e privadas brasileiras.
                </p>
                
                <div className="bg-[#F5F5F5] p-6 rounded-lg border-l-4 border-[#283593]">
                  <h4 className="font-bold text-[#283593] mb-3 flex items-center text-lg">
                    <Lightbulb className="h-5 w-5 mr-2" />
                    Por que participar da OBMEP?
                  </h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-2 mt-0.5 text-green-600 flex-shrink-0" />
                      <span>Desenvolve o raciocínio lógico e a resolução de problemas</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-2 mt-0.5 text-green-600 flex-shrink-0" />
                      <span>Oferece bolsas de estudo e intercâmbio</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-2 mt-0.5 text-green-600 flex-shrink-0" />
                      <span>Diferencial no currículo acadêmico</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div>
                <h4 className="font-bold text-[#283593] mb-4 text-xl">Níveis da OBMEP</h4>
                <div className="space-y-4">
                  {levels.map((level, index) => (
                    <div key={index} className="bg-white border border-gray-200 border-l-4 border-l-[#FF9800] rounded-r-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                      <h5 className="font-bold text-[#283593] mb-2">{level.level}</h5>
                      <p className="text-sm text-gray-600 mb-3">{level.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {level.topics.map((topic, topicIndex) => (
                          <span key={topicIndex} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#283593] text-center mb-12">
            Como Nossa Plataforma Funciona
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className={`inline-flex p-4 rounded-full ${feature.color} mb-6`}>
                  <feature.icon className="h-8 w-8" />
                </div>
                
                <h3 className="text-xl font-bold text-[#283593] mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-16 bg-gradient-to-r from-[#283593] to-[#FF9800] rounded-xl shadow-lg overflow-hidden">
          <div className="p-12">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Nossa Comunidade em Números
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="bg-white/20 p-4 rounded-full inline-flex mb-4 backdrop-blur-sm">
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-white text-opacity-90 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden text-center">
          <div className="p-12">
            <h2 className="text-3xl font-bold text-[#283593] mb-6">
              Pronto para Começar sua Jornada?
            </h2>
            
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Junte-se a milhares de estudantes que já estão se preparando para a OBMEP 
              com nossa plataforma. O sucesso na matemática está ao seu alcance!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!isUserLoggedIn ? (
                <>
                  <Link
                    href="/login"
                    className="inline-flex items-center justify-center bg-[#FF9800] hover:bg-[#F57C00] text-white font-bold px-8 py-3 rounded-lg text-lg transition-colors shadow-md"
                  >
                    Começar Agora
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                  
                  <Link
                    href="/materiais"
                    className="inline-flex items-center justify-center border-2 border-[#283593] text-[#283593] hover:bg-[#283593] hover:text-white font-bold px-8 py-3 rounded-lg text-lg transition-all"
                  >
                    Explorar Materiais
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/materiais"
                    className="inline-flex items-center justify-center bg-[#FF9800] hover:bg-[#F57C00] text-white font-bold px-8 py-3 rounded-lg text-lg transition-colors shadow-md"
                  >
                    Explorar Materiais
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                  
                  <Link
                    href="/forum"
                    className="inline-flex items-center justify-center border-2 border-[#283593] text-[#283593] hover:bg-[#283593] hover:text-white font-bold px-8 py-3 rounded-lg text-lg transition-all"
                  >
                    Participar do Fórum
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}