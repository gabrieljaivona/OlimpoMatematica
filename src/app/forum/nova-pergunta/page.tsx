// src/app/forum/nova-pergunta/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Para redirecionar o usuário após enviar
import Link from 'next/link';
import { 
  ArrowLeft, Plus, X, Tag, HelpCircle, Send, 
  AlertCircle, CheckCircle, Lightbulb 
} from 'lucide-react';

export default function PaginaNovaPergunta() {
  const router = useRouter();
  
  // --- ESTADOS ---
  const [dadosFormulario, setDadosFormulario] = useState({
    titulo: '',
    conteudo: '',
    tags: [] as string[]
  });
  
  const [novaTag, setNovaTag] = useState('');
  const [erros, setErros] = useState<{ [key: string]: string }>({});
  const [enviando, setEnviando] = useState(false);

  // Tags sugeridas para facilitar
  const tagsSugeridas = [
    'álgebra', 'geometria', 'combinatória', 'funções', 'sequências', 
    'probabilidade', 'nível-1', 'nível-2', 'nível-3', 'teoremas', 
    'equações', 'gráficos', 'fórmulas', 'áreas', 'trigonometria'
  ];

  // --- FUNÇÕES AUXILIARES ---

  const lidarComMudancaInput = (campo: string, valor: string) => {
    setDadosFormulario(prev => ({ ...prev, [campo]: valor }));
    
    // Limpar erro quando o usuário começa a digitar
    if (erros[campo]) {
      setErros(prev => ({ ...prev, [campo]: '' }));
    }
  };

  const adicionarTag = (tag: string) => {
    if (tag && !dadosFormulario.tags.includes(tag) && dadosFormulario.tags.length < 5) {
      setDadosFormulario(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
      setNovaTag('');
    }
  };

  const removerTag = (tagParaRemover: string) => {
    setDadosFormulario(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagParaRemover)
    }));
  };

  const lidarComTeclaPressionada = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && novaTag.trim()) {
      e.preventDefault(); // Impede o submit do form ao dar enter na tag
      adicionarTag(novaTag.trim().toLowerCase());
    }
  };

  const validarFormulario = () => {
    const novosErros: { [key: string]: string } = {};

    if (!dadosFormulario.titulo.trim()) {
      novosErros.titulo = 'O título é obrigatório';
    } else if (dadosFormulario.titulo.length < 10) {
      novosErros.titulo = 'O título deve ter pelo menos 10 caracteres';
    } else if (dadosFormulario.titulo.length > 150) {
      novosErros.titulo = 'O título deve ter no máximo 150 caracteres';
    }

    if (!dadosFormulario.conteudo.trim()) {
      novosErros.conteudo = 'A descrição da dúvida é obrigatória';
    } else if (dadosFormulario.conteudo.length < 20) {
      novosErros.conteudo = 'A descrição deve ter pelo menos 20 caracteres';
    }

    if (dadosFormulario.tags.length === 0) {
      novosErros.tags = 'Adicione pelo menos uma tag';
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const lidarComEnvio = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validarFormulario()) {
      return;
    }

    setEnviando(true);

    // Simulação de envio para API
    setTimeout(() => {
      console.log('Nova pergunta enviada:', dadosFormulario);
      setEnviando(false);
      // Redireciona de volta para o fórum após sucesso
      router.push('/forum');
    }, 1500);
  };

  // Função para dar cor às tags (visual)
  const pegarCorTag = (tag: string) => {
    if (tag.includes('nível')) return 'bg-blue-100 text-blue-800';
    if (['álgebra', 'equações', 'fórmulas'].includes(tag)) return 'bg-green-100 text-green-800';
    if (['geometria', 'áreas', 'teoremas'].includes(tag)) return 'bg-purple-100 text-purple-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] py-8">
      
      {/* --- Header da Página (com botão Voltar) --- */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center mb-6">
          <Link 
            href="/forum" 
            className="flex items-center text-gray-600 hover:text-[#283593] transition-colors font-medium"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Voltar ao Fórum
          </Link>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#283593] mb-2">Nova Pergunta</h1>
            <p className="text-gray-600">Faça sua pergunta para a comunidade do Olimpo.</p>
          </div>
        </div>
      </div>

      {/* --- Conteúdo Principal --- */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* --- Coluna da Esquerda: Formulário --- */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex items-center text-[#283593]">
                <HelpCircle className="h-5 w-5 mr-2" />
                <h2 className="font-bold text-lg">Descreva sua Dúvida</h2>
              </div>
              
              <div className="p-6">
                <form onSubmit={lidarComEnvio} className="space-y-6">
                  
                  {/* Título */}
                  <div className="space-y-2">
                    <label htmlFor="titulo" className="block text-sm font-medium text-[#283593]">
                      Título da Pergunta *
                    </label>
                    <input
                      id="titulo"
                      type="text"
                      placeholder="Ex: Como resolver equações do segundo grau com discriminante negativo?"
                      value={dadosFormulario.titulo}
                      onChange={(e) => lidarComMudancaInput('titulo', e.target.value)}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9800] transition-all ${erros.titulo ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {erros.titulo && (
                      <p className="text-red-600 text-sm flex items-center mt-1">
                        <AlertCircle className="h-4 w-4 mr-1" /> {erros.titulo}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 text-right">
                      {dadosFormulario.titulo.length}/150 caracteres
                    </p>
                  </div>

                  {/* Conteúdo */}
                  <div className="space-y-2">
                    <label htmlFor="conteudo" className="block text-sm font-medium text-[#283593]">
                      Descrição Detalhada *
                    </label>
                    <textarea
                      id="conteudo"
                      placeholder="Descreva sua dúvida em detalhes. Inclua o que você já tentou, exemplos específicos e o contexto da questão."
                      value={dadosFormulario.conteudo}
                      onChange={(e) => lidarComMudancaInput('conteudo', e.target.value)}
                      rows={8}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9800] resize-y transition-all ${erros.conteudo ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {erros.conteudo && (
                      <p className="text-red-600 text-sm flex items-center mt-1">
                        <AlertCircle className="h-4 w-4 mr-1" /> {erros.conteudo}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 text-right">
                      {dadosFormulario.conteudo.length} caracteres (mínimo 20)
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-[#283593]">
                      Tags * (máximo 5)
                    </label>
                    
                    {/* Tags Selecionadas */}
                    {dadosFormulario.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {dadosFormulario.tags.map((tag) => (
                          <span 
                            key={tag} 
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${pegarCorTag(tag)} border border-gray-100`}
                          >
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                            <button 
                              type="button"
                              onClick={() => removerTag(tag)}
                              className="ml-2 hover:text-red-600 transition-colors"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Input Tag */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Digite uma tag e pressione Enter"
                        value={novaTag}
                        onChange={(e) => setNovaTag(e.target.value)}
                        onKeyDown={lidarComTeclaPressionada}
                        disabled={dadosFormulario.tags.length >= 5}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9800]"
                      />
                      <button
                        type="button"
                        onClick={() => adicionarTag(novaTag.trim().toLowerCase())}
                        disabled={!novaTag.trim() || dadosFormulario.tags.length >= 5}
                        className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 disabled:opacity-50 transition-colors"
                      >
                        <Plus className="h-5 w-5" />
                      </button>
                    </div>
                    
                    {erros.tags && (
                      <p className="text-red-600 text-sm flex items-center mt-1">
                        <AlertCircle className="h-4 w-4 mr-1" /> {erros.tags}
                      </p>
                    )}

                    {/* Sugestões */}
                    <div className="mt-3">
                      <p className="text-xs text-gray-500 mb-2">Tags sugeridas:</p>
                      <div className="flex flex-wrap gap-2">
                        {tagsSugeridas
                          .filter(tag => !dadosFormulario.tags.includes(tag))
                          .slice(0, 8)
                          .map((tag) => (
                            <button 
                              key={tag} 
                              type="button"
                              onClick={() => adicionarTag(tag)}
                              className="text-xs bg-gray-50 hover:bg-gray-100 text-gray-600 px-2 py-1 rounded border border-gray-200 transition-colors flex items-center"
                            >
                              <Plus className="h-3 w-3 mr-1" /> {tag}
                            </button>
                          ))}
                      </div>
                    </div>
                  </div>

                  {/* Botões de Ação */}
                  <div className="flex justify-end space-x-4 pt-4 border-t border-gray-100">
                    <Link
                      href="/forum"
                      className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                    >
                      Cancelar
                    </Link>
                    <button
                      type="submit"
                      disabled={enviando}
                      className="bg-[#FF9800] hover:bg-orange-600 text-white px-6 py-2.5 rounded-lg font-bold flex items-center disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md"
                    >
                      {enviando ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" /> Publicar Pergunta
                        </>
                      )}
                    </button>
                  </div>

                </form>
              </div>
            </div>
          </div>

          {/* --- Coluna da Direita: Dicas --- */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-24">
              <div className="p-6 border-b border-gray-100">
                <h3 className="font-bold text-lg text-[#283593] flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2" /> Dicas Úteis
                </h3>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm text-gray-900">Seja específico</p>
                    <p className="text-xs text-gray-500 mt-1">Inclua números, fórmulas e o contexto exato da sua dúvida.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm text-gray-900">Mostre o que tentou</p>
                    <p className="text-xs text-gray-500 mt-1">Explique até onde você conseguiu chegar no problema.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm text-gray-900">Use tags corretas</p>
                    <p className="text-xs text-gray-500 mt-1">Isso ajuda os professores certos a encontrarem sua pergunta.</p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100">
                  <p className="text-xs font-bold text-[#283593] mb-2">Exemplo de Título Bom:</p>
                  <div className="bg-green-50 text-green-800 p-3 rounded-lg text-xs border border-green-100">
                    "Como encontrar o domínio de f(x) = √(x² - 4)?"
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-red-600 mb-2">Evite Títulos Como:</p>
                  <div className="bg-red-50 text-red-800 p-3 rounded-lg text-xs border border-red-100">
                    "Ajuda com matemática" ou "Não entendo nada"
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}