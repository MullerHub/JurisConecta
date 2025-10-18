import { GoogleGenerativeAI } from '@google/generative-ai';

// A tipagem que define os dados que nossa função precisa
export type GenerateProps = {
  company_name: string; // Nome do Cliente
  job_title: string;      // Tipo de Caso
  job_description: string; // Descrição do Problema
}

// O prompt do sistema fica aqui, junto com a lógica que o utiliza.
const systemPrompt = `
Você é um assistente jurídico sênior, especialista em triagem de casos. Sua função é analisar o relato inicial de um cliente e gerar uma análise preliminar estruturada para um advogado.

Baseado nas informações fornecidas, gere um objeto JSON com a seguinte estrutura:
- "area_direito": uma string que classifica o caso em uma área do direito (ex: "Direito de Família", "Direito do Consumidor", "Direito Imobiliário").
- "resumo_caso": uma string com um resumo conciso do problema em no máximo 2 frases.
- "proximos_passos_sugeridos": um array com 3 strings, cada uma representando uma ação inicial recomendada para o advogado (ex: "Solicitar cópia do contrato de aluguel.", "Agendar consulta para detalhamento.", "Verificar prazos prescricionais.").
- "perguntas_essenciais_ao_cliente": um array com 3 strings, cada uma sendo uma pergunta chave que o advogado deve fazer ao cliente para obter mais clareza.

Siga rigorosamente estas regras:
1. Analise a descrição do problema para determinar a área do direito mais apropriada.
2. Os próximos passos devem ser práticos e diretos.
3. As perguntas essenciais devem ser focadas em obter informações cruciais que estão faltando.
4. Retorne **somente o objeto JSON válido**, sem nenhum texto explicativo, sem comentários, e sem formatação de markdown.
5. **Não envolva o JSON entre aspas ou blocos de código.**
6. O resultado final deve ser um JSON que possa ser diretamente parseado (JSON.parse).
`;

// Função que monta o prompt final
function constructFinalPrompt(data: GenerateProps): string {
  return `
    ${systemPrompt}\n\n
    NOME DO CLIENTE: "${data.company_name}"\n\n
    TIPO DE CASO (informado pelo cliente): "${data.job_title}"\n\n
    DESCRIÇÃO DO PROBLEMA: "${data.job_description}"\n\n
  `;
}

// Nossa função principal, agora exportada para ser usada em outros lugares
export async function generateAnalysis(props: GenerateProps): Promise<string> {
  try {
    console.log('[AI Service] Generating analysis with props:', JSON.stringify(props, null, 2));

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const finalPrompt = constructFinalPrompt(props);

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(finalPrompt);

    return result.response.text();
  } catch (error: any) {
    console.error('[AI Service] Error generating content:', error);
    // Lançamos o erro para que a camada de API possa capturá-lo e tratar a resposta HTTP
    throw new Error('Ocorreu um erro ao comunicar com a IA.');
  }
}
