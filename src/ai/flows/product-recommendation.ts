'use server';

/**
 * @fileOverview Recomienda teléfonos basados en las necesidades y preferencias del usuario.
 *
 * - recommendProduct - Una función que proporciona recomendaciones de productos.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProductRecommendationInputSchema = z.object({
  needs: z.string().describe('Las necesidades especificadas por el usuario. ej: juegos, fotografía, etc.'),
  productInformation: z.string().describe('La información de los productos del catálogo.'),
});
export type ProductRecommendationInput = z.infer<typeof ProductRecommendationInputSchema>;

const ProductRecommendationOutputSchema = z.object({
  recommendation: z.string().describe('El producto recomendado y por qué se recomienda.'),
});
export type ProductRecommendationOutput = z.infer<typeof ProductRecommendationOutputSchema>;

export async function recommendProduct(input: ProductRecommendationInput): Promise<ProductRecommendationOutput> {
  return recommendProductFlow(input);
}

const prompt = ai.definePrompt({
  name: 'productRecommendationPrompt',
  input: {schema: ProductRecommendationInputSchema},
  output: {schema: ProductRecommendationOutputSchema},
  prompt: `Eres un experto en ventas de Chatbot-Gemini que ayuda a los usuarios a encontrar el mejor teléfono.
  
  Instrucciones:
  1. Sé amable, profesional y persuasivo.
  2. Responde SIEMPRE en español.
  3. Si un producto está en OFERTA (mencionado en el catálogo), ¡debes mencionarlo como prioridad! Menciona exactamente cuántos dólares se ahorra el usuario.
  4. Explica por qué ese modelo específico es el mejor para el usuario basándote en sus necesidades técnicas.
  5. Utiliza EXCLUSIVAMENTE los productos del catálogo proporcionado.
  6. No inventes características que no estén en la descripción.
  7. Mantén las respuestas cortas y directas al beneficio.

  Necesidades del Usuario: {{{needs}}}
  
  Catálogo de Productos con Ofertas:
  {{{productInformation}}}
  `,
});

const recommendProductFlow = ai.defineFlow(
  {
    name: 'recommendProductFlow',
    inputSchema: ProductRecommendationInputSchema,
    outputSchema: ProductRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
