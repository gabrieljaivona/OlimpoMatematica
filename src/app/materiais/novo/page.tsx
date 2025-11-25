// src/app/materiais/novo/page.tsx
'use client';

import { useState } from 'react';
import { Upload, Plus, X, AlertCircle, CheckCircle } from 'lucide-react';

export default function PaginaNovoMaterial() {
  // --- SIMULAÇÃO DE USUÁRIO ---
  // Mude para 'ADMIN' ou 'PROFESSOR' para ver a mensagem de sucesso mudar
  const usuarioAtual = {
    nome: 'Estagiário Silva',
    tipo: 'ESTAGIARIO' 
  };

  // Estados do Formulário
  const [dadosFormulario, setDadosFormulario] = useState({
    titulo: '',
    descricao: '',
    nivel: '',
    dificuldade: '',
    topicos: [] as string[],
    paginas_ou_duracao: '',
    url_arquivo: '',
    tipo_arquivo: '',
    tamanho_arquivo: ''
  });

  const [novoTopico, setNovoTopico] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  // Atualiza os campos de texto/select
  const lidarComMudanca = (campo: string, valor: string) => {
    setDadosFormulario(prev => ({ ...prev, [campo]: valor }));
  };

  // Adiciona uma tag/tópico
  const adicionarTopico = () => {
    if (novoTopico.trim() && !dadosFormulario.topicos.includes(novoTopico.trim())) {
      setDadosFormulario(prev => ({
        ...prev,
        topicos: [...prev.topicos, novoTopico.trim()]
      }));
      setNovoTopico('');
    }
  };

  // Remove uma tag/tópico
  const removerTopico = (topicoParaRemover: string) => {
    setDadosFormulario(prev => ({
      ...prev,
      topicos: prev.topicos.filter(topico => topico !== topicoParaRemover)
    }));
  };

  // Envia o formulário (Simulado)
  const lidarComEnvio = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);
    setErro('');
    setSucesso('');

    // Simulação de validação básica
    if (!dadosFormulario.titulo || !dadosFormulario.descricao || !dadosFormulario.nivel || 
        !dadosFormulario.dificuldade || !dadosFormulario.url_arquivo || !dadosFormulario.tipo_arquivo) {
      setErro('Por favor, preencha todos os campos obrigatórios (*).');
      setCarregando(false);
      return;
    }

    // Simulação de envio para API (Delay de 1.5s)
    setTimeout(() => {
      setCarregando(false);
      
      // Mensagem depende de quem está enviando (Regra de Negócio)
      const mensagemSucesso = usuarioAtual.tipo === 'ESTAGIARIO' 
        ? 'Material enviado com sucesso! Aguarde a aprovação de um professor.'
        : 'Material publicado com sucesso!';
      
      setSucesso(mensagemSucesso);

      // Limpar formulário
      setDadosFormulario({
        titulo: '', descricao: '', nivel: '', dificuldade: '', topicos: [],
        paginas_ou_duracao: '', url_arquivo: '', tipo_arquivo: '', tamanho_arquivo: ''
      });
      
      // Rolar para o topo para ver a mensagem
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#283593] mb-2">Upload de Material</h1>
          <p className="text-gray-600">
            Compartilhe materiais educacionais para a preparação da OBMEP.
          </p>
        </div>

        {/* Card Principal */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          
          {/* Card Header */}
          <div className="p-6 border-b border-gray-100 bg-gray-50">
            <div className="flex items-center space-x-2 text-[#283593] mb-1">
              <Upload className="w-5 h-5" />
              <span className="font-bold text-lg">Novo Material</span>
            </div>
            <p className="text-gray-500 text-sm">
              Preencha as informações do material que deseja compartilhar.
            </p>
          </div>

          {/* Card Content (Formulário) */}
          <div className="p-6">
            <form onSubmit={lidarComEnvio} className="space-y-6">
              
              {/* Título */}
              <div className="space-y-2">
                <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">Título *</label>
                <input
                  id="titulo"
                  type="text"
                  placeholder="Ex: Lista de Exercícios - Geometria Básica"
                  value={dadosFormulario.titulo}
                  onChange={(e) => lidarComMudanca('titulo', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#283593] focus:border-transparent transition-all"
                  required
                />
              </div>

              {/* Descrição */}
              <div className="space-y-2">
                <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">Descrição *</label>
                <textarea
                  id="descricao"
                  placeholder="Descreva o conteúdo do material, objetivos de aprendizagem e como utilizá-lo..."
                  value={dadosFormulario.descricao}
                  onChange={(e) => lidarComMudanca('descricao', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#283593] focus:border-transparent resize-y transition-all"
                  required
                />
              </div>

              {/* Nível e Dificuldade */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="nivel" className="block text-sm font-medium text-gray-700">Nível OBMEP *</label>
                  <select 
                    id="nivel"
                    value={dadosFormulario.nivel} 
                    onChange={(e) => lidarComMudanca('nivel', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#283593] bg-white cursor-pointer"
                    required
                  >
                    <option value="">Selecione o nível</option>
                    <option value="1">Nível 1 (6º e 7º anos)</option>
                    <option value="2">Nível 2 (8º e 9º anos)</option>
                    <option value="3">Nível 3 (Ensino Médio)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="dificuldade" className="block text-sm font-medium text-gray-700">Dificuldade *</label>
                  <select 
                    id="dificuldade"
                    value={dadosFormulario.dificuldade} 
                    onChange={(e) => lidarComMudanca('dificuldade', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#283593] bg-white cursor-pointer"
                    required
                  >
                    <option value="">Selecione a dificuldade</option>
                    <option value="facil">Fácil</option>
                    <option value="medio">Médio</option>
                    <option value="dificil">Difícil</option>
                  </select>
                </div>
              </div>

              {/* Tópicos (Tags) */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Tópicos</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ex: Álgebra, Geometria... (Enter para adicionar)"
                    value={novoTopico}
                    onChange={(e) => setNovoTopico(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), adicionarTopico())}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#283593]"
                  />
                  <button 
                    type="button" 
                    onClick={adicionarTopico} 
                    className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors text-gray-600"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Lista de Tags Adicionadas */}
                {dadosFormulario.topicos.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {dadosFormulario.topicos.map((topico, index) => (
                      <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-50 text-[#283593] border border-blue-100 font-medium">
                        {topico}
                        <button
                          type="button"
                          onClick={() => removerTopico(topico)}
                          className="ml-2 text-blue-400 hover:text-red-500 focus:outline-none transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* URL do Arquivo */}
              <div className="space-y-2">
                <label htmlFor="url_arquivo" className="block text-sm font-medium text-gray-700">URL do Arquivo *</label>
                <input
                  id="url_arquivo"
                  type="url"
                  placeholder="https://drive.google.com/..."
                  value={dadosFormulario.url_arquivo}
                  onChange={(e) => lidarComMudanca('url_arquivo', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#283593] focus:border-transparent"
                  required
                />
                <p className="text-xs text-gray-500">
                  Cole aqui o link do arquivo hospedado (Google Drive, Dropbox, YouTube, etc.)
                </p>
              </div>

              {/* Detalhes do Arquivo */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label htmlFor="tipo_arquivo" className="block text-sm font-medium text-gray-700">Tipo *</label>
                  <select 
                    id="tipo_arquivo"
                    value={dadosFormulario.tipo_arquivo} 
                    onChange={(e) => lidarComMudanca('tipo_arquivo', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#283593] bg-white cursor-pointer"
                    required
                  >
                    <option value="">Selecione</option>
                    <option value="pdf">PDF</option>
                    <option value="video">Vídeo</option>
                    <option value="link">Link/Site</option>
                    <option value="quiz">Quiz</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="paginas_ou_duracao" className="block text-sm font-medium text-gray-700">Páginas/Duração</label>
                  <input
                    id="paginas_ou_duracao"
                    type="text"
                    placeholder="Ex: 15 págs, 30 min"
                    value={dadosFormulario.paginas_ou_duracao}
                    onChange={(e) => lidarComMudanca('paginas_ou_duracao', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#283593]"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="tamanho_arquivo" className="block text-sm font-medium text-gray-700">Tamanho (MB)</label>
                  <input
                    id="tamanho_arquivo"
                    type="number"
                    placeholder="Ex: 2.5"
                    value={dadosFormulario.tamanho_arquivo}
                    onChange={(e) => lidarComMudanca('tamanho_arquivo', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#283593]"
                  />
                </div>
              </div>

              {/* Mensagens de Feedback */}
              {erro && (
                <div className="p-4 bg-red-50 border border-red-100 rounded-lg flex items-center gap-3 text-red-700 animate-in fade-in slide-in-from-top-2">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span>{erro}</span>
                </div>
              )}

              {sucesso && (
                <div className="p-4 bg-green-50 border border-green-100 rounded-lg flex items-center gap-3 text-green-700 animate-in fade-in slide-in-from-top-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <span>{sucesso}</span>
                </div>
              )}

              {/* Aviso para Estagiário */}
              {usuarioAtual.tipo === 'ESTAGIARIO' && (
                <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg flex items-center gap-3 text-blue-800 text-sm">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span>Como estagiário, seu material será enviado para aprovação antes de ser publicado.</span>
                </div>
              )}

              {/* Botão de Envio */}
              <button
                type="submit"
                disabled={carregando}
                className="w-full bg-[#FF9800] hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg active:scale-[0.99]"
              >
                {carregando ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span> Enviando...
                  </span>
                ) : 'Enviar Material'}
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}