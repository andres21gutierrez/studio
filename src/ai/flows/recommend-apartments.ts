'use server';
/**
 * @fileOverview AI flow to recommend apartments based on user search history and preferences.
 *
 * - recommendApartments - A function that recommends apartments.
 * - RecommendApartmentsInput - The input type for the recommendApartments function.
 * - RecommendApartmentsOutput - The return type for the recommendApartments function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const RecommendApartmentsInputSchema = z.object({
  searchHistory: z.string().describe('The user search history.'),
  preferences: z.string().describe('The user preferences.'),
});
export type RecommendApartmentsInput = z.infer<typeof RecommendApartmentsInputSchema>;

const RecommendApartmentsOutputSchema = z.object({
  recommendations: z.string().describe('A list of apartment recommendations based on user search history and preferences.'),
});
export type RecommendApartmentsOutput = z.infer<typeof RecommendApartmentsOutputSchema>;

export async function recommendApartments(input: RecommendApartmentsInput): Promise<RecommendApartmentsOutput> {
  return recommendApartmentsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendApartmentsPrompt',
  input: {
    schema: z.object({
      searchHistory: z.string().describe('The user search history.'),
      preferences: z.string().describe('The user preferences.'),
    }),
  },
  output: {
    schema: z.object({
      recommendations: z.string().describe('A list of apartment recommendations based on user search history and preferences.'),
    }),
  },
  prompt: `You are an AI that recommends apartments to users based on their search history and preferences.\n\n  Search History: {{{searchHistory}}}\n  Preferences: {{{preferences}}}\n\nPlease provide a list of apartment recommendations that match the user's needs.\n  `,
});

const recommendApartmentsFlow = ai.defineFlow<
  typeof RecommendApartmentsInputSchema,
  typeof RecommendApartmentsOutputSchema
>({
  name: 'recommendApartmentsFlow',
  inputSchema: RecommendApartmentsInputSchema,
  outputSchema: RecommendApartmentsOutputSchema,
},  async input => {
  const {output} = await prompt(input);
  return output!;
});