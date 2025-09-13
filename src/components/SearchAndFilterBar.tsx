'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

type SearchAndFilterBarProps = {
  onFilterChange: (filters: { searchTerm: string; type: string; level: string }) => void;
  placeholder: string;
};

export default function SearchAndFilterBar({ onFilterChange, placeholder }: SearchAndFilterBarProps) {

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');

  useEffect(() => {
    onFilterChange({
      searchTerm,
      type: selectedType,
      level: selectedLevel,
    });
  }, [searchTerm, selectedType, selectedLevel, onFilterChange]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full flex flex-col md:flex-row items-center gap-4">
      
      {/* Input de Busca */}
      <div className="relative w-full md:flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border border-slate-300 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#283593]"
        />
      </div>

      {/* Select de Tipos */}
      <select
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
        className="w-full md:w-auto border border-slate-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#283593]"
      >
        <option value="all">Todos os tipos</option>
        <option value="pdf">PDF</option>
        <option value="video">Vídeo</option>
        <option value="quiz">Quiz</option>
      </select>

      {/* Select de Níveis */}
      <select
        value={selectedLevel}
        onChange={(e) => setSelectedLevel(e.target.value)}
        className="w-full md:w-auto border border-slate-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#283593]"
      >
        <option value="all">Todos os níveis</option>
        <option value="1">Nível 1</option>
        <option value="2">Nível 2</option>
        <option value="3">Nível 3</option>
      </select>
    </div>
  );
}