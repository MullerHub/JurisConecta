"use client";

import React, { useState } from 'react';

// Corresponde aos novos campos do prompt
// No seu backend, você pode renomear GenerateProps para refletir isso
// Ex: company_name -> nome_cliente, job_title -> tipo_caso, etc.
const initialFormData = {
  company_name: '', // Usaremos para "Nome do Cliente"
  job_title: '',      // Usaremos para "Tipo de Caso"
  job_description: '' // Usaremos para "Descrição do Problema"
};

export default function App() {
  const [formData, setFormData] = useState(initialFormData);
  const [analise, setAnalise] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setAnalise(null);

    try {
      // Esta chamada pressupõe que você tem uma rota de API no seu backend
      // que executa a função `generate` que você me mostrou.
      // Ex: um arquivo em /pages/api/generate.ts no Next.js
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.statusText}`);
      }

      const resultText = await response.text();
      
      // O Gemini retorna uma string JSON, então precisamos parseá-la.
      const resultJson = JSON.parse(resultText);
      setAnalise(resultJson);

    } catch (err) {
      console.error(err);
      setError('Não foi possível gerar a análise. Verifique o console para mais detalhes.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-gray-200 font-sans flex flex-col items-center p-4 sm:p-8">
      <div className="w-full max-w-3xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-blue-400">JurisConecta AI</h1>
          <p className="text-slate-400 mt-2">Assistente de Triagem de Casos Jurídicos</p>
        </header>

        <main>
          <form onSubmit={handleSubmit} className="bg-slate-800 p-6 rounded-lg shadow-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="company_name" className="block text-sm font-medium text-slate-300 mb-1">Nome do Cliente</label>
                <input
                  type="text"
                  name="company_name"
                  id="company_name"
                  value={formData.company_name}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Ex: João da Silva"
                  required
                />
              </div>
              <div>
                <label htmlFor="job_title" className="block text-sm font-medium text-slate-300 mb-1">Tipo de Caso (resumido)</label>
                <input
                  type="text"
                  name="job_title"
                  id="job_title"
                  value={formData.job_title}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Ex: Problema com Aluguel"
                  required
                />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="job_description" className="block text-sm font-medium text-slate-300 mb-1">Descrição do Problema</label>
              <textarea
                name="job_description"
                id="job_description"
                rows="6"
                value={formData.job_description}
                onChange={handleInputChange}
                className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Descreva aqui o relato do cliente..."
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 disabled:bg-slate-500 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Analisando...' : 'Gerar Análise Preliminar'}
            </button>
          </form>

          {error && <div className="mt-6 bg-red-900 border border-red-700 text-red-200 p-4 rounded-lg">{error}</div>}

          {analise && (
            <div className="mt-8 bg-slate-800 p-6 rounded-lg shadow-lg animate-fade-in">
              <h2 className="text-2xl font-bold mb-4 border-b border-slate-700 pb-2">Análise da IA</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-blue-400">Área do Direito</h3>
                  <p className="bg-slate-700 p-3 rounded-md mt-1">{analise.area_direito}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-400">Resumo do Caso</h3>
                  <p className="bg-slate-700 p-3 rounded-md mt-1">{analise.resumo_caso}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-400">Próximos Passos Sugeridos</h3>
                  <ul className="list-disc list-inside bg-slate-700 p-3 rounded-md mt-1 space-y-2">
                    {analise.proximos_passos_sugeridos.map((passo, i) => <li key={i}>{passo}</li>)}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-400">Perguntas Essenciais ao Cliente</h3>
                   <ul className="list-disc list-inside bg-slate-700 p-3 rounded-md mt-1 space-y-2">
                    {analise.perguntas_essenciais_ao_cliente.map((pergunta, i) => <li key={i}>{pergunta}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
