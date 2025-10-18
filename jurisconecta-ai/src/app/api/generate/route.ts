import { NextRequest, NextResponse } from 'next/server';
import { generateAnalysis, GenerateProps } from '@/lib/gemini'; // <--- IMPORTAMOS NOSSO SERVIÇO!

export async function POST(req: NextRequest) {

    console.log('Chave da API carregada:', !!process.env.GEMINI_API_KEY);
  try {
    // 1. Recebe e valida os dados do frontend
    const props = await req.json() as GenerateProps;

    // 2. Chama nosso serviço de IA para fazer o trabalho pesado
    const analysisResult = await generateAnalysis(props);

    // 3. Retorna o resultado com sucesso para o frontend
    return new Response(analysisResult, {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    // 4. Se algo der errado (na validação ou no serviço), retorna um erro claro
    console.error('[API Route] Error:', error);
    return NextResponse.json(
      { error: error.message || 'Ocorreu um erro desconhecido.' },
      { status: 500 }
    );
  }
}
