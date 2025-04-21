'use server';
/**
 * @fileOverview AI flow to generate personalized apartment recommendations.
 *
 * - generateRecommendations - A function that generates apartment recommendations.
 * - GenerateRecommendationsInput - The input type for the generateRecommendations function.
 * - GenerateRecommendationsOutput - The return type for the generateRecommendations function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateRecommendationsInputSchema = z.object({
  searchHistory: z.string().describe('The user search history.'),
  preferences: z.string().describe('The user preferences.'),
});
export type GenerateRecommendationsInput = z.infer<typeof GenerateRecommendationsInputSchema>;

const GenerateRecommendationsOutputSchema = z.object({
  recommendations: z.string().describe('The list of apartment recommendations.'),
});
export type GenerateRecommendationsOutput = z.infer<typeof GenerateRecommendationsOutputSchema>;

export async function generateRecommendations(input: GenerateRecommendationsInput): Promise<GenerateRecommendationsOutput> {
  return generateRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateRecommendationsPrompt',
  input: {
    schema: z.object({
      searchHistory: z.string().describe('The user search history.'),
      preferences: z.string().describe('The user preferences.'),
    }),
  },
  output: {
    schema: z.object({
      recommendations: z.string().describe('The list of apartment recommendations.'),
    }),
  },
  prompt: `You are an AI that recommends apartments to users based on their search history and preferences.

  Search History: {{{searchHistory}}}
  Preferences: {{{preferences}}}

  Please provide a list of apartment recommendations that match the user's needs.
  `,
});

const generateRecommendationsFlow = ai.defineFlow<
  typeof GenerateRecommendationsInputSchema,
  typeof GenerateRecommendationsOutputSchema
>({
  name: 'generateRecommendationsFlow',
  inputSchema: GenerateRecommendationsInputSchema,
  outputSchema: GenerateRecommendationsOutputSchema,
},
async input => {
  const {output} = await prompt(input);
  return output!;
}
);
