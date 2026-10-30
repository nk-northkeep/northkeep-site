import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md text-center">
        <p className="text-sm font-semibold text-[#2B7A8E]">404</p>
        <h1 className="mt-2 text-3xl font-bold text-gray-900">Página não encontrada</h1>
        <p className="mt-3 text-gray-600">Esse endereço não existe no site da Northkeep.</p>
        <Link href="/" className="button-primary mt-6">
          Voltar ao início
        </Link>
      </div>
    </div>
  );
}
