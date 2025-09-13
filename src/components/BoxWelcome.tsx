import Link from "next/link";

export default function BoxWelcome() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center bg-[#283593] h-70  w-full m-2 rounded-xs">
      <h1 className="text-4xl font-medium">Bem-vindo ao OlimpoMatematica!</h1>
      <p>Sua jornada para o sucesso nas Olimpíadas de Matemática começa aqui.</p>
      <Link
        href="/auth"
        className="inline-flex items-center gap-2 bg-[#FF9800] font-bold py-3 px-6 rounded-lg shadow-md
hover:bg-[#BF8841] hover:text-white transition-all duration-300
          transform hover:scale-105">Inscreva-se agora
      </Link>
    </div>
  );
}
