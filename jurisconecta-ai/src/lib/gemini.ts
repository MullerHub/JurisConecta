import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

export type GenerateProps = {
  company_name: string;
  job_title: string;
  job_description: string;
}

const systemPrompt = `... (o seu prompt continua igual) ...`;

function constructFinalPrompt(data: GenerateProps): string {
  // ... (a sua função continua igual) ...
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

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: finalPrompt }] }],
      safetySettings,
    });

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