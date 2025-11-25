// src/app/meus-envios/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Plus, Edit, Trash2, Calendar, FileText, 
  AlertCircle, CheckCircle, Clock, ExternalLink 
} from 'lucide-react';

export default function PaginaMeusEnvios() {
  // --- MOCK USER ---
  const usuarioAtual = {
    nome: 'Estagiário Silva',
  };

  // --- DADOS SIMULADOS ---
  const [materiais, setMateriais] = useState([
    {
      id: 1,
      titulo: 'Introdução à Álgebra Linear',
      nivel: 'Nível 2',
      dataEnvio: '2024-10-05',
      status: 'pendente',
      link: '#',
      feedback: null
    },
    {
      id: 2,
      titulo: 'Geometria Espacial Avançada',
      nivel: 'Nível 3',
      dataEnvio: '2024-10-03',
      status: 'aprovado',
      link: '#',
      feedback: null
    },
    {
      id: 3,
      titulo: 'Problemas de Combinatória',
      nivel: 'Nível 2',
      dataEnvio: '2024-10-01',
      status: 'rejeitado',
      link: '#',
      feedback: 'O material precisa de mais exemplos práticos e explicações mais detalhadas.'
    }
  ]);

  // Função para deletar (Simulada)
  const deletarMaterial = (id: number) => {
    if (confirm('Tem certeza que deseja excluir este material?')) {
      setMateriais(materiais.filter(m => m.id !== id));
    }
  };

  // Auxiliar para formatar data
  const formatarData = (dataString: string) => {
    return new Date(dataString).toLocaleDateString('pt-BR');
  };

  // Auxiliar para o estilo do status
  const pegarBadgeStatus = (status: string) => {
    switch (status) {
      case 'pendente':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" /> Pendente
          </span>
        );
      case 'aprovado':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" /> Aprovado
          </span>
        );
      case 'rejeitado':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <AlertCircle className="w-3 h-3 mr-1" /> Requer Ajustes
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Cabeçalho da Seção --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#283593] mb-2">Meus Envios</h1>
            <p className="text-gray-600">Gerencie seus materiais de estudo enviados para aprovação.</p>
          </div>
          
          {/* Botão Criar (Leva para a página que já criamos) */}
          <Link 
            href="/materiais/novo" 
            className="bg-[#FF9800] hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg flex items-center shadow-md transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Criar Novo Material
          </Link>
        </div>

        {/* --- Cards de Estatísticas --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Pendentes */}
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-yellow-400">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-full">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pendentes</p>
                <p className="text-2xl font-bold text-gray-900">
                  {materiais.filter(m => m.status === 'pendente').length}
                </p>
              </div>
            </div>
          </div>
          
          {/* Aprovados */}
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Aprovados</p>
                <p className="text-2xl font-bold text-gray-900">
                  {materiais.filter(m => m.status === 'aprovado').length}
                </p>
              </div>
            </div>
          </div>
          
          {/* Rejeitados */}
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-red-500">
            <div className="flex items-center">
              <div className="bg-red-100 p-3 rounded-full">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Requer Ajustes</p>
                <p className="text-2xl font-bold text-gray-900">
                  {materiais.filter(m => m.status === 'rejeitado').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* --- Tabela de Materiais --- */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-[#283593]">Lista de Materiais</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-[#283593] text-sm">Título</th>
                  <th className="text-left py-4 px-6 font-semibold text-[#283593] text-sm">Nível</th>
                  <th className="text-left py-4 px-6 font-semibold text-[#283593] text-sm">Data</th>
                  <th className="text-left py-4 px-6 font-semibold text-[#283593] text-sm">Status</th>
                  <th className="text-left py-4 px-6 font-semibold text-[#283593] text-sm">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {materiais.map((material) => (
                  <tr key={material.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 text-[#BF8841] mr-3" />
                        <div>
                          <p className="font-medium text-gray-900">{material.titulo}</p>
                          <a 
                            href={material.link} 
                            className="text-xs text-[#FF9800] hover:text-orange-600 flex items-center mt-0.5 hover:underline"
                          >
                            Ver material <ExternalLink className="h-3 w-3 ml-1" />
                          </a>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-block px-2 py-1 rounded border border-[#BF8841] text-[#BF8841] text-xs font-medium">
                        {material.nivel}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        {formatarData(material.dataEnvio)}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="group relative inline-block">
                        {pegarBadgeStatus(material.status)}
                        
                        {/* Tooltip de Feedback (Só aparece se tiver feedback) */}
                        {material.status === 'rejeitado' && material.feedback && (
                          <div className="absolute left-0 top-full mt-2 w-64 p-3 bg-white border border-red-200 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                            <p className="font-bold text-red-600 text-xs mb-1">Feedback do Professor:</p>
                            <p className="text-gray-700 text-xs italic">"{material.feedback}"</p>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-2">
                        <button
                          className="p-2 text-[#283593] hover:bg-blue-50 rounded-md transition-colors border border-gray-200"
                          title="Editar"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deletarMaterial(material.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors border border-gray-200"
                          title="Excluir"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}