// src/components/SearchAndFilterBar.tsx
'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react'; // Certifique-se de ter: npm install lucide-react

type SearchAndFilterBarProps = {
  // Esta função envia os dados de volta para a página pai (MaterialsPage)
  onFilterChange: (filters: { searchTerm: string; type: string; level: string }) => void;
  placeholder?: string;
};

export default function SearchAndFilterBar({ onFilterChange, placeholder }: SearchAndFilterBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');

  // O useEffect monitora as mudanças nos estados e chama a função do pai
  useEffect(() => {
    onFilterChange({
      searchTerm,
      type: selectedType,
      level: selectedLevel,
    });
  }, [searchTerm, selectedType, selectedLevel, onFilterChange]);

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 w-full flex flex-col md:flex-row items-center gap-4">
      
      {/* --- Input de Busca --- */}
      <div className="relative w-full md:flex-1">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <Search size={20} />
        </div>
        <input
          type="text"
          placeholder={placeholder || "Buscar..."}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#283593] focus:border-transparent transition-all text-gray-700 placeholder-gray-400"
        />
      </div>

      {/* --- Filtro de Tipo (PDF, Vídeo, etc) --- */}
      <div className="w-full md:w-48">
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#283593] focus:border-transparent transition-all text-gray-700 cursor-pointer appearance-none"
          style={{ backgroundImage: 'none' }} // Remove a seta padrão feia de alguns navegadores
        >
          <option value="all">Todos os Tipos</option>
          <option value="pdf">📚 PDFs / Apostilas</option>
          <option value="video">🎥 Vídeos</option>
          <option value="quiz">📝 Quizzes</option>
        </select>
      </div>

      {/* --- Filtro de Nível --- */}
      <div className="w-full md:w-48">
        <select
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#283593] focus:border-transparent transition-all text-gray-700 cursor-pointer appearance-none"
        >
          <option value="all">Todos os Níveis</option>
          <option value="1">Nível 1 (6º e 7º)</option>
          <option value="2">Nível 2 (8º e 9º)</option>
          <option value="3">Nível 3 (Médio)</option>
        </select>
      </div>

    </div>
  );
}