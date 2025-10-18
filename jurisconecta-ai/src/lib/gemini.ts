import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

export type GenerateProps = {
  company_name: string;
  job_title: string;
  job_description: string;
}

const systemPrompt = `
Você é um assistente jurídico sênior, especialista em triagem de casos. A sua função é analisar o relato inicial de um cliente e gerar uma análise preliminar estruturada para um advogado.

Baseado nas informações fornecidas, gere um objeto JSON com a seguinte estrutura:
- "area_direito": uma string que classifica o caso numa área do direito (ex: "Direito de Família", "Direito do Consumidor", "Direito Imobiliário").
- "resumo_caso": uma string com um resumo conciso do problema em no máximo 2 frases.
- "proximos_passos_sugeridos": um array com 3 strings, cada uma representando uma ação inicial recomendada para o advogado (ex: "Solicitar cópia do contrato de aluguel.", "Agendar consulta para detalhamento.", "Verificar prazos prescricionais.").
- "perguntas_essenciais_ao_cliente": um array com 3 strings, cada uma sendo uma pergunta chave que o advogado deve fazer ao cliente para obter mais clareza.

Siga rigorosamente estas regras:
1. Analise a descrição do problema para determinar a área do direito mais apropriada.
2. Os próximos passos devem ser práticos e diretos.
3. As perguntas essenciais devem ser focadas em obter informações cruciais que estão em falta.
4. Retorne **somente o objeto JSON válido**, sem nenhum texto explicativo, sem comentários, e sem formatação de markdown.
5. **Não envolva o JSON entre aspas ou blocos de código.**
6. O resultado final deve ser um JSON que possa ser diretamente processado (JSON.parse).
`;

function constructFinalPrompt(data: GenerateProps): string {
  return `
    ${systemPrompt}\n\n
    NOME DO CLIENTE: "${data.company_name}"\n\n
    TIPO DE CASO (informado pelo cliente): "${data.job_title}"\n\n
    DESCRIÇÃO DO PROBLEMA: "${data.job_description}"\n\n
  `;
}

export async function generateAnalysis(props: GenerateProps): Promise<string> {
  try {
    // ... (o seu código do try continua igual) ...

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const finalPrompt = constructFinalPrompt(props);

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const safetySettings = [
      { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
      { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
      { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
      { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
    ];

    const result = await model.generateContent(finalPrompt, safetySettings);

    const rawText = result.response.text();
    const startIndex = rawText.indexOf('{');
    const endIndex = rawText.lastIndexOf('}');

    if (startIndex === -1 || endIndex === -1) {
      throw new Error("A resposta da IA não continha um objeto JSON válido.");
    }
    const jsonString = rawText.substring(startIndex, endIndex + 1);
    return jsonString;

  } catch (error: unknown) { // <-- CORREÇÃO AQUI
    console.error('[AI Service] Erro ao gerar conteúdo:', JSON.stringify(error, null, 2));

    // Verificação segura do tipo de erro
    if (error instanceof Error) {
      throw new Error(`Ocorreu um erro ao comunicar com a IA: ${error.message}`);
    }
    throw new Error('Ocorreu um erro desconhecido ao comunicar com a IA.');
  }
}