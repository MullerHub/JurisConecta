import { NextRequest, NextResponse } from 'next/server';
import { generateAnalysis, GenerateProps } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const props = await req.json() as GenerateProps;
    const analysisResult = await generateAnalysis(props);
    return new Response(analysisResult, {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) { // <-- CORREÇÃO AQUI
    console.error('[API Route] Error:', error);

    // Verificação segura do tipo de erro
    const errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro desconhecido.';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}