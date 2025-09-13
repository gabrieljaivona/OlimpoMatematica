'use client';

import SearchAndFilterBar from "@/components/SearchAndFilterBar";
import { useState } from "react";


export default function MaterialDeEstudos() {

    const [activeFilters, setActiveFilters] = useState({
    searchTerm: '',
    type: 'all',
    level: 'all',
  });

  const handleFilterChange = (filters: { searchTerm: string; type: string; level: string }) => {
    setActiveFilters(filters);
  };

    return(
        <div className="flex flex-col justify-center items-center text-black">
            <h2 className="text-4xl font-bold">Biblioteca de Materiais</h2>
            <p className="font-extralight">Acesse nossa coleção completa de materiais de estudo para a OBMEP. PDFs, vídeos, simulados e muito mais.</p>
            
            <SearchAndFilterBar  
            onFilterChange={handleFilterChange}
            placeholder="Buscar materiais..."/>
        </div>
        
    )
}