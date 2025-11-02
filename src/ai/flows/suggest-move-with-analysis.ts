'use server';

/**
 * @fileOverview An AI agent that suggests a chess move and explains its reasoning.
 *
 * - suggestMoveWithAnalysis - A function that suggests a chess move with analysis.
 * - SuggestMoveWithAnalysisInput - The input type for the suggestMoveWithAnalysis function.
 * - SuggestMoveWithAnalysisOutput - The return type for the suggestMoveWithAnalysis function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestMoveWithAnalysisInputSchema = z.object({
  fen: z
    .string()
    .describe('The current board state in Forsyth–Edwards Notation (FEN).'),
  difficulty: z
    .number()
    .describe(
      'The difficulty level of the AI, represented as an approximate Elo rating (e.g., 400, 800, 1200, 1600, 2000, 2500).'
    ),
});
export type SuggestMoveWithAnalysisInput = z.infer<
  typeof SuggestMoveWithAnalysisInputSchema
>;

const SuggestMoveWithAnalysisOutputSchema = z.object({
  move: z.string().describe('The suggested move in UCI notation.'),
  analysis: z
    .string()
    .describe('A brief explanation of the reasoning behind the suggested move.'),
});
export type SuggestMoveWithAnalysisOutput = z.infer<
  typeof SuggestMoveWithAnalysisOutputSchema
>;

export async function suggestMoveWithAnalysis(
  input: SuggestMoveWithAnalysisInput
): Promise<SuggestMoveWithAnalysisOutput> {
  return suggestMoveWithAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestMoveWithAnalysisPrompt',
  input: {schema: SuggestMoveWithAnalysisInputSchema},
  output: {schema: SuggestMoveWithAnalysisOutputSchema},
  prompt: `You are a chess grandmaster providing move suggestions and analysis.

You are given the current board state in FEN notation and the AI difficulty level (approximate Elo rating).

Based on the current board state and difficulty, suggest the best move and explain your reasoning in a concise manner.

Current Board State (FEN): {{{fen}}}
AI Difficulty (Elo): {{{difficulty}}}

Respond with the suggested move in UCI notation and a brief explanation of your reasoning.

{{#json}}
{
  "move": "[suggested move in UCI notation]",
  "analysis": "[brief explanation of the reasoning behind the move]"
}
{{/json}}
`,
});

const suggestMoveWithAnalysisFlow = ai.defineFlow(
  {
    name: 'suggestMoveWithAnalysisFlow',
    inputSchema: SuggestMoveWithAnalysisInputSchema,
    outputSchema: SuggestMoveWithAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
