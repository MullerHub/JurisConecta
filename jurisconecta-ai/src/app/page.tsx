"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { mockLawyers, Lawyer } from '@/lib/mock-lawyers';

type Analise = {
  area_direito: string;
  resumo_caso: string;
  proximos_passos_sugeridos: string[];
  perguntas_essenciais_ao_cliente: string[];
};

const initialFormData = {
  company_name: '',
  job_title: '',
  job_description: ''
};

export default function App() {
  const [formData, setFormData] = useState(initialFormData);
  const [analise, setAnalise] = useState<Analise | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [view, setView] = useState<'form' | 'analysis' | 'lawyers' | 'success'>('form');
  const [filteredLawyers, setFilteredLawyers] = useState<Lawyer[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFindLawyers = () => {
    if (!analise) return; // Proteção para o caso de 'analise' ser nulo
    const compatibleLawyers = mockLawyers.filter(
      lawyer => lawyer.specialty === analise.area_direito
    );
    setFilteredLawyers(compatibleLawyers);
    setView('lawyers');
  };

  const handleSelectLawyer = () => {
    setView('success');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setAnalise(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.statusText}`);
      }
      const resultText = await response.text();
      const resultJson = JSON.parse(resultText);
      setAnalise(resultJson);
      setView('analysis');
    } catch (err: unknown) { // CORREÇÃO: Usar 'unknown' em vez de 'any'
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : 'Ocorreu um erro desconhecido.';
      setError(`Não foi possível gerar a análise. Detalhe: ${errorMessage}`);
      setView('form');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setAnalise(null);
    setError('');
    setView('form');
  }

  return (
    <div className="min-h-screen bg-slate-900 text-gray-200 font-sans flex flex-col items-center p-4 sm:p-8">
      <div className="w-full max-w-3xl">
        <header className="text-center mb-8 cursor-pointer" onClick={handleReset}>
          <h1 className="text-4xl sm:text-5xl font-bold text-blue-400">JurisConecta AI</h1>
          <p className="text-slate-400 mt-2">Assistente de Triagem de Casos Jurídicos</p>
        </header>

        <main>
          {view === 'form' && (
            <form onSubmit={handleSubmit} className="bg-slate-800 p-6 rounded-lg shadow-lg">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="company_name" className="block text-sm font-medium text-slate-300 mb-1">Nome do Cliente</label>
                  <input type="text" name="company_name" id="company_name" value={formData.company_name} onChange={handleInputChange} className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Ex: João da Silva" required />
                </div>
                <div>
                  <label htmlFor="job_title" className="block text-sm font-medium text-slate-300 mb-1">Tipo de Caso (resumido)</label>
                  <input type="text" name="job_title" id="job_title" value={formData.job_title} onChange={handleInputChange} className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Ex: Problema com Aluguel" required />
                </div>
              </div>
              <div className="mb-6">
                <label htmlFor="job_description" className="block text-sm font-medium text-slate-300 mb-1">Descrição do Problema</label>
                <textarea name="job_description" id="job_description" rows={6} value={formData.job_description} onChange={handleInputChange} className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Descreva aqui o relato do cliente..." required />
              </div>
              <button type="submit" disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 disabled:bg-slate-500 disabled:cursor-not-allowed">
                {isLoading ? 'Analisando...' : 'Gerar Análise Preliminar'}
              </button>
            </form>
          )}

          {error && <div className="mt-6 bg-red-900 border border-red-700 text-red-200 p-4 rounded-lg">{error}</div>}

          {view === 'analysis' && analise && (
            <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4 border-b border-slate-700 pb-2">Análise da IA</h2>
              <div className="space-y-4">
                <div><h3 className="font-semibold text-blue-400">Área do Direito</h3><p className="bg-slate-700 p-3 rounded-md mt-1">{analise.area_direito}</p></div>
                <div><h3 className="font-semibold text-blue-400">Resumo do Caso</h3><p className="bg-slate-700 p-3 rounded-md mt-1">{analise.resumo_caso}</p></div>
                <div><h3 className="font-semibold text-blue-400">Próximos Passos Sugeridos</h3><ul className="list-disc list-inside bg-slate-700 p-3 rounded-md mt-1 space-y-2">{analise.proximos_passos_sugeridos.map((passo: string, i: number) => <li key={i}>{passo}</li>)}</ul></div>
                <div><h3 className="font-semibold text-blue-400">Perguntas Essenciais ao Cliente</h3><ul className="list-disc list-inside bg-slate-700 p-3 rounded-md mt-1 space-y-2">{analise.perguntas_essenciais_ao_cliente.map((pergunta: string, i: number) => <li key={i}>{pergunta}</li>)}</ul></div>
              </div>
              <button onClick={handleFindLawyers} className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-md transition duration-300">
                Conectar com Advogados Especialistas
              </button>
            </div>
          )}

          {view === 'lawyers' && analise && (
            <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Advogados especialistas em {analise.area_direito}</h2>
              <div className="space-y-4">
                {filteredLawyers.length > 0 ? (
                  filteredLawyers.map(adv => (
                    <div key={adv.id} className="bg-slate-700 p-4 rounded-lg flex items-center space-x-4">
                      <Image src={adv.imageUrl} alt={adv.name} width={80} height={80} className="w-20 h-20 rounded-full object-cover" />
                      <div className="flex-1">
                        <h3 className="text-xl font-bold">{adv.name}</h3>
                        <p className="text-slate-400">{adv.oab} - {adv.city}</p>
                        <p className="text-yellow-400">⭐ {adv.rating.toFixed(1)}</p>
                      </div>
                      <button onClick={handleSelectLawyer} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition">
                        Solicitar Contato
                      </button>
                    </div>
                  ))
                ) : (
                  <p>Nenhum advogado encontrado para esta especialidade. Tente novamente mais tarde.</p>
                )}
              </div>
            </div>
          )}

          {view === 'success' && (
            <div className="bg-slate-800 p-8 rounded-lg shadow-lg text-center">
              <h2 className="text-3xl font-bold text-green-400 mb-4">Solicitação Enviada com Sucesso!</h2>
              <p className="text-slate-300 mb-6">Os advogados selecionados receberam os detalhes do seu caso e entrarão em contato consigo em breve.</p>
              <button onClick={handleReset} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition duration-300">
                Iniciar Nova Análise
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}