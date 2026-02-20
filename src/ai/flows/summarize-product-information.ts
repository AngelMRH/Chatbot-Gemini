
'use server';

/**
 * @fileOverview Genera un análisis experto de un producto en español.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeProductInformationInputSchema = z.object({
  productName: z.string().describe('Nombre del producto.'),
  productDetails: z.string().describe('Detalles técnicos del producto.'),
});

export type SummarizeProductInformationInput = z.infer<
  typeof SummarizeProductInformationInputSchema
>;

const SummarizeProductInformationOutputSchema = z.object({
  summary: z.string().describe('Un análisis experto y persuasivo en español.'),
});

export type SummarizeProductInformationOutput = z.infer<
  typeof SummarizeProductInformationOutputSchema
>;

export async function summarizeProductInformation(
  input: SummarizeProductInformationInput
): Promise<SummarizeProductInformationOutput> {
  return summarizeProductInformationFlow(input);
}

const summarizeProductInformationPrompt = ai.definePrompt({
  name: 'summarizeProductInformationPrompt',
  input: {schema: SummarizeProductInformationInputSchema},
  output: {schema: SummarizeProductInformationOutputSchema},
  prompt: `Eres un analista experto de tecnología de PhonePro. Analiza el siguiente producto y proporciona un resumen persuasivo, corto y profesional de por qué es una excelente compra.

  Producto: {{{productName}}}
  Detalles: {{{productDetails}}}

  Instrucciones:
  1. Responde SIEMPRE en español.
  2. Sé concreto y resalta el valor diferencial.
  3. No uses más de 3 frases cortas.
  4. Usa un tono entusiasta pero profesional.`,
});

const summarizeProductInformationFlow = ai.defineFlow(
  {
    name: 'summarizeProductInformationFlow',
    inputSchema: SummarizeProductInformationInputSchema,
    outputSchema: SummarizeProductInformationOutputSchema,
  },
  async input => {
    const {output} = await summarizeProductInformationPrompt(input);
    return output!;
  }
);
