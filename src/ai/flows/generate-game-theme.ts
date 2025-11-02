'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a chessboard theme based on a user-provided description.
 *
 * The flow takes a theme description as input and returns a color palette and piece style suggestion.
 * It exports:
 * - `generateGameTheme`: An async function that takes a theme description and returns the generated theme.
 * - `GameThemeInput`: The input type for the `generateGameTheme` function.
 * - `GameThemeOutput`: The output type for the `generateGameTheme` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GameThemeInputSchema = z.object({
  themeDescription: z.string().describe('A description of the desired chessboard theme.'),
});
export type GameThemeInput = z.infer<typeof GameThemeInputSchema>;

const GameThemeOutputSchema = z.object({
  colorPalette: z
    .object({
      primaryColor: z.string().describe('The primary color of the theme (e.g., #2c3e50).'),
      backgroundColor: z.string().describe('The background color of the theme (e.g., #222222).'),
      accentColor: z.string().describe('The accent color for highlighting elements (e.g., #FFD700).'),
    })
    .describe('The color palette for the chessboard theme.'),
  pieceStyle: z
    .enum(['Classic', 'Modern', 'Colorful'])
    .describe('The suggested piece style for the theme.'),
});
export type GameThemeOutput = z.infer<typeof GameThemeOutputSchema>;

export async function generateGameTheme(input: GameThemeInput): Promise<GameThemeOutput> {
  return generateGameThemeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateGameThemePrompt',
  input: {schema: GameThemeInputSchema},
  output: {schema: GameThemeOutputSchema},
  prompt: `You are a theme generator for a chess game. You will generate a color palette (primaryColor, backgroundColor, and accentColor) and suggest a piece style (Classic, Modern, or Colorful) that matches the user's described theme.

  Theme description: {{{themeDescription}}}

  Respond with a JSON object.
  Ensure the color palette is a set of valid hexadecimal color codes.
`,
});

const generateGameThemeFlow = ai.defineFlow(
  {
    name: 'generateGameThemeFlow',
    inputSchema: GameThemeInputSchema,
    outputSchema: GameThemeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
