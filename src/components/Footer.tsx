import { Trophy, Mail, Phone, MapPin, Facebook, Instagram, Youtube } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-[#283593] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Conteúdo Principal do Footer */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-[#FF9800] p-2 rounded-lg">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Olimpo Matemático</h3>
                <p className="text-sm text-blue-200">Preparação para OBMEP</p>
              </div>
            </div>
            <p className="text-blue-100 mb-6 max-w-md">
              Transformamos o aprendizado de matemática em uma jornada empolgante rumo ao sucesso 
              na Olimpíada Brasileira de Matemática das Escolas Públicas.
            </p>
            
            {/* Redes Sociais */}
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="bg-white/10 hover:bg-[#FF9800] p-2 rounded-lg transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://www.instagram.com/gedsoftware/" 
                className="bg-white/10 hover:bg-[#FF9800] p-2 rounded-lg transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="bg-white/10 hover:bg-[#FF9800] p-2 rounded-lg transition-colors duration-200"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#FF9800]">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a href="#inicio" className="text-blue-100 hover:text-[#FF9800] transition-colors duration-200">
                  Início
                </a>
              </li>
              <li>
                <a href="#cursos" className="text-blue-100 hover:text-[#FF9800] transition-colors duration-200">
                  Cursos
                </a>
              </li>
              <li>
                <a href="#materiais" className="text-blue-100 hover:text-[#FF9800] transition-colors duration-200">
                  Materiais de Estudo
                </a>
              </li>
              <li>
                <a href="#sobre" className="text-blue-100 hover:text-[#FF9800] transition-colors duration-200">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#contato" className="text-blue-100 hover:text-[#FF9800] transition-colors duration-200">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#FF9800]">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-[#BF8841]" />
                <span className="text-blue-100">contato@olimpomatematico.com.br</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-[#BF8841]" />
                <span className="text-blue-100">(11) 9999-9999</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-[#BF8841]" />
                <span className="text-blue-100">São Paulo, SP - Brasil</span>
              </div>
            </div>
          </div>
        </div>

        {/* Linha Divisória */}
        <div className="border-t border-blue-400/20"></div>

        {/* Copyright */}
        <div className="py-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-blue-200 text-sm mb-4 md:mb-0">
            © 2025 Olimpo Matemático. Todos os direitos reservados.
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#privacidade" className="text-blue-200 hover:text-[#FF9800] transition-colors duration-200">
              Política de Privacidade
            </a>
            <a href="#termos" className="text-blue-200 hover:text-[#FF9800] transition-colors duration-200">
              Termos de Uso
            </a>
            <a href="#cookies" className="text-blue-200 hover:text-[#FF9800] transition-colors duration-200">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
